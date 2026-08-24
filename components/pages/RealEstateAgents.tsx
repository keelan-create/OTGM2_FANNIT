"use client";

// =============================================================================
// RealEstateAgents.tsx
// Design: Professional B2B page targeting real estate agents as referral partners.
// Forest green + gold brand palette, Playfair Display headings.
// =============================================================================
import { useEffect, useState } from "react";
import { Phone, Star, Shield, CheckCircle, Users, Gift, TrendingUp, ChevronDown, ChevronUp, ArrowRight, BadgeCheck, Calendar, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { COMPANY } from "@/lib/siteData";

const FAQS = [
  {
    q: "How does your real estate agent referral program work?",
    a: "It's simple: refer your clients to On The Go Moving & Storage for their move, and we take care of the rest. We provide white-glove service to your clients, and you receive a referral fee for every completed move. Contact us to set up your referral account.",
  },
  {
    q: "What referral benefits do you offer real estate agents?",
    a: "We offer competitive referral fees for every completed move, co-branded marketing materials, priority scheduling for your clients, and a dedicated account manager. Contact us to discuss the details of our referral program.",
  },
  {
    q: "Can I offer my clients a discount on moving services?",
    a: "Yes. We offer exclusive discounts for clients referred by real estate agents. This is a great value-add you can offer your clients as part of your service.",
  },
  {
    q: "How do I refer a client?",
    a: "Simply call us at " + COMPANY.phone + " or email us with your client's contact information and move details. We'll reach out to them within 1 business hour to schedule a free quote.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. On The Go Moving & Storage is fully licensed (HG-064180) and insured with general liability and cargo insurance on every move. We can provide a certificate of insurance for any property requirements.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve the entire Greater Seattle area including Seattle, Bellevue, Redmond, Kirkland, Sammamish, Issaquah, Bothell, Renton, Shoreline, and 20+ surrounding communities.",
  },
];

const BENEFITS = [
  {
    icon: Gift,
    color: "bg-amber-100 text-amber-600",
    title: "Referral Fees",
    desc: "Earn competitive referral fees for every client you send our way. We pay promptly after each completed move.",
  },
  {
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
    title: "5-Star Service for Your Clients",
    desc: "Your reputation is on the line with every referral. Our 4.8-star rating across 393 reviews means your clients will thank you.",
  },
  {
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    title: "Dedicated Account Manager",
    desc: "You get a single point of contact at On The Go Moving. No hold times, no runaround, just fast answers.",
  },
  {
    icon: Shield,
    color: "bg-green-100 text-green-700",
    title: "Licensed & Fully Insured",
    desc: "Every move is covered by our general liability and cargo insurance. Your clients' belongings are protected.",
  },
  {
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600",
    title: "Co-Branded Marketing",
    desc: "We provide co-branded moving guides, checklists, and digital assets you can share with clients under your brand.",
  },
  {
    icon: Calendar,
    color: "bg-rose-100 text-rose-600",
    title: "Priority Scheduling",
    desc: "Referred clients get priority booking access, especially important during the busy spring and summer moving season.",
  },
];

export default function RealEstateAgents() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Movers for Real Estate Agents | On The Go Moving";
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Partner with On The Go Moving & Storage. Earn referral fees, offer your clients exclusive discounts, and build your reputation with Seattle's most trusted movers.");
    setMeta("og:title", "Movers for Real Estate Agents | On The Go Moving", true);
    setMeta("og:description", "Partner with On The Go Moving & Storage. Earn referral fees and offer your clients 5-star moving service.", true);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://onthegomoving.com/real-estate-agents/";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15,40,10,0.92) 55%, rgba(15,40,10,0.65) 100%), url(${BRAND_IMAGES.officeMoveWeb})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            <Users className="w-3 h-3" />
            Real Estate Agent Partner Program
          </div>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-5">
              Partner With Seattle's Most Trusted Movers
            </h1>
            <p className="text-green-100 text-lg lg:text-xl mb-8 max-w-2xl">
              Offer your clients a seamless moving experience, and earn referral fees, when you partner with On The Go Moving & Storage. Serving the Greater Seattle area since 2009.
            </p>
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
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-4">
              Why Real Estate Agents Partner With Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We make you look good. When your clients have a great moving experience, they remember who referred them.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-lg hover:border-brand-green/30 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${b.color}`}>
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-brand-forest text-xl mb-2 group-hover:text-brand-green transition-colors">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-black text-brand-forest mb-6">
                How the Referral Program Works
              </h2>
              <div className="space-y-6">
                {[
                  ["1", "Sign Up", "Contact us to set up your referral account. Takes less than 5 minutes. You'll get a dedicated account manager and your unique referral code."],
                  ["2", "Refer Your Clients", "When a client needs moving services, refer them to us by phone, email, or your unique referral link. We take it from there."],
                  ["3", "We Deliver 5-Star Service", "Our crews provide the same white-glove service to your referred clients that has earned us 393 5-star reviews."],
                  ["4", "You Earn a Referral Fee", "After each completed move, we process your referral fee promptly. No complicated tracking, we handle everything."],
                ].map(([num, title, desc]) => (
                  <div key={num} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {num}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-forest text-lg mb-1">{title}</h3>
                      <p className="text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex items-center justify-center gap-3 bg-brand-forest hover:bg-brand-green text-white font-bold text-lg px-8 py-4 rounded-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call to Sign Up
                </a>
                <a href="/contact-us/">
                  <span className="inline-flex items-center justify-center gap-2 border-2 border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white font-bold text-lg px-8 py-4 rounded-lg transition-all cursor-pointer">
                    Online Sign Up
                  </span>
                </a>
              </div>
            </div>
            <div
              className="rounded-2xl overflow-hidden h-96 lg:h-auto"
              style={{
                backgroundImage: `url(${BRAND_IMAGES.heroMovingCrew})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "400px",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER CLIENTS ── */}
      <section className="py-20 bg-brand-forest text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-black mb-4">
              What Your Clients Get
            </h2>
            <p className="text-green-200 text-lg max-w-2xl mx-auto">
              When you refer a client to On The Go Moving & Storage, they receive the same premium service that has made us Seattle's most trusted movers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["Full-Service Moving", "Packing, loading, transport, and unloading, all handled by our professional crews."],
              ["Secure Vault Storage", "Climate-controlled vault storage at our Redmond facility, available for your clients during transitions."],
              ["Flat-Rate Pricing", "No hourly surprises. Your clients know their final cost before we start."],
              ["Licensed & Insured", "Full coverage on every move. Your clients' belongings are protected."],
            ].map(([title, desc], i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-6 border border-white/10">
                <CheckCircle className="w-6 h-6 text-brand-gold mb-3" />
                <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-green-200 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl font-black text-brand-forest mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-brand-forest pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-brand-green flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
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
            <FileText className="w-3.5 h-3.5" /> Join Our Partner Network
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-black text-white mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-green-200 text-lg max-w-xl mx-auto mb-10">
            Join the growing network of Seattle-area real estate agents who trust On The Go Moving &amp; Storage to take care of their clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call {COMPANY.phone}
            </a>
            <a href="/contact-us/">
              <span className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all cursor-pointer">
                Send Us a Message <ArrowRight className="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
