"use client";

// ON THE GO MOVING — Staging Professionals Page
// Redesigned to match service page / Partners page design language
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { COMPANY } from "@/lib/siteData";
import {
  CheckCircle, Phone, Star, Clock, Shield, Package,
  ArrowRight, BadgeCheck, Warehouse, Wrench, Zap,
  CreditCard, ChevronDown, ChevronUp, Users
} from "lucide-react";

const WHY_US = [
  {
    icon: Clock,
    color: "bg-blue-100 text-blue-600",
    title: "We Understand Your Timelines",
    desc: "Staging windows are tight. We show up on time, work efficiently, and don't hold up your schedule or your client's listing date.",
  },
  {
    icon: Shield,
    color: "bg-green-100 text-green-700",
    title: "Furniture Handled With Care",
    desc: "Staged inventory is valuable. Our crews use furniture pads, stretch wrap, and careful handling techniques to protect every piece.",
  },
  {
    icon: Warehouse,
    color: "bg-amber-100 text-amber-600",
    title: "Storage Between Stagings",
    desc: "Need a place to store inventory between jobs? Our climate-controlled Redmond warehouse is available for staging professionals.",
  },
  {
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    title: "Consistent, Reliable Crews",
    desc: "You'll work with the same experienced team members, not random day laborers. Consistency you can count on for every project.",
  },
];

const SERVICES = [
  {
    icon: Package,
    title: "Staging & De-staging Moves",
    desc: "Fast, efficient furniture delivery and pickup coordinated around your listing schedule.",
  },
  {
    icon: Warehouse,
    title: "Inventory Storage",
    desc: "Climate-controlled warehouse storage in Redmond for your staging inventory between projects.",
  },
  {
    icon: Wrench,
    title: "Furniture Assembly & Placement",
    desc: "Our crews can assemble and precisely place furniture exactly where you need it.",
  },
  {
    icon: Zap,
    title: "Rush & Same-Day Service",
    desc: "Listing date moved up? We offer rush scheduling for established staging partners.",
  },
  {
    icon: Star,
    title: "Fragile & High-Value Items",
    desc: "Artwork, mirrors, glass tables, we handle your most delicate staging pieces with care.",
  },
  {
    icon: CreditCard,
    title: "Flexible Billing",
    desc: "Monthly invoicing available for staging professionals with regular volume.",
  },
];

const FAQS = [
  {
    q: "How do I become a staging partner?",
    a: "Simply call us at " + COMPANY.phone + " or send us a message through our contact form. We'll set up your staging partner account, assign you a dedicated account manager, and discuss your typical project needs.",
  },
  {
    q: "Can you store my staging inventory between projects?",
    a: "Yes. We offer climate-controlled warehouse storage at our Redmond facility specifically for staging professionals. We can store furniture, décor, and accessories between projects and deliver them to your next listing on demand.",
  },
  {
    q: "Do you offer rush or same-day service?",
    a: "Yes, for established staging partners we offer rush and same-day scheduling when available. We understand listing dates can shift, call us as early as possible and we'll do our best to accommodate.",
  },
  {
    q: "How do you handle fragile or high-value staging pieces?",
    a: "Our crews are trained in careful handling of fragile items including artwork, mirrors, glass tables, and decorative pieces. We use furniture pads, stretch wrap, and custom crating when needed.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. On The Go Moving & Storage is fully licensed (WA HG-064180) and insured with general liability and cargo insurance on every move. We can provide a certificate of insurance for any property requirements.",
  },
];

export default function StagingProfessionals() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Movers for Staging Professionals | On The Go Moving";
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Trusted moving partner for staging professionals in Greater Seattle. Staging moves, inventory storage, furniture assembly & rush scheduling. Licensed & insured.");
    setMeta("og:title", "Movers for Staging Professionals | On The Go Moving", true);
    setMeta("og:description", "Trusted by staging professionals across Greater Seattle since 2009. Staging moves, inventory storage, furniture assembly, and flexible billing.", true);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://onthegomoving.com/staging-professionals/";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15,40,10,0.92) 55%, rgba(15,40,10,0.65) 100%), url(${BRAND_IMAGES.officeMoveAction})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline + trust strip + CTAs */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <Package className="w-3 h-3" />
                Staging Professionals
              </div>
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-5">
                Moving Partners for<br />
                <span className="text-brand-gold">Staging Professionals</span>
              </h1>
              <p className="text-green-100 text-lg lg:text-xl mb-7 max-w-xl">
                We know how important it is to feel secure when referring your clients to a moving company. On The Go Moving & Storage has been the trusted moving partner for staging professionals across the Greater Seattle Eastside since 2009.
              </p>
              {/* Single trust strip */}
              <div className="flex flex-wrap items-center gap-3 mb-8 bg-white/10 rounded-xl px-4 py-3 w-fit">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />)}
                  <span className="text-white text-sm font-bold ml-1">4.8</span>
                  <span className="text-white/60 text-xs ml-1">(393 reviews)</span>
                </div>
                <span className="text-white/30">|</span>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-white text-xs font-semibold">Licensed & Insured</span>
                </div>
                <span className="text-white/30">|</span>
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-white text-xs font-semibold">Serving Seattle since 2009</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Call {COMPANY.phone}
                </a>
                <a href="/contact-us/">
                  <span className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all cursor-pointer">
                    Become a Partner
                  </span>
                </a>
              </div>
            </div>

            {/* Right: Partner benefits summary card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="font-display font-bold text-white text-xl mb-5">Why Stagers Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "On-time, efficient crews who respect your listing schedule",
                    "Climate-controlled inventory storage in Redmond",
                    "Furniture assembly and precise placement",
                    "Rush and same-day scheduling available",
                    "Monthly invoicing for regular-volume partners",
                    "Dedicated account manager, no hold times",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-green-100 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-white/20 flex items-center gap-3">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
                  </div>
                  <span className="text-white text-sm font-semibold">Trusted by staging professionals since 2009</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-brand-forest py-5 border-b border-white/10">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {[
              { icon: Star, text: "4.8★ Google Rating (393 reviews)" },
              { icon: Shield, text: "WA Licensed HG-064180 | USDOT 2120054" },
              { icon: BadgeCheck, text: "Serving Greater Seattle Since 2009" },
              { icon: CheckCircle, text: "Fully Licensed & Insured" },
              { icon: Users, text: "Background-Checked Crews" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                <item.icon className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-2">Why We're Different</p>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-4">
              Why Staging Professionals Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We understand the unique demands of staging work, tight timelines, valuable inventory, and the need for a partner you can count on every time.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((w, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:border-brand-green/30 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${w.color}`}>
                  <w.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-brand-forest text-lg mb-2 group-hover:text-brand-green transition-colors">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-2">Getting Started</p>
              <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-8">
                How Our Staging Partnership Works
              </h2>
              <div className="relative space-y-0">
                {[
                  ["1", "Contact Us", "Call or message us to set up your staging partner account. We'll assign you a dedicated account manager and discuss your typical project needs."],
                  ["2", "Share Your Schedule", "Give us your listing calendar and inventory requirements. We'll coordinate pickups, deliveries, and storage around your timeline."],
                  ["3", "We Handle the Move", "Our trained crews arrive on time, handle your inventory with care, and complete staging and de-staging efficiently so you can focus on the design."],
                  ["4", "Ongoing Partnership", "As a regular partner, you get priority scheduling, flexible billing, and a direct line to your account manager for every project."],
                ].map(([num, title, desc], idx, arr) => (
                  <div key={num} className="flex gap-5 relative">
                    {idx < arr.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-brand-green/20" />
                    )}
                    <div className="w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center font-bold text-lg flex-shrink-0 z-10">
                      {num}
                    </div>
                    <div className="pb-8">
                      <h3 className="font-bold text-brand-forest text-lg mb-1">{title}</h3>
                      <p className="text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center justify-center gap-3 bg-brand-forest hover:bg-brand-green text-white font-bold text-lg px-8 py-4 rounded-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call to Get Started
                </a>
                <a href="/contact-us/">
                  <span className="inline-flex items-center justify-center gap-2 border-2 border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white font-bold text-lg px-8 py-4 rounded-lg transition-all cursor-pointer">
                    Send a Message
                  </span>
                </a>
              </div>
            </div>
            <div
              className="rounded-2xl overflow-hidden h-96 lg:h-auto"
              style={{
                backgroundImage: `url(${BRAND_IMAGES.teamFleet})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "420px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES FOR STAGERS ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-4">
              Services Tailored for Staging Professionals
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From staging day moves to long-term inventory storage, we have the services staging professionals need to run a smooth operation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:border-brand-green/30 transition-all group flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-forest mb-2 group-hover:text-brand-green transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER TESTIMONIAL ── */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-2">Partner Feedback</p>
            <h2 className="font-display text-3xl font-black text-brand-forest">What Staging Professionals Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Michelle K.",
                title: "Staging Professional, Kirkland",
                quote: "On The Go has been my go-to moving partner for over three years. Their crews are always on time, handle my inventory with care, and the Redmond storage is a game-changer between projects.",
              },
              {
                name: "Jennifer T.",
                title: "Interior Stager, Bellevue",
                quote: "I've worked with a lot of movers and no one understands staging timelines like On The Go. They show up when they say they will, work efficiently, and never damage a piece. That's everything to me.",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-forest flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-brand-forest text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-2">Common Questions</p>
            <h2 className="font-display text-3xl font-black text-brand-forest">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-100 transition-colors"
                >
                  <span className={`font-semibold pr-4 ${openFaq === i ? "text-brand-green" : "text-brand-forest"}`}>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-brand-green flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0f2808 0%, #1a3a0a 50%, #0f2808 100%)" }}
      >
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Package className="w-3.5 h-3.5" /> Become a Staging Partner
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-black text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-green-200 text-lg max-w-xl mx-auto mb-10">
            Call us to discuss how we can support your staging business and become your go-to moving partner across Greater Seattle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call {COMPANY.phone}
            </a>
            <a href="/partners/">
              <span className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all cursor-pointer">
                View All Partner Programs <ArrowRight className="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
