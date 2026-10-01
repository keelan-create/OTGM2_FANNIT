# AIV Audit (2026-09-01): Handoff for the live repo

**Purpose:** redo every task below on the **live** repo. Paste this file (or its link) into a new Claude Code session that has push access to the live repo.

- **Live repo (what Netlify deploys):** `FANNIT-Digital-Marketing-Agency/onthegomoving-nextjs`, branch `main`
- **Verified:** Netlify site `on-the-go-moving` (ID `0aef4e19-01b8-4839-9be2-56d3076831a6`). Live deploy on 2026-09-28 was commit `d12f6f5` ("Publish Bellevue move-day handoff guide").
- **Reference implementation:** `keelan-create/OTGM2_FANNIT`, branch `claude/zen-meitner-b0efxv`, PR #5. It was built on an **older, stale copy** of the site. Use it as a pattern, not as a patch. Do NOT copy its business data.
- **Do not push to live `main`.** Work on a branch, open a PR, get a human review. `main` auto-deploys to production.

---

## 0. Before anything else

### Use the live repo's business data (it is newer and correct)

| Field | Live value (use this) | Stale value in PR #5 (do not use) |
|---|---|---|
| HQ address | 14920 NE 95th St, Redmond, WA 98052 | 16625 Redmond Way #M365 |
| HQ geo | 47.6869, -122.1414 | 47.674, -122.1215 |
| Redmond GBP rating | 4.5 stars, 497 reviews | 4.8 stars, 393 reviews |
| Seattle GBP | 4024 13th Ave W, 98119, 4.8 stars, 405 reviews | 397 reviews |
| Bellevue GBP | 4010 140th Ave SE, 98006, 4.8 stars, 163 reviews | same |

Source of truth in live repo: `lib/siteData.ts` (`COMPANY`), `lib/locationData.ts` (`gbp` blocks), live `CLAUDE.md`. Read them first and confirm nothing changed since 2026-10-01.

### Security issue (raise with the repo owner first)

The live repo is **public**. Check its `CLAUDE.md` and Netlify functions for:
- Rapid URL Indexer API key
- Admin dashboard key
- Hardcoded fallback credentials in `netlify/functions/*` (FB CAPI token, Netlify API token, admin key)

If present: make the repo private or remove the values, then rotate every exposed key.

### Broken schema images in live (fix as part of task 2)

Live schema uses `https://onthegomoving.com/wp-content/uploads/2021/01/on-the-go-moving-logo.png` and `.../on-the-go-moving-storage-truck.jpg`. Neither file exists in `public/` and no redirect covers them, so they almost certainly 404. In live, `BRAND_IMAGES.logo` is `/assets/logo.webp` and `BRAND_IMAGES.brandedTruck` is `/assets/branded-truck.webp` (both exist). Schema needs absolute URLs: `https://onthegomoving.com/assets/logo.webp` etc. Same for the founder headshot (`/assets/jason-sexton-headshot.webp` in live).

---

## The tasks (in the order they were done)

### Task 1: Homepage schema (`/`)
Audit: missing WebSite and WebPage. Second unidentified MovingCompany block with a Seattle address.

Do:
- Remove the homepage's second business block (`app/(main)/page.tsx`). In live it uses the **Seattle** address and 405 reviews. That is the "unidentified, Seattle-address" block the audit flagged.
- Add a `WebSite` block sitewide (live removed it). `@id` `https://onthegomoving.com/#website`, `publisher` = Organization by `@id`. **No SearchAction** (no site search exists; Google retired the sitelinks search box in late 2024).
- Add a homepage `WebPage` (`/#webpage`): `isPartOf` WebSite, `about` Organization, `mainEntity` LocalBusiness, all by `@id`.
- Give the homepage FAQPage an `@id` (`/#faq`).

### Task 2: Sitewide: one identified business graph
- Create `lib/schema.ts` (no React imports, so `app/layout.tsx` can import it) with:
  - `ORGANIZATION_SCHEMA` (`/#organization`), `LOCAL_BUSINESS_SCHEMA` (`/#local-business`, HQ, Redmond GBP data), `WEBSITE_SCHEMA` (`/#website`)
  - `ORGANIZATION_REF`, `LOCAL_BUSINESS_REF` (`{ "@id": ... }`)
  - `GBP_URLS` (Redmond, Seattle, Bellevue). Every business entity's `sameAs` = the 3 social profiles plus its own GBP.
  - `buildLocationBusinessSchema(data)`: Seattle and Bellevue get their own LocalBusiness with `@id` `/{slug}/#local-business`, their own GBP review data, `parentOrganization`. All other cities return `LOCAL_BUSINESS_REF`.
- `app/layout.tsx` renders `[ORGANIZATION_SCHEMA, LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA]` server-side. Keep live's other layout changes (font loading script etc.).
- `hooks/useSEO.ts`: `MOVING_COMPANY_SCHEMA = LOCAL_BUSINESS_SCHEMA`. Service `provider` and `CONTACT_POINT_SCHEMA.mainEntity` become `LOCAL_BUSINESS_REF`. Delete unused `buildLocalBusinessSchema()` if still unused.
- `ServicePage.tsx`, `ResidentialMoving.tsx`: Service `provider` = `LOCAL_BUSINESS_REF`.
- `JasonSexton.tsx`: `worksFor` = `{ "@id": "/#organization" }` (live had a LocalBusiness typed node with the Organization `@id`).
- `BlogPost.tsx`: author `worksFor` = Organization ref. `publisher` gets the Organization `@id`.
- `LocationPage.tsx`: Seattle/Bellevue emit their location entity. Every other city emits a `Service` (`/{slug}/#service`, provider = HQ ref) instead of an unidentified business block.
- `CityServiceSubPage.tsx`: emit a `Service` (`/{city}-movers/{service}/#service`) whose provider is `buildLocationBusinessSchema(cityData)`.
- Check: roundup pages (`BestMovingCompanies*.tsx`) carry per-company `schema` objects that are never rendered. Leave them.

### Task 3: `/services/`
Audit: missing Service and BreadcrumbList.
- Create `lib/servicesCatalog.ts` (title, href, description) for every live service page. PR #5 had 16. Re-check live routes, it may have more now.
- `Services.tsx` reads cards from the catalog (UI extras keyed by href).
- `app/(main)/services/page.tsx` renders server-side: `CollectionPage` (`/services/#webpage`), `ItemList` (`/services/#service-list`) of `Service` entities (`@id` `/{slug}/#service`, provider HQ ref, `areaServed` GeoCircle around HQ, `url` = the service's own page), `BreadcrumbList` (Home > Services).
- Service pages give their Service a matching `@id` and `url`.
- HQ `hasOfferCatalog` lists every catalog service by `@id`, plus "Long Distance Moving" (no page, kept by name).
- No FAQPage on `/services/` (the page has no FAQ).

### Task 4: `/about-us/`
Audit: missing AboutPage. Conflicting review figures.
- Server-side in `app/(main)/about-us/page.tsx`: `AboutPage` (`/about-us/#webpage`, `about` + `mainEntity` = Organization ref, `mentions` = founder), `Person` Jason Sexton (`@id` `/jason-sexton/#person`, jobTitle "Founder & Owner", worksFor Organization ref, absolute image URL), `BreadcrumbList` (Home > About Us).
- Remove `AboutUs.tsx`'s second, unidentified Organization block and its client-side schema.
- Review-count copy: PR #5 changed "393 five-star Google reviews" to "393 Google reviews (4.8-star average)" on Home, About, Jason Sexton, Partners and 3 roundup pages. **In live, re-check every review mention against live data (4.5 / 497 for Redmond).** A 4.5 average means "497 five-star reviews" would be false.
- Not done, needs client: LinkedIn for Jason (no URL given), staff count (was "30" in the removed block, unverified).

### Task 5: FAQ: "How much do movers charge per hour in Seattle?"
On `/how-much-do-movers-cost/` (`HowMuchDoMoversCost.tsx`), replace the generic "How much do movers charge per hour?" FAQ with this question. Answer used in PR #5 (market ranges from 2026 web sources, On The Go's own rates stay quote-only):

> Most Seattle movers charge between $100 and $250 per hour. The biggest factor is crew size. A 2-person crew with a truck usually runs about $100 to $180 per hour. A 3-person crew usually runs about $150 to $250 per hour. Rates tend to be higher in summer, on weekends, and at the end of the month, when demand peaks. Seattle traffic, tight parking, and elevator reservations in apartment and condo buildings can also add time to your move.
>
> The hourly rate is only part of the price. Ask every mover what is included. Some companies add travel time fees, fuel surcharges, or charges for blankets, shrink wrap, and packing supplies. Many also have a minimum of 2 to 3 hours. Pianos, safes, and large appliances may cost extra too. These add-ons are how a cheap-looking hourly rate turns into a big bill on moving day.
>
> On The Go Moving & Storage charges by the hour based on crew size. Our rates include the truck, fuel, moving blankets and pads, dollies, and standard valuation coverage. We are licensed (WA HG-064180) and insured. Rates vary by season, availability, and the details of your move, so call us or request a free quote for an exact price.

Also:
- That page emitted FAQPage twice (useSEO + inline). Keep only the inline static one.
- Align the homepage FAQ and `lib/siteData.ts` Seattle cost FAQ to the same 2-person range (was "$100–$200 per hour for a 2-person crew").

### Task 6: FAQ: "How much does it cost to move a 3,000 sq ft house?"
Same page, added before "Do you offer storage with a move?". Numbers come from the page's own pricing table (4+ bedroom: 4–5 movers, 8–12 hrs, $1,200–$2,200+). Re-check the live table first.

> A 3,000 square foot house is usually a 4-bedroom home or larger. For a local move in the Seattle area, On The Go Moving typically sends 4 to 5 movers and 1 or 2 trucks. Most moves this size take 8 to 12 hours and cost about $1,200 to $2,200 or more. Your final price depends on how much you own, how ready you are on moving day, and the access at both homes.
>
> A few things push the cost up on bigger homes. Stairs, long walks from the door to the truck, and tight parking add time. So do pianos, safes, and other heavy items. Packing services and storage between homes are extra. A garage, shop, or basement full of loose items can add hours on its own.
>
> You can bring the cost down. Declutter before the move so you are not paying to move things you will not keep. Pack and label boxes by room before the crew arrives. Take apart beds and tables yourself if you can. Book 4 or more weeks ahead and pick a weekday in the middle of the month when you can.
>
> Our hourly rate includes the truck, fuel, blankets and pads, dollies, and standard valuation coverage. There is no flat stair fee and no fuel surcharge. For a home this size, request a free quote and we will build an estimate around your actual inventory.

Open client question: the table's $1,200 for 4–5 movers over 8–12 hrs is about $150/hr for the crew, below the market range in task 5. Ask for the current 4-person hourly rate and a typical 4-bedroom total.

### Tasks 7 + 8: FAQ: "What are red flags with movers?" / "...with moving companies?"
One FAQ covers both (same intent, avoid two competing answers). Added as the first FAQ on `/15-signs-of-a-worst-moving-company/` (`lib/blogData.ts`, the post had `faqs: []`). Also add `whitespace-pre-line` to the FAQ answer `<p>` in `BlogPost.tsx` so paragraph breaks render.

> Watch for these red flags before you book a mover in Washington.
>
> No license. Every household goods mover working inside Washington needs a permit from the Washington Utilities and Transportation Commission (UTC). You can look up any mover on the UTC website in a few minutes. Interstate movers also need a USDOT number from the FMCSA.
>
> A big payment up front. A mover who wants a large cash deposit, or the full price before the move, may not show up. Reputable movers collect most or all of the payment after the work is done.
>
> A quote that is far below everyone else. A very low phone quote, given without asking about your stuff, often turns into a much bigger bill on moving day. The worst movers load your things and then refuse to unload until you pay a higher price. If one price is far under the rest, ask why.
>
> Nothing in writing. Walk away if a mover will not give you a written estimate, explain how they charge, or hand you a contract before the move starts. Vague answers about fees for stairs, long carries, heavy items, or fuel are a warning sign.
>
> Fuzzy coverage. Ask what happens if something breaks and how claims work. A good mover explains this clearly. A bad one changes the subject.
>
> No real address or track record. Be careful with movers that have no physical address, no professional website, few or no reviews, unresolved complaints with the Better Business Bureau, a pattern of reviews about damage or billing fights, or a recent name change. An unmarked rental truck, or a crew with no uniforms or ID, is another bad sign on moving day.
>
> On The Go Moving & Storage has been moving families and businesses in Seattle and the Eastside since 2009. We are licensed (WA HG-064180, USDOT 2120054) and insured, and we run our own branded trucks out of our Redmond facility with uniformed, background-checked crews. We charge by the hour with no flat stair fee and no fuel surcharge, and we are happy to answer every question before you book.

Dropped from the audit draft: "over 10 years" (it is since 2009) and "family-owned" (not confirmed anywhere on the site).

### Task 9: FAQ: "What are the hidden costs of 2 hour movers?"
Already on `/how-much-do-movers-cost/` in both repos (added 2026-07-17). No change needed. Only re-check it is still there in live.

---

## Rules that applied to every task
- Never use the audit's "generated JSON-LD". It has a Bellevue HQ address, founding year 2013, 162 reviews, 24/7 hours, empty `sameAs`, a fake `?s=` search and `/wp-content/` logo paths.
- No em dashes or semicolons in customer-facing copy. Short sentences. No unverified claims.
- Don't invent stats. Pricing ranges in task 5 are market estimates and need client sign-off.

## Verification checklist (run before opening the PR)
1. `pnpm build` passes and the page count matches live (659 on 2026-09-28).
2. `npx tsc --noEmit` clean.
3. Serve `out/` and load pages in headless Chromium (`/opt/pw-browsers/chromium`). Many pages inject schema client-side, so read `script[type="application/ld+json"]` after load. For each page check: 0 MovingCompany/LocalBusiness nodes without `@id`, 0 `@id` references that don't resolve on the page, exactly 1 FAQPage where FAQs exist.
4. Pages to check: `/`, `/services/`, `/about-us/`, `/jason-sexton/`, `/faq/`, `/contact-us/`, `/how-much-do-movers-cost/`, `/residential-moving/`, `/condo-moving/`, `/warehousing-distribution/`, `/seattle-movers/`, `/bellevue-movers/`, `/redmond-movers/`, `/kirkland-movers/`, `/kirkland-movers/apartment/`, `/bellevue-movers/apartment/`, `/best-moving-companies-seattle/`, `/15-signs-of-a-worst-moving-company/`.
5. Grep for leftovers: `16625 Redmond Way`, `393`, `five-star Google reviews`, `wp-content/uploads`.
6. Diff review: nothing outside schema, FAQ copy and review-count copy changed. Live's own recent work (font loading, hero preloads, new pages) is untouched.
7. After deploy: Google Rich Results Test on `/`, `/services/`, `/about-us/`, `/how-much-do-movers-cost/`, `/seattle-movers/`, `/kirkland-movers/`.

## Open client questions
1. Pricing table on `/how-much-do-movers-cost/` vs market rates (task 6).
2. About timeline line "2021: Reached 1,000 Google reviews" vs today's counts.
3. Opening hours. 7am to 7pm daily is used in schema.
4. Is Long Distance Moving offered? It is in the offer catalog with no page.
5. Jason Sexton's LinkedIn URL, and staff count, if they want them in schema.
6. Staging Professionals page has no Service schema. Add one to match the others?
