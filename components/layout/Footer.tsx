"use client";

// ==========================================================================
// ON THE GO MOVING — Footer Component
// Design: Deep forest green background, comprehensive link matrix for SEO
// Internal linking: All 26 location pages linked in footer for full link equity
// ==========================================================================

import { COMPANY, NAV_SERVICES, ALL_LOCATIONS, SOCIAL_PROFILES } from "@/lib/siteData";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { BRAND_IMAGES } from "@/lib/brandImages";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#1e3a0f" }} className="text-white">
      {/* Main footer grid */}
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Brand + Contact */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
                src={BRAND_IMAGES.logo}
                alt="On The Go Moving & Storage"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Seattle's most trusted moving company since {COMPANY.founded}. Serving the Greater Seattle Eastside with care, professionalism, and a smile.
            </p>
            <div className="space-y-2.5">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2 text-white/80 hover:text-[#75aa11] transition-colors text-sm font-semibold"
              >
                <Phone size={14} className="shrink-0" style={{ color: "#75aa11" }} />
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 text-white/80 hover:text-[#75aa11] transition-colors text-sm"
              >
                <Mail size={14} className="shrink-0" style={{ color: "#75aa11" }} />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: "#75aa11" }} />
                <span>{COMPANY.address}</span>
              </div>
            </div>

            {/* Google rating badge */}
            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={13} fill="#fbc319" color="#fbc319" />
                ))}
              </div>
              <span className="text-sm font-bold text-white">{COMPANY.googleRating}</span>
              <span className="text-white/60 text-xs">({COMPANY.googleReviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Social profiles: must match schema sameAs (SOCIAL_PROFILES in lib/siteData.ts) */}
            <div className="footer-social mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              {SOCIAL_PROFILES.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${COMPANY.name} on ${p.label}`}
                  className="text-white/75 hover:text-[#75aa11] text-sm font-semibold transition-colors"
                >
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3
              className="text-sm font-bold mb-4 text-white/50 uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Our Services
            </h3>
            <ul className="space-y-2">
              {NAV_SERVICES.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="text-white/75 hover:text-[#75aa11] text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span style={{ color: "#75aa11" }}>→</span>
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/how-much-do-movers-cost/" className="text-white/75 hover:text-[#75aa11] text-sm transition-colors flex items-center gap-1.5">
                  <span style={{ color: "#75aa11" }}>→</span>
                  How Much Do Movers Cost?
                </a>
              </li>
              <li>
                <a href="/best-moving-companies-seattle/" className="text-white/75 hover:text-[#75aa11] text-sm transition-colors flex items-center gap-1.5">
                  <span style={{ color: "#75aa11" }}>→</span>
                  Best Moving Companies Seattle
                </a>
              </li>
              <li>
                <a href="/best-moving-companies-bellevue/" className="text-white/75 hover:text-[#75aa11] text-sm transition-colors flex items-center gap-1.5">
                  <span style={{ color: "#75aa11" }}>→</span>
                  Best Moving Companies Bellevue
                </a>
              </li>
              <li>
                <a href="/best-moving-companies-redmond/" className="text-white/75 hover:text-[#75aa11] text-sm transition-colors flex items-center gap-1.5">
                  <span style={{ color: "#75aa11" }}>→</span>
                  Best Moving Companies Redmond
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Top 13 Location Pages */}
          <div>
            <h3
              className="text-sm font-bold mb-4 text-white/50 uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Top Cities
            </h3>
            <ul className="space-y-2">
              {ALL_LOCATIONS.slice(0, 13).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/75 hover:text-[#75aa11] text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span style={{ color: "#75aa11" }}>→</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Remaining 13 Location Pages */}
          <div>
            <h3
              className="text-sm font-bold mb-4 text-white/50 uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              More Cities
            </h3>
            <ul className="space-y-2">
              {ALL_LOCATIONS.slice(13).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/75 hover:text-[#75aa11] text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span style={{ color: "#75aa11" }}>→</span>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/we-are-local/" className="text-[#75aa11] hover:text-[#a0d040] text-sm font-semibold transition-colors">
                  All Locations →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Company + Quick Links */}
          <div>
            <h3
              className="text-sm font-bold mb-4 text-white/50 uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Company
            </h3>
            <ul className="space-y-2 mb-6">
              {[
                { label: "About Us", href: "/about-us/" },
                { label: "Our Team", href: "/about-us/#team" },
                { label: "Community", href: "/about-us/" },
                { label: "Partners", href: "/partners/" },
                { label: "Refer Us", href: "/about-us/" },
                { label: "Blog", href: "/blog/" },
                { label: "FAQ", href: "/faq/" },
                { label: "Contact Us", href: "/contact-us/" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/75 hover:text-[#75aa11] text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span style={{ color: "#75aa11" }}>→</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/contact-us/"
              className="btn-gold text-sm w-full justify-center"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs text-center sm:text-left">
            © {currentYear} {COMPANY.name}. All rights reserved. | WA License: {COMPANY.license} | USDOT# {COMPANY.usdot}
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy/" className="text-white/50 hover:text-white/80 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service/" className="text-white/50 hover:text-white/80 text-xs transition-colors">
              Terms of Service
            </a>
            <a href="/sitemap/" className="text-white/50 hover:text-white/80 text-xs transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
