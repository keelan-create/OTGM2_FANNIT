// ==========================================================================
// ON THE GO MOVING & STORAGE — Site Data
// Central data store for navigation, services, locations, testimonials, etc.
// ==========================================================================
import { BRAND_IMAGES } from "./brandImages";

export const COMPANY = {
  name: "On The Go Moving & Storage",
  shortName: "On The Go Moving",
  phone: "(425) 761-8500",
  phoneHref: "tel:+14257618500",
  email: "booking@onthegomoving.com",
  address: "16625 Redmond Way #M365, Redmond, WA 98052",
  license: "HG-064180",
  usdot: "2120054",
  googleReviewCount: 393,
  googleRating: 4.8,
  founded: 2009,
  tagline: "Seattle's Most Trusted Movers",
  heroTagline: "Moving Made Easy in the Pacific Northwest",
};

export const NAV_SERVICES = [
  { label: "Residential Moving", href: "/residential-moving/" },
  { label: "Commercial Moving", href: "/commercial-moving/" },
  { label: "Storage Services", href: "/storage-services/" },
  { label: "Apartment Moving", href: "/apartment-moving/" },
  { label: "Senior Moving", href: "/senior-moving/" },
  { label: "Staging Professionals", href: "/staging-professionals/" },
];

// Top 12 shown in nav dropdown — links to all 26 location pages
export const NAV_LOCATIONS = [
  { label: "Seattle Movers", href: "/" },
  { label: "Bellevue Movers", href: "/bellevue-movers/" },
  { label: "Redmond Movers", href: "/redmond-movers/" },
  { label: "Kirkland Movers", href: "/kirkland-movers/" },
  { label: "Issaquah Movers", href: "/issaquah-movers/" },
  { label: "Bothell Movers", href: "/bothell-movers/" },
  { label: "Renton Movers", href: "/renton-movers/" },
  { label: "Shoreline Movers", href: "/shoreline-movers/" },
  { label: "Sammamish Movers", href: "/sammamish-movers/" },
  { label: "Woodinville Movers", href: "/woodinville-movers/" },
  { label: "Kenmore Movers", href: "/kenmore-movers/" },
  { label: "Mercer Island Movers", href: "/mercer-island-movers/" },
  { label: "View All Locations →", href: "/we-are-local/" },
];

// All 26 location pages — used in footer, sitemap, and Locations index
export const ALL_LOCATIONS = [
  { label: "Seattle", href: "/seattle-movers/" },
  { label: "Bellevue", href: "/bellevue-movers/" },
  { label: "Redmond", href: "/redmond-movers/" },
  { label: "Kirkland", href: "/kirkland-movers/" },
  { label: "Sammamish", href: "/sammamish-movers/" },
  { label: "Issaquah", href: "/issaquah-movers/" },
  { label: "Woodinville", href: "/woodinville-movers/" },
  { label: "Kenmore", href: "/kenmore-movers/" },
  { label: "Bothell", href: "/bothell-movers/" },
  { label: "Mercer Island", href: "/mercer-island-movers/" },
  { label: "Renton", href: "/renton-movers/" },
  { label: "Shoreline", href: "/shoreline-movers/" },
  { label: "Newcastle", href: "/newcastle-movers/" },
  { label: "Lake Forest Park", href: "/lake-forest-park-movers/" },
  { label: "Tukwila", href: "/tukwila-movers/" },
  { label: "Mountlake Terrace", href: "/mountlake-terrace-movers/" },
  { label: "Lynnwood", href: "/lynnwood-movers/" },
  { label: "Mukilteo", href: "/mukilteo-movers/" },
  { label: "Burien", href: "/burien-movers/" },
  { label: "Snoqualmie", href: "/snoqualmie-movers/" },
  { label: "North Bend", href: "/north-bend-movers/" },
  { label: "Duvall", href: "/duvall-movers/" },
  { label: "Carnation", href: "/carnation-movers/" },
  { label: "Fall City", href: "/fall-city-movers/" },
  { label: "Maple Valley", href: "/maple-valley-movers/" },
  { label: "Covington", href: "/covington-movers/" },
];

export const MAIN_NAV = [
  {
    label: "Services",
    href: "/services/",
    children: NAV_SERVICES,
  },
  {
    label: "How Much Do Movers Cost?",
    href: "/how-much-do-movers-cost/",
  },
  {
    label: "About",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Meet Jason Sexton", href: "/jason-sexton/" },
      { label: "Our Team", href: "/about-us/#team" },
      { label: "Partners", href: "/partners/" },
      { label: "Staging Professionals", href: "/staging-professionals/" },
      { label: "Real Estate Agents", href: "/real-estate-agents/" },
    ],
  },
  {
    label: "We Are Local",
    href: "/locations/",
    children: NAV_LOCATIONS,
  },
  {
    label: "Blog",
    href: "/blog/",
  },
];

export const SERVICES = [
  {
    title: "Residential Moving",
    slug: "residential-moving",
    href: "/residential-moving/",
    icon: "🏠",
    description:
      "Full-service home moves handled with care. From studio apartments to large family homes, our crews treat your belongings like their own.",
    image: BRAND_IMAGES.residentialMoving,
  },
  {
    title: "Commercial Moving",
    slug: "commercial-moving",
    href: "/commercial-moving/",
    icon: "🏢",
    description:
      "Minimize downtime with our efficient office and commercial relocation services. We work around your schedule to keep your business running.",
    image: BRAND_IMAGES.commercialFleet,
  },
  {
    title: "Storage Services",
    slug: "storage-services",
    href: "/storage-services/",
    icon: "🏪",
    description:
      "Secure storage vaults at our Redmond, WA facility. Your belongings are loaded into dedicated vaults and managed by our team, not a self-serve unit. Contact us for current pricing.",
    image: BRAND_IMAGES.storageForklift,
  },
  {
    title: "Apartment Moving",
    slug: "apartment-moving",
    href: "/apartment-moving/",
    icon: "🏢",
    description:
      "Elevator coordination, HOA certificates, and flat-rate pricing. We handle every building requirement so your move day runs without surprises.",
    image: BRAND_IMAGES.threeCrewLoadingTruck,
  },
  {
    title: "Senior Moving",
    slug: "senior-moving",
    href: "/senior-moving/",
    icon: "👴",
    description:
      "Patient, compassionate crews trained for senior moves. We work at your pace, coordinate with family members, and handle assisted living transitions.",
    image: BRAND_IMAGES.crewEntryway2,
  },
  {
    title: "Staging Professionals",
    slug: "staging-professionals",
    href: "/staging-professionals/",
    icon: "🏡",
    description:
      "Moving and storage services tailored for home stagers. Fast turnaround, flexible scheduling, and secure vault storage between staging projects.",
    image: BRAND_IMAGES.teamFleet,
  },
  {
    title: "Packing Services",
    slug: "packing-services",
    href: "/packing-services/",
    icon: "📦",
    description:
      "Professional packing using quality materials, all supplies included. Full-pack, partial-pack, or fragile-only options available.",
    image: BRAND_IMAGES.packingCrew,
  },
  {
    title: "Labor Only Moving",
    slug: "labor-only-moving",
    href: "/labor-only-moving/",
    icon: "💪",
    description:
      "Need loading or unloading help without a truck? Our professional crews bring the same care and equipment, ask about upgrading to a full-service move.",
    image: BRAND_IMAGES.laborOnlyCrew,
  },
  {
    title: "Furniture Moving",
    slug: "furniture-moving",
    href: "/furniture-moving/",
    icon: "🛋️",
    description:
      "Single-item or full-room furniture moves, rearrangements, and deliveries. Fully padded and wrapped for protection on every job.",
    image: BRAND_IMAGES.crewWrappingFurniture,
  },
  {
    title: "Condo Moving",
    slug: "condo-moving",
    href: "/condo-moving/",
    icon: "🏙️",
    description:
      "Condo moves handled with building compliance in mind, elevator reservations, COI certificates, and move-in/out rules managed for you.",
    image: BRAND_IMAGES.crewEntryway3,
  },
  {
    title: "Appliance Moving",
    slug: "appliance-moving",
    href: "/appliance-moving/",
    icon: "🔧",
    description:
      "Safe transport of washers, dryers, refrigerators, and heavy appliances. Proper equipment and trained crews for every job.",
    image: BRAND_IMAGES.crewCarryingFurniture,
  },
  {
    title: "Unpacking Services",
    slug: "unpacking-services",
    href: "/unpacking-services/",
    icon: "📬",
    description:
      "Let our crew unpack and set up your new home. We remove all packing materials and get everything in place so you can settle in faster.",
    image: BRAND_IMAGES.crewEntryway1,
  },
  {
    title: "Warehousing & Distribution",
    slug: "warehousing-distribution",
    href: "/warehousing-distribution/",
    icon: "🏭",
    description:
      "Short and long-term warehousing at our Redmond facility. Secure vault storage, inventory management, and distribution services available.",
    image: BRAND_IMAGES.storageWarehouse,
  },
  {
    title: "Office Moving",
    slug: "office-moving",
    href: "/office-moving/",
    icon: "🖥️",
    description:
      "Complete office relocations with minimal disruption. We handle workstations, filing systems, IT equipment, and furniture, evenings and weekends available.",
    image: BRAND_IMAGES.officeMoveAction,
  },
  {
    title: "Corporate Relocation",
    slug: "corporate-relocation",
    href: "/corporate-relocation/",
    icon: "🤝",
    description:
      "End-to-end corporate relocation services for businesses of all sizes. Dedicated project managers, flexible scheduling, and full liability coverage.",
    image: BRAND_IMAGES.crewCustomerCommercial,
  },
  {
    title: "Freight Forwarding",
    slug: "freight-forwarding-service",
    href: "/freight-forwarding-service/",
    icon: "🚚",
    description:
      "Long-distance freight forwarding and logistics services. We coordinate transport, handling, and delivery for large or complex shipments.",
    image: BRAND_IMAGES.brandedTruck,
  },
];

// The 6 services shown on the home page (image 3 from design brief)
export const HOME_SERVICES = SERVICES.filter((s) =>
  [
    "residential-moving",
    "commercial-moving",
    "storage-services",
    "apartment-moving",
    "senior-moving",
    "staging-professionals",
  ].includes(s.slug)
).sort((a, b) => {
  const order = ["residential-moving", "commercial-moving", "storage-services", "apartment-moving", "senior-moving", "staging-professionals"];
  return order.indexOf(a.slug) - order.indexOf(b.slug);
});

export const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Bellevue, WA",
    rating: 5,
    text: "On The Go Moving made our move completely stress-free. The crew was on time, professional, and handled all of our furniture with incredible care. I can't recommend them enough!",
    date: "March 2024",
  },
  {
    name: "James K.",
    location: "Redmond, WA",
    rating: 5,
    text: "Used them for our office relocation. They completed the entire move over a weekend so we were back up and running Monday morning. Absolutely phenomenal service.",
    date: "February 2024",
  },
  {
    name: "Maria L.",
    location: "Seattle, WA",
    rating: 5,
    text: "Third time using On The Go Moving and they never disappoint. Efficient, friendly, and fairly priced. They even helped me rearrange furniture after the move at no extra charge.",
    date: "January 2024",
  },
  {
    name: "David R.",
    location: "Kirkland, WA",
    rating: 5,
    text: "The team was incredibly careful with our antiques and fragile items. Everything arrived in perfect condition. Our move was seamless from start to finish.",
    date: "December 2023",
  },
  {
    name: "Jennifer T.",
    location: "Issaquah, WA",
    rating: 5,
    text: "Best movers in the Seattle area, period. They showed up early, worked efficiently, and the final price was exactly what was quoted. Zero surprises.",
    date: "November 2023",
  },
];

export const STATS = [
  { value: "15+", label: "Years in Business" },
  { value: "393", label: "5-Star Google Reviews" },
  { value: "25,000+", label: "Successful Moves" },
  { value: "4.8★", label: "Average Rating" },
];

export const LOCATIONS_SERVED = [
  "Seattle", "Bellevue", "Redmond", "Kirkland", "Sammamish",
  "Issaquah", "Woodinville", "Kenmore", "Bothell", "Mercer Island",
  "Renton", "Shoreline", "Newcastle", "Lake Forest Park", "Tukwila",
  "Mountlake Terrace", "Lynnwood", "Mukilteo", "Burien", "Snoqualmie",
  "North Bend", "Duvall", "Carnation", "Fall City", "Maple Valley", "Covington",
];

export const FAQS = [
  {
    question: "How much does it cost to hire movers in Seattle?",
    answer:
      "Local moves in the Seattle area typically cost between $100–$200 per hour for a 2-person crew with a truck. The total cost depends on the size of your home, distance, and any additional services like packing. Most 2-bedroom moves run $500–$1,200. Get a free, no-obligation quote from us for an exact estimate.",
  },
  {
    question: "How far in advance should I book movers?",
    answer:
      "We recommend booking at least 2–4 weeks in advance, especially for summer moves (May–September) when demand is highest. However, we do our best to accommodate last-minute moves, call us and we'll check availability.",
  },
  {
    question: "Do you offer storage with a move?",
    answer:
      "Yes. We offer secure vault storage at our Redmond, WA facility starting at $100/month per vault. Our team handles all loading and retrieval — it's a full-service solution, not a self-serve storage unit. Contact us for current pricing and availability.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. On The Go Moving & Storage is fully licensed (WA License HG-064180) and insured. We carry full liability insurance and offer additional valuation coverage options for your belongings.",
  },
  {
    question: "Do you move pianos and specialty items?",
    answer:
      "Yes, we have specialized equipment and trained crews for moving pianos, safes, antiques, and other specialty items. Please mention these items when getting your quote so we can plan appropriately.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve the entire Greater Seattle area including Seattle, Bellevue, Redmond, Kirkland, Issaquah, Bothell, Renton, Shoreline, Sammamish, Woodinville, Kenmore, Mercer Island, Lynnwood, Everett, and surrounding communities.",
  },
  {
    question: "Why are so many people moving out of Seattle?",
    answer:
      "Over the past few years, Seattle has seen a notable outflow of residents driven by a combination of economic and quality-of-life factors. Housing costs remain among the highest in the nation, with median home prices consistently pricing out middle-income families and young professionals. The city's high cost of living more broadly — from groceries to transportation — has pushed many households to explore more affordable alternatives both within Washington State and in neighboring states like Idaho and Oregon. Additionally, some residents and businesses have cited concerns about public safety, changes in the urban environment, and the lingering effects of the COVID-19 pandemic, which fundamentally shifted how people think about where they want to live and work. Remote work has played an enormous role in this shift as well. With major tech employers in the region — including Amazon and Microsoft — adopting flexible or hybrid work policies, many employees no longer feel tethered to Seattle proper. This has accelerated moves to surrounding communities like Bellevue, Kirkland, Redmond, and Issaquah, as well as to more distant locations where housing dollars stretch considerably further. Interestingly, not all of this movement represents people leaving the Pacific Northwest altogether — a significant portion are simply relocating within Western Washington to find a better balance of affordability and lifestyle. For those navigating these transitions, working with experienced local movers who understand the Seattle and Eastside areas can make the process considerably less stressful. Whether someone is downsizing within the city, relocating a household to the suburbs, or moving a business to a different part of the region, having a team familiar with local neighborhoods, traffic patterns, and building requirements — from Capitol Hill high-rises to Eastside residential communities — can be a genuine advantage during what is already a complex life change.",
  },
  {
    question: "What are red flags with moving companies?",
    answer:
      "When hiring a moving company, there are several warning signs to watch for that could indicate you're dealing with an unreliable or even fraudulent operation. One of the biggest red flags is a company that demands a large cash deposit upfront before any work begins, or one that gives you a suspiciously low estimate over the phone without conducting a proper in-home or virtual assessment of your belongings. Unusually low quotes can often signal that a company plans to tack on hidden fees later, sometimes even holding your belongings hostage until you pay inflated charges. You should also be wary of companies that lack proper licensing and insurance — in Washington State, legitimate movers are required to be licensed through the Washington Utilities and Transportation Commission (WUTC), so always verify credentials before signing anything. Other red flags include companies that have no verifiable physical address, use rented or unmarked trucks, or have employees who show up without uniforms or proper identification. A lack of online reviews, an absence of a professional website, or a pattern of unresolved complaints on the Better Business Bureau are also serious concerns. Additionally, if a company is vague about their claims process for damaged or lost items or refuses to provide a written contract, that should give you serious pause. Working with a fully licensed and insured moving company like On The Go Moving & Storage, which has over 15 years of experience serving the Seattle, Bellevue, Kirkland, and Redmond communities, helps eliminate these concerns. Before committing to any mover, always ask for proof of licensing, get everything in writing, and take the time to read reviews from real local customers to ensure you're making a safe and informed choice.",
  },
];
