import type { Metadata } from "next";
import "./globals.css";

// ── Server-side sitewide JSON-LD ──────────────────────────────────────────────
// Rendered directly into the static HTML on every page so Googlebot sees the
// Organization/LocalBusiness graph without JS execution. Other pages can
// reference these entities via @id instead of duplicating the full object.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://onthegomoving.com/#organization",
  name: "On The Go Moving & Storage",
  url: "https://onthegomoving.com",
  logo: "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-logo.png",
  foundingDate: "2009",
  founder: {
    "@type": "Person",
    "@id": "https://onthegomoving.com/jason-sexton/#person",
    name: "Jason Sexton",
    url: "https://onthegomoving.com/jason-sexton/",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "16625 Redmond Way #M365",
    addressLocality: "Redmond",
    addressRegion: "WA",
    postalCode: "98052",
    addressCountry: "US",
  },
  telephone: "+14257618500",
  email: "booking@onthegomoving.com",
  sameAs: [
    "https://www.facebook.com/onthegomoving",
    "https://www.instagram.com/onthegomoving",
    "https://www.yelp.com/biz/on-the-go-moving-and-storage-redmond",
    "https://share.google/wz8Px2cowaHkprOAM",
  ],
  description:
    "On The Go Moving & Storage is Seattle's most trusted local moving company, serving Seattle, Bellevue, Redmond, Kirkland, and all Eastside suburbs since 2009. Licensed, insured, and rated 4.8 stars across 393 Google reviews.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MovingCompany", "LocalBusiness"],
  "@id": "https://onthegomoving.com/#local-business",
  name: "On The Go Moving & Storage",
  url: "https://onthegomoving.com",
  logo: "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-logo.png",
  image: "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-storage-truck.jpg",
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
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "07:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "07:00", closes: "19:00" },
  ],
  description:
    "On The Go Moving & Storage is Seattle's most trusted local moving company, serving Seattle, Bellevue, Redmond, Kirkland, and all Eastside suburbs since 2009. Licensed, insured, and rated 4.8 stars across 393 Google reviews.",
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

export const metadata: Metadata = {
  metadataBase: new URL("https://onthegomoving.com"),
  title: {
    default: "On The Go Moving & Storage | Seattle's Most Trusted Movers",
    template: "%s | On The Go Moving & Storage",
  },
  description:
    "Professional moving company serving Seattle, Bellevue, Redmond & the greater Puget Sound since 2009. Licensed & insured. Free quotes. (425) 761-8500.",
  keywords: [
    "Seattle movers",
    "moving company Seattle",
    "Bellevue movers",
    "Redmond movers",
    "local movers Seattle",
    "moving and storage Seattle",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://onthegomoving.com",
    siteName: "On The Go Moving & Storage",
    title: "On The Go Moving & Storage | Seattle's Most Trusted Movers",
    description:
      "Professional moving company serving Seattle, Bellevue, Redmond & the greater Puget Sound since 2009. Licensed & insured. Free quotes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "On The Go Moving & Storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "On The Go Moving & Storage | Seattle's Most Trusted Movers",
    description:
      "Professional moving company serving Seattle, Bellevue, Redmond & the greater Puget Sound since 2009.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PJR9KN');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Fonts: preconnect + async load to avoid render blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Nunito+Sans:wght@400;500;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Nunito+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
          // @ts-expect-error onLoad is valid HTML on link elements
          onLoad="this.media='all'"
        />
        {/* Fallback for no-JS browsers */}
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Nunito+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Sitewide Organization + LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, localBusinessSchema]),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5PJR9KN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
