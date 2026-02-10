

# Restyle TPrime365 Page to Match Homepage Design

## Overview
Completely restyle the TPrime365 landing page to use the same "Maximus medical-grade" design system as the homepage (OceanRaysPage). This means switching fonts, colors, layout patterns, and component styles to create a unified brand experience.

## Key Design Changes

**Colors**: Replace light blue background (#ddeafa) and neon green (#CCFF00) accents with the homepage palette -- white/light gray backgrounds, blue (#3376b0) accents, green (#22C55E) for positive indicators, navy (#0A1628) for dark sections.

**Typography**: Replace Rethink Sans / Zalando Sans Expanded with Plus Jakarta Sans (body) and Playfair Display (serif headlines with italicized emphasis).

**Icons**: Replace emoji icons (e.g. fire, brain, shield) with Iconify lucide icons, matching the homepage pattern.

**Components**: Adopt homepage patterns -- rounded cards with subtle borders, pill-shaped buttons via AnimatedCTA, consistent section spacing (96px padding), and the `.b365-section` / `.b365-section-alt` alternating background pattern.

**Navigation**: Add the same sticky nav bar and promo banner from the homepage instead of the standalone "TPrime365" logo header.

## Technical Plan

### 1. Update TPrime365Page.tsx
- Import `AnimatedCTA` component and `OceanRaysPage.css` class conventions
- Replace the standalone header with the homepage nav (promo banner + sticky nav with logo, links, CTA)
- Restyle the hero as a two-column grid card (like `.b365-hero-container`) using the TPrime bottle image instead of the placeholder
- Convert all sections to use `.b365-section` / `.b365-section-alt` wrapper pattern with `.b365-section-heading.b365-serif` headings (with italic `<em>` emphasis on key words)
- Replace emoji icons with `<iconify-icon>` lucide equivalents
- Replace `<button className="tprime-cta-button">` with `<AnimatedCTA>` throughout
- Restructure the FAQ to use the homepage's two-column `.b365-faq-layout` pattern
- Keep all existing content/copy -- only change the visual presentation

### 2. Rewrite TPrime365Page.css
- Remove all existing custom styles (tprime-container, tprime-hero-card, section-header, problem-card, etc.)
- Use the homepage CSS variables (--b365-blue, --b365-text, etc.) and reuse `.b365-*` classes where possible
- Add TPrime-specific styles only where needed (e.g., ingredient grid, delivery comparison, value stack) but following the same design tokens -- white card backgrounds, 20px border-radius, 1px solid var(--b365-border), Plus Jakarta Sans body text
- Keep responsive breakpoints consistent with homepage (1024px, 640px)

### 3. Section-by-Section Mapping

| Current TPrime Section | New Style |
|---|---|
| Logo header | Homepage nav (promo banner + sticky nav bar with Best 365 Labs logo) |
| Hero card (light blue bg, placeholder image) | Two-column hero with light blue-gray background, TPrime bottle image, Playfair Display headline, AnimatedCTA button |
| "Traditional Solutions Are Broken" problem cards (dark bg, red accents) | White cards with border, blue section heading, red text only for negative items |
| Solution pillars diagram | Clean white card, blue accent borders, no neon green |
| Ingredient grid (emoji badges) | White bordered cards, lucide icons in blue icon-wrap circles |
| Delivery comparison (neon green vs gray) | White cards with border -- green checkmarks for TPrime, red X for competitors |
| Persona cards | White bordered cards matching product card style |
| Benefits grid (emoji icons) | White bordered cards with lucide icons in blue icon-wrap circles |
| Comparison table (neon green highlight) | Blue header row table matching `.b365-table` style |
| Value stack | White card with blue accent, navy total bar |
| Process steps (neon green circles) | Three-column step cards matching `.b365-step-card` pattern |
| Dosing card | Clean white card with border |
| Trust badges (emoji) | White bordered cards with lucide icons |
| Safety section (red border) | Subtle red-tinted card with clean typography |
| FAQ (custom accordion) | Two-column layout matching `.b365-faq-layout` |
| Final CTA (dark gradient, neon green) | Dark navy card with blue/white accents, AnimatedCTA button |

### 4. No changes needed to other files
- OceanRaysPage.tsx/css remain untouched
- SharedFooter already in use on TPrime365 -- stays as-is

