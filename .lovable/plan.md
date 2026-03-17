

## Convert All Timestamps to Pacific Time (PT)

There are two places where timestamps need to be converted from UTC to Pacific Time:

### 1. Edge Function (daily traffic bucketing)

The `admin-dashboard-data` edge function groups page views into daily buckets using `r.created_at.slice(0, 10)`, which extracts the UTC date. This means a visit at 11pm PT on Sunday gets bucketed as Monday in UTC.

**Fix**: Convert each `created_at` to Pacific Time before slicing the date. Use `toLocaleString('en-CA', { timeZone: 'America/Los_Angeles' }).slice(0, 10)` to get the PT date string (en-CA gives YYYY-MM-DD format).

### 2. Frontend (AdminDashboardPage.tsx)

Multiple places display or bucket by date using raw UTC timestamps:

- **Lead table timestamps** (lines ~700, ~754): `new Date(l.created_at).toLocaleDateString()` and `.toLocaleTimeString()` — these use the browser's local timezone. Need to force `timeZone: 'America/Los_Angeles'`.
- **Daily breakdown bucketing** (lines ~217, ~228): `l.created_at.slice(0, 10)` extracts the UTC date for lead grouping. Need to convert to PT first.
- **Date filter comparison** (lines ~119-120): `l.created_at.slice(0, 10)` compared against date-picker values. Same fix needed.
- **CSV export timestamps** (lines ~266, ~278): `new Date(l.created_at).toLocaleString()` — force PT timezone.

### Implementation

**A. Create a PT utility** at the top of `AdminDashboardPage.tsx`:
```typescript
const toPT = (utc: string) => new Date(utc).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
const toPTDate = (utc: string) => new Date(utc).toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" }); // YYYY-MM-DD
```

**B. Update `admin-dashboard-data/index.ts`**: Use the same PT conversion when bucketing `dailyTraffic` and `topPages`.

**C. Update all frontend date displays and groupings** to use `toPTDate()` / `toPT()` instead of raw UTC slicing or default locale.

**D. Add a "All times Pacific (PT)" label** to the dashboard header for clarity.

### Files Changed
- `supabase/functions/admin-dashboard-data/index.ts` — PT-aware daily bucketing
- `src/pages/AdminDashboardPage.tsx` — PT formatting everywhere

