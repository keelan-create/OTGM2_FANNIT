# On The Go Moving & Storage — AI Context File

> **Read this first.** This file gives any AI assistant (Claude, GPT, Gemini, etc.) everything needed to work on this codebase without asking basic questions. It is the single source of truth for site architecture, SEO rules, integrations, and completed work.

---

## Site Overview

**Company:** On The Go Moving & Storage  
**Website:** https://onthegomoving.com  
**Business:** Seattle-area moving company, headquartered in Redmond, WA. Serves 30+ cities on the Eastside and greater Seattle area. Founded 2009. Licensed (HG-064180), USDOT 2120054. Rated 4.8 stars across 393 Google reviews.  
**Phone:** (425) 761-8500  
**Email:** booking@onthegomoving.com  
**Address:** 16625 Redmond Way #M365, Redmond, WA 98052

---

## Technical Stack

| Item | Detail |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript + Tailwind CSS |
| Package manager | pnpm |
| Node version | 20 (set in netlify.toml) |
| Build command | `pnpm build` |
| Output directory | `out/` |
| Hosting | Netlify — auto-deploys from GitHub `main` branch |
| GitHub repo | `kenei631-cmd/onthegomoving-nextjs` |
| Netlify site name | `on-the-go-moving` |
| Netlify site ID | `0aef4e19-01b8-4839-9be2-56d3076831a6` |
| CRM | Supermove (via Netlify Functions) |
| Analytics | Google Tag Manager — container `GTM-5PJR9KN` |
| B2B intent tracking | ZoomInfo WebSights token `c8c68de84b1771438309` (fires via GTM on all pages) |
| FB Pixel | `129153980771695` (fires on FB landing pages and via GTM) |
| Google Search Console | Verified via `public/google02af1515652842c6.html` |

---

## Workflow: How to Make Changes

1. Edit files in the local project (or clone from GitHub)
2. Run `pnpm build` to verify the build passes before committing
3. Commit and push to `main` — Netlify auto-deploys within 2–5 minutes
4. For any **new public page**: add it to `public/sitemap.xml` AND the HTML sitemap (`components/pages/SitemapPage.tsx`)
5. After a new page is live on Netlify, submit it to Rapid URL Indexer (see section below)

---

## Key Files Map

### Data / Content
| File | Purpose |
|---|---|
| `lib/siteData.ts` | Global company info (`COMPANY`), nav, services list, FAQs, testimonials, stats |
| `lib/locationData.ts` | All 36 city location pages — each entry is a `LocationData` object with slug, title, meta, FAQs, nearby cities |
| `lib/blogData.ts` | All 118 blog posts and content pages — `POSTS_DATA` record keyed by slug |
| `lib/blogPosts.ts` | Lightweight blog index (title, slug, date, category) used for blog listing page |
| `lib/brandImages.ts` | **Every image URL used on the site lives here.** Never hardcode image URLs in components. |
| `lib/tierAContent.ts` | Deep, page-specific content for 310 city × service combinations (named buildings, hyper-local FAQs, pricing notes) |

### Components
| File | Purpose |
|---|---|
| `components/QuoteForm.tsx` | Single shared quote form used on every page — update once, updates everywhere |
| `components/pages/LocationPage.tsx` | Renders all 36 city location pages |
| `components/pages/BlogPost.tsx` | Renders all blog posts and content pages |
| `components/pages/CityServiceSubPage.tsx` | Renders `/{city}-movers/{service}/` sub-pages |
| `components/pages/Home.tsx` | Homepage |
| `components/pages/BestMovingCompaniesSeattle.tsx` | `/best-moving-companies-seattle/` roundup page |
| `components/pages/BestMovingCompaniesBellevue.tsx` | `/best-moving-companies-bellevue/` roundup page |
| `components/pages/BestMovingCompaniesRedmond.tsx` | `/best-moving-companies-redmond/` roundup page |
| `components/pages/landing/` | All landing pages (FB paid, social organic, quote, storage, etc.) |

### SEO / Config
| File | Purpose |
|---|---|
| `hooks/useSEO.ts` | Global SEO hook — sets `<title>`, `<meta description>`, canonical, JSON-LD schema, OG tags. Also exports `MOVING_COMPANY_SCHEMA` and `buildFAQSchema` |
| `app/layout.tsx` | Root HTML layout — GTM head/body snippets live here |
| `public/sitemap.xml` | XML sitemap — manually maintained, must be updated for every new page |
| `public/robots.txt` | Disallows `/admin/`, `/api/`, `/thank-you-get-a-quote-services/` |
| `netlify.toml` | Build config, Node/pnpm versions, Netlify Functions path, 301 redirects, image CDN config |

### Netlify Functions (Serverless)
| File | Purpose |
|---|---|
| `netlify/functions/submit-lead.js` | Main quote form handler: writes to MySQL DB, posts to Supermove, fires FB CAPI |
| `netlify/functions/submit-fb-lead.js` | FB landing page form handler: same as above but FB-specific payload |
| `netlify/functions/get-leads.js` | Admin dashboard data endpoint (protected by `ADMIN_DASHBOARD_KEY`) |
| `netlify/functions/supermove-webhook.js` | Receives Supermove status updates and syncs back to DB |
| `netlify/functions/backfill-supermove.js` | One-time utility to backfill old leads to Supermove |

---

## Routing Architecture

The site uses Next.js App Router with a `(main)` route group for all public pages.

**Dynamic routes:**
- `app/(main)/[cityMovers]/page.tsx` — handles both city location pages (from `LOCATION_DATA`) and blog posts (from `POSTS_DATA`) at the root level
- `app/(main)/[cityMovers]/[serviceKey]/page.tsx` — handles `/{city}-movers/{service}/` city × service sub-pages

**Static routes:** All other pages have dedicated folders under `app/(main)/` (e.g., `app/(main)/residential-moving/`, `app/(main)/best-moving-companies-seattle/`)

**Landing page route groups:**
- `app/(main)/get/` — organic and paid landing pages (residential movers, commercial, storage, social, same-day, quote)
- `app/(landing-fb)/get/fb-residential-movers/` — FB paid traffic landing page (isolated layout, has FB pixel)

**How to add a new page:**
- **New blog post or content page:** Add an entry to `lib/blogData.ts` — it automatically gets a route via the `[cityMovers]` dynamic route
- **New city location page:** Add an entry to `lib/locationData.ts` — same dynamic route handles it
- **New standalone page:** Create `app/(main)/your-page-slug/page.tsx` and a corresponding component in `components/pages/`

---

## SEO Rules — MUST FOLLOW

### Keyword targeting
- **Homepage (`/`)** is the target page for the keyword **"Seattle Movers"**
- ALL "Seattle Movers" anchor text links anywhere on the site must point to `/` — **never** to `/seattle-movers/`
- `/seattle-movers/` is intentionally deoptimized as a hub page (no service keyword targeting)

### Schema markup
- Schema `url` fields must reflect **the page they live on** — not the homepage, not the GBP URL
- Every page needs: unique `<title>`, `<meta description>`, canonical tag, and JSON-LD schema
- Use `useSEO()` hook from `hooks/useSEO.ts` for all pages
- `MOVING_COMPANY_SCHEMA` from `useSEO.ts` is the global LocalBusiness schema — import and include it on every page

### Canonical tags
- Canonical format: `https://onthegomoving.com/{slug}/` (always trailing slash, always full URL)
- Blog posts set their canonical in `app/(main)/[cityMovers]/page.tsx` via Next.js metadata

### Internal links
- Always use relative paths: `/page-slug/` — never absolute `https://onthegomoving.com/...`
- Exception: schema `url` and `canonical` fields always use the full absolute URL

### Google Business Profile URLs (for schema `sameAs`)
- Redmond GBP: `https://share.google/wz8Px2cowaHkprOAM`
- Seattle GBP: `https://share.google/kOvPFtNuCbovRUD7T`
- Bellevue GBP: `https://share.google/XHG6IkLTLEFsNBk10`

---

## Image Hosting Rules

- **All brand/crew photos** use CloudFront CDN: `https://d2xsxph8kpxj0f.cloudfront.net/310519663327875635/AXcVm6gUw3wWRnzjKLx4pb/` — these are permanent, do not change
- **7 self-hosted assets** live in `public/assets/` and are referenced as `/assets/filename`:
  - `hero-video.mp4` — homepage hero background video
  - `jason-sexton-headshot.jpg` — founder headshot (used in schema and Jason Sexton page)
  - `bennett-foundation.png`, `march-for-babies.png`, `march-of-dimes.png`, `seattle-childrens.png`, `girl-scouts.png` — partner logos on `/partners/`
- **Every image URL must be registered in `lib/brandImages.ts`** — never hardcode image URLs directly in components
- Do NOT use Manus CDN (`files.manuscdn.com`) — the site must remain self-contained

---

## Lead Form & CRM Integration

### Quote form flow
1. User submits `QuoteForm.tsx`
2. Client-side: validates 10-digit US phone (foreign numbers rejected with friendly error)
3. Posts to `/.netlify/functions/submit-lead`
4. Function: sanitizes phone (strips non-digits, removes leading `1`), sanitizes name (strips leading non-alpha chars)
5. Writes lead to MySQL `leads` table
6. Posts to Supermove via `SUPERMOVE_WEBHOOK_URL` env var
7. Fires Facebook Conversions API (server-side) in parallel

### Supermove payload structure
```json
{
  "project_type": "Residential",
  "client": { "primary_contact": { "full_name": "...", "email": "...", "phone_number": "10digits" } },
  "jobs": [{ "job_type": "Local Move", "date": "YYYY-MM-DD", "locations": [{"address": "fromZip"}, {"address": "toZip"}], "note_from_customer": "..." }],
  "referral_source": "Custom Website via A Supermove-Managed Integration",
  "tags": ["SOCIAL_MEDIA_LEAD"]  // only on social landing page leads
}
```

### Social landing page tag
- `/get/social-residential-movers/` passes `sourceLabel: "landing-social-residential-movers"` in the form payload
- `submit-lead.js` detects this label and adds `"SOCIAL_MEDIA_LEAD"` to the Supermove `tags` array

### Admin leads dashboard
- URL: `https://onthegomoving.com/admin/leads/?key=otgm-admin-2025`
- Protected by session key — enter `otgm-admin-2025` when prompted
- Shows all leads, webhook status, retry button for failed Supermove syncs

### Netlify environment variables (already set on the live site)
| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL connection string for leads table |
| `SUPERMOVE_WEBHOOK_URL` | Supermove standard website endpoint |
| `JWT_SECRET` | Session signing |
| `NODE_ENV` | `production` |

**Note:** `FB_CAPI_ACCESS_TOKEN`, `NETLIFY_API_TOKEN`, `NETLIFY_FORM_ID`, and `ADMIN_DASHBOARD_KEY` are optional — the functions fall back to hardcoded defaults if not set.

---

## Netlify Configuration

- **Build:** `netlify.toml` — `pnpm build`, publish `out/`, functions in `netlify/functions/`
- **Node version:** 20, pnpm version: 9
- **Image CDN:** Netlify image CDN enabled for CloudFront domain (`d2xsxph8kpxj0f.cloudfront.net`)
- **301 redirects:** ~200+ rules in `netlify.toml` covering old WordPress URLs, pruned blog posts, city-service URL restructures
- **`robots.txt`:** Disallows `/admin/`, `/api/`, `/thank-you-get-a-quote-services/`

---

## Rapid URL Indexer

Used to accelerate Google indexing of new pages.

- **API key:** `zBBuKsBknYQ2Mx4swHv4pPfftXV38Sqf`
- **Base URL:** `https://rapidurlindexer.com/wp-json/api/v1`
- **Auth header:** `X-API-Key: zBBuKsBknYQ2Mx4swHv4pPfftXV38Sqf`
- **Credits remaining:** ~1,109 (as of June 2026) — check balance before submitting
- **Cost:** 1 credit per URL (standard mode)
- **When to use:** Submit all new public pages after they are confirmed live on Netlify

**Relevant past projects (On The Go Moving only):**
| Project ID | Description | Status |
|---|---|---|
| 959029 | Home Improvement Blog Post | submitted |
| 861675 | Best Movers Comparison Pages (Bellevue + Redmond + Seattle) | completed |
| 841000 | Best Moving Companies Seattle | completed |
| 823437 | Full Site Launch | refunded (credits returned) |

---

## Pages Built — Do Not Recreate

### Roundup / comparison pages
- `/best-moving-companies-seattle/` — 10 companies, schema, cross-links to Bellevue/Redmond
- `/best-moving-companies-bellevue/` — 10 companies, full LocalBusiness schema
- `/best-moving-companies-redmond/` — 10 companies, On The Go HQ angle, full schema

### Blog posts
- `/best-home-improvement-contractors-seattle/` — New Life Rockeries is #1, two followed links to `https://newliferockeries.com`, full NAP included

### Landing pages
- `/get/social-residential-movers/` — noindex, GTM only (no FB pixel), tags leads as `SOCIAL_MEDIA_LEAD` in Supermove
- `/get/residential-movers/` — organic residential movers landing page
- `/get/fb-residential-movers/` — FB paid traffic landing page (isolated layout, has FB pixel)
- `/get/commercial-moving/` — commercial moving landing page
- `/get/storage-services/` — storage services landing page
- `/get/same-day-movers/` — same-day movers landing page
- `/get/quote/` — generic quote landing page

### Utility pages (noindex)
- `/moving-cost-breakdown/` — noindex, follow — used for email/home-sale outreach
- `/admin/leads/` — internal leads dashboard (protected)

---

## Completed SEO Work (Do Not Undo)

1. **"Seattle Movers" anchor text** — All "Seattle Movers" links across the site point to `/` (homepage), not `/seattle-movers/`. This is intentional. Files affected: `lib/siteData.ts`, `BlogPost.tsx`, `HowMuchDoMoversCost.tsx`, `BestMovingCompaniesSeattle.tsx`, `LocationPage.tsx`.

2. **Schema `url` fields** — Schema `url` fields on all pages point to the page they live on (best practice). Do not change them to point to the homepage or GBP URL.

3. **GBP URLs in schema** — `MOVING_COMPANY_SCHEMA` in `hooks/useSEO.ts` includes Redmond GBP URL in `sameAs`. Individual city pages (Bellevue, Seattle) have their respective GBP URLs in their page-level schema.

4. **Schema `description` field** — `MOVING_COMPANY_SCHEMA` has a `description` field: "On The Go Moving & Storage is Seattle's most trusted local moving company..."

5. **Netlify redirect fix** — The incorrect redirect `/moving-snoqualmie/ → /residential-moving/` has been removed from `netlify.toml`.

6. **Phone validation** — `QuoteForm.tsx`, `submit-lead.js`, and `submit-fb-lead.js` all validate/sanitize phone numbers to 10-digit US only.

7. **Name sanitization** — `submit-lead.js` and `submit-fb-lead.js` strip leading non-alpha characters from names (prevents `": "` prefix spam).

8. **ZoomInfo WebSights** — Installed via GTM Custom HTML tag (token `c8c68de84b1771438309`). Fires on all pages via GTM container `GTM-5PJR9KN`.

9. **Google Search Console** — Verification file at `public/google02af1515652842c6.html`.

10. **Self-hosted assets** — All 7 assets previously on Manus CDN are now in `public/assets/`. No external CDN dependencies remain.

---

## Things to Never Change

| Rule | Reason |
|---|---|
| CloudFront CDN URLs in `brandImages.ts` | Permanent CDN — these are the real brand photos |
| Schema `url` fields pointing to own-page URLs | SEO best practice — do not redirect them to homepage |
| `trailingSlash: true` in `next.config.js` | All URLs have trailing slashes — changing this breaks all existing indexed URLs |
| `/seattle-movers/` deoptimization | Intentional — homepage targets "Seattle Movers", not this page |
| `output: 'export'` in `next.config.js` | Static export required for Netlify — do not change to SSR |
| `config.optimization.minimize = false` in webpack | Workaround for Next.js 15.3.x SWC minifier bug — do not remove |
| Supermove payload structure | `locations` uses `{address: zip}` format — do not change to `zip_code` |

---

## Content Patterns

### Adding a new blog post
1. Add entry to `lib/blogData.ts` under `POSTS_DATA` with all required fields (slug, title, metaTitle, metaDescription, date, dateISO, category, readTime, author, heroImage, intro, sections, faqs, relatedServiceHref, relatedServiceLabel)
2. Add to `lib/blogPosts.ts` for the blog listing page
3. Add to `public/sitemap.xml`
4. Submit to Rapid URL Indexer after it's live

### Adding a new city location page
1. Add entry to `lib/locationData.ts` under `LOCATION_DATA`
2. Add to `public/sitemap.xml` (city page + all service sub-pages)
3. Submit to Rapid URL Indexer

### Adding a new standalone page
1. Create `app/(main)/your-slug/page.tsx` with Next.js metadata export
2. Create `components/pages/YourPage.tsx` with `useSEO()` hook
3. Add to `public/sitemap.xml` and `components/pages/SitemapPage.tsx`
4. Add to footer nav if appropriate
5. Submit to Rapid URL Indexer

---

## Manus Webdev Project (Separate from Next.js Repo)

There is a separate Manus-managed webdev project at `/home/ubuntu/onthegomoving/` that runs a tRPC + MySQL backend. This project:
- Hosts the **leads database** (MySQL, managed by Manus)
- Provides the **admin leads dashboard** backend
- Is **not** the same as the Next.js static site — it's a companion backend

The Next.js static site (`/home/ubuntu/nextjs-local/`) calls Netlify Functions which connect to this MySQL database via `DATABASE_URL`.

---

## Last Updated

June 24, 2026 — Latest commit: `99a55fc` ("Replace all Manus CDN URLs with self-hosted /assets/ files for Netlify handoff")
