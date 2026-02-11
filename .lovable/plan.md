

# Shopify Cart & Checkout Integration for GLP-1 Page

## Overview
Wire up real Shopify cart and checkout functionality so all "Order Now" buttons on the GLP-1 page add the product to a Shopify cart and allow checkout. This also sets up the shared Shopify infrastructure for use on other product pages later.

## New Files

### 1. `src/lib/shopify.ts` -- Storefront API config and helpers
- Constants: store domain (`cell365power-yq7na.myshopify.com`), API version (`2025-07`), storefront token
- `storefrontApiRequest()` helper function for all GraphQL calls
- All cart mutations: `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove`, cart query
- Helper functions: `createShopifyCart()`, `addLineToShopifyCart()`, `updateShopifyCartLine()`, `removeLineFromShopifyCart()`, `formatCheckoutUrl()`

### 2. `src/stores/cartStore.ts` -- Zustand cart state (install `zustand` dependency)
- Persistent cart state with `CartItem` interface
- Actions: `addItem`, `updateQuantity`, `removeItem`, `clearCart`, `syncCart`, `getCheckoutUrl`
- Persisted to localStorage so cart survives page refreshes

### 3. `src/hooks/useCartSync.ts` -- Cart sync hook
- Syncs cart with Shopify on page load and when user returns to tab (handles post-checkout cleanup)

### 4. `src/components/CartDrawer.tsx` -- Slide-out cart drawer
- Shows cart items with quantity controls, remove buttons
- Displays total price
- "Checkout with Shopify" button that opens checkout URL in new tab
- Shopping cart icon with badge count in the nav bar

## Modified Files

### 5. `src/App.tsx`
- Import and use `useCartSync` hook at the app level

### 6. `src/pages/GLP1Page.tsx`
- Import `useCartStore` and the Shopify product variant ID
- Wire all "Order Now" / `AnimatedCTA` buttons to call `addItem()` with the real Shopify variant ID (`gid://shopify/ProductVariant/46265391579276`)
- Add `CartDrawer` component in the nav bar (next to "Order Now" nav CTA)
- Buttons show loading state during cart operations

## Technical Details

- **Variant ID**: `gid://shopify/ProductVariant/46265391579276` (the 30-Day Protocol at $39.95)
- **Store domain**: `cell365power-yq7na.myshopify.com`
- **Storefront token**: `e315ea6bf6c4520bc5cae80d5e95dd5d`
- **API version**: `2025-07`
- **New dependency**: `zustand` (for persistent cart state management)

## User Flow
1. User clicks any "Order Now" button on the GLP-1 page
2. The product is added to the Shopify cart (cart created via Storefront API on first add)
3. Cart drawer slides open showing the item
4. User clicks "Checkout with Shopify" which opens the Shopify checkout in a new tab
5. After completing checkout and returning, the cart auto-syncs and clears completed orders

