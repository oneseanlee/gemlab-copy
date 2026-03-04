
Goal: make the entire site mobile-safe at 390px without clipping content or breaking existing layouts, so ads can run confidently.

What broke (exactly)
1) The last edit added `overflow-x: hidden` in:
- `src/App.css` (`#root`)
- `src/index.css` (`html`, `body`)
- page wrappers in:
  `HomePage.css`, `TPrime365Page.css`, `NHTOPage.css`, `UCOSPage.css`, `GLP1BundlePage.css`, `TPrimeAdvertorialPage.css`, `PartnersPage.css`, `UpsellPage.css`, `FreeTestosteroneGuidePage.css`, `PrivacyPolicyPage.css`, `NHTOIntakePage.css`, `ListiclePage.css`
2) Those wrapper-level clamps clipped full-bleed sections and edge-positioned elements instead of fixing root causes.

Implementation plan (safe, staged)
Phase 1 — Remove clipping regressions
- Revert wrapper-level `overflow-x: hidden` added in the files above.
- Remove `overflow-x: hidden` from `#root` in `src/App.css`.
- Remove forced `overflow-x: hidden` from `html/body` in `src/index.css` for now (we’ll only reintroduce global containment if truly needed after source fixes).

Phase 2 — Fix true overflow sources (not symptoms)
- `src/components/SharedFooter/SharedFooter.css`:
  replace full-bleed hack (`width:100vw; left:50%; margin-left:-50vw`) with viewport-safe full width (`width:100%`, no negative margins).
- `src/components/LogoCarousel/LogoCarousel.css`:
  same treatment as footer to prevent edge bleed.
- Hero image over-expansion on mobile:
  - `src/pages/HomePage.css`: mobile override image from `105%` to `100%`.
  - `src/pages/TPrime365Page.css` and `src/pages/PartnersPage.css`: mobile override `max-width:110%` to `100%`.
- Sticky/fixed bars hardening (box model safety):
  ensure fixed bars use `box-sizing:border-box; width:100%; max-width:100%;`
  in:
  `HomePage.css` promo/nav/sticky CTA,
  `GLP1Page.css` sticky CTA,
  `GLP1AdvertorialPage.css` sticky CTA,
  `TPrimeAdvertorialPage.css` sticky CTA,
  `CheckoutPage.css` mobile sticky CTA.

Phase 3 — Route-by-route mobile QA (390px)
Check all routes in app router:
`/`, `/article`, `/tprime365`, `/tprime365-article`, `/glp1-article`, `/glp1-buy`, `/glp1-protocol`, `/nhto`, `/nhto-intake`, `/glp1-intake`, `/tprime365-intake`, `/ucos`, `/glp1-ucos`, `/privacy`, `/terms`, `/returns`, `/partners`, `/guides`, `/free-testosterone-guide`, `/free-testosterone-guide/upgrade`, `/free-testosterone-guide/thank-you`, `/checkout`, `*`.
For each:
- no horizontal scrollbar
- no left/right clipping
- sticky bars fully visible
- CTAs readable and tappable
- tables/carousels either fit or intentionally scroll within component (not page-level overflow)

Phase 4 — Lock-in guardrails
- Add a small reusable “mobile overflow guard” utility rule set (scoped, not blanket clipping) for known problematic components.
- Keep component-level horizontal scrollers (`overflow-x:auto`) for legitimate wide content (comparison tables), and avoid page/container clipping.

Acceptance criteria
- 390px viewport: zero page-level horizontal scrolling on every route.
- No clipped hero text/images, footer, logo strips, sticky CTAs, or promo/nav bars.
- Desktop/tablet layouts remain visually unchanged.
- Checkout and intake flows remain functional end-to-end.

Technical details (implementation notes)
- Avoid using page-wrapper `overflow-x:hidden` as a default strategy.
- Prefer fixing width math at source (100% not 100vw+negative margins in nested layouts).
- For fixed bars, always include box sizing to avoid padding-induced overflow.
- Keep intended horizontal scrolling local to components (tables/carousels), never the whole page.
