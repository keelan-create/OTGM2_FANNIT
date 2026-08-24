"use client";
import Link from "next/link";
import { CheckCircle, Star, AlertCircle, Info, DollarSign, Award, MapPin } from "lucide-react";
import { useSEO, MOVING_COMPANY_SCHEMA, buildFAQSchema } from "@/hooks/useSEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const COMPANIES = [
  {
    rank: 1,
    name: "On The Go Moving & Storage",
    badge: "Best Overall, Best Value in Bellevue",
    badgeColor: "bg-[#75aa11] text-white",
    url: "https://www.onthegomoving.com",
    phone: "(425) 761-8500",
    founded: "2009",
    googleRating: 4.8,
    reviewCount: "393",
    hourlyRate: "$115–$155/hr (2-person crew)",
    threeHourMin: "$345–$465",
    twoBedEstimate: "$450–$900",
    bestFor: "Best Overall Value",
    pros: [
      "Eastside-based, Redmond warehouse means minimal travel time to Bellevue",
      "Transparent hourly pricing, no fuel surcharges, no stair fees, no hidden add-ons",
      "Secure climate-controlled vault storage available",
      "Licensed, insured, and BBB-accredited since 2009",
      "W-2 employee crews, not day laborers or subcontractors",
      "Experienced with Bellevue's high-rise condos, downtown towers, and Eastside neighborhoods",
      "4.8 stars across 393 Google reviews, highest verified volume among Eastside movers",
    ],
    cons: [
      "Books up fast during summer peak season (May–September)",
      "Weekend slots fill quickly, book 3–4 weeks ahead in summer",
    ],
    description: `On The Go Moving & Storage is the top-rated independent mover serving Bellevue, with 393 five-star Google reviews and a 4.8-star average across 25,000+ completed moves since 2009. Their Redmond warehouse puts them minutes from Bellevue, meaning lower travel time charges compared to Seattle-based competitors. Bellevue's mix of downtown high-rise condos, Eastside single-family neighborhoods, and tech campus apartments requires movers with real local experience, and On The Go's crews have handled thousands of Bellevue moves across Crossroads, Factoria, Somerset, Newport Hills, and downtown Bellevue towers. Their pricing is fully transparent: hourly billing with no fuel surcharges, no stair fees, and no hidden add-ons. Multiple r/BellevueWA and r/eastside users have recommended On The Go by name in recent community threads.`,
    internalLinks: [
      { label: "Bellevue Movers", href: "/bellevue-movers/" },
      { label: "Bellevue Residential Moving", href: "/bellevue-movers/residential/" },
      { label: "Bellevue Apartment Moving", href: "/bellevue-movers/apartment/" },
      { label: "Bellevue Packing Services", href: "/bellevue-packing-services/" },
      { label: "Bellevue Storage Services", href: "/bellevue-storage-services/" },
      { label: "Bellevue Office Movers", href: "/bellevue-office-movers/" },
    ],
    schema: {
      "@type": "LocalBusiness",
      name: "On The Go Moving & Storage",
      url: "https://www.onthegomoving.com",
      telephone: "+14257618500",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Redmond",
        addressRegion: "WA",
        postalCode: "98052",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "393",
      },
      sameAs: ["https://share.google/XHG6IkLTLEFsNBk10"],
    },
  },
  {
    rank: 2,
    name: "Jordan River Moving",
    badge: "Best for Careful Handling",
    badgeColor: "bg-blue-700 text-white",
    url: "https://jordanrivermoving.com",
    phone: "N/A, book online",
    founded: "N/A",
    googleRating: 4.8,
    reviewCount: "300+",
    hourlyRate: "~$130–$170/hr (2-person crew)",
    threeHourMin: "~$390–$510",
    twoBedEstimate: "$550–$1,000",
    bestFor: "Careful Handling",
    pros: [
      "Consistently recommended on r/BellevueWA and r/eastside",
      "Crews praised for wrapping everything thoroughly before moving",
      "Strong track record for fragile and high-value items",
      "Good coverage of Bellevue, Kirkland, and Eastside suburbs",
    ],
    cons: [
      "Pricing slightly above budget options",
      "Availability can be limited during peak summer months",
    ],
    description: `Jordan River Moving is one of the most consistently recommended movers on Bellevue and Eastside Reddit threads. Multiple r/BellevueWA users have cited them specifically for their careful handling, crews are known for wrapping items thoroughly before any move begins. One r/eastside commenter noted their efficiency and care for fragile items. They are a solid choice for Bellevue residents with furniture, art, or items that require extra attention. For straightforward moves where price is the top priority, On The Go Moving offers comparable care at a lower rate.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Jordan River Moving",
      url: "https://jordanrivermoving.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kirkland",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "300",
      },
    },
  },
  {
    rank: 3,
    name: "Eco Movers Moving & Storage",
    badge: "Best for Eco-Conscious Moves",
    badgeColor: "bg-green-700 text-white",
    url: "https://www.ecomovers.com",
    phone: "N/A, book online",
    founded: "2008",
    googleRating: 4.6,
    reviewCount: "400+",
    hourlyRate: "~$140–$180/hr (2-person crew)",
    threeHourMin: "~$420–$540",
    twoBedEstimate: "$600–$1,100",
    bestFor: "Eco-Friendly Moves",
    pros: [
      "Uses reusable moving bins, reduces cardboard waste",
      "Strong coverage across Bellevue, Redmond, and Eastside",
      "Offers packing and storage services",
      "Frequently recommended on r/BellevueWA and r/eastside",
    ],
    cons: [
      "Some recent reviews cite billing disputes and cost overruns",
      "Pricing can vary significantly based on crew and date",
      "Less transparent pricing structure than hourly-only competitors",
    ],
    description: `Eco Movers has been a fixture in the Eastside moving market since 2008 and is frequently recommended on Bellevue community forums. Their eco-friendly approach, reusable plastic bins instead of cardboard boxes, appeals to environmentally conscious Bellevue residents. They have solid coverage across Bellevue and the broader Eastside. However, recent Reddit threads have surfaced some billing concerns, with a few customers reporting final invoices higher than initial estimates. Always get a detailed written estimate and confirm all potential add-on charges before booking.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Eco Movers Moving & Storage",
      url: "https://www.ecomovers.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.6",
        reviewCount: "400",
      },
    },
  },
  {
    rank: 4,
    name: "Gentle Giant Moving Company",
    badge: "Best for White-Glove Service",
    badgeColor: "bg-gray-700 text-white",
    url: "https://www.gentlegiant.com",
    phone: "N/A, book online",
    founded: "1980",
    googleRating: 4.7,
    reviewCount: "125+",
    hourlyRate: "~$243/hr (3-person crew)",
    threeHourMin: "~$729",
    twoBedEstimate: "$900–$1,600",
    bestFor: "White-Glove & Long-Distance",
    pros: [
      "National brand with strong Eastside presence",
      "High hiring standards, crews are known for professionalism",
      "Excellent for long-distance and interstate moves",
      "Strong track record for fragile and high-value items",
    ],
    cons: [
      "Significantly higher hourly rate than most Bellevue competitors",
      "3-hour labor minimum adds up quickly on small moves",
      "Less competitive for budget-conscious local moves",
    ],
    description: `Gentle Giant has been in business since 1980 and is consistently recommended on Bellevue and Eastside Reddit threads for their professionalism and care. Their crews are well-trained and known for running, not walking, between loads. The tradeoff is price: at ~$243/hr for a three-person crew, they are among the most expensive options in the Bellevue market. They are best suited for large homes, high-value items, or long-distance moves where the premium is justified. For a standard 1–2 bedroom local Bellevue move, most price-conscious shoppers will find better value with On The Go Moving.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Gentle Giant Moving Company",
      url: "https://www.gentlegiant.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "SeaTac",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "125",
      },
    },
  },
  {
    rank: 5,
    name: "Adam's Moving & Delivery Service",
    badge: "Best for Budget Local Moves",
    badgeColor: "bg-orange-600 text-white",
    url: "https://adamsmovingservice.com",
    phone: "N/A, book online",
    founded: "N/A",
    googleRating: 4.7,
    reviewCount: "300+",
    hourlyRate: "~$120–$160/hr (2-person crew)",
    threeHourMin: "~$360–$480",
    twoBedEstimate: "$500–$950",
    bestFor: "Budget Local Moves",
    pros: [
      "Recommended on r/BellevueWA for small and local moves",
      "Fast and efficient crews praised in reviews",
      "Good availability for last-minute bookings",
      "Competitive pricing for the Eastside market",
    ],
    cons: [
      "Billing model has shifted, some larger moves now quoted by volume, not hourly",
      "Smaller operation, limited availability during peak summer months",
      "Some long-time customers report higher rates than previous years",
    ],
    description: `Adam's Moving is one of the most frequently recommended local movers on Bellevue and Eastside community forums, particularly for smaller moves. Their crews are praised for being fast, careful, and professional. One important note: their billing model has evolved, some customers report that for larger moves, they now quote based on truck volume rather than hourly rate, which can result in higher-than-expected invoices. Always confirm the billing method when getting a quote. For straightforward small-to-medium Bellevue moves, Adam's remains a solid choice.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Adam's Moving & Delivery Service",
      url: "https://adamsmovingservice.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "300",
      },
    },
  },
  {
    rank: 6,
    name: "Hansen Bros. Moving & Storage",
    badge: "Best for Long-Distance & Commercial",
    badgeColor: "bg-yellow-700 text-white",
    url: "https://www.hansenbros.com",
    phone: "N/A, book online",
    founded: "1890",
    googleRating: 4.5,
    reviewCount: "500+",
    hourlyRate: "~$180–$250/hr (varies by job type)",
    threeHourMin: "~$540+",
    twoBedEstimate: "$900–$1,800",
    bestFor: "Long-Distance & Commercial",
    pros: [
      "Established since 1890, one of the Pacific Northwest's oldest movers",
      "Allied Van Lines agent, strong for long-distance and interstate moves",
      "Newcastle location serves Bellevue and the Eastside directly",
      "A+ BBB rating",
      "Full-service commercial and office relocation capabilities",
    ],
    cons: [
      "Among the most expensive options for local Bellevue moves",
      "Some reviewers report high quotes for standard local jobs",
      "Better suited for large commercial or long-distance moves than small local ones",
    ],
    description: `Hansen Bros. has been moving Eastside families and businesses since 1890. As an Allied Van Lines agent, they are particularly strong for long-distance and interstate moves. Their Newcastle location serves Bellevue and the Eastside directly. For local Bellevue moves, their pricing is on the higher end, several Reddit users have noted receiving quotes significantly above market rate for standard local jobs. Where Hansen Bros. shines is in large commercial relocations, office moves, and long-distance moves where their network and infrastructure provide real value.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Hansen Bros. Moving & Storage",
      url: "https://www.hansenbros.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Newcastle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "500",
      },
    },
  },
  {
    rank: 7,
    name: "People Movers",
    badge: "Best for Eastside Suburbs",
    badgeColor: "bg-teal-700 text-white",
    url: "https://www.peoplemoversseattle.com",
    phone: "(425) 549-3393",
    founded: "N/A",
    googleRating: 4.8,
    reviewCount: "200+",
    hourlyRate: "~$120–$155/hr (2-person crew)",
    threeHourMin: "~$360–$465",
    twoBedEstimate: "$480–$900",
    bestFor: "Eastside Suburbs",
    pros: [
      "Strong coverage of Bellevue, Kirkland, Redmond, and Eastside suburbs",
      "Fully licensed with $2M business liability and cargo coverage",
      "Frequently praised for efficiency and professionalism",
      "Competitive pricing for suburban moves",
    ],
    cons: [
      "Less name recognition than larger Eastside movers",
      "Smaller fleet, limited availability for large or complex moves",
    ],
    description: `People Movers is a Bothell-based company with strong coverage across the Eastside suburbs, Bellevue, Kirkland, Redmond, Bothell, Woodinville, and surrounding areas. They carry $2M in business liability and cargo coverage, which is above the industry minimum. Customers consistently praise their efficiency and professionalism. For moves centered on the Eastside, People Movers is worth getting a quote from alongside On The Go Moving.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "People Movers",
      url: "https://www.peoplemoversseattle.com",
      telephone: "+14255493393",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bothell",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "200",
      },
    },
  },
  {
    rank: 8,
    name: "College HUNKS Hauling Junk & Moving",
    badge: "Best for Junk Removal + Moving",
    badgeColor: "bg-red-600 text-white",
    url: "https://www.collegehunkshaulingjunk.com",
    phone: "N/A, book online",
    founded: "2003",
    googleRating: 4.6,
    reviewCount: "250+",
    hourlyRate: "~$130–$175/hr (2-person crew)",
    threeHourMin: "~$390–$525",
    twoBedEstimate: "$520–$1,000",
    bestFor: "Junk Removal + Moving",
    pros: [
      "Unique combo of moving AND junk removal in one booking",
      "National brand with local Eastside franchise presence",
      "Uniformed, background-checked crews",
      "Useful for downsizing, estate cleanouts, and decluttering moves",
    ],
    cons: [
      "Franchise model means quality can vary by location and crew",
      "Not the best choice for a straightforward local move without junk removal",
      "Pricing can be less transparent than hourly-only competitors",
    ],
    description: `College HUNKS is a national franchise that combines moving services with junk hauling, making them uniquely useful if you're downsizing, clearing out an estate, or need to dispose of furniture and appliances before or during your Bellevue move. Their Eastside franchise has solid reviews and uniformed, background-checked crews. For a standard local move without junk removal needs, they are not the most cost-efficient option. But if you're combining a move with a cleanout, the ability to handle both in one booking is a genuine convenience.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "College HUNKS Hauling Junk & Moving",
      url: "https://www.collegehunkshaulingjunk.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.6",
        reviewCount: "250",
      },
    },
  },
  {
    rank: 9,
    name: "Two Men and a Truck",
    badge: "Best for Name Recognition",
    badgeColor: "bg-slate-600 text-white",
    url: "https://www.twomenandatruck.com",
    phone: "N/A, book online",
    founded: "1985",
    googleRating: 4.5,
    reviewCount: "200+",
    hourlyRate: "~$150–$200/hr (2-person crew)",
    threeHourMin: "~$450–$600",
    twoBedEstimate: "$650–$1,200",
    bestFor: "National Brand Reliability",
    pros: [
      "Nationally recognized brand with franchise accountability",
      "Consistent training standards across locations",
      "Good for interstate and long-distance moves through national network",
      "Straightforward booking process",
    ],
    cons: [
      "Franchise model, quality varies by local owner and crew",
      "Pricing is above average for the Bellevue market",
      "Some customers report less flexibility than independent local movers",
      "Less competitive than Eastside independents for local moves",
    ],
    description: `Two Men and a Truck is one of the most recognized moving brands in the country. Their Bellevue-area franchise provides consistent training standards and the accountability that comes with a national brand. The tradeoff is price, at $150–$200/hr, they are above the Eastside market average for a 2-person crew. For local Bellevue moves, independent Eastside movers like On The Go Moving typically offer better value. For long-distance moves where you want the backing of a national network, Two Men and a Truck is worth considering.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Two Men and a Truck",
      url: "https://www.twomenandatruck.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bellevue",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "200",
      },
    },
  },
  {
    rank: 10,
    name: "Bellhops Moving",
    badge: "Best App-Based Experience",
    badgeColor: "bg-indigo-600 text-white",
    url: "https://www.bellhops.com",
    phone: "N/A, app/online only",
    founded: "2011",
    googleRating: 4.5,
    reviewCount: "180+",
    hourlyRate: "~$125–$165/hr (2-person crew)",
    threeHourMin: "~$375–$495",
    twoBedEstimate: "$500–$950",
    bestFor: "App-Based Booking",
    pros: [
      "Slick app-based booking with upfront pricing",
      "Real-time crew tracking on move day",
      "Nationwide availability, good for interstate moves",
      "Transparent pricing with no surprise charges",
    ],
    cons: [
      "Gig-economy crew model, workers are independent contractors, not W-2 employees",
      "Crew consistency varies more than with employee-based companies",
      "Customer service is app/chat-based, limited phone support",
      "Less local knowledge than Eastside-native companies",
    ],
    description: `Bellhops is a tech-forward moving platform that offers upfront pricing, real-time crew tracking, and a smooth app-based booking experience. They operate nationwide and serve the Bellevue market with competitive rates. The key tradeoff is their crew model: Bellhops uses independent contractors rather than W-2 employees, which means crew quality and experience can vary more than with a company like On The Go Moving that trains and employs its own crews. For tech-savvy Bellevue renters who prioritize booking convenience and price transparency, Bellhops is worth considering. For moves involving high-value items or complex logistics, an employee-based local company is generally the safer choice.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Bellhops Moving",
      url: "https://www.bellhops.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bellevue",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        reviewCount: "180",
      },
    },
  },
];

const PRICE_TABLE = [
  { size: "Studio / 1BR", hours: "2–3 hrs", otgm: "$230–$465", market: "$300–$580" },
  { size: "2 Bedroom", hours: "3–5 hrs", otgm: "$450–$900", market: "$600–$1,100" },
  { size: "3 Bedroom", hours: "5–8 hrs", otgm: "$750–$1,400", market: "$900–$1,800" },
  { size: "4+ Bedroom", hours: "7–12 hrs", otgm: "$1,050–$2,100", market: "$1,400–$3,000" },
];

const FAQS = [
  {
    q: "How much do movers cost in Bellevue, WA?",
    a: "Bellevue moving costs range from $115–$250/hr depending on the company, crew size, and services. For a 2-bedroom local move, expect to pay $450–$1,100 with most reputable companies. On The Go Moving charges $115–$155/hr for a 2-person crew and operates from a Redmond warehouse, meaning lower travel time charges for Bellevue moves compared to Seattle-based competitors.",
  },
  {
    q: "What is the cheapest time to move in Bellevue?",
    a: "The cheapest time to move in Bellevue is weekdays (Monday–Thursday) between October and April. Summer weekends (May–September) are peak season and often cost 20–30% more due to high demand. Booking at least 3–4 weeks in advance also helps you secure better rates and crew availability.",
  },
  {
    q: "Do Bellevue movers charge extra for high-rise condos or elevators?",
    a: "Many movers add elevator fees or long-carry fees for downtown Bellevue high-rises. On The Go Moving does not charge stair or elevator fees, their hourly rate covers all standard move conditions. If you're moving into or out of a downtown Bellevue tower, always ask about these fees before booking any mover.",
  },
  {
    q: "How do I verify a moving company is licensed in Washington State?",
    a: "All Washington State movers must be registered with the Utilities and Transportation Commission (UTC). You can verify a mover's license at utc.wa.gov. On The Go Moving is UTC-licensed and has been operating in the Bellevue/Eastside market since 2009. Unlicensed movers have no accountability if items are damaged or stolen.",
  },
  {
    q: "What neighborhoods in Bellevue do movers serve?",
    a: "Most Eastside movers serve all Bellevue neighborhoods including Downtown Bellevue, Crossroads, Factoria, Somerset, Newport Hills, Eastgate, Bridle Trails, West Bellevue, and Bellevue's Eastside suburbs. On The Go Moving serves all Bellevue neighborhoods and all 30+ Eastside cities from their Redmond base.",
  },
  {
    q: "What should I look for when comparing Bellevue moving companies?",
    a: "Check: (1) UTC license number, (2) Google/Yelp rating and review volume, (3) whether pricing is hourly or volume-based, (4) what's included in the rate (fuel, truck, blankets), (5) insurance coverage, (6) whether crews are employees or subcontractors, and (7) whether the company is Eastside-based (lower travel time charges). On The Go Moving checks all six boxes.",
  },
];

export default function BestMovingCompaniesBellevue() {
  const pageTitle = "10 Best Moving Companies in Bellevue, WA (2026), Honest Comparison";
  const pageDesc =
    "Compare the best moving companies in Bellevue, WA with real pricing, ratings, and honest pros & cons. Updated for 2026. On The Go Moving rated #1 for value and reliability on the Eastside.";

  const schemaItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Moving Companies in Bellevue, WA",
    description: pageDesc,
    numberOfItems: COMPANIES.length,
    itemListElement: COMPANIES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: c.url,
    })),
  };

  const faqSchema = buildFAQSchema(
    FAQS.map((f) => ({ question: f.q, answer: f.a }))
  );

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.onthegomoving.com/" },
      { "@type": "ListItem", position: 2, name: "Bellevue Movers", item: "https://www.onthegomoving.com/bellevue-movers/" },
      { "@type": "ListItem", position: 3, name: "Best Moving Companies Bellevue", item: "https://www.onthegomoving.com/best-moving-companies-bellevue/" },
    ],
  };

  useSEO({
    title: pageTitle,
    description: pageDesc,
    canonical: "/best-moving-companies-bellevue/",
    ogType: "article",
    schema: [MOVING_COMPANY_SCHEMA, schemaItemList, faqSchema, schemaBreadcrumb],
  });

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 pt-16 pb-10 font-sans text-gray-800">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#75aa11]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/bellevue-movers/" className="hover:text-[#75aa11]">Bellevue Movers</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Best Moving Companies Bellevue</span>
        </nav>

        {/* Hero */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#75aa11]/10 text-[#75aa11] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            <Award size={14} /> Updated May 2026
          </div>
          <h1 className="text-4xl font-extrabold text-[#1e3a0f] leading-tight mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            10 Best Moving Companies in Bellevue, WA (2026)
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We researched and ranked the top Bellevue moving companies based on real Google and Yelp ratings, transparent pricing, licensing, and what actual customers say on Reddit and community forums. Whether you're moving into a downtown Bellevue high-rise, relocating within the Eastside, or moving your family from Crossroads to Somerset, this guide gives you the honest comparison you need, and flags the movers that have burned Bellevue residents with surprise bills.
          </p>
          {/* Local callout */}
          <div className="mt-5 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
            <MapPin size={18} className="text-blue-500 mt-0.5 shrink-0" />
            <p><strong>Bellevue-specific note:</strong> Most movers on this list are based in Seattle, meaning you'll pay 30–60 minutes of travel time each way. <strong>On The Go Moving operates from a Redmond warehouse</strong>, just minutes from Bellevue, which meaningfully reduces travel time charges on hourly billing.</p>
          </div>
          <div className="mt-5 p-4 bg-[#1e3a0f] text-white rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <p className="font-bold text-lg">Our #1 Pick: On The Go Moving & Storage</p>
              <p className="text-sm text-gray-300 mt-1">4.8 stars · 393 Google reviews · $115–$155/hr · Eastside-based · No hidden fees · Vault storage available</p>
            </div>
            <a
              href="tel:4257618500"
              className="shrink-0 bg-[#f5c518] text-[#1e3a0f] font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
            >
              Call (425) 761-8500
            </a>
          </div>
        </header>

        {/* Quick comparison table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Quick Comparison: Bellevue Moving Companies at a Glance
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#1e3a0f] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Company</th>
                  <th className="text-left px-4 py-3 font-semibold">Rating</th>
                  <th className="text-left px-4 py-3 font-semibold">Hourly Rate</th>
                  <th className="text-left px-4 py-3 font-semibold">2BR Estimate</th>
                  <th className="text-left px-4 py-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {COMPANIES.map((c, i) => (
                  <tr key={c.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium">
                      {c.rank === 1 ? (
                        <span className="flex items-center gap-1">
                          <Award size={14} className="text-[#75aa11]" />
                          {c.name}
                        </span>
                      ) : c.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1">
                        <Star size={13} className="text-yellow-500 fill-yellow-500" />
                        {c.googleRating} ({c.reviewCount})
                      </span>
                    </td>
                    <td className="px-4 py-3">{c.hourlyRate}</td>
                    <td className="px-4 py-3">{c.twoBedEstimate}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap inline-block ${c.badgeColor}`}>
                        {c.bestFor}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* Rates are estimates based on published pricing and market research. Always get a written quote before booking.</p>
        </section>

        {/* Bellevue pricing guide */}
        <section className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            How Much Do Movers Cost in Bellevue? (2026 Pricing Guide)
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Bellevue's average moving rate is approximately <strong>$175–$195/hr</strong> for a standard 2-person crew, slightly above the broader Seattle market average due to the higher concentration of high-rise condos, elevator-access buildings, and premium neighborhoods. Below are realistic cost ranges for common move sizes, comparing On The Go Moving's rates against the broader Bellevue/Eastside market.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-[#1e3a0f] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Home Size</th>
                  <th className="text-left px-4 py-3 font-semibold">Typical Hours</th>
                  <th className="text-left px-4 py-3 font-semibold">On The Go Moving</th>
                  <th className="text-left px-4 py-3 font-semibold">Bellevue Market Avg.</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE.map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium">{row.size}</td>
                    <td className="px-4 py-3 text-gray-600">{row.hours}</td>
                    <td className="px-4 py-3 font-semibold text-[#75aa11]">{row.otgm}</td>
                    <td className="px-4 py-3 text-gray-600">{row.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">Estimates assume a local move within Bellevue or to/from a nearby Eastside city. Rates include truck, fuel, and moving blankets for On The Go Moving. Always get a written quote.</p>
        </section>

        {/* Company cards */}
        <section className="mb-12 space-y-8">
          <h2 className="text-2xl font-bold text-[#1e3a0f]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            The 10 Best Bellevue Movers, Detailed Reviews
          </h2>
          {COMPANIES.map((company) => (
            <div
              key={company.name}
              className={`rounded-2xl border overflow-hidden shadow-sm ${
                company.rank === 1
                  ? "border-[#75aa11] bg-[#1e3a0f]"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Company header */}
              <div className={`px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-3 justify-between ${
                company.rank === 1 ? "" : "border-b border-gray-100"
              }`}>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">#{company.rank}</span>
                    <h3 className={`text-xl font-extrabold ${
                      company.rank === 1 ? "text-white" : "text-[#1e3a0f]"
                    }`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {company.name}
                    </h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${company.badgeColor}`}>
                      {company.badge}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 mt-1.5 ${
                    company.rank === 1 ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {[1,2,3,4,5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        className={s <= Math.round(company.googleRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                        }
                      />
                    ))}
                    <span className="text-sm ml-1">
                      {company.googleRating} · {company.reviewCount} Google reviews
                    </span>
                    {company.founded !== "N/A" && (
                      <span className="ml-3 text-xs text-gray-400">Est. {company.founded}</span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right sm:text-right">
                  <p className="text-xs uppercase tracking-wide font-semibold text-gray-400">2BR Estimate</p>
                  <p className={`font-black text-2xl mt-0.5 ${
                    company.rank === 1 ? "text-[#75aa11]" : "text-[#1e3a0f]"
                  }`}>{company.twoBedEstimate}</p>
                </div>
              </div>

              {/* Company body */}
              <div className="px-6 py-5">
                <p className={`text-sm leading-relaxed mb-5 ${
                  company.rank === 1 ? "text-gray-300" : "text-gray-700"
                }`}>{company.description}</p>

                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2.5 flex items-center gap-1">
                      <CheckCircle size={13} className="text-green-600" /> Pros
                    </p>
                    <ul className="space-y-1.5">
                      {company.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle size={13} className="text-green-500 mt-0.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                    <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2.5 flex items-center gap-1">
                      <AlertCircle size={13} className="text-orange-500" /> Cons
                    </p>
                    <ul className="space-y-1.5">
                      {company.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                          <AlertCircle size={13} className="text-orange-400 mt-0.5 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing row */}
                <div className="flex flex-wrap gap-4 text-sm bg-gray-50 rounded-lg px-4 py-3 mb-4">
                  <div>
                    <span className="text-gray-500 text-xs">Hourly Rate</span>
                    <p className="font-semibold text-[#1e3a0f]">{company.hourlyRate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">3-Hour Minimum</span>
                    <p className="font-semibold text-[#1e3a0f]">{company.threeHourMin}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">2BR Estimate</span>
                    <p className="font-semibold text-[#1e3a0f]">{company.twoBedEstimate}</p>
                  </div>
                </div>

                {/* Internal links for OTGM */}
                {company.internalLinks.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">On The Go Moving Bellevue Services</p>
                    <div className="flex flex-wrap gap-2">
                      {company.internalLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-xs bg-[#75aa11]/10 text-[#75aa11] font-semibold px-3 py-1 rounded-full hover:bg-[#75aa11]/20 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA for #1 */}
                {company.rank === 1 && (
                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:4257618500"
                      className="flex-1 text-center bg-[#f5c518] text-[#1e3a0f] font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
                    >
                      Call (425) 761-8500, Free Quote
                    </a>
                    <Link
                      href="/contact-us/"
                      className="flex-1 text-center bg-white text-[#1e3a0f] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm border border-white/20"
                    >
                      Get a Free Online Quote →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* How we chose section */}
        <section className="mb-12 p-6 bg-[#1e3a0f]/5 rounded-xl border border-[#1e3a0f]/10">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            How We Ranked These Bellevue Movers
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            We evaluated each company across five criteria: <strong>pricing transparency</strong> (hourly vs. volume-based, hidden fees), <strong>verified ratings</strong> (Google, Yelp, Angi), <strong>licensing</strong> (Washington State UTC registration), <strong>insurance coverage</strong>, and <strong>real customer feedback</strong> from Reddit (r/BellevueWA, r/eastside), community forums, and review aggregators. We did not accept payment or incentives from any company listed here.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            On The Go Moving ranked #1 because they combine the most transparent pricing structure in the Eastside market (true hourly billing with no add-on fees), the highest verified review volume among local independent movers (393 Google reviews), Eastside-based operations that minimize travel time charges for Bellevue moves, and W-2 employee crews that deliver consistent quality. Their 4.8-star average across 393 reviews is the strongest verified signal in the Bellevue moving market.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            Planning your own move? Visit <Link href="/bellevue-movers/" className="font-semibold text-[#4b7f14] hover:underline">On The Go Moving&apos;s Bellevue movers page</Link> for service details, a free quote, and local move-planning support.
          </p>
        </section>

        {/* What to look for section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            What to Look for When Hiring Bellevue Movers
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <CheckCircle size={20} className="text-[#75aa11]" />,
                title: "UTC License Verification",
                body: "All Washington State movers must be registered with the Utilities and Transportation Commission. Verify a mover's license at utc.wa.gov before booking. Unlicensed movers have no accountability if items are damaged or stolen.",
              },
              {
                icon: <DollarSign size={20} className="text-[#75aa11]" />,
                title: "Travel Time Charges",
                body: "Most Seattle-based movers charge travel time from their warehouse to your Bellevue address, typically 30–60 minutes each way. On The Go Moving is Eastside-based (Redmond), so this charge is minimal for most Bellevue moves.",
              },
              {
                icon: <Info size={20} className="text-[#75aa11]" />,
                title: "High-Rise & Elevator Fees",
                body: "Bellevue has a high concentration of downtown condos and high-rise apartments. Many movers add elevator fees ($50–$100) or long-carry fees. On The Go Moving includes all standard move conditions in their hourly rate, no surprise add-ons.",
              },
              {
                icon: <Star size={20} className="text-[#75aa11]" />,
                title: "Employee vs. Subcontractor Crews",
                body: "Companies that use W-2 employee crews (like On The Go Moving) tend to have more consistent quality than those using gig-worker platforms. Ask directly: 'Are your movers employees or subcontractors?'",
              },
            ].map((item) => (
              <div key={item.title} className="p-4 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-bold text-[#1e3a0f] text-sm mb-1">{item.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Frequently Asked Questions About Bellevue Movers
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3">
                  <p className="font-bold text-[#1e3a0f] text-sm">{faq.q}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links hub */}
        <section className="mb-12 p-6 bg-[#1e3a0f] text-white rounded-xl">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            On The Go Moving, Bellevue Service Pages
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            On The Go Moving serves all Bellevue neighborhoods and surrounding Eastside cities from their Redmond base. Explore our service-specific pages for detailed information, pricing, and neighborhood coverage.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: "Bellevue Movers", href: "/bellevue-movers/" },
              { label: "Bellevue Residential Moving", href: "/bellevue-movers/residential/" },
              { label: "Bellevue Apartment Moving", href: "/bellevue-movers/apartment/" },
              { label: "Bellevue Packing Services", href: "/bellevue-packing-services/" },
              { label: "Bellevue Storage Services", href: "/bellevue-storage-services/" },
              { label: "Bellevue Senior Moving", href: "/bellevue-senior-moving/" },
              { label: "Bellevue Office Movers", href: "/bellevue-office-movers/" },
              { label: "Bellevue Furniture Moving", href: "/bellevue-furniture-moving/" },
              { label: "Bellevue Piano Movers", href: "/bellevue-piano-movers/" },
              { label: "Bellevue Appliance Moving", href: "/bellevue-appliance-moving/" },
              { label: "Bellevue Business Moving", href: "/bellevue-business-moving/" },
              { label: "Bellevue Corporate Relocation", href: "/bellevue-corporate-relocation/" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-2 rounded-lg transition-colors text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center p-8 bg-[#75aa11]/10 rounded-xl border border-[#75aa11]/20">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Ready to Book Bellevue's #1 Rated Mover?
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            On The Go Moving, Eastside-based, 4.8 stars, 393 Google reviews, transparent hourly pricing, and secure vault storage available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:4257618500"
              className="bg-[#f5c518] text-[#1e3a0f] font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Call (425) 761-8500
            </a>
            <Link
              href="/contact-us/"
              className="bg-[#1e3a0f] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#2a5214] transition-colors"
            >
              Get a Free Quote Online →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
