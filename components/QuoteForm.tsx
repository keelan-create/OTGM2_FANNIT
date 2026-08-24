"use client";

// ==========================================================================
// ON THE GO MOVING — Quote Form Component (Static Export Version)
// All submissions go through /.netlify/functions/submit-lead:
//   1. SuperMove webhook fired server-side (key never exposed to browser)
//   2. Netlify Forms captures every submission as backup (email notification)
//
// Field order matches live site:
//   Row 1: Full Name | Phone
//   Row 2: Email | Requested Move Date
//   Row 3: Zip From | Zip To (with swap button)
//   Row 4: Move Type (full width)
//   Row 5: Move Size (full width, apartment/house only) OR Square Feet (commercial only)
//   Row 6: Free Storage checkbox
//   Row 7: Urgency signal (landing pages only, when showUrgency=true)
//
// Move Size values map 1:1 to Supermove's PROJECT_SIZE enum.
// ==========================================================================

import { useState, useEffect } from "react";
import { ArrowLeftRight, ArrowRight, CheckCircle, Loader2, Lock, Zap } from "lucide-react";
import { toast } from "sonner";

interface QuoteFormProps {
  variant?: "hero" | "sidebar" | "inline";
  className?: string;
  /** Optional label to identify which page/section the form was submitted from */
  sourceLabel?: string;
  /** Optional preset destinations for a partner page. The server validates every preset key. */
  partnerDestinations?: ReadonlyArray<{ value: string; label: string }>;
  /** Optional partner-only service choices. Existing quote forms keep their standard move types. */
  partnerMoveTypes?: ReadonlyArray<{ value: string; label: string }>;
  /** Optional partner-only apartment-size choices. Existing quote forms keep their standard sizes. */
  partnerMoveSizes?: readonly string[];
  /** Optional partner-specific thank-you path used after a successful submission. */
  thankYouPath?: string;
  /** Optional replacement for the standard quote-form submit button label. */
  submitButtonLabel?: string;
  /** Pre-check the Free Storage checkbox (use on storage-related pages) */
  defaultFreeStorage?: boolean;
  /**
   * Pre-select the Move Type dropdown.
   * "apartment" | "house" | "commercial"
   * Use on intent-specific landing pages to reduce friction.
   */
  defaultMoveType?: "apartment" | "house" | "commercial" | "";
  /**
   * When true, shows an urgency signal above the submit button and redirects
   * to /get/thank-you/ instead of the main thank-you page.
   * Set to true on all /get/* landing pages.
   */
  isLandingPage?: boolean;
}

const MOVE_SIZES = [
  "Studio",
  "1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4 Bedrooms",
  "5 Bedrooms",
  "6+ Bedrooms",
];

/** Format phone digits as (425) 333-3333 for display.
 *  Accepts only 10 digits — the +1 country code is shown as a static prefix in the UI.
 *  Raw digits are extracted before sending to SuperMove / Netlify Forms. */
function formatPhoneDisplay(value: string): string {
  let digits = value.replace(/\D/g, "");
  // Always strip a leading 1 — the +1 country code is already shown as a static prefix,
  // so typing 1 as the first digit is always a mistake. Strip immediately at any length.
  if (digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Push a GTM phone_click event. Call from onClick on any phone <a> tag. */
export function pushPhoneClickEvent(source?: string) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "phone_click",
      phoneClickSource: source || "unknown",
      pagePath: window.location.pathname,
    });
  }
}

export default function QuoteForm({
  variant = "hero",
  className = "",
  sourceLabel,
  partnerDestinations,
  partnerMoveTypes,
  partnerMoveSizes,
  thankYouPath,
  submitButtonLabel,
  defaultFreeStorage = false,
  defaultMoveType = "",
  isLandingPage = false,
}: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [today, setToday] = useState("");

  // Set today's date on the client only to avoid SSR/client hydration mismatch
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    moveDate: "",
    zipFrom: "",
    zipTo: "",
    partnerDestination: "",
    moveType: defaultMoveType,  // "apartment" | "house" | "commercial"
    moveSize: "",               // Studio, 1 Bedroom, 2 Bedrooms … (apartment/house only)
    squareFeet: "",             // commercial only
    freeStorage: defaultFreeStorage,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: name === "phone"
          ? formatPhoneDisplay(value)
          : type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
      // Reset dependent fields when move type changes
      if (name === "moveType") {
        updated.moveSize = "";
        updated.squareFeet = "";
      }
      return updated;
    });
  };

  const handleSwapZip = () => {
    setFormData((prev) => ({
      ...prev,
      zipFrom: prev.zipTo,
      zipTo: prev.zipFrom,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Require bedroom/unit size for residential moves before proceeding
    if ((formData.moveType === "house" || formData.moveType === "apartment") && !formData.moveSize) {
      toast.error("Please select your move size (number of bedrooms).");
      return;
    }

    if (partnerDestinations?.length && !formData.partnerDestination) {
      toast.error("Please choose your Seattle House tower.");
      return;
    }

    // Validate phone is a 10-digit US number
    const phoneDigits = formData.phone.replace(/\D/g, "");
    const cleanedPhone = phoneDigits.length === 11 && phoneDigits.startsWith("1") ? phoneDigits.slice(1) : phoneDigits;
    if (cleanedPhone.length !== 10) {
      toast.error("Please enter a valid 10-digit US phone number (e.g. 425-761-8500).");
      return;
    }

    setLoading(true);

    try {
      // Capture ad attribution params from URL — persist in sessionStorage so attribution
      // survives multi-page browsing (user clicks ad on /seattle-movers/, fills form on /)
      const captureAttribution = () => {
        const params = new URLSearchParams(window.location.search);
        const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
        keys.forEach((k) => {
          if (params.has(k)) sessionStorage.setItem(`otgm_${k}`, params.get(k)!);
        });
      };
      captureAttribution();
      const getAttr = (k: string) => sessionStorage.getItem(`otgm_${k}`) || undefined;
      const attribution = {
        utmSource:   getAttr("utm_source"),
        utmMedium:   getAttr("utm_medium"),
        utmCampaign: getAttr("utm_campaign"),
        utmContent:  getAttr("utm_content"),
        utmTerm:     getAttr("utm_term"),
        gclid:       getAttr("gclid"),
        fbclid:      getAttr("fbclid"),
      };

      // Generate a unique event_id for FB Pixel + CAPI deduplication
      // Same ID is sent to CAPI server-side and stored for the pixel browser-side
      const fbEventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("fb_lead_event_id", fbEventId);
      }

      // Build the Netlify Forms payload (URL-encoded, browser-native)
      const netlifyFormData = new URLSearchParams();
      netlifyFormData.append("form-name", "quote-request");
      netlifyFormData.append("fullName", formData.fullName);
      netlifyFormData.append("phone", formData.phone.replace(/\D/g, "")); // raw digits only
      netlifyFormData.append("email", formData.email);
      netlifyFormData.append("moveDate", formData.moveDate || "");
      netlifyFormData.append("zipFrom", formData.zipFrom || "");
      netlifyFormData.append("zipTo", formData.zipTo || "");
      netlifyFormData.append("partnerDestination", formData.partnerDestination || "");
      netlifyFormData.append("moveType", formData.moveType || "");
      netlifyFormData.append("moveSize", formData.moveSize || "");
      netlifyFormData.append("squareFeet", formData.squareFeet || "");
      netlifyFormData.append("wantsStorage", formData.freeStorage ? "yes" : "no");
      netlifyFormData.append("sourcePage", window.location.pathname);
      netlifyFormData.append("sourceLabel", sourceLabel || "");

      // Fire both in parallel: SuperMove (via function) + Netlify Forms (browser POST)
      const [supermoveRes] = await Promise.allSettled([
        fetch("/.netlify/functions/submit-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            phone: formData.phone.replace(/\D/g, ""), // raw digits only
            email: formData.email,
            moveDate: formData.moveDate || undefined,
            moveType: formData.moveType || undefined,
            moveSize: formData.moveSize || undefined,
            squareFeet: formData.squareFeet || undefined,
            fromZip: formData.zipFrom || undefined,
            toZip: formData.zipTo || undefined,
            partnerDestination: formData.partnerDestination || undefined,
            wantsStorage: formData.freeStorage,
            sourcePage: window.location.pathname,
            sourceLabel: sourceLabel,
            fbEventId,
            clientIp: undefined, // server will use Netlify's x-forwarded-for header
            clientUserAgent: navigator.userAgent,
            pageUrl: window.location.href,
            ...attribution,
          }),
        }),
        // Silent Netlify Forms capture — browser POST so it's accepted
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: netlifyFormData.toString(),
        }).catch(() => { /* non-fatal */ }),
      ]);

      if (supermoveRes.status === "rejected" || !(supermoveRes.value as Response).ok) {
        throw new Error("Function returned error");
      }

      // Push GTM event — differentiate landing page vs organic
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: isLandingPage ? "paid_lead_form_submit" : "quote_form_submit",
          formData: { moveType: formData.moveType, moveSize: formData.moveSize, zipFrom: formData.zipFrom },
          isLandingPage,
        });
      }

      setSubmitted(true);
      setTimeout(() => {
        // Landing pages redirect to /get/thank-you/ for accurate paid conversion tracking
        window.location.href = thankYouPath || (isLandingPage
          ? "/get/thank-you/"
          : "/thank-you-get-a-quote-services/");
      }, 1500);
    } catch (err) {
      console.error("[QuoteForm] Submission error:", err);
      toast.error("Something went wrong. Please call us at (425) 761-8500.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 py-10 text-center ${className}`}>
        <CheckCircle size={48} style={{ color: "#75aa11" }} />
        <h3
          className="text-2xl font-bold"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#1e3a0f" }}
        >
          Quote Request Received!
        </h3>
        <p className="text-gray-600 text-sm">
          We'll contact you within 1 business hour. Redirecting…
        </p>
      </div>
    );
  }

  const labelClass = "block text-xs font-semibold text-gray-500 mb-1 tracking-wide transition-colors duration-200";

  const fieldWrap = (name: string) =>
    `relative transition-all duration-200 ${focused === name ? "pl-2" : ""}`;

  const inputClass = (name: string) =>
    [
      "w-full px-3 py-3.5 text-base border rounded-md bg-white text-gray-800 placeholder-gray-400",
      "outline-none transition-all duration-200",
      focused === name
        ? "border-[#75aa11] ring-2 ring-[#75aa11]/20 shadow-sm"
        : "border-gray-200 hover:border-gray-300",
    ].join(" ");

  const focusProps = (name: string) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
  });

  // Determine which secondary field to show based on move type
  const hasPartnerMoveOptions = Boolean(partnerMoveTypes?.length && partnerMoveSizes?.length);
  const showMoveSize = hasPartnerMoveOptions || formData.moveType === "apartment" || formData.moveType === "house";
  const showSquareFeet = !hasPartnerMoveOptions && formData.moveType === "commercial";

  return (
    <form
      onSubmit={handleSubmit}
      name="quote-request"
      data-netlify="true"
      suppressHydrationWarning
      className={[
        "bg-white rounded-xl p-6 transition-all duration-300",
        "shadow-xl hover:shadow-2xl hover:-translate-y-0.5",
        className,
      ].join(" ")}
    >
      {/* Hidden inputs required by Netlify Forms, must exist as real HTML elements for Netlify to capture them */}
      <input type="hidden" name="form-name" value="quote-request" />
      <input type="hidden" name="sourcePage" value="" />
      <input type="hidden" name="sourceLabel" value="" />
      <input type="hidden" name="partnerDestination" value="" />

      {variant === "hero" && (
        <div className="mb-5">
          <h2
            className="text-[1.6rem] font-extrabold leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#1e3a0f" }}
          >
            Get Your Free Moving Quote
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            No obligation. We respond within 1 hour.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Row 1: Full Name | Phone */}
        <div className={fieldWrap("fullName")}>
          {focused === "fullName" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "fullName" ? "text-[#75aa11]" : ""}`}>
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass("fullName")}
            {...focusProps("fullName")}
          />
        </div>

        <div className={fieldWrap("phone")}>
          {focused === "phone" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "phone" ? "text-[#75aa11]" : ""}`}>
            Phone *
          </label>
          <div className="flex items-center">
            <span
              className={[
                "flex-shrink-0 px-3 py-3.5 text-base border rounded-l-md bg-gray-50 text-gray-500 select-none",
                focused === "phone"
                  ? "border-[#75aa11] ring-2 ring-[#75aa11]/20 ring-r-0 border-r-0"
                  : "border-gray-200 border-r-0",
              ].join(" ")}
            >
              +1
            </span>
            <input
              type="tel"
              name="phone"
              required
              autoComplete="tel-national"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(425) 555-0100"
              className={[
                "w-full px-3 py-3.5 text-base border rounded-r-md bg-white text-gray-800 placeholder-gray-400",
                "outline-none transition-all duration-200",
                focused === "phone"
                  ? "border-[#75aa11] ring-2 ring-[#75aa11]/20"
                  : "border-gray-200 hover:border-gray-300",
              ].join(" ")}
              {...focusProps("phone")}
            />
          </div>
        </div>

        {/* Row 2: Email | Requested Move Date */}
        <div className={fieldWrap("email")}>
          {focused === "email" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "email" ? "text-[#75aa11]" : ""}`}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputClass("email")}
            {...focusProps("email")}
          />
        </div>

        <div className={fieldWrap("moveDate")}>
          {focused === "moveDate" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "moveDate" ? "text-[#75aa11]" : ""}`}>
            Move Date *
          </label>
          <input
            type="date"
            name="moveDate"
            required
            autoComplete="off"
            value={formData.moveDate}
            onChange={handleChange}
            className={inputClass("moveDate")}
            min={today}
            {...focusProps("moveDate")}
          />
        </div>

        {/* Row 3: Zip From | Zip To, or a partner destination selector */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-4 relative">
          <div className={fieldWrap("zipFrom")}>
            {focused === "zipFrom" && (
              <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
            )}
            <label className={`${labelClass} ${focused === "zipFrom" ? "text-[#75aa11]" : ""}`}>
              Zip Code (Moving From) *
            </label>
            <input
              type="text"
              name="zipFrom"
              required
              autoComplete="postal-code"
              value={formData.zipFrom}
              onChange={handleChange}
              placeholder="98052"
              maxLength={10}
              className={inputClass("zipFrom")}
              {...focusProps("zipFrom")}
            />
          </div>

          {partnerDestinations?.length ? (
            <div className={fieldWrap("partnerDestination")}>
              {focused === "partnerDestination" && (
                <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
              )}
              <label className={`${labelClass} ${focused === "partnerDestination" ? "text-[#75aa11]" : ""}`}>
                Seattle House Tower *
              </label>
              <select
                name="partnerDestination"
                required
                value={formData.partnerDestination}
                onChange={handleChange}
                className={inputClass("partnerDestination")}
                {...focusProps("partnerDestination")}
              >
                <option value="">Choose tower…</option>
                {partnerDestinations.map((destination) => (
                  <option key={destination.value} value={destination.value}>{destination.label}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">Your destination address is added automatically.</p>
            </div>
          ) : (
            <>
              {/* Swap button, centered between the two ZIP fields */}
              <button
                type="button"
                onClick={handleSwapZip}
                aria-label="Swap zip codes"
                tabIndex={-1}
                className="absolute left-1/2 -translate-x-1/2 bottom-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "#fbc319", color: "#1a1a1a" }}
              >
                <ArrowLeftRight size={14} />
              </button>

              <div className={fieldWrap("zipTo")}>
                {focused === "zipTo" && (
                  <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
                )}
                <label className={`${labelClass} ${focused === "zipTo" ? "text-[#75aa11]" : ""}`}>
                  Zip Code (Moving To) *
                </label>
                <input
                  type="text"
                  name="zipTo"
                  required
                  autoComplete="off"
                  value={formData.zipTo}
                  onChange={handleChange}
                  placeholder="98101"
                  maxLength={10}
                  className={inputClass("zipTo")}
                  {...focusProps("zipTo")}
                />
              </div>
            </>
          )}
        </div>

        {/* Row 4: Move Type (full width) */}
        <div className={`sm:col-span-2 ${fieldWrap("moveType")}`}>
          {focused === "moveType" && (
            <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
          )}
          <label className={`${labelClass} ${focused === "moveType" ? "text-[#75aa11]" : ""}`}>
            Move Type *
          </label>
          <select
            name="moveType"
            required
            value={formData.moveType}
            onChange={handleChange}
            className={inputClass("moveType")}
            {...focusProps("moveType")}
          >
            <option value="">Select type…</option>
            {partnerMoveTypes?.length ? (
              partnerMoveTypes.map((moveType) => (
                <option key={moveType.value} value={moveType.value}>{moveType.label}</option>
              ))
            ) : (
              <>
                <option value="apartment">Apartment/Condo</option>
                <option value="house">House</option>
                <option value="commercial">Commercial</option>
              </>
            )}
          </select>
        </div>

        {/* Row 5a: Move Size, shown for apartment/house (full width) */}
        {showMoveSize && (
          <div className={`sm:col-span-2 ${fieldWrap("moveSize")}`}>
            {focused === "moveSize" && (
              <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
            )}
            <label className={`${labelClass} ${focused === "moveSize" ? "text-[#75aa11]" : ""}`}>
              Move Size *
            </label>
            <select
              name="moveSize"
              required
              value={formData.moveSize}
              onChange={handleChange}
              className={inputClass("moveSize")}
              {...focusProps("moveSize")}
              >
                <option value="">Select size…</option>
              {(partnerMoveSizes?.length ? partnerMoveSizes : MOVE_SIZES).map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}

        {/* Row 5b: Square Feet, shown for commercial (full width) */}
        {showSquareFeet && (
          <div className={`sm:col-span-2 ${fieldWrap("squareFeet")}`}>
            {focused === "squareFeet" && (
              <span className="absolute left-0 top-6 bottom-0 w-0.5 bg-[#75aa11] rounded-full" />
            )}
            <label className={`${labelClass} ${focused === "squareFeet" ? "text-[#75aa11]" : ""}`}>
              Square Feet *
            </label>
            <input
              type="text"
              name="squareFeet"
              required
              autoComplete="off"
              value={formData.squareFeet}
              onChange={handleChange}
              placeholder="e.g. 2500"
              className={inputClass("squareFeet")}
              {...focusProps("squareFeet")}
            />
          </div>
        )}

        {/* Row 6: Free Storage checkbox, HIDDEN (temporarily disabled, re-enable when promotion is active) */}

      </div>

      {/* Urgency signal, landing pages only */}
      {isLandingPage && (
        <div className="mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
          <Zap size={14} className="text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-800 font-medium">
            Crews available this week, slots fill fast in summer. Submit now to hold your date.
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className={[
          "mt-4 w-full flex items-center justify-center gap-2 py-3 text-base font-bold rounded-md",
          "transition-all duration-200",
          "bg-[#fbc319] text-[#1a1a1a] uppercase tracking-wide",
          loading
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-[#f5b800] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] active:shadow-sm",
        ].join(" ")}
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            {submitButtonLabel || "GET MY FREE QUOTE"}
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400 mt-3">
        <Lock size={11} />
        Your information is secure and never sold.
      </p>
    </form>
  );
}
