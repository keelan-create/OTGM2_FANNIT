"use client";

// ==========================================================================
// ON THE GO MOVING — Locations Hub Page (/we-are-local/)
// Design: Forest green hero, full linked grid of all 26 cities
// SEO: All 26 location pages linked here — this is the hub in the hub-and-spoke
//   internal linking model. Every location page links back here.
// Schema: ItemList of all location pages for LLM/AEO discoverability
// ==========================================================================

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_LOCATIONS, COMPANY } from "@/lib/siteData";
import { MapPin, ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";

export default function Locations() {
  useEffect(() => {
    document.title = "Greater Seattle Movers Near Me | On The Go Moving";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "On The Go Moving & Storage serves all communities within 18 miles of Redmond, WA. Find your city and get a free moving quote today.");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://onthegomoving.com/we-are-local/";

    // ItemList schema — tells LLMs and Google about all location pages
    const schemaId = "locations-schema";
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "On The Go Moving Service Areas, Greater Seattle Eastside",
      description: "All cities served by On The Go Moving & Storage within 18 miles of Redmond, WA",
      numberOfItems: ALL_LOCATIONS.length,
      itemListElement: ALL_LOCATIONS.map((loc, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${loc.label} Movers`,
        url: `https://onthegomoving.com${loc.href}`,
      })),
    });
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
            <MapPin className="w-3.5 h-3.5" />
            18-Mile Service Radius · Redmond, WA
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-black text-white mb-4">
            We Are Local, Greater Seattle Movers
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            On The Go Moving & Storage serves all communities within 18 miles of our Redmond, WA warehouse. Find your city below and get a free quote today.
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

      {/* All 26 Location Pages, fully linked grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-3">All Service Areas</p>
            <h2 className="font-display text-3xl font-black text-brand-forest">
              Find Your City
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Click your city to see local pricing, neighborhood expertise, and get a free quote from your nearest On The Go Moving crew.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ALL_LOCATIONS.map((loc) => (
              <a key={loc.href} href={loc.href}>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-brand-green hover:shadow-md transition-all flex items-center gap-3 group cursor-pointer">
                  <div className="w-9 h-9 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green/20 transition-colors">
                    <MapPin className="w-4 h-4 text-brand-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-brand-forest group-hover:text-brand-green transition-colors text-sm">
                      {loc.label} Movers
                    </p>
                    <p className="text-gray-400 text-xs">Free quote available</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green transition-colors flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why local matters */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="text-brand-green font-semibold text-sm uppercase tracking-widest mb-3">Why Local Matters</p>
          <h2 className="font-display text-3xl font-black text-brand-forest mb-6">
            Based in Redmond. Built for the Eastside.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            On The Go Moving & Storage has been headquartered in Redmond, WA since 2009. Our warehouse, our crews, and our equipment are all within 18 miles of every city we serve. That means faster dispatch, lower travel fees, and crews who know the local roads, buildings, and neighborhoods, not out-of-state contractors who've never navigated a Bellevue high-rise or a Kirkland waterfront condo.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { stat: "18 mi", label: "Maximum distance from our Redmond warehouse to any city we serve" },
              { stat: "393", label: "Verified 5-star Google reviews from local customers" },
              { stat: "15+ yrs", label: "Serving the Greater Seattle Eastside since 2009" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <p className="font-display text-3xl font-black text-brand-green mb-2">{item.stat}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-forest text-white text-center">
        <div className="container">
          <h2 className="font-display text-3xl font-black mb-4">Don't See Your City?</h2>
          <p className="text-green-200 max-w-xl mx-auto mb-8">
            We may still be able to help. Call us or fill out a quote form and we'll let you know if we serve your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold px-8 py-4 rounded-lg transition-all hover:scale-105"
            >
              Call {COMPANY.phone}
            </a>
            <a href="/contact-us/">
              <span className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-lg transition-all cursor-pointer">
                Get a Free Quote
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
