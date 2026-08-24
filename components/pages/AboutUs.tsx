"use client";

// ON THE GO MOVING — About Us Page
// Design: Clean Pacific Utility — full-bleed hero, E-E-A-T signals, community section
// AEO: Direct-answer intro, entity-rich copy, FAQ schema
// ==========================================================================

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/siteData";
import { Phone, ArrowRight, CheckCircle, Star, Award, Users, Heart, Shield, Zap } from "lucide-react";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { useSEO, MOVING_COMPANY_SCHEMA } from "@/hooks/useSEO";

const TIMELINE = [
  { year: "2009", event: "Founded in Redmond, WA with one truck and a two-person crew." },
  { year: "2012", event: "Expanded to a fleet of 5 trucks. Opened first storage facility in Redmond." },
  { year: "2015", event: "Surpassed 5,000 successful moves. Earned Angie's List Super Service Award." },
  { year: "2018", event: "Launched commercial moving division to serve Eastside businesses and tech campuses." },
  { year: "2021", event: "Reached 1,000 Google reviews with a 4.8-star average. Expanded to 12 trucks." },
  { year: "2024", event: "Over 25,000 moves completed. 393 five-star Google reviews and counting." },
];

const TEAM_QUALITIES = [
  { icon: Shield, title: "Background Checked", desc: "Every team member passes a thorough background check before their first day on the job." },
  { icon: CheckCircle, title: "Professionally Trained", desc: "Our crews complete a structured training program covering safe lifting, furniture protection, and customer communication." },
  { icon: Heart, title: "Customer-First Culture", desc: "We hire for attitude and train for skill. Every person on our team is selected for their commitment to service." },
  { icon: Award, title: "Long-Term Employees", desc: "Low turnover means you get experienced movers, not day laborers. Many of our crew members have been with us for 5+ years." },
];

const TEAM = [
  { name: "Jason Sexton", role: "Founder & Owner", fact: "Started OTGM at 26 with one truck and a belief that moving companies could do better." },
  { name: "Operations Team", role: "Move Coordinators", fact: "Our coordinators have an average tenure of 6 years, they know every neighborhood in the service area." },
  { name: "Field Crews", role: "Professional Movers", fact: "Every crew member is background-checked, drug-tested, and trained in furniture protection and safe lifting." },
];

const VALUES = [
  { icon: Star, title: "Hard Work", desc: "We show up ready to give 100% every day, going the extra mile to get the job done right." },
  { icon: Shield, title: "Integrity", desc: "We do what's right, even when it's not the easiest option, earning trust through honesty and accountability." },
  { icon: Zap, title: "Efficiency", desc: "We stay focused, organized, and productive to complete every move with speed and precision." },
  { icon: Users, title: "Teamwork", desc: "We support one another and communicate clearly to get the job done safely and smoothly." },
  { icon: CheckCircle, title: "Safety", desc: "We prioritize the well-being of our team, our clients, and their belongings on every move." },
  { icon: Heart, title: "Respect", desc: "We treat our customers, their homes, and our teammates with professionalism and courtesy at all times." },
];

const FAQS = [
  {
    q: "How long has On The Go Moving been in business?",
    a: "On The Go Moving & Storage was founded in 2009 in Redmond, WA. We have been serving the Greater Seattle and Eastside area for over 15 years, completing more than 25,000 successful moves.",
  },
  {
    q: "Are On The Go Moving movers licensed and insured?",
    a: "Yes. On The Go Moving & Storage is fully licensed (HG-064180) and insured, and holds a USDOT number (2120054). Every move is covered by our standard valuation coverage, with additional full-value protection available.",
  },
  {
    q: "Where is On The Go Moving based?",
    a: "Our headquarters and storage facility are located in Redmond, WA. We serve all cities within approximately 18 miles of Redmond, including Seattle, Bellevue, Kirkland, Bothell, Issaquah, Sammamish, Renton, and more.",
  },
  {
    q: "What makes On The Go Moving different from other Seattle movers?",
    a: "On The Go Moving is locally owned and operated, not a franchise or broker. Every crew member is a direct employee, background-checked, trained, and uniformed. We offer flat-rate pricing, secure vault storage available, and a 4.8-star Google rating backed by over 393 reviews.",
  },
];

export default function AboutUs() {
  useSEO({
    title: "Seattle Moving Company Since 2009 | On The Go Moving",
    description: "On The Go Moving & Storage, Seattle's trusted movers since 2009. 25,000+ moves, 393 five-star reviews, licensed & insured in WA. Meet our team.",
    canonical: "https://onthegomoving.com/about-us/",
    ogType: "website",
    schema: [
      MOVING_COMPANY_SCHEMA,
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "On The Go Moving & Storage",
        url: "https://onthegomoving.com",
        logo: "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-logo.png",
        foundingDate: "2009",
        founder: { "@type": "Person", "@id": "https://onthegomoving.com/jason-sexton/#person", name: "Jason Sexton", url: "https://onthegomoving.com/jason-sexton/" },
        address: {
          "@type": "PostalAddress",
          streetAddress: "16625 Redmond Way #M365",
          addressLocality: "Redmond",
          addressRegion: "WA",
          postalCode: "98052",
          addressCountry: "US",
        },
        telephone: "+14257618500",
        email: "booking@onthegomoving.com",
        sameAs: [
          "https://www.facebook.com/onthegomoving",
          "https://www.instagram.com/onthegomoving",
          "https://www.yelp.com/biz/on-the-go-moving-and-storage-redmond",
        ],
        numberOfEmployees: { "@type": "QuantitativeValue", value: 30 },
        description: "On The Go Moving & Storage is a licensed and insured moving company serving Seattle, Bellevue, Redmond, and the Greater Eastside since 2009. Over 25,000 moves completed.",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://onthegomoving.com/" },
          { "@type": "ListItem", position: 2, name: "About Us", item: "https://onthegomoving.com/about-us/" },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">

        {/* ── HERO ── */}
        <section
          className="relative min-h-[420px] flex items-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15,40,10,0.92) 50%, rgba(15,40,10,0.65) 100%), url(${BRAND_IMAGES.truckProfessionalLot})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container relative z-10 py-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <CheckCircle size={12} />
                Locally Owned &amp; Operated Since {COMPANY.founded}
              </div>
              <h1
                className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                About On The Go
                <br />
                <span style={{ color: "#75aa11" }}>Moving &amp; Storage</span>
              </h1>
              <p className="text-green-100 text-lg leading-relaxed max-w-xl">
                We are a locally owned moving company based in Redmond, WA. Since 2009, we have helped over 25,000 families, apartment renters, and businesses move across the Eastside and Greater Seattle area.
              </p>
            </div>
          </div>
        </section>

        {/* ── DIRECT ANSWER BLOCK (AEO) ── */}
        <section className="bg-white py-14">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="section-label text-brand-green mb-2">Our Story</p>
                <h2
                  className="text-4xl font-extrabold text-gray-900 mb-5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Who We Are
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  On The Go Moving &amp; Storage is a locally owned and operated moving company headquartered in Redmond, Washington. Founded in {COMPANY.founded}, we serve homes, apartments, condos, and businesses within approximately 18 miles of Redmond, covering Seattle, Bellevue, Kirkland, Bothell, Issaquah, Sammamish, Renton, and the surrounding Eastside communities.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are not a franchise, a broker, or a national chain. Every mover on every job is a direct employee of On The Go Moving, background-checked, professionally trained, and uniformed. We own our trucks and operate our own storage facility in Redmond, which means we control the quality of every move from start to finish.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With over {COMPANY.googleReviewCount.toLocaleString()} five-star Google reviews and more than 25,000 successful moves, we are proud to be the moving company the Eastside trusts most.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="/contact-us/" className="btn-primary">Get a Free Quote <ArrowRight size={16} /></a>
                  <a href={COMPANY.phoneHref} className="btn-gold"><Phone size={16} /> {COMPANY.phone}</a>
                </div>
              </div>
              <div className="relative">
                <img
                  src={BRAND_IMAGES.truckProfessionalLot}
                  alt="On The Go Moving team in Redmond WA"
                  className="rounded-2xl shadow-xl w-full object-cover"
                  style={{ maxHeight: "460px" }}
                />
                {/* Floating stat card */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-5 py-4 border border-gray-100">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#fbc319" color="#fbc319" />)}
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{COMPANY.googleRating} Stars</p>
                  <p className="text-xs text-gray-500">{COMPANY.googleReviewCount.toLocaleString()} Google Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPANY VIDEO ── */}
        <section className="py-16 bg-[#f5f5f3]">
          <div className="container">
            <div className="text-center mb-8">
              <p className="section-label text-brand-green mb-2">See Us In Action</p>
              <h2
                className="text-4xl font-extrabold text-gray-900 mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Moving You Can Rely On
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Watch our crews in action, the same professional team that shows up to every move, uniformed and ready.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ paddingBottom: "56.25%", height: 0 }}
              >
                <iframe
                  src="https://www.youtube.com/embed/NaNz7SzlpTo?rel=0&controls=1&showinfo=0&modestbranding=1"
                  title="On The Go Moving & Storage, Moving You Can Rely On"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
              <p className="text-center text-gray-400 text-sm mt-4">
                On The Go Moving &amp; Storage, Serving Greater Seattle Since 2009
              </p>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="py-14 bg-[#f5f5f3]">
          <div className="container">
            <div className="text-center mb-10">
              <p className="section-label text-brand-green mb-2">Our History</p>
              <h2
                className="text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                15+ Years of Moving the Eastside
              </h2>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-brand-green/30" />
              <div className="space-y-8">
                {TIMELINE.map((item) => (
                  <div key={item.year} className="flex gap-6 items-start">
                    <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-xs shadow-md z-10">
                      {item.year.slice(2)}
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm flex-1 border border-gray-100">
                      <p className="text-xs font-bold text-brand-green uppercase tracking-widest mb-1">{item.year}</p>
                      <p className="text-gray-700 leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-14 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <p className="section-label text-brand-green mb-2">What We Stand For</p>
              <h2
                className="text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Our Core Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-[#f5f5f3] rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <v.icon size={24} className="mb-3" style={{ color: "#75aa11" }} />
                  <h3
                    className="text-xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section id="team" className="py-14 bg-[#f5f5f3]">
          <div className="container">
            <div className="text-center mb-10">
              <p className="section-label text-brand-green mb-2">The People Behind the Move</p>
              <h2
                className="text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Our Team
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Every person at On The Go Moving is a direct employee, not a day laborer or subcontractor. We invest in training, background checks, and fair wages because the quality of your move depends on the quality of our people.
              </p>
            </div>
            {/* Philosophy intro */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
              <div>
                <h3
                  className="text-2xl font-extrabold text-gray-900 mb-4"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  We Hire for Character, Train for Skill
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Since 2009, On The Go Moving &amp; Storage has built its reputation on one principle: the quality of your move is only as good as the people doing it. That's why we are selective about who joins our team.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Every mover on our crew is a full-time, W-2 employee, not a day laborer or subcontractor. This means consistent quality, accountability, and a team that takes pride in their work because this is their career.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You'll see the difference the moment our crew arrives: uniformed, professional, and ready to treat your home and belongings with the care they deserve.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {TEAM_QUALITIES.map((q) => (
                  <div key={q.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <q.icon size={20} className="mb-3" style={{ color: "#75aa11" }} />
                    <h4
                      className="font-bold text-gray-900 text-base mb-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {q.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{q.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team members */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                  {member.name === "Jason Sexton" ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-brand-green">
                      <img
                        src={BRAND_IMAGES.jasonSextonHeadshot}
                        alt="Jason Sexton, Founder & Owner"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                      <Users size={28} style={{ color: "#75aa11" }} />
                    </div>
                  )}
                  <h3
                    className="text-xl font-bold text-gray-900 mb-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {member.name === "Jason Sexton" ? (
                      <a href="/jason-sexton/" className="hover:text-brand-green transition-colors">
                        {member.name}
                      </a>
                    ) : member.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.fact}</p>
                  {member.name === "Jason Sexton" && (
                    <a
                      href="/jason-sexton/"
                      className="mt-3 inline-flex items-center gap-1 text-xs text-brand-green font-semibold hover:underline"
                    >
                      Meet Jason →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMUNITY ── */}
        <section className="py-14 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={BRAND_IMAGES.crewCustomerCommercial}
                  alt="On The Go Moving giving back to the Seattle community"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  style={{ maxHeight: "400px" }}
                />
              </div>
              <div>
                <p className="section-label text-brand-green mb-2">Giving Back</p>
                <h2
                  className="text-4xl font-extrabold text-gray-900 mb-5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  We Are Local
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  On The Go Moving is not just a business in the Eastside community, we are part of it. Our team members live in Redmond, Bellevue, Kirkland, and the surrounding cities. We coach youth sports, donate to local food banks, and support organizations that make the Eastside a better place to live.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  When you hire On The Go Moving, you are supporting a locally owned company that reinvests in the neighborhoods we serve.
                </p>
                <a href="/we-are-local/" className="btn-primary inline-flex">
                  Learn About Our Community Work <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ (AEO Schema) ── */}
        <section className="py-14 bg-[#f5f5f3]">
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <p className="section-label text-brand-green mb-2">Common Questions</p>
              <h2
                className="text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                About Our Company
              </h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <details key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 list-none">
                    {faq.q}
                    <span className="text-brand-green ml-4 flex-shrink-0 text-xl font-bold group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14" style={{ backgroundColor: "#1e3a0f" }}>
          <div className="container text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#fbc319" color="#fbc319" />)}
            </div>
            <h2
              className="text-4xl font-extrabold text-white mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Ready to Move with Seattle's Most Trusted Team?
            </h2>
            <p className="text-white/70 mb-7 max-w-xl mx-auto">
              Get a free, no-obligation quote in under 60 seconds. We respond within 1 hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact-us/" className="btn-gold text-base px-8 py-3">
                Get Your Free Quote <ArrowRight size={16} />
              </a>
              <a href={COMPANY.phoneHref} className="btn-primary text-base px-8 py-3">
                <Phone size={16} /> {COMPANY.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── JSON-LD Schema ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQS.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a },
              })),
            }),
          }}
        />

      </main>
      <Footer />
    </div>
  );
}
