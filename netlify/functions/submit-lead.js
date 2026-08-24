/**
 * Netlify Function: submit-lead
 *
 * On every form submission this function:
 *   1. Writes the lead to the MySQL database (so it appears on /admin/leads/)
 *   2. Calls the SuperMove webhook to create a project
 *   3. Updates the lead's webhookStatus in the DB (synced / failed)
 *   4. Calls the Facebook Conversions API to send a Lead event (server-side)
 *
 * FB CAPI fires in parallel with SuperMove — a failure in CAPI never blocks
 * the lead from reaching SuperMove or the user from seeing the thank-you page.
 *
 * Environment variables required:
 *   DATABASE_URL            — MySQL connection string
 *   SUPERMOVE_WEBHOOK_URL   — SuperMove standard website endpoint
 *   FB_CAPI_ACCESS_TOKEN    — Facebook Conversions API access token
 */

import crypto from "crypto";
import mysql from "mysql2/promise";
import seattleHouseDestinationModule from "../../lib/seattleHouseDestinations.js";
import supermoveResponseModule from "../../lib/supermoveResponse.js";

const {
  applySeattleHouseDestination,
  getSeattleHouseMoveTypeLabel,
  isSeattleHouseDestinationRequest,
  isValidSeattleHouseMoveSelection,
} = seattleHouseDestinationModule;
const { getSupermoveValidationError } = supermoveResponseModule;

// ── FB Pixel ID (public, safe to hardcode) ──────────────────────────────────
const FB_PIXEL_ID = "129153980771695";

// ── DB helper ────────────────────────────────────────────────────────────────

async function getConnection() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    return await mysql.createConnection(url);
  } catch (err) {
    console.error("[submit-lead] DB connect error:", err.message);
    return null;
  }
}

async function insertLeadToDB(conn, lead, webhookStatus) {
  const sql = `
    INSERT INTO leads
      (fullName, phone, email, moveDate, moveType, moveSize, fromZip, toZip,
       wantsStorage, sourcePage, sourceLabel,
       utmSource, utmMedium, utmCampaign, utmContent, utmTerm, gclid, fbclid,
       webhookStatus, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;
  const phoneDigits = (() => {
    let d = (lead.phone || "").replace(/\D/g, "");
    if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
    return d.slice(0, 10);
  })();
  const values = [
    (lead.fullName || "").slice(0, 255),
    phoneDigits,
    (lead.email || "").slice(0, 320),
    lead.moveDate || null,
    lead.moveType || null,
    lead.moveSize || null,
    lead.fromZip || null,
    lead.toZip || null,
    lead.wantsStorage ? 1 : 0,
    lead.sourcePage || null,
    lead.sourceLabel || null,
    lead.utmSource   || null,
    lead.utmMedium   || null,
    lead.utmCampaign || null,
    lead.utmContent  || null,
    lead.utmTerm     || null,
    lead.gclid       || null,
    lead.fbclid      || null,
    webhookStatus,
  ];
  const [result] = await conn.execute(sql, values);
  return result.insertId;
}

async function updateLeadWebhookStatus(conn, id, status) {
  await conn.execute(
    `UPDATE leads SET webhookStatus = ?, webhookAttemptedAt = NOW(), updatedAt = NOW() WHERE id = ?`,
    [status, id]
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function sha256(value) {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function getSupermoveJobType(moveType) {
  const t = (moveType ?? "").toLowerCase();
  if (t.includes("commercial") || t.includes("office") || t.includes("business")) {
    return { projectType: "commercial-move", jobType: "commercial-move-move" };
  }
  if (t.includes("long") || t.includes("interstate") || t.includes("out of state")) {
    return { projectType: "long-distance-move", jobType: "long-distance-move-move" };
  }
  return { projectType: "local-move", jobType: "local-move-move" };
}

function buildSupermovePayload(lead) {
  const { projectType, jobType } = getSupermoveJobType(lead.moveType);

  let projectSize = null;
  if (lead.moveType === "commercial") {
    projectSize = "Commercial";
  } else if (lead.moveSize) {
    projectSize = lead.moveSize;
  }

  const noteLines = [
    lead.wantsStorage ? "Interested in storage" : "",
    lead.partnerTowerName ? `Seattle House service: ${getSeattleHouseMoveTypeLabel(lead.moveType)}` : "",
    lead.squareFeet ? `Square feet: ${lead.squareFeet}` : "",
    lead.partnerTowerName ? `Seattle House tower: ${lead.partnerTowerName}` : "",
    lead.sourceLabel ? `Source: ${lead.sourceLabel}` : "",
  ].filter(Boolean);

  return {
    project_type: projectType,
    client: {
      primary_contact: {
        full_name: lead.fullName,
        email: lead.email,
        phone_number: (() => {
          let d = (lead.phone || "").replace(/\D/g, "");
          if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
          return d.slice(0, 10);
        })(),
      },
    },
    jobs: [
      {
        job_type: jobType,
        date: lead.moveDate ?? "",
        locations: [
          ...(lead.fromZip ? [{ address: lead.fromZip }] : []),
          ...(lead.toAddress || lead.toZip ? [{ address: lead.toAddress || lead.toZip }] : []),
        ],
        note_from_customer: noteLines.join(" | "),
      },
    ],
    referral_source: "Custom Website via A Supermove-Managed Integration",
    tags: Array.from(new Set([
      "WEBSITE_LEAD",
      ...(lead.supermoveTags || []),
      ...(lead.sourceLabel === "landing-social-residential-movers" ? ["SOCIAL_MEDIA_LEAD"] : []),
    ])),
    ...(projectSize ? { values: { PROJECT_SIZE: projectSize } } : {}),
  };
}

function buildCAPIPayload(lead, eventHeaders) {
  const nameParts = (lead.fullName || "").trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  const phoneDigits = (lead.phone || "").replace(/\D/g, "");
  const zip = (lead.fromZip || "").replace(/\D/g, "").slice(0, 5);

  const userData = {
    em: sha256(lead.email),
    ph: sha256(phoneDigits),
    fn: sha256(firstName),
    ln: sha256(lastName),
    zp: sha256(zip),
    client_ip_address: (eventHeaders["x-forwarded-for"] || "").split(",")[0].trim() || undefined,
    client_user_agent: lead.clientUserAgent || undefined,
  };
  Object.keys(userData).forEach((k) => userData[k] === undefined && delete userData[k]);

  const customData = {
    content_name: "Residential Moving Quote",
    content_category: "residential_moving",
  };
  if (lead.moveType) customData.move_type = lead.moveType;
  if (lead.moveSize) customData.move_size = lead.moveSize;
  if (lead.fromZip) customData.zip_from = lead.fromZip;
  if (lead.sourceLabel) customData.source_label = lead.sourceLabel;

  return {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.fbEventId || `lead_${Date.now()}`,
        event_source_url: lead.pageUrl || "https://onthegomoving.com/get/residential-movers/",
        action_source: "website",
        user_data: userData,
        custom_data: customData,
      },
    ],
  };
}

// ── Main handler ─────────────────────────────────────────────────────────────

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let lead;
  try {
    lead = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  // Sanitize name — strip any leading non-alphabetic characters (e.g. ": Justin" → "Justin")
  lead.fullName = (lead.fullName || "").replace(/^[^a-zA-Z]+/, "").trim();

  // Sanitize phone — strip non-digits, handle 11-digit with leading 1
  const rawPhone = (lead.phone || "").replace(/\D/g, "");
  const cleanPhone = rawPhone.length === 11 && rawPhone.startsWith("1") ? rawPhone.slice(1) : rawPhone;
  lead.phone = cleanPhone;

  if (isSeattleHouseDestinationRequest(lead.partnerDestination)) {
    if (!isValidSeattleHouseMoveSelection(lead.moveType, lead.moveSize)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please choose a valid Seattle House move type and apartment size." }),
      };
    }
    const mappedLead = applySeattleHouseDestination(lead);
    if (!mappedLead) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please choose a valid Seattle House tower." }),
      };
    }
    lead = mappedLead;
  }

  if (!lead.fullName || !lead.phone || !lead.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Name, phone, and email are required" }),
    };
  }

  // Validate phone is exactly 10 US digits
  if (lead.phone.length !== 10) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Please enter a valid 10-digit US phone number." }),
    };
  }

  const webhookUrl = process.env.SUPERMOVE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[submit-lead] SUPERMOVE_WEBHOOK_URL not configured");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Webhook not configured" }),
    };
  }

  // ── 1. Write lead to DB (pending) ─────────────────────────────────────────
  const conn = await getConnection();
  let leadId = null;
  if (conn) {
    try {
      leadId = await insertLeadToDB(conn, lead, "pending");
    } catch (err) {
      console.error("[submit-lead] DB insert error:", err.message);
      // Non-fatal — continue with Supermove even if DB write fails
    }
  } else {
    console.warn("[submit-lead] No DB connection — lead will not appear in admin dashboard");
  }

  // ── 2. Fire SuperMove + CAPI in parallel ──────────────────────────────────
  const supermovePayload = buildSupermovePayload(lead);
  const capiPayload = buildCAPIPayload(lead, event.headers || {});
  const fbToken = process.env.FB_CAPI_ACCESS_TOKEN;

  const [supermoveResult, capiResult] = await Promise.allSettled([
    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        "User-Agent": "Zapier",
      },
      body: JSON.stringify(supermovePayload),
      signal: AbortSignal.timeout(10_000),
    }),
    fbToken
      ? fetch(`https://graph.facebook.com/v20.0/${FB_PIXEL_ID}/events?access_token=${fbToken}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(capiPayload),
          signal: AbortSignal.timeout(8_000),
        })
      : Promise.resolve(null),
  ]);

  // ── 3. Log CAPI result ────────────────────────────────────────────────────
  if (capiResult.status === "fulfilled" && capiResult.value) {
    const capiText = await capiResult.value.text().catch(() => "");
    if (!capiResult.value.ok) {
      console.error("[submit-lead] FB CAPI error:", capiResult.value.status, capiText);
    } else {
      console.log("[submit-lead] FB CAPI success:", capiText);
    }
  } else if (capiResult.status === "rejected") {
    console.error("[submit-lead] FB CAPI fetch failed:", capiResult.reason);
  } else if (!fbToken) {
    console.warn("[submit-lead] FB_CAPI_ACCESS_TOKEN not set — CAPI skipped");
  }

  // ── 4. Evaluate SuperMove result + update DB ──────────────────────────────
  let webhookStatus = "synced";

  if (supermoveResult.status === "rejected") {
    console.error("[submit-lead] SuperMove fetch failed:", supermoveResult.reason);
    webhookStatus = "failed";
  } else {
    const smResponse = supermoveResult.value;
    const smText = await smResponse.text().catch(() => "");
    const validationError = getSupermoveValidationError(smText);
    if (!smResponse.ok || validationError) {
      console.error("[submit-lead] SuperMove error:", smResponse.status, validationError || smText);
      webhookStatus = "failed";
    }
  }

  if (conn && leadId) {
    try {
      await updateLeadWebhookStatus(conn, leadId, webhookStatus);
    } catch (err) {
      console.error("[submit-lead] DB status update error:", err.message);
    }
    await conn.end().catch(() => {});
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, webhookStatus }),
  };
};
