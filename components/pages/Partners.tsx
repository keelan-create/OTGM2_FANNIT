"use client";

// ==========================================================================
// ON THE GO MOVING — Partners Page
// Design: Matches service page / homepage design language
// Sections: Hero (split), Benefits (4 cards), Partner Types (2 feature cards),
//           How It Works (3-step), Partner Quotes, Awards strip, CTA banner
// ==========================================================================

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { COMPANY } from "@/lib/siteData";
import {
  CheckCircle,
  Phone,
  Star,
  Shield,
  Handshake,
  Home,
  Building2,
  ArrowRight,
  Users,
  Clock,
  Award,
  MessageSquare,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Star,
    color: "bg-amber-50 text-amber-600",
    title: "4.8★ Reputation You Can Stand Behind",
    desc: "With 393 five-star Google reviews, your clients will thank you for the referral, not question it.",
  },
  {
    icon: Shield,
    color: "bg-blue-50 text-blue-600",
    title: "Fully Licensed & Insured",
    desc: "WA License HG-064180 · USDOT# 2120054. Full cargo and liability coverage on every move.",
  },
  {
    icon: Users,
    color: "bg-green-50 text-green-700",
    title: "Dedicated Partner Support",
    desc: "A direct line to our team, no hold queues, no runaround. Your clients get priority scheduling.",
  },
  {
    icon: Award,
    color: "bg-purple-50 text-purple-600",
    title: "Secure Vault Storage",
    desc: "We offer secure vault storage at our Redmond facility starting at $100/month — a convenient option for your clients during transitions.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Sign Up",
    desc: "Call or email us to register as a partner. We'll set you up with a dedicated contact and explain how referrals work.",
  },
  {
    num: "02",
    title: "Refer Your Clients",
    desc: "Send your clients our way, by phone, email, or our online quote form. We'll take it from there and keep you in the loop.",
  },
  {
    num: "03",
    title: "We Handle the Rest",
    desc: "We coordinate directly with your clients, execute a flawless move, and make sure you look great for the referral.",
  },
];

const PARTNER_QUOTES = [
  {
    initials: "SR",
    name: "Sarah R.",
    title: "Real Estate Agent, Bellevue",
    quote:
      "I've been referring On The Go Moving to my clients for over 8 years. They always show up on time, treat every home with care, and make me look good. I wouldn't trust anyone else.",
  },
  {
    initials: "MK",
    name: "Michelle K.",
    title: "Staging Professional, Kirkland",
    quote:
      "For staging and de-staging, timing is everything. On The Go Moving understands that. They're careful with my inventory and always communicate proactively. They're my go-to crew.",
  },
];

const REAL_ESTATE_BENEFITS = [
  "Direct coordination with your clients, you stay focused on closing",
  "Priority scheduling for your referrals",
  "Flat-rate pricing your clients can trust, no surprise invoices",
  "Secure climate-controlled storage available",
  "10+ years of referral relationships with Eastside agents",
  "Licensed, insured, and background-checked crews",
];

const STAGING_BENEFITS = [
  "Fast, careful furniture moves for staging and de-staging",
  "We understand staging timelines and fragile inventory",
  "Flexible scheduling to fit your project calendar",
  "Experienced crews trained in furniture protection",
  "Competitive rates for repeat staging partners",
  "Direct contact with our team, no hold queues",
];

export default function Partners() {
  useEffect(() => {
    document.title = "Partner With Us | On The Go Moving & Storage";
    const meta = document.querySelector("meta[name=\"description\"]");
    if (meta)
      meta.setAttribute(
        "content",
        "Partner with On The Go Moving & Storage. Trusted by real estate agents & stagers across Greater Seattle. 4.8 stars, 393 reviews, licensed & insured."
      );
  }, []);

  return (
    <div className="min-h-screen bg-white font-body">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-[72px] min-h-[580px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15,40,10,0.92) 50%, rgba(15,40,10,0.70) 100%), url(${BRAND_IMAGES.teamFleet})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="container relative z-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline + trust strip */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <Handshake className="w-3.5 h-3.5" /> Partner Program
              </div>
              <h1
                className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Refer With Confidence.
                <br />
                <span style={{ color: "#fbc319" }}>We'll Make You Look Good.</span>
              </h1>
              <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg">
                Real estate agents and staging professionals across the Eastside have trusted On The Go Moving & Storage for over 15 years. Your reputation is on the line every time you make a referral, we take that seriously.
              </p>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80 mb-8">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={13} fill="#fbc319" color="#fbc319" />
                  ))}
                  <span className="font-bold text-white ml-1">4.8</span>
                  <span className="text-white/60">(393 reviews)</span>
                </div>
                <span className="text-white/30 hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={13} style={{ color: "#75aa11" }} />
                  <span>Licensed &amp; Insured</span>
                </div>
                <span className="text-white/30 hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={13} style={{ color: "#75aa11" }} />
                  <span>Since 2009</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-base px-7 py-3.5 rounded-lg transition-all hover:scale-105 shadow-lg"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
                >
                  <Phone className="w-4 h-4" /> Become a Partner
                </a>
                <a
                  href="/contact-us/"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-base px-7 py-3.5 rounded-lg transition-all"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Partner benefits summary card */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-brand-forest px-6 py-4">
                  <h2
                    className="text-white font-extrabold text-xl"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Why Partners Choose Us
                  </h2>
                  <p className="text-green-200 text-sm mt-1">What you and your clients get on every referral</p>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { icon: Star, label: "4.8-star Google rating", sub: "393 verified reviews" },
                    { icon: Shield, label: "Fully licensed & insured", sub: "WA HG-064180 · USDOT# 2120054" },
                    { icon: Users, label: "Priority scheduling for referrals", sub: "Dedicated partner contact" },
                    { icon: Award, label: "Secure vault storage", sub: "Available for all clients" },
                    { icon: Clock, label: "On-time, every time", sub: "15+ years, 25,000+ moves" },
                    { icon: MessageSquare, label: "We coordinate with your clients", sub: "You stay focused on your work" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-brand-green" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{label}</div>
                        <div className="text-gray-500 text-xs">{sub}</div>
                      </div>
                      <CheckCircle className="w-4 h-4 text-brand-green ml-auto shrink-0" />
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-6">
                  <a
                    href={COMPANY.phoneHref}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold py-3 rounded-lg transition-all text-sm"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    <Phone className="w-4 h-4" /> Call {COMPANY.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">What You Get</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Built for Professional Referrals
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Every benefit below is standard, no tiers, no upsells. When you refer us, your clients get the full On The Go experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-brand-green/40 hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${b.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3
                    className="font-bold text-gray-900 mb-2 group-hover:text-brand-forest transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Simple Process</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              How the Partner Program Works
            </h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-brand-green/20" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {STEPS.map((step) => (
                <div key={step.num} className="relative flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-extrabold text-2xl mb-5 shadow-lg z-10"
                    style={{ backgroundColor: "#1e3a0f", fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="text-xl font-extrabold text-gray-900 mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER TYPES ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Who We Work With</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Programs Built for Your Industry
            </h2>
          </div>

          {/* Real Estate Agents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={BRAND_IMAGES.residentialMoving}
                alt="Real estate agent partner program"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-forest text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <Home className="w-3.5 h-3.5" /> Real Estate Agents
              </div>
              <h3
                className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Help Your Clients Move with Confidence
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Help your buyers and sellers transition smoothly. We coordinate directly with your clients so you can stay focused on closing deals. Many Eastside agents have referred us for 10+ years, and they keep coming back because we make them look good.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {REAL_ESTATE_BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle size={15} className="shrink-0 mt-0.5 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/real-estate-agents/"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 text-sm"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
              >
                Real Estate Partner Program <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Staging Professionals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-forest text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <Building2 className="w-3.5 h-3.5" /> Staging Professionals
              </div>
              <h3
                className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Fast, Careful Moves for Staging &amp; De-Staging
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We understand staging timelines and the fragility of staged inventory. Our crews are trained to handle furniture with care, work quickly, and communicate proactively, so your projects stay on schedule.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {STAGING_BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle size={15} className="shrink-0 mt-0.5 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/staging-professionals/"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold px-6 py-3 rounded-lg transition-all hover:scale-105 text-sm"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
              >
                Staging Partner Program <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-md">
              <img
                src={BRAND_IMAGES.officeMoveAction}
                alt="Staging professional partner program"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER QUOTES ───────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Partner Testimonials</p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Trusted by Eastside Professionals Since 2009
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Hundreds of real estate agents, staging professionals, and property managers across Redmond, Bellevue, Kirkland, and Seattle have built long-term referral relationships with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {PARTNER_QUOTES.map((q) => (
              <div
                key={q.name}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={15} fill="#fbc319" color="#fbc319" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5 italic">"{q.quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: "#1e3a0f" }}
                  >
                    {q.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{q.name}</div>
                    <div className="text-gray-500 text-xs">{q.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review platform logos */}
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src={BRAND_IMAGES.googleReviewsBadge} alt="Google Reviews" className="h-14 object-contain" />
            <img src={BRAND_IMAGES.angiLogo} alt="Angi" className="h-14 object-contain" />
            <img src={BRAND_IMAGES.yelpLogo} alt="Yelp" className="h-14 object-contain" />
          </div>
        </div>
      </section>

      {/* ── COMMUNITY & GIVING ─────────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label text-brand-green mb-2">Community Giving</p>
            <h2
              className="text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Organizations We Support
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              On The Go Moving & Storage is proud to give back to the Greater Seattle community. We actively support these organizations because the families and children they serve are the same families we help move every day.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16">
            <a href="https://www.bennettfoundation.org/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
              <img
                src="/assets/bennett-foundation.png"
                alt="The Bennett Foundation"
                className="h-14 object-contain"
              />
            </a>
            <a href="https://www.marchofdimes.org/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
              <img
                src="/assets/march-for-babies.png"
                alt="March for Babies"
                className="h-14 object-contain"
              />
            </a>
            <a href="https://www.marchofdimes.org/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
              <img
                src="/assets/march-of-dimes.png"
                alt="March of Dimes"
                className="h-14 object-contain"
              />
            </a>
            <a href="https://www.seattlechildrens.org/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
              <img
                src="/assets/seattle-childrens.png"
                alt="Seattle Children's Hospital"
                className="h-14 object-contain"
              />
            </a>
            <a href="https://www.girlscouts.org/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
              <img
                src="/assets/girl-scouts.png"
                alt="Girl Scouts of America"
                className="h-14 object-contain"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #1e3a0f 0%, #2d5a1b 100%)" }}
      >
        <div className="container text-center">
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-white mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Ready to Become a Partner?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Call us to discuss the partner program and how we can best serve your clients. We'll set you up the same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
            >
              <Phone className="w-5 h-5" /> {COMPANY.phone}
            </a>
            <a
              href="/contact-us/"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Send Us a Message <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
