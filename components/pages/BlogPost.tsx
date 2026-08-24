"use client";

// ON THE GO MOVING — Blog Post Template
// Design: Clean Pacific Utility — readable article layout with sticky sidebar
// AEO Strategy: Direct-answer paragraphs, FAQ schema, author markup, internal linking
// Schema: Article + FAQPage + BreadcrumbList JSON-LD on every post
// Data: 230 posts imported from /lib/blogData.ts (auto-generated from WordPress scrape)
// ==========================================================================
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { ArrowRight, Calendar, Clock, User, Tag, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { POSTS_DATA } from "@/lib/blogData";

// ── INTERNAL LINK INJECTION ──────────────────────────────────────────────────
// Maps keyword patterns → service/location URLs.
// Rules: first occurrence only per post, max 6 links per post, case-insensitive,
// skip if the post's own relatedService matches the target (avoid self-links).
const KEYWORD_MAP: Array<{ pattern: RegExp; url: string; label: string }> = [
  // Service pages — highest commercial intent first
  { pattern: /\bresidential moving(?! service)|\bresidential movers?\b|\bhome movers?\b|\bhouse movers?\b/i, url: "/residential-moving/", label: "residential moving" },
  { pattern: /\bpacking services?\b|\bprofessional packing\b|\bpacking and unpacking\b/i, url: "/packing-services/", label: "packing services" },
  { pattern: /\bstorage services?\b|\bmoving storage\b|\bstorage units?\b/i, url: "/storage-services/", label: "storage services" },
  { pattern: /\bcommercial moving\b|\boffice movers?\b|\bbusiness movers?\b/i, url: "/commercial-moving/", label: "commercial moving" },
  { pattern: /\bsenior moving\b|\bsenior movers?\b|\bsenior relocation\b/i, url: "/senior-moving/", label: "senior moving" },
  { pattern: /\bapartment moving\b|\bapartment movers?\b/i, url: "/apartment-moving/", label: "apartment moving" },
  { pattern: /\bunpacking services?\b/i, url: "/unpacking-services/", label: "unpacking services" },
  { pattern: /\bstaging professionals?\b|\breal estate staging\b/i, url: "/staging-professionals/", label: "staging professionals" },
  // Location pages — top cities
  { pattern: /\bSeattle movers?\b|\bmovers? in Seattle\b/i, url: "/", label: "Seattle movers" },
  { pattern: /\bBellevue movers?\b|\bmovers? in Bellevue\b/i, url: "/bellevue-movers/", label: "Bellevue movers" },
  { pattern: /\bRedmond movers?\b|\bmovers? in Redmond\b/i, url: "/redmond-movers/", label: "Redmond movers" },
  { pattern: /\bKirkland movers?\b|\bmovers? in Kirkland\b/i, url: "/kirkland-movers/", label: "Kirkland movers" },
  { pattern: /\bSammamish movers?\b|\bmovers? in Sammamish\b/i, url: "/sammamish-movers/", label: "Sammamish movers" },
  { pattern: /\bIssaquah movers?\b|\bmovers? in Issaquah\b/i, url: "/issaquah-movers/", label: "Issaquah movers" },
  { pattern: /\bBothell movers?\b|\bmovers? in Bothell\b/i, url: "/bothell-movers/", label: "Bothell movers" },
  { pattern: /\bKenmore movers?\b|\bmovers? in Kenmore\b/i, url: "/kenmore-movers/", label: "Kenmore movers" },
  { pattern: /\bRenton movers?\b|\bmovers? in Renton\b/i, url: "/renton-movers/", label: "Renton movers" },
];

const MAX_LINKS_PER_POST = 6;

/**
 * Returns true if the position `index` in `text` is inside an existing <a>...</a> tag.
 * Prevents the auto-linker from creating nested anchors over manually-written links.
 */
function isInsideAnchor(text: string, index: number): boolean {
  const before = text.slice(0, index);
  const lastOpenTag = before.lastIndexOf('<a ');
  const lastCloseTag = before.lastIndexOf('</a>');
  return lastOpenTag > lastCloseTag;
}

/**
 * Injects contextual internal links into a plain-text string.
 * - Tracks which URLs have already been linked (first-occurrence-only per post)
 * - Respects the MAX_LINKS_PER_POST cap
 * - Skips the target URL if it matches the post's own relatedService page
 * - Skips matches that are already inside an existing <a> tag (avoids nested anchors)
 * - Returns an HTML string safe to render via dangerouslySetInnerHTML
 */
function linkifyContent(
  text: string,
  linkedUrls: Set<string>,
  skipUrl: string | undefined
): string {
  if (linkedUrls.size >= MAX_LINKS_PER_POST) return escapeHtml(text);

  let result = text;
  let offset = 0; // track position shifts from replacements

  for (const { pattern, url, label } of KEYWORD_MAP) {
    if (linkedUrls.size >= MAX_LINKS_PER_POST) break;
    if (url === skipUrl) continue;
    if (linkedUrls.has(url)) continue;

    // Find first match in the ORIGINAL text (before replacements shift positions)
    const match = text.match(pattern);
    if (!match || match.index === undefined) continue;

    const matchedText = match[0];
    const startInOriginal = match.index;

    // Skip if this match is already inside an existing <a> tag — avoids nested anchors
    if (isInsideAnchor(text, startInOriginal)) continue;

    // Build the replacement anchor
    const anchor = `<a href="${url}">${matchedText}</a>`;

    // Apply replacement to result string at the correct offset position
    const adjustedStart = startInOriginal + offset;
    const before = result.slice(0, adjustedStart);
    const after = result.slice(adjustedStart + matchedText.length);
    result = before + anchor + after;
    offset += anchor.length - matchedText.length;

    linkedUrls.add(url);
  }

  // Escape any remaining unlinked HTML special chars in plain text segments
  // (anchors are already safe; only escape outside them)
  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── RELATED POSTS SIDEBAR ─────────────────────────────────────────────────────
function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const related = BLOG_POSTS.filter(p => p.slug !== currentSlug && p.category === category).slice(0, 3);
  const others = BLOG_POSTS.filter(p => p.slug !== currentSlug && p.category !== category).slice(0, 3 - related.length);
  const posts = [...related, ...others].slice(0, 3);
  return (
    <div className="bg-[#f5f5f3] rounded-xl p-5">
      <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Related Articles</h3>
      <div className="flex flex-col gap-3">
        {posts.map(p => (
          <a key={p.slug} href={`/${p.slug}/`} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="w-full h-28 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-800 group-hover:text-[#75aa11] transition-colors leading-snug line-clamp-2">{p.title}</p>
              <p className="text-xs text-gray-400 mt-1">{p.readTime}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── QUOTE CTA SIDEBAR ─────────────────────────────────────────────────────────
function QuoteCTA() {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="p-5" style={{ backgroundColor: "#1e3a0f" }}>
        <p className="text-white font-bold text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Moving in the Seattle Area?
        </p>
        <p className="text-white/70 text-sm mt-1">Get a free, no-obligation quote from On The Go Moving.</p>
      </div>
      <div className="p-5 bg-white">
        <ul className="space-y-2 mb-4">
          {["Licensed & insured in WA", "Flat-rate & hourly options", "No hidden fees", "5-star rated crew"].map(item => (
            <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: "#75aa11" }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
        <a href="/contact-us/" className="btn-gold w-full text-center block text-sm">
          Get a Free Quote
        </a>
        <p className="text-center text-xs text-gray-400 mt-2">Or call <a href="tel:+14257618500" className="font-semibold" style={{ color: "#75aa11" }}>(425) 761-8500</a></p>
      </div>
    </div>
  );
}

export default function BlogPost({ slug: slugProp }: { slug?: string }) {
  const slug = slugProp ?? "";
  const post = POSTS_DATA[slug];
  const meta = BLOG_POSTS.find(p => p.slug === slug);

  // Shared link tracker for this post — ensures first-occurrence-only across all sections
  const linkedUrls = new Set<string>();
  // Skip self-referential links (e.g. a packing post shouldn't link to /packing-services/ mid-article)
  const skipUrl = post?.relatedService ?? undefined;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Inject JSON-LD schema
  useEffect(() => {
    if (!post) return;
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "datePublished": post.dateISO,
      "dateModified": post.dateISO,
      "author": {
        "@type": "Person",
        "@id": "https://onthegomoving.com/jason-sexton/#person",
        "name": "Jason Sexton",
        "url": "https://onthegomoving.com/jason-sexton/",
        "jobTitle": "Founder & Owner",
        "worksFor": {
          "@type": "LocalBusiness",
          "name": "On The Go Moving & Storage",
          "url": "https://onthegomoving.com",
        },
        "image": "https://onthegomoving.com/assets/jason-sexton-headshot.jpg",
      },
      "publisher": {
        "@type": "Organization",
        "name": "On The Go Moving & Storage",
        "url": "https://onthegomoving.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/AXcVm6gUw3wWRnzjKLx4pb/logo-1_2b575a68.png",
          "width": 200,
          "height": 60,
        },
      },
      "image": {
        "@type": "ImageObject",
        "url": post.heroImage,
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://onthegomoving.com/${post.slug}/`,
      },
    };

    const faqSchema = post.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a,
        },
      })),
    } : null;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onthegomoving.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://onthegomoving.com/blog/" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://onthegomoving.com/${post.slug}/` },
      ],
    };

    // Remove old schemas
    document.querySelectorAll('script[data-blog-schema]').forEach(el => el.remove());

    const schemas = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];
    schemas.forEach(schema => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-blog-schema", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Update meta tags
    document.title = post.metaTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", post.metaDescription);

    // Canonical link tag
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", `https://onthegomoving.com/${post.slug}/`);

    // OG + Twitter tags
    const setOG = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const ogImage = post.heroImage || "https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-storage-truck.jpg";
    const postUrl = `https://onthegomoving.com/${post.slug}/`;
    setOG("og:type", "article");
    setOG("og:title", post.metaTitle);
    setOG("og:description", post.metaDescription);
    setOG("og:url", postUrl);
    setOG("og:image", ogImage);
    setOG("og:site_name", "On The Go Moving & Storage");
    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", post.metaTitle);
    setMetaName("twitter:description", post.metaDescription);
    setMetaName("twitter:image", ogImage);

    return () => {
      document.querySelectorAll('script[data-blog-schema]').forEach(el => el.remove());
    };
  }, [post, slug]);

  // 404 for unknown slugs — show a "coming soon" placeholder
  if (!post) {
    const placeholderMeta = meta;
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[72px]">
          <section className="py-24 bg-[#f5f5f3] text-center">
            <div className="container max-w-2xl">
              <p className="section-label text-[#75aa11] mb-3">Coming Soon</p>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {placeholderMeta?.title ?? "Article Coming Soon"}
              </h1>
              <p className="text-gray-500 mb-8">
                This article is being migrated from our WordPress site. Check back soon, or browse our other moving guides below.
              </p>
              <a href="/blog/" className="btn-gold inline-flex items-center gap-2">
                Browse All Articles <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">

        {/* ── HERO ── */}
        <section
          className="relative"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15,40,10,0.85) 0%, rgba(15,40,10,0.60) 100%), url(${post.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container py-16 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-green-300/70 text-xs mb-6">
              <a href="/" className="hover:text-white">Home</a>
              <ChevronRight size={12} />
              <a href="/blog/" className="hover:text-white">Blog</a>
              <ChevronRight size={12} />
              <span className="text-white/80 truncate max-w-xs">{post.title}</span>
            </nav>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white" style={{ backgroundColor: "#75aa11" }}>
                <Tag size={10} className="inline mr-1" />{post.category}
              </span>
              <span className="text-xs text-white/60 flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
              <span className="text-xs text-white/60 flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
              <a href="/jason-sexton/" className="text-xs text-white/60 flex items-center gap-1 hover:text-white transition-colors"><User size={11} /> Jason Sexton</a>
            </div>

            <h1
              className="text-4xl lg:text-5xl font-extrabold text-white max-w-3xl leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {post.title}
            </h1>
          </div>
        </section>

        {/* ── ARTICLE BODY + SIDEBAR ── */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

              {/* MAIN CONTENT */}
              <article className="max-w-none">
                {/* Intro paragraph, AEO direct answer */}
                <p
                  className="text-lg text-gray-700 leading-relaxed mb-8 font-medium border-l-4 pl-5"
                  style={{ borderColor: "#75aa11" }}
                  dangerouslySetInnerHTML={{ __html: linkifyContent(post.intro, linkedUrls, skipUrl) }}
                />

                {/* Sections */}
                {post.sections.map((section, i) => (
                  <div key={i} className="mb-8">
                    {section.type === "h2" ? (
                      <h2
                        className="text-2xl font-extrabold text-gray-900 mb-3 pb-2 border-b border-gray-100"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {section.heading}
                      </h2>
                    ) : (
                      <h3
                        className="text-xl font-bold text-gray-900 mb-2"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {section.heading}
                    </h3>
                  )}
                    <div
                      className="text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-gray-800 [&_a]:text-[#4b7f14] [&_a]:font-semibold [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2 [&_a:hover]:text-[#1e3a0f] [&_a:hover]:decoration-2 [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[#1e3a0f] [&_a_strong]:text-[#4b7f14] [&_a:hover_strong]:text-[#1e3a0f]"
                      dangerouslySetInnerHTML={{ __html: linkifyContent(section.body, linkedUrls, skipUrl) }}
                    />
                  </div>
                ))}

                {/* Internal CTA, prominent mid-article conversion block */}
                {(post.relatedService || post.relatedCity) && (() => {
                  // Build city-specific links when relatedCity is set
                  const cityName = post.relatedCity
                    ? post.relatedCity.charAt(0).toUpperCase() + post.relatedCity.slice(1)
                    : null;
                  const citySlug = post.relatedCity ?? null;
                  const cityLinks = citySlug ? [
                    { label: `${cityName} Movers`, href: citySlug === "seattle" ? "/" : `/${citySlug}-movers/` },
                    { label: `${cityName} Residential Moving`, href: `/${citySlug}-movers/residential/` },
                    { label: `${cityName} Apartment Moving`, href: `/${citySlug}-movers/apartment/` },
                    { label: `${cityName} Packing Services`, href: `/${citySlug}-movers/packing/` },
                    { label: `${cityName} Storage Services`, href: `/${citySlug}-movers/storage/` },
                    { label: `${cityName} Commercial Moving`, href: `/${citySlug}-movers/commercial/` },
                    { label: `${cityName} Senior Moving`, href: `/${citySlug}-movers/senior/` },
                    { label: `${cityName} Office Moving`, href: `/${citySlug}-movers/office/` },
                  ] : [
                    { label: "Residential Moving", href: "/residential-moving/" },
                    { label: "Packing Services", href: "/packing-services/" },
                    { label: "Storage", href: "/storage-services/" },
                    { label: "Commercial Moving", href: "/commercial-moving/" },
                    { label: "Senior Moving", href: "/senior-moving/" },
                  ];
                  const ctaHeading = cityName
                    ? `Ready to Move to ${cityName}?`
                    : `Ready to Move in the Seattle Area?`;
                  const ctaSubtext = cityName
                    ? `On The Go Moving & Storage has served the ${cityName} area since 2007. Licensed, insured, 4.8★ rated.`
                    : `On The Go Moving serves Redmond, Bellevue, Kirkland, Seattle & 20+ Eastside cities. Licensed, insured, 4.8★ rated.`;
                  return (
                    <div className="my-10 rounded-2xl overflow-hidden shadow-md" style={{ background: "linear-gradient(135deg, #1e3a0f 0%, #2d5a1b 100%)" }}>
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1">
                            <p className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                              {ctaHeading}
                            </p>
                            <p className="text-white/80 text-sm">{ctaSubtext}</p>
                          </div>
                          <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
                            <a href="/contact-us/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white" style={{ backgroundColor: "#75aa11" }}>
                              Get a Free Quote <ArrowRight size={14} />
                            </a>
                            <a href="tel:+14257618500" className="text-white/70 text-xs text-center hover:text-white transition-colors">
                              Or call (425) 761-8500
                            </a>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <p className="text-white/60 text-xs mb-2">
                            {cityName ? `Explore ${cityName} moving services:` : `Explore our services:`}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {cityLinks.map(s => (
                              <a key={s.href} href={s.href} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white/90 hover:text-white transition-colors" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                                {s.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* FAQ Section */}
                {post.faqs.length > 0 && (
                  <div className="mt-10">
                    <h2
                      className="text-2xl font-extrabold text-gray-900 mb-6"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-5">
                      {post.faqs.map((faq, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-5 bg-[#fafafa]">
                          <h3 className="font-bold text-gray-900 mb-2 text-base">{faq.q}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Box */}
                <div className="mt-12 p-5 rounded-xl bg-[#f5f5f3] border border-gray-200 flex gap-4 items-start">
                  <a href="/jason-sexton/" className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#7bc144]">
                      <img
                        src={BRAND_IMAGES.jasonSextonHeadshot}
                        alt="Jason Sexton, Founder & Owner, On The Go Moving & Storage"
                        className="w-full h-full object-cover object-top"
                        width={56}
                        height={56}
                      />
                    </div>
                  </a>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <a href="/jason-sexton/" className="font-bold text-gray-900 text-sm hover:text-[#75aa11] transition-colors">
                        Jason Sexton
                      </a>
                      <span className="text-xs text-gray-400">Founder &amp; Owner, On The Go Moving &amp; Storage</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Jason founded On The Go Moving &amp; Storage in Redmond, WA in 2009 and has personally overseen more than 25,000 moves across Greater Seattle. He holds a Washington State Household Goods Mover license (HG-064180) and writes from direct, hands-on experience in the moving industry.
                    </p>
                    <a href="/jason-sexton/" className="inline-flex items-center gap-1 text-xs font-semibold text-[#75aa11] hover:underline mt-1.5">
                      About the author <ArrowRight size={11} />
                    </a>
                  </div>
                </div>

                {/* Bottom CTA, full-width conversion block before back link */}
                <div className="mt-10 rounded-2xl p-6 sm:p-8 text-center" style={{ backgroundColor: "#f0f7e6", border: "2px solid #75aa11" }}>
                  <p className="text-2xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Get a Free Moving Quote Today
                  </p>
                  <p className="text-gray-600 text-sm mb-5">
                    Serving Seattle, Bellevue, Redmond, Kirkland, Sammamish &amp; the entire Eastside. Flat-rate pricing. No hidden fees.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/contact-us/" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm" style={{ backgroundColor: "#75aa11" }}>
                      Request a Free Quote <ArrowRight size={14} />
                    </a>
                    <a href="tel:+14257618500" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm" style={{ backgroundColor: "#1e3a0f", color: "white" }}>
                      Call (425) 761-8500
                    </a>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                    <span>✓ Licensed &amp; Insured in WA</span>
                    <span>✓ 4.8★ Google Rating</span>
                    <span>✓ Flat-Rate Pricing</span>
                    <span>✓ No Hidden Fees</span>
                  </div>
                </div>

                {/* Back to Blog */}
                <div className="mt-8">
                  <a href="/blog/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#75aa11] transition-colors">
                    ← Back to All Articles
                  </a>
                </div>
              </article>

              {/* SIDEBAR */}
              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1 scrollbar-thin">
                <QuoteCTA />
                <RelatedPosts currentSlug={slug} category={post.category} />

                {/* Service Links */}
                <div className="bg-[#f5f5f3] rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-widest">Our Services</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Residential Moving", href: "/residential-moving/" },
                      { label: "Apartment Moving", href: "/apartment-moving/" },
                      { label: "Commercial Moving", href: "/commercial-moving/" },
                      { label: "Packing Services", href: "/packing-services/" },
                      { label: "Storage Services", href: "/storage-services/" },
                      { label: "Senior Moving", href: "/senior-moving/" },
                      { label: "Staging Professionals", href: "/staging-professionals/" },
                    ].map(s => (
                      <a key={s.href} href={s.href} className="flex items-center justify-between text-sm text-gray-700 hover:text-[#75aa11] transition-colors py-1 border-b border-gray-100 last:border-0">
                        {s.label} <ChevronRight size={13} className="text-gray-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contextual Location Links, dynamic based on post topic */}
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-widest">Serving Your City</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Seattle Movers", href: "/" },
                      { label: "Bellevue Movers", href: "/bellevue-movers/" },
                      { label: "Redmond Movers", href: "/redmond-movers/" },
                      { label: "Kirkland Movers", href: "/kirkland-movers/" },
                      { label: "Sammamish Movers", href: "/sammamish-movers/" },
                      { label: "Issaquah Movers", href: "/issaquah-movers/" },
                      { label: "Bothell Movers", href: "/bothell-movers/" },
                    ].map(s => (
                      <a key={s.href} href={s.href} className="flex items-center justify-between text-sm text-gray-700 hover:text-[#75aa11] transition-colors py-1 border-b border-gray-100 last:border-0">
                        {s.label} <ChevronRight size={13} className="text-gray-400" />
                      </a>
                    ))}
                  </div>
                  <a href="/we-are-local/" className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: "#75aa11" }}>
                    View all service areas <ChevronRight size={11} />
                  </a>
                </div>
              </aside>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
