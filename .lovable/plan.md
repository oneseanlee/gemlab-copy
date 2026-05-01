# Plan: GLP-1 Activate Landing Page

A new dark/light alternating product page at `/glp1-activate` for the **GLP-1 Cellular Companion™** sublingual formula, fully wired to the existing Cell365Power brand system, Zustand cart, and Shopify Storefront API.

## 1. Files to Create

**`src/pages/GLP1ActivatePage.tsx`** — main page component, modeled on `GLP1Page.tsx` (same imports, sticky nav, MobileMenu, CartDrawer, AnimatedCTA, EarlyTestersCarousel, Embla testimonials, shadcn Accordion FAQ, SharedFooter).

**`src/pages/GLP1ActivatePage.css`** — page-scoped styles mirroring `GLP1Page.css`. Uses existing CSS variables: `--b365-blue`, `--b365-green`, `--b365-text`, `--b365-text-secondary`, `--b365-light-blue`. Reuses `b365-section`, alternating dark hero, etc.

## 2. Files to Modify

**`src/lib/shopify.ts`** — add 3 new variant ID constants + a minimal `GLP1_ACTIVATE_PRODUCT` object for cart payload:
- `GLP1_ACTIVATE_ONETIME_VARIANT_ID`
- `GLP1_ACTIVATE_MONTHLY_VARIANT_ID`
- `GLP1_ACTIVATE_BIMONTHLY_VARIANT_ID`

These will be added as placeholder Shopify GIDs that you can later swap for real Shopify variant IDs (or I can create them via the Shopify connector after the page is live — see "Open question" below).

**`src/App.tsx`** — register the lazy route:
```ts
const GLP1ActivatePage = lazy(() => import("./pages/GLP1ActivatePage"));
<Route path="/glp1-activate" element={<GLP1ActivatePage />} />
```

**`src/pages/HomePage.tsx`** — add a new entry to the `products` array between GLP-1 Protocol and UCOS, with `href: '/glp1-activate'`, GLP-1 Cellular Companion™ subtitle, "Preorder" ribbon, $27/mo price, and the three hero benefit pills as bullet list.

## 3. Page Structure (in order)

1. Dismissible promo banner — "Preorder Now — Ships May 1, 2026 · Free Shipping on U.S. Orders Over $40"
2. Sticky nav: Logo · Benefits · Science · Stack · FAQ · "Preorder Now" CTA + Cart icon
3. **Hero (dark)** — eyebrow, H1, subhead, 3 benefit pills, product image, price toggle (One-time $30 / Monthly $27 / Every 2 Months $27 — **default Monthly**), qty selector, AnimatedCTA "Preorder Now", trust badge row
4. **Hidden Problem (light)** — H2 + body + 3-card grid (capsules / powders / tablets)
5. **Solution (dark)** — H2 + body + side-by-side absorption timeline (CSS bar graphic, oral vs sublingual)
6. **Dual NAD+ Strategy™ (light)** — two-column comparison: Other NAD+ supplements vs GLP-1 Activate
7. **Why Each Ingredient (dark)** — 4-card grid (NAD+, 1-MNA, Spermidine, Boron) with name, dose, nickname, body, * footnote
8. **What GLP-1 Strips Away (light)** — 3-icon row (muscle / bone / hormones) + closing line
9. **How To Use (dark)** — 3-step visual + zero-interference note
10. **Subscription Value Stack (light)** — two-column pricing card, Monthly highlighted as default
11. **Stack With Full Protocol (dark)** — 3 cross-sell cards (GLP-1 Protocol / GLP-1 Cellular Bundle / Triple Power MB)
12. **Early Testers Carousel** — reuse existing `EarlyTestersCarousel` component
13. **FAQ (light)** — shadcn Accordion with the 7 Q&A items
14. **Final CTA (dark)** — H2, subhead, big price display, AnimatedCTA "Preorder GLP-1 Activate", trust line
15. **SharedFooter**
16. FDA disclaimer block above footer

## 4. Cart Behavior

- Page-level state: `purchaseType: 'onetime' | 'monthly' | 'bimonthly'` defaulting to `'monthly'`
- `quantity` state with +/− stepper
- "Add to Cart" / "Preorder Now" calls `useCartStore().addItem({ variantId: <selected>, quantity, ... })` then opens the existing `CartDrawer`
- Reuses the same Sticky Mobile CTA pattern from GLP1Page

## 5. Compliance

- FDA disclaimer block: `*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.`
- All ingredient cards end with `*`
- Brand references rendered as `Ozempic®`, `Wegovy®`, `Mounjaro®`, `Zepbound®`
- "Independent, 3rd Party Lab Tested" badge in trust strip
- No "cure / treat / diagnose" copy used

## 6. Assets

- Source product photography from `https://best365labs.com/wp-content/uploads/2026/04/GLP-1-Activate-1.jpg` through `-6.jpg`. I'll reference these URLs directly in `<img>` tags (with `loading="lazy"`) since they're hosted on the customer's own CDN.
- If any URL 404s, I'll fall back to `/images/product-glp-protocol.png` as a placeholder mockup.

## Technical Notes

- File uses `// @ts-nocheck` header (matches sibling pages)
- Embla Carousel + Autoplay for testimonials section
- `useScrollReveal` hook on each major section
- Iconify lucide icons: `Zap`, `Shield`, `Flame`, `Dumbbell`, `Bone`, `Droplet`, `Clock`, `Check`, `Tag`, `Menu`, `ChevronDown`
- All CTAs route through `AnimatedCTA` with `onClick` handlers (not href), so they trigger cart add → drawer open
- Cross-sell "Triple Power Methylene Blue" link goes to `https://best365labs.com` (external, `target="_blank"`)

## Open Question (one decision needed)

The product needs **3 Shopify variant IDs** (one-time / monthly sub / every-2-months sub). I see two paths:

**A.** I create the product + 3 variants in Shopify now via the connector, get real variant IDs, and wire them into `shopify.ts`. The cart will work end-to-end on first deploy. *(Recommended)*

**B.** I scaffold the page with placeholder variant IDs (matching the format of `GLP1_VARIANT_ID`) marked with a `TODO` comment, and you create the Shopify product later, then paste the IDs in.

Reply **A** or **B** — or just "go" and I'll default to **A** (create the Shopify product as part of the build).