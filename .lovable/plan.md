

## Duplicate Order Prevention Fix

### Problem
Gabriela Delgado submitted the checkout form 14 times in 17 minutes, resulting in duplicate Shopify orders reaching ShipStation. The "Continue to Payment" button stays clickable after submission, and slow mobile redirects allow repeated taps.

### Changes

**1. `src/pages/GLP1BuyPage.tsx`** — Add submission gate
- Add a `hasSubmitted` ref initialized to `false`
- At the top of `onSubmit`, check `if (hasSubmitted.current) return;` and set it to `true` immediately
- After the redirect line (`window.location.href = checkoutUrl`), keep the button in a "Redirecting..." disabled state
- Change the button text to show "Redirecting..." with a spinner once submitted

**2. `src/pages/CheckoutPage.tsx`** — Same debounce pattern
- Add a `hasSubmitted` ref to gate `onSubmit` — once fired, all subsequent calls are no-ops
- Disable both the inline submit button and the mobile sticky CTA after first successful submission
- Show "Redirecting..." state on both buttons

### No backend or store changes needed
The fix is purely at the UI layer — preventing the redirect from firing more than once per page load.

