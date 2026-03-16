

## Add Free Digital Products to GLP-1 Cart with Visible "Was $X → FREE" Pricing

**Goal**: Create 4 free Shopify products (priced at $0) that auto-add to the cart alongside the GLP-1 Protocol. Each shows a strikethrough "original" price so customers see the perceived value they're getting for free.

### Step 1 — Create 4 Shopify Products ($0 each)

Using Shopify tools, create these as real $0 products:
1. **The Ultimate GLP-1 User's Master Guide** — $0 (value: $29)
2. **10-Minute Easy Lymphatic Morning Jumpstart System** — $0 (value: $19)
3. **Maximize Your Results: Smart Science of Enhanced Absorption** — $0 (value: $19)
4. **Best365 Labs Community Access** — $0 (value: $49)

### Step 2 — Update `src/lib/shopify.ts`

Export the 4 new variant IDs alongside the existing `GLP1_VARIANT_ID`.

### Step 3 — Update `src/pages/GLP1BuyPage.tsx`

- Define product metadata objects for each free item (like existing `GLP1_PRODUCT`)
- Expand the "auto-add to cart on mount" `useEffect` (line 140) to add all 5 items sequentially (GLP-1 + 4 free items), checking each isn't already in cart
- Update the `cart_items` array in the `checkout_leads` insert (line 191) to include all items

### Step 4 — Update `src/pages/CheckoutPage.tsx`

- Add a `compareAtByVariant` entry for each free item mapping to its "value" price ($29, $19, $19, $49)
- In the order summary rendering (line 196), show free items with strikethrough original price and a "FREE" badge:
  ```
  The Ultimate GLP-1 User's Master Guide    $29  →  FREE
  Community Access                           $49  →  FREE
  ```
- Adjust the savings calculation to include the free item values in the total perceived savings

### Step 5 — Update Cart Drawer (optional)

In `CartDrawer.tsx`, show "$0.00" for free items with a small "FREE" label so it's clear they won't be charged.

### Result

Customers see 4 bonus items in their cart/checkout with visible crossed-out prices, reinforcing the deal's value. The items flow through Shopify fulfillment as real $0 line items for digital delivery tracking.

