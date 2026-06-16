## Goal
Produce a new PDF (`site_report_june_mtd_2026.pdf`) covering **Jun 1 – Jun 16, 2026 (today inclusive, UTC)** with a full activity + traffic-source breakdown.

## Sections

1. **Executive summary** — totals for the period: page views, unique visitors, intake leads, checkout leads, intake completions, HappyMD completions, top landing page, top traffic source.

2. **Traffic overview** (from `page_views`)
   - Total page views, unique visitors, active days, avg views/day
   - Daily trend (Jun 1 → today)
   - Top pages by views (with unique-visitor count)
   - Today-only snapshot (views, visitors, top pages)

3. **Traffic sources** (derived from `leads.utm_params` + `checkout_leads.utm_params` + `source` columns, since `page_views` has no referrer)
   - Breakdown by `utm_source` / `utm_medium` / `utm_campaign`
   - Lead count + checkout count per source
   - Landing pages associated with each source (joined via timestamp-adjacent `page_views` where possible, else from `utm_params.landing_page`)
   - Direct vs paid vs organic bucket
   - Note clearly that anonymous page-view traffic has no referrer captured, so source attribution is based on leads that submitted with UTM params

4. **Leads activity (Jun 1 – today)**
   - Intake leads: count, by `source` page, with names/emails/phones
   - Checkout leads: count, by `source`, cart totals, completion status
   - Intake completions and HappyMD completions counts

5. **Conversion funnel** — Page views → Leads → Checkout leads → Completions, with rates.

## Technical
- Pull data via `psql` for the window `created_at >= '2026-06-01' AND created_at < '2026-06-17'` (UTC).
- Filter test emails using the same `TEST_EMAIL_PATTERNS` regex set used in `admin-dashboard-data`.
- Build with `reportlab` (matches prior v3 report style); save to `/mnt/documents/site_report_june_mtd_2026.pdf`.
- QA: render each page to image with `pdftoppm`, inspect for clipping/overflow, fix, then deliver.

## Caveat to surface in the PDF
`page_views` only stores `page_path` + `visitor_id` (no referrer/UTM), so "where is traffic coming from" is answered from UTM params attached to leads + landing-page distribution. If you want true per-visit source attribution going forward, we'd need to add a `referrer` / `utm_*` column to `page_views` (separate task).
