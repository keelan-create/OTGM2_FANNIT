"use client";

// ==========================================================================
// ON THE GO MOVING — Residential Moving Service Page (Redesigned)
// Design: Bold Pacific Utility — asymmetric hero, visual sections, modern cards
// ==========================================================================

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { COMPANY, ALL_LOCATIONS, NAV_SERVICES } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import {
  CheckCircle, Phone, ArrowRight, Star, Shield, Clock,
  Home, Building2, Users, ChevronDown, ChevronUp, MapPin,
  Package, Truck, DollarSign, Award, Zap
} from "lucide-react";

const FAQS = [
  {
    question: "How much does residential moving cost in Seattle?",
    answer: "Most residential moves in the Greater Seattle area cost $100–$175 per hour for a 2-person crew with a truck. A typical 1-bedroom apartment move runs $350–$600, a 2-bedroom home runs $600–$1,200, and a 3-bedroom home runs $1,000–$2,000. On The Go Moving provides flat-rate quotes so you know the exact price before your move date, no surprise charges.",
  },
  {
    question: "How far in advance should I book residential movers in Seattle?",
    answer: "We recommend booking 2–4 weeks in advance for most moves. Summer months (June–August) and end-of-month dates book out fastest, for those, 4–6 weeks is ideal. That said, we accommodate last-minute moves when availability allows. Call us and we'll let you know what's open.",
  },
  {
    question: "Do you move apartments with stairs or no elevator?",
    answer: "Yes, stairs and no-elevator buildings are a routine part of our work across Seattle and the Eastside. Our crews are trained and equipped for multi-story apartment moves. We factor stair access into your quote upfront so there are no surprises on move day.",
  },
  {
    question: "What is included in a full-service residential move?",
    answer: "A full-service residential move with On The Go Moving includes: a trained 2–4 person crew, a moving truck, all moving equipment (dollies, furniture pads, straps, floor runners), careful loading and unloading, and placement of furniture in your new home. Packing and unpacking services are available as an add-on.",
  },
  {
    question: "Do you offer storage with a residential move?",
    answer: "Yes. We offer secure vault storage at our Redmond, WA facility starting at $100/month per vault. This is especially useful if there's a gap between your move-out and move-in dates. Oversized items are $80/month. Contact us for current pricing.",
  },
  {
    question: "Are your movers licensed and insured?",
    answer: "Yes. On The Go Moving & Storage is fully licensed (WA HG-064180) and insured with USDOT# 2120054. All crew members are background-checked and professionally trained. We carry full liability coverage on every move.",
  },
  {
    question: "Can you move heavy or oversized items?",
    answer: "Yes. We have specialized equipment and trained crews for heavy and oversized items including large appliances, safes, pool tables, and oversized furniture. Please mention these items when requesting your quote so we can bring the right equipment.",
  },
  {
    question: "Do you move condos and high-rise apartments in Seattle?",
    answer: "Yes. We regularly move residents in and out of high-rise condos and apartments throughout Seattle, Bellevue, and the Eastside. We coordinate elevator reservations, building move-in/move-out windows, and parking permits as part of our service.",
  },
];

const MOVE_TYPES = [
  {
    icon: Home,
    label: "Single-Family Homes",
    desc: "Full-service moves for 2–5 bedroom homes across the Greater Seattle Eastside.",
    color: "border-brand-green bg-green-50",
    iconColor: "text-brand-green",
  },
  {
    icon: Building2,
    label: "Apartments & Condos",
    desc: "Experienced with stairs, elevators, narrow hallways, and building move-in windows.",
    color: "border-blue-400 bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: Users,
    label: "Senior Moves",
    desc: "Patient, careful crews for downsizing moves and assisted living transitions.",
    color: "border-amber-400 bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: Package,
    label: "Full-Pack Moves",
    desc: "We pack everything, boxes, furniture, fragile items, so you don't have to.",
    color: "border-purple-400 bg-purple-50",
    iconColor: "text-purple-500",
  },
];

const PROCESS_STEPS = [
  {
    icon: Phone,
    step: "Get a Free Quote",
    desc: "Call or fill out our form. Flat-rate quote within 1 hour, no vague estimates.",
  },
  {
    icon: Clock,
    step: "Schedule Your Date",
    desc: "Any day, including weekends. Crew and truck confirmed 48 hours before.",
  },
  {
    icon: Package,
    step: "We Pack & Wrap",
    desc: "Crew arrives on time, wraps all furniture, carefully packs fragile items.",
  },
  {
    icon: Truck,
    step: "Safe Transport",
    desc: "Your belongings travel in clean, well-maintained trucks. We drive carefully.",
  },
  {
    icon: Home,
    step: "Unload & Place",
    desc: "Every item placed exactly where you want it. We don't leave until you're satisfied.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    city: "Bellevue, WA",
    moveType: "3-bedroom home",
    rating: 5,
    text: "On The Go Moving made our move from Bellevue to Redmond completely stress-free. The crew was on time, careful with our furniture, and finished faster than quoted. Highly recommend.",
  },
  {
    name: "James T.",
    city: "Seattle, WA",
    moveType: "Apartment move",
    rating: 5,
    text: "Moved out of a 4th-floor Seattle apartment with no elevator. The crew didn't complain once and had everything out in under 3 hours. Professional and efficient.",
  },
  {
    name: "Linda K.",
    city: "Kirkland, WA",
    moveType: "Senior downsizing",
    rating: 5,
    text: "They helped my mother downsize from her Kirkland home to an assisted living facility. The team was patient, kind, and incredibly careful with her belongings. Worth every penny.",
  },
];

const PRICING = [
  { size: "Studio / 1-Bedroom", crew: "2 movers", duration: "2–4 hrs", cost: "$250–$550" },
  { size: "2-Bedroom Apt or Home", crew: "2–3 movers", duration: "4–6 hrs", cost: "$550–$1,000" },
  { size: "3-Bedroom Home", crew: "3 movers", duration: "5–8 hrs", cost: "$800–$1,400", highlight: true },
  { size: "4–5 Bedroom Home", crew: "3–4 movers", duration: "7–10 hrs", cost: "$1,200–$2,000+" },
];

const INCLUDED = [
  "Trained 2–4 person moving crew",
  "Clean, right-sized moving truck",
  "All dollies, furniture pads & straps",
  "Careful furniture wrapping & protection",
  "Loading, transport & unloading",
  "Furniture placement in your new home",
  "Secure climate-controlled storage",
  "Dedicated move coordinator",
  "Flat-rate pricing, the quote is the price",
  "Floor runners & door frame protection",
];

export default function ResidentialMoving() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Seattle Residential Movers | On The Go Moving";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Professional residential movers in Seattle, Bellevue, Redmond & the Eastside. Flat-rate pricing, secure vault storage, licensed & insured. Free quote.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://onthegomoving.com/residential-moving/";

    // OG + Twitter tags
    const setOG = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const RES_TITLE = "Seattle Residential Movers | On The Go Moving";
    const RES_DESC = "Professional residential movers in Seattle, Bellevue, Redmond & the Eastside. Flat-rate pricing, secure vault storage, licensed & insured. Free quote.";
    const OG_IMAGE = "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-storage-truck.jpg";
    setOG("og:type", "website");
    setOG("og:title", RES_TITLE);
    setOG("og:description", RES_DESC);
    setOG("og:url", "https://onthegomoving.com/residential-moving/");
    setOG("og:image", OG_IMAGE);
    setOG("og:site_name", "On The Go Moving & Storage");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", RES_TITLE);
    setMeta("twitter:description", RES_DESC);
    setMeta("twitter:image", OG_IMAGE);

    const schemaId = "residential-schema";
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Residential Moving Services",
        description: "Professional residential moving services for homes, apartments, and condos in Seattle, Bellevue, Redmond, and the Greater Seattle Eastside.",
        provider: {
          "@type": "MovingCompany",
          name: "On The Go Moving & Storage",
          telephone: "+14257618500",
          address: { "@type": "PostalAddress", addressLocality: "Redmond", addressRegion: "WA", postalCode: "98052", addressCountry: "US" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "393" },
        },
        areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 47.6740, longitude: -122.1215 }, geoRadius: "29000" },
        offers: { "@type": "Offer", priceSpecification: { "@type": "UnitPriceSpecification", price: "100", priceCurrency: "USD", unitText: "per hour" } },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://onthegomoving.com/" },
          { "@type": "ListItem", position: 2, name: "Residential Moving", item: "https://onthegomoving.com/residential-moving/" },
        ],
      },
    ]);
    document.head.appendChild(script);
    return () => { document.getElementById(schemaId)?.remove(); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative pt-[72px] min-h-[620px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10,30,8,0.92) 45%, rgba(10,30,8,0.55) 100%), url(${BRAND_IMAGES.residentialMoving})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Green accent bar on left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-green" />

        <div className="container relative z-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: headline */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 text-green-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <CheckCircle size={12} />
                Licensed HG-064180 · USDOT# 2120054
              </div>
              <h1
                className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Residential Movers<br />
                <span style={{ color: "#75aa11" }}>in Seattle & the Eastside</span>
              </h1>
              <p className="text-green-100 text-lg leading-relaxed mb-6 max-w-lg">
                On The Go Moving & Storage provides professional residential moving services for homes, apartments, and condos across Seattle, Bellevue, Redmond, Kirkland, and the Greater Seattle Eastside. Flat-rate pricing and secure vault storage available.
              </p>
              {/* Trust strip, single line, plain text style */}
              <div className="flex items-center gap-1.5 mb-6 text-xs sm:text-sm text-white/80 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#fbc319" color="#fbc319" />)}
                </div>
                <span className="text-white font-semibold">4.8</span>
                <span className="text-white/50">(393 reviews)</span>
                <span className="text-white/30 mx-1">·</span>
                <Shield size={12} className="text-[#75aa11] flex-shrink-0" />
                <span>Licensed &amp; Insured</span>

              </div>
              {/* Mobile: phone + form inline in hero */}
              <div className="lg:hidden space-y-4">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 text-base w-full sm:w-auto justify-center"
                >
                  <Phone size={16} /> Call {COMPANY.phone}
                </a>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-brand-green">
                  <QuoteForm variant="hero" />
                </div>
              </div>
            </div>

            {/* Desktop: form in right column */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-brand-green">
                <QuoteForm variant="hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { icon: Star, text: "4.8 Stars on Google, 393 Reviews", color: "text-amber-500" },
              { icon: Shield, text: "WA Licensed HG-064180 · USDOT# 2120054", color: "text-brand-green" },
              { icon: Clock, text: "Serving Greater Seattle Since 2009", color: "text-brand-green" },
              { icon: DollarSign, text: "Flat-Rate Pricing, No Hidden Fees", color: "text-brand-green" },
              { icon: Award, text: "Background-Checked Crews", color: "text-brand-green" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={15} className={color} />
                <span className="text-gray-700 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS IT, Direct Answer Block (AEO target) ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">What We Do</p>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                What Is a Residential Moving Service?
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                A residential moving service is a professional crew that transports your household belongings, furniture, boxes, appliances, and specialty items, from your current home to your new one. The service includes a moving truck, all equipment (dollies, furniture pads, straps), and trained movers who load, transport, and unload your belongings safely.
              </p>
              <p className="text-gray-600 leading-relaxed">
                On The Go Moving & Storage provides full-service residential moves across the Greater Seattle Eastside. Every move includes a dedicated crew, a clean moving truck, all necessary equipment, and access to secure climate-controlled storage at our Redmond, WA facility.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="/contact-us/">
                  <span className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-forest text-white font-bold px-5 py-3 rounded-lg transition-all cursor-pointer text-sm">
                    Get Free Quote <ArrowRight size={15} />
                  </span>
                </a>
                <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-bold px-5 py-3 rounded-lg transition-all text-sm">
                  <Phone size={15} /> {COMPANY.phone}
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={BRAND_IMAGES.residentialMoving}
                alt="On The Go Moving crew loading a residential move"
                className="rounded-2xl shadow-xl w-full object-cover"
                style={{ maxHeight: "440px" }}
                loading="lazy"
              />
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-5 py-4 border-l-4 border-brand-green">
                <div className="text-3xl font-extrabold text-brand-green" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>25,000+</div>
                <div className="text-gray-600 text-xs font-medium">Successful Moves Since 2009</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">Who We Help</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Residential Moving for Every Situation
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Whether you're moving a studio apartment or a 5-bedroom home, we have the crew and equipment to handle it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOVE_TYPES.map((mt) => (
              <div key={mt.label} className={`rounded-xl border-2 p-6 ${mt.color} transition-all hover:shadow-md`}>
                <mt.icon size={28} className={`${mt.iconColor} mb-3`} />
                <h3 className="font-bold text-gray-900 text-base mb-2">{mt.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{mt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">What's Included</p>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Everything You Need for a Smooth Move
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every residential move with On The Go Moving includes the following at no extra charge:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INCLUDED.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual callout */}
            <div className="bg-brand-forest rounded-2xl p-8 text-white">
              <div className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-4">Our Promise</div>
              <blockquote className="text-2xl font-bold leading-snug mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                "The quote we give you is the price you pay. No hidden fees, no surprise charges on move day."
              </blockquote>
              <div className="flex items-center gap-3 border-t border-white/20 pt-5">
                <img src={BRAND_IMAGES.logo} alt="On The Go Moving" className="w-10 h-10 rounded-full object-contain bg-white p-1" />
                <div>
                  <div className="font-bold text-sm">On The Go Moving & Storage</div>
                  <div className="text-green-300 text-xs">Serving Seattle Since 2009</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">The Process</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              How a Residential Move Works
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              From first call to final placement, here's exactly what to expect.
            </p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-brand-green/20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {PROCESS_STEPS.map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-green flex items-center justify-center mb-4 shadow-lg relative z-10">
                    <s.icon size={28} className="text-white" />
                  </div>
                  <div className="absolute top-0 right-0 lg:right-auto lg:left-[calc(50%+28px)] w-6 h-6 rounded-full bg-brand-gold text-brand-forest font-extrabold text-xs flex items-center justify-center z-20">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{s.step}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ── */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">Transparent Pricing</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              How Much Does Residential Moving Cost?
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              We believe in honest pricing. Here are real cost ranges for residential moves in the Greater Seattle area.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="grid grid-cols-4 bg-brand-forest text-white text-xs font-bold uppercase tracking-wider px-5 py-3">
              <div>Move Size</div>
              <div className="text-center">Crew</div>
              <div className="text-center">Duration</div>
              <div className="text-right">Est. Cost</div>
            </div>
            {PRICING.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 px-5 py-4 border-b border-gray-100 last:border-0 items-center ${row.highlight ? "bg-green-50 border-l-4 border-l-brand-green" : "bg-white"}`}
              >
                <div className={`font-semibold text-sm flex flex-col gap-1 ${row.highlight ? "text-brand-forest" : "text-gray-800"}`}>
                  <span>{row.size}</span>
                  {row.highlight && <span className="inline-block self-start text-xs bg-brand-green text-white px-2 py-0.5 rounded-full font-bold whitespace-nowrap">Most Common</span>}
                </div>
                <div className="text-center text-gray-600 text-sm">{row.crew}</div>
                <div className="text-center text-gray-600 text-sm">{row.duration}</div>
                <div className={`text-right font-bold text-sm ${row.highlight ? "text-brand-green" : "text-gray-800"}`}>{row.cost}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3 text-center">
            Estimates based on local moves within 18 miles of Redmond, WA. Actual price depends on access, stairs, distance, and add-on services.
          </p>
          <div className="text-center mt-6">
            <a href="/how-much-do-movers-cost/">
              <span className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm hover:underline cursor-pointer">
                See the full pricing guide, How Much Do Movers Cost? <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">Real Reviews</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#fbc319" color="#fbc319" />)}
              <span className="ml-2 text-gray-600 font-semibold text-sm">4.8 ({COMPANY.googleReviewCount.toLocaleString()} Google reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="text-4xl text-brand-green font-serif leading-none mb-3">"</div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">{t.text}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.city} · {t.moveType}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#fbc319" color="#fbc319" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">Common Questions</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Residential Moving FAQ
            </h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-gray-900 pr-4 text-sm leading-snug">
                    {faq.question}
                  </span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-brand-green flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed bg-gray-50 border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section className="py-14 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">Where We Work</p>
            <h2
              className="text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Residential Moving Service Area
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
              We serve all communities within 18 miles of our Redmond, WA warehouse. Click your city for local pricing and availability.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {ALL_LOCATIONS.map((loc) => (
              <a key={loc.href} href={loc.href}>
                <div className="bg-white border border-gray-200 hover:border-brand-green rounded-lg px-4 py-3 flex items-center gap-2 group transition-all cursor-pointer">
                  <MapPin className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-brand-green text-xs font-medium transition-colors">{loc.label} Movers</span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/we-are-local/">
              <span className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm hover:underline cursor-pointer">
                View full service area map <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl font-extrabold text-gray-900 mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Related Moving Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NAV_SERVICES.filter(s => !s.href.includes("residential")).map((s) => (
              <a key={s.href} href={s.href}>
                <div className="bg-gray-50 border border-gray-200 hover:border-brand-green rounded-xl p-4 flex items-center gap-3 group transition-all cursor-pointer">
                  <ArrowRight className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-brand-green font-medium text-sm transition-colors">{s.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#1e3a0f" }}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 text-green-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            <Zap size={12} />
            Free Quote in Under 1 Hour
          </div>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Ready to Book Your Residential Move?
          </h2>
          <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto">
            Get a free, flat-rate quote in under 1 hour. No obligation, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold px-8 py-4 rounded-lg transition-all hover:scale-105 text-base"
            >
              <Phone className="w-5 h-5" />
              Call {COMPANY.phone}
            </a>
            <a href="/contact-us/">
              <span className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-lg transition-all text-base cursor-pointer">
                Get a Free Quote Online <ArrowRight className="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
