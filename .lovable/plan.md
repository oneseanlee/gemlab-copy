

## Send Digital Delivery Email to Tim Miller

The most recent completed purchase is from **Tim** at `tim@gozealio.com` (March 17, 2026).

### Action

Call the `send-digital-delivery` edge function with:
- **email**: tim@gozealio.com
- **firstName**: Tim

This will:
1. Find or create Tim's contact in GHL
2. Tag him with `digital-delivery` and `customer`
3. Send the branded digital guides email (3 guides + community access) from `Best 365 Labs <info@email.cell365power.com>`
4. Log the send to `email_send_log`

Single API call — no code changes needed.

