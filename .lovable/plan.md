
# Design System Audit and Standardization

## Current State Summary

The codebase has grown organically across 15+ CSS files with no centralized design system. There are significant inconsistencies in every category audited. Below is the full audit followed by the proposed unified system and every fix required.

---

## 1. SPACING

**Problem:** Random spacing values used throughout. No consistent scale.

**Found values (sampling):**
- Padding: 4px, 6px, 8px, 10px, 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 56px, 64px, 80px, 96px
- Gaps: 6px, 8px, 10px, 12px, 14px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 64px
- Margins: 4px, 6px, 8px, 10px, 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 40px, 48px

**Proposed scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96

**CSS custom properties to add:**
```text
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-6: 24px;  --space-8: 32px;
--space-12: 48px; --space-16: 64px; --space-24: 96px;
```

**Fixes needed:**
- 6px gaps/padding -> 8px (nearest scale value)
- 10px padding -> 8px or 12px depending on context
- 14px -> 12px or 16px
- 18px -> 16px
- 20px padding -> 24px (or 16px in tight contexts)
- 28px gaps -> 24px or 32px
- 36px -> 32px
- 40px -> 48px (or 32px)
- 56px -> 48px or 64px
- 80px -> 64px or 96px

---

## 2. COLOR TOKENS

**Problem:** Two competing color systems -- Tailwind/shadcn HSL variables in `index.css` AND custom hex `--b365-*` variables in `OceanRaysPage.css`. Plus many hardcoded hex values scattered throughout.

**Hardcoded colors found off-palette:**
- `#213547` (body text in index.css, not in any token)
- `#b8ccde` (hero background, inline)
- `#1E8FBF` (gradient endpoint in power-up section)
- `#EF4444` (negative/error red, hardcoded)
- `#16a34a` / `#15803d` (green buttons in GuidesPage, not using `--b365-green`)
- `#b8860b` (gold in NHTOPage)
- `#ff6b6b` (red in BenefitsTimeline)
- `rgba(0,0,0,...)` various opacity blacks used inconsistently
- `#1a1a1a`, `#333`, `#666`, `#888` (assorted grays, not in tokens)
- `#e8e8e8`, `#ddd`, `#eee`, `#f5f5f5` (light grays in various components)

**Proposed consolidated palette (added to `:root` in index.css):**
```text
/* Brand */
--b365-blue: #3376b0;
--b365-blue-dark: #2a6191;
--b365-blue-light: #b8ccde;
--b365-navy: #0A1628;

/* Neutrals */
--b365-white: #FFFFFF;
--b365-gray-50: #F9FAFB;
--b365-gray-100: #F5F7FA;
--b365-gray-200: #E5E9F0;
--b365-gray-400: #9CA3AF;
--b365-gray-500: #5A6578;
--b365-gray-900: #0F1724;

/* Semantic */
--b365-green: #22C55E;
--b365-green-dark: #16a34a;
--b365-red: #EF4444;
--b365-gold: #b8860b;
```

**Fixes needed:**
- Replace all `#16a34a` with `var(--b365-green-dark)`
- Replace all `#EF4444` with `var(--b365-red)`
- Replace `#b8860b` with `var(--b365-gold)`
- Replace `#1a1a1a` and `#333` with `var(--b365-gray-900)`
- Replace `#666` with `var(--b365-gray-500)`
- Replace `#eee`, `#f5f5f5` with `var(--b365-gray-100)`
- Consolidate `--b365-gray` and `--b365-border` aliases
- Move all `--b365-*` tokens from `OceanRaysPage.css` to `index.css` so every page inherits them

---

## 3. TYPOGRAPHY SCALE

**Problem:** Three different font families referenced inconsistently.

**Font families found:**
- `'Playfair Display', Georgia, serif` -- used for headings in b365 pages
- `'Plus Jakarta Sans', sans-serif` -- used for body in b365 pages
- `'Zalando Sans Expanded'` -- declared in `index.css` as `--font-title`
- `'Rethink Sans'` / `'Open Sans'` -- declared in `index.css` as `--font-body`
- `'Inter'` -- referenced in Header.css comment

The `index.css` global declares Zalando/Rethink as the site fonts, but every single page CSS file overrides with Playfair/Plus Jakarta. These two systems conflict.

**Font sizes found (headings):**
- h1: 52px, 48px, 44px, 38px, 34px, 32px, 28px (varies by page/breakpoint)
- h2: 42px, 38px, 36px, 30px (varies)
- h3: 24px, 22px, 20px, 19px, 18px, 17px, 15px (wildly inconsistent)
- h4: 20px, 18px, 17px, 15px, 14px, 12px
- Body: 17px, 16px, 15px, 14px, 13px, 12px, 11px

**Proposed type scale:**
```text
--text-display: 48px;   /* Hero h1 */
--text-h1: 42px;         /* Section headings */
--text-h2: 32px;         /* Sub-section headings */
--text-h3: 24px;         /* Card headings */
--text-h4: 18px;         /* Small headings */
--text-body: 16px;       /* Default body */
--text-body-sm: 14px;    /* Secondary body */
--text-caption: 12px;    /* Labels, captions */
--text-micro: 11px;      /* Tags, badges */
```

**Fixes needed:**
- Decide on ONE font pairing (recommend Playfair Display + Plus Jakarta Sans since that's used on every customer-facing page)
- Remove Zalando/Rethink from `index.css` globals OR keep only for admin pages
- Standardize all h1 to `--text-display` (48px desktop, 32px mobile)
- Standardize all h2 to `--text-h1` (42px desktop, 30px mobile)
- Standardize all h3 to `--text-h3` (20-24px)
- Fix `guide-card-body h3` from 19px to 20px
- Fix random 17px subhead text to 16px
- Fix random 15px body text to 14px or 16px
- Fix random 13px body text to 12px or 14px

---

## 4. BORDER RADIUS

**Problem:** At least 8 different radius values used.

**Found values:** 4px, 8px, 10px, 12px, 14px, 16px, 20px, 24px, 25px, 9999px (pill), 50% (circle)

**Proposed system (3 values + special):**
```text
--radius-sm: 8px;       /* Small elements: tags, badges, icon wraps */
--radius-md: 14px;      /* Cards, containers */
--radius-lg: 24px;      /* Hero containers, large cards */
--radius-full: 9999px;  /* Pills, buttons */
--radius-circle: 50%;   /* Avatars, dots */
```

**Fixes needed:**
- 4px ribbon radius -> 8px (`--radius-sm`)
- 10px table-wrap mobile -> 8px (`--radius-sm`)
- 12px icon-wrap -> 8px (`--radius-sm`) or 14px (`--radius-md`)
- 15px RefillBanner -> 14px (`--radius-md`)
- 16px benefit-card, table-wrap -> 14px (`--radius-md`)
- 20px product-card, testimonial-card, stat-card, guide-card -> 14px (`--radius-md`) -- all card types should match
- 25px RefillBanner button -> `--radius-full`

---

## 5. SHADOW SYSTEM

**Problem:** Over 20 unique box-shadow declarations. No consistency.

**Found values (sampling):**
- `0 2px 8px rgba(...)` -- subtle
- `0 2px 12px rgba(0,0,0,0.06)` -- card resting
- `0 4px 6px -1px rgba(...)` -- Tailwind shadow-md copy
- `0 4px 14px rgba(...)` -- button glow
- `0 4px 16px rgba(...)` -- badge hover
- `0 4px 20px rgba(...)` -- various
- `0 8px 24px rgba(...)` -- button hover
- `0 8px 28px rgba(...)` -- card hover
- `0 8px 30px rgba(...)` -- card hover alternate
- `0 8px 32px rgba(...)` -- card hover alternate
- `0 10px 15px -3px rgba(...)` -- Tailwind shadow-lg copy
- `0 12px 40px rgba(...)` -- image card hover
- `0 16px 50px rgba(...)` -- founder card hover
- `0 30px 60px rgba(...)` -- product image drop-shadow
- Various `inset` shadows on AnimatedCTA

**Proposed shadow tokens:**
```text
--shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
--shadow-md: 0 4px 16px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 32px rgba(0,0,0,0.1);
--shadow-xl: 0 16px 48px rgba(0,0,0,0.14);
```

**Fixes needed:**
- Consolidate all card resting shadows to `--shadow-sm`
- Consolidate all card hover shadows to `--shadow-lg`
- Consolidate large dramatic shadows to `--shadow-xl`
- Keep AnimatedCTA inset shadows as-is (special component)
- Remove one-off shadow values from ListiclePage, PartnersPage, etc.

---

## 6. BUTTON STYLES

**Problem:** At least 5 different button pattern families:
1. `.b365-btn-primary` / `.b365-btn-outline` (OceanRaysPage.css)
2. `.animated-cta` with variants (AnimatedCTA.css)
3. `.guide-btn-free` / `.guide-btn-paid` / `.guide-btn-disabled` (GuidesPage.css)
4. Shadcn `<Button>` component (button.tsx)
5. Inline styled buttons in various pages

**Fixes needed:**
- Consolidate `.guide-btn-free`, `.guide-btn-paid` into `.b365-btn-primary` with color variants
- Ensure all button padding follows spacing scale: `10px 24px` (sm), `12px 32px` (md), `14px 32px` (lg)
- Remove duplicate button definitions
- Move shared button styles to `index.css` or a dedicated `buttons.css`

---

## 7. COMPONENT PATTERNS

**Card inconsistencies found:**
- Product cards: `border-radius: 20px`, `border: 1px solid`
- Guide cards: `border-radius: 20px`, `border: 1px solid`
- Stat cards: `border-radius: 20px`, `padding: 40px 32px`
- Testimonial cards: `border-radius: 20px`
- Benefit cards: `border-radius: 16px`
- Trust badges: `border-radius: 14px`
- Guide homepage cards: `border-radius: 14px`
- Partner cards: `border-radius: 16px` and `14px` (mixed!)

**Fixes needed:**
- ALL card-type components should use `--radius-md` (14px)
- Standardize card padding to `24px` or `32px`
- Standardize card border to `1px solid var(--b365-border)`
- Standardize hover behavior: `translateY(-3px)` + `var(--shadow-lg)`

---

## 8. BREAKPOINTS

**Problem:** Four different breakpoint systems used across pages:

- OceanRaysPage: 1024px, 640px
- GuidesPage: 1024px, 768px, 480px
- PartnersPage: 1024px, 768px, 480px
- ListiclePage: 1024px, 768px
- SharedFooter: 768px, 480px
- CheckoutPage: 860px, 500px
- NHTOPage, GLP1Page, UCOSPage, TPrime365Page: 1024px, 640px

**Proposed standard breakpoints:**
```text
--bp-desktop: 1024px;
--bp-tablet: 768px;
--bp-mobile: 480px;
```

**Fixes needed:**
- OceanRaysPage: Change 640px breakpoints to 768px (tablet) and add 480px (mobile) where needed
- CheckoutPage: Change 860px to 1024px, 500px to 480px
- Unify all pages to the 3-tier system

---

## 9. ANIMATION/TRANSITION

**Problem:** Inconsistent durations, easing curves, and patterns.

**Durations found:** 0.05s, 0.1s, 0.15s, 0.2s, 0.25s, 0.3s, 0.35s, 0.5s, 0.7s, 1000ms (1s)

**Easing found:** ease, ease-in-out, ease-out, linear, cubic-bezier(0.15, 0.83, 0.66, 1)

**Proposed tokens:**
```text
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 500ms;
--ease-default: ease;
--ease-out: ease-out;
--ease-spring: cubic-bezier(0.15, 0.83, 0.66, 1);
```

**Fixes needed:**
- Interactive hover transitions: 150ms (`--duration-fast`)
- Content transitions (scroll reveal, slide): 500ms (`--duration-slow`)
- General transitions (nav, color): 250ms (`--duration-normal`)
- Remove 0.05s, 0.1s, 0.35s -- snap to nearest token

---

## 10. ICON SYSTEM

**Problem:** Two icon systems used simultaneously:
1. `lucide-react` -- React components (PartnersPage, GuidesPage, TrustBadges, CartDrawer)
2. `iconify-icon` web component -- `<iconify-icon icon="lucide:...">` (TPrime365Page, NHTOPage, UCOSPage, GLP1Page, OceanRaysPage)

**Icon sizes found:** 14, 16, 18, 20, 22, 24, 28, 32 -- no consistent scale.

**Proposed standard:**
- Library: `lucide-react` only (per established guidelines)
- Sizes: `16px` (inline), `20px` (buttons), `24px` (cards/nav), `32px` (feature icons)

**Fixes needed (deferred to a separate task due to scope):**
- Migrate all `<iconify-icon>` usages to `lucide-react` imports in TPrime365Page, NHTOPage, UCOSPage, GLP1Page, GLP1BundlePage, OceanRaysPage
- Standardize icon sizes to the 4-value scale

---

## Implementation Plan

### Phase 1: Define the system (index.css)
Add all design tokens (spacing, colors, typography, radius, shadows, transitions) as CSS custom properties in `:root` in `src/index.css`. Move `--b365-*` variables out of `OceanRaysPage.css` into `index.css`.

### Phase 2: Apply tokens to OceanRaysPage.css (largest file, 1400 lines)
Replace all hardcoded values with token references. This is the homepage and highest-traffic page.

### Phase 3: Apply tokens to all other page CSS files
GuidesPage.css, PartnersPage.css, TPrime365Page.css, UCOSPage.css, NHTOPage.css, GLP1Page.css, GLP1BundlePage.css, ListiclePage.css, CheckoutPage.css, PrivacyPolicyPage.css.

### Phase 4: Apply tokens to component CSS files
AnimatedCTA.css, SharedFooter.css, TrustBadges.css, MobileMenu.css, LogoCarousel.css, ProductHero.css, RefillBanner.css, ScrollToTop.css, EarlyTestersCarousel.css, etc.

### Phase 5: Standardize breakpoints
Audit and align all `@media` queries to the 3-tier system.

### Phase 6: Icon migration (separate task)
Migrate `iconify-icon` to `lucide-react` across all pages.

This is a large refactor touching 20+ files. I recommend implementing Phases 1-2 first (the token definitions and the homepage), verifying everything still looks correct, then proceeding with Phases 3-5 in batches.
