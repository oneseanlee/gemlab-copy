

# Meta Pixel Integration Plan

## Overview
Install the Meta Pixel (ID: `147845509971224`) directly in the codebase with base `PageView` tracking on every page, plus three custom conversion events: `ViewContent`, `AddToCart`, and `InitiateCheckout`.

---

## 1. Add Meta Pixel base script to `index.html`

Insert the standard Meta Pixel snippet (with your Pixel ID) right after the existing GTM script block. This fires `PageView` on every page load automatically.

```html
<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '147845509971224');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=147845509971224&ev=PageView&noscript=1"/></noscript>
```

---

## 2. Create a small helper utility `src/lib/meta-pixel.ts`

A type-safe wrapper so components can call `trackMetaEvent('AddToCart', { ... })` without worrying about whether `fbq` exists on `window`.

---

## 3. Fire `ViewContent` on product pages

Add a `useEffect` in each product page component that calls `ViewContent` with product name and value on mount:

- `/glp1-protocol` -- GLP1Page.tsx
- `/tprime365` -- TPrime365Page.tsx
- `/nhto` -- NHTOPage.tsx
- `/ucos` -- UCOSPage.tsx
- `/glp1-ucos` -- GLP1BundlePage.tsx

---

## 4. Fire `AddToCart` in the cart store

After a successful `addItem` call in `src/stores/cartStore.ts`, fire the `AddToCart` event with the product name, variant ID, price, and quantity.

---

## 5. Fire `InitiateCheckout` on the checkout page

Add a `useEffect` in `src/pages/CheckoutPage.tsx` that fires `InitiateCheckout` with the cart total and number of items when the page mounts.

---

## Technical Details

| Event | Where | Data sent |
|---|---|---|
| `PageView` | `index.html` (all pages) | Automatic |
| `ViewContent` | Each product page `useEffect` | `content_name`, `content_type`, `value`, `currency` |
| `AddToCart` | `cartStore.ts` after successful add | `content_name`, `content_ids`, `value`, `currency` |
| `InitiateCheckout` | `CheckoutPage.tsx` on mount | `value`, `currency`, `num_items` |

### Files to create
- `src/lib/meta-pixel.ts` (tiny helper)

### Files to modify
- `index.html` (add pixel base code)
- `src/stores/cartStore.ts` (AddToCart event)
- `src/pages/CheckoutPage.tsx` (InitiateCheckout event)
- `src/pages/GLP1Page.tsx` (ViewContent)
- `src/pages/TPrime365Page.tsx` (ViewContent)
- `src/pages/NHTOPage.tsx` (ViewContent)
- `src/pages/UCOSPage.tsx` (ViewContent)
- `src/pages/GLP1BundlePage.tsx` (ViewContent)

### Purchase event
The `Purchase` event cannot be tracked here since the actual transaction happens on Shopify's domain. You should install the **Meta Sales Channel** in your Shopify Admin to handle `Purchase` tracking and server-side Conversions API (CAPI) automatically.

