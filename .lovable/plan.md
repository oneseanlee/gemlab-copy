

## Admin Dashboard for Checkout Leads

### Overview
Build a password-protected admin dashboard at `/admin` that queries the `checkout_leads` table and displays conversion metrics, daily breakdowns, and individual lead details.

### Access Control
- Simple client-side password gate (prompt for a password stored as a constant or environment variable) -- no auth system needed for an internal tool
- Not exposed in navigation; access by typing `/admin` directly

### Database Changes
- Add a **SELECT policy** for `anon` role on `checkout_leads` -- currently only `service_role` can read. Alternatively, create an **Edge Function** that uses the service role key to fetch data securely.
- **Recommended approach**: Use an Edge Function (`admin-dashboard-data`) with a simple bearer token check, so the `checkout_leads` table stays locked down to `service_role` only. The dashboard calls this function with a password/token.

### Edge Function: `supabase/functions/admin-dashboard-data/index.ts`
- Accepts GET request with `Authorization: Bearer <ADMIN_PASSWORD>` header
- Validates against a `ADMIN_DASHBOARD_PASSWORD` secret
- Queries `checkout_leads` ordered by `created_at DESC`
- Returns all rows (should be small volume)

### Frontend: `src/pages/AdminDashboardPage.tsx`
- **Password gate**: Simple input + submit, stores password in sessionStorage
- **Summary cards** at top:
  - Total leads
  - Completed (sales)
  - Abandoned
  - Conversion rate (%)
- **Daily breakdown table**: Date | Leads | Sales | Abandoned | Conversion %
- **Leads table**: Name | Email | Phone | Cart Items | Total | Status | Date
  - Status shown as green "Completed" or red "Abandoned" badge
- Styled with existing Tailwind + shadcn components (Card, Table, Badge)

### Route
- Add `/admin` route to `App.tsx`

### Files to Create/Modify
1. **Create** `supabase/functions/admin-dashboard-data/index.ts` -- secure data endpoint
2. **Create** `src/pages/AdminDashboardPage.tsx` -- dashboard UI
3. **Create** `src/pages/AdminDashboardPage.css` -- minimal custom styles
4. **Modify** `src/App.tsx` -- add `/admin` route
5. **Add secret** `ADMIN_DASHBOARD_PASSWORD` via secrets tool

