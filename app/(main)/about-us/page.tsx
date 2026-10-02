import type { Metadata } from "next";
import AboutUs from "@/components/pages/AboutUs";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_REF } from "@/lib/schema";


export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about On The Go Moving & Storage, Seattle's trusted movers since 2009. Licensed, insured, and committed to stress-free moves across the Puget Sound.",
  alternates: {
    canonical: "https://onthegomoving.com/about-us/",
  },
  openGraph: {
    title: "About Us",
    description: "Learn about On The Go Moving & Storage, Seattle's trusted movers since 2009. Licensed, insured, and committed to stress-free moves across the Puget Sound.",
    url: "https://onthegomoving.com/about-us/",
  },
};

// ── Server-side JSON-LD schema ────────────────────────────────────────────────
// AboutPage about the sitewide Organization (by @id), the founder as a Person
// (same @id as /jason-sexton/), and a BreadcrumbList. The FAQPage block is
// rendered inline next to the visible FAQ in components/pages/AboutUs.tsx.
const PAGE_URL = `${SITE_URL}/about-us/`;
const PERSON_ID = `${SITE_URL}/jason-sexton/#person`;

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "About On The Go Moving & Storage",
  description:
    "Learn about On The Go Moving & Storage, Seattle's trusted movers since 2009. Licensed, insured, and committed to stress-free moves across the Puget Sound.",
  inLanguage: "en-US",
  isPartOf: { "@id": WEBSITE_ID },
  about: ORGANIZATION_REF,
  mainEntity: ORGANIZATION_REF,
  mentions: { "@id": PERSON_ID },
  breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Jason Sexton",
  jobTitle: "Founder & Owner",
  url: `${SITE_URL}/jason-sexton/`,
  image: `${SITE_URL}${BRAND_IMAGES.jasonSextonHeadshot}`,
  worksFor: ORGANIZATION_REF,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "About Us", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutPageSchema, founderSchema, breadcrumbSchema]),
        }}
      />
      <AboutUs />
    </>
  );
}
