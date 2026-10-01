// ==========================================================================
// ON THE GO MOVING — Sitewide JSON-LD entities (single source of truth)
//
// Rules (AIV schema audit, 2026-09-01):
// - There is ONE Organization (#organization), ONE HQ LocalBusiness
//   (#local-business) and ONE WebSite (#website). They render server-side on
//   every page via app/layout.tsx.
// - Every other block references them by "@id" instead of re-declaring the
//   business. Never add an unidentified MovingCompany/LocalBusiness block.
// - The only other LocalBusiness entities are verified secondary GBP
//   locations (Seattle, Bellevue). Each gets its own "@id", its own GBP review
//   data, and a parentOrganization link. See buildLocationBusinessSchema().
//
// No "use client" or React imports here, so the server layout can import it.
// ==========================================================================

import { BRAND_IMAGES } from "@/lib/brandImages";
import type { LocationData } from "@/lib/locationData";

export const SITE_URL = "https://onthegomoving.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const ORGANIZATION_REF = { "@id": ORGANIZATION_ID };
export const LOCAL_BUSINESS_REF = { "@id": LOCAL_BUSINESS_ID };

export const DEFAULT_SCHEMA_IMAGE =
  "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-storage-truck.jpg";

// Google Business Profile share URLs
export const GBP_URLS = {
  redmond: "https://share.google/wz8Px2cowaHkprOAM",
  seattle: "https://share.google/kOvPFtNuCbovRUD7T",
  bellevue: "https://share.google/XHG6IkLTLEFsNBk10",
} as const;

// Shared social profiles. Every business entity lists these plus its own GBP.
const SOCIAL_PROFILES = [
  "https://www.facebook.com/onthegomoving",
  "https://www.instagram.com/onthegomoving",
  "https://www.yelp.com/biz/on-the-go-moving-and-storage-redmond",
];

const HQ_SAME_AS = [...SOCIAL_PROFILES, GBP_URLS.redmond];

const HQ_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "16625 Redmond Way #M365",
  addressLocality: "Redmond",
  addressRegion: "WA",
  postalCode: "98052",
  addressCountry: "US",
};

const OPENING_HOURS = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "19:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "07:00", closes: "19:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "07:00", closes: "19:00" },
];

const DESCRIPTION =
  "On The Go Moving & Storage is Seattle's most trusted local moving company, serving Seattle, Bellevue, Redmond, Kirkland, and all Eastside suburbs since 2009. Licensed, insured, and rated 4.8 stars across 393 Google reviews.";

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "On The Go Moving & Storage",
  url: SITE_URL,
  logo: BRAND_IMAGES.logo,
  foundingDate: "2009",
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/jason-sexton/#person`,
    name: "Jason Sexton",
    url: `${SITE_URL}/jason-sexton/`,
  },
  address: HQ_ADDRESS,
  telephone: "+14257618500",
  email: "booking@onthegomoving.com",
  sameAs: HQ_SAME_AS,
  description: DESCRIPTION,
};

// HQ (Redmond) business entity. Review data = Redmond GBP.
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["MovingCompany", "LocalBusiness"],
  "@id": LOCAL_BUSINESS_ID,
  name: "On The Go Moving & Storage",
  url: SITE_URL,
  logo: BRAND_IMAGES.logo,
  image: DEFAULT_SCHEMA_IMAGE,
  telephone: "+14257618500",
  email: "booking@onthegomoving.com",
  address: HQ_ADDRESS,
  geo: { "@type": "GeoCoordinates", latitude: 47.674, longitude: -122.1215 },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "393",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "$$",
  openingHoursSpecification: OPENING_HOURS,
  description: DESCRIPTION,
  sameAs: HQ_SAME_AS,
  parentOrganization: ORGANIZATION_REF,
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

// No on-site search endpoint exists, so WebSite intentionally omits potentialAction/SearchAction.
// hasPart is limited to /faq/ and /blog/ — the only cross-site index pages confirmed to exist
// as real routes (app/(main)/faq/page.tsx, app/(main)/blog/page.tsx).
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "On The Go Moving & Storage",
  url: SITE_URL,
  publisher: ORGANIZATION_REF,
  inLanguage: "en-US",
  hasPart: [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/faq/#webpage`,
      name: "Moving FAQ | Common Questions Answered",
      url: `${SITE_URL}/faq/`,
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/#webpage`,
      name: "Moving Tips & Resources Blog",
      url: `${SITE_URL}/blog/`,
    },
  ],
};

// Verified secondary GBP locations, keyed by location slug. The Redmond
// location page is the HQ, so it is not listed here.
const SECONDARY_LOCATION_GBP: Record<string, string> = {
  "seattle-movers": GBP_URLS.seattle,
  "bellevue-movers": GBP_URLS.bellevue,
};

export function isSecondaryLocation(data: LocationData | undefined): boolean {
  return !!data?.gbp && data.slug in SECONDARY_LOCATION_GBP;
}

/**
 * The business entity a city page should point to:
 * - Seattle / Bellevue → that location's own LocalBusiness (full object, own @id)
 * - every other city   → a reference to the HQ LocalBusiness
 */
export function buildLocationBusinessSchema(data: LocationData | undefined) {
  if (!data || !data.gbp || !isSecondaryLocation(data)) return LOCAL_BUSINESS_REF;
  const gbp = data.gbp;
  return {
    "@type": ["MovingCompany", "LocalBusiness"],
    "@id": `${SITE_URL}/${data.slug}/#local-business`,
    name: "On The Go Moving & Storage",
    url: `${SITE_URL}/${data.slug}/`,
    logo: BRAND_IMAGES.logo,
    image: DEFAULT_SCHEMA_IMAGE,
    telephone: "+14257618500",
    email: "booking@onthegomoving.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: gbp.streetAddress,
      addressLocality: gbp.addressLocality,
      addressRegion: "WA",
      postalCode: gbp.postalCode,
      addressCountry: "US",
    },
    ...(gbp.latitude && gbp.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: gbp.latitude, longitude: gbp.longitude } }
      : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: gbp.ratingValue ?? "4.8",
      reviewCount: gbp.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "$$",
    openingHoursSpecification: OPENING_HOURS,
    sameAs: [...SOCIAL_PROFILES, SECONDARY_LOCATION_GBP[data.slug]],
    parentOrganization: ORGANIZATION_REF,
  };
}
