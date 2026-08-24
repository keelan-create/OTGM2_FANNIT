"use client";
// ==========================================================================
// ON THE GO MOVING — Services Overview Page (/services/)
// Design: Mirrors the We Are Local hub layout — forest green hero, card grid
// SEO: Hub page for all 9 service pages — internal linking hub-and-spoke
// Schema: ItemList of all service pages for LLM/AEO discoverability
// ==========================================================================

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import {
  ArrowRight, Shield, Clock, CheckCircle, Star,
  Home as HomeIcon, Building2, Package, Archive,
  Dumbbell, Users, Briefcase, Phone, Layers,
  Wrench, Sofa, Building, Inbox, Warehouse, Monitor, Handshake, Truck,
} from "lucide-react";

// Full service data with descriptions, images, and icons
const ALL_SERVICES = [
  {
    title: "Residential Moving",
    href: "/residential-moving/",
    icon: HomeIcon,
    popular: true,
    description:
      "Full-service home moves handled with care. From studio apartments to large family homes, our crews treat your belongings like their own.",
    image: BRAND_IMAGES.residentialMoving,
    cta: "Get a Residential Quote",
  },
  {
    title: "Commercial Moving",
    href: "/commercial-moving/",
    icon: Building2,
    popular: true,
    description:
      "Minimize downtime with efficient office and commercial relocation. We work around your schedule, evenings and weekends available.",
    image: BRAND_IMAGES.commercialFleet,
    cta: "Get a Commercial Quote",
  },
  {
    title: "Storage Services",
    href: "/storage-services/",
    icon: Archive,
    popular: true,
    description:
      "Secure vaulted storage at our Redmond, WA facility. Dedicated vaults managed by our team, not a self-serve unit. Contact us for current pricing.",
    image: BRAND_IMAGES.storageForklift,
    cta: "Learn About Storage",
  },
  {
    title: "Apartment Moving",
    href: "/apartment-moving/",
    icon: HomeIcon,
    popular: false,
    description:
      "Studio to multi-bedroom apartment moves. We know Seattle and Eastside buildings, elevator reservations, COI requirements, and tight hallways are no problem.",
    image: BRAND_IMAGES.crewEntryway1,
    cta: "Get an Apartment Quote",
  },
  {
    title: "Senior Moving",
    href: "/senior-moving/",
    icon: Users,
    popular: false,
    description:
      "Patient, careful service for seniors and families. We take the time to do it right, downsizing, assisted living transitions, and estate moves handled with respect.",
    image: BRAND_IMAGES.customerHandshake,
    cta: "Learn About Senior Moves",
  },
  {
    title: "Staging Professionals",
    href: "/staging-professionals/",
    icon: Layers,
    popular: false,
    description:
      "Moving and storage services tailored for home stagers. Fast turnaround, flexible scheduling, and secure vault storage between staging projects.",
    image: BRAND_IMAGES.teamFleet,
    cta: "Learn About Staging Services",
  },
  {
    title: "Packing Services",
    href: "/packing-services/",
    icon: Package,
    popular: false,
    description:
      "Professional packing using quality materials, all supplies included. Full-pack, partial-pack, or fragile-only options available.",
    image: BRAND_IMAGES.packingCrew,
    cta: "Learn About Packing",
  },
  {
    title: "Labor Only Moving",
    href: "/labor-only-moving/",
    icon: Dumbbell,
    popular: false,
    description:
      "Need professional loading or unloading help? Our crews bring the same care and equipment as a full-service move, ask us about upgrading to a full-service truck for a small hourly increase.",
    image: BRAND_IMAGES.laborOnlyCrew,
    cta: "Learn About Labor Only",
  },
  {
    title: "Furniture Moving",
    href: "/furniture-moving/",
    icon: Sofa,
    popular: false,
    description:
      "Careful handling of sofas, dining sets, bedroom furniture, and antiques. Our crews use blankets, shrink wrap, and proper lifting techniques to protect every piece.",
    image: BRAND_IMAGES.crewWrappingFurniture,
    cta: "Learn About Furniture Moving",
  },
  {
    title: "Condo Moving",
    href: "/condo-moving/",
    icon: Building,
    popular: false,
    description:
      "High-rise and mid-rise condo moves with COI documentation, elevator reservations, and loading dock coordination handled for you.",
    image: BRAND_IMAGES.crewEntryway3,
    cta: "Learn About Condo Moving",
  },
  {
    title: "Appliance Moving",
    href: "/appliance-moving/",
    icon: Wrench,
    popular: false,
    description:
      "Safe transport of washers, dryers, refrigerators, and other heavy appliances. We use dollies and protective gear to prevent damage to floors and walls.",
    image: BRAND_IMAGES.crewCarryingFurniture,
    cta: "Learn About Appliance Moving",
  },
  {
    title: "Unpacking Services",
    href: "/unpacking-services/",
    icon: Inbox,
    popular: false,
    description:
      "Let our crew unpack and organize your new home. We remove all packing materials and help you settle in faster \u2014 available same-day or next-day after your move.",
    image: BRAND_IMAGES.crewEntryway1,
    cta: "Learn About Unpacking",
  },
  {
    title: "Warehousing & Distribution",
    href: "/warehousing-distribution/",
    icon: Warehouse,
    popular: false,
    description:
      "Short and long-term warehousing at our Redmond facility. Ideal for businesses needing inventory storage, staging, or distribution support in the Greater Seattle area.",
    image: BRAND_IMAGES.storageWarehouse,
    cta: "Learn About Warehousing",
  },
  {
    title: "Office Moving",
    href: "/office-moving/",
    icon: Monitor,
    popular: false,
    description:
      "Complete office relocation services \u2014 desks, workstations, server equipment, and filing systems moved efficiently to minimize business disruption.",
    image: BRAND_IMAGES.officeMoveAction,
    cta: "Learn About Office Moving",
  },
  {
    title: "Corporate Relocation",
    href: "/corporate-relocation/",
    icon: Handshake,
    popular: false,
    description:
      "End-to-end relocation management for businesses moving employees or entire departments. Coordinated logistics, flexible scheduling, and dedicated project management.",
    image: BRAND_IMAGES.crewCustomerCommercial,
    cta: "Learn About Corporate Relocation",
  },
  {
    title: "Freight Forwarding",
    href: "/freight-forwarding-service/",
    icon: Truck,
    popular: false,
    description:
      "Reliable freight pickup, transport, and delivery for businesses and individuals. Our branded fleet handles oversized loads and time-sensitive freight across the Pacific Northwest.",
    image: BRAND_IMAGES.brandedTruck,
    cta: "Learn About Freight Forwarding",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "On The Go Moving & Storage, Moving Services",
  description: "All moving and storage services offered by On The Go Moving & Storage in Greater Seattle, WA",
  numberOfItems: ALL_SERVICES.length,
  itemListElement: ALL_SERVICES.map((svc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: svc.title,
    url: `https://onthegomoving.com${svc.href}`,
  })),
};

export default function Services() {
  useEffect(() => {
    document.title = "Moving Services in Seattle & Eastside WA | On The Go Moving";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "On The Go Moving & Storage offers residential, commercial, storage, apartment, senior moving, packing, and staging services in Greater Seattle, WA. Serving the area since 2009.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://onthegomoving.com/services/";

    const schemaId = "services-schema";
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(SCHEMA);
    document.head.appendChild(script);
    return () => { document.getElementById(schemaId)?.remove(); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero, pt accounts for fixed header (~96px: 32px top bar + 64px nav) */}
      <section className="pt-28 pb-16 lg:pt-32 lg:pb-20" style={{ backgroundColor: "#1e3a0f" }}>
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-300 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            <Package className="w-3.5 h-3.5" />
            16 Services · Greater Seattle, WA
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-black text-white mb-4">
            Moving &amp; Storage Services
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            From studio apartments to full office relocations, On The Go Moving &amp; Storage has the right crew and equipment for every move. Serving Greater Seattle since 2009.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: Shield, text: "Licensed HG-064180 · USDOT# 2120054" },
              { icon: Clock, text: "Serving Greater Seattle Since 2009" },
              { icon: CheckCircle, text: "4.8 Stars · 393 Google Reviews" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-green-200">
                <item.icon className="w-4 h-4 text-brand-green-light" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-brand-green font-bold text-xs uppercase tracking-widest mb-2">All Services</p>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-3">
              Find the Right Service for Your Move
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Click any service to see pricing, what's included, and get a free quote from our team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SERVICES.map((svc) => (
              <a
                key={svc.href}
                href={svc.href}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {svc.popular && (
                    <span className="absolute top-3 left-3 bg-brand-gold text-brand-forest text-xs font-bold px-2.5 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  {/* Icon badge */}
                  <div className="absolute bottom-3 right-3 bg-brand-green rounded-lg p-2 shadow-md">
                    <svc.icon size={16} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-black text-lg text-brand-forest mb-2 group-hover:text-brand-green transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                    {svc.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-brand-green font-semibold text-sm">
                    {svc.cta}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why On The Go */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-brand-green font-bold text-xs uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="font-display text-3xl font-black text-brand-forest">
              Seattle's Most Trusted Movers Since 2009
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "25,000+", label: "Successful Moves", desc: "Residential, commercial, and specialty moves completed across Greater Seattle." },
              { stat: "4.8★", label: "Google Rating", desc: "393 verified reviews from real customers in Seattle, Bellevue, Redmond, and beyond." },
              { stat: "15+ yrs", label: "In Business", desc: "Locally owned and operated since 2009. We're part of the community we serve." },
              { stat: "Secure", label: "Vault Storage", desc: "Private climate-controlled vault storage at our Redmond facility, managed by our team." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-display text-3xl font-black text-brand-green mb-1">{item.stat}</p>
                <p className="font-bold text-brand-forest text-sm mb-2">{item.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews strip */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#fbc319" color="#fbc319" />)}
            </div>
            <p className="text-brand-forest font-bold text-lg">
              4.8 out of 5 · 393 Google Reviews
            </p>
            <a
              href="https://www.google.com/maps/place/On+The+Go+Moving+%26+Storage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green font-semibold text-sm hover:underline flex items-center gap-1"
            >
              Read reviews on Google <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#1e3a0f" }}>
        <div className="container text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-black text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Get a free, no-obligation quote in under 60 seconds. Flat-rate pricing, professional crews, and secure vault storage available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us/"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-yellow-400 text-brand-forest font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
            >
              GET MY FREE QUOTE <ArrowRight size={16} />
            </a>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base px-8 py-4 rounded-xl transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
            >
              <Phone size={16} />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
