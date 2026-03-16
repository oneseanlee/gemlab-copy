

## Create UTM Capture Utility

**Goal**: Add a new `src/lib/utm-capture.ts` file alongside the existing `src/lib/utm.ts`. This new utility adds first-touch attribution preservation, click ID capture (fbclid/gclid), landing page tracking, and Shopify-compatible attribute formatting.

### Changes

**1. Create `src/lib/utm-capture.ts`** — New file with the exact code provided by the user, containing:
- `captureUTMs()` — captures UTM params + click IDs on first landing only (first-touch), stores in sessionStorage under `c365_utm_data`
- `getStoredUTMs()` — retrieves stored UTM data
- `getAttributeParams()` — formats stored UTMs as Shopify `attributes[key]=value` query params

**Note**: The existing `src/lib/utm.ts` (using `b365_utm` storage key) remains untouched. The two utilities coexist with separate storage keys and serve different purposes — the original for lead inserts, the new one for Shopify attribution.

