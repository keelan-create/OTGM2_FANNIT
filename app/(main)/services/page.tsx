import type { Metadata } from "next";
import Services from "@/components/pages/Services";
import { SERVICES_CATALOG } from "@/lib/servicesCatalog";
import { SITE_URL, WEBSITE_ID, ORGANIZATION_REF, buildServiceEntity } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Moving Services in Seattle & Eastside WA",
  description:
    "On The Go Moving & Storage offers residential, commercial, packing, storage, labor-only, specialty, apartment, and senior moving services in Greater Seattle, WA. Get a free quote today.",
  alternates: {
    canonical: "https://onthegomoving.com/services/",
  },
  openGraph: {
    title: "Moving Services in Seattle & Eastside WA",
    description:
      "On The Go Moving & Storage offers residential, commercial, packing, storage, labor-only, specialty, apartment, and senior moving services in Greater Seattle, WA.",
    url: "https://onthegomoving.com/services/",
  },
};

// ── Server-side JSON-LD schema ────────────────────────────────────────────────
// CollectionPage → ItemList of every core Service (each linked to the HQ
// LocalBusiness by @id) + BreadcrumbList. No FAQPage: this page has no FAQ.
const PAGE_URL = `${SITE_URL}/services/`;

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Moving Services in Seattle & Eastside WA",
  description:
    "On The Go Moving & Storage offers residential, commercial, packing, storage, labor-only, specialty, apartment, and senior moving services in Greater Seattle, WA.",
  inLanguage: "en-US",
  isPartOf: { "@id": WEBSITE_ID },
  about: ORGANIZATION_REF,
  breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
  mainEntity: { "@id": `${PAGE_URL}#service-list` },
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${PAGE_URL}#service-list`,
  name: "On The Go Moving & Storage, Moving Services",
  numberOfItems: SERVICES_CATALOG.length,
  itemListElement: SERVICES_CATALOG.map((svc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: buildServiceEntity(svc),
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionPageSchema, serviceListSchema, breadcrumbSchema]),
        }}
      />
      <Services />
    </>
  );
}
