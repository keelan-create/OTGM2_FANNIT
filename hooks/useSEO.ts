// ==========================================================================
// ON THE GO MOVING — SEO Hook
// Manages: <title>, <meta description>, <link rel="canonical">, JSON-LD schema,
//          OG tags (og:title, og:description, og:image, og:url, og:type),
//          Twitter card tags, and robots noindex
// ==========================================================================

import { useEffect } from "react";

// Default OG image — brand truck livery used as fallback for all pages
export const DEFAULT_OG_IMAGE =
  "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-storage-truck.jpg";

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

export const MOVING_COMPANY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["MovingCompany", "LocalBusiness"],
  name: "On The Go Moving & Storage",
  url: "https://onthegomoving.com",
  logo: "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-logo.png",
  image: DEFAULT_OG_IMAGE,
  telephone: "+14257618500",
  email: "booking@onthegomoving.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "16625 Redmond Way #M365",
    addressLocality: "Redmond",
    addressRegion: "WA",
    postalCode: "98052",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.6740,
    longitude: -122.1215,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "393",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "$$",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "07:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "07:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "07:00", closes: "19:00" },
  ],
  description: "On The Go Moving & Storage is Seattle's most trusted local moving company, serving Seattle, Bellevue, Redmond, Kirkland, and all Eastside suburbs since 2009. Licensed, insured, and rated 4.8 stars across 393 Google reviews.",
  sameAs: [
    "https://www.facebook.com/onthegomoving",
    "https://www.instagram.com/onthegomoving",
    "https://www.yelp.com/biz/on-the-go-moving-and-storage-redmond",
    "https://share.google/wz8Px2cowaHkprOAM",
  ],
  areaServed: [
    "Seattle, WA", "Bellevue, WA", "Redmond, WA", "Kirkland, WA",
    "Issaquah, WA", "Bothell, WA", "Renton, WA", "Shoreline, WA",
    "Sammamish, WA", "Woodinville, WA", "Kenmore, WA", "Mercer Island, WA",
    "Lynnwood, WA", "Mukilteo, WA", "Burien, WA", "Tukwila, WA",
    "Mountlake Terrace, WA", "Lake Forest Park, WA", "Newcastle, WA",
    "Snoqualmie, WA", "North Bend, WA", "Duvall, WA", "Carnation, WA",
    "Fall City, WA", "Maple Valley, WA", "Covington, WA",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Moving Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Moving" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Moving" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Packing Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Storage Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Long Distance Moving" } },
    ],
  },
};

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

export function buildLocalBusinessSchema(city: string, state: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["MovingCompany", "LocalBusiness"],
    name: `On The Go Moving & Storage — ${city}, ${state}`,
    url: `https://onthegomoving.com/${city.toLowerCase().replace(/\s+/g, "-")}-movers/`,
    telephone: "+14257618500",
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: state,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "393",
      bestRating: "5",
    },
  };
}

export function buildServiceSchema(serviceName: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "MovingCompany",
      name: "On The Go Moving & Storage",
      url: "https://onthegomoving.com",
      telephone: "+14257618500",
    },
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
  mainEntity: {
    "@type": ["MovingCompany", "LocalBusiness"],
    name: "On The Go Moving & Storage",
    telephone: "+14257618500",
    email: "booking@onthegomoving.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "16625 Redmond Way #M365",
      addressLocality: "Redmond",
      addressRegion: "WA",
      postalCode: "98052",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+14257618500",
      contactType: "customer service",
      areaServed: "US-WA",
      availableLanguage: "English",
    },
  },
};
