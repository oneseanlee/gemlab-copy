## Goal

Make HappyMD sub-referrer attribution actually work for the TPrime365 embedded checkout, matching the official HappyMD snippet, so links like `cell365power.com/tprime365?ref=jay-atkins` credit Jay under the Cell365Power parent vendor.

## What the HappyMD email revealed

1. **`vendor_id` must be on the iframe URL** (currently missing from our checkout iframe — this is the likely root cause of attribution failing).
2. Ref should persist 30 days across sessions via `localStorage`, not session-only.
3. Resolution order: URL `?ref=` → stored ref → `TPRIME365CELL`.
4. UTM `utm_campaign` should NOT be a fallback (your call — partner ref wins, parent code is the only floor).

## Changes

### 1. `src/lib/ref.ts` — upgrade storage

- Switch `sessionStorage` → `localStorage` with 30-day TTL, stored as `{ value, expires }` (matches HappyMD's shape exactly).
- Light sanitization only: trim + length cap at 64. Do NOT lowercase or strip characters — HappyMD's own snippet stores the raw value, and partner slugs may be case-sensitive on their side.
- `getRefParam()` returns `null` and purges if expired.
- Keep exported names (`captureRefParam`, `getRefParam`) so all call sites continue working with no edits.

### 2. `src/components/HappyMDCheckout/HappyMDCheckout.tsx` — fix the iframe URL

- **Add `vendor_id=TPRIME365CELL`** to the checkout URL (the missing piece).
- Drop `utm_campaign` from the `tracking_code` resolution. New order: explicit prop → URL `?ref=` → stored ref → `TPRIME365CELL`.
- Continue forwarding UTM params as separate query keys (they don't override `tracking_code`, just preserved for HappyMD's own analytics).
- No change to button variant logic beyond the same `tracking_code` precedence.

### 3. `src/App.tsx` — no change

`captureRefParam()` is already called at module load. Picks up the new logic automatically.

### 4. `src/pages/TPrime365IntakePage.tsx` — no change

Already builds its own URL with `vendor_id=best365labgqzb` for the intake form (different HappyMD product). The upgraded `getRefParam()` flows through with no edits needed.

## Verification

After build, in the preview:
1. `/?ref=jay-atkins` → SPA-navigate to `/tprime365` → inspect checkout iframe `src`, expect `vendor_id=TPRIME365CELL&tracking_code=jay-atkins`.
2. Clear storage → `/tprime365?ref=jay-atkins` direct → same.
3. Clear storage → `/tprime365` cold → expect `vendor_id=TPRIME365CELL&tracking_code=TPRIME365CELL`.
4. Confirm intake page `/tprime365-intake` still gets the ref appended to its own iframe URL.

## Files touched

- `src/lib/ref.ts` (rewrite, ~25 lines)
- `src/components/HappyMDCheckout/HappyMDCheckout.tsx` (add vendor_id, drop UTM fallback in tracking_code)

No DB, no edge functions, no UI changes, no other files touched.
