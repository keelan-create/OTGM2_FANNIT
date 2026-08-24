"use client";

// ==========================================================================
// ON THE GO MOVING — Header Component
// Design: Mega menu for Services, We Are Local, and About panels.
// Desktop: hover-intent open (150ms delay), outside-click + Escape to close.
// Improvements: backdrop overlay, active state underline, fade+slide animation,
//   "View All Services" link, Most Popular badges, city search filter,
//   regional city grouping in We Are Local panel.
// Mobile: accordion unchanged.
// ==========================================================================
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { COMPANY, NAV_SERVICES, NAV_LOCATIONS, ALL_LOCATIONS } from "@/lib/siteData";
import {
  Phone, Menu, X, ChevronDown, ArrowRight,
  Home as HomeIcon, Building2, Package, Archive,
  Dumbbell, Music, Users, Briefcase, Sofa,
  MapPin, Star, CheckCircle, Search, Gem,
} from "lucide-react";
import { BRAND_IMAGES } from "@/lib/brandImages";

// Icon map for service links
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "/residential-moving/":   <HomeIcon size={16} />,
  "/commercial-moving/":    <Building2 size={16} />,
  "/packing-services/":     <Package size={16} />,
  "/storage-services/":     <Archive size={16} />,
  "/labor-only-moving/":    <Dumbbell size={16} />,
  "/apartment-moving/":     <HomeIcon size={16} />,
  "/senior-moving/":        <Users size={16} />,
};

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "/residential-moving/":   "Homes, condos & apartments",
  "/commercial-moving/":    "Offices & businesses",
  "/packing-services/":     "Full or partial packing",
  "/storage-services/":     "Portable storage bins & vaults",
  "/labor-only-moving/":    "Loading & unloading crews",
  "/apartment-moving/":     "Studio to multi-bedroom",
  "/senior-moving/":        "Careful, patient service",
};

// Services that get a "Most Popular" badge
const MOST_POPULAR_SERVICES = new Set(["/residential-moving/", "/commercial-moving/", "/storage-services/"]);

// About panel items with descriptions
const ABOUT_ITEMS = [
  { label: "About Us",               href: "/about-us/",              desc: "Our story, mission & values" },
  { label: "Our Team",               href: "/about-us/#team",         desc: "Meet the crew behind every move" },
  { label: "Partners",               href: "/partners/",              desc: "Refer clients, earn rewards" },
  { label: "Real Estate Agents",     href: "/real-estate-agents/",    desc: "Preferred mover for your clients" },
  { label: "Staging Professionals",  href: "/staging-professionals/", desc: "Fast, careful furniture moves" },
];

// Regionally grouped cities for We Are Local panel
const CITY_REGIONS = [
  {
    label: "Seattle Core",
    cities: [
      { label: "Seattle",          href: "/seattle-movers/" },
      { label: "Shoreline",        href: "/shoreline-movers/" },
      { label: "Lake Forest Park", href: "/lake-forest-park-movers/" },
      { label: "Burien",           href: "/burien-movers/" },
      { label: "Tukwila",          href: "/tukwila-movers/" },
      { label: "Renton",           href: "/renton-movers/" },
    ],
  },
  {
    label: "Eastside",
    cities: [
      { label: "Bellevue",         href: "/bellevue-movers/" },
      { label: "Redmond",          href: "/redmond-movers/" },
      { label: "Kirkland",         href: "/kirkland-movers/" },
      { label: "Mercer Island",    href: "/mercer-island-movers/" },
      { label: "Newcastle",        href: "/newcastle-movers/" },
      { label: "Sammamish",        href: "/sammamish-movers/" },
      { label: "Issaquah",         href: "/issaquah-movers/" },
    ],
  },
  {
    label: "North / Snohomish",
    cities: [
      { label: "Bothell",          href: "/bothell-movers/" },
      { label: "Kenmore",          href: "/kenmore-movers/" },
      { label: "Woodinville",      href: "/woodinville-movers/" },
      { label: "Mountlake Terrace",href: "/mountlake-terrace-movers/" },
      { label: "Lynnwood",         href: "/lynnwood-movers/" },
      { label: "Mukilteo",         href: "/mukilteo-movers/" },
    ],
  },
  {
    label: "South King / Foothills",
    cities: [
      { label: "Maple Valley",     href: "/maple-valley-movers/" },
      { label: "Covington",        href: "/covington-movers/" },
      { label: "Snoqualmie",       href: "/snoqualmie-movers/" },
      { label: "North Bend",       href: "/north-bend-movers/" },
      { label: "Fall City",        href: "/fall-city-movers/" },
      { label: "Duvall",           href: "/duvall-movers/" },
      { label: "Carnation",        href: "/carnation-movers/" },
    ],
  },
];

// Flat list of all cities for search filtering
const ALL_CITIES_FLAT = CITY_REGIONS.flatMap(r => r.cities);

type PanelKey = "Services" | "We Are Local" | "About" | null;

// Shared panel wrapper with fade+slide animation and backdrop
function PanelWrapper({
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className="absolute top-full left-0 right-0 bg-white border-t-2 border-[#75aa11] shadow-2xl z-50
        animate-in fade-in slide-in-from-top-1 duration-150"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [citySearch, setCitySearch] = useState("");
  const location = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setActivePanel(null);
    setMobileDropdown(null);
    setCitySearch("");
  }, [location]);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // No document-level click listener needed — the backdrop overlay handles
  // outside clicks directly via its onClick handler, which avoids race conditions
  // with link click events inside the header.

  // Escape key closes open panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePanel(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Hover-intent helpers — 150ms open delay, 200ms close delay
  const handleMouseEnter = useCallback((panel: PanelKey) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setActivePanel(panel), 150);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActivePanel(null), 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const closePanel = () => {
    setActivePanel(null);
    setCitySearch("");
  };

  // Filtered cities for search
  const filteredCities = citySearch.trim()
    ? ALL_CITIES_FLAT.filter(c =>
        c.label.toLowerCase().includes(citySearch.toLowerCase())
      )
    : null;

  // ── MEGA PANEL: SERVICES ──────────────────────────────────────────────────
  // NOTE: Panels are rendered as inline JSX (not inner components) to prevent
  // React from unmounting/remounting on each render, which caused the city
  // filter input to lose focus on every keystroke.
  const servicesPanelJSX = (
    <PanelWrapper onMouseEnter={cancelClose} onMouseLeave={handleMouseLeave}>
      <div className="container py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* 3 columns of service links */}
          <div className="col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#75aa11] mb-3">
              Our Services
            </p>
            <div className="grid grid-cols-3 gap-x-6 gap-y-1">
              {NAV_SERVICES.map((svc) => (
                <a
                  key={svc.href}
                  href={svc.href}
                  onClick={closePanel}
                  className="group relative flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-[#f0f8e8] transition-colors"
                >
                  <span className="mt-0.5 shrink-0 w-7 h-7 rounded-md bg-[#e8f4d0] group-hover:bg-[#75aa11] group-hover:text-white text-[#75aa11] flex items-center justify-center transition-colors">
                    {SERVICE_ICONS[svc.href] ?? <Briefcase size={16} />}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-1.5 flex-wrap">
                      <span className="block text-sm font-bold text-gray-800 group-hover:text-[#1e3a0f] leading-tight">
                        {svc.label}
                      </span>
                      {MOST_POPULAR_SERVICES.has(svc.href) && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wide bg-[#fbc319] text-[#1a1a1a] px-1.5 py-0.5 rounded-full leading-none">
                          Popular
                        </span>
                      )}
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {SERVICE_DESCRIPTIONS[svc.href] ?? ""}
                    </span>
                  </span>
                </a>
              ))}
            </div>
            {/* View All Services footer link */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <a
                href="/services/"
                onClick={closePanel}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#75aa11] hover:text-[#1e3a0f] transition-colors"
              >
                Browse all services <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: CTA card */}
          <div className="flex flex-col justify-between">
            <div
              className="rounded-xl p-5 flex flex-col gap-3 h-full"
              style={{ background: "linear-gradient(135deg, #1a3a0a 0%, #2d5c10 100%)" }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#fbc319" color="#fbc319" />)}
                <span className="text-white/80 text-xs ml-1">4.8 · 393 reviews</span>
              </div>
              <p className="text-white font-bold text-base leading-snug" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Get a free quote in under 60 seconds
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                No obligation. Flat-rate pricing. Secure vault storage available.
              </p>
              <a
                href="/contact-us/"
                onClick={closePanel}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-[#fbc319] hover:bg-[#f5b800] text-[#1a1a1a] font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
              >
                GET FREE QUOTE <ArrowRight size={14} />
              </a>
              <a
                href={COMPANY.phoneHref}
                onClick={closePanel}
                className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white text-xs font-semibold transition-colors"
              >
                <Phone size={12} /> {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </PanelWrapper>
  );

  // ── MEGA PANEL: WE ARE LOCAL ──────────────────────────────────────────────
  const locationsPanelJSX = (
    <PanelWrapper onMouseEnter={cancelClose} onMouseLeave={handleMouseLeave}>
      <div className="container py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* City columns with search */}
          <div className="col-span-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#75aa11]">
                Cities We Serve
              </p>
            </div>

            {/* Search input */}
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter cities..."
                value={citySearch}
                onChange={e => setCitySearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#75aa11] focus:ring-1 focus:ring-[#75aa11] bg-gray-50 placeholder:text-gray-400"
                autoComplete="off"
              />
            </div>

            {/* Filtered results */}
            {filteredCities ? (
              filteredCities.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-4 gap-y-0.5">
                  {filteredCities.map(loc => (
                    <a
                      key={loc.href}
                      href={loc.href}
                      onClick={closePanel}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#f0f8e8] group transition-colors"
                    >
                      <MapPin size={12} className="text-[#75aa11] shrink-0 opacity-60 group-hover:opacity-100" />
                      <span className="text-sm text-gray-700 group-hover:text-[#1e3a0f] font-medium">
                        {loc.label}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 py-4 text-center">No cities match "{citySearch}"</p>
              )
            ) : (
              /* Grouped regional view */
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {CITY_REGIONS.map(region => (
                  <div key={region.label}>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-2">
                      {region.label}
                    </p>
                    {region.cities.map(loc => (
                      <a
                        key={loc.href}
                        href={loc.href}
                        onClick={closePanel}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#f0f8e8] group transition-colors"
                      >
                        <MapPin size={12} className="text-[#75aa11] shrink-0 opacity-60 group-hover:opacity-100" />
                        <span className="text-sm text-gray-700 group-hover:text-[#1e3a0f] font-medium">
                          {loc.label}
                        </span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* View all link */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <a
                href="/we-are-local/"
                onClick={closePanel}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#75aa11] hover:text-[#1e3a0f] transition-colors"
              >
                View all 35+ service areas <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: service area card */}
          <div>
            <div
              className="rounded-xl p-5 h-full flex flex-col gap-3"
              style={{ background: "linear-gradient(135deg, #1a3a0a 0%, #2d5c10 100%)" }}
            >
              <p className="text-white font-bold text-base leading-snug" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                18-mile radius from Redmond, WA
              </p>
              <p className="text-white/70 text-xs leading-relaxed">
                Our crews are based in the communities we serve, giving you local knowledge and genuine care on every move.
              </p>
              <ul className="space-y-1.5 mt-1">
                {["Greater Seattle", "Eastside Cities", "South King County", "Snohomish County"].map(area => (
                  <li key={area} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle size={12} className="text-[#75aa11] shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
              <a
                href="/contact-us/"
                onClick={closePanel}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-[#fbc319] hover:bg-[#f5b800] text-[#1a1a1a] font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
              >
                GET FREE QUOTE <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </PanelWrapper>
  );

  // ── MEGA PANEL: ABOUT ─────────────────────────────────────────────────────
  const aboutPanelJSX = (
    <PanelWrapper onMouseEnter={cancelClose} onMouseLeave={handleMouseLeave}>
      <div className="container py-6">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#75aa11] mb-3">
              Company
            </p>
            <div className="space-y-0.5">
              {ABOUT_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closePanel}
                  className="group flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f0f8e8] transition-colors"
                >
                  <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#75aa11] opacity-60 group-hover:opacity-100" />
                  <span>
                    <span className="block text-sm font-bold text-gray-800 group-hover:text-[#1e3a0f] leading-tight">
                      {item.label}
                    </span>
                    <span className="block text-xs text-gray-500 mt-0.5">{item.desc}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="bg-gray-50 rounded-xl p-5 w-full">
              <p className="text-xs font-bold uppercase tracking-widest text-[#75aa11] mb-2">
                Since 2009
              </p>
              <p className="text-gray-800 font-bold text-base leading-snug mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Seattle's most trusted local movers
              </p>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                Over 25,000 successful moves. Licensed, bonded, and insured. Background-checked crews who treat your belongings like their own.
              </p>
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#fbc319" color="#fbc319" />)}
                <span className="text-gray-600 text-xs font-semibold ml-1">4.8 · 393 Google reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelWrapper>
  );

  // ── NAV ITEMS CONFIG ──────────────────────────────────────────────────────
  const NAV_ITEMS: Array<{
    label: string;
    href?: string;
    panel?: PanelKey;
  }> = [
    { label: "Services",              panel: "Services" },
    { label: "How Much Do Movers Cost?", href: "/how-much-do-movers-cost/" },
    { label: "About",                 panel: "About" },
    { label: "We Are Local",          panel: "We Are Local" },
    { label: "Blog",                  href: "/blog/" },
  ];

  // Mobile nav data (unchanged accordion)
  const MOBILE_NAV = [
    {
      label: "Services",
      children: NAV_SERVICES,
    },
    { label: "How Much Do Movers Cost?", href: "/how-much-do-movers-cost/" },
    {
      label: "About",
      children: ABOUT_ITEMS.map(a => ({ label: a.label, href: a.href })),
    },
    {
      label: "We Are Local",
      children: [
        ...NAV_LOCATIONS,
      ],
    },
    { label: "Blog", href: "/blog/" },
  ];

  return (
    <>
      {/* Backdrop overlay, dims page behind open mega panel, closes on click */}
      {activePanel && (
        <div
          className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-150"
          style={{ top: "96px" }} // below the header (top bar ~32px + nav bar ~64px)
          aria-hidden="true"
          onClick={() => {
            if (openTimerRef.current) clearTimeout(openTimerRef.current);
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
            setActivePanel(null);
            setCitySearch("");
          }}
        />
      )}

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        {/* Top bar, hidden on mobile, visible sm+ */}
        <div style={{ backgroundColor: "#1e3a0f" }} className="hidden sm:block py-1.5 px-4">
          <div className="container flex items-center justify-between">
            <p className="text-white/80 text-xs hidden sm:block">
              Seattle's Most Trusted Movers, Licensed &amp; Insured | HG-064180 | USDOT# 2120054
            </p>
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-1.5 text-white font-bold text-sm ml-auto hover:text-yellow-300 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
            >
              <Phone size={14} />
              {COMPANY.phone}
            </a>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src={BRAND_IMAGES.logo}
              alt="On The Go Moving & Storage"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) =>
              item.panel ? (
                <div
                  key={item.label}
                  onMouseEnter={() => handleMouseEnter(item.panel!)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`relative flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded transition-colors ${
                      activePanel === item.panel
                        ? "text-[#75aa11]"
                        : "text-gray-700 hover:text-[#75aa11]"
                    }`}
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                    onClick={() =>
                      setActivePanel(activePanel === item.panel ? null : item.panel!)
                    }
                    aria-expanded={activePanel === item.panel}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activePanel === item.panel ? "rotate-180" : ""
                      }`}
                    />
                    {/* Active state underline */}
                    {activePanel === item.panel && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#75aa11] rounded-full" />
                    )}
                  </button>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href!}
                  className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#75aa11] rounded transition-colors"
                  style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/contact-us/"
              className="hidden md:inline-flex btn-primary text-sm"
            >
              GET FREE QUOTE
            </a>
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-[#75aa11] transition-colors"
              onClick={() => {
                setMobileOpen((prev) => !prev);
                setMobileDropdown(null);
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── MEGA PANELS (desktop only) ── */}
        {activePanel === "Services" && servicesPanelJSX}
        {activePanel === "We Are Local" && locationsPanelJSX}
        {activePanel === "About" && aboutPanelJSX}

        {/* ── MOBILE MENU (accordion, unchanged) ── */}
        {mobileOpen && (
          <div
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 96px)" }}
          >
            <div className="px-4 py-4 space-y-0.5">
              {MOBILE_NAV.map((item) => (
                <div key={item.label}>
                  {"children" in item && item.children ? (
                    <div>
                      <button
                        className="w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-gray-800 rounded-lg hover:bg-gray-50 transition-colors active:bg-gray-100"
                        onClick={() =>
                          setMobileDropdown(mobileDropdown === item.label ? null : item.label)
                        }
                        aria-expanded={mobileDropdown === item.label}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 text-gray-500 ${
                            mobileDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileDropdown === item.label && (
                        <div className="ml-3 mb-1 border-l-2 border-[#75aa11] pl-3 space-y-0.5">
                          {item.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className="block py-2.5 px-2 text-sm text-gray-600 hover:text-[#1e3a0f] hover:bg-[#e8f4d0] rounded transition-colors active:bg-[#d4eaaa]"
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileDropdown(null);
                              }}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={(item as { href: string }).href}
                      className="block px-3 py-3 text-sm font-bold text-gray-800 rounded-lg hover:bg-gray-50 hover:text-[#75aa11] transition-colors active:bg-gray-100"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-3 mt-2 border-t border-gray-100 space-y-2">
                <a
                  href="/contact-us/"
                  className="btn-primary w-full justify-center text-center block"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Free Quote
                </a>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-[#1e3a0f] border-2 border-[#1e3a0f] rounded-lg hover:bg-[#1e3a0f] hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
