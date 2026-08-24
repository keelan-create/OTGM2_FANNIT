"use client";

// ==========================================================================
// ON THE GO MOVING — Homepage (Redesigned)
// Design: Clean Pacific Utility — matches service page visual language
// Sections: Hero (clean 60/40 split), Stats Bar, Services (icon-accent cards),
//           Why Us (checklist + pull-quote), Testimonials (3-col grid),
//           Locations (linked 2-col grid), FAQ (accordion), CTA (dark forest)
// ==========================================================================

import { useEffect, useRef, useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import {
  Star, CheckCircle, ArrowRight, Phone, ChevronDown, ChevronUp,
  MapPin, Shield, Award, Clock, Users, Package, Truck, Home as HomeIcon,
  Building2, Archive, Dumbbell, Music, Sofa, Landmark, Briefcase,
  Quote, Gem,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import {
  COMPANY, HOME_SERVICES, TESTIMONIALS, STATS, FAQS, ALL_LOCATIONS,
} from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";

// ── Intersection-observer fade-up animation ──────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeUp();
  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
}

// ── Service icon map ──────────────────────────────────────────────────────────
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "residential-moving": <HomeIcon size={18} />,
  "commercial-moving": <Building2 size={18} />,
  "packing-services": <Package size={18} />,
  "storage-services": <Archive size={18} />,
  "labor-only-moving": <Dumbbell size={18} />,
  "specialty-moving": <Gem size={18} />,
  "apartment-moving": <HomeIcon size={18} />,
  "senior-moving": <Users size={18} />,
  "office-moving": <Briefcase size={18} />,
  "piano-moving": <Music size={18} />,
  "furniture-moving": <Sofa size={18} />,
  "condo-moving": <Landmark size={18} />,
};

// ── Top 12 locations shown in the grid ───────────────────────────────────────
const TOP_LOCATIONS = ALL_LOCATIONS.slice(0, 12);

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Schema is injected server-side in app/(main)/page.tsx for static HTML inclusion
  useSEO({
    title: "Seattle Movers – On The Go Moving & Storage",
    description: "On The Go Moving & Storage is Seattle's local moving company. Serving all Seattle neighborhoods, residential, commercial, and apartment moves. Get a free quote today.",
    canonical: "https://onthegomoving.com/",
    ogType: "website",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-[72px] min-h-[700px] flex items-center overflow-hidden bg-[#0a1e06]"
      >
        {/* Static background, always visible as poster/fallback and on mobile */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10,30,6,0.88) 48%, rgba(10,30,6,0.50) 100%), url(${BRAND_IMAGES.threeCrewLoadingTruck})`,
          }}
        />
        {/* Self-hosted hero video, desktop only, PageSpeed optimised
         *  - preload="none": browser does NOT fetch video bytes until page is
         *    interactive — static background image is the LCP element instead
         *  - autoPlay muted loop playsInline: standard autoplay requirements
         *  - object-fit cover: fills the container at any aspect ratio
         *  - No YouTube iframe = no third-party JS, no control flash, no 429s
         *  - 4.5 MB H.264 720p, audio stripped, moov atom at front (faststart)
         */}
        <div className="absolute inset-0 hidden lg:block overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e06]/90 via-[#0a1e06]/60 to-[#0a1e06]/30 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.9,
            }}
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
        </div>



        <div className="container relative z-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* ── Left: Headline + single trust strip ── */}
            <div>
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 bg-[#75aa11]/20 border border-[#75aa11]/40 text-[#a8d060] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <CheckCircle size={12} />
                Moving You Can Rely On, Since 2009
              </div>

              {/* Headline */}
              <h1
                className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Greater Seattle's
                <br />
                <span style={{ color: "#75aa11" }}>Trusted Movers.</span>
              </h1>
              <p className="text-green-100 text-lg leading-relaxed mb-7 max-w-lg">
                Flat-rate pricing, professional crews, and secure vault storage, trusted by 25,000+ Puget Sound families since 2009.
              </p>

              {/* Trust strip, single line, plain text style */}
              <div className="flex items-center gap-1.5 mb-8 text-xs sm:text-sm text-white/80 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#fbc319" color="#fbc319" />)}
                </div>
                <span className="text-white font-semibold">{COMPANY.googleRating}</span>
                <span className="text-white/50">({COMPANY.googleReviewCount.toLocaleString()} reviews)</span>
                <span className="text-white/30 mx-1">·</span>
                <Shield size={12} className="text-[#75aa11] flex-shrink-0" />
                <span>Licensed &amp; Insured</span>

              </div>

              {/* Mobile CTA, phone button + inline form */}
              <div className="lg:hidden space-y-4">
                <a href={COMPANY.phoneHref} className="btn-primary text-base justify-center w-full sm:w-auto">
                  <Phone size={16} /> {COMPANY.phone}
                </a>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <QuoteForm variant="hero" defaultMoveType="house" />
                </div>
              </div>
            </div>
            {/* ── Right: Quote form (desktop only) ── */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <QuoteForm variant="hero" defaultMoveType="house" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-8 relative overflow-hidden">
        <div className="container">
          {/* Progressive green accent bar, grows right, echoing the truck sweep */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{ background: "linear-gradient(to right, transparent 0%, #75aa11 40%, #8fc820 70%, #a8d060 100%)" }}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-4xl font-extrabold"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#75aa11" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f5f3]">
        <div className="container">
          <FadeSection className="text-center mb-10">
            <p className="section-label mb-2">What We Do</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Full-Service Moving Solutions
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From a single room to a full office relocation, we have the crew, equipment, and experience to handle any move in the Seattle area.
            </p>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_SERVICES.map((service) => (
              <FadeSection key={service.slug}>
                <a href={service.href}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-transparent hover:border-[#75aa11]/20 transition-all duration-200 group h-full">
                    {/* Image with icon accent */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Icon accent badge */}
                      <div className="absolute top-3 left-3 bg-[#75aa11] text-white rounded-lg p-1.5 shadow-md">
                        {SERVICE_ICONS[service.slug] ?? <Truck size={18} />}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3
                        className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#75aa11] transition-colors"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-[#75aa11] font-bold text-sm">
                        Learn More <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </a>
              </FadeSection>
            ))}
          </div>

          <FadeSection className="text-center mt-10">
            <a href="/services/" className="btn-primary text-base">
              View All Services <ArrowRight size={16} />
            </a>
          </FadeSection>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <FadeSection>
              <div className="relative">
                <img
                  src={BRAND_IMAGES.teamFleet}
                  alt="On The Go Moving team in front of moving truck"
                  className="rounded-xl shadow-lg w-full object-cover"
                  style={{ maxHeight: "460px" }}
                  loading="lazy"
                />
                {/* Floating stat badge */}
                <div className="absolute -bottom-4 -right-4 bg-[#75aa11] text-white rounded-xl px-5 py-3 shadow-xl text-center hidden sm:block">
                  <div className="text-3xl font-extrabold leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    25,000+
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-90 mt-0.5">Moves Completed</div>
                </div>
              </div>
            </FadeSection>

            {/* Right: Checklist + pull-quote */}
            <FadeSection>
              <p className="section-label mb-2">Why On The Go?</p>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Seattle's Most Trusted Moving Company
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Since {COMPANY.founded}, we've built our reputation one move at a time, with over {COMPANY.googleReviewCount.toLocaleString()} five-star Google reviews and 25,000+ successful moves.
              </p>

              {/* Two-column checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-7">
                {[
                  { icon: <Shield size={15} />, text: "Licensed, bonded & insured" },
                  { icon: <CheckCircle size={15} />, text: "Flat-rate, no hidden fees" },
                  { icon: <Archive size={15} />, text: "Secure vault storage" },
                  { icon: <Users size={15} />, text: "Background-checked crews" },
                  { icon: <Clock size={15} />, text: "On-time, every time" },
                  { icon: <Award size={15} />, text: "4.8★ on Google, 393 reviews" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2.5 text-gray-700 text-sm">
                    <span className="shrink-0 mt-0.5 text-[#75aa11]">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Pull-quote card */}
              <div className="bg-[#f5f5f3] border-l-4 border-[#75aa11] rounded-r-xl p-4 mb-7">
                <div className="flex gap-2 items-start">
                  <Quote size={16} className="text-[#75aa11] shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "We're not just a moving company, we're your neighbors. Every crew member lives and works in the communities we serve."
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="/about-us/" className="btn-primary">
                  About Our Company
                </a>
                <a href={COMPANY.phoneHref} className="btn-gold">
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (3-col grid) ─────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f5f3]">
        <div className="container">
          <FadeSection className="text-center mb-10">
            <p className="section-label mb-2">What Our Customers Say</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {COMPANY.googleReviewCount.toLocaleString()} Five-Star Reviews
            </h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={20} fill="#fbc319" color="#fbc319" />
              ))}
              <span className="ml-2 text-gray-600 font-semibold">{COMPANY.googleRating} on Google</span>
            </div>
          </FadeSection>

          {/* 3-column testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <FadeSection key={t.name}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} fill="#fbc319" color="#fbc319" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-4">
                    "{t.text}"
                  </p>
                  {/* Attribution */}
                  <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#75aa11]/15 flex items-center justify-center text-[#75aa11] font-bold text-sm shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs">{t.location} · {t.date}</div>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS (linked 2-col grid) ────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: heading + description */}
            <FadeSection>
              <p className="section-label mb-2">We Are Local</p>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Serving Greater Seattle &amp; Beyond
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our crews live and work in the communities we serve, giving us unmatched local knowledge and genuine care for every move. We cover 50+ cities within 18 miles of Redmond.
              </p>
              <a href="/we-are-local/" className="btn-primary">
                View All Service Areas <ArrowRight size={16} />
              </a>
            </FadeSection>

            {/* Right: 2-column linked city grid */}
            <FadeSection>
              <div className="grid grid-cols-2 gap-2">
                {TOP_LOCATIONS.map((loc) => (
                  <a
                    key={loc.href}
                    href={loc.href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-100 hover:border-[#75aa11]/40 hover:bg-[#f0f8e8] transition-all text-sm text-gray-700 hover:text-[#1e3a0f] font-medium group"
                  >
                    <MapPin size={13} className="text-[#75aa11] shrink-0 group-hover:scale-110 transition-transform" />
                    {loc.label}
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 pl-1">
                + Woodinville, Kenmore, Mercer Island, and 20+ more cities
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f5f3]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <FadeSection>
              <p className="section-label mb-2">Common Questions</p>
              <h2
                className="text-4xl font-extrabold text-gray-900 mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Have more questions? Our team is happy to help. Call us or get a free quote and we'll walk you through everything.
              </p>
              <a href={COMPANY.phoneHref} className="btn-primary">
                <Phone size={16} /> {COMPANY.phone}
              </a>
            </FadeSection>

            <div className="lg:col-span-2 space-y-3">
              {FAQS.map((faq, i) => (
                <FadeSection key={i}>
                  <div
                    className={`rounded-xl overflow-hidden shadow-sm border transition-colors ${
                      openFaq === i
                        ? "border-[#75aa11]/40 bg-white"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    <button
                      className="w-full flex items-center justify-between p-5 text-left"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span
                        className={`font-bold text-base pr-4 transition-colors ${
                          openFaq === i ? "text-[#75aa11]" : "text-gray-900"
                        }`}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem" }}
                      >
                        {faq.question}
                      </span>
                      {openFaq === i ? (
                        <ChevronUp size={18} className="shrink-0 text-[#75aa11]" />
                      ) : (
                        <ChevronDown size={18} className="shrink-0 text-gray-400" />
                      )}
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-[#75aa11]/10 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEATTLE NEIGHBORHOODS WE SERVE ─────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <FadeSection className="text-center mb-10">
            <p className="text-brand-green text-sm font-bold uppercase tracking-widest mb-2">Where We Work</p>
            <h2
              className="text-3xl lg:text-4xl font-extrabold text-brand-forest mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Seattle Neighborhoods We Serve
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              On The Go Moving serves every Seattle neighborhood, from Capitol Hill condos to West Seattle homes. Our crews know Seattle's streets, building requirements, and parking quirks. We dispatch from our Redmond facility and reach any Seattle neighborhood in under 30 minutes.
            </p>
          </FadeSection>
          <FadeSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { name: "Ballard", desc: "Apartment and condo moves near the Ship Canal, elevator coordination included." },
                { name: "Capitol Hill", desc: "High-density apartment buildings, narrow streets, and strict move-in windows." },
                { name: "Queen Anne", desc: "Hillside homes and walk-up apartments, our crews handle steep carries with ease." },
                { name: "Fremont", desc: "Mixed residential and commercial moves in one of Seattle's most active neighborhoods." },
                { name: "South Lake Union", desc: "Tech company office relocations and high-rise apartment moves near Amazon HQ." },
                { name: "Belltown", desc: "Downtown high-rise condos with loading dock coordination and COI requirements." },
                { name: "Green Lake", desc: "Single-family homes and bungalows, full-service residential moves." },
                { name: "Magnolia", desc: "Waterfront and bluff properties with long carries and limited truck access." },
                { name: "West Seattle", desc: "Family homes and condos across the bridge, we serve all West Seattle zip codes." },
                { name: "Beacon Hill", desc: "Light Rail proximity makes Beacon Hill popular for apartment moves, we know the buildings." },
                { name: "Columbia City", desc: "One of Seattle's most diverse neighborhoods, single-family homes, apartments, and easy I-90 access." },
                { name: "University District", desc: "High-turnover apartment moves near UW, we handle move-in/move-out season efficiently." },
              ].map((n, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-brand-green/30 transition-all">
                  <h3 className="font-bold text-brand-forest text-base mb-1">{n.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-6">
              Don't see your neighborhood?{" "}
              <a href="/seattle-movers/" className="text-brand-green font-semibold hover:underline">View all Seattle moving services →</a>
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ── CTA BANNER (dark forest green, matches service pages) ────────── */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #0f2a08 0%, #1a3a0a 50%, #0f2a08 100%)",
        }}
      >
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <FadeSection className="text-center lg:text-left">
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-white mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Ready to Move? Get Your Free Quote Today.
              </h2>
              <p className="text-white/75 text-lg max-w-xl">
                No obligation. No hidden fees. Just honest, transparent pricing from Seattle's most trusted movers.
              </p>
            </FadeSection>

            <FadeSection className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="/contact-us/" className="btn-gold text-lg px-8 py-3.5 whitespace-nowrap">
                Get Free Quote <ArrowRight size={18} />
              </a>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg px-8 py-3.5 rounded-md transition-colors whitespace-nowrap"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
              >
                <Phone size={18} /> {COMPANY.phone}
              </a>
            </FadeSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
