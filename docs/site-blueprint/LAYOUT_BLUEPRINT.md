# Local Service Site Layout Blueprint

Pulled from the On The Go Moving & Storage build (this repo). Use it to rebuild the same layout for a different local service business.

Everything below comes from reading the code in this repo. Where I give an opinion instead of a fact, it is labeled **Recommendation**.

---

## 1. What the layout actually is

A lead generation site for a local service business. Every page is built to do two things:

1. Rank for a service, a city, or a city + service search.
2. Turn that visit into a call or a quote form submit.

The pattern that repeats on every money page:

**Dark hero with headline + quote form on the right > trust bar > content sections that alternate white and light gray > reviews > FAQ accordion > service area links > dark final CTA with phone + quote button.**

---

## 2. Tech stack (copy as is)

| Item | Value |
|---|---|
| Framework | Next.js 15, App Router, `output: 'export'` (static HTML) |
| Language | TypeScript + Tailwind CSS 3 + `tailwindcss-animate` |
| Icons | `lucide-react` |
| Toasts | `sonner` |
| Package manager | pnpm 9, Node 20 |
| Hosting | Netlify, auto deploy from `main` |
| Forms | Netlify Function posts the lead to a CRM webhook + Meta Conversions API |
| Tracking | GTM snippet in `app/layout.tsx` head and body |
| URLs | `trailingSlash: true` in `next.config.js` |

---

## 3. Folder structure

```
app/
  layout.tsx                 # <html>, GTM, fonts, sitewide Organization + LocalBusiness + WebSite JSON-LD
  globals.css                # brand CSS variables, .container, .btn-primary, .btn-gold
  (main)/                    # all public pages share Header + Footer
    page.tsx                 # homepage
    [cityMovers]/page.tsx    # city pages AND blog posts at root level (/seattle-movers/, /some-post/)
    [cityMovers]/[serviceKey]/page.tsx   # city x service pages (/seattle-movers/packing/)
    residential-moving/ ...  # one folder per service hub page
    get/                     # paid + social landing pages (noindex)
  (landing-fb)/              # isolated layout for Meta paid traffic (pixel lives here only)
components/
  layout/Header.tsx          # mega menu: Services, Locations (grouped by region + search), About
  layout/HeaderLanding.tsx   # logo + phone only, for /get/ pages
  layout/Footer.tsx          # 5 columns: brand/NAP, services, locations x2, company links
  QuoteForm.tsx              # ONE shared form, variants: hero | sidebar | inline
  pages/Home.tsx
  pages/ServicePage.tsx      # template for every service hub, driven by SERVICE_DATA[slug]
  pages/LocationPage.tsx     # template for every city page, driven by LOCATION_DATA[slug]
  pages/CityServiceSubPage.tsx # template for city x service, driven by SERVICE_DEFS + city data
  pages/BlogPost.tsx         # article + sticky sidebar, auto internal links
  pages/landing/*.tsx        # conversion-only pages
lib/
  siteData.ts                # COMPANY, NAV, SERVICES, TESTIMONIALS, STATS, FAQS, ALL_LOCATIONS
  locationData.ts            # one object per city
  tierAContent.ts            # extra deep content for the most important city x service combos
  blogData.ts / blogPosts.ts # posts + lightweight index
  brandImages.ts             # every image URL lives here, nowhere else
hooks/useSEO.ts              # title, meta, canonical, OG, JSON-LD
public/sitemap.xml           # hand maintained
netlify/functions/submit-lead.js
```

---

## 4. Design system

### Tokens (swap these per client)

| Token | OTGM value | Role |
|---|---|---|
| `--brand-primary` | `#75aa11` green | Buttons, icons, section labels, links |
| `--brand-primary-dark` | `#5d8a0d` | Button hover |
| `--brand-primary-light` | `#e8f4d0` | Tints, hover backgrounds |
| `--brand-accent` | `#fbc319` gold | Stars, phone buttons, the one CTA that must pop |
| `--brand-dark` | `#1e3a0f` forest | Hero overlay, trust bar, footer, final CTA |
| `--brand-gray` | `#f5f5f3` | Alternate section background |
| Heading font | Barlow Condensed 700/800 | All h1 to h6, buttons (uppercase) |
| Body font | Nunito Sans 400 to 700 | Paragraphs |
| Container | max 1280px, 16 / 24 / 32px side padding | `.container` |
| Radius | cards `rounded-xl`, form card `rounded-2xl`, buttons `rounded-md` | |

### Rhythm rules

- Section padding: `py-16` (main), `py-12` or `py-14` (lighter sections).
- Backgrounds alternate: white > `#f5f5f3` or `gray-50` > white.
- Every section header is: small uppercase **section label** in primary color > big condensed H2 (`text-4xl lg:text-5xl font-extrabold`) > one gray sentence under it.
- Two dark bands per page: the hero and the final CTA. Sometimes a third for pricing.
- Fade-up on scroll via an IntersectionObserver `FadeSection` wrapper.

### Buttons

- `.btn-primary`: primary color, white text, condensed uppercase, slight scale on hover.
- `.btn-gold`: accent color, dark text. Used for "Call Now" and "Get Free Quote" on dark backgrounds.
- Ghost button on dark: `bg-white/10 border-white/20 text-white`.

**Recommendation:** the OTGM code hardcodes hex values and `style={{ fontFamily: "'Barlow Condensed'" }}` inline in hundreds of places, and hardcodes "4.8 / 393 reviews" and license numbers inside templates. In a new build, put colors in Tailwind tokens (`bg-brand-primary`), fonts in `font-heading`, and every number in `COMPANY`. Then a rebrand is one file, not a find and replace.

---

## 5. Shared components

### Header (main site)
- Fixed, 72px tall. Pages offset with `pt-[72px]`.
- Logo left. Mega menus: **Services** (icon + one line description, "Most Popular" badge on top 3, "View All Services"), **Locations** (cities grouped by region, with a search filter), **About**.
- Phone number + quote button right.
- Mobile: hamburger with accordion sections.
- Hover intent 150ms. Closes on outside click and Escape.

### Header (landing pages)
- Thin dark top bar with license + insured line.
- Logo + one phone button. No nav. Keeps paid traffic on the page.

### Footer
- Dark background. 5 columns: brand + NAP + Google rating badge, Services, Locations (two columns), Company links + CTA.
- Bottom bar: copyright, privacy, terms, sitemap.

### QuoteForm (one component, used everywhere)
- Props: `variant` (hero | sidebar | inline), `sourceLabel` (tags the lead source), `defaultMoveType`, `isLandingPage` (urgency line + landing thank you page), `thankYouPath`, `submitButtonLabel`.
- Rows: Name + Phone > Email + Date > From zip + To zip > Job type > Job size > optional add on checkbox > urgency line (landing only).
- Client side: 10 digit US phone check with a live `(425) 333-3333` mask.
- Posts to `/.netlify/functions/submit-lead`. The function cleans phone and name, stores the lead, posts to the CRM, fires Meta CAPI.
- Pushes a GTM dataLayer event on submit and on phone clicks.

**For a new industry, only the job specific rows change.** Example: roofing swaps "From zip / To zip / Move size" for "Property zip / Roof type / Issue (leak, storm damage, full replacement) / Insurance claim? yes or no".

---

## 6. Page templates, section by section

### A. Homepage (`components/pages/Home.tsx`)
Target keyword: "[Main City] [Trade]" (OTGM: "Seattle Movers").

1. **Hero** (min 700px). Background photo with dark left to right gradient. Optional muted autoplay video on desktop only, `preload="none"`. Left: eyebrow pill ("[Trade] you can rely on, since [year]"), H1 on two lines with the second line in primary color, one sentence value prop, trust strip (5 stars, rating, review count, Licensed & Insured). Right: quote form card. Mobile: phone button + form stacked under the copy.
2. **Stats bar**. 4 numbers (years, jobs done, rating, reviews) with a thin gradient line along the bottom.
3. **Services grid**. 3 columns of image cards. Image with gradient + icon badge, title, one line, "Learn More". Button to `/services/`.
4. **Why choose us**. Image left with a floating stat badge. Right: label, H2, paragraph, 2 column icon checklist (6 items), pull quote card with left border, two buttons (About + Call).
5. **Testimonials**. H2 is "[count] Five-Star Reviews" with stars under it. 3 cards: stars, quote, initial avatar, name, city, date.
6. **Locations**. Left: copy + "View all service areas". Right: 2 column grid of 12 city links with pin icons, "+ X more cities".
7. **FAQ**. 1/3 left intro + phone button. 2/3 right accordion.
8. **Neighborhoods** (main city only). 12 cards, one local detail each.
9. **Final CTA**. Dark gradient. H2 + one line left. Gold quote button + ghost phone button right.

### B. Service hub page (`components/pages/ServicePage.tsx`)
Target keyword: "[service] company" with no city. Broad and educational. One data object per service drives the whole page.

1. **Hero** (min 620px). Service photo with dark gradient, thin primary color stripe on the left edge. Eyebrow pill with license numbers. H1 = `heroTagline`. Intro. Trust strip. Form card right with a primary color top border.
2. **Trust bar**. 5 icon + text items in one row (rating, license, since year, pricing promise, vetted crews).
3. **What is it**. Label, H2, explainer paragraph, quote + phone buttons, image right.
4. **Who we help**. Icon cards for customer types.
5. **Benefits / what's included**. Checklist.
6. **How it works**. 3 to 5 numbered steps with icons.
7. **Pricing table**. Rows of size / crew / duration / cost, one highlighted row, pricing note under it.
8. **Testimonials**. Service specific reviews.
9. **FAQ**. Accordion, first item open. Also output as FAQPage schema.
10. **Service area**. City chips.
11. **Related services**. Links to sibling hubs.
12. **City cross links**. Links to `/{city}-[trade]/{service}/` pages.
13. **Final CTA**. Dark band.

Schema: `Service` (provider, rating, GeoCircle area served) + `FAQPage` + `BreadcrumbList`.

Data shape:
```ts
{
  title, metaTitle, metaDesc, canonical,
  heroTagline, intro,
  whatIsItTitle, whatIsIt,
  benefits: string[],
  whoWeHelp: { icon, label, desc }[],
  process: { icon, step, desc }[],
  pricing: { size, crew, duration, cost, highlight? }[], pricingNote,
  testimonials: { name, city, context, rating, text }[],
  faqs: { question, answer }[],
  image, imageAlt, statValue, statLabel, ctaHeadline
}
```

### C. City page (`components/pages/LocationPage.tsx`)
Target keyword: "[city] [trade]". URL: `/{city}-[trade]/`.

1. **Hero** with breadcrumb (Home / Locations / City). Eyebrow pill: "Serving [City], [State] · [drive time] from [HQ]". H1, subtitle, trust strip, gold phone button, form right.
2. **Trust bar** on dark background (license, insured, "Serving [City] since [year]", key add on).
3. **Why [City] trusts us**. Local intro copy + image.
4. **Services in [City]**. Grid of service cards.
5. **Job types**. 3 columns (OTGM: apartments / homes / businesses). Each has city specific copy.
6. **Pricing transparency**. Dark gradient band with price ranges and hourly rate.
7. **Reviews**.
8. **Local knowledge**. Neighborhood cards + a list of local challenges (parking, hills, HOAs). This is the section that makes each city page unique.
9. **FAQ**. City specific.
10. **NAP + full service area**. Address, phone, hours, map or city list.
11. **City service links**. Grid linking to every `/{city}-[trade]/{service}/` page.
12. **Secondary CTA + nearby cities**. Dark band.
13. **Related resources**. Blog links.

Schema: LocalBusiness (with city GBP override when one exists) + FAQPage + BreadcrumbList.

Data shape (`LocationData`):
```ts
{
  slug, city, state, miles, drive, dispatchFrom?,
  metaTitle, metaDescription, heroTagline, heroSubtitle,
  intro, localKnowledge,
  neighborhoods: string[], neighborhoodDetails?: { name, desc }[],
  challenges: string[],
  pricing: { tier1, tier2, tier3, tier4, hourlyRate },
  faqs: { q, a }[],
  nearby: [label, href][],
  jobType1Copy, jobType2Copy, jobType3Copy,
  gbp?: { streetAddress, addressLocality, postalCode, telephone?, reviewCount, ratingValue?, latitude?, longitude? }
}
```

### D. City x service page (`components/pages/CityServiceSubPage.tsx`)
Target keyword: "[city] [service]". URL: `/{city}-[trade]/{service}/`. Short, local, high intent. Built by `generateStaticParams` looping every city x every service key.

1. **Hero** with breadcrumb Home > City > Service.
2. **Pricing strip**. One dark line: "Pricing Guide: ... · Free quote · Response within 1 hour".
3. **Main column (2/3)**: local intro card, local callouts (buildings, streets, landmarks), steps, benefits, FAQ.
4. **Sticky sidebar (1/3)**: quote form, list of every other service in this city, "Why trust us" list.
5. Links up to the service hub and across to the same service in nearby cities.

Cannibalization rule built into the titles: hub pages own "[Service]". City pages own "[City] [Service]". Titles are city first.

Content depth: a template function per service fills every combo. The most important combos get a hand written override in `tierAContent.ts` (intro, local callouts, extra FAQs, pricing note). **Recommendation:** thin templated pages at scale are a real risk. Only generate combos you can make genuinely different, or noindex the rest until they have Tier A content.

### E. Blog post (`components/pages/BlogPost.tsx`)
- Dark hero with title, date, read time, author.
- Article body + sticky sidebar (quote CTA, related posts).
- Auto internal linking: keyword pattern > service or city URL, first match only, max 6 per post, never links to itself.
- City CTA box when `relatedCity` is set.
- Schema: Article + FAQPage + BreadcrumbList.

### F. Landing pages (`components/pages/landing/`)
Noindex. Landing header (logo + phone only). Short.

1. Hero with headline + form (form pre set to the ad's intent).
2. Google reviews bar.
3. Job types.
4. Reviews.
5. Why choose us.
6. Short FAQ.
7. Bottom CTA in solid primary color.

Each landing page passes its own `sourceLabel` so the CRM can tag the lead (OTGM tags social leads `SOCIAL_MEDIA_LEAD`). The Meta paid page lives in its own route group so the pixel only loads there.

### G. Supporting pages
About, Team, Founder bio (Person schema, feeds E-E-A-T), Partners / referral programs (real estate agents, stagers), FAQ, Contact, Services index, Locations index, "Best [trade] in [city]" roundup pages, cost guide, HTML sitemap, privacy, terms, thank you pages (noindex).

---

## 7. SEO system that ships with the layout

- Every page: unique title, meta description, full URL canonical with trailing slash, JSON-LD.
- Sitewide schema in `app/layout.tsx`: Organization, LocalBusiness (with the industry specific type), WebSite. Pages reference them by `@id`.
- Schema `url` = the page it sits on.
- Internal links are relative (`/slug/`). Canonical and schema URLs are absolute.
- Homepage owns the main "[City] [Trade]" keyword. The `/[city]-[trade]/` page for the HQ city is a hub and is not optimized for the same term. Every "[City] [Trade]" anchor points to `/`.
- `public/sitemap.xml` and the HTML sitemap are updated by hand for every new page.
- Old URLs get 301s in `netlify.toml`.

---

## 8. What changes per industry

| Layer | Keep | Change |
|---|---|---|
| Stack, folders, routing | Keep | Rename `[cityMovers]` to something neutral like `[citySlug]` |
| Section order | Keep | Swap "Job types" and "Pricing" content |
| Design tokens | Keep structure | New colors, fonts, logo, photos |
| QuoteForm | Keep component + validation | New job fields and CRM payload |
| Schema type | Keep pattern | `MovingCompany` becomes `RoofingContractor`, `Plumber`, `HVACBusiness`, `Electrician`, `HousePainter`, `LandscapingBusiness` (check schema.org for the closest subtype), or `HomeAndConstructionBusiness` as a fallback |
| Trust signals | Keep slots | License type, bonding, manufacturer certs (GAF, Carrier, etc.), warranty, BBB |
| Pricing section | Keep slot | Some trades should show ranges, some should show "free inspection" instead. Decide per client |
| Urgency | Add | Emergency trades (plumbing, HVAC, roofing after storms) need a 24/7 banner and click to call above the fold on mobile |

---

## 9. Do not copy

- Anything from `CLAUDE.md` that is a key, token, admin password or API credential. Those belong to OTGM. New builds get their own, stored as Netlify env vars, never in a markdown file or code fallback.
- OTGM photos, reviews, license numbers, GBP links, GTM ID, pixel ID.
- OTGM review counts or stats as placeholders. Use obvious `[PLACEHOLDER]` text so nothing fake ships.
