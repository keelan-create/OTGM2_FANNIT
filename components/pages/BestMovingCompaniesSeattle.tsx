"use client";
import Link from "next/link";
import { CheckCircle, Star, AlertCircle, Info, DollarSign, Award } from "lucide-react";
import { useSEO, MOVING_COMPANY_SCHEMA, buildFAQSchema } from "@/hooks/useSEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const COMPANIES = [
  {
    rank: 1,
    name: "On The Go Moving & Storage",
    badge: "Best Overall, Editor's Pick",
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
      "Transparent hourly pricing, no hidden fees, no fuel surcharges",
      "Secure climate-controlled vault storage available",
      "Serves all 30+ Seattle neighborhoods and suburbs",
      "Licensed, insured, and BBB-accredited since 2009",
      "Same-day and next-day availability in most cases",
      "Dedicated crews, not day laborers or subcontractors",
    ],
    cons: [
      "Based in Redmond, travel time applies for far West Seattle moves",
      "Online booking fills up fast in summer peak season",
    ],
    description: `On The Go Moving & Storage has been serving the greater Seattle area since 2009 and has built one of the strongest reputations in the market, 393 five-star Google reviews, a 4.8-star average, and 25,000+ completed moves. What sets them apart for price shoppers is their fully transparent hourly pricing: you pay for the time the crew works, with no fuel surcharges, no stair fees, and no hidden add-ons. Every move includes Their crews are W-2 employees trained in-house, not gig workers pulled from a labor app, which is reflected in the consistency of their reviews. For most Seattle moves, On The Go is the best combination of price, reliability, and coverage.`,
    internalLinks: [
      { label: "Seattle Movers", href: "/" },
      { label: "Seattle Apartment Moving", href: "/seattle-apartment-moving/" },
      { label: "Seattle Packing Services", href: "/seattle-packing-services/" },
      { label: "Seattle Storage Services", href: "/seattle-storage-services/" },
      { label: "Seattle Senior Moving", href: "/seattle-senior-moving/" },
      { label: "Seattle Commercial Moving", href: "/seattle-commercial-moving/" },
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
      sameAs: ["https://share.google/kOvPFtNuCbovRUD7T"],
    },
  },
  {
    rank: 2,
    name: "Gentle Giant Moving Company",
    badge: "Best for White-Glove Service",
    badgeColor: "bg-blue-700 text-white",
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
      "National brand with strong local Seattle presence",
      "High hiring standards, crews are known for professionalism",
      "Excellent for long-distance and interstate moves",
      "Strong track record for fragile and high-value items",
    ],
    cons: [
      "Significantly higher hourly rate than most Seattle competitors",
      "3-hour labor minimum adds up quickly on small moves",
      "Less competitive for budget-conscious local moves",
    ],
    description: `Gentle Giant has been in business since 1980 and is consistently recommended by Seattle residents on Reddit and neighborhood forums for their professionalism and care. Their crews are well-trained and known for running, not walking, between loads. The tradeoff is price: at ~$243/hr for a three-person crew, they are among the most expensive options in Seattle. They are best suited for large homes, high-value items, or long-distance moves where the premium is justified. For a standard 1–2 bedroom local move, most price-conscious shoppers will find better value elsewhere.`,
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
      "Strong Yelp and Google presence with consistent reviews",
      "Eastside coverage including Bellevue, Kirkland, and Redmond",
      "Offers packing and storage services",
    ],
    cons: [
      "Some recent reviews (2026) cite billing disputes and overruns",
      "Pricing can vary significantly based on crew and date",
      "Less transparent pricing structure than hourly-only competitors",
    ],
    description: `Eco Movers has been a fixture in the Seattle moving market since 2008 and built a strong reputation on their eco-friendly approach, reusable plastic bins instead of cardboard boxes, and a commitment to reducing move waste. They have solid coverage across Seattle and the Eastside. However, recent Reddit threads and review sites have surfaced some billing concerns, with a few customers reporting final invoices significantly higher than initial estimates. As with any mover, get a detailed written estimate and confirm all potential add-on charges before booking.`,
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
      "Consistently recommended on Seattle Reddit for small/local moves",
      "No hidden fees, straightforward hourly billing",
      "Fast and efficient crews praised in reviews",
      "Good availability for last-minute bookings",
    ],
    cons: [
      "Pricing model changed in recent years, some long-time customers report higher rates",
      "Some reviewers note rates are now volume-based rather than hourly for larger moves",
      "Smaller operation, limited availability during peak summer months",
    ],
    description: `Adam's Moving is one of Seattle's most frequently recommended local movers on community forums and Reddit, particularly for smaller moves within the city. Their crews are praised for being fast, careful, and professional. One important note: their billing model has evolved, some customers report that for larger moves, they now quote based on truck volume rather than hourly rate, which can result in higher-than-expected invoices for some job types. Always confirm the billing method when getting a quote. For straightforward small-to-medium local moves, Adam's remains a solid choice.`,
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
    rank: 5,
    name: "Can't Stop Moving",
    badge: "Best for Online Booking Experience",
    badgeColor: "bg-purple-700 text-white",
    url: "https://www.cantstopmoving.com",
    phone: "N/A, book online",
    founded: "N/A",
    googleRating: 5.0,
    reviewCount: "100+",
    hourlyRate: "~$130–$170/hr (2-person crew)",
    threeHourMin: "~$390–$510",
    twoBedEstimate: "$550–$1,000",
    bestFor: "Seamless Online Booking",
    pros: [
      "5-star Google rating with consistently glowing reviews",
      "Easy online booking and instant estimates",
      "Friendly, efficient crews praised across platforms",
      "Competitive pricing for the Seattle market",
    ],
    cons: [
      "Smaller operation, limited crew availability",
      "Less established track record than older Seattle movers",
      "May not cover all suburban areas outside core Seattle",
    ],
    description: `Can't Stop Moving has earned a perfect 5-star Google rating and is increasingly recommended on Seattle forums for their smooth booking experience and reliable crews. They are particularly well-suited for renters and apartment dwellers who want a no-hassle, tech-forward booking process. Their pricing is competitive and their reviews are consistently positive. As a smaller operation, availability can be limited during the busy summer season, book early if your move date falls between May and September.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Can't Stop Moving",
      url: "https://www.cantstopmoving.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "100",
      },
    },
  },
  {
    rank: 6,
    name: "People Movers",
    badge: "Best for Eastside & Suburban Moves",
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
      "Strong coverage of Bothell, Kenmore, Kirkland, and Eastside suburbs",
      "Fully licensed with $2M business liability and cargo coverage",
      "Frequently praised for efficiency and professionalism",
      "Competitive pricing for suburban moves",
    ],
    cons: [
      "Less name recognition than larger Seattle movers",
      "Smaller fleet, limited availability for large or complex moves",
    ],
    description: `People Movers is a Bothell-based company with strong coverage across the Eastside suburbs, Kenmore, Kirkland, Bothell, Woodinville, and surrounding areas. They carry $2M in business liability and cargo coverage, which is above the industry minimum. Customers consistently praise their efficiency and professionalism. For moves centered on the Eastside rather than core Seattle, People Movers is worth getting a quote from alongside On The Go Moving.`,
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
    rank: 7,
    name: "Hansen Bros. Moving & Storage",
    badge: "Best for Long-Distance & Commercial",
    badgeColor: "bg-gray-700 text-white",
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
      "Established since 1890, one of Seattle's oldest movers",
      "Allied Van Lines agent, strong for long-distance and interstate moves",
      "Three locations: Seattle, Lynnwood, and Newcastle",
      "A+ BBB rating",
      "Full-service commercial and office relocation capabilities",
    ],
    cons: [
      "Among the most expensive options for local moves",
      "Some reviewers report high quotes for standard local jobs",
      "Better suited for large commercial or long-distance moves than small local ones",
    ],
    description: `Hansen Bros. has been moving Seattle families and businesses since 1890, making them one of the oldest and most established movers in the Pacific Northwest. As an Allied Van Lines agent, they are particularly strong for long-distance and interstate moves. For local moves, their pricing is on the higher end, several Reddit users have noted receiving quotes significantly above market rate for standard local jobs. Where Hansen Bros. shines is in large commercial relocations, office moves, and long-distance moves where their network and infrastructure provide real value.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Hansen Bros. Moving & Storage",
      url: "https://www.hansenbros.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
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
    rank: 8,
    name: "Kangaroo Movers",
    badge: "Best for Small Loads",
    badgeColor: "bg-yellow-600 text-white",
    url: "https://kangaroomovers.com",
    phone: "(206) 535-2424",
    founded: "N/A",
    googleRating: 4.4,
    reviewCount: "150+",
    hourlyRate: "~$110–$145/hr (2-person crew)",
    threeHourMin: "~$330–$435",
    twoBedEstimate: "$450–$850",
    bestFor: "Small Loads",
    pros: [
      "Lower hourly rate than most Seattle competitors",
      "Good for studio and 1-bedroom moves",
      "No hidden fees policy advertised",
    ],
    cons: [
      "Recent Reddit reports (2026) of significant billing overruns vs. estimates",
      "One widely-shared Reddit post described a $915 estimate becoming a $3,700 final bill",
      "Mixed reviews, quality appears inconsistent across crews",
    ],
    description: `Kangaroo Movers advertises competitive rates and a no-hidden-fees policy, and for small studio or 1-bedroom moves they can be cost-effective. However, a Reddit thread in r/Seattle documented a significant billing dispute, a $915 estimate that became a $3,700 final bill, which generated substantial community discussion. As with any mover, get a detailed written estimate that specifies all potential charges before booking, and confirm what triggers additional fees. If you go with Kangaroo, document your inventory thoroughly in writing before the move day.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Kangaroo Movers",
      url: "https://kangaroomovers.com",
      telephone: "+12065352424",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.4",
        reviewCount: "150",
      },
    },
  },
  {
    rank: 9,
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
      "National brand with local Seattle franchise presence",
      "Uniformed, background-checked crews",
      "Useful for downsizing, estate cleanouts, and decluttering moves",
    ],
    cons: [
      "Franchise model means quality can vary by location and crew",
      "Not the best choice for a straightforward local move without junk removal",
      "Pricing can be less transparent than hourly-only competitors",
    ],
    description: `College HUNKS is a national franchise that combines moving services with junk hauling, making them uniquely useful if you're downsizing, clearing out an estate, or need to dispose of furniture and appliances before or during your move. Their Seattle-area franchise has solid reviews and uniformed, background-checked crews. For a standard local move without junk removal needs, they are not the most cost-efficient option. But if you're combining a move with a cleanout, the ability to handle both in one booking is a genuine convenience that saves you from coordinating two separate vendors.`,
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
      "Less local knowledge than Seattle-native companies",
    ],
    description: `Bellhops is a tech-forward moving platform that offers upfront pricing, real-time crew tracking, and a smooth app-based booking experience. They operate nationwide and serve the Seattle market with competitive rates. The key tradeoff is their crew model: Bellhops uses independent contractors rather than W-2 employees, which means crew quality and experience can vary more than with a company like On The Go Moving that trains and employs its own crews. For tech-savvy renters who prioritize booking convenience and price transparency, Bellhops is worth considering. For moves involving high-value items or complex logistics, an employee-based local company is generally the safer choice.`,
    internalLinks: [],
    schema: {
      "@type": "LocalBusiness",
      name: "Bellhops Moving",
      url: "https://www.bellhops.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
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
  { size: "Studio / 1BR", hours: "2–3 hrs", otgm: "$230–$465", market: "$300–$600" },
  { size: "2 Bedroom", hours: "3–5 hrs", otgm: "$450–$900", market: "$600–$1,100" },
  { size: "3 Bedroom", hours: "5–8 hrs", otgm: "$750–$1,400", market: "$900–$1,800" },
  { size: "4+ Bedroom", hours: "7–12 hrs", otgm: "$1,050–$2,100", market: "$1,400–$3,000" },
];

const FAQS = [
  {
    q: "How much do movers cost in Seattle?",
    a: "Seattle moving costs range from $90–$250/hr depending on the company, crew size, and services. For a 2-bedroom local move, expect to pay $450–$1,100 with most reputable companies. On The Go Moving charges $115–$155/hr for a 2-person crew, below the Seattle market average of ~$182/hr.",
  },
  {
    q: "What is the cheapest time to move in Seattle?",
    a: "The cheapest time to move in Seattle is weekdays (Monday–Thursday) between October and April. Summer weekends (May–September) are peak season and often cost 20–30% more due to high demand. Booking at least 3–4 weeks in advance also helps you secure better rates.",
  },
  {
    q: "How do I avoid moving scams in Seattle?",
    a: "Always verify a mover's Washington State Utilities and Transportation Commission (UTC) license before booking. Get a written estimate that itemizes all potential charges. Be wary of unusually low quotes, some companies use low estimates to secure bookings, then inflate the final bill. On The Go Moving is UTC-licensed and provides transparent hourly pricing with no hidden fees.",
  },
  {
    q: "Do Seattle movers charge for stairs or elevators?",
    a: "Many Seattle movers add stair fees ($50–$150 per flight) or elevator fees. On The Go Moving does not charge stair or elevator fees, their hourly rate covers all standard move conditions. Always ask about these fees before booking any mover.",
  },
  {
    q: "How far in advance should I book movers in Seattle?",
    a: "For summer moves (May–September), book 3–6 weeks in advance. For fall/winter moves, 1–2 weeks is usually sufficient. On The Go Moving often has same-day or next-day availability outside of peak season.",
  },
  {
    q: "What should I look for when comparing Seattle moving companies?",
    a: "Check: (1) UTC license number, (2) Google/Yelp rating and review volume, (3) whether pricing is hourly or volume-based, (4) what's included in the rate (fuel, truck, blankets), (5) insurance coverage, and (6) whether crews are employees or subcontractors. On The Go Moving uses W-2 employee crews and includes truck, fuel, and moving blankets in their hourly rate.",
  },
];

export default function BestMovingCompaniesSeattle() {
  const pageTitle = "10 Best Moving Companies in Seattle, WA (2026), Honest Comparison";
  const pageDesc =
    "Compare the best moving companies in Seattle with real pricing, ratings, and honest pros & cons. Updated for 2026. On The Go Moving rated #1 for value and reliability.";

  const schemaItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Moving Companies in Seattle, WA",
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
      { "@type": "ListItem", position: 2, name: "Seattle Movers", item: "https://www.onthegomoving.com/seattle-movers/" },
      { "@type": "ListItem", position: 3, name: "Best Moving Companies Seattle", item: "https://www.onthegomoving.com/best-moving-companies-seattle/" },
    ],
  };

  useSEO({
    title: pageTitle,
    description: pageDesc,
    canonical: "/best-moving-companies-seattle/",
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
          <Link href="/" className="hover:text-[#75aa11]">Seattle Movers</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Best Moving Companies Seattle</span>
        </nav>

        {/* Hero */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#75aa11]/10 text-[#75aa11] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            <Award size={14} /> Updated May 2026
          </div>
          <h1 className="text-4xl font-extrabold text-[#1e3a0f] leading-tight mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            10 Best Moving Companies in Seattle, WA (2026)
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We researched and ranked the top Seattle moving companies based on real Google and Yelp ratings, transparent pricing, licensing, and what actual customers say on Reddit and review sites. Whether you're moving a studio apartment in Capitol Hill or a 4-bedroom home in Magnolia, this guide gives you the honest comparison you need to make the right call, and avoid the movers that have burned Seattle residents with surprise bills.
          </p>
          <div className="mt-6 p-4 bg-[#1e3a0f] text-white rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <p className="font-bold text-lg">Our #1 Pick: On The Go Moving & Storage</p>
              <p className="text-sm text-gray-300 mt-1">4.8 stars · 393 Google reviews · $115–$155/hr · No hidden fees · Vault storage available</p>
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
            Quick Comparison: Seattle Moving Companies at a Glance
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

        {/* Seattle pricing guide */}
        <section className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            How Much Do Movers Cost in Seattle? (2026 Pricing Guide)
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Seattle's average moving rate is approximately <strong>$182/hr</strong> for a standard 2-person crew, about 30% above the national average of $139/hr. This reflects the city's higher labor costs, traffic complexity, and the prevalence of apartment buildings with elevator and parking restrictions. Below are realistic cost ranges for common move sizes, comparing On The Go Moving's rates against the broader Seattle market.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-[#75aa11] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Home Size</th>
                  <th className="text-left px-4 py-3 font-semibold">Typical Hours</th>
                  <th className="text-left px-4 py-3 font-semibold">On The Go Moving</th>
                  <th className="text-left px-4 py-3 font-semibold">Seattle Market Avg</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE.map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium">{row.size}</td>
                    <td className="px-4 py-3">{row.hours}</td>
                    <td className="px-4 py-3 text-[#75aa11] font-semibold">{row.otgm}</td>
                    <td className="px-4 py-3">{row.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">On The Go Moving rates include truck, fuel, and moving blankets. No stair fees, no fuel surcharges. Market average based on Thumbtack, HireAHelper, and Extra Space Storage data.</p>
          <div className="mt-4">
            <Link href="/how-much-do-movers-cost/" className="text-[#75aa11] font-semibold text-sm hover:underline">
              → See our full Seattle moving cost guide with breakdown by neighborhood
            </Link>
          </div>
        </section>

        {/* Individual company profiles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Detailed Reviews: Best Seattle Moving Companies
          </h2>

          {COMPANIES.map((company) => (
            <div
              key={company.name}
              id={`company-${company.rank}`}
              className={`mb-8 rounded-xl overflow-hidden shadow-sm ${
                company.rank === 1
                  ? "border-2 border-[#75aa11] shadow-[#75aa11]/20 shadow-lg"
                  : "border border-gray-200"
              }`}
            >
              {/* Rank accent bar */}
              <div className={`h-1.5 w-full ${company.rank === 1 ? "bg-[#75aa11]" : "bg-gray-200"}`} />

              {/* Company header */}
              <div className={`px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4 ${
                company.rank === 1 ? "bg-[#1e3a0f]" : "bg-white"
              }`}>
                {/* Rank circle */}
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                  company.rank === 1 ? "bg-[#75aa11] text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  #{company.rank}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 className={`text-xl font-bold leading-tight ${
                      company.rank === 1 ? "text-white" : "text-[#1e3a0f]"
                    }`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {company.name}
                    </h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap mt-0.5 ${company.badgeColor}`}>
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
                      <span className={`ml-3 text-xs ${
                        company.rank === 1 ? "text-gray-400" : "text-gray-400"
                      }`}>Est. {company.founded}</span>
                    )}
                  </div>
                </div>

                <div className={`shrink-0 text-right sm:text-right ${
                  company.rank === 1 ? "" : ""
                }`}>
                  <p className={`text-xs uppercase tracking-wide font-semibold ${
                    company.rank === 1 ? "text-gray-400" : "text-gray-400"
                  }`}>2BR Estimate</p>
                  <p className={`font-black text-2xl mt-0.5 ${
                    company.rank === 1 ? "text-[#75aa11]" : "text-[#1e3a0f]"
                  }`}>{company.twoBedEstimate}</p>
                </div>
              </div>

              {/* Company body */}
              <div className="px-6 py-5">
                <p className="text-gray-700 text-sm leading-relaxed mb-5">{company.description}</p>

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
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">On The Go Moving Seattle Services</p>
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
                      className="flex-1 text-center bg-[#1e3a0f] text-white font-bold py-3 rounded-lg hover:bg-[#2a5214] transition-colors text-sm"
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
            How We Ranked These Seattle Movers
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            We evaluated each company across five criteria: <strong>pricing transparency</strong> (hourly vs. volume-based, hidden fees), <strong>verified ratings</strong> (Google, Yelp, Angi), <strong>licensing</strong> (Washington State UTC registration), <strong>insurance coverage</strong>, and <strong>real customer feedback</strong> from Reddit, community forums, and review aggregators. We did not accept payment or incentives from any company listed here.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            On The Go Moving ranked #1 because they combine the most transparent pricing structure in the Seattle market (true hourly billing with no add-on fees), the highest verified review volume among local independent movers (393 Google reviews), and the broadest service coverage across Seattle and all Eastside suburbs. Their crews are W-2 employees, not subcontractors, which directly correlates with the consistency of their reviews.
          </p>
        </section>

        {/* What to look for section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            What to Look for When Hiring Seattle Movers
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
                title: "Hourly vs. Volume Pricing",
                body: "Most Seattle movers charge hourly. Some (including a few on this list) have shifted to volume-based pricing for larger moves, which can result in higher-than-expected bills. Always confirm the billing method in writing before move day.",
              },
              {
                icon: <Info size={20} className="text-[#75aa11]" />,
                title: "What's Included in the Rate",
                body: "Ask specifically: Does the rate include the truck? Fuel? Moving blankets? Stair fees? Elevator fees? Long-carry fees? On The Go Moving includes truck, fuel, and blankets, no add-ons for standard conditions.",
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
            Frequently Asked Questions About Seattle Movers
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
            On The Go Moving, Seattle Service Pages
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            On The Go Moving serves all Seattle neighborhoods and surrounding cities. Explore our service-specific pages for detailed information, pricing, and neighborhood coverage.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: "Seattle Movers", href: "/" },
              { label: "Seattle Residential Moving", href: "/seattle-residential-moving/" },
              { label: "Seattle Apartment Moving", href: "/seattle-apartment-moving/" },
              { label: "Seattle Packing Services", href: "/seattle-packing-services/" },
              { label: "Seattle Storage Services", href: "/seattle-storage-services/" },
              { label: "Seattle Senior Moving", href: "/seattle-senior-moving/" },
              { label: "Seattle Commercial Moving", href: "/seattle-commercial-moving/" },
              { label: "Seattle Furniture Moving", href: "/seattle-furniture-moving/" },
              { label: "Seattle Appliance Moving", href: "/seattle-appliance-moving/" },
              { label: "Seattle Unpacking Services", href: "/seattle-unpacking-services/" },
              { label: "Seattle Office Movers", href: "/seattle-office-movers/" },
              { label: "Seattle Piano Movers", href: "/seattle-piano-movers/" },
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

        {/* Related comparison pages */}
        <section className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm font-bold text-[#1e3a0f] mb-3">Also Compare: Best Movers in Nearby Cities</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/best-moving-companies-bellevue/" className="text-sm bg-white border border-gray-200 text-[#1e3a0f] font-medium px-4 py-2 rounded-lg hover:border-[#75aa11] hover:text-[#75aa11] transition-colors">Best Moving Companies Bellevue →</Link>
            <Link href="/best-moving-companies-redmond/" className="text-sm bg-white border border-gray-200 text-[#1e3a0f] font-medium px-4 py-2 rounded-lg hover:border-[#75aa11] hover:text-[#75aa11] transition-colors">Best Moving Companies Redmond →</Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center p-8 bg-[#75aa11]/10 rounded-xl border border-[#75aa11]/20">
          <h2 className="text-2xl font-bold text-[#1e3a0f] mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Ready to Book Seattle's #1 Rated Mover?
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            On The Go Moving, 4.8 stars, 393 Google reviews, transparent hourly pricing, and secure vault storage available.
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
