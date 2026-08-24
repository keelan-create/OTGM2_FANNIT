"use client";

// =============================================================================
// CityServiceSubPage.tsx
// URL pattern: /{city}-movers/{service}/
// e.g. /seattle-movers/residential/ or /bellevue-movers/packing/
//
// PURPOSE & CONTENT DIFFERENTIATION:
//   - This page is LOCAL + CONVERSION focused (short, tight, high-intent)
//   - The service hub page (/residential-moving/ etc.) is BROAD + EDUCATIONAL
//   - No keyword cannibalization: this page targets "{city} {service} movers"
//     while the service hub targets "{service} moving company" (no city)
//
// INTERNAL LINKING:
//   - Breadcrumb: Home → /{city}-movers/ → current service
//   - Sidebar: all sibling services in this city
//   - Cross-link up to service hub for deeper reading
//   - Cross-link to nearby city variants of same service
// =============================================================================

import { useEffect, useState } from "react";
import {
  Phone, Star, Shield, CheckCircle, MapPin, Clock,
  ChevronDown, ChevronUp, ArrowRight, Home, Building2,
  Truck, Package, ExternalLink
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { COMPANY } from "@/lib/siteData";
import { LOCATION_DATA } from "@/lib/locationData";
import { TIER_A_CONTENT } from "@/lib/tierAContent";

// ---------------------------------------------------------------------------
// Canonical service definitions
// Each entry defines: display label, hub page slug, short description,
// local pricing, what-to-expect steps, local FAQs, and hero image
// ---------------------------------------------------------------------------

interface ServiceDef {
  key: string;           // URL segment: /seattle-movers/{key}/
  label: string;         // Display: "Residential Moving"
  hubSlug: string;       // Service hub: /residential-moving/
  tagline: (city: string) => string;
  subtitle: (city: string) => string;
  intro: (city: string, cityData: any) => string;
  pricing: (city: string) => string;
  steps: (city: string) => string[];
  benefits: string[];
  faqs: (city: string) => { q: string; a: string }[];
  heroImage: string;
  icon: string;
}

const SERVICE_DEFS: Record<string, ServiceDef> = {
  residential: {
    key: "residential",
    label: "Residential Moving",
    hubSlug: "/residential-moving/",
    tagline: (city) => `Residential Movers in ${city}`,
    subtitle: (city) => `Local home moving services in ${city}, WA, flat-rate pricing, professional crews, secure vault storage.`,
    intro: (city, cityData) =>
      `Every neighborhood in ${city} has its own quirks, narrow driveways, permit-only parking zones, steep hills, and HOA move-in windows that close fast. Our residential crews have been navigating ${city} since 2009 and know what each area demands before the truck leaves the yard. Flat-rate pricing means the number we quote is the number you pay, no hourly clock running while we figure things out on your driveway.`,
    pricing: (city) =>
      `Studio: $320–$520 · 1-Bed: $480–$780 · 2-Bed: $750–$1,300 · 3-Bed: $1,200–$2,000`,
    steps: (city) => [
      `Free quote, we assess your ${city} home and provide a flat-rate price`,
      "Move day: crew arrives on time with all equipment and packing materials",
      "Every item is wrapped, padded, and loaded with care",
      `Safe transport to your new home, we know ${city}'s streets and access points`,
      "Careful unloading and placement, furniture goes exactly where you want it",
      "Final walkthrough to confirm everything is in order",
    ],
    benefits: [
      "Flat-rate pricing, no hourly clock surprises",
      "Full packing and unpacking available",
      "Secure climate-controlled vault storage",
      "Floor runners, door jamb protectors, and furniture pads on every job",
      "Available 7 days a week including weekends",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does a residential move cost in ${city}?`, a: `Most ${city} residential moves cost $480–$780 for a 1-bedroom home and $750–$1,300 for a 2-bedroom home. We provide flat-rate quotes so you know the final price before we start, no hourly surprises.` },
      { q: `How far in advance should I book ${city} residential movers?`, a: `We recommend booking 2–4 weeks in advance, especially for summer moves (May–September) and end-of-month dates. We accommodate last-minute moves regularly, call us to check availability.` },
      { q: `Do you offer packing services for ${city} home moves?`, a: `Yes. We offer full packing, partial packing, and unpacking services. Our packers bring all materials, boxes, tape, bubble wrap, and specialty containers for fragile items.` },
      { q: `Are you licensed and insured to move in ${city}?`, a: `Yes. On The Go Moving & Storage is fully licensed (HG-064180) and insured. We carry general liability and cargo insurance on every move.` },
    ],
    heroImage: BRAND_IMAGES.threeCrewLoadingTruck,
    icon: "🏠",
  },

  apartment: {
    key: "apartment",
    label: "Apartment Moving",
    hubSlug: "/apartment-moving/",
    tagline: (city) => `Apartment Movers in ${city}`,
    subtitle: (city) => `Apartment moving specialists in ${city}, WA, elevator coordination, HOA certificates, flat-rate pricing.`,
    intro: (city, cityData) =>
      `${city} apartment buildings each have their own rules, some require 2-week elevator notice, others need a COI naming the building as additional insured, and a few restrict move times to weekday mornings only. We call ahead, get the details, and handle every requirement before your move day so none of it lands on you. When our crew shows up, the elevator is already reserved and the paperwork is already filed.`,
    pricing: (city) =>
      `Studio: $320–$520 · 1-Bed: $480–$780 · 2-Bed: $700–$1,200`,
    steps: (city) => [
      `We contact your ${city} building to confirm elevator and parking requirements`,
      "Certificate of insurance provided if required by your HOA or building management",
      "Crew arrives on time with all equipment and furniture protection",
      "Furniture is wrapped and padded for safe hallway and elevator transport",
      "Everything placed in your new apartment exactly where you want it",
      "Final walkthrough of common areas before we leave",
    ],
    benefits: [
      "Elevator reservation coordination with building management",
      "Certificate of insurance for HOA requirements, no extra charge",
      "Furniture protection for tight hallways and elevators",
      "Flat-rate pricing, no hourly surprises",
      "Available 7 days a week including weekends",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does an apartment move cost in ${city}?`, a: `Most ${city} apartment moves cost $480–$780 for a 1-bedroom unit and $700–$1,200 for a 2-bedroom unit. Pricing depends on floor, elevator availability, and distance. We provide flat-rate quotes.` },
      { q: `Do you handle elevator reservations for ${city} apartment buildings?`, a: `Yes. We contact your building management to confirm elevator reservation requirements and book the elevator for your move window. This is included in our service at no extra charge.` },
      { q: `Do you provide a certificate of insurance for my ${city} building?`, a: `Yes. We provide certificates of insurance that meet most ${city} building and HOA requirements. Let us know your building's requirements when you request a quote.` },
      { q: `Can you move me out of a walk-up building in ${city}?`, a: `Yes. We regularly move in and out of walk-up buildings with no elevator. Our crews are experienced with stair carries and bring the right equipment for safe stair moves.` },
    ],
    heroImage: BRAND_IMAGES.threeCrewLoadingTruck,
    icon: "🏢",
  },

  packing: {
    key: "packing",
    label: "Packing Services",
    hubSlug: "/packing-services/",
    tagline: (city) => `Packing Services in ${city}`,
    subtitle: (city) => `Professional packing in ${city}, WA, all materials included, full-pack or fragile-only options.`,
    intro: (city, cityData) =>
      `Most ${city} residents underestimate how long packing takes, a 2-bedroom home that looks manageable on a Sunday afternoon turns into a 3-day project by Wednesday. Our packing crews work fast, label every box by room, and bring every material with them so you don't have to make a single trip to the store. Full-pack, partial-pack, or fragile-only, we work around whatever you've already done.`,
    pricing: (city) =>
      `$35–$55/hr per packer · 1-Bed: 2–4 hrs · 3-Bed: 6–10 hrs · All materials included`,
    steps: (city) => [
      `Our crew arrives on time at your ${city} home or office`,
      "Walk-through to assess what needs packing",
      "Each item is carefully wrapped and labeled by room",
      "Fragile items get extra layers of protection",
      "Boxes are sealed, labeled, and stacked for efficient loading",
      "Itemized packing list provided for your records",
    ],
    benefits: [
      "Full-pack, partial-pack, or fragile-only options",
      "All packing materials included, no hidden supply charges",
      "Careful labeling system for easy unpacking",
      "Specialty packing for art, mirrors, and antiques",
      "Available as a standalone service or add-on to your move",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much do packing services cost in ${city}?`, a: `Professional packing in ${city} typically costs $35–$55 per hour per packer. A 1-bedroom home takes 2–4 hours to pack. A 3-bedroom home takes 6–10 hours. All packing materials are included, no surprise supply charges.` },
      { q: `Do I need to buy boxes and supplies for my ${city} packing?`, a: `No. We bring all packing materials, boxes, tape, bubble wrap, packing paper, and specialty containers. Everything is included in the quoted price.` },
      { q: `Can you pack just my fragile items in ${city}?`, a: `Yes. We offer fragile-only packing for customers who want to pack most items themselves but need professional help with dishes, glassware, artwork, and other breakables.` },
      { q: `How far in advance should I book packing services in ${city}?`, a: `We recommend booking 1–2 weeks before your move date. For large homes or peak season moves (May–September), book 2–4 weeks in advance.` },
    ],
    heroImage: BRAND_IMAGES.truckKirklandHouse,
    icon: "📦",
  },

  storage: {
    key: "storage",
    label: "Storage Services",
    hubSlug: "/storage-services/",
    tagline: (city) => `Storage Services for ${city} Residents`,
    subtitle: (city) => `Secure storage vaults for ${city}, WA, climate-controlled, full-service pickup and delivery.`,
    intro: (city, cityData) =>
      `The gap between your move-out date and your new home's availability is one of the most stressful parts of any ${city} move, and it's where most people end up renting a self-storage unit and spending their weekends hauling boxes. We eliminate that entirely. Our Redmond facility is minutes from ${city}. We pick up your items, load them into a dedicated storage vault at our climate-controlled warehouse, and deliver them back when you're ready. You never have to touch a storage unit or drive to a facility.`,
    pricing: (city) =>
      `1-Bed contents: $150–$250/mo · 3-Bed contents: $300–$500/mo · Month-to-month contracts`,
    steps: (city) => [
      `We pick up your items from your ${city} home or office`,
      "Items are carefully inventoried and photographed",
      "Your belongings are loaded into dedicated storage vaults at our secure, climate-controlled Redmond facility",
      "Access your inventory list anytime online",
      "We deliver your items back when you're ready",
    ],
    benefits: [
      "Climate-controlled, no temperature extremes year-round",
      "24/7 security monitoring and access control",
      "Flexible month-to-month terms, no long-term contracts",
      "Full-service: we handle all loading and unloading",
      "Secure vault storage available",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does storage cost for ${city} residents?`, a: `Storage rates depend on the volume of items. A typical 1-bedroom home's contents cost $150–$250/month to store. A 3-bedroom home runs $300–$500/month. We provide exact quotes after inventorying your items.` },
      { q: `Is the storage facility near ${city}?`, a: `Yes. Our storage vault facility is in Redmond, WA, just minutes from ${city}. We handle all pickup and delivery so you never have to drive to a storage facility.` },
      { q: `Do you offer storage for ${city} moves?`, a: `Yes. We offer secure vault storage at our climate-controlled Redmond facility. This is especially useful if your new home isn't ready when you move out. Contact us for current pricing.` },
      { q: `How long can I store my belongings?`, a: `As long as you need. We offer flexible month-to-month storage with no long-term contracts. Most customers store for 1–3 months during a move, but we have customers who have stored with us for years.` },
    ],
    heroImage: BRAND_IMAGES.storageWarehouse,
    icon: "🏪",
  },

  office: {
    key: "office",
    label: "Office Moving",
    hubSlug: "/office-moving/",
    tagline: (city) => `Office Movers in ${city}`,
    subtitle: (city) => `Professional office moving in ${city}, WA, after-hours execution, dedicated project manager, IT equipment handling.`,
    intro: (city, cityData) =>
      `A ${city} office move that runs into Monday morning costs your business real money, in lost productivity, IT downtime, and employee frustration. Our office crews work Friday night through Sunday so your team walks in Monday to a fully set-up workspace. Every job gets a dedicated project manager who creates the floor plan, coordinates building access, and is on-site throughout the move, not just reachable by phone.`,
    pricing: (city) =>
      `10–25 workstations: $1,500–$4,000 · Larger offices quoted after free site assessment`,
    steps: (city) => [
      `Free site assessment at your ${city} office`,
      "Dedicated project manager creates a detailed move plan",
      "After-hours or weekend move execution",
      "Workstation disassembly and careful IT equipment handling",
      "Everything placed per your floor plan",
      "Final walkthrough before we leave",
    ],
    benefits: [
      "After-hours and weekend moves to eliminate downtime",
      "Dedicated project manager for every office move",
      "Specialized handling for computers and servers",
      "Secure chain-of-custody for sensitive files",
      "Workstation disassembly and reassembly included",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does an office move cost in ${city}?`, a: `Office move costs in ${city} depend on the number of workstations and distance. Most small office moves (10–25 workstations) run $1,500–$4,000. We provide flat-rate quotes after a free site assessment.` },
      { q: `Can you move our ${city} office over a weekend?`, a: `Yes. Weekend and after-hours moves are our specialty for commercial clients. We can have your office fully moved and set up before your team arrives Monday morning.` },
      { q: `Do you provide a dedicated project manager for ${city} office moves?`, a: `Yes. Every office move gets a dedicated project manager who coordinates logistics, communicates with your team, and is on-site during the move.` },
      { q: `How do you handle computers and servers during the ${city} office move?`, a: `We use anti-static packing materials and specialized boxes for all electronics. Servers are transported upright in padded crates. We recommend your IT team disconnect and reconnect equipment, but we handle all physical transport.` },
    ],
    heroImage: BRAND_IMAGES.crewWrappingOffice,
    icon: "💼",
  },

  commercial: {
    key: "commercial",
    label: "Commercial Moving",
    hubSlug: "/commercial-moving/",
    tagline: (city) => `Commercial Movers in ${city}`,
    subtitle: (city) => `Business moving services in ${city}, WA, minimal downtime, dedicated project manager, after-hours available.`,
    intro: (city, cityData) =>
      `Commercial moves in ${city} require a different level of planning than residential moves, loading dock access, freight elevator scheduling, building security sign-ins, and IT equipment that can't be tossed in a box. We've handled commercial moves across ${city}'s office parks and downtown buildings since 2009. Our project managers know the local building requirements and build a move plan that accounts for every constraint before the first truck arrives.`,
    pricing: (city) =>
      `Small business (10–25 workstations): $1,500–$4,000 · Larger moves quoted after free site assessment`,
    steps: (city) => [
      `Free site assessment at your ${city} business location`,
      "Dedicated project manager creates a detailed move plan",
      "After-hours or weekend move execution",
      "Workstation disassembly and careful IT equipment handling",
      "Everything placed per your floor plan",
      "Final walkthrough before we leave",
    ],
    benefits: [
      "After-hours and weekend moves to eliminate downtime",
      "Dedicated project manager for every commercial move",
      "Specialized handling for computers and servers",
      "Secure chain-of-custody for sensitive files",
      "Workstation disassembly and reassembly included",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does a commercial move cost in ${city}?`, a: `Commercial move costs in ${city} depend on the number of workstations, floors, and distance. Most small business moves (10–25 workstations) run $1,500–$4,000. We provide flat-rate quotes after a free site assessment.` },
      { q: `Can you move our ${city} business over a weekend?`, a: `Yes. Weekend and after-hours moves are our specialty for commercial clients. We can have your business fully moved and set up before your team arrives Monday morning.` },
      { q: `Do you provide a project manager for ${city} commercial moves?`, a: `Yes. Every commercial move gets a dedicated project manager who coordinates logistics, communicates with your team, and is on-site during the move.` },
      { q: `How do you minimize downtime for our ${city} business?`, a: `We schedule moves after business hours or on weekends, create a detailed floor plan for the new location, and complete the move so your team can be fully operational the next business day.` },
    ],
    heroImage: BRAND_IMAGES.crewWrappingOffice,
    icon: "🏗️",
  },

  senior: {
    key: "senior",
    label: "Senior Moving",
    hubSlug: "/senior-moving/",
    tagline: (city) => `Senior Moving Services in ${city}`,
    subtitle: (city) => `Compassionate senior moving in ${city}, WA, patient crews, downsizing assistance, assisted living coordination.`,
    intro: (city, cityData) =>
      `A senior move in ${city} is rarely just a logistics problem, it's a life transition that involves decades of belongings, family members coordinating from different cities, and often a move into a facility with its own move-in procedures. Our crews are trained specifically for this. We work at your pace, communicate directly with family members, and coordinate with assisted living and retirement community staff so nothing falls through the cracks on move day.`,
    pricing: (city) =>
      `$120–$160/hr for 2-person crew · Most senior moves are smaller in scope, often lower total cost`,
    steps: (city) => [
      "Free consultation to understand your specific needs and timeline",
      "Crew arrives on time and introduces themselves",
      "We work at your pace, no rushing",
      "Fragile and sentimental items receive extra care",
      "We coordinate with family members and facility staff",
      "We help set up your new space so it feels like home",
    ],
    benefits: [
      "Patient, compassionate crews trained for senior moves",
      "Downsizing assistance and donation coordination",
      "Coordination with assisted living and retirement community staff",
      "Full packing and unpacking services available",
      "Flexible scheduling to accommodate your timeline",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does senior moving cost in ${city}?`, a: `Senior moves in ${city} typically cost $120–$160 per hour for a 2-person crew. Most senior moves are smaller in scope than full household moves, so costs are often lower. We provide flat-rate quotes after a free consultation.` },
      { q: `Do you help with downsizing in ${city}?`, a: `Yes. We can help coordinate donation pickups, estate sale companies, and junk removal services as part of the downsizing process. We work with several trusted partners in the Greater Seattle area.` },
      { q: `Do you move seniors into assisted living facilities near ${city}?`, a: `Yes. We regularly move seniors into assisted living communities, memory care facilities, and retirement communities throughout the Greater Seattle area. We coordinate with facility staff on move-in procedures.` },
      { q: `Can family members be involved in the ${city} senior move?`, a: `Absolutely. We welcome family involvement and will coordinate with family members throughout the process. We can also communicate directly with a family member who is managing the move remotely.` },
    ],
    heroImage: BRAND_IMAGES.crewEntryway2,
    icon: "👴",
  },

  furniture: {
    key: "furniture",
    label: "Furniture Moving",
    hubSlug: "/furniture-moving/",
    tagline: (city) => `Furniture Movers in ${city}`,
    subtitle: (city) => `Professional furniture moving in ${city}, WA, heavy items, specialty pieces, in-home rearranging.`,
    intro: (city, cityData) =>
      `That sectional that seemed like a good idea when you bought it is now wedged in a ${city} stairwell at 10am on a Saturday. We've seen it. Our furniture crews carry the right equipment for every scenario, furniture boards, furniture dollies, stair-climbing hand trucks, and enough moving straps to handle anything from a single dresser to a full home's worth of furniture. Single-item moves, in-home rearranging, or full furniture relocation, we do all of it.`,
    pricing: (city) =>
      `Single item: $150–$350 · Full home furniture: $480–$1,500+ · In-home rearranging: $120–$160/hr`,
    steps: (city) => [
      `Free quote for your ${city} furniture moving needs`,
      "Crew arrives with dollies, straps, and protective pads",
      "Furniture is wrapped and protected before moving",
      "Careful navigation through doorways, stairs, and tight spaces",
      "Furniture placed exactly where you want it",
      "Final inspection to confirm no damage",
    ],
    benefits: [
      "In-home rearranging available, no full move required",
      "Furniture pads and protective wrapping on every piece",
      "Stair and elevator carries handled safely",
      "Flat-rate pricing for single items",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does furniture moving cost in ${city}?`, a: `A single furniture item move in ${city} typically costs $150–$350 depending on size, weight, and distance. Full home furniture moves run $480–$1,500+. We provide flat-rate quotes for all furniture jobs.` },
      { q: `Can you move just one piece of furniture in ${city}?`, a: `Yes. We offer single-item furniture moves throughout ${city} and the Greater Seattle area. Common single-item moves include sofas, beds, dressers, and dining tables.` },
      { q: `Do you move furniture within the same home in ${city}?`, a: `Yes. We offer in-home furniture rearranging services. Our crews bring dollies and moving equipment to safely move heavy furniture within your home without damaging floors or walls.` },
      { q: `Can you move heavy or awkward items in ${city}?`, a: `Yes. We have specialized equipment for heavy and oversized items including large appliances, safes, and oversized furniture. Ask us about your specific items when you request a quote.` },
    ],
    heroImage: BRAND_IMAGES.threeCrewLoadingTruck,
    icon: "🛋️",
  },


  condo: {
    key: "condo",
    label: "Condo Moving",
    hubSlug: "/condo-moving/",
    tagline: (city) => `Condo Movers in ${city}`,
    subtitle: (city) => `Condo moving specialists in ${city}, WA, HOA coordination, elevator booking, certificate of insurance.`,
    intro: (city, cityData) =>
      `${city} condo buildings will turn away a moving crew that shows up without the right paperwork, and that means your move day is over before it starts. We've worked with enough ${city} buildings to know that every property has its own COI requirements, elevator reservation windows, and move-in fee structures. We handle all of it in advance: we call the building, get the requirements, file the paperwork, and book the elevator so your move day runs without surprises.`,
    pricing: (city) =>
      `1-Bed condo: $480–$780 · 2-Bed condo: $700–$1,200 · All HOA coordination included`,
    steps: (city) => [
      `We contact your ${city} HOA or building management to confirm requirements`,
      `Certificate of insurance provided, meets most ${city} building requirements`,
      "Elevator reservation booked for your move window",
      "Crew arrives on time with all equipment and furniture protection",
      "Careful navigation through hallways and elevators",
      "Final walkthrough of common areas, no damage left behind",
    ],
    benefits: [
      "HOA move-in/move-out procedure coordination",
      "Certificate of insurance provided at no extra charge",
      "Elevator reservation coordination with building management",
      "Furniture protection for hallways and elevators",
      "Flat-rate pricing, no hourly surprises",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does a condo move cost in ${city}?`, a: `Most ${city} condo moves cost $480–$780 for a 1-bedroom unit and $700–$1,200 for a 2-bedroom unit. All HOA coordination and certificate of insurance are included in the price.` },
      { q: `Do you handle the HOA requirements for ${city} condo moves?`, a: `Yes. We contact your HOA or building management to confirm move-in/move-out procedures, book the elevator, and provide the certificate of insurance your building requires.` },
      { q: `Do you provide a certificate of insurance for ${city} condo buildings?`, a: `Yes. We provide certificates of insurance that meet most ${city} condo building and HOA requirements. Let us know your building's requirements when you request a quote.` },
      { q: `How far in advance should I book ${city} condo movers?`, a: `We recommend booking 2–4 weeks in advance to allow time for HOA coordination and elevator reservation. Some ${city} buildings require 2 weeks notice for elevator bookings.` },
    ],
    heroImage: BRAND_IMAGES.threeCrewLoadingTruck,
    icon: "🏙️",
  },

  "corporate-relocation": {
    key: "corporate-relocation",
    label: "Corporate Relocation",
    hubSlug: "/corporate-relocation/",
    tagline: (city) => `Corporate Relocation Services in ${city}`,
    subtitle: (city) => `Employee and office relocation in ${city}, WA, HR coordination, dedicated project manager, full-service execution.`,
    intro: (city, cityData) =>
      `HR teams in ${city} managing a relocation are juggling lease timelines, employee expectations, and building logistics simultaneously, and a moving company that just shows up with a truck isn't enough. Our corporate relocation team assigns a dedicated project manager who works directly with your HR department, coordinates with property managers at both ends, and provides the documentation your company needs for expense reporting and compliance. We've handled relocations for ${city} companies ranging from single-employee moves to full office transitions.`,
    pricing: (city) =>
      `Single employee relocation: $800–$2,500 · Multi-person office relocation: quoted after assessment`,
    steps: (city) => [
      `Initial consultation with HR or office manager in ${city}`,
      "Dedicated project manager assigned to your relocation",
      "Detailed move plan created and shared with all stakeholders",
      "After-hours or weekend execution to minimize business disruption",
      "Full-service packing, transport, and unpacking",
      "Final walkthrough and sign-off with your HR team",
    ],
    benefits: [
      "Dedicated project manager for every corporate relocation",
      "Direct coordination with HR departments and property managers",
      "After-hours and weekend execution available",
      "Full-service packing, transport, and unpacking",
      "Detailed move plans and chain-of-custody documentation",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How does corporate relocation work in ${city}?`, a: `We start with a consultation with your HR team or office manager, assign a dedicated project manager, create a detailed move plan, and execute the relocation after hours or on weekends to minimize disruption.` },
      { q: `Can you coordinate multiple employee relocations in ${city}?`, a: `Yes. We regularly coordinate multi-person corporate relocations in ${city} and the Greater Seattle area. Our project manager handles all logistics and communication with your HR team.` },
      { q: `Do you work directly with HR departments for ${city} corporate relocations?`, a: `Yes. We work directly with HR departments, property managers, and office administrators. We can provide detailed documentation, certificates of insurance, and move reports for your records.` },
      { q: `How much does corporate relocation cost in ${city}?`, a: `Single employee relocations in ${city} typically cost $800–$2,500 depending on home size and distance. Multi-person office relocations are quoted after a free site assessment.` },
    ],
    heroImage: BRAND_IMAGES.crewWrappingOffice,
    icon: "🤝",
  },

  "labor-only": {
    key: "labor-only",
    label: "Labor Only Moving",
    hubSlug: "/labor-only-moving/",
    tagline: (city) => `Labor Only Movers in ${city}`,
    subtitle: (city) => `Professional moving labor in ${city}, WA, loading, unloading, and furniture rearranging.`,
    intro: (city, cityData) =>
      `Labor-only moving in ${city} is a practical option for PODS, portable containers, and same-building moves, but many customers find that upgrading to a full-service truck and crew costs only a small amount more per hour. Our labor-only crews are the same professional movers who work our full-service jobs. Ask us about adding a truck when you call, it's often closer in price than you'd expect, and you skip the rental, the driving, and the liability.`,
    pricing: (city) =>
      `$120–$160/hr for 2-person crew · Call us about our minimums · Loading or unloading only available`,
    steps: (city) => [
      `Book your ${city} labor-only crew for your move date`,
      "Crew arrives on time at your loading or unloading location",
      "Professional loading with proper furniture protection and stacking",
      "Or professional unloading and placement in your new space",
            "Final walkthrough to confirm everything is in order",
    ],
    benefits: [
      "Same professional crews as our full-service moves",
      "Loading only, unloading only, or both",
      "Furniture pads and moving equipment provided",
      "Efficient loading to maximize truck space",
      "Flexible scheduling, available 7 days a week",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does labor-only moving cost in ${city}?`, a: `Labor-only moving in ${city} costs $120–$160 per hour for a 2-person crew. Call us about our minimums. We can provide loading only, unloading only, or both.` },
      { q: `Do you bring moving equipment for labor-only jobs in ${city}?`, a: `Yes. Our crews bring furniture dollies, moving straps, and furniture pads on every labor-only job. You don't need to provide any equipment.` },
      { q: `Can you load a PODS or U-Haul container in ${city}?`, a: `Yes. We regularly load and unload PODS, U-Haul U-Boxes, and other portable storage containers throughout ${city} and the Greater Seattle area.` },
      { q: `How many movers do I need for my ${city} labor-only job?`, a: `Most labor-only jobs in ${city} use a 2-person crew. For larger homes or heavy items, we recommend a 3-person crew. We'll advise during quoting.` },
    ],
    heroImage: BRAND_IMAGES.crewEntryway2,
    icon: "💪",
  },

  appliance: {
    key: "appliance",
    label: "Appliance Moving",
    hubSlug: "/appliance-moving/",
    tagline: (city) => `Appliance Movers in ${city}`,
    subtitle: (city) => `Professional appliance moving in ${city}, WA, refrigerators, washers, dryers, and more.`,
    intro: (city, cityData) =>
      `A refrigerator dragged across hardwood floors in a ${city} home leaves scratches that cost more to fix than the moving service would have. Our appliance crews use appliance dollies, floor runners, and moving straps on every job, the refrigerator never touches your floor directly. We move refrigerators, washers, dryers, dishwashers, and large ranges throughout ${city}, and we can coordinate disconnection and reconnection assistance for standard appliances.`,
    pricing: (city) =>
      `Single appliance: $150–$350 · Multiple appliances: $120–$160/hr · Disconnection/reconnection available`,
    steps: (city) => [
      `Free quote for your ${city} appliance moving needs`,
      "Crew arrives with appliance dolly, straps, and protective padding",
      "Appliance is secured and carefully moved through your home",
      "Floor protection used throughout the move",
      "Appliance placed in new location",
      "Reconnection assistance available if needed",
    ],
    benefits: [
      "Specialized appliance dollies and moving straps",
      "Floor protection on every appliance move",
      "Refrigerators, washers, dryers, dishwashers, and more",
      "Disconnection and reconnection assistance available",
      "Flat-rate pricing for single appliances",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does appliance moving cost in ${city}?`, a: `A single appliance move in ${city} typically costs $150–$350 depending on size, weight, and distance. Multiple appliance moves run $120–$160/hr. We provide flat-rate quotes for all appliance jobs.` },
      { q: `Do you disconnect and reconnect appliances in ${city}?`, a: `We can assist with disconnection and reconnection of standard appliances. For gas appliances, we recommend a licensed plumber for gas line disconnection and reconnection.` },
      { q: `Can you move a refrigerator with food in it in ${city}?`, a: `We recommend emptying your refrigerator before moving. A full refrigerator is significantly heavier and the food can shift during transport. We can move an empty refrigerator safely.` },
      { q: `Do you move appliances within the same home in ${city}?`, a: `Yes. We offer in-home appliance moving for kitchen remodels, room rearranging, and other in-home moves. Our crews bring the right equipment to move appliances safely without damaging floors.` },
    ],
    heroImage: BRAND_IMAGES.threeCrewLoadingTruck,
    icon: "🧊",
  },


  unpacking: {
    key: "unpacking",
    label: "Unpacking Services",
    hubSlug: "/unpacking-services/",
    tagline: (city) => `Unpacking Services in ${city}`,
    subtitle: (city) => `Professional unpacking in ${city}, WA, we unpack, organize, and remove all boxes and materials.`,
    intro: (city, cityData) =>
      `Most ${city} families live out of boxes for two weeks after a move, not because they don't want to unpack, but because move day is exhausting and the boxes just keep multiplying. Our unpacking crews arrive the day of or day after your move, unpack every box, place items in the right rooms, and haul away every box and packing material. You go to sleep in a new home that actually feels like one.`,
    pricing: (city) =>
      `$35–$55/hr per unpacker · 1-Bed: 2–4 hrs · 3-Bed: 6–10 hrs · Box removal included`,
    steps: (city) => [
      `Unpacking crew arrives at your new ${city} home`,
      "Walk-through to understand where items should go",
      "Boxes are unpacked room by room",
      "Items are placed in the right locations",
      "All boxes and packing materials are broken down and removed",
      "Final walkthrough to confirm everything is in order",
    ],
    benefits: [
      "Full unpacking or room-by-room partial unpacking",
      "All boxes and packing materials removed",
      "Items placed in the right rooms per your direction",
      "Available as a standalone service or add-on to your move",
      "Same-day or next-day unpacking available",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much do unpacking services cost in ${city}?`, a: `Professional unpacking in ${city} typically costs $35–$55 per hour per unpacker. A 1-bedroom home takes 2–4 hours to unpack. A 3-bedroom home takes 6–10 hours. Box removal is included.` },
      { q: `Do you remove all the boxes and packing materials after unpacking in ${city}?`, a: `Yes. Box removal and packing material disposal are included in our unpacking service. We break down all boxes and remove all materials from your ${city} home.` },
      { q: `Can you unpack just certain rooms in my ${city} home?`, a: `Yes. We offer partial unpacking, you choose which rooms you want unpacked. Common partial unpacking requests include kitchen, master bedroom, and bathrooms.` },
      { q: `Can I book unpacking services the day after my ${city} move?`, a: `Yes. We offer same-day and next-day unpacking services. Book unpacking when you book your move and we'll schedule it for move day or the following day.` },
    ],
    heroImage: BRAND_IMAGES.truckKirklandHouse,
    icon: "📂",
  },

  warehousing: {
    key: "warehousing",
    label: "Warehousing Services",
    hubSlug: "/warehousing-services/",
    tagline: (city) => `Warehousing & Distribution in ${city}`,
    subtitle: (city) => `Business warehousing and logistics for ${city}, WA companies, secure storage, inventory management, distribution.`,
    intro: (city, cityData) =>
      `${city} businesses outgrow their storage space faster than they outgrow their lease, and signing a long-term warehouse contract to solve a short-term inventory problem is an expensive mistake. Our Redmond facility is minutes from ${city} with month-to-month terms, full inventory management, and receiving and distribution services. You get a dedicated warehouse team without the overhead of a dedicated warehouse.`,
    pricing: (city) =>
      `Pallet storage: $25–$45/pallet/month · Full warehouse solutions quoted after assessment`,
    steps: (city) => [
      `Free consultation to assess your ${city} business warehousing needs`,
      "Inventory is received, photographed, and catalogued",
      "Items stored in our secure, climate-controlled Redmond facility",
      "Online inventory management, track your stock anytime",
      "Pick-and-pack and distribution services available",
      "Flexible terms, scale up or down as your business needs change",
    ],
    benefits: [
      "Climate-controlled, secure Redmond facility",
      "Full inventory management and online tracking",
      "Receiving, pick-and-pack, and distribution services",
      "Flexible month-to-month terms",
      "Just minutes from most Eastside cities",
      "Licensed HG-064180 | USDOT# 2120054 | Fully insured",
    ],
    faqs: (city) => [
      { q: `How much does business warehousing cost for ${city} companies?`, a: `Pallet storage at our Redmond facility costs $25–$45 per pallet per month. Full warehouse solutions including receiving, inventory management, and distribution are quoted after a free consultation.` },
      { q: `Is your warehouse near ${city}?`, a: `Yes. Our Redmond facility is just minutes from most Eastside cities including ${city}. We offer pickup and delivery throughout the Greater Seattle area.` },
      { q: `Do you offer inventory management for ${city} businesses?`, a: `Yes. We provide full inventory management including receiving, cataloguing, and online tracking. You can view your inventory anytime through our online portal.` },
      { q: `Can you handle distribution for my ${city} business?`, a: `Yes. We offer pick-and-pack and last-mile distribution services for businesses in ${city} and the Greater Seattle area. Contact us to discuss your specific distribution needs.` },
    ],
    heroImage: BRAND_IMAGES.storageWarehouse,
    icon: "🏭",
  },
};

// Ordered list of services for the sidebar navigation
const SERVICE_ORDER: string[] = [
  "residential", "apartment", "packing", "storage", "office", "commercial",
  "senior", "furniture", "condo", "corporate-relocation",
  "appliance", "unpacking", "warehousing",
];

// ---------------------------------------------------------------------------
// Nearby city variants — for cross-linking to same service in nearby cities
// ---------------------------------------------------------------------------
const NEARBY_CITIES: Record<string, string[]> = {
  seattle: ["bellevue", "kirkland", "shoreline", "renton"],
  bellevue: ["seattle", "redmond", "kirkland", "sammamish"],
  redmond: ["bellevue", "kirkland", "sammamish", "bothell"],
  kirkland: ["bellevue", "redmond", "bothell", "seattle"],
  sammamish: ["redmond", "bellevue", "issaquah", "kirkland"],
  issaquah: ["sammamish", "bellevue", "renton", "north-bend"],
  bothell: ["kirkland", "redmond", "shoreline", "kenmore"],
  renton: ["seattle", "bellevue", "tukwila", "issaquah"],
  shoreline: ["seattle", "bothell", "kenmore", "lynnwood"],
  "north-bend": ["issaquah", "sammamish", "snoqualmie", "renton"],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface CityServiceSubPageProps {
  citySlug: string;   // e.g. "seattle" (without "-movers")
  serviceKey: string; // e.g. "residential"
}

export default function CityServiceSubPage({ citySlug, serviceKey }: CityServiceSubPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cityData = LOCATION_DATA[`${citySlug}-movers`];
  const serviceDef = SERVICE_DEFS[serviceKey];

  const city = cityData?.city || citySlug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  const cityMoverSlug = `${citySlug}-movers`;

  useEffect(() => {
    if (!serviceDef) return;
    const title = `${serviceDef.label} in ${city} | On The Go Moving & Storage`;
    const desc = `Professional ${serviceDef.label.toLowerCase()} in ${city}, WA. On The Go Moving & Storage, licensed, insured, 4.8 stars. Flat-rate pricing. Free quote. Call ${COMPANY.phone}.`;

    document.title = title;
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", desc);
    setMeta("og:title", title, true);
    setMeta("og:description", desc, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", `https://onthegomoving.com/${cityMoverSlug}/${serviceKey}/`, true);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://onthegomoving.com/${cityMoverSlug}/${serviceKey}/`;

    // Schema
    const schemaId = "city-sub-schema";
    document.getElementById(schemaId)?.remove();
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": ["MovingCompany", "LocalBusiness"],
        name: COMPANY.name,
        url: `https://onthegomoving.com/${cityMoverSlug}/${serviceKey}/`,
        telephone: cityData?.gbp?.telephone ?? COMPANY.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: cityData?.gbp?.streetAddress ?? "16625 Redmond Way #M365",
          addressLocality: cityData?.gbp?.addressLocality ?? "Redmond",
          addressRegion: "WA",
          postalCode: cityData?.gbp?.postalCode ?? "98052",
          addressCountry: "US",
        },
        areaServed: { "@type": "City", name: city, containedInPlace: { "@type": "State", name: "Washington" } },
        aggregateRating: { "@type": "AggregateRating", ratingValue: cityData?.gbp?.ratingValue ?? "4.8", reviewCount: cityData?.gbp?.reviewCount ?? "393", bestRating: "5" },
        priceRange: "$$",
        openingHours: ["Mo-Su 00:00-00:00"],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: serviceDef.faqs(city).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://onthegomoving.com/" },
          { "@type": "ListItem", position: 2, name: `${city} Movers`, item: `https://onthegomoving.com/${cityMoverSlug}/` },
          { "@type": "ListItem", position: 3, name: serviceDef.label, item: `https://onthegomoving.com/${cityMoverSlug}/${serviceKey}/` },
        ],
      },
    ]);
    document.head.appendChild(script);
    return () => { document.getElementById(schemaId)?.remove(); };
  }, [city, cityMoverSlug, serviceKey, serviceDef]);

  if (!serviceDef) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <a href={`/${cityMoverSlug}/`} className="text-brand-green hover:underline">
            Back to {city} Movers
          </a>
        </div>
      </div>
    );
  }

  const faqs = serviceDef.faqs(city);
  const steps = serviceDef.steps(city);

  // Tier A deep content lookup
  // Maps service keys to Tier A content slugs
  const TIER_A_SERVICE_MAP: Record<string, string> = {
    residential: "residential",
    apartment: "apartment",
    condo: "apartment",
    commercial: "commercial",
    office: "commercial",
    "corporate-relocation": "commercial",
    packing: "packing",
    storage: "storage",
    senior: "senior",
    furniture: "furniture",
    appliance: "appliance",
    unpacking: "unpacking",
    warehousing: "warehousing",
  };
  const tierAServiceKey = TIER_A_SERVICE_MAP[serviceKey];
  const tierAEntry = tierAServiceKey
    ? TIER_A_CONTENT[`${citySlug}-${tierAServiceKey}`] ?? null
    : null;
  const nearbySlug = NEARBY_CITIES[citySlug] || [];

  // Pick the most relevant challenge(s) from cityData based on service type
  const CHALLENGE_KEYWORDS: Record<string, string[]> = {
    residential: ["driveway", "hoa", "parking", "permit", "steep", "narrow", "traffic", "access", "street"],
    apartment: ["elevator", "coi", "certificate", "move-in", "window", "high-rise", "building", "floor"],
    packing: ["hoa", "parking", "permit", "access", "driveway", "narrow", "stairs"],
    storage: ["traffic", "access", "distance", "facility"],
    office: ["freight", "loading", "dock", "elevator", "permit", "parking", "traffic"],
    commercial: ["freight", "loading", "dock", "elevator", "permit", "parking", "traffic"],
    senior: ["stairs", "narrow", "access", "driveway", "hoa", "elevator"],
    furniture: ["stairs", "narrow", "elevator", "driveway", "access"],
    condo: ["elevator", "coi", "certificate", "hoa", "move-in", "window", "building"],
    "corporate-relocation": ["traffic", "permit", "parking", "freight", "loading", "dock"],
    appliance: ["stairs", "narrow", "driveway", "access", "elevator"],
    unpacking: ["hoa", "parking", "access", "elevator", "building"],
    warehousing: ["traffic", "access", "distance", "facility"],
  };
  const relevantKeywords = CHALLENGE_KEYWORDS[serviceKey] || [];
  const allChallenges: string[] = cityData?.challenges || [];
  const relevantChallenges = allChallenges
    .filter(c => relevantKeywords.some(kw => c.toLowerCase().includes(kw)))
    .slice(0, 2);
  const fallbackChallenge = allChallenges.slice(0, 1);
  const localChallenges = relevantChallenges.length > 0 ? relevantChallenges : fallbackChallenge;

  const neighborhoods: string[] = cityData?.neighborhoods || [];

  // Option 1 — City-specific pricing
  const cityPricing = cityData?.pricing;
  const pricingLine = cityPricing
    ? (() => {
        const serviceType = ["apartment", "condo"].includes(serviceKey) ? "apartment" :
          ["office", "commercial", "corporate-relocation", "warehousing"].includes(serviceKey) ? "business" :
          "residential";
        if (serviceType === "apartment") {
          return `Studio: ${cityPricing.studio} · 1-bed: ${cityPricing.oneBed} · 2-bed: ${cityPricing.twoBed} · ${cityPricing.hourlyRate}`;
        } else if (serviceType === "business") {
          return `Commercial rates from ${cityPricing.hourlyRate} · Free on-site estimate · Flat-rate quotes available`;
        } else {
          return `1-bed: ${cityPricing.oneBed} · 2-bed: ${cityPricing.twoBed} · 3-bed: ${cityPricing.threeBed} · ${cityPricing.hourlyRate}`;
        }
      })()
    : serviceDef.pricing(city);

  // Option 2 — City-specific context paragraph based on service type
  const cityContextHeading = ["apartment", "condo"].includes(serviceKey)
    ? `${serviceDef.label} in ${city}, What to Know`
    : ["office", "commercial", "corporate-relocation", "warehousing"].includes(serviceKey)
    ? `Business Moves in ${city}`
    : `${city} Home Moves, Local Expertise`;
  const cityContextBody: string | null = ["apartment", "condo"].includes(serviceKey)
    ? (cityData?.apartment || null)
    : ["office", "commercial", "corporate-relocation", "warehousing"].includes(serviceKey)
    ? (cityData?.business || null)
    : (cityData?.home || null);

  // Option 3 — Blend city-level FAQs into the FAQ section
  // Pick up to 2 city FAQs that are relevant to the current service type
  const SERVICE_FAQ_KEYWORDS: Record<string, string[]> = {
    residential: ["home", "house", "residential", "cost", "price", "how much", "driveway", "permit", "hoa"],
    apartment: ["apartment", "elevator", "coi", "move-in", "building", "high-rise", "floor"],
    packing: ["pack", "box", "wrap", "supply", "material"],
    storage: ["storage", "store", "unit", "facility"],
    office: ["office", "business", "commercial", "it", "equipment", "workstation"],
    commercial: ["office", "business", "commercial", "it", "equipment"],
    senior: ["senior", "elder", "retirement", "assisted", "downsiz"],
    furniture: ["furniture", "couch", "sofa", "bed", "table", "heavy"],
    condo: ["condo", "elevator", "hoa", "building", "move-in"],
    "corporate-relocation": ["corporate", "relocation", "office", "business", "commercial"],
    appliance: ["appliance", "washer", "dryer", "fridge", "refrigerator", "stove"],
    unpacking: ["unpack", "set up", "organize", "arrange"],
    warehousing: ["warehouse", "storage", "distribution", "logistics"],
  };
  const cityFaqKeywords = SERVICE_FAQ_KEYWORDS[serviceKey] || [];
  const allCityFaqs: { q: string; a: string }[] = cityData?.faqs || [];
  const blendedCityFaqs = allCityFaqs
    .filter(f => cityFaqKeywords.some(kw => f.q.toLowerCase().includes(kw) || f.a.toLowerCase().includes(kw)))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15,40,10,0.92) 55%, rgba(15,40,10,0.65) 100%), url(${serviceDef.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-green-300 text-sm mb-6" aria-label="Breadcrumb">
            <a href="/"><span className="hover:text-white cursor-pointer transition-colors">Home</span></a>
            <span className="text-green-500">/</span>
            <a href={`/${cityMoverSlug}/`}><span className="hover:text-white cursor-pointer transition-colors">{city} Movers</span></a>
            <span className="text-green-500">/</span>
            <span className="text-white">{serviceDef.label}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              <MapPin className="w-3 h-3" />
              {city}, WA
            </div>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-5">
              {serviceDef.tagline(city)}
            </h1>
            <p className="text-green-100 text-lg lg:text-xl mb-8 max-w-2xl">
              {serviceDef.subtitle(city)}
            </p>

            {/* Trust strip, single line, plain text style */}
            <div className="flex items-center gap-1.5 mb-8 text-xs sm:text-sm text-white/80">
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

            {/* CTAs */}
            {/* Mobile: phone + inline form */}
            <div className="lg:hidden space-y-4">
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-base px-5 py-3 rounded-lg transition-all hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                <Phone className="w-5 h-5" />
                Call {COMPANY.phone}
              </a>
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-brand-green">
                <QuoteForm variant="hero" />
              </div>
            </div>
            {/* Desktop: phone + quote link */}
            <div className="hidden lg:flex flex-row gap-4">
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-forest font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call {COMPANY.phone}
              </a>
              <a href="/contact-us/">
                <span className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all cursor-pointer">
                  Get Free Quote
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING STRIP ── */}
      <div className="bg-brand-forest/95 py-4 border-b border-brand-green/20">
        <div className="container">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-brand-gold font-bold uppercase tracking-wide text-xs">Pricing Guide:</span>
            <span className="text-green-100">{pricingLine}</span>
            <span className="text-green-500 mx-2">·</span>
            <span className="text-green-200 text-xs">Free quote · No obligation · Response within 1 hour</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── MAIN COLUMN ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Intro, LOCAL focus, NOT educational (that's the service hub) */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-display text-2xl font-bold text-brand-forest mb-4">
                  {serviceDef.label} in {city}, WA
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-5">
                  {/* Tier A: use deep intro; fallback to template intro + challenges */}
                  {tierAEntry ? tierAEntry.intro : (
                    <>
                      {serviceDef.intro(city, cityData)}
                      {localChallenges.length > 0 && (
                        <span className="block mt-3 text-gray-600">
                          {localChallenges.length === 1
                            ? `One thing to know about moving in ${city}: ${localChallenges[0].charAt(0).toLowerCase() + localChallenges[0].slice(1)}.`
                            : `A few things to know about moving in ${city}: ${localChallenges[0].charAt(0).toLowerCase() + localChallenges[0].slice(1)}; ${localChallenges[1].charAt(0).toLowerCase() + localChallenges[1].slice(1)}.`
                          }
                        </span>
                      )}
                    </>
                  )}
                </p>
                {/* Cross-link to service hub, differentiates content intent */}
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <ExternalLink className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Want to learn more about how {serviceDef.label.toLowerCase()} works?{" "}
                    <a href={serviceDef.hubSlug}>
                      <span className="text-brand-green font-semibold hover:underline cursor-pointer">
                        Read our complete {serviceDef.label} guide →
                      </span>
                    </a>
                  </p>
                </div>
              </div>

              {/* Neighborhoods We Serve */}
              {neighborhoods.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="font-display text-2xl font-bold text-brand-forest mb-4">
                    {serviceDef.label} Across {city} Neighborhoods
                  </h2>
                  <p className="text-gray-600 mb-5">
                    Our crews serve every neighborhood in {city}, from the most accessible suburbs to the trickiest urban streets. Here are some of the areas we cover regularly:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhoods.map((n, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-brand-forest">
                        <MapPin className="w-3 h-3 text-brand-green flex-shrink-0" />
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* City-specific context, Option 2 (non-Tier-A pages only) */}
              {!tierAEntry && cityContextBody && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="font-display text-2xl font-bold text-brand-forest mb-4">
                    {cityContextHeading}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{cityContextBody}</p>
                </div>
              )}

              {/* Tier A: Building callouts card */}
              {tierAEntry && (
                <div className="bg-green-50 rounded-2xl border border-green-200 p-8">
                  <h2 className="font-display text-2xl font-bold text-brand-forest mb-4">
                    {tierAEntry.buildingCalloutsHeading}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{tierAEntry.buildingCallouts}</p>
                </div>
              )}

              {/* What to Expect */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-display text-2xl font-bold text-brand-forest mb-6">
                  What to Expect on Move Day
                </h2>
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Us */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-display text-2xl font-bold text-brand-forest mb-6">
                  Why Choose On The Go Moving in {city}?
                </h2>
                <ul className="space-y-3">
                  {serviceDef.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs, city-specific questions only */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-display text-2xl font-bold text-brand-forest mb-6">
                  {serviceDef.label} in {city}, Common Questions
                </h2>
                <div className="space-y-3">
                  {[...faqs, ...(tierAEntry ? tierAEntry.extraFaqs : blendedCityFaqs)].map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-brand-forest pr-4">{faq.q}</span>
                        {openFaq === i
                          ? <ChevronUp className="w-5 h-5 text-brand-green flex-shrink-0" />
                          : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
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

              {/* Same service in nearby cities */}
              {nearbySlug.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h2 className="font-display text-xl font-bold text-brand-forest mb-4">
                    {serviceDef.label} in Nearby Cities
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {nearbySlug.map((nearbyCity) => {
                      const nearbyData = LOCATION_DATA[`${nearbyCity}-movers`];
                      const nearbyName = nearbyData?.city || nearbyCity.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
                      return (
                        <a key={nearbyCity} href={`/${nearbyCity}-movers/${serviceKey}/`}>
                          <span className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:border-brand-green hover:bg-green-50 transition-all cursor-pointer text-sm font-medium text-brand-forest">
                            <MapPin className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                            {nearbyName}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <div className="space-y-6">

              {/* Quote CTA, desktop only; mobile uses the hero form */}
              <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
                <h3 className="font-display font-bold text-xl mb-1 text-brand-forest">Get a Free Quote</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Free, no-obligation estimate. We respond within 1 hour.
                </p>
                <QuoteForm variant="inline" defaultFreeStorage={serviceKey === "storage" || serviceKey === "warehousing"} />
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    Every day: 7:00 AM – 7:00 PM
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Shield className="w-3.5 h-3.5" />
                    Licensed HG-064180 · USDOT# 2120054
                  </div>
                </div>
              </div>

              {/* All services in this city */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-display font-bold text-brand-forest text-lg mb-1">
                  All Services in {city}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  <a href={`/${cityMoverSlug}/`}>
                    <span className="text-brand-green hover:underline cursor-pointer">View {city} Movers hub →</span>
                  </a>
                </p>
                <div className="space-y-1">
                  {SERVICE_ORDER.map((svcKey) => {
                    const svc = SERVICE_DEFS[svcKey];
                    if (!svc) return null;
                    // "corporate-relocation" has no /{city}-movers/corporate-relocation/
                    // sub-page for any city (not a valid serviceKey) — render as
                    // plain text instead of a broken link.
                    if (svcKey === "corporate-relocation") {
                      return (
                        <span key={svcKey} className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg text-gray-600">
                          <span className="text-base leading-none">{svc.icon}</span>
                          {svc.label}
                        </span>
                      );
                    }
                    const isActive = svcKey === serviceKey;
                    return (
                      <a key={svcKey} href={`/${cityMoverSlug}/${svcKey}/`}>
                        <span className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          isActive
                            ? "bg-brand-green/10 text-brand-green font-semibold"
                            : "text-gray-600 hover:text-brand-forest hover:bg-gray-50"
                        }`}>
                          <span className="text-base leading-none">{svc.icon}</span>
                          {svc.label}
                          {isActive && <CheckCircle className="w-3.5 h-3.5 ml-auto" />}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Trust signals */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-display font-bold text-brand-forest text-lg mb-4">Why Trust Us</h3>
                <div className="space-y-3">
                  {[
                    ["4.8★ rating", "393 verified reviews"],
                    ["Licensed & Insured", "WA HG-064180 | USDOT# 2120054"],
                    ["Serving since 2009", "15+ years in Greater Seattle"],
                    ["No hidden fees", "Flat-rate pricing always"],
                  ].map(([title, sub], i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-brand-forest text-sm">{title}</p>
                        <p className="text-gray-500 text-xs">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
