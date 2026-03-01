

## Capture Checkout Visitor Names

### Goal
Create a system to track who reaches the checkout page, including their name, email, cart contents, and timestamp.

### Approach
Create a dedicated `checkout_leads` table and add a "First Name" field to the checkout form. When a user submits the form, their info is saved to the database before redirecting to Shopify payment.

### Changes

**1. New Database Table: `checkout_leads`**
- `id` (uuid, primary key)
- `created_at` (timestamp)
- `first_name` (text, required)
- `last_name` (text, optional)
- `email` (text, required)
- `phone` (text, optional)
- `cart_items` (jsonb -- product names, variant IDs, quantities, prices)
- `cart_total` (numeric)
- `completed` (boolean, default false -- can be updated later if purchase is confirmed)
- RLS policy: allow anonymous inserts with validation (email format, length checks, rate limiting)

**2. Update Checkout Form (`src/pages/CheckoutPage.tsx`)**
- Add "First Name" and "Last Name" fields above the email field
- Update the Zod validation schema to require first name
- On form submit, save the lead to `checkout_leads` before opening the Shopify checkout URL

**3. Update Types**
- The `src/integrations/supabase/types.ts` file will auto-update after migration

### What You Will See
- The checkout form will have First Name and Last Name fields
- Every checkout attempt is logged to the database with full cart details
- You can query this data to see who reached checkout, what they were buying, and follow up with abandoned carts

