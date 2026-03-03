
## Ad Landing Page with Auto-Add GLP-1 to Cart

### Goal
Create a new page (route: `/glp1-buy`) specifically for ad traffic. When a user lands on this page, it automatically adds the GLP-1 Optimization Protocol ($39.95) to their cart and immediately presents them with the checkout form to enter their name and email. On submit, their info is saved to the `checkout_leads` database table, and they are redirected to the Shopify payment page.

### How It Works
1. User clicks ad link -> lands on `/glp1-buy`
2. On page load, the GLP-1 Protocol is automatically added to cart (with a loading spinner while this happens)
3. Once the cart is ready, they see a polished single-page checkout experience with:
   - Product summary (image, title, price, value anchoring)
   - Contact form (First Name, Last Name, Email, Phone)
   - Trust elements (guarantee badge, secure checkout notice, payment badges)
   - "Continue to Payment" CTA
4. On submit: lead saved to `checkout_leads` table, then redirected to Shopify payment

### Visual Design
- Reuses the same CSS classes and visual language as the existing `/checkout` page (same border radius, colors, typography, trust badges)
- Clean, focused single-column layout on mobile; two-column on desktop
- Loading state with spinner + "Preparing your order..." message while cart is being created
- Product card with image, title, price, compare-at price ($90), savings badge, and per-day cost

### Technical Details

**1. New file: `src/pages/GLP1BuyPage.tsx`**
- Imports the same `GLP1_VARIANT` product data pattern from the advertorial page
- Uses `useCartStore` to auto-add item on mount via `useEffect`
- Uses `react-hook-form` + `zod` for form validation (same schema as CheckoutPage)
- Saves lead to `checkout_leads` table on submit
- Calls `updateBuyerIdentity` then opens Shopify checkout URL
- Shows loading state while cart is being created
- If cart already has the GLP-1 item, skips the add step

**2. New file: `src/pages/GLP1BuyPage.css`**
- Imports/extends the existing CheckoutPage.css styles
- Adds a product hero card at the top of the page
- Minimal additional CSS since it reuses checkout styles

**3. Update: `src/App.tsx`**
- Add lazy import for `GLP1BuyPage`
- Add route: `/glp1-buy`

### Page Structure
```text
+------------------------------------------+
|  [Logo]     Secure Checkout     [Lock]   |
+------------------------------------------+
|  Progress Bar: [1]---[2]---[3]           |
+------------------------------------------+
|                    |                      |
|  PRODUCT CARD      |  CONTACT FORM       |
|  [Image]           |  First Name *       |
|  GLP-1 Protocol    |  Last Name          |
|  $39.95 (was $90)  |  Email *            |
|  Save 56%          |  Phone              |
|  $1.33/day         |                     |
|                    |  [Secure notice]    |
|  Urgency Banner    |  [Social proof]     |
|                    |                      |
|  Subtotal  $39.95  |                      |
|  Shipping  FREE    |                      |
|  Total     $39.95  |                      |
|                    |                      |
|  [Continue to Payment ->]                |
|  Lock SSL Encrypted                      |
|  [Guarantee Badge]                       |
|  [Payment Badges]                        |
+------------------------------------------+
```

### No Database Changes Required
The existing `checkout_leads` table already supports this flow.
