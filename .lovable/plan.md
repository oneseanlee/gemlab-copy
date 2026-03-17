

## Update GHL "From" Email Address

Two-line change across two edge functions, then redeploy.

### Changes

**1. `supabase/functions/send-digital-delivery/index.ts`**
- Change `emailFrom` from `Best 365 Labs <noreply@cell365power.com>` to `Best 365 Labs <info@email.cell365power.com>`

**2. `supabase/functions/send-lead-notification/index.ts`**
- Change `emailFrom` from `Best365 Labs <notify@cell365power.com>` to `Best 365 Labs <info@email.cell365power.com>`

**3. Redeploy both edge functions**

Both functions will use the verified subdomain `email.cell365power.com`, which keeps your root domain reputation isolated from transactional email traffic.

