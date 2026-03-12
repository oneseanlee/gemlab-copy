

## Diagnosis: Why Leads Dropped Off

### The Data (Real Leads Only)

| Date | Real Leads | Notes |
|------|-----------|-------|
| Mar 3 | 3 unique people (Gabriela, Catia, Sean) | 40 total rows — but 36 were **duplicate resubmissions** from the same 3 people testing the form |
| Mar 4 | 1 unique (Sean testing) | 10 duplicates from Sean |
| Mar 5 | **8 unique real leads** | Best day — Calvin, Sean, Anna, Nick, Lemuel, Taneka, Yahaira, Catia |
| Mar 6 | 1 (Shey Hawks) | |
| Mar 7 | 1 (Ramon Blue → **purchased**) | |
| Mar 8 | 1 (Dorothy Perkins) | |
| Mar 9 | 1 (Kelsie Ingalls) | |
| Mar 10 | 0 real (10 were fakedata test rows) | |
| Mar 11 | 1 (Carissa Thomas → **purchased**) | |
| Mar 12 | 1 (Shey Hawks again) | |

### Key Finding: The "early high numbers" were fake
Mar 3-4 looked great (40 and 11 leads) but were actually 3-4 people clicking submit repeatedly. A rate limiter was added afterward, which correctly prevents that now. The real baseline was always ~1-8 leads/day.

### Three Real Problems

**1. The `/glp1-article` advertorial page completely skips lead capture.**
When someone clicks "Get the Protocol" on `/glp1-article`, the code adds the product to cart and redirects **straight to the Shopify checkout URL** — no name, no email, no database insert. These visitors are lost entirely from your lead tracking. If any ads point to this page, every click is an invisible visitor.

**2. The `/glp1-protocol` page sends users to `/checkout`, not `/glp1-buy`.**
The "Order Now" buttons on `/glp1-protocol` add the product to cart and navigate to `/checkout`. The `/glp1-buy` page is a separate standalone landing page. So your ad traffic flow is:
- Ad → `/glp1-protocol` → visitor scrolls → clicks "Order Now" → `/checkout` (lead captured here)
- Most visitors **never click Order Now** — they bounce. At ~100 visitors/day with 1 lead, that's a ~1% click-through-to-form rate, which is low but not unusual for cold traffic landing on a long-form page.

**3. No lead capture happens until the visitor takes an action.**
There's no email capture on the browsing pages themselves (`/glp1-protocol`, `/glp1-article`). The exit-intent popup exists but only offers a discount code — it doesn't capture email.

### Plan to Fix

**Phase 1 — Plug the `/glp1-article` leak**
- Add a lead capture step before the Shopify redirect on `/glp1-article`, matching the pattern used on `/glp1-buy` (name + email → insert to `checkout_leads` → then redirect).

**Phase 2 — Make the exit-intent popup actually capture leads**
- Update `ExitIntentPopup` to include a name + email form.
- On submit, insert into `checkout_leads` (or a new `exit_intent_leads` source column).
- Show the discount code only after capture.
- Deploy this on `/glp1-protocol`, `/glp1-article`, and `/glp1-buy`.

**Phase 3 — Add inline email capture on `/glp1-protocol`**
- Add a lightweight "Get your free protocol guide" email capture midway through the page, before asking for purchase commitment.
- This captures browsing visitors who aren't ready to buy but are interested enough to keep reading.

**Phase 4 — Track which ad landing page visitors actually arrive on**
- The `page_views` tracking code is not yet live on the published site.
- Once published, you'll be able to see exactly how traffic splits between `/glp1-protocol`, `/glp1-buy`, and `/glp1-article`, and correlate with lead rates per page.

### Expected Impact
- Phase 1 alone could recover significant leads if any ads point to `/glp1-article`
- Phase 2 (exit-intent with email capture) typically captures 3-5% of bouncing visitors
- Phase 3 (inline capture) can add another 2-4% capture rate on browsing visitors
- Combined: could go from 1 lead/day to 5-10+ leads/day at current traffic levels

