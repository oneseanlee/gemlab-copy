## Goal
Install HappyMD's signed attribution loader site-wide and align the TPrime365 embed snippet with the canonical install guide (June 3, 2026). NHTO and NHTO Bundle pages stay untouched. Plan default remains `monthly`.

## Current state vs PDF
| Item | Status |
|---|---|
| `app.happymd.co/partner.js` site-wide loader in `<head>` | ❌ missing |
| `embed-helper.js` URL | ✅ correct |
| `data-happymd-partner="cell365power"` | ✅ default |
| `data-vendor-id="cell365power"` | ❌ emits `data-happymd-vendor="TPRIME365CELL"` |
| Iframe `vendor_id` URL param | ❌ sends `TPRIME365CELL`, should be `cell365power` |
| Plan default | Keep `monthly` (current code sends `subscription` — rename) |

## Changes

### 1. `index.html` — add partner.js loader
Inside `<head>`, after existing preconnects:
```html
<link rel="preconnect" href="https://app.happymd.co" />
<script src="https://app.happymd.co/partner.js"
        data-partner-id="cell365power"
        async></script>
```

### 2. `src/components/HappyMDCheckout/HappyMDCheckout.tsx`
Only affects the TPrime365 embedded checkout (NHTO pages don't use this component's button/iframe with embed — they're left alone).

- Change `PARENT_VENDOR_ID` from `"TPRIME365CELL"` to `"cell365power"` so the iframe URL sends `vendor_id=cell365power`.
- Default `plan` from `"subscription"` → `"monthly"` (matches PDF allowed values `one_time | monthly` and matches our current subscription intent).
- In `HappyMDCheckoutButton`, replace `data-happymd-vendor={PARENT_VENDOR_ID}` with `data-vendor-id="cell365power"` (canonical attribute name).
- Keep `data-happymd-tracking={code}` for sub-affiliate `?ref=` overrides — additive, doesn't conflict.

### 3. NHTO / NHTO Bundle pages — no changes
Per user: leave `/nhto`, `/nhto-bundle` (and intake) untouched.

## Verification (post-deploy)
1. Incognito → `cell365power.com` → DevTools → Application → Session Storage → confirm `happymd_attribution_v1` key with `journeyId` + `sig` within ~5s.
2. Navigate to `/tprime-buy` → click into checkout iframe → confirm same `journeyId` flows through.
3. Optional $0.50 live test (`4242 4242 4242 4242`) → check `app.happymd.co/partner-portal` for Clicks +1 / Conversions +1 under `cell365power`.

## Out of scope
- `useHappyMDPurchaseTag` hook and `happymd-purchase-tag` edge function (already wired previously).
- NHTO pages and any other product surface.
