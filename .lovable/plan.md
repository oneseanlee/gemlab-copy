# Finish the Partner Site

Goal: turn `/partners` from a stitched-together skeleton (placeholder hero, dead links, mailto form) into a finished, conversion-driven page that matches the medical-clean aesthetic of the rest of the site.

## What's wrong today

1. Hero image is `/placeholder.svg`
2. "Apply Now" opens a `mailto:` — no lead capture, no CRM, no analytics
3. "Log In" link is `href="#"` (dead) — and per memory, Log In was removed sitewide
4. UGC videos are a static 4-up grid with no autoplay/poster — feels dead
5. No scroll animations, no hover polish, no SEO meta — fails the "amazing" bar
6. Hamburger button is decorative only (no mobile drawer)
7. No FAQ, no founder/credibility moment, no asset preview ("what you get")

## Plan

### 1. Real inline application form (replaces mailto)
Add a proper stacked form at `#apply` with: Name, Email, Phone, Company/Brand, Website/Social, Audience size, Promotion channels (multi-select chips), Message. Submit to `public.leads` with `source = 'partners_application'` + UTM persistence, then fire the existing GHL edge function so it lands in CRM with a `partner-application` tag. Show success state inline; do not redirect. Honeypot + 60s rate limit per existing pattern.

### 2. Hero replacement
Generate a premium lab/lifestyle hero image (clinical white, hands-with-vial / lab-bench composition) sized for the bottom-anchored hero pattern. Remove `/placeholder.svg`.

### 3. Navigation cleanup
- Remove dead "Log In" link (matches sitewide auth-removed memory)
- Wire hamburger to a mobile slide-in drawer with the same anchor links
- Sticky CTA "Apply Now" stays

### 4. Motion + polish pass
- Framer Motion fade+slide-up on every section (respect `prefers-reduced-motion`)
- Value cards: hover lift + subtle gradient border on hover
- Product cards: shimmer on commission line
- Commission table: animated count-up on the "You Earn" column when scrolled into view
- UGC videos: muted autoplay on hover, poster frame, tap-to-unmute on mobile

### 5. New sections to round it out
- **"What you'll get" asset kit**: 4 tiles — Tracking link, Swipe copy, Product imagery, Performance dashboard
- **FAQ accordion** (6 Qs): payout cadence, cookie window, allowed channels, brand restrictions, approval timeline, support contact
- **Founder/credibility block**: short paragraph + BHIC publicly-traded badge

### 6. SEO + a11y
- `<Helmet>`: unique title (<60ch), description (<160ch), OG image, canonical, JSON-LD `AffiliateProgram` + `Organization`
- Semantic `<main>`, single `<h1>`, proper `<section aria-labelledby>`
- All new images: alt text, width/height, lazy load

### 7. Cleanup
- Replace inline `style={{}}` with CSS tokens
- Move `@ts-nocheck` off the file (type the props)
- Ensure mobile sticky CTA bar matches other clinical pages

## Files

- `src/pages/PartnersPage.tsx` — restructure, add form + sections, Helmet, motion
- `src/pages/PartnersPage.css` — new section styles, drawer, form, FAQ, hover states
- `src/components/PartnerApplicationForm/PartnerApplicationForm.tsx` — new
- `src/components/PartnerFAQ/PartnerFAQ.tsx` — new (Radix accordion)
- `src/assets/partners-hero.jpg` — generated hero
- Edge function: reuse existing `submit-lead` / GHL pipeline; add `source='partners_application'` handling if needed

## Out of scope (ask before doing)

- Building a real partner dashboard / login portal
- Auto-issuing tracking links (would need affiliate platform like Rewardful/Tapfiliate)
- Changing commission economics or product mix
