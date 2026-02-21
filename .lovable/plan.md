

## One-Time Offer Upsell Page

**Route:** `/free-testosterone-guide/upgrade`

### What Gets Built

A standalone, no-nav upsell page that appears after the free guide opt-in. Dark theme, mobile-first, with a 15-minute countdown timer creating urgency. The page sells "The Complete Testosterone Optimization Vault" (8 guides for $29 vs $197).

### Page Sections (top to bottom)

1. **Green confirmation bar** -- "Your Free Guide Is On Its Way!" + one-time offer teaser
2. **Headline block** -- Gold "ONE-TIME OFFER" badge, Playfair Display headline, subheadline, countdown timer (15:00 functional JS countdown with gold digits)
3. **Product grid** -- 8 ebook mockups in 2x4 desktop / 1-col mobile grid (styled div cards with gradient backgrounds and white title text), each with a 1-line description
4. **Value stack** -- Dark card with gold checkmarks listing all 8 guides + bonus community access, individual values, ~~$197~~ strikethrough, large gold $29
5. **Primary CTA** -- Gold/amber gradient button ("YES -- GIVE ME THE COMPLETE VAULT FOR $29"), secure checkout note below
6. **Skip link** -- Subtle gray "No thanks, I just want my free guide" linking to `/free-testosterone-guide/thank-you`
7. **Dr. Steven Warren authority section** -- Dark card with left gold accent border
8. **60-Day Guarantee** -- Shield icon + guarantee copy
9. **Minimal footer** -- FDA disclaimer, copyright, privacy/terms links

### Technical Details

**New files:**
- `src/pages/UpsellPage.tsx` -- Full page component with countdown timer using `useState`/`useEffect`, scroll-reveal animations via existing `useScrollReveal` hook
- `src/pages/UpsellPage.css` -- All styles using existing design tokens (`--b365-*`, `--space-*`, `--font-title`, `--font-body`, etc.)

**Modified files:**
- `src/App.tsx` -- Add route: `<Route path="/free-testosterone-guide/upgrade" element={<UpsellPage />} />`

**New route needed:**
- `/free-testosterone-guide/thank-you` -- Simple thank-you page (minimal, just confirms the free guide is coming). Added as a basic component in the same pass.

**Countdown timer:**
- Functional component using `useState(900)` (15 min in seconds) and `useEffect` with `setInterval`
- Displays as `MM:SS` in large gold/amber styled digits
- Stops at `00:00`

**CTA button:**
- Gold gradient (`#D4A843` to `#B8922E`), logs click to console (payment integration later)

**Styling approach:**
- Dark theme background (`--b365-navy` / `--b365-gray-900`)
- All text in white/light variants
- Gold accent color for badge, timer, checkmarks, CTA, and Dr. Warren card border
- Uses existing design tokens, font families, spacing scale, and animation system
- Scroll-reveal animations on sections using existing `useScrollReveal` hook
- Mobile-first with breakpoints at 480px, 768px, 1024px per site standard

