import type { Metadata } from "next";
import HomePageContent from "@/components/pages/Home";

export const metadata: Metadata = {
  title: {
    absolute: "Seattle Movers – On The Go Moving & Storage",
  },
  description:
    "On The Go Moving & Storage is Seattle's local moving company. Serving all Seattle neighborhoods, residential, commercial, and apartment moves. Get a free quote today.",
  alternates: {
    canonical: "https://onthegomoving.com/",
  },
  openGraph: {
    title: "Seattle Movers – On The Go Moving & Storage",
    description:
      "On The Go Moving & Storage is Seattle's local moving company. Serving all Seattle neighborhoods, residential, commercial, and apartment moves. Get a free quote today.",
    url: "https://onthegomoving.com/",
  },
};

// ── Server-side JSON-LD schema ────────────────────────────────────────────────
// Injected directly into the static HTML so Googlebot sees it without JS execution.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MovingCompany", "LocalBusiness"],
  name: "On The Go Moving & Storage",
  url: "https://onthegomoving.com",
  logo: "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-logo.png",
  image:
    "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-storage-truck.jpg",
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
    latitude: 47.674,
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
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "07:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/onthegomoving",
    "https://www.instagram.com/onthegomoving",
    "https://www.yelp.com/biz/on-the-go-moving-and-storage-redmond",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to hire movers in Seattle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Local moves in the Seattle area typically cost between $100\u2013$200 per hour for a 2-person crew with a truck. The total cost depends on the size of your home, distance, and any additional services like packing. Most 2-bedroom moves run $500\u2013$1,200. Get a free, no-obligation quote from us for an exact estimate.",
      },
    },
    {
      "@type": "Question",
      name: "How far in advance should I book movers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend booking at least 2\u20134 weeks in advance, especially for summer moves (May\u2013September) when demand is highest. However, we do our best to accommodate last-minute moves \u2014 call us and we'll check availability.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer storage with a move?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer secure vault storage at our Redmond, WA facility. Our team handles all loading and retrieval \u2014 it's a full-service solution, not a self-serve storage unit. Contact us for current storage pricing and availability.",
      },
    },
    {
      "@type": "Question",
      name: "Are you licensed and insured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. On The Go Moving & Storage is fully licensed (WA License HG-064180) and insured. We carry full liability insurance and offer additional valuation coverage options for your belongings.",
      },
    },
    {
      "@type": "Question",
      name: "Do you move pianos and specialty items?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we have specialized equipment and trained crews for moving pianos, safes, antiques, and other specialty items. Please mention these items when getting your quote so we can plan appropriately.",
      },
    },
    {
      "@type": "Question",
      name: "What areas do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve the entire Greater Seattle area including Seattle, Bellevue, Redmond, Kirkland, Issaquah, Bothell, Renton, Shoreline, Sammamish, Woodinville, Kenmore, Mercer Island, Lynnwood, Everett, and surrounding communities.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema, faqSchema]),
        }}
      />
      <HomePageContent />
    </>
  );
}

