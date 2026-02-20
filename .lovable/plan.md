
## Fix: "Component is not a function" Crash

### Root Cause

The error is caused by `src/pages/Home.tsx` — a dead legacy file that is never used by the router but is still parsed by Vite during the build. It imports several old scaffold components:

- `Header/Header.jsx`
- `ProductHero/ProductHero.jsx`
- `AccordionSection/AccordionSection.jsx`
- `BenefitsTimeline/BenefitsTimeline.jsx`
- `ScientificValidation/ScientificValidation.jsx`
- `RitualSection/RitualSection.jsx`
- `RefillBanner/RefillBanner.jsx`
- `StatsSection/StatsSection.jsx`
- `Testimonials/Testimonials.jsx`
- `LogoCarousel/LogoCarousel.jsx`
- `ScrollToTop/ScrollToTop.jsx`

One or more of these old components exports something that is not a valid React component (not a function), causing React to throw `"Component is not a function"` when the Vite module graph evaluates the file.

**`App.tsx` routes `/` to `HomePage.tsx`, not `Home.tsx`.** `Home.tsx` is completely unreachable — it is dead code.

### Evidence

- `App.tsx` has no import of `Home.tsx` anywhere
- `App.tsx` routes `<Route path="/" element={<HomePage />} />` — pointing to `HomePage.tsx`
- `Home.tsx` imports legacy components (e.g. `Header` shows a "GEMLAB" placeholder, `ProductHero` shows old perfume-store scaffold code) that have no relationship to the current Best 365 Labs site
- The crash occurs at the module evaluation level, which is why it produces a blank screen

### Fix

Delete `src/pages/Home.tsx`.

This is the only change needed. No other files are modified. All currently working pages (`HomePage.tsx`, `TPrime365Page.tsx`, etc.) are unaffected because they never imported `Home.tsx`.

### No Functional Changes

- The home page (`/`) continues to work via `HomePage.tsx`
- All other routes are unaffected
- `AnimatedCTA` and `SharedFooter` remain as they are (the `forwardRef` changes are correct)
- No CSS, routing, or component logic is changed
