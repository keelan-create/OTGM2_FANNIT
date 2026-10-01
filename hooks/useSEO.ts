// ==========================================================================
// ON THE GO MOVING — SEO Hook
// Manages: <title>, <meta description>, <link rel="canonical">, JSON-LD schema,
//          OG tags (og:title, og:description, og:image, og:url, og:type),
//          Twitter card tags, and robots noindex
// ==========================================================================

import { useEffect } from "react";
import { LOCAL_BUSINESS_SCHEMA, LOCAL_BUSINESS_REF, DEFAULT_SCHEMA_IMAGE } from "@/lib/schema";

// Default OG image — brand truck livery used as fallback for all pages
export const DEFAULT_OG_IMAGE = DEFAULT_SCHEMA_IMAGE;

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  schema?: object | object[];
  /** Open Graph image URL — defaults to brand truck image */
  ogImage?: string;
  /** og:type — defaults to "website" */
  ogType?: string;
  /** Set to true to add noindex, nofollow (e.g. thank-you, privacy policy) */
  noindex?: boolean;
}

function setMeta(property: string, content: string, attr: "name" | "property" = "property") {
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(property: string, attr: "name" | "property" = "property") {
  const el = document.querySelector(`meta[${attr}="${property}"]`);
  if (el) el.remove();
}

export function useSEO({
  title,
  description,
  canonical,
  schema,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // ── Title ──────────────────────────────────────────────────────────────
    document.title = title;

    // ── Meta description ───────────────────────────────────────────────────
    setMeta("description", description, "name");

    // ── Canonical ──────────────────────────────────────────────────────────
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    const fullCanonical = canonical.startsWith("http")
      ? canonical
      : `https://onthegomoving.com${canonical}`;
    canonicalEl.setAttribute("href", fullCanonical);

    // ── Robots (noindex) ───────────────────────────────────────────────────
    if (noindex) {
      setMeta("robots", "noindex, nofollow", "name");
    } else {
      removeMeta("robots", "name");
    }

    // ── Open Graph ─────────────────────────────────────────────────────────
    setMeta("og:type", ogType);
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:url", fullCanonical);
    setMeta("og:image", ogImage);
    setMeta("og:image:width", "1200");
    setMeta("og:image:height", "630");
    setMeta("og:site_name", "On The Go Moving & Storage");

    // ── Twitter Card ───────────────────────────────────────────────────────
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:image", ogImage, "name");
    setMeta("twitter:site", "@onthegomoving", "name");

    // ── JSON-LD schema ─────────────────────────────────────────────────────
    const existingSchema = document.getElementById("page-schema");
    if (existingSchema) existingSchema.remove();

    if (schema) {
      const schemaEl = document.createElement("script");
      schemaEl.id = "page-schema";
      schemaEl.type = "application/ld+json";
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemaEl.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
      document.head.appendChild(schemaEl);
    }

    return () => {
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, [title, description, canonical, schema, ogImage, ogType, noindex]);
}

// ---- Schema builders ----

// The HQ LocalBusiness entity (with "@id"). Re-declaring it on a page merges
// with the sitewide copy in app/layout.tsx instead of creating a duplicate.
export const MOVING_COMPANY_SCHEMA = LOCAL_BUSINESS_SCHEMA;

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema(serviceName: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: LOCAL_BUSINESS_REF,
    areaServed: {
      "@type": "State",
      name: "Washington",
    },
    description,
    url: `https://onthegomoving.com${url}`,
  };
}

export const CONTACT_POINT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact On The Go Moving & Storage",
  url: "https://onthegomoving.com/contact-us/",
  mainEntity: LOCAL_BUSINESS_REF,
};
