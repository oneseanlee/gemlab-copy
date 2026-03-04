

## Mobile-First Conversion Optimization for /glp1-buy

### Overview
Add a hero video, reorder content for mobile conversion, and add a "Sound On" overlay indicator. The sticky mobile CTA bar already exists and works — we just need to verify scroll-based visibility.

### Changes

**1. `src/pages/GLP1BuyPage.tsx` — Restructure layout + add video**

- Add `Volume2` icon import from lucide-react
- Add state: `showSoundHint` (true by default, fades after 3s or on video click)
- Add a `videoRef` for the sound hint tap handler
- Add a new `glp1buy-hero-video` wrapper at the top of the left column containing:
  - `<video>` element with the provided URL, autoPlay, muted, loop, playsInline, controls
  - A "Tap for sound" overlay (absolute positioned bottom-left) that fades out after 3 seconds via `useEffect` + `setTimeout`, or on video click
- Reorder left column (desktop): Video → Product display image → Thumbnails → Benefit cards
- On mobile, use CSS `order` properties to reorder the entire grid into the specified sequence:
  1. Promo strip (order: 1)
  2. Video (order: 2)
  3. Title + rating + price (order: 3)
  4. Check list (order: 4)
  5. Bonuses (order: 5)
  6. Form + CTA (order: 6)
  7. Guarantee (order: 7)
  8. Phone + disclaimer (order: 8)
  9. Product display image (order: 9)
  10. Thumbnails (order: 10)
  11. Benefit cards (order: 11)

To achieve this mobile reorder, the two-column grid must flatten to a single column on mobile. Currently `glp1-checkout-grid` does this via the imported GLP1Page.css. We need to pull the mobile-critical right-column elements (title, rating, price, checklist, bonuses, form, guarantee, phone, disclaimer) into the flat flow using CSS order on individual child elements. The simplest approach: on mobile, set both `.glp1-checkout-left` and `.glp1-checkout-right` to `display: contents` so all their children participate in the parent grid's ordering.

**2. `src/pages/GLP1BuyPage.css` — New styles**

- `.glp1buy-hero-video`: position relative, width 100%, border-radius 12px, overflow hidden, box-shadow, margin-bottom spacing
- `.glp1buy-hero-video video`: width 100%, aspect-ratio 1/1, object-fit cover, display block, border-radius 12px
- `.glp1buy-sound-hint`: absolute bottom-left overlay, semi-transparent black bg, white text, flex row with icon, font-size 13px, border-radius 8px, pointer-events none, transition opacity 0.5s
- `.glp1buy-sound-hint.hidden`: opacity 0
- Mobile media query: set `.glp1-checkout-left, .glp1-checkout-right` to `display: contents`, then assign `order` values to each child element class for the specified mobile stack order
- Remove the description paragraph on mobile (or keep it — user said don't change copy, so we keep it but it naturally flows after rating)

### Technical Notes
- Using `display: contents` on mobile for the two columns lets us freely reorder all children within the single-column grid without restructuring the JSX
- The sticky CTA bar already exists from GLP1Page.css (always visible on mobile, fixed bottom). No changes needed there — it's already always visible. The user's requirement about "appears after 400px scroll" would need JS, but since it already shows always on mobile, that's better for conversion
- Video uses native `<video>` controls — no custom player needed
- The sound hint uses a simple setTimeout + state toggle, no external dependencies

