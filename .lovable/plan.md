

## Redesign Final CTA into Premium Light-Theme DTC Checkout Section

Replace the current simple final CTA section (section 14, lines 609-636) with a two-column, high-converting checkout layout that matches the page's existing light/blue aesthetic.

### What Gets Replaced

Lines 609-636 in `GLP1Page.tsx` -- the `tprime-final-cta` wrapper with basic price, CTA button, and trust badges.

### New Structure

**Two-column grid on desktop, stacked on mobile, on the existing light page background.**

**LEFT COLUMN -- Product Display:**
1. Promo banner: Brand blue background, white bold text "SAVE $50 + FREE SHIPPING" with fire emojis, rounded corners
2. Main product image (`/images/glp1-whats-included.png`) on white/light gray background, max-height 500px
3. Stat overlay: "91%" in large brand blue text + "of Users Reported Higher Energy Within 90 Days*" + small disclaimer
4. Benefit callouts (4 items) stacked vertically with Lucide icons (Zap, Dumbbell, Brain, Flame) in brand blue, dark text
5. Thumbnail carousel row: 6 small images (~60px) from existing assets with left/right ChevronLeft/ChevronRight navigation, active thumbnail gets a blue border highlight

**RIGHT COLUMN -- Offer and Checkout:**
1. Product title "GLP-1 Optimization Protocol" in Playfair Display, dark text
2. 5 gold stars (Star icon, #f59e0b fill) + "Based on early tester feedback" muted subtext
3. Description paragraph in dark body text
4. 5-item checkmark list with orange/amber Check icons (#f97316)
5. Price block: "$39.95" in large brand blue (36-40px) + "$90.00" strikethrough gray + "56% OFF TODAY" badge (white on orange) + "FREE SHIPPING -- NO CODE REQUIRED" subtext
6. "YOUR FREE BONUSES" -- 3 small white cards with subtle shadow, each with orange "FREE" badge, title, and value text
7. Full-width CTA: "START YOUR PROTOCOL" on brand blue, 56px height, 18px font, same animated hover as existing CTAs, 8px rounded corners. Uses existing `handleOrderNow` function.
8. FDA disclaimer in 11px muted gray at bottom

### Files Modified

**`src/pages/GLP1Page.tsx`**
- Replace section 14 (lines 609-636) with the new two-column checkout component
- Add thumbnail carousel state (activeThumb index, scroll handler)
- Reuse existing imports (Check, Zap, Brain, Flame, Dumbbell, Star, ArrowRight, ChevronRight plus add ChevronLeft)

**`src/pages/GLP1Page.css`**
- Add new CSS classes:
  - `.glp1-checkout-section` -- light background matching page, generous padding
  - `.glp1-checkout-grid` -- 2-column grid (1fr 1fr), 48px gap, 24px padding, max-width 1280px centered
  - `.glp1-promo-strip` -- brand blue bg, white bold text, rounded corners, centered
  - `.glp1-product-display` -- white/light gray bg, relative positioning for stat overlay, rounded corners, subtle shadow
  - `.glp1-stat-overlay` -- positioned stat callout in brand blue
  - `.glp1-benefit-callouts` -- vertical stack, blue icons, dark text
  - `.glp1-thumb-carousel` -- horizontal scroll row of 60px thumbnails with arrow buttons, active thumbnail blue border
  - `.glp1-checkout-right` -- right column styles
  - `.glp1-star-rating` -- gold star row (#f59e0b)
  - `.glp1-check-list` -- orange checkmark list (#f97316)
  - `.glp1-checkout-price` -- large blue price, strikethrough, orange discount badge
  - `.glp1-bonuses-row` -- 3 white bonus cards with subtle shadow and orange FREE tags
  - `.glp1-checkout-cta` -- brand blue button, 56px height, 18px font, hover animation
  - `.glp1-fda-disclaimer` -- 11px muted text
  - Responsive at 768px: stack columns, full-width CTA

### Thumbnail Images (reuse existing)
1. `/images/product-glp-protocol.png`
2. `/images/triple-power-methylene-blue.png`
3. `/images/metabolism-plus.png`
4. `/images/glp1-whats-included.png`
5. `/images/glp1-risk-free.png`
6. `/images/glp1-many-users-report.png`

### Design Notes
- Matches existing light/blue page aesthetic -- no dark theme
- Brand blue (`var(--b365-blue)`) for CTA, price, stat highlights, icons
- Orange/amber (`#f97316`) only for checkmarks, FREE badges, discount tag
- Gold (`#f59e0b`) for star rating
- Subtle box shadows and rounded corners throughout for premium feel
- Mobile sticky CTA already exists on this page via `.glp1-sticky-mobile-cta`
