"use client";

// ==========================================================================
// ON THE GO MOVING — Location Page Template
// Design: Clean Pacific Utility — Forest green hero, gold CTAs, white content
// Layout: 11-section ICP-optimized structure for local mover conversion + SEO
// LLM/AEO-optimized: FAQPage schema, LocalBusiness schema, BreadcrumbList,
//   direct-answer paragraphs, entity-rich local knowledge, internal linking mesh
// Data: All city data lives in /lib/locationData.ts — DO NOT hardcode here
// ==========================================================================

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { COMPANY } from "@/lib/siteData";
import { LOCATION_DATA, ALL_LOCATION_SLUGS } from "@/lib/locationData";
import {
  CheckCircle,
  Phone,
  Star,
  MapPin,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  Home,
  Building2,
  Truck,
  Package,
  Users,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Service Area — all cities within 18 miles of Redmond, WA
// Used in the service area block (replaces Google Maps embed)
// ---------------------------------------------------------------------------
const SERVICE_AREA_CITIES: { city: string; slug: string; miles: number; drive: string }[] = [
  { city: "Bellevue", slug: "bellevue-movers", miles: 5, drive: "10 min" },
  { city: "Kirkland", slug: "kirkland-movers", miles: 5, drive: "10 min" },
  { city: "Sammamish", slug: "sammamish-movers", miles: 7, drive: "12 min" },
  { city: "Woodinville", slug: "woodinville-movers", miles: 8, drive: "13 min" },
  { city: "Newcastle", slug: "newcastle-movers", miles: 8, drive: "13 min" },
  { city: "Mercer Island", slug: "mercer-island-movers", miles: 9, drive: "15 min" },
  { city: "Issaquah", slug: "issaquah-movers", miles: 10, drive: "15 min" },
  { city: "Kenmore", slug: "kenmore-movers", miles: 10, drive: "15 min" },
  { city: "Bothell", slug: "bothell-movers", miles: 11, drive: "18 min" },
  { city: "Fall City", slug: "fall-city-movers", miles: 12, drive: "18 min" },
  { city: "Renton", slug: "renton-movers", miles: 13, drive: "20 min" },
  { city: "Lake Forest Park", slug: "lake-forest-park-movers", miles: 14, drive: "22 min" },
  { city: "Seattle", slug: "seattle-movers", miles: 16, drive: "25 min" },
  { city: "Shoreline", slug: "shoreline-movers", miles: 16, drive: "25 min" },
  { city: "Tukwila", slug: "tukwila-movers", miles: 16, drive: "24 min" },
  { city: "Carnation", slug: "carnation-movers", miles: 16, drive: "25 min" },
  { city: "Duvall", slug: "duvall-movers", miles: 17, drive: "28 min" },
  { city: "Snoqualmie", slug: "snoqualmie-movers", miles: 17, drive: "25 min" },
  { city: "Mountlake Terrace", slug: "mountlake-terrace-movers", miles: 17, drive: "26 min" },
  { city: "Burien", slug: "burien-movers", miles: 18, drive: "28 min" },
  { city: "North Bend", slug: "north-bend-movers", miles: 18, drive: "28 min" },
  { city: "Maple Valley", slug: "maple-valley-movers", miles: 18, drive: "28 min" },
  { city: "Lynnwood", slug: "lynnwood-movers", miles: 18, drive: "28 min" },
  { city: "Mukilteo", slug: "mukilteo-movers", miles: 18, drive: "28 min" },
  { city: "Covington", slug: "covington-movers", miles: 18, drive: "28 min" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface LocationPageProps {
  slug: string;
}

// Canonical service list for /{city}-movers/{service}/ sub-pages
// All cities get the same full service list — URLs are generated dynamically
const CANONICAL_SERVICES: { label: string; key: string; icon: string }[] = [
  { label: "Residential Moving", key: "residential", icon: "🏠" },
  { label: "Apartment Moving", key: "apartment", icon: "🏢" },
  { label: "Packing Services", key: "packing", icon: "📦" },
  { label: "Storage Services", key: "storage", icon: "🏪" },
  { label: "Office Moving", key: "office", icon: "💼" },
  { label: "Commercial Moving", key: "commercial", icon: "🏗️" },
  { label: "Senior Moving", key: "senior", icon: "👴" },
  { label: "Furniture Moving", key: "furniture", icon: "🛋️" },
  { label: "Condo Moving", key: "condo", icon: "🏙️" },
  { label: "Corporate Relocation", key: "corporate-relocation", icon: "🤝" },
  { label: "Appliance Moving", key: "appliance", icon: "🧊" },
  { label: "Unpacking Services", key: "unpacking", icon: "📂" },
  { label: "Warehousing", key: "warehousing", icon: "🏭" },
];

// CITY_SERVICE_LINKS removed — dead code, was never rendered (used CANONICAL_SERVICES instead)
// const CITY_SERVICE_LINKS = {

export default function LocationPage({ slug }: LocationPageProps) {
  const data = LOCATION_DATA[slug];
  // Derive city prefix for service sub-page lookup (e.g. "redmond-movers" → "redmond")
  const cityPrefix = slug.replace(/-movers$|-moving-services$|-moving$/, "");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // SEO meta tags + JSON-LD schema (LocalBusiness, FAQPage, BreadcrumbList)
  useEffect(() => {
    if (!data) return;
    document.title = data.metaTitle;

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };

    setMeta("description", data.metaDescription);
    setMeta("og:title", data.metaTitle, true);
    setMeta("og:description", data.metaDescription, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", `https://onthegomoving.com/${data.slug}/`, true);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://onthegomoving.com/${data.slug}/`;

    // JSON-LD Schema — LocalBusiness + FAQPage + BreadcrumbList
    const schemaId = "location-schema";
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": ["MovingCompany", "LocalBusiness"],
        name: COMPANY.name,
        url: `https://onthegomoving.com/${data.slug}/`,
        telephone: data.gbp?.telephone ?? COMPANY.phone,
        email: COMPANY.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: data.gbp?.streetAddress ?? "16625 Redmond Way #M365",
          addressLocality: data.gbp?.addressLocality ?? "Redmond",
          addressRegion: "WA",
          postalCode: data.gbp?.postalCode ?? "98052",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: data.gbp?.latitude ?? 47.6740,
          longitude: data.gbp?.longitude ?? -122.1215,
        },
        areaServed: [
          { "@type": "City", name: data.city, containedInPlace: { "@type": "State", name: "Washington" } },
          ...SERVICE_AREA_CITIES.map(c => ({ "@type": "City", name: c.city })),
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: data.gbp?.ratingValue ?? "4.8",
          reviewCount: data.gbp?.reviewCount ?? "393",
          bestRating: "5",
          worstRating: "1",
        },
        priceRange: "$$",
        openingHours: ["Mo-Su 00:00-00:00"],
        hasMap: `https://www.google.com/maps/search/On+The+Go+Moving+${encodeURIComponent(data.city)}+WA`,
        sameAs: [
          "https://www.facebook.com/onthegomoving",
          "https://www.yelp.com/biz/on-the-go-moving-and-storage-redmond",
        ],
        knowsAbout: [
          `Moving services in ${data.city}, WA`,
          "Residential moving",
          "Commercial moving",
          "Packing services",
          "Storage services",
          "Apartment moving",
          "Senior moving",
          "Specialty moving",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://onthegomoving.com/" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://onthegomoving.com/we-are-local/" },
          { "@type": "ListItem", position: 3, name: `${data.city} Movers`, item: `https://onthegomoving.com/${data.slug}/` },
        ],
      },
    ]);
    document.head.appendChild(script);
    return () => { document.getElementById(schemaId)?.remove(); };
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Location Not Found</h1>
          <a href="/" className="text-brand-green hover:underline">Return Home</a>
        </div>
      </div>
    );
  }

  // Build nearby cities list — use data.nearby from registry, filtered to only valid slugs
  const nearbyCities = data.nearby
    .filter(([, s]) => ALL_LOCATION_SLUGS.includes(s))
    .map(([name, slug]) => ({ city: name, slug }));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ── SECTION 1: HERO ── */}
      <section
        className="relative min-h-[600px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15,40,10,0.88) 50%, rgba(15,40,10,0.55) 100%), url(${BRAND_IMAGES.truckBellevueSkyline})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-16 lg:py-20">
          {/* Breadcrumb, AEO: helps LLMs understand page hierarchy */}
          <nav className="flex items-center gap-2 text-sm text-green-200 mb-6" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/we-are-local/" className="hover:text-white transition-colors">Locations</a>
            <span>/</span>
            <span className="text-white">{data.city} Movers</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Hero copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 text-brand-green-light text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <MapPin className="w-3.5 h-3.5" />
                Serving {data.city}, {data.state}{data.city !== (data.dispatchFrom ?? "Redmond") ? ` · ${data.drive} from ${data.dispatchFrom ?? "Redmond"}` : " · Local Dispatch"}
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                {data.heroTagline}
              </h1>
              <p className="text-green-100 text-lg mb-6 leading-relaxed max-w-lg">
                {data.heroSubtitle}
              </p>

              {/* Trust strip, single line, plain text style */}
              <div className="flex items-center gap-1.5 mb-8 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#fbc319" color="#fbc319" />)}
                </div>
                <span className="text-white font-semibold">4.8</span>
                <span className="text-white/50">(393 reviews)</span>
                <span className="text-white/30 mx-1">·</span>
                <Shield size={12} className="text-[#75aa11] flex-shrink-0" />
                <span>Licensed &amp; Insured</span>
                <span className="text-white/30 mx-1 hidden sm:inline">·</span>
                <span className="hidden sm:inline">Since 2009</span>
              </div>

              {/* Mobile: phone + form inline in hero */}
              <div className="lg:hidden space-y-4">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-base px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg w-full sm:w-auto justify-center"
                >
                  <Phone className="w-5 h-5" />
                  Call {COMPANY.phone}
                </a>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <QuoteForm />
                </div>
              </div>
              {/* Desktop: phone CTA only (form is in right column) */}
              <a
                href={COMPANY.phoneHref}
                className="hidden lg:inline-flex items-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-6 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call {COMPANY.phone}
              </a>
            </div>

            {/* Right: Quote Form (desktop only) */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-2xl overflow-hidden">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: TRUST BAR ── */}
      <section className="bg-brand-forest text-white py-4 border-b border-white/10">
        <div className="container">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4 text-sm">
            {[
              "Licensed: HG-064180",
              "USDOT# 2120054",
              "Fully Insured",
              `Serving ${data.city} Since 2009`,
              "Secure Vault Storage Available",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-green-light" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHY [CITY] TRUSTS US ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-3">
                Your Local {data.city} Movers
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-6 leading-tight">
                Why {data.city} Families & Businesses Choose On The Go
              </h2>
              {/* AEO: direct-answer paragraph, LLMs cite this for "best movers in [city]" queries */}
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{data.intro}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { icon: CheckCircle, text: "Flat-rate quotes, no surprise charges on move day" },
                  { icon: CheckCircle, text: "On-time crews with professional equipment" },
                  { icon: CheckCircle, text: "Secure climate-controlled vault storage" },
                  { icon: CheckCircle, text: "Available 7 days a week, including weekends" },
                  { icon: CheckCircle, text: "Family-owned and operated since 2009" },
                  { icon: CheckCircle, text: "Background-checked, professionally trained crews" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                    <item.icon className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="border-l-4 border-brand-green bg-brand-green/5 rounded-r-xl px-5 py-4">
                <p className="text-brand-forest font-semibold text-sm italic">"We've completed 25,000+ moves across Greater Seattle since 2009. Every crew member is background-checked and professionally trained."</p>
              </div>
            </div>
            <div className="relative">
              <img
                src={BRAND_IMAGES.crewEntryway1}
                alt={`On The Go Moving crew in ${data.city}, WA`}
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 bg-brand-gold text-brand-forest font-bold px-5 py-3 rounded-xl shadow-lg text-sm">
                4.8 ★ · 393 Google Reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SERVICES IN [CITY] ── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest">
              Moving Services in {data.city}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Home, title: "Residential Moving", desc: `Full-service home moves for houses, condos, and townhomes throughout ${data.city}.`, href: `/${slug}/residential/` },
              { icon: Building2, title: "Commercial Moving", desc: `Office and business relocations in ${data.city} with minimal downtime. We work around your schedule.`, href: `/${slug}/commercial/` },
              { icon: Truck, title: "Storage Services", desc: `Secure storage vaults at our climate-controlled Redmond facility. Full-service pickup and delivery. Contact us for current pricing.`, href: `/${slug}/storage/` },
              { icon: Package, title: "Apartment Moving", desc: `Elevator coordination, HOA certificates, and stress-free apartment moves throughout ${data.city}.`, href: `/${slug}/apartment/` },
              { icon: Users, title: "Senior Moving", desc: `Patient, compassionate crews for senior moves in ${data.city}. We work at your pace and coordinate with family.`, href: `/${slug}/senior/` },
              { icon: Truck, title: "Staging Professionals", desc: `Real estate staging services in ${data.city}. We work with staging professionals to make your home show-ready.`, href: `/staging-professionals/` },
            ].map((service, i) => (
              <a key={i} href={service.href}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-brand-green hover:shadow-md transition-all group cursor-pointer h-full">
                  <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
                    <service.icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <h3 className="font-display font-bold text-brand-forest text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{service.desc}</p>
                  <span className="text-brand-green text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Also available:{" "}
              <a href={`/${slug}/packing/`} className="text-brand-green font-semibold hover:underline">
                Packing Services in {data.city} →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MOVE TYPES (Apartments / Homes / Businesses) ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-3">We Move It All</p>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest">
              Apartments, Homes & Businesses in {data.city}
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-brand-forest text-white rounded-2xl p-8">
              <div className="w-12 h-12 bg-brand-green/30 rounded-xl flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6 text-brand-green-light" />
              </div>
              <h3 className="font-display text-xl font-black mb-4">Apartment & Condo Movers in {data.city}</h3>
              <p className="text-green-100 text-sm leading-relaxed mb-5">{data.apartment}</p>
              <a href={`/${slug}/apartment/`}>
                <span className="inline-flex items-center gap-2 text-brand-gold font-semibold text-sm hover:gap-3 transition-all">
                  See {data.city} apartment moving details <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-5">
                <Home className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-display text-xl font-black text-brand-forest mb-4">Home Movers in {data.city}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{data.home}</p>
              <a href="/residential-moving/">
                <span className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm hover:gap-3 transition-all">
                  Get home moving quote <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-5">
                <Truck className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-display text-xl font-black text-brand-forest mb-4">Business Movers in {data.city}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{data.business}</p>
              <a href={`/${slug}/commercial/`}>
                <span className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm hover:gap-3 transition-all">
                  See {data.city} commercial moving details <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PRICING TRANSPARENCY ── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0f2808 0%, #1a3a0a 60%, #2a5010 100%)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-white mb-4">
              How Much Do Movers Cost in {data.city}?
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              We believe in upfront pricing with no hidden fees. Here are typical ranges for {data.city} moves, your exact quote depends on home size, distance, and any add-on services.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Studio", price: data.pricing.studio },
              { label: "1 Bedroom", price: data.pricing.oneBed },
              { label: "2 Bedroom", price: data.pricing.twoBed },
              { label: "3 Bedroom", price: data.pricing.threeBed, highlight: true },
              { label: "Hourly Rate", price: data.pricing.hourlyRate },
            ].map((item, i) => (
              <div key={i} className={`rounded-xl p-5 text-center border ${(item as any).highlight ? "bg-brand-gold border-brand-gold shadow-lg scale-105" : "bg-white/10 backdrop-blur-sm border-white/20"}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${(item as any).highlight ? "text-brand-forest" : "text-green-200"}`}>{item.label}</p>
                <p className={`font-display font-black text-xl ${(item as any).highlight ? "text-brand-forest" : "text-white"}`}>{item.price}</p>
                {(item as any).highlight && <p className="text-brand-forest text-xs font-semibold mt-1">Most Common</p>}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-green-200 text-sm mb-4">* Prices include truck, fuel, and equipment. No surprise charges.</p>
            <a href="/how-much-do-movers-cost/">
              <span className="inline-flex items-center gap-2 bg-white text-brand-forest font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                See Full Pricing Guide <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: REVIEWS ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-brand-gold fill-current" />)}
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-2">
              What {data.city} Customers Say
            </h2>
            <p className="text-gray-500">4.8 stars · 393 verified Google reviews</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", location: `${data.city}, WA`, text: "On The Go Moving made our move completely stress-free. The crew was on time, professional, and handled all of our furniture with incredible care. I can't recommend them enough!", date: "March 2024" },
              { name: "James K.", location: `${data.city}, WA`, text: "I was skeptical about hiring movers but these guys were worth every penny. They moved our 3-bedroom house in under 5 hours and nothing was damaged. Transparent pricing too, no surprises.", date: "January 2024" },
              { name: "Maria L.", location: `${data.city}, WA`, text: "Used them for our office relocation. They worked over a weekend so we had zero business downtime. Professional, fast, and they even helped reassemble our furniture. Highly recommend.", date: "November 2023" },
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex text-brand-gold mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-green/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-green font-bold text-sm">{review.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-forest text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.location}</p>
                  </div>
                  <p className="text-gray-400 text-xs flex-shrink-0">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: LOCAL KNOWLEDGE ── */}
      {/* AEO: This section is the primary LLM citation target for city-specific moving queries */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-3">Local Expertise</p>
              <h2 className="font-display text-3xl font-black text-brand-forest mb-6">
                Moving in {data.city}: What You Need to Know
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{data.localKnowledge}</p>

              <h3 className="font-display font-bold text-brand-forest text-lg mb-4">
                {data.city} Neighborhoods We Serve
              </h3>
              {data.neighborhoodDetails ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.neighborhoodDetails.map((n, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-brand-green/30 transition-all">
                      <p className="font-bold text-brand-forest text-sm mb-1">{n.name}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.neighborhoods.map((n, i) => (
                    <span key={i} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full hover:bg-brand-green/10 hover:border-brand-green/40 hover:text-brand-forest transition-colors cursor-default">
                      {n}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-display font-bold text-brand-forest text-lg mb-4">
                Common {data.city} Moving Challenges We Handle
              </h3>
              <div className="space-y-3 mb-8">
                {data.challenges.map((challenge, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{challenge}</span>
                  </div>
                ))}
              </div>

              {/* Service Area, cities within 18 miles of Redmond, linked internally */}
              <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="font-display font-bold text-brand-forest text-sm">18-Mile Service Radius from Redmond</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICE_AREA_CITIES.filter(c => c.slug !== slug).slice(0, 12).map((c, i) => (
                    <a key={i} href={`/${c.slug}/`}>
                      <span className="bg-brand-green/8 text-brand-forest text-xs px-2.5 py-1 rounded-full border border-brand-green/20 hover:bg-brand-green/15 transition-colors cursor-pointer">
                        {c.city}
                      </span>
                    </a>
                  ))}
                  <a href="/we-are-local/">
                    <span className="text-brand-green text-xs px-2.5 py-1 hover:underline cursor-pointer">+more cities →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FAQ ── */}
      {/* AEO: FAQPage schema + direct-answer format for voice search and LLM citations */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest">
              Frequently Asked Questions, {data.city} Movers
            </h2>
          </div>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-brand-forest pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-brand-green flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: NAP + FULL SERVICE AREA ── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-3">Our Location</p>
              <h2 className="font-display text-3xl font-black text-brand-forest mb-4">
                {data.miles} Miles from Our {data.dispatchFrom ?? "Redmond"} Warehouse
              </h2>
              <p className="text-gray-600 mb-6">
                Our {data.dispatchFrom === "Seattle" ? "Seattle" : "Redmond"} facility is just {data.drive} from {data.city}. This proximity means faster crew dispatch, lower travel time, and more competitive pricing for your {data.city} move.
              </p>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-forest text-sm">Address</p>
                    <p className="text-gray-600 text-sm">{data.dispatchFrom === "Seattle" ? "Seattle, WA 98119" : "Redmond, WA 98052"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-forest text-sm">Phone</p>
                    <a href={COMPANY.phoneHref} className="text-brand-green text-sm hover:underline">{COMPANY.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-forest text-sm">Hours</p>
                    <p className="text-gray-600 text-sm">Every day: 7:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Service Area Grid, all cities linked for internal link equity */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-brand-green" />
                <h3 className="font-display font-bold text-brand-forest text-lg">Our Service Area</h3>
              </div>
              <p className="text-gray-500 text-sm mb-5">All communities within 18 miles of our Redmond, WA warehouse, typically 10–28 minutes away.</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {SERVICE_AREA_CITIES.map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                    <a href={`/${c.slug}/`}>
                      <span className={`text-sm font-medium hover:text-brand-green transition-colors cursor-pointer ${c.slug === slug ? "text-brand-green font-bold" : "text-gray-700"}`}>
                        {c.city}{c.slug === slug ? " ★" : ""}
                      </span>
                    </a>
                    <span className="text-brand-green text-xs font-semibold">{c.drive}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Licensed HG-064180 · USDOT# 2120054 · Serving Greater Seattle Eastside since 2009
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CITY SERVICE LINKS: Internal linking to /{city}-movers/{service}/ sub-pages ── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container">
          <div className="mb-8">
            <h2 className="font-display text-2xl lg:text-3xl font-black text-brand-forest mb-2">
              Moving Services in {data.city}
            </h2>
            <p className="text-gray-500 text-base max-w-2xl">
              On The Go Moving &amp; Storage offers a full range of specialized moving services in {data.city}. Select a service below to learn about pricing, process, and what to expect.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CANONICAL_SERVICES.map((svc) => {
              // "corporate-relocation" has no /{city}-movers/corporate-relocation/
              // sub-page for any city (not a valid serviceKey) — render as plain
              // text instead of a broken link.
              if (svc.key === "corporate-relocation") {
                return (
                  <span key={svc.key} className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-3 rounded-lg">
                    <span className="text-base leading-none flex-shrink-0">{svc.icon}</span>
                    <span className="flex-1">{svc.label}</span>
                  </span>
                );
              }
              return (
                <a key={svc.key} href={`/${cityPrefix}-movers/${svc.key}/`}>
                  <span className="flex items-center gap-2 bg-gray-50 hover:bg-brand-green/10 border border-gray-200 hover:border-brand-green/30 text-gray-700 hover:text-brand-forest text-sm font-medium px-4 py-3 rounded-lg transition-all cursor-pointer group">
                    <span className="text-base leading-none flex-shrink-0">{svc.icon}</span>
                    <span className="flex-1">{svc.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 11: SECONDARY CTA + NEARBY CITIES ── */}
      <section className="py-16 bg-brand-forest text-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-black mb-4">
              Ready to Move in {data.city}?
            </h2>
            <p className="text-green-200 text-lg max-w-xl mx-auto mb-8">
              Get your free, no-obligation quote in minutes. We respond within 1 hour during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call {COMPANY.phone}
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all"
              >
                Get Free Online Quote
              </a>
            </div>
          </div>

          {/* Nearby cities, internal linking mesh */}
          {nearbyCities.length > 0 && (
            <div className="border-t border-white/10 pt-10">
              <p className="text-center text-green-300 text-sm font-semibold uppercase tracking-widest mb-6">
                Also Serving Nearby Cities
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyCities.map((loc, i) => (
                  <a key={i} href={loc.slug === "seattle-movers" ? "/" : `/${loc.slug}/`}>
                    <span className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-2 rounded-full transition-colors cursor-pointer">
                      {loc.city} Movers
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── RELATED RESOURCES ── */}
      <section className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Related Resources</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/how-much-do-movers-cost/"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
            >
              How Much Do Movers Cost?
            </a>
            {data.slug === "seattle-movers" && (
              <a
                href="/best-moving-companies-seattle/"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
              >
                10 Best Moving Companies in Seattle (2026)
              </a>
            )}
            {data.slug === "bellevue-movers" && (
              <>
                <a
                  href="/moving-to-bellevue/"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
                >
                  Moving to Bellevue
                </a>
                <a
                  href="/first-time-homebuyer-guide-eastside-seattle/"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
                >
                  Eastside First-Time Homebuyer Guide
                </a>
                <a
                  href="/how-to-time-your-move-mortgage-closing-date/"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
                >
                  Time Your Move Around Closing
                </a>
              </>
            )}
            <a
              href="/faq/"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
            >
              Moving FAQ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
