# Replication Prompt: Local Service Lead Gen Site

Copy everything inside the box below into Claude Code (or another coding AI) in a fresh, empty repo. Fill in every `{{VARIABLE}}` first. Delete any line you cannot fill yet and the AI will use a clearly marked placeholder.

Give the AI read access to this repo (`OTGM2_FANNIT`) as the reference build, and attach `docs/site-blueprint/LAYOUT_BLUEPRINT.md`.

---

```text
You are building a lead generation website for a local service business. Copy the layout, page templates, component structure and SEO system of the reference build, then adapt all content and data for the new business below.

REFERENCE BUILD
- Repo: OTGM2_FANNIT (On The Go Moving & Storage, Next.js 15).
- Read docs/site-blueprint/LAYOUT_BLUEPRINT.md first. It is the spec.
- Then read these files to copy structure and styling:
  app/layout.tsx, app/globals.css, tailwind.config.ts, next.config.js, netlify.toml,
  components/layout/Header.tsx, components/layout/Footer.tsx, components/layout/HeaderLanding.tsx,
  components/QuoteForm.tsx, components/pages/Home.tsx, components/pages/ServicePage.tsx,
  components/pages/LocationPage.tsx, components/pages/CityServiceSubPage.tsx,
  components/pages/BlogPost.tsx, components/pages/landing/ResidentialMoversLanding.tsx,
  lib/siteData.ts, lib/locationData.ts, lib/brandImages.ts, hooks/useSEO.ts,
  app/(main)/[cityMovers]/page.tsx, app/(main)/[cityMovers]/[serviceKey]/page.tsx,
  netlify/functions/submit-lead.js
- Copy the layout. Do NOT copy any On The Go content, photos, reviews, stats, license numbers, GBP links, GTM ID, pixel ID, API keys, admin keys or passwords.

NEW BUSINESS
- Business name: {{BUSINESS_NAME}}
- Short name: {{SHORT_NAME}}
- Industry / trade: {{TRADE}}   (e.g. roofing, HVAC, plumbing, electrical, landscaping, painting, remodeling)
- Schema.org type: {{SCHEMA_TYPE}}   (e.g. RoofingContractor, Plumber, HVACBusiness, Electrician. Use HomeAndConstructionBusiness if none fits)
- Domain: {{DOMAIN}}
- Phone: {{PHONE_DISPLAY}}  /  tel link: {{PHONE_E164}}
- Email: {{EMAIL}}
- HQ address: {{STREET}}, {{CITY}}, {{STATE}} {{ZIP}}
- Geo: {{LAT}}, {{LNG}}
- Hours: {{HOURS}}   Emergency / 24-7 service: {{YES_NO}}
- Founded: {{YEAR}}
- License / certification numbers: {{LICENSES}}
- Manufacturer certs or badges: {{CERTS}}   (e.g. GAF Master Elite, Carrier Factory Authorized)
- Warranty promise: {{WARRANTY}}
- Google rating + review count: {{RATING}} / {{REVIEW_COUNT}}   (leave blank if unknown, do not invent)
- GBP URL(s): {{GBP_URLS}}
- Social profiles: {{SOCIAL_URLS}}

TARGETING
- Homepage primary keyword: "{{MAIN_CITY}} {{TRADE_PLURAL}}"   (e.g. "Denver Roofers")
- City slug pattern: /{city}-{{TRADE_SLUG}}/   (e.g. /aurora-roofers/)
- Cities (first one is HQ or main market): {{CITY_LIST}}
- Services (label + slug + city sub-page key): {{SERVICE_LIST}}
  e.g. Roof Replacement | /roof-replacement/ | replacement
       Roof Repair | /roof-repair/ | repair
       Storm Damage | /storm-damage-roofing/ | storm-damage
- Customer types for "Who we help": {{CUSTOMER_TYPES}}   (e.g. homeowners, property managers, HOAs, commercial buildings)
- The 3 job types for the city page "Job types" section: {{JOB_TYPES}}   (OTGM used apartments / homes / businesses)
- Pricing approach: {{PRICING_APPROACH}}   (show ranges / show "starting at" / no prices, push free inspection)

BRAND
- Primary color: {{PRIMARY_HEX}}  (dark hover shade: {{PRIMARY_DARK_HEX}}, light tint: {{PRIMARY_LIGHT_HEX}})
- Accent / CTA color: {{ACCENT_HEX}}
- Dark band color (hero overlay, trust bar, footer, final CTA): {{DARK_HEX}}
- Heading font: {{HEADING_FONT}}   Body font: {{BODY_FONT}}   (Google Fonts)
- Logo URL: {{LOGO_URL}}
- Photo URLs (hero, crew, trucks, jobs): {{PHOTO_URLS}}   (if none, use gray placeholders labeled [PHOTO: description])

LEAD FORM + INTEGRATIONS
- Form fields for this trade: {{FORM_FIELDS}}
  e.g. Name, Phone, Email, Property zip, Service needed (dropdown from services), Issue description, Is this an insurance claim? (yes/no), Preferred inspection date
- CRM / destination: {{CRM}}   (e.g. GoHighLevel inbound webhook. Put the URL in a Netlify env var, never in code)
- GTM container: {{GTM_ID}}
- Meta pixel ID (landing pages only): {{PIXEL_ID}}
- Landing pages needed: {{LANDING_PAGES}}   (e.g. /get/roof-replacement/ for Google Ads, /get/fb-roof-inspection/ for Meta)

BUILD RULES
1. Same stack: Next.js 15 App Router, output: 'export', trailingSlash: true, TypeScript, Tailwind, lucide-react, pnpm, Netlify.
2. Same page templates and section order as LAYOUT_BLUEPRINT.md section 6: Homepage, Service hub, City page, City x service page, Blog post, Landing page, supporting pages.
3. Centralize everything. Colors as Tailwind tokens (brand.primary, brand.accent, brand.dark). Fonts as font-heading / font-sans. Every business fact (phone, rating, reviews, license, year) comes from COMPANY in lib/siteData.ts. No hardcoded hex values, inline font styles, or hardcoded review numbers inside components. The reference build does this in many places. Do not repeat it.
4. Rename the dynamic route folder from [cityMovers] to [citySlug].
5. Every image URL lives in lib/brandImages.ts.
6. One QuoteForm component, variants hero | sidebar | inline, sourceLabel prop, isLandingPage prop. Keep the 10 digit US phone mask and validation. Replace the moving fields with FORM_FIELDS. Push a GTM dataLayer event on submit and on every phone link click.
7. Netlify function submit-lead.js: sanitize phone and name, post to the CRM webhook from an env var, fire Meta CAPI only if the env vars exist. No hardcoded fallback secrets.
8. SEO on every page: unique title, meta description, absolute canonical with trailing slash, JSON-LD. Sitewide Organization + {{SCHEMA_TYPE}} + WebSite schema in app/layout.tsx. Service pages add Service + FAQPage + BreadcrumbList. City pages add LocalBusiness (with city GBP when given) + FAQPage + BreadcrumbList. Schema url = the page it lives on.
9. Keyword ownership: homepage owns "{{MAIN_CITY}} {{TRADE_PLURAL}}". The /{{main-city}}-{{TRADE_SLUG}}/ page is a hub and does not target that term. Every "{{MAIN_CITY}} {{TRADE_PLURAL}}" anchor links to /. Service hubs own "[service]". City x service pages own "[city] [service]" with city first titles.
10. Internal links relative (/slug/). Canonicals and schema absolute.
11. Build public/sitemap.xml and the HTML sitemap page with every indexable URL. Landing pages, thank you pages and admin are noindex and excluded.
12. If {{YES_NO}} emergency = yes: add a 24/7 emergency strip above the header and a sticky click to call bar on mobile.
13. Accessibility: aria-expanded on accordions, aria-label on breadcrumbs, alt text on every image, visible focus states.

CONTENT RULES
- Never invent reviews, ratings, review counts, stats, years in business, prices, awards or certifications. If a value is missing, write [PLACEHOLDER: what is needed] so it is easy to find before launch.
- Testimonials: use real ones from {{REVIEWS_SOURCE}} or leave 3 placeholder cards.
- Write for a homeowner who needs this fixed. Short sentences. Plain words. Lead with what they are worried about (a bigger bill later, damage to the home, being let down by a contractor who does not show up).
- Every city page needs real local detail (neighborhoods, housing stock, weather or permit quirks) in the Local Knowledge section. If you do not have it, leave a placeholder. Do not write generic filler that swaps the city name.
- Only generate city x service pages for combos in {{PRIORITY_COMBOS}}. Leave the rest out of generateStaticParams until they have unique content.

DELIVERY ORDER
1. Scaffold + config + design tokens + globals.css. Run pnpm build.
2. lib/siteData.ts, lib/brandImages.ts, lib/locationData.ts with the new business data.
3. Header, Footer, HeaderLanding, QuoteForm, useSEO.
4. Homepage.
5. Service hub template + one data entry per service.
6. City page template + one data entry per city.
7. City x service template for the priority combos.
8. Blog template, landing pages, supporting pages.
9. Sitemaps, robots.txt, netlify.toml redirects (ask me for old URLs).
10. Run pnpm build. Fix every error. Then give me a list of every [PLACEHOLDER] left in the code, grouped by file.

Before you write code, list any variable above that is empty or unclear and ask me about it. Do not guess on business facts.
```

---

## Notes for the person running this

- **Fill the variables with the client, not from memory.** The prompt tells the AI to stop and ask on missing facts. That is on purpose.
- **Form fields and pricing approach are the two biggest per trade decisions.** They change conversion more than colors do. Settle them with the account lead before the build.
- **CRM.** The reference build posts to Supermove. For a Fannit client on GoHighLevel, the destination would likely be a GHL inbound webhook. I have not checked current GHL docs for this, so confirm the exact webhook setup with whoever owns GHL at Fannit before building the function.
- **Scale risk.** OTGM generates every city x every service. That is a lot of near duplicate pages. The prompt limits it to priority combos. Push back if a client wants 300 templated pages on day one.
