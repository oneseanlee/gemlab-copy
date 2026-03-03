

## Redesign /glp1-buy as the GLP-1 Protocol Checkout Section

### Goal
Replace the current generic checkout-style layout on `/glp1-buy` with the rich product showcase from the GLP-1 Protocol page's final CTA section. Visitors from ads will see exactly what they're buying -- product images, benefits, bonuses, reviews -- with a simple Name + Email form inline, then get sent to Shopify payment.

### What Changes

**1. Rewrite `src/pages/GLP1BuyPage.tsx`**
- Replace the current two-column checkout layout with the `glp1-checkout-section` layout from the protocol page
- **Left column**: Product image carousel with thumbnail row, promo strip ("SAVE $50 + FREE SHIPPING"), and 4 benefit callout icons (Metabolism, Lean Muscle, Mental Clarity, Fat Burning)
- **Right column**: Product title, 4.9-star rating (127 reviews), description, orange checkmark list (5 items), price block ($39.95 / ~~$90~~ / 56% OFF), free shipping note, bonuses section (3 bonus cards), guarantee badge, phone line
- **Replace the "START YOUR PROTOCOL" button** with an inline form: single "Name" field + "Email" field + "Continue to Payment" submit button
- Keep the auto-add-to-cart logic on mount (unchanged)
- On submit: save to `checkout_leads` (store the single name in `first_name`, leave `last_name` null), then redirect to Shopify

**2. Simplify the form**
- Remove "First Name" + "Last Name" split -- just one "Name" field
- Remove "Phone" field and SMS toggle
- Keep it to: Name (required) + Email (required) + Submit
- Update Zod schema accordingly

**3. Update `src/pages/GLP1BuyPage.css`**
- Import the GLP-1 page styles (`GLP1Page.css`) instead of `CheckoutPage.css`
- Add minimal overrides for the inline form styling within the checkout section
- Keep mobile responsiveness (stacked layout, sticky CTA)

**4. Remove unused imports**
- Drop `CheckoutProgressBar`, `SocialProofStrip`, `UrgencyBanner`, `GuaranteeBadge`, `TrustPaymentBadges` component imports since the section uses its own built-in trust elements

### Page Structure
```text
+------------------------------------------+
|  [Logo]      Best 365 Labs               |
+------------------------------------------+
|  SAVE $50 + FREE SHIPPING                |
+---------------------+--------------------+
|                     |                    |
|  [Product Image]    |  GLP-1 Protocol    |
|                     |  **** 4.9 (127)    |
|  [Thumb] [Thumb]..  |  Description...    |
|                     |                    |
|  [Zap] [Dumbbell]   |  [x] Triple Power  |
|  [Brain] [Flame]    |  [x] AMPK/Sirtuin  |
|                     |  [x] 72% lean...   |
|                     |  [x] Made in USA   |
|                     |  [x] 60-day guar   |
|                     |                    |
|                     |  $39.95  $90  56%  |
|                     |  FREE SHIPPING     |
|                     |                    |
|                     |  YOUR FREE BONUSES |
|                     |  [Guide][Access]   |
|                     |  [Shipping]        |
|                     |                    |
|                     |  Name: [________]  |
|                     |  Email:[________]  |
|                     |  [Continue to Pay] |
|                     |                    |
|                     |  60-Day Guarantee  |
|                     |  Phone support     |
+---------------------+--------------------+
```

### Technical Details
- Reuses the same CSS classes from `GLP1Page.css` (`glp1-checkout-section`, `glp1-checkout-grid`, etc.)
- Thumbnail images array and carousel logic copied from the protocol page
- Cart auto-add and `checkout_leads` insert logic stays the same
- The `first_name` column stores the full name entered; `last_name` stays null
- No database changes needed
