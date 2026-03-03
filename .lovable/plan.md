

## Pass Name to Shopify Checkout Pre-fill

### Goal
When the user enters their name on the GLP-1 Buy page, that name should appear pre-filled on the Shopify checkout page (the "next page").

### Changes

**1. Update `src/lib/shopify.ts` -- send name via `deliveryAddressPreferences`**
- Modify the `updateCartBuyerIdentity` function to pass `deliveryAddressPreferences` from the `buyerIdentity` argument into the Shopify API payload
- When `deliveryAddressPreferences` contains a `firstName`/`lastName`, Shopify will pre-fill the shipping name fields on checkout

**2. Update `src/pages/GLP1BuyPage.tsx` -- split the name and send it**
- Parse the single "Name" field into `firstName` and `lastName` (split on first space; if no space, the whole value goes into `firstName`)
- Pass those values into `updateBuyerIdentity` via `deliveryAddressPreferences` so Shopify pre-fills the name on the checkout page

### Technical Detail
The Shopify Storefront API `CartBuyerIdentityInput` accepts `deliveryAddressPreferences` with `firstName` and `lastName` inside a `deliveryAddress` object. The current code already defines this in the `BuyerIdentity` interface but the `updateCartBuyerIdentity` function strips it out. The fix is to forward it when present.

