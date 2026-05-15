## Goal

Give HappyMD (Darren) a single webhook URL they can POST to when a TPrime365 customer completes **both payment and the intake form**. We mark that lead as fully converted in our database and fire downstream events (GHL sync, admin notification, conversion analytics).

## Endpoint

`POST https://yyuoyitapltnuqhkjyfd.supabase.co/functions/v1/happymd-conversion-webhook`

- New Supabase Edge Function: `supabase/functions/happymd-conversion-webhook/index.ts`
- `verify_jwt = false` (external service) — added to `supabase/config.toml`
- Auth: shared secret in header `x-happymd-signature` (HMAC-SHA256 of raw body using `HAPPYMD_WEBHOOK_SECRET`). We'll request that secret from the user once, then share the value with Darren.

## Expected payload (what we ask Darren to send)

```json
{
  "event": "conversion.completed",
  "email": "customer@example.com",
  "tracking_code": "TPRIME365CELL",
  "product": "tprime365",
  "happymd_order_id": "hmd_abc123",
  "amount": 199.00,
  "intake_completed_at": "2026-05-15T12:34:56Z",
  "payment_completed_at": "2026-05-15T12:30:00Z"
}
```

Only `event`, `email`, and `tracking_code` are required; the rest are optional metadata.

## What the function does

1. Validate HMAC signature → 401 if mismatch.
2. Validate body with Zod → 400 on bad input.
3. Lookup lead in `public.leads` by normalized email + source `tprime365`.
4. Update the lead row:
   - `happymd_completed = true`
   - `happymd_completed_at = now()` (only if not already set)
5. Insert a row into `public.intake_completions` (`source='tprime365'`, `tracking_code` from payload) for analytics parity with the iframe path.
6. Fire side effects (best-effort, errors logged but not fatal):
   - Call existing `ghl-sync` function with a `conversion_completed` tag so the contact gets tagged in GHL.
   - Call existing `send-lead-notification` function with `type: 'happymd_conversion'` so the team gets an email.
7. Return `200 { success: true, lead_id, already_completed }`.

Idempotent: re-deliveries with the same email won't double-update or double-notify (we check `happymd_completed` first and return `already_completed: true`).

## Database changes

Small migration to support the webhook:

- Add `RPC` `mark_happymd_completed_private(p_email text, p_tracking_code text)` (SECURITY DEFINER) that does the lead update + intake_completions insert atomically and returns the lead row. Mirrors the existing `mark_intake_completed_private` pattern.
- No table schema changes needed — `leads.happymd_completed` and `leads.happymd_completed_at` already exist.

## Secret

Add one new secret via the secrets tool:
- `HAPPYMD_WEBHOOK_SECRET` — random 32-byte hex string we generate and share with Darren.

## Files touched

- **New:** `supabase/functions/happymd-conversion-webhook/index.ts`
- **Edit:** `supabase/config.toml` (register function with `verify_jwt = false`)
- **New migration:** create `mark_happymd_completed_private` RPC

## Out of scope (call out, don't build)

- No changes to the existing `/tprime365-intake` iframe flow — it keeps firing its own `mark-intake-completed` call. The new webhook is additive and authoritative when HappyMD calls it.
- No retry queue on our side — we rely on HappyMD's webhook retry behavior.
- No admin UI changes; the existing dashboard already reads `happymd_completed`.

## Handoff to Darren

Once deployed, send him:
- URL: `…/functions/v1/happymd-conversion-webhook`
- Header: `x-happymd-signature: <hex HMAC-SHA256 of raw body using shared secret>`
- Sample payload (above)
- The shared secret value (separate channel)
