"use client";

// ==========================================================================
// ON THE GO MOVING — Service Page Template (Redesigned to match ResidentialMoving)
// Design: Bold Pacific Utility — asymmetric hero, visual sections, modern cards
// Used for: Commercial, Packing, Storage, Labor Only, Specialty, Apartment,
//           Senior, Warehousing, Office, Piano, Furniture, Condo, Corporate
//           Relocation, Appliance, Unpacking, Freight Forwarding
// ==========================================================================

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { COMPANY, ALL_LOCATIONS, NAV_SERVICES } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import {
  CheckCircle, Phone, ArrowRight, Star, Shield, Clock,
  Home, Building2, Users, Package, Truck, DollarSign,
  Award, Zap, MapPin, ChevronDown, ChevronUp,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Service data — one entry per slug
// ---------------------------------------------------------------------------

const SERVICE_DATA: Record<string, {
  title: string;
  metaTitle: string;
  metaDesc: string;
  canonical: string;
  heroTagline: string;
  intro: string;
  whatIsItTitle: string;
  whatIsIt: string;
  benefits: string[];
  whoWeHelp: { icon: React.ElementType; label: string; desc: string; color: string; iconColor: string }[];
  process: { icon: React.ElementType; step: string; desc: string }[];
  pricing: { size: string; crew: string; duration: string; cost: string; highlight?: boolean }[];
  pricingNote: string;
  testimonials: { name: string; city: string; context: string; rating: number; text: string }[];
  faqs: { question: string; answer: string }[];
  image: string;
  imageAlt: string;
  statValue: string;
  statLabel: string;
  ctaHeadline: string;
}> = {

  // ── COMMERCIAL MOVING ─────────────────────────────────────────────────────
  "commercial-moving": {
    title: "Commercial Moving Services",
    metaTitle: "Commercial Moving Services | Seattle & Eastside WA | On The Go Moving",
    metaDesc: "Professional commercial moving services in Seattle, Bellevue, Redmond & the Eastside. Minimize downtime with experienced commercial moving crews. Free quote.",
    canonical: "https://onthegomoving.com/commercial-moving/",
    heroTagline: "Commercial Moving Services, Seattle & the Eastside",
    intro: "On The Go Moving & Storage specializes in commercial relocations for businesses of all sizes, from small offices to large corporate campuses. We work around your schedule to minimize downtime and get your business back up and running as quickly as possible.",
    whatIsItTitle: "What Is Commercial Moving?",
    whatIsIt: "Commercial moving involves relocating a business's equipment, furniture, files, and technology from one location to another. Unlike residential moves, commercial moves require careful planning around business hours, IT infrastructure, and specialized equipment handling. A professional commercial moving company provides project management, after-hours crews, and secure chain-of-custody for sensitive items.",
    benefits: [
      "Weekend and after-hours moves to minimize business disruption",
      "Specialized handling for IT equipment, servers, and electronics",
      "Secure chain-of-custody for sensitive documents and files",
      "Dedicated project manager for large commercial moves",
      "Fully insured with commercial liability coverage",
      "Experience with offices, retail, medical, and industrial moves",
    ],
    whoWeHelp: [
      { icon: Building2, label: "Offices & Startups", desc: "From 5-person offices to 500-person campuses, we plan and execute every detail.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Home, label: "Retail & Storefronts", desc: "Careful handling of fixtures, displays, and inventory with minimal disruption.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Users, label: "Medical & Healthcare", desc: "HIPAA-aware handling of records and sensitive medical equipment.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Package, label: "Industrial & Warehouse", desc: "Heavy equipment, racking systems, and industrial assets moved safely.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Free Site Assessment", desc: "We visit your location to assess the scope and provide an accurate flat-rate quote." },
      { icon: Clock, step: "Move Planning", desc: "Your project manager creates a detailed move plan to minimize operational disruption." },
      { icon: Package, step: "After-Hours Moving", desc: "We execute the move after hours or on weekends so your team can work normally." },
      { icon: Truck, step: "IT & Equipment Setup", desc: "We carefully transport and place all equipment, ready for your IT team to reconnect." },
      { icon: CheckCircle, step: "Final Walkthrough", desc: "We do a final walkthrough to ensure everything is in place and nothing is missed." },
    ],
    pricing: [
      { size: "Small Office (1–10 desks)", crew: "2–3 movers", duration: "4–6 hrs", cost: "$600–$1,200" },
      { size: "Mid-Size Office (10–30 desks)", crew: "3–4 movers", duration: "6–10 hrs", cost: "$1,200–$2,500", highlight: true },
      { size: "Large Office (30–100 desks)", crew: "4–6 movers", duration: "1–2 days", cost: "$2,500–$6,000+" },
      { size: "Corporate Campus", crew: "Custom crew", duration: "Custom", cost: "Custom quote" },
    ],
    pricingNote: "Commercial move pricing depends on number of workstations, floors, distance, and after-hours requirements. We provide flat-rate quotes after a free site assessment.",
    testimonials: [
      { name: "Mark R.", city: "Bellevue, WA", context: "Office relocation", rating: 5, text: "On The Go moved our 30-person office over a weekend. By Monday morning everything was set up and we were fully operational. Incredible execution." },
      { name: "Jennifer L.", city: "Seattle, WA", context: "Medical office move", rating: 5, text: "They handled our medical office move with professionalism and discretion. Sensitive equipment was treated with care. Would absolutely use them again." },
      { name: "David K.", city: "Redmond, WA", context: "Tech startup relocation", rating: 5, text: "Fast, efficient, and no damage to any of our equipment. The project manager kept us informed every step of the way. Highly recommend." },
    ],
    faqs: [
      { question: "Can you move our office over a weekend?", answer: "Absolutely. Weekend and after-hours moves are our specialty for commercial clients. We'll have you set up and ready for Monday morning." },
      { question: "How do you handle sensitive business equipment?", answer: "We use specialized packing materials and equipment for computers, servers, and electronics. All items are inventoried and handled with chain-of-custody protocols." },
      { question: "Do you handle large corporate relocations?", answer: "Yes. We have the crew size, equipment, and project management experience to handle relocations of any scale, from 5-person offices to 500-person corporate campuses." },
      { question: "How much does a commercial move cost?", answer: "Commercial move costs depend on the number of workstations, floors, and distance. We provide flat-rate quotes after a free site assessment. Most small office moves (10–25 workstations) run $1,500–$4,000." },
      { question: "Do you provide a dedicated project manager?", answer: "Yes. Every commercial move gets a dedicated project manager who coordinates logistics, communicates with your team, and is on-site during the move." },
      { question: "Are you insured for commercial moves?", answer: "Yes. We carry full commercial liability insurance and can provide certificates of insurance for your building or landlord as required." },
    ],
    image: BRAND_IMAGES.commercialFleet,
    imageAlt: "On The Go Moving commercial fleet of branded trucks",
    statValue: "500+",
    statLabel: "Commercial Moves Completed",
    ctaHeadline: "Ready to Plan Your Commercial Move?",
  },

  // ── PACKING SERVICES ──────────────────────────────────────────────────────
  "packing-services": {
    title: "Professional Packing Services",
    metaTitle: "Professional Packing Services | Seattle & Eastside WA | On The Go Moving",
    metaDesc: "Expert packing services in Seattle, Bellevue, Redmond & the Eastside. Full-pack, partial-pack, and unpacking. Quality materials, careful handling. Free quote.",
    canonical: "https://onthegomoving.com/packing-services/",
    heroTagline: "Professional Packing Services, Seattle & the Eastside",
    intro: "Our professional packing services take the most time-consuming part of moving off your plate. We use high-quality packing materials and proven techniques to ensure every item, from everyday dishes to fragile antiques, arrives at your new home in perfect condition.",
    whatIsItTitle: "What Are Professional Packing Services?",
    whatIsIt: "Professional packing services involve trained movers carefully wrapping, boxing, and labeling all of your belongings using professional-grade materials. This includes furniture wrapping, dish packing, electronics protection, and custom crating for specialty items. A professional packer works systematically and efficiently, typically completing in hours what takes most homeowners days.",
    benefits: [
      "Full-pack, partial-pack, or fragile-only packing options",
      "High-quality boxes, bubble wrap, and packing paper included",
      "Careful labeling system for easy unpacking",
      "Specialty packing for artwork, mirrors, and antiques",
      "Unpacking services available at your new home",
      "All packing materials included in the quoted price",
    ],
    whoWeHelp: [
      { icon: Home, label: "Busy Families", desc: "No time to pack? We handle everything so you can focus on the move.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Users, label: "Seniors & Downsizers", desc: "Patient, careful packing with extra attention to sentimental items.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Building2, label: "Businesses", desc: "Office packing with inventory lists and chain-of-custody documentation.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Package, label: "Fragile Item Owners", desc: "Specialty packing for artwork, antiques, mirrors, and fine china.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Packing Assessment", desc: "We assess your home and provide a quote for full or partial packing services." },
      { icon: Package, step: "Materials Delivery", desc: "We bring all necessary boxes, tape, bubble wrap, and specialty materials." },
      { icon: CheckCircle, step: "Careful Packing", desc: "Our trained packers systematically pack each room, labeling every box clearly." },
      { icon: Truck, step: "Loading", desc: "Packed boxes and wrapped furniture are loaded securely into the moving truck." },
      { icon: Home, step: "Unpacking (Optional)", desc: "We can unpack and place items in your new home, removing all packing materials." },
    ],
    pricing: [
      { size: "Studio / 1-Bedroom", crew: "1–2 packers", duration: "2–4 hrs", cost: "$200–$450" },
      { size: "2-Bedroom Home", crew: "2 packers", duration: "4–6 hrs", cost: "$400–$700" },
      { size: "3-Bedroom Home", crew: "2–3 packers", duration: "6–8 hrs", cost: "$600–$1,000", highlight: true },
      { size: "4+ Bedroom Home", crew: "3+ packers", duration: "8–12 hrs", cost: "$900–$1,500+" },
    ],
    pricingNote: "Packing pricing includes all materials (boxes, tape, bubble wrap, packing paper). Actual cost depends on home size, number of fragile items, and whether unpacking is included.",
    testimonials: [
      { name: "Rachel T.", city: "Kirkland, WA", context: "Full-pack service", rating: 5, text: "They packed our entire 3-bedroom home in one day. Everything arrived perfectly, not a single broken item. Worth every penny." },
      { name: "Tom B.", city: "Seattle, WA", context: "Fragile items packing", rating: 5, text: "Had them pack just my art collection and fragile items. The care they took was incredible. Everything arrived in perfect condition." },
      { name: "Amy S.", city: "Bellevue, WA", context: "Full-pack + unpack", rating: 5, text: "Full pack and unpack service was a game changer. We moved in on a Saturday and by Sunday evening everything was in its place." },
    ],
    faqs: [
      { question: "How much do packing services cost?", answer: "Packing services are typically charged by the hour or as a flat rate based on home size. A full pack for a 2-bedroom home usually runs $400–$700 in addition to moving costs. We provide an all-inclusive quote." },
      { question: "Do I need to provide any packing materials?", answer: "No. We bring all necessary materials including boxes, tape, bubble wrap, packing paper, and specialty containers. Everything is included in your quote." },
      { question: "Can you pack just fragile items?", answer: "Yes. We offer partial packing services where we pack only your fragile items, artwork, or specific rooms while you handle the rest." },
      { question: "How far in advance should I book packing services?", answer: "We recommend booking packing services at least 1–2 weeks before your move date. For full-pack services, 2–3 weeks is ideal to ensure crew availability." },
      { question: "Do you offer unpacking services too?", answer: "Yes. We offer full unpacking services at your new home, including placing items in rooms, removing all packing materials, and breaking down boxes." },
    ],
    image: BRAND_IMAGES.packingCrew,
    imageAlt: "On The Go Moving professional packing crew",
    statValue: "100%",
    statLabel: "Damage-Free Packing Record",
    ctaHeadline: "Ready to Let Us Handle the Packing?",
  },

  // ── STORAGE SERVICES ──────────────────────────────────────────────────────
  "storage-services": {
    title: "Storage Services",
    metaTitle: "Secure Storage Vaults | Redmond WA | On The Go Moving & Storage",
    metaDesc: "Secure storage vault rental at our Redmond, WA facility. Short and long-term storage for households and businesses. On The Go Moving & Storage.",
    canonical: "https://onthegomoving.com/storage-services/",
    heroTagline: "Secure Storage Vaults in Redmond, WA",
    intro: "On The Go Moving & Storage stores your belongings in large, secure storage vaults at our Redmond, WA facility. This is not a self-serve storage unit, your items are loaded into dedicated vaults, stored safely in our warehouse, and retrieved by our team when you're ready. Contact us for current pricing.",
    whatIsItTitle: "What Are Storage Vaults?",
    whatIsIt: "Storage vaults are large, enclosed containers that hold an entire room's worth of belongings. Unlike traditional self-serve storage units, your items are loaded into a vault by our crew, stored in our secure Redmond, WA warehouse, and retrieved using a forklift when needed. You don't have to navigate a storage facility or move anything yourself, we handle it all. Vault storage is ideal for moves, renovations, and transitions where you need professional handling and a trusted facility.",
    benefits: [
      "Oversized items stored individually at $80/month per item",
      "Large storage vaults, holds a full room's worth of belongings",
      "Secure Redmond, WA warehouse facility with 24/7 monitoring",
      "Professional handling, our crew loads and retrieves your vault",
      "Flexible month-to-month contracts, no long-term commitment required",
      "Full-service access, we bring your vault down with a forklift when needed",
    ],
    whoWeHelp: [
      { icon: Home, label: "Home Sellers & Buyers", desc: "Bridge the gap between move-out and move-in with secure vault storage.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Building2, label: "Businesses", desc: "Store office furniture, equipment, and inventory between locations.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Users, label: "Seniors Downsizing", desc: "Store extra belongings while you decide what to keep, donate, or sell.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Package, label: "Renovation Projects", desc: "Protect your furniture and belongings while your home is being remodeled.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Get a Quote", desc: "Tell us what you need to store and we'll recommend the right vault size." },
      { icon: Truck, step: "We Load Your Vault", desc: "Our crew packs and loads your belongings into a dedicated storage vault." },
      { icon: Shield, step: "Secure Vault Storage", desc: "Your vault is stored in our monitored Redmond, WA warehouse facility." },
      { icon: Clock, step: "Access During Facility Hours", desc: "Visit during business hours or schedule vault retrieval, our team brings it down with a forklift." },
      { icon: Home, step: "We Deliver It Back", desc: "When you're ready, we retrieve your vault and deliver your belongings to your new address." },
    ],
    pricing: [
      { size: "Studio / 1-Bedroom", crew: "1–2 vaults", duration: "Monthly", cost: "$100–$200/mo" },
      { size: "2-Bedroom Home", crew: "2–3 vaults", duration: "Monthly", cost: "$200–$300/mo", highlight: true },
      { size: "3-Bedroom Home", crew: "3–5 vaults", duration: "Monthly", cost: "$300–$500/mo" },
      { size: "Oversized Item", crew: "1 item", duration: "Monthly", cost: "$80/mo" },
      { size: "Short-Term Storage", crew: "Custom", duration: "Daily", cost: "$200/day" },
      { size: "Office / Commercial", crew: "Custom", duration: "Monthly", cost: "Call for quote" },
    ],
    pricingNote: "All vaults are the same size: 7 ft tall × 5 ft wide × 7 ft deep, $100/month per vault. Oversized individual items: $80/month. Short-term storage: $200/day. Month-to-month contracts available at our Redmond, WA facility.",
    testimonials: [
      { name: "Chris M.", city: "Redmond, WA", context: "Storage during home sale", rating: 5, text: "Used their storage vaults for 3 months while our new home was being built. Everything came out in perfect condition. The team was professional and easy to work with throughout." },
      { name: "Lisa P.", city: "Bellevue, WA", context: "Business storage", rating: 5, text: "Stored our office furniture for 6 weeks during our renovation. Professional handling and easy access. Will use again." },
      { name: "Kevin H.", city: "Kirkland, WA", context: "Long-term storage", rating: 5, text: "Stored some furniture for over a year. The vault kept everything protected and the team was great about retrieving items when I needed them." },
    ],
    faqs: [
      { question: "What is a storage vault?", answer: "A storage vault is a large, enclosed container measuring 7 ft tall × 5 ft wide × 7 ft deep, enough to hold an entire room's worth of belongings. Your items are loaded into the vault by our crew, stored in our secure Redmond, WA warehouse, and retrieved by forklift when you need access. It's a fully managed alternative to traditional self-serve storage units." },
      { question: "How much does vault storage cost per month?", answer: "All of our storage vaults are the same size, 7 ft tall × 5 ft wide × 7 ft deep, and cost $100 per month per vault. Oversized individual items are $80/month. Short-term storage is available at $200/day. Most apartments need 1–2 vaults; most homes need 2–5. Contact us for current pricing." },
      { question: "Can I access my vault anytime?", answer: "Vault access is available during facility hours (7am–7pm every day). If your vault is stacked, our team retrieves it using a forklift, just give us a heads up when you'd like access." },
      { question: "Is this the same as a self-serve storage unit?", answer: "No. Our storage vaults are managed by our team, we load, store, and retrieve your belongings for you. You don't navigate a storage facility or move anything yourself. It's a full-service solution designed to work seamlessly with your move." },
      { question: "Is there a minimum storage period?", answer: "No. We offer month-to-month contracts with no long-term commitment required. You can store for as little as one month or as long as you need." },
    ],
    image: BRAND_IMAGES.storageForklift,
    imageAlt: "Storage vault facility at On The Go Moving in Redmond, WA",
    statValue: "$100",
    statLabel: "Per Vault / Month",
    ctaHeadline: "Need Storage? Get a Free Quote Today.",
  },

  // ── LABOR ONLY ────────────────────────────────────────────────────────────
  "labor-only-moving": {
    title: "Labor Only Moving Services",
    metaTitle: "Labor Only Moving Services | Loading & Unloading | On The Go Moving",
    metaDesc: "Professional labor only movers in Seattle, Bellevue, Redmond & the Eastside. Packing up for an out-of-state move, unloading when you arrive, or moving items within your home. Free quote.",
    canonical: "https://onthegomoving.com/labor-only-moving/",
    heroTagline: "Labor Only Moving Services, Seattle & the Eastside",
    intro: "Labor only is a great starting point, but many customers find that adding a full-service truck and crew costs only a little more per hour and removes all the hassle. Ask us about upgrading when you call.",
    whatIsItTitle: "Labor Only Moving, and When to Consider Full Service",
    whatIsIt: "Labor only services provide professional movers for loading, unloading, or furniture rearranging when you supply the truck or container. It's a practical option for same-building moves, PODS loading, or unloading when you arrive from out of state. That said, most customers who call about labor only end up upgrading to a full-service move once they hear how close the price difference is, our crews bring the truck, equipment, and full liability coverage for a small hourly increase.",
    benefits: [
      "Professional crew for loading, unloading, or furniture rearranging",
      "Works with PODS, U-Pack, and all portable container companies",
      "Same trained crews as our full-service moves",
      "Upgrade to a full-service truck and crew for a small hourly increase",
      "Full liability coverage on every job",
      "Available for same-building moves and in-home rearranging",
    ],
    whoWeHelp: [
      { icon: Truck, label: "Out-of-State Movers", desc: "Loading your truck before a long drive? We pack it right so nothing shifts in transit, or upgrade to full service and skip the truck rental entirely.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Package, label: "Arriving in Town", desc: "Just pulled in from out of state? We unload and place everything. Ask about our full-service options for your next move.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Home, label: "Same-Building Moves", desc: "Moving to another unit in your building or complex? We handle the heavy lifting.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Building2, label: "Furniture Rearrangers", desc: "Need heavy items moved within your current home? We handle it safely and efficiently.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Book Your Crew", desc: "Tell us what you need help with and we'll confirm the right crew size and timing." },
      { icon: Clock, step: "Crew Arrives", desc: "Our professional crew arrives on time with dollies, straps, and moving blankets." },
      { icon: Package, step: "Loading or Unloading", desc: "We efficiently load or unload, handling every item with care." },
      { icon: Home, step: "Furniture Placement", desc: "We place furniture exactly where you want it in your space." },
      { icon: CheckCircle, step: "Done!", desc: "Pay only for the hours worked. No hidden fees or fuel surcharges." },
    ],
    pricing: [
      { size: "2 Movers", crew: "2 movers", duration: "2–3 hrs", cost: "Call for quote" },
      { size: "3 Movers", crew: "3 movers", duration: "3–5 hrs", cost: "Call for quote", highlight: true },
      { size: "Custom / Large Job", crew: "Custom", duration: "Custom", cost: "Call for quote" },
    ],
    pricingNote: "Labor only services are charged by the hour. Call or email us for a free quote based on your specific needs, crew size, hours, and job type.",
    testimonials: [
      { name: "Brian W.", city: "Seattle, WA", context: "Out-of-state loading", rating: 5, text: "Needed help loading my truck before driving to Portland. Two guys showed up on time and had everything loaded perfectly in under 2 hours. Saved my back and my weekend." },
      { name: "Stephanie C.", city: "Bothell, WA", context: "Arriving from out of state", rating: 5, text: "Drove in from California and needed help unloading. The crew was fast, careful, and placed everything exactly where I wanted it." },
      { name: "Mike D.", city: "Redmond, WA", context: "Same-building move", rating: 5, text: "Moved from one unit to another in my building. Quick, professional, and no damage to floors or walls." },
    ],
    faqs: [
      { question: "Can you load my truck for an out-of-state move?", answer: "Absolutely. We load one end, your origin, so everything is packed safely and efficiently before your long drive. Call us to get a quote based on your home size and timeline." },
      { question: "Can you unload my truck when I arrive in the Seattle area?", answer: "Yes. If you're moving to the Seattle area and just need help unloading, we'll meet you at your new address and get everything inside and placed." },
      { question: "Do you help with moves between units in the same building?", answer: "Yes. Moving from one apartment to another in the same building or complex is a great fit for labor-only service. We bring the equipment and do the heavy lifting." },
      { question: "Do you work with PODS and portable containers?", answer: "Yes. We regularly work with PODS, U-Pack, and all major portable container companies for loading and unloading." },
      { question: "Do you bring equipment for labor only jobs?", answer: "Yes. Our crew brings dollies, furniture straps, and moving blankets for every labor only job, no extra charge." },
      { question: "Can you help with furniture rearranging inside my home?", answer: "Absolutely. We offer furniture rearranging services for customers who need heavy items moved within their current home." },
    ],
    image: BRAND_IMAGES.laborOnlyCrew,
    imageAlt: "On The Go Moving labor only crew",
    statValue: "One End",
    statLabel: "or Both, We've Got You",
    ctaHeadline: "Need Professional Movers for One Part of Your Move?",
  },

  // ── APARTMENT MOVING ──────────────────────────────────────────────────────
  "apartment-moving": {
    title: "Apartment Moving Services",
    metaTitle: "Apartment Moving Services | Seattle & Eastside WA | On The Go Moving",
    metaDesc: "Professional apartment movers in Seattle, Bellevue, Kirkland & the Eastside. Expert handling of elevators, stairs, and tight spaces. Licensed & insured. Free quote.",
    canonical: "https://onthegomoving.com/apartment-moving/",
    heroTagline: "Apartment Moving Services, Seattle & the Eastside",
    intro: "Apartment moves come with unique challenges, elevators, stairs, narrow hallways, and strict building rules. On The Go Moving's crews are experienced apartment movers who know how to navigate Seattle's high-rises, condos, and urban apartment buildings efficiently and without damage.",
    whatIsItTitle: "What Is Apartment Moving?",
    whatIsIt: "Apartment moving involves relocating belongings from one apartment or condo unit to another. It typically requires navigating elevators, stairwells, and tight spaces, and may involve coordinating with building management for elevator reservations and loading dock access. Professional apartment movers know these requirements and handle them proactively.",
    benefits: [
      "Experienced with Seattle's high-rises, condos, and urban apartments",
      "We handle elevator reservations and building coordination",
      "Protective floor coverings and door jamb protectors included",
      "Efficient crews that work quickly to minimize elevator time",
      "Affordable hourly rates, most apartment moves complete in 2–4 hours",
      "Available 7 days a week including weekends",
    ],
    whoWeHelp: [
      { icon: Building2, label: "High-Rise Residents", desc: "Elevator coordination and building compliance for Seattle's tallest buildings.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Home, label: "Walk-Up Apartment Renters", desc: "Experienced with 2nd, 3rd, and 4th floor walk-ups with no elevator.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Users, label: "First-Time Renters", desc: "We guide you through the process and handle all building requirements.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Package, label: "Condo Owners", desc: "HOA compliance, elevator reservations, and certificate of insurance provided.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Building Coordination", desc: "We contact your building management to reserve elevators and loading docks." },
      { icon: Shield, step: "Protective Setup", desc: "We install floor coverings and door jamb protectors to prevent damage." },
      { icon: Package, step: "Efficient Loading", desc: "Our crew works quickly and systematically to minimize elevator time." },
      { icon: Truck, step: "Safe Transport", desc: "Your belongings travel safely to your new apartment." },
      { icon: Home, step: "Careful Unloading", desc: "We navigate the new building and place everything in your new unit." },
    ],
    pricing: [
      { size: "Studio Apartment", crew: "2 movers", duration: "2–3 hrs", cost: "$250–$450" },
      { size: "1-Bedroom Apartment", crew: "2 movers", duration: "3–5 hrs", cost: "$350–$600", highlight: true },
      { size: "2-Bedroom Apartment", crew: "2–3 movers", duration: "4–7 hrs", cost: "$550–$950" },
      { size: "3-Bedroom Apartment", crew: "3 movers", duration: "6–9 hrs", cost: "$800–$1,300" },
    ],
    pricingNote: "Apartment move pricing is based on home size, number of floors, and elevator access. We factor stair and elevator access into your quote upfront, no surprise charges.",
    testimonials: [
      { name: "Alex P.", city: "Seattle, WA", context: "High-rise apartment move", rating: 5, text: "Moved out of a 12th floor apartment in Capitol Hill. The crew handled the elevator coordination and had everything out in 3 hours. Impressive." },
      { name: "Megan L.", city: "Bellevue, WA", context: "4th floor walk-up", rating: 5, text: "4th floor with no elevator and they didn't even blink. Fast, professional, and no damage to the walls or floors." },
      { name: "Tyler K.", city: "Kirkland, WA", context: "Condo move", rating: 5, text: "They provided the COI for our building and handled all the elevator reservations. Made a complicated move feel simple." },
    ],
    faqs: [
      { question: "How much does apartment moving cost in Seattle?", answer: "Most apartment moves in Seattle cost $300–$800 depending on size and floors. Studio and 1-bedroom moves typically run 2–3 hours at $100–$150/hour for a 2-person crew." },
      { question: "Do you handle high-rise apartments?", answer: "Yes. We're experienced with Seattle's high-rise buildings and know how to coordinate elevator access, loading docks, and building rules efficiently." },
      { question: "What if my building has strict move-in/move-out rules?", answer: "We're familiar with Seattle building requirements and will coordinate with your building management to ensure compliance with all rules and time restrictions." },
      { question: "Do you provide a certificate of insurance for my building?", answer: "Yes. We can provide a certificate of insurance naming your building as an additional insured, as required by most HOAs and building managers." },
      { question: "Can you move a 4th floor apartment with no elevator?", answer: "Yes. Stairs and no-elevator buildings are a routine part of our work across Seattle. We factor stair access into your quote upfront so there are no surprises on move day." },
    ],
    image: BRAND_IMAGES.threeCrewRampLoading,
    imageAlt: "On The Go Moving crew carrying furniture up apartment stairs",
    statValue: "2,000+",
    statLabel: "Apartment Moves Completed",
    ctaHeadline: "Ready to Book Your Apartment Move?",
  },

  // ── SENIOR MOVING ─────────────────────────────────────────────────────────
  "senior-moving": {
    title: "Senior Moving Services",
    metaTitle: "Senior Moving Services | Assisted Living & Downsizing | On The Go Moving",
    metaDesc: "Compassionate senior movers in Seattle, Bellevue, Redmond & the Eastside. Downsizing, assisted living, and retirement community moves. Patient, caring crews. Free quote.",
    canonical: "https://onthegomoving.com/senior-moving/",
    heroTagline: "Senior Moving Services, Seattle & the Eastside",
    intro: "Moving later in life requires a different level of care, patience, and understanding. On The Go Moving's senior moving specialists are trained to provide compassionate, stress-free moves for seniors, whether downsizing to a smaller home, moving to an assisted living facility, or relocating closer to family.",
    whatIsItTitle: "What Are Senior Moving Services?",
    whatIsIt: "Senior moving services are specialized moving services designed for older adults. They typically include extra time for decision-making, assistance with downsizing and donation coordination, careful handling of sentimental items, and coordination with assisted living or retirement community staff. A senior-focused moving company understands the emotional and physical challenges of moving later in life.",
    benefits: [
      "10% senior discount, our way of honoring the people who built this community",
      "Patient, compassionate crews trained for senior moves",
      "Downsizing assistance, we help sort, donate, and dispose",
      "Coordination with assisted living and retirement communities",
      "Extra care for sentimental and fragile items",
      "Flexible scheduling to accommodate medical appointments",
      "Family communication and coordination available",
    ],
    whoWeHelp: [
      { icon: Home, label: "Seniors Downsizing", desc: "Moving from a family home to a smaller residence or condo.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Building2, label: "Assisted Living Moves", desc: "Coordinated moves to assisted living, memory care, and retirement communities.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Users, label: "Families Helping Parents", desc: "We work with adult children to coordinate and execute a parent's move.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Package, label: "Estate Moves", desc: "Careful handling of heirlooms, antiques, and sentimental belongings.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Compassionate Consultation", desc: "We meet with you and your family to understand your needs and timeline." },
      { icon: Package, step: "Downsizing Support", desc: "We help identify items to keep, donate, or dispose of before the move." },
      { icon: CheckCircle, step: "Careful Packing", desc: "We pack with extra care, especially for sentimental and fragile items." },
      { icon: Truck, step: "Coordinated Move", desc: "We coordinate with your new community's move-in requirements and schedule." },
      { icon: Home, step: "Setup & Settling In", desc: "We unpack and arrange your new space to feel like home." },
    ],
    pricing: [
      { size: "1-Bedroom / Studio", crew: "2 movers", duration: "3–5 hrs", cost: "$350–$600" },
      { size: "2-Bedroom Home", crew: "2–3 movers", duration: "5–7 hrs", cost: "$600–$1,000", highlight: true },
      { size: "3-Bedroom Home", crew: "3 movers", duration: "6–9 hrs", cost: "$900–$1,400" },
      { size: "Full Downsizing Service", crew: "Custom", duration: "Custom", cost: "Call for quote" },
    ],
    pricingNote: "We offer a 10% senior discount on all senior moves, mention it when you call or request your quote. Pricing includes extra time for careful handling and placement. Downsizing assistance and donation coordination are available as add-on services.",
    testimonials: [
      { name: "Carol B.", city: "Kirkland, WA", context: "Assisted living move", rating: 5, text: "They moved my mother to her assisted living facility with such patience and kindness. She was nervous but the crew put her completely at ease." },
      { name: "James T.", city: "Bellevue, WA", context: "Downsizing move", rating: 5, text: "Helped my parents downsize from their 4-bedroom home. The crew was patient, careful, and treated every item with respect." },
      { name: "Patricia H.", city: "Seattle, WA", context: "Retirement community move", rating: 5, text: "From packing to placement in her new apartment, the team was wonderful. My mother said it was the easiest move she's ever had." },
    ],
    faqs: [
      { question: "Do you offer a senior discount?", answer: "Yes. We offer a 10% senior discount on all senior moves. Just mention it when you call or request your quote and we'll apply it automatically." },
      { question: "Do you help with downsizing before a senior move?", answer: "Yes. We offer downsizing assistance to help seniors and families sort through belongings, coordinate donations to local charities, and arrange disposal of unwanted items." },
      { question: "Can you coordinate with an assisted living facility?", answer: "Absolutely. We regularly work with assisted living facilities, retirement communities, and memory care centers throughout the Seattle area and are familiar with their move-in procedures." },
      { question: "How do you handle sentimental items?", answer: "We treat every item with the care it deserves. Sentimental items are packed separately, labeled clearly, and given special attention throughout the move." },
      { question: "Can family members be involved in the move?", answer: "Absolutely. We welcome family involvement and can coordinate with adult children who may not be present on move day. We provide regular updates throughout the process." },
      { question: "How far in advance should I book a senior move?", answer: "We recommend booking 3–4 weeks in advance for senior moves to allow time for downsizing assistance and coordination with the new community. However, we can often accommodate shorter timelines." },
    ],
    image: BRAND_IMAGES.customerHandshake,
    imageAlt: "On The Go Moving compassionate senior moving team",
    statValue: "1,000+",
    statLabel: "Senior Moves Completed",
    ctaHeadline: "Let Us Make This Move Easy for Your Family.",
  },

  // ── WAREHOUSING ───────────────────────────────────────────────────────────
  "warehousing-services": {
    title: "Warehousing Services",
    metaTitle: "Warehousing & Business Storage Services | Redmond WA | On The Go Moving",
    metaDesc: "Secure warehousing and business storage at our Redmond, WA facility. Climate-controlled warehouse space for businesses and households. On The Go Moving & Storage.",
    canonical: "https://onthegomoving.com/warehousing-distribution/",
    heroTagline: "Warehousing & Business Storage, Redmond, WA",
    intro: "On The Go Moving & Storage provides professional warehousing solutions for businesses that need secure, flexible storage for inventory, equipment, furniture, and records. Our Redmond, WA warehouse facility offers climate-controlled space with professional handling and logistics support.",
    whatIsItTitle: "What Are Warehousing Services?",
    whatIsIt: "Warehousing services provide businesses with secure, managed storage space for inventory, equipment, and assets. Unlike self-storage, professional warehousing includes handling, inventory management, and logistics support. Our Redmond, WA facility is climate-controlled, 24/7 monitored, and staffed by professional logistics personnel.",
    benefits: [
      "Climate-controlled warehouse space in Redmond, WA",
      "Professional handling and inventory management",
      "Flexible month-to-month contracts",
      "Secure 24/7 monitored facility",
      "Receiving and delivery services available",
      "Ideal for office furniture, inventory, and equipment storage",
    ],
    whoWeHelp: [
      { icon: Building2, label: "Offices & Businesses", desc: "Store office furniture, equipment, and records between locations.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Package, label: "Retailers & E-Commerce", desc: "Inventory staging, receiving, and distribution support.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Home, label: "Contractors & Builders", desc: "Equipment and materials storage between job sites.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Users, label: "Medical & Healthcare", desc: "Secure storage for medical equipment and supplies.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Needs Assessment", desc: "We assess your storage requirements and recommend the right warehousing solution." },
      { icon: Package, step: "Intake & Inventory", desc: "We receive your items, inventory them, and store them securely." },
      { icon: Shield, step: "Ongoing Storage", desc: "Your items are stored in our secure, climate-controlled facility." },
      { icon: Truck, step: "Retrieval & Delivery", desc: "We retrieve and deliver items on demand as your business needs them." },
      { icon: CheckCircle, step: "Reporting", desc: "Detailed inventory reports provided for your records." },
    ],
    pricing: [
      { size: "Small Space (100 sq ft)", crew: "Managed", duration: "Monthly", cost: "$150–$250/mo" },
      { size: "Medium Space (250 sq ft)", crew: "Managed", duration: "Monthly", cost: "$300–$500/mo", highlight: true },
      { size: "Large Space (500 sq ft)", crew: "Managed", duration: "Monthly", cost: "$500–$900/mo" },
      { size: "Custom / Full Warehouse", crew: "Custom", duration: "Custom", cost: "Call for quote" },
    ],
    pricingNote: "Warehousing pricing depends on space required, handling frequency, and services needed. We provide custom quotes for business accounts.",
    testimonials: [
      { name: "Greg S.", city: "Redmond, WA", context: "Office furniture storage", rating: 5, text: "Stored our office furniture for 3 months during a renovation. Professional handling and easy retrieval. Will use again." },
      { name: "Laura M.", city: "Bellevue, WA", context: "Inventory staging", rating: 5, text: "Used their warehouse for inventory staging before our retail launch. Reliable, organized, and responsive team." },
      { name: "Dan K.", city: "Seattle, WA", context: "Equipment storage", rating: 5, text: "Stored construction equipment between projects for 6 months. Secure facility and easy access when we needed items." },
    ],
    faqs: [
      { question: "What types of businesses use your warehousing services?", answer: "We serve a wide range of businesses including offices, retailers, e-commerce companies, contractors, and medical practices that need flexible storage solutions." },
      { question: "Can you receive deliveries on our behalf?", answer: "Yes. We can receive deliveries at our warehouse on your behalf, inspect items, and store them until you're ready for delivery." },
      { question: "Is the warehouse climate-controlled?", answer: "Yes. Our entire warehouse facility is climate-controlled, protecting sensitive inventory, electronics, and furniture from temperature and humidity damage." },
      { question: "Do you offer inventory management?", answer: "Yes. We provide detailed inventory tracking and reporting for business accounts, so you always know what's in storage and where it is." },
    ],
    image: BRAND_IMAGES.storageWarehouse,
    imageAlt: "On The Go Moving warehousing facility interior",
    statValue: "25,000+",
    statLabel: "Sq Ft of Warehouse Space",
    ctaHeadline: "Need Warehousing for Your Business?",
  },

  // ── OFFICE MOVING ─────────────────────────────────────────────────────────
  "office-moving": {
    title: "Office Moving Services",
    metaTitle: "Office Moving Services | Commercial Office Relocation | On The Go Moving",
    metaDesc: "Professional office movers in Seattle, Bellevue, Redmond & the Eastside. Minimize downtime with experienced office relocation crews. Free quote. Licensed & insured.",
    canonical: "https://onthegomoving.com/office-moving/",
    heroTagline: "Office Moving Services, Seattle & the Eastside",
    intro: "On The Go Moving & Storage specializes in office relocations for businesses of all sizes, from small startups to large corporate offices. We work around your schedule, move after hours or on weekends, and have your office fully operational by Monday morning.",
    whatIsItTitle: "What Is Office Moving?",
    whatIsIt: "Office moving involves the professional relocation of workstations, furniture, IT equipment, filing systems, and office supplies from one commercial space to another. A professional office move minimizes downtime, protects sensitive equipment, and keeps your business running with minimal disruption. Unlike residential moves, office moves require careful planning around business hours and IT infrastructure.",
    benefits: [
      "After-hours and weekend moves to eliminate business downtime",
      "Specialized handling for computers, servers, and AV equipment",
      "Dedicated project manager for every commercial move",
      "Secure chain-of-custody documentation for sensitive files",
      "Workstation disassembly and reassembly included",
      "Fully insured with commercial liability coverage",
    ],
    whoWeHelp: [
      { icon: Building2, label: "Startups & Small Offices", desc: "Fast, efficient moves for 5–25 person offices with minimal downtime.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Users, label: "Mid-Size Companies", desc: "Coordinated moves for 25–100 person offices with dedicated project management.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Package, label: "Tech Companies", desc: "Careful handling of servers, workstations, and specialized IT equipment.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Home, label: "Medical & Professional Offices", desc: "HIPAA-aware handling of records and sensitive medical equipment.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Free Site Assessment", desc: "We visit your office to assess scope, access, and create an accurate flat-rate quote." },
      { icon: Clock, step: "Move Plan", desc: "Your dedicated project manager creates a detailed move plan with a room-by-room layout." },
      { icon: Package, step: "After-Hours Move", desc: "Our crew arrives after your team leaves and works through the night if needed." },
      { icon: Truck, step: "IT & Equipment Care", desc: "Computers, monitors, and servers are carefully packed and transported." },
      { icon: CheckCircle, step: "Setup & Walkthrough", desc: "We place everything per your floor plan and do a final walkthrough before we leave." },
    ],
    pricing: [
      { size: "Small Office (1–10 desks)", crew: "2–3 movers", duration: "4–6 hrs", cost: "$600–$1,200" },
      { size: "Mid-Size Office (10–30 desks)", crew: "3–4 movers", duration: "6–10 hrs", cost: "$1,200–$2,500", highlight: true },
      { size: "Large Office (30–100 desks)", crew: "4–6 movers", duration: "1–2 days", cost: "$2,500–$6,000+" },
      { size: "Corporate Campus", crew: "Custom", duration: "Custom", cost: "Custom quote" },
    ],
    pricingNote: "Office move costs depend on the number of workstations, floors, and distance. We provide flat-rate quotes after a free site assessment.",
    testimonials: [
      { name: "Sarah K.", city: "Seattle, WA", context: "25-person office move", rating: 5, text: "Moved our entire office over a Saturday. By Monday morning everything was set up and we were fully operational. Incredible team." },
      { name: "Michael R.", city: "Bellevue, WA", context: "Tech startup relocation", rating: 5, text: "They handled all our servers and workstations with care. Project manager kept us informed every step. Zero downtime." },
      { name: "Jennifer T.", city: "Redmond, WA", context: "Medical office move", rating: 5, text: "Professional, discreet, and careful with our medical equipment and records. Would absolutely use them again." },
    ],
    faqs: [
      { question: "Can you move our office over a weekend?", answer: "Yes, weekend and after-hours moves are our specialty for commercial clients. We can have your office fully moved and set up before your team arrives Monday morning." },
      { question: "How do you handle computers and servers?", answer: "We use anti-static packing materials and specialized boxes for all electronics. Servers are transported upright in padded crates. We recommend your IT team disconnect and reconnect equipment, but we handle all physical transport." },
      { question: "Do you provide a dedicated project manager?", answer: "Yes. Every office move gets a dedicated project manager who coordinates logistics, communicates with your team, and is on-site during the move." },
      { question: "How much does an office move cost?", answer: "Office move costs depend on the number of workstations, floors, and distance. We provide flat-rate quotes after a free site assessment. Most small office moves (10–25 workstations) run $1,500–$4,000." },
    ],
    image: BRAND_IMAGES.crewWrappingOffice,
    imageAlt: "On The Go Moving office relocation team",
    statValue: "500+",
    statLabel: "Office Moves Completed",
    ctaHeadline: "Ready to Plan Your Office Move?",
  },

  // ── FURNITURE MOVING ──────────────────────────────────────────────────────
  "furniture-moving": {
    title: "Furniture Moving Services",
    metaTitle: "Furniture Moving Services | Seattle & Eastside WA | On The Go Moving",
    metaDesc: "Professional furniture movers in Seattle, Bellevue, Redmond & the Eastside. Single items to full households. Careful handling, no damage guarantee. Free quote.",
    canonical: "https://onthegomoving.com/furniture-moving/",
    heroTagline: "Furniture Moving Services, Seattle & the Eastside",
    intro: "Whether you need to move a single piece of furniture across town or an entire household, On The Go Moving & Storage provides careful, professional furniture moving services throughout the Greater Seattle area. We bring all the equipment needed to protect your furniture and your home.",
    whatIsItTitle: "What Is Professional Furniture Moving?",
    whatIsIt: "Furniture moving is the professional transport of individual pieces or entire sets of furniture, sofas, beds, dressers, dining tables, entertainment centers, and more, from one location to another. Professional furniture movers use moving blankets, stretch wrap, dollies, and straps to prevent damage during loading, transport, and unloading.",
    benefits: [
      "Moving blankets and stretch wrap on every piece",
      "Furniture disassembly and reassembly included",
      "Floor runners and door jamb protectors to protect your home",
      "Available for single-item moves and full households",
      "Experienced with oversized, antique, and custom furniture",
      "Flat-rate pricing, no surprise charges",
    ],
    whoWeHelp: [
      { icon: Home, label: "Homeowners", desc: "Moving furniture between rooms or to a new home.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Building2, label: "Businesses", desc: "Office furniture moves, staging, and reconfiguration.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Users, label: "Antique & Art Collectors", desc: "White-glove handling for valuable and irreplaceable pieces.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Package, label: "Online Buyers & Sellers", desc: "Single-item pickup and delivery for marketplace purchases.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Free Quote", desc: "Tell us what you need moved and we provide a flat-rate quote." },
      { icon: Package, step: "Disassembly", desc: "We disassemble beds, shelving units, and large furniture pieces for safe transport." },
      { icon: CheckCircle, step: "Wrapping & Loading", desc: "Every piece is wrapped in moving blankets and secured in the truck." },
      { icon: Truck, step: "Transport", desc: "Your furniture travels safely in our clean, padded moving trucks." },
      { icon: Home, step: "Placement & Reassembly", desc: "We place furniture exactly where you want it and reassemble everything." },
    ],
    pricing: [
      { size: "1–3 Items", crew: "2 movers", duration: "1–2 hrs", cost: "$150–$300" },
      { size: "Small Room (4–8 items)", crew: "2 movers", duration: "2–3 hrs", cost: "$250–$450", highlight: true },
      { size: "Full Bedroom Set", crew: "2 movers", duration: "3–5 hrs", cost: "$400–$700" },
      { size: "Full Household", crew: "2–3 movers", duration: "5–8 hrs", cost: "$600–$1,200" },
    ],
    pricingNote: "Furniture move pricing depends on number of items, floors, and distance. Disassembly and reassembly are included at no extra charge.",
    testimonials: [
      { name: "Nicole B.", city: "Seattle, WA", context: "Single item move", rating: 5, text: "Needed a large sectional sofa moved to a new apartment. They handled it perfectly, no damage to the sofa or the walls." },
      { name: "Paul M.", city: "Bellevue, WA", context: "Full bedroom set", rating: 5, text: "Moved our entire bedroom set including a king bed and armoire. Disassembled and reassembled everything perfectly." },
      { name: "Sandra K.", city: "Kirkland, WA", context: "Antique furniture", rating: 5, text: "Had several antique pieces moved. They treated each one with incredible care. Everything arrived in perfect condition." },
    ],
    faqs: [
      { question: "Can you move just one piece of furniture?", answer: "Yes. We offer single-item furniture moves throughout the Greater Seattle area. Call us for a quote, we'll let you know if we can accommodate your timeline." },
      { question: "Do you disassemble and reassemble furniture?", answer: "Yes. Disassembly and reassembly of beds, shelving, and large furniture is included in our service at no extra charge." },
      { question: "How do you protect hardwood floors during a furniture move?", answer: "We use floor runners, felt pads under furniture legs, and dollies with rubber wheels to protect hardwood, tile, and carpet during every move." },
      { question: "Can you move antique furniture?", answer: "Yes. We have experience moving antique and high-value furniture. We use extra padding, custom wrapping, and take additional care with fragile or irreplaceable pieces. Please mention antiques when booking." },
    ],
    image: BRAND_IMAGES.heroMovingCrew,
    imageAlt: "On The Go Moving furniture moving crew",
    statValue: "5,000+",
    statLabel: "Furniture Items Moved",
    ctaHeadline: "Need Furniture Moved Carefully?",
  },

  // ── CONDO MOVING ──────────────────────────────────────────────────────────
  "condo-moving": {
    title: "Condo Moving Services",
    metaTitle: "Condo Moving Services | Elevator & HOA Specialists | On The Go Moving",
    metaDesc: "Professional condo movers in Seattle, Bellevue, Kirkland & the Eastside. Elevator coordination, HOA compliance, and careful handling. Free quote.",
    canonical: "https://onthegomoving.com/condo-moving/",
    heroTagline: "Condo Moving Services, Seattle & the Eastside",
    intro: "Condo moves come with unique challenges, elevator reservations, HOA move-in windows, limited parking for moving trucks, and tight hallways. On The Go Moving & Storage has navigated hundreds of condo moves across Seattle and the Eastside, and we know exactly how to handle every building's requirements.",
    whatIsItTitle: "What Is Condo Moving?",
    whatIsIt: "Condo moving is the relocation of belongings from or to a condominium unit. Unlike house moves, condo moves require coordination with building management for elevator reservations, certificates of insurance, move-in time windows, and parking permits. Professional condo movers know these requirements and handle them proactively.",
    benefits: [
      "Elevator reservation coordination with your building management",
      "Certificate of insurance provided for HOA requirements",
      "Experience with Seattle's most complex condo buildings",
      "Furniture protection to prevent damage in tight hallways",
      "Compliance with all building move-in rules and time windows",
      "Available 7 days a week including weekends",
    ],
    whoWeHelp: [
      { icon: Building2, label: "High-Rise Condo Owners", desc: "Elevator coordination and COI for Seattle's tallest condo buildings.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Home, label: "Low-Rise Condo Residents", desc: "Efficient moves for 2–4 story condo buildings with limited parking.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Users, label: "HOA-Managed Communities", desc: "Full compliance with HOA rules, time windows, and insurance requirements.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Package, label: "New Construction Buyers", desc: "Move-in coordination for newly constructed condo buildings.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Building Requirements Check", desc: "We contact your building to confirm elevator reservations, COI requirements, and move-in windows." },
      { icon: Shield, step: "Certificate of Insurance", desc: "We provide a COI naming your building as additional insured as required." },
      { icon: Package, step: "Protective Setup", desc: "We install floor coverings and elevator pads to prevent damage." },
      { icon: Truck, step: "Efficient Move", desc: "Our crew works efficiently within your building's time window." },
      { icon: Home, step: "Final Walkthrough", desc: "We inspect the building's common areas for any issues before leaving." },
    ],
    pricing: [
      { size: "Studio Condo", crew: "2 movers", duration: "2–3 hrs", cost: "$250–$450" },
      { size: "1-Bedroom Condo", crew: "2 movers", duration: "3–5 hrs", cost: "$350–$650", highlight: true },
      { size: "2-Bedroom Condo", crew: "2–3 movers", duration: "5–7 hrs", cost: "$600–$1,000" },
      { size: "3-Bedroom Condo", crew: "3 movers", duration: "6–9 hrs", cost: "$900–$1,400" },
    ],
    pricingNote: "Condo move pricing includes elevator coordination and certificate of insurance. Actual cost depends on condo size, floors, and building requirements.",
    testimonials: [
      { name: "Amanda R.", city: "Seattle, WA", context: "High-rise condo move", rating: 5, text: "They handled all the elevator reservations and HOA paperwork. Made a complicated move completely stress-free." },
      { name: "Brian L.", city: "Bellevue, WA", context: "New construction condo", rating: 5, text: "Moved into a brand new building with strict move-in rules. The crew was professional and followed every requirement perfectly." },
      { name: "Carla M.", city: "Kirkland, WA", context: "2-bedroom condo move", rating: 5, text: "Efficient, careful, and no damage to the building or our belongings. Would use them again without hesitation." },
    ],
    faqs: [
      { question: "Do you provide a certificate of insurance for condo buildings?", answer: "Yes. We can provide a certificate of insurance naming your building as an additional insured, as required by most HOAs and building managers." },
      { question: "How do you handle elevator reservations?", answer: "We contact your building management directly to reserve the service elevator and coordinate the move-in window. You don't need to handle this yourself." },
      { question: "What if my building has a strict move-in time window?", answer: "We're experienced with building time restrictions and plan our crew size and schedule to complete the move within your building's allowed window." },
      { question: "How much does a condo move cost?", answer: "Most condo moves in Seattle cost $350–$1,000 depending on unit size and building access. We provide flat-rate quotes that include elevator coordination and COI." },
    ],
    image: BRAND_IMAGES.threeCrewRampLoading,
    imageAlt: "On The Go Moving condo moving crew with elevator",
    statValue: "1,500+",
    statLabel: "Condo Moves Completed",
    ctaHeadline: "Ready to Book Your Condo Move?",
  },

  // ── CORPORATE RELOCATION ──────────────────────────────────────────────────
  "corporate-relocation": {
    title: "Corporate Relocation Services",
    metaTitle: "Corporate Relocation Services | Employee & Office Moves | On The Go Moving",
    metaDesc: "Professional corporate relocation in Seattle, Bellevue, Redmond & the Eastside. Employee moves, office relocations, and full corporate campus moves. Free quote.",
    canonical: "https://onthegomoving.com/corporate-relocation/",
    heroTagline: "Corporate Relocation Services, Seattle & the Eastside",
    intro: "On The Go Moving & Storage provides comprehensive corporate relocation services for businesses relocating employees or entire operations. From single employee moves to full campus relocations, we provide the planning, coordination, and execution that corporate clients demand.",
    whatIsItTitle: "What Is Corporate Relocation?",
    whatIsIt: "Corporate relocation involves moving employees and/or entire business operations from one location to another. This includes employee household moves, office furniture and equipment relocation, IT infrastructure transport, and coordination with HR and facilities teams. A professional corporate relocation company provides project management, dedicated account management, and seamless execution.",
    benefits: [
      "Dedicated account manager for corporate clients",
      "Employee household moving with white-glove service",
      "Office furniture, equipment, and IT infrastructure moves",
      "Flexible scheduling around business operations",
      "Detailed reporting and invoicing for corporate accounts",
      "Fully licensed, bonded, and insured for corporate moves",
    ],
    whoWeHelp: [
      { icon: Building2, label: "HR & Facilities Teams", desc: "Coordinated employee relocation programs with dedicated account management.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Users, label: "Relocating Employees", desc: "White-glove household moves for employees transferring to the Seattle area.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Package, label: "Tech Companies", desc: "Campus-to-campus moves for growing tech companies in the Eastside corridor.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Home, label: "National Companies", desc: "Coordinating local moves within Washington State for employees relocating to Seattle.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Account Setup", desc: "We assign a dedicated account manager and establish your corporate account." },
      { icon: Clock, step: "Move Planning", desc: "We create a detailed relocation plan for each employee or office move." },
      { icon: Package, step: "Coordinated Execution", desc: "Our crews execute each move according to the plan, on schedule." },
      { icon: CheckCircle, step: "Reporting", desc: "Detailed move reports and invoicing provided for your HR and accounting teams." },
      { icon: Shield, step: "Follow-Up", desc: "We follow up to ensure employee satisfaction and address any concerns." },
    ],
    pricing: [
      { size: "Single Employee Move", crew: "2–3 movers", duration: "4–8 hrs", cost: "$600–$1,400" },
      { size: "Multiple Employee Moves", crew: "Custom", duration: "Custom", cost: "Volume pricing", highlight: true },
      { size: "Office Relocation", crew: "Custom", duration: "Custom", cost: "Custom quote" },
      { size: "Full Campus Move", crew: "Custom", duration: "Custom", cost: "Custom quote" },
    ],
    pricingNote: "Corporate clients receive volume pricing and dedicated account management. Contact us to set up a corporate account and discuss your relocation program.",
    testimonials: [
      { name: "HR Director", city: "Redmond, WA", context: "Employee relocation program", rating: 5, text: "On The Go has been our go-to for employee relocations for 3 years. Consistent quality, great communication, and our employees love them." },
      { name: "Facilities Manager", city: "Bellevue, WA", context: "Office campus move", rating: 5, text: "Moved our entire 200-person campus over a long weekend. Zero downtime Monday morning. Exceptional project management." },
      { name: "Operations Director", city: "Seattle, WA", context: "Multi-employee moves", rating: 5, text: "Handled 15 employee relocations over 6 months. Every single one was executed perfectly. Highly recommend for corporate accounts." },
    ],
    faqs: [
      { question: "Do you offer corporate accounts for ongoing relocation needs?", answer: "Yes. We offer dedicated corporate accounts with volume pricing, a dedicated account manager, and streamlined invoicing for HR and accounting teams." },
      { question: "Can you handle employee household moves?", answer: "Yes. We provide full-service household moves for employees relocating to the Seattle area, including packing, transport, and unpacking at the new home." },
      { question: "Do you coordinate with HR and facilities teams?", answer: "Yes. We work directly with HR and facilities teams to coordinate move schedules, employee communication, and reporting." },
      { question: "Can you move a full corporate campus?", answer: "Yes. We have the crew size, equipment, and project management experience to handle full campus relocations. Contact us for a custom quote." },
    ],
    image: BRAND_IMAGES.commercialFleet,
    imageAlt: "On The Go Moving corporate relocation fleet",
    statValue: "100+",
    statLabel: "Corporate Clients Served",
    ctaHeadline: "Ready to Set Up a Corporate Relocation Account?",
  },

  // ── APPLIANCE MOVING ──────────────────────────────────────────────────────
  "appliance-moving": {
    title: "Appliance Moving Services",
    metaTitle: "Appliance Moving Services | Refrigerators, Washers & More | On The Go Moving",
    metaDesc: "Professional appliance movers in Seattle, Bellevue, Redmond & the Eastside. Refrigerators, washers, dryers, and more. Safe handling, no damage. Free quote.",
    canonical: "https://onthegomoving.com/appliance-moving/",
    heroTagline: "Appliance Moving Services, Seattle & the Eastside",
    intro: "Moving heavy appliances, refrigerators, washers, dryers, dishwashers, stoves, requires specialized equipment and experienced crews. On The Go Moving & Storage provides professional appliance moving services throughout the Greater Seattle area, with careful handling to protect your appliances, floors, and home.",
    whatIsItTitle: "What Is Appliance Moving?",
    whatIsIt: "Appliance moving is the professional transport of heavy household appliances, refrigerators, washers, dryers, dishwashers, stoves, and more. Appliances require specialized dollies, straps, and techniques to move safely without damaging the appliance, floors, or doorways. Professional appliance movers also handle disconnection and reconnection coordination.",
    benefits: [
      "Specialized appliance dollies and straps for safe handling",
      "Floor protection to prevent scratches and damage",
      "Experienced with all major appliance brands and sizes",
      "Available for single appliances or full household moves",
      "Disconnection coordination available",
      "Flat-rate pricing, no surprise charges",
    ],
    whoWeHelp: [
      { icon: Home, label: "Homeowners", desc: "Moving appliances as part of a residential move or home sale.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Building2, label: "Landlords & Property Managers", desc: "Appliance delivery and removal for rental properties.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Package, label: "Appliance Buyers & Sellers", desc: "Pickup and delivery for marketplace appliance purchases.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Users, label: "Renovation Projects", desc: "Appliance removal and reinstallation during kitchen or laundry renovations.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Quote", desc: "Tell us what appliances need to be moved and we provide a flat-rate quote." },
      { icon: CheckCircle, step: "Disconnection", desc: "We coordinate disconnection of water, gas, and electrical connections." },
      { icon: Package, step: "Safe Loading", desc: "Appliances are secured with straps and moved on specialized dollies." },
      { icon: Truck, step: "Transport", desc: "Appliances travel safely in our padded moving trucks." },
      { icon: Home, step: "Placement", desc: "We place appliances in their new location and reconnect as needed." },
    ],
    pricing: [
      { size: "Single Appliance", crew: "2 movers", duration: "1–2 hrs", cost: "$150–$300" },
      { size: "2–3 Appliances", crew: "2 movers", duration: "2–3 hrs", cost: "$250–$450", highlight: true },
      { size: "Full Kitchen Suite", crew: "2–3 movers", duration: "3–5 hrs", cost: "$400–$700" },
      { size: "Washer + Dryer", crew: "2 movers", duration: "1–2 hrs", cost: "$200–$350" },
    ],
    pricingNote: "Appliance move pricing depends on number of appliances, floors, and access. Disconnection and reconnection coordination is available as an add-on service.",
    testimonials: [
      { name: "Mark T.", city: "Seattle, WA", context: "Refrigerator move", rating: 5, text: "Moved a large side-by-side refrigerator down a flight of stairs without a scratch. Professional and efficient." },
      { name: "Linda S.", city: "Bellevue, WA", context: "Full kitchen appliances", rating: 5, text: "Moved our entire kitchen suite, fridge, stove, dishwasher, during a kitchen remodel. No damage, no issues." },
      { name: "Chris B.", city: "Kirkland, WA", context: "Washer and dryer", rating: 5, text: "Moved our washer and dryer to a new home. Quick, careful, and no damage to the floors." },
    ],
    faqs: [
      { question: "Can you move a refrigerator down stairs?", answer: "Yes. We have specialized appliance dollies and experienced crews for moving refrigerators and other large appliances up and down stairs safely." },
      { question: "Do you disconnect and reconnect appliances?", answer: "We can coordinate disconnection and reconnection, but we recommend having a licensed plumber or electrician handle gas and electrical connections. We handle all physical transport." },
      { question: "How much does it cost to move a single appliance?", answer: "Single appliance moves typically cost $150–$300 depending on the appliance size, floors, and distance. We provide flat-rate quotes before your move date." },
      { question: "Can you move appliances as part of a larger move?", answer: "Yes. Appliance moving can be added to any residential or commercial move. Just let us know what appliances you need moved when requesting your quote." },
    ],
    image: BRAND_IMAGES.heroMovingCrew,
    imageAlt: "On The Go Moving appliance moving crew",
    statValue: "3,000+",
    statLabel: "Appliances Moved Safely",
    ctaHeadline: "Need Appliances Moved Safely?",
  },

  // ── UNPACKING SERVICES ────────────────────────────────────────────────────
  "unpacking-services": {
    title: "Unpacking Services",
    metaTitle: "Professional Unpacking Services | Seattle & Eastside WA | On The Go Moving",
    metaDesc: "Expert unpacking services in Seattle, Bellevue, Redmond & the Eastside. We unpack, organize, and set up your new home. Full-service unpacking available. Free quote.",
    canonical: "https://onthegomoving.com/unpacking-services/",
    heroTagline: "Professional Unpacking Services, Seattle & the Eastside",
    intro: "Moving in is just the beginning. Our professional unpacking services take the stress out of settling into your new home. We unpack boxes, place items in their designated rooms, organize your kitchen and closets, and remove all packing materials, leaving your new home ready to live in.",
    whatIsItTitle: "What Are Professional Unpacking Services?",
    whatIsIt: "Professional unpacking services involve trained movers systematically unpacking all boxes, placing items in their designated rooms, and organizing your new home according to your preferences. This includes kitchen organization, closet setup, and removal of all packing materials. Professional unpackers work efficiently and can complete in hours what takes most families days.",
    benefits: [
      "Full-service unpacking, every box opened and items placed",
      "Kitchen and pantry organization included",
      "Closet and wardrobe setup available",
      "All packing materials removed and disposed of",
      "Furniture placement adjustment as needed",
      "Available same day as your move or on a separate day",
    ],
    whoWeHelp: [
      { icon: Home, label: "Busy Families", desc: "Get your new home functional immediately, no living out of boxes.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Users, label: "Seniors", desc: "Patient, careful unpacking with placement exactly where you want it.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Building2, label: "Corporate Relocatees", desc: "Get settled quickly when relocating for work, no time to waste.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Package, label: "Anyone Who Hates Unpacking", desc: "We all hate unpacking. Let us handle it while you enjoy your new home.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Schedule Unpacking", desc: "Book unpacking for the same day as your move or a separate day." },
      { icon: Package, step: "Room-by-Room Unpacking", desc: "We systematically unpack each room according to your preferences." },
      { icon: Home, step: "Kitchen & Pantry Setup", desc: "We organize your kitchen, pantry, and cabinets the way you want them." },
      { icon: CheckCircle, step: "Closet & Wardrobe Setup", desc: "We hang clothes, organize shelves, and set up your closets." },
      { icon: Truck, step: "Materials Removal", desc: "All boxes, packing paper, and bubble wrap are removed and disposed of." },
    ],
    pricing: [
      { size: "Studio / 1-Bedroom", crew: "1–2 unpackers", duration: "2–4 hrs", cost: "$200–$400" },
      { size: "2-Bedroom Home", crew: "2 unpackers", duration: "4–6 hrs", cost: "$380–$600", highlight: true },
      { size: "3-Bedroom Home", crew: "2–3 unpackers", duration: "6–8 hrs", cost: "$550–$850" },
      { size: "4+ Bedroom Home", crew: "3+ unpackers", duration: "8–12 hrs", cost: "$800–$1,200+" },
    ],
    pricingNote: "Unpacking pricing includes all labor and materials removal. Actual cost depends on home size and number of boxes. Often combined with packing services for a full-service move.",
    testimonials: [
      { name: "Jessica M.", city: "Bellevue, WA", context: "Full unpack service", rating: 5, text: "We moved on a Saturday and by Sunday evening the crew had everything unpacked and organized. Walked into a fully set up home. Amazing." },
      { name: "Robert L.", city: "Seattle, WA", context: "Kitchen unpacking", rating: 5, text: "Had them unpack just the kitchen. They organized everything exactly how I wanted it. Saved me an entire weekend." },
      { name: "Patricia K.", city: "Kirkland, WA", context: "Senior move unpack", rating: 5, text: "They unpacked my mother's new apartment and had everything in place before we left. She was so relieved." },
    ],
    faqs: [
      { question: "Can you unpack on a different day than the move?", answer: "Yes. We can schedule unpacking services on the same day as your move or on a separate day, depending on your preference and our availability." },
      { question: "Do you organize items or just unpack them?", answer: "We do both. We unpack boxes and place items according to your preferences. For kitchens and closets, we'll organize items the way you want them, just tell us your preferences." },
      { question: "Do you remove all the packing materials?", answer: "Yes. We remove all boxes, packing paper, bubble wrap, and other materials and dispose of them properly. You won't have to deal with any of it." },
      { question: "How much does unpacking cost?", answer: "Unpacking services typically cost $200–$600 for a 1–2 bedroom home, depending on the number of boxes and rooms. We provide flat-rate quotes." },
    ],
    image: BRAND_IMAGES.packingCrew,
    imageAlt: "On The Go Moving professional unpacking service",
    statValue: "Same Day",
    statLabel: "Unpacking Available",
    ctaHeadline: "Ready to Move Into a Fully Set Up Home?",
  },

  // ── FREIGHT FORWARDING ────────────────────────────────────────────────────
  "freight-forwarding-service": {
    title: "Freight Forwarding Services",
    metaTitle: "Freight Forwarding Services | Local & Regional Logistics | On The Go Moving",
    metaDesc: "Professional freight forwarding and logistics in Seattle, Bellevue, Redmond & the Eastside. Local and regional freight transport for businesses. Licensed, insured. Free quote.",
    canonical: "https://onthegomoving.com/freight-forwarding-service/",
    heroTagline: "Freight Forwarding & Logistics Services, Seattle & the Eastside",
    intro: "On The Go Moving & Storage provides freight forwarding and logistics services for businesses in the Greater Seattle area. From single pallets to full truckloads, we coordinate pickup, transport, and delivery with the reliability and care your business demands.",
    whatIsItTitle: "What Is Freight Forwarding?",
    whatIsIt: "Freight forwarding is the coordination and shipment of goods from one location to another using a network of carriers and logistics services. A freight forwarder acts as an intermediary between the shipper and transportation services, handling documentation, routing, and delivery coordination. For local and regional freight, On The Go Moving provides direct transport with our own fleet.",
    benefits: [
      "Local and regional freight transport throughout the Pacific Northwest",
      "Pallet, crate, and LTL (less-than-truckload) shipments",
      "Climate-controlled warehousing available for staging",
      "Real-time shipment tracking and communication",
      "Fully licensed and insured freight transport",
      "Dedicated logistics coordinator for business accounts",
    ],
    whoWeHelp: [
      { icon: Building2, label: "Businesses & Retailers", desc: "Local and regional freight delivery for commercial accounts.", color: "border-brand-green bg-green-50", iconColor: "text-brand-green" },
      { icon: Package, label: "E-Commerce Companies", desc: "Inventory transport and last-mile delivery for online retailers.", color: "border-blue-400 bg-blue-50", iconColor: "text-blue-500" },
      { icon: Home, label: "Contractors & Builders", desc: "Materials and equipment transport between job sites.", color: "border-amber-400 bg-amber-50", iconColor: "text-amber-500" },
      { icon: Users, label: "Medical & Healthcare", desc: "Secure transport of medical equipment and supplies.", color: "border-purple-400 bg-purple-50", iconColor: "text-purple-500" },
    ],
    process: [
      { icon: Phone, step: "Quote Request", desc: "Provide shipment details, dimensions, weight, origin, destination, for an accurate quote." },
      { icon: Clock, step: "Pickup Scheduling", desc: "We schedule pickup at your facility or warehouse at a time that works for your operations." },
      { icon: Truck, step: "Secure Transport", desc: "Your freight is loaded, secured, and transported in our commercial vehicles." },
      { icon: CheckCircle, step: "Delivery Confirmation", desc: "We confirm delivery and provide documentation upon completion." },
      { icon: Package, step: "Invoicing", desc: "Detailed invoicing provided for your accounting records." },
    ],
    pricing: [
      { size: "Single Pallet", crew: "Managed", duration: "Same day", cost: "$150–$300" },
      { size: "LTL Shipment", crew: "Managed", duration: "1–2 days", cost: "$300–$800", highlight: true },
      { size: "Full Truckload", crew: "Managed", duration: "Custom", cost: "Custom quote" },
      { size: "Regular Business Account", crew: "Dedicated", duration: "Ongoing", cost: "Volume pricing" },
    ],
    pricingNote: "Freight pricing depends on shipment weight, dimensions, distance, and service level. We provide accurate quotes after reviewing your shipment details.",
    testimonials: [
      { name: "Operations Manager", city: "Seattle, WA", context: "Regular freight account", rating: 5, text: "On The Go handles our weekly freight deliveries throughout the Eastside. Reliable, on-time, and great communication." },
      { name: "Warehouse Manager", city: "Redmond, WA", context: "LTL shipments", rating: 5, text: "Used them for several LTL shipments. Professional handling and accurate documentation every time." },
      { name: "Business Owner", city: "Bellevue, WA", context: "Equipment transport", rating: 5, text: "They transported our trade show equipment to multiple venues. Careful handling and on-time delivery every time." },
    ],
    faqs: [
      { question: "What types of freight do you transport?", answer: "We transport commercial freight including palletized goods, office equipment, retail inventory, and business supplies throughout the Greater Seattle area and Pacific Northwest region." },
      { question: "Do you offer warehousing for freight staging?", answer: "Yes. We have climate-controlled warehousing available for freight staging, short-term storage, and cross-docking. Contact us for warehousing rates." },
      { question: "Are you licensed for commercial freight transport?", answer: "Yes. On The Go Moving & Storage is licensed (HG-064180) and insured for commercial freight transport in Washington State. Our USDOT# 2120054 is on file with the FMCSA." },
      { question: "Do you handle LTL shipments?", answer: "Yes. We accommodate less-than-truckload (LTL) shipments for businesses that don't need a full truck. LTL pricing is based on weight, dimensions, and destination." },
    ],
    image: BRAND_IMAGES.brandedTruck,
    imageAlt: "On The Go Moving freight forwarding truck",
    statValue: "Pacific NW",
    statLabel: "Coverage Area",
    ctaHeadline: "Need Reliable Freight Forwarding in Seattle?",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ServicePageProps {
  slug: string;
}

export default function ServicePage({ slug }: ServicePageProps) {
  const data = SERVICE_DATA[slug];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!data) return;
    document.title = data.metaTitle;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", data.metaDesc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = data.canonical;

    // OG + Twitter tags
    const setOG = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const OG_IMAGE = "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-storage-truck.jpg";
    setOG("og:type", "website");
    setOG("og:title", data.metaTitle);
    setOG("og:description", data.metaDesc);
    setOG("og:url", data.canonical);
    setOG("og:image", OG_IMAGE);
    setOG("og:site_name", "On The Go Moving & Storage");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", data.metaTitle);
    setMeta("twitter:description", data.metaDesc);
    setMeta("twitter:image", OG_IMAGE);

    const schemaId = "service-page-schema";
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: data.title,
        description: data.metaDesc,
        provider: {
          "@type": "MovingCompany",
          name: "On The Go Moving & Storage",
          telephone: "+14257618500",
          address: { "@type": "PostalAddress", addressLocality: "Redmond", addressRegion: "WA", postalCode: "98052", addressCountry: "US" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "393" },
        },
        areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 47.6740, longitude: -122.1215 }, geoRadius: "29000" },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.faqs.map(faq => ({
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
          { "@type": "ListItem", position: 2, name: data.title, item: data.canonical },
        ],
      },
    ]);
    document.head.appendChild(script);
    return () => { document.getElementById(schemaId)?.remove(); };
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[72px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Service Not Found</h1>
            <a href="/">
              <span className="btn-primary mt-4 inline-flex cursor-pointer">Back to Home</span>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative pt-[72px] min-h-[620px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10,30,8,0.92) 45%, rgba(10,30,8,0.55) 100%), url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-green" />
        <div className="container relative z-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 text-green-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <CheckCircle size={12} />
                Licensed HG-064180 · USDOT# 2120054
              </div>
              <h1
                className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {data.heroTagline}
              </h1>
              <p className="text-green-100 text-lg leading-relaxed mb-6 max-w-lg">
                {data.intro}
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
                <span className="text-white/30 mx-1 hidden sm:inline">·</span>
                <span className="hidden sm:inline">Since 2009</span>
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
                  <QuoteForm variant="hero" defaultFreeStorage={slug === "storage-services" || slug === "warehousing-services"} />
                </div>
              </div>
            </div>
            {/* Desktop: form in right column */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-brand-green">
                <QuoteForm variant="hero" defaultFreeStorage={slug === "storage-services" || slug === "warehousing-services"} />
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

      {/* ── WHAT IS IT ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">What We Do</p>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {data.whatIsItTitle}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                {data.whatIsIt}
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
                src={data.image}
                alt={data.imageAlt}
                className="rounded-2xl shadow-xl w-full object-cover"
                style={{ maxHeight: "440px" }}
                loading="lazy"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-5 py-4 border-l-4 border-brand-green">
                <div className="text-3xl font-extrabold text-brand-green" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{data.statValue}</div>
                <div className="text-gray-600 text-xs font-medium">{data.statLabel}</div>
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
              {data.title} for Every Situation
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.whoWeHelp.map((wh) => (
              <div key={wh.label} className={`rounded-xl border-2 p-6 ${wh.color} transition-all hover:shadow-md`}>
                <wh.icon size={28} className={`${wh.iconColor} mb-3`} />
                <h3 className="font-bold text-gray-900 text-base mb-2">{wh.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{wh.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS / WHAT'S INCLUDED ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-green font-bold text-sm uppercase tracking-widest mb-3">What's Included</p>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                The On The Go Difference
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every {data.title.toLowerCase()} with On The Go Moving includes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.benefits.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
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
              How It Works
            </h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-brand-green/20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {data.process.map((s, i) => (
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
              How Much Does It Cost?
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="grid grid-cols-4 bg-brand-forest text-white text-xs font-bold uppercase tracking-wider px-5 py-3">
              <div>Move Size</div>
              <div className="text-center">Crew</div>
              <div className="text-center">Duration</div>
              <div className="text-right">Est. Cost</div>
            </div>
            {data.pricing.map((row, i) => (
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
          <p className="text-gray-400 text-xs mt-3 text-center">{data.pricingNote}</p>
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
            {data.testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="text-4xl text-brand-green font-serif leading-none mb-3">"</div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">{t.text}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.city} · {t.context}</p>
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
              {data.title} FAQ
            </h2>
          </div>
          <div className="space-y-2">
            {data.faqs.map((faq, i) => (
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
              Service Area
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
              We serve all communities within 18 miles of our Redmond, WA warehouse.
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
                View full service area <ArrowRight className="w-4 h-4" />
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
            {NAV_SERVICES.filter(s => !s.href.includes(slug)).map((s) => (
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

      {/* ── CITY CROSS-LINKS ── */}
      {(() => {
        // Map service hub slug → canonical sub-page key used in /{city}-movers/{key}/
        const slugToKey: Record<string, string> = {
          "commercial-moving": "commercial",
          "packing-services": "packing",
          "storage-services": "storage",
          "labor-only-moving": "labor-only",
          "apartment-moving": "apartment",
          "senior-moving": "senior",
          "warehousing-services": "warehousing",
          "office-moving": "office",
          "furniture-moving": "furniture",
          "condo-moving": "condo",
          "corporate-relocation": "corporate-relocation",
          "appliance-moving": "appliance",
          "unpacking-services": "unpacking",
          "freight-forwarding-service": "commercial",
        };
        const serviceKey = slugToKey[slug];
        if (!serviceKey) return null;
        // "corporate-relocation" and "labor-only" are not valid serviceKeys for
        // /{city}-movers/{service}/ (no such sub-page was ever built, for any
        // city) — render every city in this grid as plain text instead of a
        // broken link on these two hub pages.
        const isUnbuiltServiceKey = serviceKey === "corporate-relocation" || serviceKey === "labor-only";
        const cityLinks = [
          { city: "Seattle", slug: "seattle" },
          { city: "Bellevue", slug: "bellevue" },
          { city: "Redmond", slug: "redmond" },
          { city: "Kirkland", slug: "kirkland" },
          { city: "Sammamish", slug: "sammamish" },
          { city: "Issaquah", slug: "issaquah" },
          { city: "Bothell", slug: "bothell" },
          { city: "Renton", slug: "renton" },
          { city: "Shoreline", slug: "shoreline" },
          { city: "Woodinville", slug: "woodinville" },
          { city: "Kirkland", slug: "kirkland" },
          { city: "Mercer Island", slug: "mercer-island" },
          { city: "Kenmore", slug: "kenmore" },
          { city: "Newcastle", slug: "newcastle" },
          { city: "Tukwila", slug: "tukwila" },
          { city: "Lynnwood", slug: "lynnwood" },
          { city: "Mukilteo", slug: "mukilteo" },
          { city: "Burien", slug: "burien" },
          { city: "Snoqualmie", slug: "snoqualmie" },
          { city: "North Bend", slug: "north-bend" },
          { city: "Maple Valley", slug: "maple-valley" },
          { city: "Covington", slug: "covington" },
          { city: "Duvall", slug: "duvall" },
          { city: "Carnation", slug: "carnation" },
        ];
        // Deduplicate
        const seen = new Set<string>();
        const unique = cityLinks.filter(c => { if (seen.has(c.slug)) return false; seen.add(c.slug); return true; });
        return (
          <section className="py-14 bg-gray-50 border-t border-gray-200">
            <div className="container">
              <p className="text-brand-forest font-bold text-sm uppercase tracking-widest mb-2">{data.title} by City</p>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {data.title} in Greater Seattle
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {unique.map(c => {
                  if (isUnbuiltServiceKey) {
                    return (
                      <span key={c.slug} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium">
                        <MapPin size={12} className="text-brand-forest flex-shrink-0" />
                        {c.city}
                      </span>
                    );
                  }
                  return (
                    <a key={c.slug} href={`/${c.slug}-movers/${serviceKey}/`}>
                      <span className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:border-brand-forest hover:bg-brand-forest/5 text-gray-700 hover:text-brand-forest text-sm font-medium transition-all cursor-pointer">
                        <MapPin size={12} className="text-brand-forest flex-shrink-0" />
                        {c.city}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── FINAL CTA ── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#1e3a0f" }}>
          <div className="absolute inset-0 opacity-5" />
        <div className="container relative z-10 text-center">
          <p className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-3">Get Started Today</p>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {data.ctaHeadline}
          </h2>
          <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto">
            No obligation. No hidden fees. Just honest, transparent pricing from Seattle's most trusted movers since 2009.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact-us/">
              <span className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 cursor-pointer">
                Get Free Quote <ArrowRight size={18} />
              </span>
            </a>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all border border-white/30"
            >
              <Phone size={18} /> {COMPANY.phone}
            </a>
          </div>
          <p className="text-green-400 text-xs mt-5">
            Licensed HG-064180 · USDOT# 2120054 · Serving Greater Seattle Since 2009
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
