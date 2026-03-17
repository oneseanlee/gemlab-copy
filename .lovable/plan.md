

## Plan: Remove Resend — Route All Emails Through Your Existing System

### Why This Is the Best Way

Your project already has:
- A verified email domain (`cell365power.com`) in Lovable
- A working email API (`sendLovableEmail` via `@lovable.dev/email-js`)
- A durable queue system (`enqueue_email` RPC + `process-email-queue` cron every 5s)
- Built-in retry logic, rate-limit handling, dead-letter queues, and send logging

Two edge functions bypass all of this and call Resend directly. That's the sole reason Resend exists in this project. Removing it means:
- **One email system** instead of two
- **No Resend account or domain verification needed**
- **All emails get retries, logging, and rate-limit protection** automatically

### What Changes

**1. Rewrite `send-lead-notification/index.ts`**
- Remove Resend API key check and `fetch("https://api.resend.com/emails", ...)`
- Add Supabase service-role client
- Keep all HTML template building exactly as-is
- Keep all GHL sync logic exactly as-is
- After GHL sync, enqueue the notification email:
```typescript
await supabase.rpc('enqueue_email', {
  queue_name: 'transactional_emails',
  payload: {
    to: notificationEmail,
    from: 'Best365 Labs <notify@cell365power.com>',
    sender_domain: 'notify.cell365power.com',
    subject,
    html: htmlBody,
    text: htmlBody.replace(/<[^>]*>/g, ''),
    purpose: 'transactional',
    message_id: crypto.randomUUID(),
    queued_at: new Date().toISOString(),
  }
})
```

**2. Rewrite `send-digital-delivery/index.ts`**
- Remove Resend API key check and `fetch("https://api.resend.com/emails", ...)`
- Add Supabase service-role client
- Keep React Email template rendering (`DigitalDeliveryEmail`) exactly as-is
- Enqueue the rendered email:
```typescript
await supabase.rpc('enqueue_email', {
  queue_name: 'transactional_emails',
  payload: {
    to: email,
    from: 'Best 365 Labs <noreply@cell365power.com>',
    sender_domain: 'notify.cell365power.com',
    subject: 'Your Digital Guides & Community Access Are Ready 🎉',
    html,
    text,
    purpose: 'transactional',
    message_id: crypto.randomUUID(),
    queued_at: new Date().toISOString(),
  }
})
```

**3. Upgrade `auth-email-hook/index.ts` to use the queue**
- The current version sends emails directly (old pattern). It should be upgraded to enqueue via `enqueue_email` RPC for retry safety and consistency.
- Use `scaffold_auth_email_templates` with `confirm_overwrite: true` to get the queue-based version, then redeploy.

**4. Deploy all three updated edge functions**

### What Stays the Same
- All email templates (HTML and React Email components) — no visual changes
- GHL sync logic in lead notifications
- The `process-email-queue` cron job (already running)
- All database tables and RPC functions

### From Addresses
| Email Type | From Address |
|---|---|
| Auth (signup, recovery, etc.) | `cell365power <noreply@cell365power.com>` |
| Lead/checkout notifications | `Best365 Labs <notify@cell365power.com>` |
| Digital delivery (customer) | `Best 365 Labs <noreply@cell365power.com>` |

All sent through the verified `notify.cell365power.com` infrastructure automatically.

### After Implementation
- Remove `notify.cell365power.com` from your Resend dashboard
- The `RESEND_API_KEY` secret becomes unused (can clean up later, harmless to leave)

