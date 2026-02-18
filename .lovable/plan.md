

# Phase 3-5: Apply Design Tokens to Remaining Pages and Components

Continue the design system standardization by applying the tokens defined in Phase 1 (already in `src/index.css`) to all remaining CSS files.

## Files to Update

### Phase 3: Page CSS Files (6 files)

**1. TPrime365Page.css (911 lines)**
- Replace `border-radius: 20px` on all cards with `var(--radius-md)` (14px)
- Replace `border-radius: 12px` on icon-wraps with `var(--radius-sm)` (8px)
- Replace `border-radius: 24px` on hero container with `var(--radius-lg)`
- Replace `border-radius: 16px` on pro-tip, ugc-card, timeline-callout with `var(--radius-md)`
- Replace hardcoded `#EF4444` (5 instances) with `var(--b365-red)`
- Replace `#DC2626` (3 instances in safety section) with `var(--b365-red)`
- Replace `#FEE2E2` with light red using `rgba(var(--b365-red), 0.1)` pattern
- Replace `#16a34a` in value-total with `var(--b365-green-dark)`
- Replace `box-shadow: 0 4px 16px...` on ugc-card with `var(--shadow-md)`
- Replace `font-size: 17px` subhead with `var(--text-body)` (16px)
- Replace `font-size: 15px` on benefit h4 with `var(--text-body)` (16px)
- Standardize breakpoints: change `640px` to `768px`

**2. UCOSPage.css (596 lines)**
- Replace `border-radius: 20px` on all cards with `var(--radius-md)`
- Replace `border-radius: 12px` on icon-wraps with `var(--radius-sm)`
- Replace `border-radius: 16px` on trust badges, bundle products with `var(--radius-md)`
- Replace `#16a34a` (3 instances: save-banner, new-price, save-badge) with `var(--b365-green-dark)`
- Replace `box-shadow: 0 8px 32px rgba(0,0,0,0.06)` with `var(--shadow-lg)`
- Replace `transition: transform 0.2s, box-shadow 0.2s` with token-based durations
- Standardize breakpoints: change `640px` to `768px`

**3. NHTOPage.css (725 lines)**
- Replace `border-radius: 20px` on all cards with `var(--radius-md)`
- Replace `border-radius: 12px` on icon-wraps, payment-breakdown with `var(--radius-sm)`
- Replace `border-radius: 6px` on refund-badge with `var(--radius-sm)`
- Replace hardcoded `#EF4444` (2 instances) with `var(--b365-red)`
- Replace `#b8860b` / `#8b6914` (2 instances) with `var(--b365-gold)` / darker variant
- Replace `#1D4ED8`, `#15803D` with appropriate token references
- Replace `font-size: 15px` (4 instances) with `var(--text-body)` or `var(--text-body-sm)`
- Standardize breakpoints: change `640px` to `768px`

**4. GLP1Page.css (existing, 280 lines)**
- Replace `border-radius: 20px` on cards with `var(--radius-md)`
- Replace `border-radius: 16px` on perspective cards with `var(--radius-md)`
- Replace `border-radius: 10px` on icon-wrap with `var(--radius-sm)`
- Replace `#FF6F61` (coral accent) -- keep as-is since it's an intentional brand accent for this page
- Standardize breakpoints: change `640px` to `768px`

**5. GLP1BundlePage.css (existing, 330 lines)**
- Replace `border-radius: 20px` on cards with `var(--radius-md)`
- Replace `border-radius: 16px` on trust badges, step cards, bundle products with `var(--radius-md)`
- Replace `border-radius: 12px` on icon-wraps with `var(--radius-sm)`
- Replace `border-radius: 4px` on refund tags with `var(--radius-sm)`
- Standardize breakpoints: change `640px` to `768px`

**6. ListiclePage.css (780 lines)**
- This page uses Zalando Sans / Rethink Sans intentionally (editorial style) -- keep font families but tokenize colors
- Replace `#1a1a1a` (8+ instances) with `var(--b365-gray-900)`
- Replace `#64748B` with `var(--b365-gray-500)` (closest match)
- Replace `#4A5568` with `var(--b365-gray-500)`
- Replace `#E2E8F0` with `var(--b365-gray-200)`
- Replace `#29ABE2` (brand blue in listicle) with `var(--b365-blue)` for consistency
- Replace `border-radius: 2rem` on cards with `var(--radius-lg)` (24px)
- Replace `#EF4444` with `var(--b365-red)`
- Replace `#1E293B` with `var(--b365-navy)` (closest match)
- Consolidate shadow values to tokens

### Phase 4: Component CSS Files (10 files)

**7. SharedFooter.css**
- Replace `#0e87be` background with `var(--b365-blue)` for brand consistency
- Replace hardcoded `14px` font sizes with `var(--text-body-sm)`
- Replace `11px` with `var(--text-micro)`
- Replace `12px` with `var(--text-caption)`
- Breakpoints already correct (768px, 480px)

**8. MobileMenu.css**
- Replace `#333` with `var(--b365-gray-900)`
- Replace `#1a1a1a` with `var(--b365-gray-900)`
- Replace `#eee` / `#f5f5f5` with `var(--b365-gray-100)`
- Replace `border-radius: 8px` with `var(--radius-sm)`
- Replace animation durations with token values

**9. Header.css**
- Replace `border-radius: 20px` with `var(--radius-md)`
- Replace `box-shadow` with `var(--shadow-sm)`

**10. ScrollToTop.css**
- Replace `#1a1a1a` with `var(--b365-gray-900)`
- Replace `#333` hover with lighter variant
- Replace `border-radius: 8px` with `var(--radius-sm)`
- Replace `box-shadow` with `var(--shadow-md)`

**11. BenefitsTimeline.css**
- Replace `#ff6b6b` (timeline markers) with `var(--b365-red)`
- Replace `#ccff00` (neon green tags) -- keep as-is, unique to this component's original design
- Replace `#000` / `#1a1a1a` with `var(--b365-gray-900)`
- Replace `#444`, `#555` with `var(--b365-gray-500)`
- Replace `#ccc` with `var(--b365-gray-200)`
- Replace `border-radius: 20px` with `var(--radius-md)`

**12. ProductHero.css**
- Replace `border-radius: 20px` with `var(--radius-md)`
- Replace `border-radius: 12px` on thumbnails with `var(--radius-sm)`
- Replace `#1a1a1a`, `#333`, `#555`, `#666` with token equivalents
- Replace `#f5f5f5` with `var(--b365-gray-100)`
- Replace `box-shadow` values with tokens

**13. StatsSection.css**
- Replace `#1a1a1a` with `var(--b365-gray-900)`
- Replace `#444`, `#555` with `var(--b365-gray-500)`
- Replace `border-radius: 20px` with `var(--radius-md)`
- Replace `box-shadow` with `var(--shadow-sm)`

**14. Testimonials.css**
- Replace `border-radius: 20px` with `var(--radius-md)`
- Replace `#dbe4ef` with `var(--b365-blue-light)` (close match)
- Replace `#1a1a1a`, `#333`, `#444`, `#555` with token equivalents
- Replace `#4CAF50` checkmark color with `var(--b365-green)`

**15. ScientificValidation.css**
- Replace `border-radius: 30px` with `var(--radius-lg)`
- Replace `#1a1a1a`, `#333`, `#444`, `#555`, `#888` with tokens
- Replace `#ddd` / `#f0f4f8` with token equivalents

**16. RitualSection.css**
- Replace `border-radius: 30px` on ritual-card with `var(--radius-lg)`
- Replace `#1a1a1a`, `#333`, `#666` with tokens
- Replace `box-shadow: 0 10px 30px...` with `var(--shadow-lg)`

**17. AccordionSection.css**
- Replace `border-radius: 15px` with `var(--radius-md)`
- Replace `border-radius: 20px` on lifestyle-image with `var(--radius-md)`
- Replace `#333`, `#555` with tokens
- Replace `#f5f5f5` with `var(--b365-gray-100)`

**18. EarlyTestersCarousel.css**
- Already uses `var(--b365-border)` and `var(--b365-blue)` -- minimal changes needed

**19. NHTOIntakePage.css**
- Replace `#1a1a1a` with `var(--b365-gray-900)`
- Replace `#555`, `#777` with `var(--b365-gray-500)`
- Replace `#3376b0` hardcoded with `var(--b365-blue)`
- Replace `#f8f9fa` with `var(--b365-gray-50)`
- Replace `border-radius: 12px` with `var(--radius-sm)` or `var(--radius-md)`
- Replace `border-radius: 16px` with `var(--radius-md)`
- Replace `box-shadow` with `var(--shadow-md)`
- Replace breakpoint `640px` with `768px`

**20. PrivacyPolicyPage.css**
- Replace `#1a1a1a`, `#0d0d0d` with `var(--b365-gray-900)`
- Replace `#444`, `#555`, `#888` with `var(--b365-gray-500)` / `var(--b365-gray-400)`
- Replace `#333` with `var(--b365-gray-900)`
- Replace `#b8860b` (3 instances) with `var(--b365-gold)`
- Replace `#fafaf8` / `#f0f0ec` / `#f5f5f2` with `var(--b365-gray-50)` or `var(--b365-gray-100)`
- Replace `border-radius: 8px` / `12px` with `var(--radius-sm)` / `var(--radius-md)`

### Phase 5: Standardize Breakpoints

All files currently using `640px` breakpoints will be changed to `768px` (tablet). This affects:
- TPrime365Page.css
- UCOSPage.css
- NHTOPage.css
- GLP1Page.css
- GLP1BundlePage.css
- NHTOIntakePage.css

Files already using correct breakpoints (768px/480px): SharedFooter.css, ListiclePage.css, PartnersPage.css, GuidesPage.css

## Implementation Strategy

All changes are purely CSS token replacements -- no visual changes should be noticeable. The only subtle shifts will be:
- Cards going from 20px to 14px border-radius (slightly tighter, more refined)
- Some 640px breakpoints shifting to 768px (tablet layouts trigger slightly earlier)
- Shadow values becoming consistent across all components

This will be implemented as parallel edits across all files in a single pass.

