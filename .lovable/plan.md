

# On-Site Checkout Page (Info Collection Only)

## What This Does

Build a checkout page on your site that collects customer details (name, email, shipping address, phone). When they click "Continue to Payment," those details are sent to Shopify via the `cartBuyerIdentityUpdate` API mutation, and the customer is redirected to Shopify's payment page with everything **pre-filled**. They only need to enter their credit card.

## How It Works

1. Customer adds items to cart (existing flow, unchanged)
2. In the cart drawer, "Checkout" now navigates to `/checkout` instead of opening Shopify directly
3. The `/checkout` page shows an order summary + a form for contact and shipping info
4. On submit, the Storefront API `cartBuyerIdentityUpdate` mutation attaches customer info to the Shopify cart
5. Customer is redirected to Shopify checkout with all fields pre-filled -- they just enter payment

## What Gets Built

### 1. New Shopify API Mutation (`src/lib/shopify.ts`)
Add a `cartBuyerIdentityUpdate` GraphQL mutation and helper function that accepts email, phone, first name, last name, and full shipping address, then sends it to Shopify's Storefront API.

### 2. New Store Method (`src/stores/cartStore.ts`)
Add an `updateBuyerIdentity` action to the cart store that calls the new API function.

### 3. New Checkout Page (`src/pages/CheckoutPage.tsx`)
A dedicated `/checkout` route with:
- **Order summary panel** -- lists cart items, quantities, prices, and total (read from cart store)
- **Contact section** -- email and phone fields
- **Shipping address section** -- first name, last name, address line 1 & 2, city, state/province, zip, country
- Form validation using `react-hook-form` + `zod` (already installed)
- "Continue to Payment" button that submits info to Shopify then redirects
- "Back to cart" link
- Styled to match the existing site aesthetic (dark theme)

### 4. Updated Cart Drawer (`src/components/CartDrawer.tsx`)
Change the "Checkout with Shopify" button to navigate to `/checkout` using `react-router-dom` instead of opening Shopify directly.

### 5. Route Registration (`src/App.tsx`)
Add `/checkout` route pointing to the new CheckoutPage component.

## Technical Details

**New GraphQL mutation:**
```text
mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
  cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
    cart { id checkoutUrl }
    userErrors { field message }
  }
}
```

**Form schema (Zod):**
- email (required, valid email)
- phone (optional)
- firstName, lastName (required)
- address1 (required), address2 (optional)
- city, province/state, zip, country (required)

**Files changed:**
- `src/lib/shopify.ts` -- add mutation + `updateCartBuyerIdentity()` function
- `src/stores/cartStore.ts` -- add `updateBuyerIdentity` action
- `src/pages/CheckoutPage.tsx` -- new file
- `src/pages/CheckoutPage.css` -- new file for styling
- `src/components/CartDrawer.tsx` -- change checkout button to navigate to `/checkout`
- `src/App.tsx` -- add `/checkout` route

**No payment processing on your site** -- Shopify handles all payment collection, PCI compliance, and order creation on their hosted checkout page.

