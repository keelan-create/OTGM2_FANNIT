"use client";
// =============================================================================
// JasonSexton.tsx — Founder & Owner Author / EEAT Page
// URL: /jason-sexton/
//
// PURPOSE:
//   - Establish E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
//     for Jason Sexton as the founder, owner, and subject-matter expert behind
//     On The Go Moving & Storage.
//   - Provides a Person schema entity that Google can associate with authored content.
//   - Signals that a real, named human with 15+ years of hands-on moving experience
//     stands behind every piece of advice and every service offered on this site.
//
// SCHEMA: Person + LocalBusiness (nested)
// INTERNAL LINKS: About Us, Blog, Contact Us
// =============================================================================
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/siteData";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { useSEO, MOVING_COMPANY_SCHEMA } from "@/hooks/useSEO";
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  Users,
  Shield,
  Truck,
} from "lucide-react";

const CREDENTIALS = [
  {
    icon: Briefcase,
    title: "15+ Years in the Moving Industry",
    desc: "Jason founded On The Go Moving & Storage in 2009 at age 26 and has been hands-on in every aspect of the business, from driving trucks in the early years to building the operations and culture that define the company today.",
  },
  {
    icon: Truck,
    title: "25,000+ Moves Completed",
    desc: "Under Jason's leadership, On The Go Moving has completed more than 25,000 residential and commercial moves across the Greater Seattle area, making the company one of the most experienced local movers in the Pacific Northwest.",
  },
  {
    icon: Shield,
    title: "Licensed & Insured, HG-064180 / USDOT 2120054",
    desc: "Jason holds all required Washington State moving company licenses and federal USDOT registration. He maintains full general liability and cargo insurance on every move.",
  },
  {
    icon: Star,
    title: "4.8-Star Google Rating, 393 Reviews",
    desc: "Jason's commitment to flat-rate pricing, on-time performance, and professional crews has earned On The Go Moving a 4.8-star average across more than 393 verified Google reviews.",
  },
  {
    icon: Award,
    title: "Angie's List Super Service Award",
    desc: "Recognized multiple times for exceptional service quality and customer satisfaction by Angie's List, one of the most trusted home services review platforms in the United States.",
  },
  {
    icon: Users,
    title: "Local Eastside Business Owner",
    desc: "Jason is a Redmond, WA resident and active member of the Eastside business community. On The Go Moving is locally owned and operated, not a franchise or broker, and Jason is personally invested in the communities the company serves.",
  },
];

const TIMELINE = [
  {
    year: "2009",
    event:
      "Founded On The Go Moving & Storage in Redmond, WA at age 26 with one truck, two crew members, and a belief that Seattle deserved a moving company that actually showed up on time and charged what it quoted.",
  },
  {
    year: "2012",
    event:
      "Expanded to a fleet of 5 trucks and opened the first dedicated storage facility in Redmond. Hired the first full-time operations coordinator to support growing demand.",
  },
  {
    year: "2015",
    event:
      "Surpassed 5,000 successful moves. Earned the Angie's List Super Service Award for the first time, a recognition Jason considers a direct reflection of his crew's daily work.",
  },
  {
    year: "2018",
    event:
      "Launched a dedicated commercial moving division to serve Eastside tech campuses, office parks, and small businesses. Expanded the fleet to 10 trucks.",
  },
  {
    year: "2021",
    event:
      "Reached 1,000 Google reviews with a 4.8-star average. Expanded to 12 trucks and added a second storage vault facility to handle increased demand.",
  },
  {
    year: "2024",
    event:
      "Over 25,000 moves completed. 393 five-star Google reviews and counting. Jason remains active in daily operations, customer escalations, and team development.",
  },
];

const FAQS = [
  {
    q: "Who is Jason Sexton?",
    a: "Jason Sexton is the founder and owner of On The Go Moving & Storage, a licensed and insured moving company based in Redmond, WA. He started the company in 2009 and has been actively involved in operations, hiring, and customer service for over 15 years.",
  },
  {
    q: "How long has Jason Sexton been in the moving industry?",
    a: "Jason has been in the moving industry since 2009, over 15 years. He started On The Go Moving at age 26 and has personally overseen more than 25,000 residential and commercial moves across the Greater Seattle area.",
  },
  {
    q: "Is Jason Sexton involved in day-to-day operations?",
    a: "Yes. Jason remains actively involved in daily operations, including crew hiring and training, customer escalation resolution, pricing decisions, and community partnerships. He is not an absentee owner.",
  },
  {
    q: "What licenses does Jason Sexton hold?",
    a: "On The Go Moving & Storage holds Washington State moving company license HG-064180 and federal USDOT number 2120054 under Jason's ownership. The company carries full general liability and cargo insurance on every move.",
  },
  {
    q: "How can I contact Jason Sexton or On The Go Moving?",
    a: "You can reach On The Go Moving & Storage by phone at (425) 761-8500 or by email at booking@onthegomoving.com. The office is located at 16625 Redmond Way #M365, Redmond, WA 98052.",
  },
];

export default function JasonSexton() {
  useSEO({
    title: "Jason Sexton, Founder & Owner | On The Go Moving & Storage",
    description:
      "Meet Jason Sexton, founder and owner of On The Go Moving & Storage since 2009. 15+ years of experience, 25,000+ moves completed, licensed & insured in Washington State.",
    canonical: "https://onthegomoving.com/jason-sexton/",
    ogType: "profile",
    ogImage: BRAND_IMAGES.jasonSextonHeadshot,
    schema: [
      MOVING_COMPANY_SCHEMA,
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://onthegomoving.com/jason-sexton/#person",
        name: "Jason Sexton",
        jobTitle: "Founder & Owner",
        description:
          "Jason Sexton is the founder and owner of On The Go Moving & Storage, a licensed and insured moving company based in Redmond, WA. He has been in the moving industry since 2009 and has overseen more than 25,000 residential and commercial moves across the Greater Seattle area.",
        url: "https://onthegomoving.com/jason-sexton/",
        image: BRAND_IMAGES.jasonSextonHeadshot,
        worksFor: {
          "@type": "LocalBusiness",
          "@id": "https://onthegomoving.com/#organization",
          name: "On The Go Moving & Storage",
          url: "https://onthegomoving.com",
          telephone: "+14257618500",
          address: {
            "@type": "PostalAddress",
            streetAddress: "16625 Redmond Way #M365",
            addressLocality: "Redmond",
            addressRegion: "WA",
            postalCode: "98052",
            addressCountry: "US",
          },
        },
        knowsAbout: [
          "Residential Moving",
          "Commercial Moving",
          "Packing Services",
          "Storage Services",
          "Moving Company Operations",
          "Seattle Moving",
          "Eastside Washington Moving",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "Washington State Moving Company License HG-064180",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "USDOT Number 2120054",
          },
        ],
        sameAs: [
          "https://www.facebook.com/onthegomoving",
          "https://www.instagram.com/onthegomoving",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main className="flex-1 pt-[96px]">
      {/* ── Hero ── */}
      <section className="bg-[#1a2332] text-white pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#7bc144] shadow-xl">
                <img
                  src={BRAND_IMAGES.jasonSextonHeadshot}
                  alt="Jason Sexton, Founder and Owner of On The Go Moving & Storage"
                  className="w-full h-full object-cover object-top"
                  width={224}
                  height={224}
                />
              </div>
            </div>

            {/* Bio intro */}
            <div>
              <p className="text-[#7bc144] font-semibold text-sm uppercase tracking-widest mb-2">
                Founder &amp; Owner
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
                Jason Sexton
              </h1>
              <p className="text-lg text-gray-300 mb-4 max-w-xl">
                Jason founded On The Go Moving &amp; Storage in Redmond, WA in 2009 with one truck
                and a straightforward belief: Seattle deserved a moving company that showed up on
                time, charged what it quoted, and treated every customer's belongings with care.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#7bc144]" />
                  Redmond, WA
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#7bc144]" />
                  In the industry since 2009
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#7bc144]" />
                  25,000+ moves completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick-answer summary ── */}
      <section className="bg-[#f5f7fa] border-b border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 text-base leading-relaxed max-w-3xl">
            <strong>Jason Sexton</strong> is the founder and owner of{" "}
            <a href="/about-us/" className="text-[#1a6b2f] underline hover:no-underline">
              On The Go Moving &amp; Storage
            </a>
            , a licensed (HG-064180) and insured moving company headquartered in Redmond, WA. He has
            been actively running the company since 2009, personally overseeing more than 25,000
            residential and commercial moves across the Greater Seattle and Eastside area. Jason is
            the author of moving guides and service content published on this site.
          </p>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1a2332] mb-2">
            Experience &amp; Credentials
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Jason's authority in the moving industry is built on 15+ years of direct, hands-on
            experience, not just ownership.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CREDENTIALS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#e8f5e9] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#1a6b2f]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a2332] mb-1 text-sm">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 bg-[#f5f7fa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1a2332] mb-2">
            Building On The Go Moving, A 15-Year Timeline
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            From a single truck in 2009 to one of the most-reviewed moving companies in the Pacific
            Northwest.
          </p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#7bc144] hidden md:block" />
            <div className="space-y-8">
              {TIMELINE.map(({ year, event }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a2332] text-white flex items-center justify-center font-bold text-xs z-10 relative">
                    {year.slice(2)}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="font-bold text-[#1a6b2f] text-sm mb-0.5">{year}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1a2332] mb-4">
                Jason's Philosophy on Moving
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Moving is one of the most stressful events in a person's life. Our job isn't just
                to move boxes, it's to take that stress off your plate entirely. That means showing
                up on time, communicating clearly, protecting your belongings as if they were our
                own, and charging exactly what we quoted. No surprises."
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Jason built On The Go Moving on three non-negotiables: flat-rate pricing, direct
                employee crews (no day laborers or subcontractors), and a genuine commitment to
                showing up on time. Those principles haven't changed since 2009.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every piece of content on this site, from service descriptions to moving guides -
                reflects Jason's direct experience and the standards he holds his team to every day.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={BRAND_IMAGES.customerHandshake}
                alt="Jason Sexton and On The Go Moving crew with a satisfied customer"
                className="w-full h-72 object-cover"
                width={600}
                height={288}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Content authored by Jason ── */}
      <section className="py-16 bg-[#f5f7fa]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1a2332] mb-2">
            Content &amp; Expertise
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Jason contributes directly to the moving guides, service pages, and FAQ content
            published on this site. His expertise covers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Residential Moving in Seattle",
              "Commercial & Office Relocation",
              "Packing Best Practices",
              "Storage Solutions",
              "Moving Cost Estimates",
              "Senior Moving",
              "Apartment Moving",
              "Piano & Specialty Moving",
              "Moving Checklists & Timelines",
            ].map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 border border-gray-100 shadow-sm text-sm text-gray-700"
              >
                <CheckCircle className="w-4 h-4 text-[#1a6b2f] flex-shrink-0" />
                {topic}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/blog/"
              className="inline-flex items-center gap-2 bg-[#1a2332] text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-[#243040] transition-colors"
            >
              Read Moving Guides &amp; Tips
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/how-much-do-movers-cost/"
              className="inline-flex items-center gap-2 border border-[#1a2332] text-[#1a2332] px-5 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Moving Cost Guide
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[#1a2332] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border-b border-gray-100 pb-6">
                <h3 className="font-bold text-[#1a2332] mb-2">{q}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1a2332] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-3">
            Ready to Move with On The Go Moving?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Get a free, flat-rate quote from the team Jason built. No hidden fees, no hourly
            surprises, just professional movers who show up on time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact-us/"
              className="inline-flex items-center gap-2 bg-[#7bc144] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#6aad38] transition-colors"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {COMPANY.phone}
            </a>
          </div>
          <p className="mt-6 text-gray-400 text-sm">
            <a href="/about-us/" className="underline hover:text-white transition-colors">
              Learn more about On The Go Moving &amp; Storage →
            </a>
          </p>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
