## Goal

Per the happyMD install guide, when a visitor lands with `?ref=<partner-slug>` (e.g. `cell365power.com/?ref=jay-atkins`), that ref must be forwarded to every happyMD embed as the tracking code (`data-happymd-tracking` on buttons, `tracking_code=` query param on iframes). This attributes the consultation/purchase to the right partner inside happyMD.

The guide's vanilla `<script>` snippet works on plain HTML sites, but our checkout buttons and iframes are React components that build their own URLs/attributes — we need to do the equivalent inside those components, and persist the ref across in-app navigation (same pattern we already use for UTMs).

## Changes

### 1. New helper: `src/lib/ref.ts`

Small module mirroring `src/lib/utm.ts`:
- `captureRefParam()` — reads `?ref=` from `window.location.search` and stores it in `sessionStorage` under `b365_ref`. Only overwrites when a new ref is present, so deep links keep attribution through the funnel.
- `getRefParam(): string | null` — returns the stored ref (or null).

### 2. Call `captureRefParam()` on app load

In `src/App.tsx`, alongside the existing `captureUtmParams()` / `captureUTMs()` calls at module top, add `captureRefParam()` so the ref is captured on the very first page hit.

### 3. `src/components/HappyMDCheckout/HappyMDCheckout.tsx`

Make the stored ref the highest-priority tracking code in all three usages:

- `buildCheckoutUrl` (used by `HappyMDCheckoutIframe`): change the code precedence to `trackingCode ?? getRefParam() ?? utm.utm_campaign ?? "TPRIME365CELL"`. Add `getRefParam()` to the `useMemo` dependency list so navigation that lands with a new ref rebuilds the iframe URL.
- `HappyMDCheckoutButton`: apply the same precedence when computing `code` for the `data-happymd-tracking` attribute. This is the React equivalent of the snippet in Step 2 of the PDF.
- Also forward `ref` as a passthrough query param on the iframe URL (harmless if happyMD ignores it; useful for their logs).

### 4. Intake page iframes

`src/pages/TPrime365IntakePage.tsx` and `src/pages/NHTOIntakePage.tsx` build the happyMD intake iframe URL inline with a hardcoded `tracking_code` (`TPRIME365CELL` / `UCOSNHTOCELL`). Update both so the iframe `src` is computed at render time:

- If a stored ref exists, use it as `tracking_code` (overriding the hardcoded default).
- Keep the hardcoded value as the fallback so non-referral traffic behaves exactly as today.
- The `generate_lead` dataLayer push and `send-lead-notification` / `mark-intake-completed` payloads should also send the effective tracking code (ref when present) so downstream attribution stays consistent.

No change to the default codes when no `?ref` is present — existing campaigns keep working unchanged.

### 5. Verification (per the PDF's Step 3)

After implementing:
- Load `/?ref=test-install`, navigate to `/tprime365`, open devtools and confirm the embedded iframe `src` contains `tracking_code=test-install`.
- Navigate to `/tprime365-intake` and confirm the intake iframe `src` also contains `tracking_code=test-install`.
- Confirm a visit without `?ref` still resolves to `TPRIME365CELL` / `UCOSNHTOCELL`.

## Files touched

- `src/lib/ref.ts` (new)
- `src/App.tsx` (one-line capture call)
- `src/components/HappyMDCheckout/HappyMDCheckout.tsx`
- `src/pages/TPrime365IntakePage.tsx`
- `src/pages/NHTOIntakePage.tsx`

## Out of scope

- No backend/database changes.
- No changes to the GLP-1 / UCOS / Shopify checkout flows (those don't go through happyMD).
- No new UI; purely attribution plumbing.
