

# TPrime365 High-Conversion Redesign

This is a comprehensive conversion optimization of the TPrime365 landing page. The premium medical aesthetic stays intact -- we're layering direct-response conversion mechanics underneath.

## Changes Overview

### 1. Sticky Floating CTA Bar
- **Desktop**: Slim bar pinned below the navbar with "TPrime365 -- $149/month" on the left and "Start Your Optimization" button on the right
- **Mobile**: Fixed bottom bar with full-width CTA "Start Your Optimization -- $149/mo"
- Appears only after the user scrolls past the hero section (via IntersectionObserver, not scroll listeners)
- Respects `env(safe-area-inset-bottom)` for iOS home indicator
- Links to `#process` (same as existing CTAs)

### 2. Hero Section Enhancements
- Add mini social proof line below the price: "50,000+ clients served / FDA-registered 503A pharmacy / 100% money-back guarantee"
- Add dynamic urgency line: "[Current Month] pricing locks in at $149/month -- offer subject to change" (uses `new Date().toLocaleString()` for dynamic month)
- Add secondary ghost button: "See How It Works" that smooth-scrolls to `#process`
- Keep existing headline, image, price, and guarantee text as-is

### 3. Page Section Reorder
New order from top to bottom:

```text
 1. Promo Banner (as-is)
 2. Navigation (as-is)
 3. Hero (enhanced)
 4. "3 Simple Steps" / #process (already moved here)
 5. "Traditional Solutions Are Broken" (as-is)
 6. Ingredient Breakdown (as-is)
 7. "The Science Behind Each Pillar" (as-is)
 8. NEW: Mid-Page Conversion Block #1
 9. "Why Sublingual Changes Everything" (as-is)
10. NEW: "Why We Win" Competitive Strip
11. "Built For Men Who Want More" (as-is)
12. "What You'll Experience" (as-is)
13. NEW: Mid-Page Conversion Block #2 (Value Stack + CTA)
14. "Real Men. Real Results." UGC videos (as-is)
15. Comparison Table (moved here, was section 10)
16. "Simple Daily Routine" (as-is)
17. "Pharmaceutical-Grade Standards" (as-is)
18. "Important Safety Information" (as-is)
19. FAQ (as-is)
20. Final CTA (as-is, button text updated to "Order Now -- Risk Free")
21. Footer (as-is)
```

### 4. Mid-Page Conversion Block #1 (after Science section)
- Dark blue gradient background (same as final CTA)
- Centered: "Ready to Optimize?" headline, $149/month price, "Includes everything" subtext
- Green guarantee line, white inverted CTA button: "Get Started Risk-Free"
- Trust points below: "Licensed physician reviews every order / Cancel anytime / Discreet packaging"

### 5. "Why We Win" Competitive Strip (after Sublingual section)
- Light blue/gray background
- Headline: "Why Men Choose TPrime365 Over The Rest"
- 5 horizontal badge cards (responsive -- stack on mobile):
  - "Only Sublingual Delivery" / "4-in-1 Formula" / "Fertility Preserved" / "$149 vs $199+" / "Longevity Built In"
- Each with a Lucide icon and subtitle
- "See Full Comparison" link that scrolls to `#compare`

### 6. Mid-Page Conversion Block #2 (after Benefits section)
- White background with the existing value stack card duplicated here
- Headline: "$149 = Premium Formula + Expert Care"
- Full line-item value breakdown (same data as existing value stack)
- Prominent CTA: "Claim Your Formula -- $149/mo"
- Guarantee reinforcement text below

### 7. Social Proof Toast Notifications
- Subtle toast appearing every 35-45 seconds (randomized), auto-dismisses after 4 seconds
- Rotates through 10 messages (US state-based: "A man from Texas just started his optimization", etc.)
- Desktop: bottom-left corner. Mobile: top of screen (avoids sticky bar conflict)
- Slide-in animation with fade-out, dismiss button
- Respects `prefers-reduced-motion`
- Proper cleanup on unmount

### 8. Varied CTA Button Copy
Each CTA location gets unique copy to reduce banner blindness:
- Hero primary: "Start Your Optimization"
- Hero secondary: "See How It Works"
- Sticky bar desktop: "Start Your Optimization"
- Sticky bar mobile: "Start Your Optimization -- $149/mo"
- Mid-Page Block #1: "Get Started Risk-Free"
- Why We Win strip: "See Full Comparison"
- Mid-Page Block #2: "Claim Your Formula -- $149/mo"
- Final CTA: "Order Now -- Risk Free"

### 9. Existing Value Stack Section
- The value stack that currently lives at section 11 moves into Mid-Page Block #2 (section 13)
- The standalone value stack section is removed to avoid duplication

### 10. Mobile / Accessibility
- All CTA buttons: minimum 48px touch targets on mobile
- Sticky bar uses `env(safe-area-inset-bottom)` for iOS
- Social proof toasts at TOP on mobile, bottom-left on desktop
- "Why We Win" strip stacks vertically on mobile
- All mid-page blocks full-width with generous padding on mobile
- Animations respect `prefers-reduced-motion`
- IntersectionObserver for sticky bar (no scroll listeners)

## Technical Details

### Files Modified

**`src/pages/TPrime365Page.tsx`** (major restructure):
- Add new imports: `useEffect`, `useRef`, `useCallback`
- Add state for sticky bar visibility, social proof toast
- Add IntersectionObserver ref on hero section
- Add social proof toast interval logic with cleanup
- Restructure JSX section order per the spec above
- Add 3 new section blocks (Mid-Page #1, Why We Win strip, Mid-Page #2)
- Add sticky CTA bar JSX
- Add social proof toast JSX
- Move comparison table after UGC videos
- Remove standalone value stack section (now part of Mid-Page #2)

**`src/pages/TPrime365Page.css`** (new styles):
- `.tprime-sticky-bar` -- sticky CTA bar (desktop top, mobile bottom)
- `.tprime-midpage-cta` -- dark blue conversion block
- `.tprime-why-win-strip` -- competitive badges strip
- `.tprime-midpage-value` -- value stack conversion block
- `.tprime-social-toast` -- social proof notification card
- `.tprime-ghost-btn` -- secondary ghost button style for hero
- `.tprime-hero-trust-line` -- mini social proof line in hero
- `.tprime-urgency-line` -- subtle urgency text
- Responsive rules for all new elements at 1024px, 768px, and 480px breakpoints

### No Changes To
- Product data, ingredients, dosages, pricing, clinical claims
- Compliance/safety/disclaimer language
- FAQ content, footer, promo banner
- Video testimonials, 3-step process, dosing instructions, trust badges, safety section
- Visual design system (colors, typography, spacing tokens)
- AnimatedCTA component
- Any other pages

