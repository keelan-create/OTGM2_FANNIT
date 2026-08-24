"use client";

// ON THE GO MOVING — How Much Do Movers Cost?
// Design: Clean Pacific Utility — AEO-first layout
// AEO Strategy: Direct answer in first 100 words, pricing tables, FAQ schema,
//               entity-rich copy, internal links to all service + location pages
// Target queries: "how much do movers cost", "moving company cost seattle",
//                 "how much does it cost to hire movers", "movers cost per hour"

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { COMPANY } from "@/lib/siteData";
import { CheckCircle, ArrowRight, Phone, Star, AlertCircle, TrendingDown, TrendingUp, Clock } from "lucide-react";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { useSEO, MOVING_COMPANY_SCHEMA, buildFAQSchema } from "@/hooks/useSEO";

const PRICING_TABLE = [
  { size: "Studio / 1-Bedroom", crew: "2 movers", hours: "2–4 hrs", range: "$300–$600", notes: "Minimal furniture, no stairs" },
  { size: "1–2 Bedroom Apartment", crew: "3 movers", hours: "3–5 hrs", range: "$450–$800", notes: "Elevator/stairs add 30–60 min" },
  { size: "2–3 Bedroom Home", crew: "3 movers", hours: "4–7 hrs", range: "$600–$1,200", notes: "Most common move size" },
  { size: "3–4 Bedroom Home", crew: "4 movers", hours: "6–9 hrs", range: "$900–$1,600", notes: "Full household, garage included" },
  { size: "4+ Bedroom / Large Home", crew: "4–5 movers", hours: "8–12 hrs", range: "$1,200–$2,200+", notes: "May require 2 trips or 2 trucks" },
  { size: "Office / Commercial", crew: "3–5 movers", hours: "Varies", range: "Custom quote", notes: "After-hours rates available" },
];

const HOURLY_RATES = [
  { crew: "2 Movers + Truck", rate: "Call for Rate", best: "Studios, 1-bed apartments" },
  { crew: "3 Movers + Truck", rate: "Call for Rate", best: "1–3 bed apartments, small homes" },
  { crew: "4 Movers + Truck", rate: "Call for Rate", best: "3–4 bed homes, large apartments" },
  { crew: "5 Movers + 2 Trucks", rate: "Call for Rate", best: "Large homes, commercial moves" },
];

const COST_FACTORS_UP = [
  { factor: "Stairs or no elevator", impact: "+30–90 min" },
  { factor: "Long carry distance (>75 ft)", impact: "+15–45 min" },
  { factor: "Tight parking / loading dock wait", impact: "+30–60 min" },
  { factor: "Disassembly / reassembly of furniture", impact: "+1–2 hrs" },
  { factor: "Peak season (June–September)", impact: "+10–20% rate" },
  { factor: "Weekend or holiday", impact: "+10–15% rate" },
  { factor: "Last-minute booking (<7 days)", impact: "Limited availability" },
  { factor: "Heavy or oversized items (safes, appliances)", impact: "+$150–$500 flat" },
];

const COST_FACTORS_DOWN = [
  { factor: "Book 4+ weeks in advance", saving: "Best availability & rate" },
  { factor: "Move mid-week (Tue–Thu)", saving: "Lower demand, faster crew" },
  { factor: "Move mid-month (not 1st/last)", saving: "Fewer competing moves" },
  { factor: "Disassemble furniture yourself", saving: "Save 30–60 min" },
  { factor: "Pack boxes before crew arrives", saving: "Save 1–3 hrs" },
  { factor: "Clear a parking spot for the truck", saving: "Avoid carry surcharge" },
  { factor: "Label boxes by room", saving: "Faster unload" },
];

const FAQS = [
  {
    q: "How much does it cost to hire movers in Seattle?",
    a: "In Seattle and the Eastside, most local moves cost between $300 and $1,600 depending on home size, crew size, and move duration. A studio or 1-bedroom typically runs $300–$600 with a 2-person crew. A 2–3 bedroom home averages $600–$1,200 with a 3-person crew. On The Go Moving charges by the hour with no hidden fees.",
  },
  {
    q: "How much do movers charge per hour?",
    a: "On The Go Moving charges by the hour based on crew size. All rates include the moving truck, fuel, basic equipment, and standard valuation coverage. Call us or request a free quote for current rates, pricing varies by season, availability, and move details.",
  },
  {
    q: "Is it cheaper to move yourself or hire movers?",
    a: "For most moves in the Seattle area, hiring professional movers is cost-competitive with DIY when you factor in truck rental, fuel, equipment, and your time. A 2-bedroom DIY move (truck + supplies + time) typically costs $400–$700. A professional 2-bedroom move with On The Go Moving runs $450–$800, and you don't have to do any of the heavy lifting.",
  },
  {
    q: "What is included in the hourly moving rate?",
    a: "On The Go Moving's hourly rate includes the moving truck, fuel, moving blankets and pads, dollies and straps, basic furniture disassembly and reassembly, and standard valuation coverage (60 cents per pound per article). Full-value replacement protection is available for an additional fee.",
  },
  {
    q: "Do movers charge for stairs?",
    a: "On The Go Moving does not charge a flat stair fee. However, stairs and elevators add time to the move, which increases the total cost at our hourly rate. A building with a slow elevator or multiple flights of stairs can add 30–90 minutes to a typical move.",
  },
  {
    q: "What are the hidden costs of 2 hour movers?",
    a: "When hiring movers who advertise a 2-hour minimum, it's important to understand that the final bill often exceeds what the initial rate suggests. Many companies charge extra for travel time, meaning the clock starts when their truck leaves the warehouse — not when they arrive at your door. In the Seattle area, where traffic on I-5, SR-520, or 405 can add significant drive time, this travel fee alone can add 30 to 60 minutes of billable time before a single box is moved. Additional hidden costs often include charges for packing materials like tape, shrink wrap, and moving blankets, fuel surcharges, stair fees for multi-story homes or apartment buildings, and long carry fees if the truck can't park close to your front door. Some companies also round up to the nearest 30-minute or hourly increment, which can inflate your bill unexpectedly.\n\nIn cities like Seattle, Bellevue, or Kirkland, where apartment buildings, condos, and older homes with narrow staircases are common, these add-on fees tend to appear more frequently. Elevator reservations in high-rise buildings, parking permits in dense neighborhoods like Capitol Hill or South Lake Union, and specialty item fees for pianos, safes, or large furniture are all costs that budget-oriented movers may not disclose upfront. It's always wise to ask for a detailed written estimate before booking, and to clarify exactly what is and isn't included in the quoted hourly rate.\n\nWorking with a reputable, fully transparent moving company can save you from bill shock on moving day. On The Go Moving & Storage, for example, operates with straightforward pricing and no hidden fees, which is particularly valuable when navigating the complexities of Seattle-area moves — whether you're relocating a downtown apartment, a Bellevue condo, or a full household across Western Washington. Before committing to any mover, ask specifically about travel time billing, material charges, and any property-specific fees so you can make a true apples-to-apples comparison.",
  },
  {
    q: "How much does it cost to move a 2-bedroom apartment?",
    a: "Moving a 2-bedroom apartment in Seattle or the Eastside typically costs $450–$900 with On The Go Moving. We recommend a 3-person crew for most 1–2 bedroom apartments because the extra mover reduces total hours and often results in a lower final bill than a 2-person crew.",
  },
  {
    q: "Do you offer storage with a move?",
    a: "Yes. On The Go Moving offers secure vault storage at our Redmond, WA facility starting at $100/month per vault. This is particularly useful for apartment renters with a gap between move-out and move-in dates. Contact us for current pricing.",
  },
  {
    q: "How far in advance should I book movers?",
    a: "We recommend booking at least 3–4 weeks in advance, especially for moves during peak season (June–September) or on weekends. Last-minute bookings within 7 days are possible but subject to availability.",
  },
];

const CITY_LINKS = [
  { city: "Seattle", slug: "seattle-movers" },
  { city: "Bellevue", slug: "bellevue-movers" },
  { city: "Redmond", slug: "redmond-movers" },
  { city: "Kirkland", slug: "kirkland-movers" },
  { city: "Bothell", slug: "bothell-movers" },
  { city: "Issaquah", slug: "issaquah-movers" },
  { city: "Sammamish", slug: "sammamish-movers" },
  { city: "Renton", slug: "renton-movers" },
  { city: "Lynnwood", slug: "lynnwood-movers" },
  { city: "Everett", slug: "everett-movers" },
  { city: "Kenmore", slug: "kenmore-movers" },
  { city: "Woodinville", slug: "woodinville-movers" },
];

export default function HowMuchDoMoversCost() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "How Much Do Movers Cost in Seattle? | 2026 Pricing Guide",
    description: "How much do movers cost in Seattle? See typical cost ranges by home size, what affects your price, and cost-saving tips from On The Go Moving.",
    canonical: "https://onthegomoving.com/how-much-do-movers-cost/",
    ogType: "article",
    schema: [
      MOVING_COMPANY_SCHEMA,
      buildFAQSchema(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">

        {/* ── HERO ── */}
        <section
          className="relative min-h-[400px] flex items-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15,40,10,0.92) 50%, rgba(15,40,10,0.65) 100%), url(${BRAND_IMAGES.heroMovingCrew})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container relative z-10 py-14 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <nav className="flex items-center gap-2 text-green-300/70 text-xs mb-5">
                  <a href="/" className="hover:text-white">Home</a>
                  <span>/</span>
                  <span className="text-white">How Much Do Movers Cost?</span>
                </nav>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                  <Clock size={12} />
                  Updated April 2026 · Seattle &amp; Eastside Rates
                </div>
                <h1
                  className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  How Much Do
                  <br />
                  <span style={{ color: "#75aa11" }}>Movers Cost?</span>
                </h1>
                <p className="text-green-100 text-lg leading-relaxed max-w-xl">
                  Most local moves in Seattle and the Eastside cost <strong className="text-white">$300–$1,600</strong> depending on home size and crew. Here's exactly how pricing works, with no surprises.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <QuoteForm variant="hero" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile form */}
        <section className="lg:hidden bg-[#f5f5f3] py-8">
          <div className="container">
            <QuoteForm variant="inline" />
          </div>
        </section>

        {/* ── DIRECT ANSWER (AEO Target) ── */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="container max-w-4xl">
            <div className="bg-[#f0f7e6] border-l-4 rounded-r-xl p-6 mb-8" style={{ borderColor: "#75aa11" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#75aa11" }}>Quick Answer</p>
              <p className="text-gray-800 text-lg leading-relaxed">
                <strong>Local movers in Seattle and the Eastside charge by the hour</strong> depending on crew size. Most moves take 3–7 hours. A typical 2-bedroom move costs <strong>$450–$900</strong>. On The Go Moving charges by the hour with no hidden fees and offers secure vault storage.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2"><CheckCircle size={16} style={{ color: "#75aa11" }} /> Flat hourly rate, no hidden fees</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} style={{ color: "#75aa11" }} /> Truck, fuel &amp; equipment included</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} style={{ color: "#75aa11" }} /> Secure vault storage available</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} style={{ color: "#75aa11" }} /> Free quote in 60 seconds</div>
            </div>
          </div>
        </section>

        {/* ── PRICING TABLE ── */}
        <section className="py-14 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <p className="section-label text-brand-green mb-2">Typical Moving Costs</p>
              <h2
                className="text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Cost by Home Size, Seattle &amp; Eastside
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                These ranges reflect real On The Go Moving jobs in Redmond, Bellevue, Seattle, and Kirkland. Your actual cost depends on crew size, access, and prep.
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-bold uppercase tracking-widest text-white" style={{ backgroundColor: "#1e3a0f" }}>
                    <th className="px-5 py-4">Home Size</th>
                    <th className="px-5 py-4">Crew</th>
                    <th className="px-5 py-4">Typical Hours</th>
                    <th className="px-5 py-4" style={{ color: "#fbc319" }}>Typical Cost</th>
                    <th className="px-5 py-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_TABLE.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f5f3]"}>
                      <td className="px-5 py-4 font-semibold text-gray-900">{row.size}</td>
                      <td className="px-5 py-4 text-gray-600">{row.crew}</td>
                      <td className="px-5 py-4 text-gray-600">{row.hours}</td>
                      <td className="px-5 py-4 font-bold" style={{ color: "#75aa11" }}>{row.range}</td>
                      <td className="px-5 py-4 text-gray-500 text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Rates current as of April 2026. Final cost depends on actual move conditions.{" "}
              <a href="/contact-us/" className="underline" style={{ color: "#75aa11" }}>Get an exact quote →</a>
            </p>
          </div>
        </section>

        {/* ── HOURLY RATES ── */}
        <section className="py-14 bg-[#f5f5f3]">
          <div className="container">
            <div className="text-center mb-10">
              <p className="section-label text-brand-green mb-2">Hourly Rates</p>
              <h2
                className="text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                On The Go Moving, Crew Sizes
              </h2>
              <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">Call or request a free quote for current rates. Pricing varies by season and availability.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HOURLY_RATES.map((r, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                  <p className="text-sm font-bold text-gray-700 mb-2">{r.crew}</p>
                  <p className="text-xl font-extrabold mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#75aa11" }}>{r.rate}</p>
                  <p className="text-xs text-gray-400">{r.best}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-white rounded-xl p-5 border border-gray-200 max-w-2xl mx-auto text-center">
              <AlertCircle size={18} className="inline mr-2" style={{ color: "#fbc319" }} />
              <span className="text-sm text-gray-600">All rates include truck, fuel, equipment, blankets, and standard valuation coverage. Call us for current rates and availability.</span>
            </div>
          </div>
        </section>

        {/* ── COST FACTORS ── */}
        <section className="py-14 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <p className="section-label text-brand-green mb-2">What Affects Your Price</p>
              <h2
                className="text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Why Do Moving Costs Vary?
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                Two homes with the same square footage can have very different costs. Here's what actually changes the price, and what you can control.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-5">
                  <TrendingUp size={22} className="text-red-500" />
                  <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Things That Increase Cost
                  </h3>
                </div>
                <div className="space-y-3">
                  {COST_FACTORS_UP.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-red-100">
                      <span className="text-sm text-gray-700">{f.factor}</span>
                      <span className="text-xs font-bold text-red-600 ml-4 flex-shrink-0">{f.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#f0f7e6", borderColor: "#c5e08a" }}>
                <div className="flex items-center gap-3 mb-5">
                  <TrendingDown size={22} style={{ color: "#75aa11" }} />
                  <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    How to Keep Costs Lower
                  </h3>
                </div>
                <div className="space-y-3">
                  {COST_FACTORS_DOWN.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border" style={{ borderColor: "#c5e08a" }}>
                      <span className="text-sm text-gray-700">{f.factor}</span>
                      <span className="text-xs font-bold ml-4 flex-shrink-0" style={{ color: "#75aa11" }}>{f.saving}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── APARTMENT SECTION ── */}
        <section className="py-14 bg-[#f5f5f3]">
          <div className="container max-w-4xl">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2
                className="text-3xl font-extrabold text-gray-900 mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Apartments &amp; Condos Often Cost More Than You Expect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                With studios and small apartments, the amount of furniture usually isn't the problem, the <strong>building is</strong>. Slow elevators, loading docks, tight parking, and other moving companies using the same space can add significant time to your move.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                For most 1–2 bedroom apartments and condos, we recommend <strong>3 movers instead of 2</strong>. It can feel like you're saving money with fewer movers, but in most apartment moves, the extra mover reduces total hours and often results in a <em>lower</em> final bill.
              </p>
              <div className="bg-[#f0f7e6] rounded-xl p-5 border" style={{ borderColor: "#c5e08a" }}>
                <p className="text-sm font-semibold text-gray-800">
                  <CheckCircle size={16} className="inline mr-2" style={{ color: "#75aa11" }} />
                  Example: A 2-bedroom apartment with a slow elevator. 2 movers × 6 hours = $960. 3 movers × 4 hours = $720. The extra mover saved $240 and 2 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 bg-white">
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <p className="section-label text-brand-green mb-2">Common Questions</p>
              <h2
                className="text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Moving Cost FAQs
              </h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-[#f5f5f3] rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span className="text-xl font-bold ml-4 flex-shrink-0" style={{ color: "#75aa11" }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-200 pt-4 bg-white whitespace-pre-line">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CITY LINKS ── */}
        <section className="py-12 bg-[#f5f5f3]">
          <div className="container">
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-6 text-center"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Moving Cost Guides by City
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CITY_LINKS.map(({ city, slug }) => (
                <a
                  key={slug}
                  href={`/${slug}/`}
                  className="bg-white rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:shadow-md border border-gray-200 transition-all flex items-center gap-2"
                  style={{ color: "inherit" }}
                >
                  <ArrowRight size={14} style={{ color: "#75aa11" }} />
                  {city} Movers
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14" style={{ backgroundColor: "#1e3a0f" }}>
          <div className="container text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#fbc319" color="#fbc319" />)}
            </div>
            <h2
              className="text-4xl font-extrabold text-white mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Get Your Exact Moving Cost in 60 Seconds
            </h2>
            <p className="text-white/70 mb-7 max-w-xl mx-auto">
              No obligation. We respond within 1 hour with a flat-rate quote, no hidden fees, no surprises on move day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact-us/" className="btn-gold text-base px-8 py-3 inline-flex items-center gap-2">
                Get My Free Quote <ArrowRight size={16} />
              </a>
              <a href={COMPANY.phoneHref} className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
                <Phone size={16} /> {COMPANY.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── RELATED RESOURCES ── */}
        <section className="py-10 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Related Resources</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/best-moving-companies-seattle/"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
              >
                10 Best Moving Companies in Seattle (2026)
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
              >
                Seattle Movers
              </a>
              <a
                href="/faq/"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-forest font-semibold text-sm px-4 py-2 rounded-full hover:border-brand-forest hover:shadow-sm transition-all"
              >
                Moving FAQ
              </a>
            </div>
          </div>
        </section>

        {/* ── JSON-LD Schema ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQS.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a },
              })),
            }),
          }}
        />

      </main>
      <Footer />
    </div>
  );
}
