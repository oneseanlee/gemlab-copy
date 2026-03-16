

## Build Post-Purchase Digital Delivery Email

When the existing Shopify `orders/paid` webhook fires and the order contains a GLP-1 Protocol line item, automatically send a branded email with download links and community access.

### Digital Product Links

| Product | Online Version | PDF Download |
|---------|---------------|--------------|
| GLP-1 Master Guide | report.cell365power.com/glp1-users-master-guide | Google Drive link |
| Lymphatic Jumpstart | report.cell365power.com/10-min-lymphatic-jumpstart | Google Drive link |
| Maximize Your Results | report.cell365power.com/maximize-your-results | Google Drive link |
| Community Access | skool.com/best-365-labs-community-7298/about | — |

### Step 1 — Create email template

Create `supabase/functions/_shared/email-templates/digital-delivery.tsx` — a branded React Email template matching existing Best365 Labs styling (logo, #3376b0 primary, Playfair Display headings). Contains:

- "Your Digital Guides Are Ready" heading
- Personalized greeting with customer's first name
- 3 guide sections, each with two buttons: "Read Online" (report links) and "Download PDF" (Google Drive links)
- 1 community section with "Join the Community" button (Skool link)
- Footer note about the GLP-1 Protocol shipping separately

### Step 2 — Create delivery edge function

Create `supabase/functions/send-digital-delivery/index.ts`:

- Accepts POST with `{ email, firstName, orderId }`
- Renders the digital-delivery template with React Email
- Sends via the Lovable Email API from `noreply@notify.cell365power.com`
- Returns success/failure

### Step 3 — Update Shopify order webhook

In `supabase/functions/shopify-order-webhook/index.ts`, after the existing GHL sync block (~line 128), add a non-blocking call to `send-digital-delivery`:

- Check if any `line_items` title contains "GLP-1" or matches the GLP-1 variant ID
- If yes, call `send-digital-delivery` with the customer email, first name, and order ID
- Wrapped in try/catch so it never breaks the webhook response

### Step 4 — Register and deploy

- Add `send-digital-delivery` to `supabase/config.toml` with `verify_jwt = false`
- Deploy both `send-digital-delivery` and `shopify-order-webhook`

### Result

Customers who purchase the GLP-1 Protocol receive a branded email within seconds containing direct links to read their 3 guides online, download PDFs, and join the Skool community.

