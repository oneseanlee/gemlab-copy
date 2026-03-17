import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SENDER_DOMAIN = "notify.cell365power.com";
const SENDER_DOMAIN = "notify.cell365power.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");
  if (!notificationEmail) {
    return new Response(JSON.stringify({ error: "NOTIFICATION_EMAIL not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { type, record } = body;

    let subject = "";
    let htmlBody = "";

    if (type === "lead") {
      subject = `🟢 New Lead: ${record.first_name} (${record.source})`;
      htmlBody = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#3376b0;">New Lead Captured</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${record.first_name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${record.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">${record.source || "unknown"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Time</td><td style="padding:8px;">${record.created_at || new Date().toISOString()}</td></tr>
          </table>
        </div>`;
    } else if (type === "checkout_lead") {
      subject = `🛒 New Checkout Lead: ${record.first_name}`;
      htmlBody = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#3376b0;">New Checkout Lead</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${record.first_name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${record.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Cart Total</td><td style="padding:8px;border-bottom:1px solid #eee;">$${record.cart_total}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Time</td><td style="padding:8px;">${record.created_at || new Date().toISOString()}</td></tr>
          </table>
        </div>`;
    } else if (type === "happymd_form") {
      subject = `📋 HappyMD Form Completed: ${record.campaign || "Unknown Campaign"}`;
      htmlBody = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#3376b0;">HappyMD Intake Form Submitted</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Campaign</td><td style="padding:8px;border-bottom:1px solid #eee;">${record.campaign}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Tracking Code</td><td style="padding:8px;border-bottom:1px solid #eee;">${record.tracking_code}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Page URL</td><td style="padding:8px;border-bottom:1px solid #eee;">${record.page_url}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Time</td><td style="padding:8px;">${new Date().toISOString()}</td></tr>
          </table>
        </div>`;
    } else {
      return new Response(JSON.stringify({ error: "Unknown notification type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Sync to Go High Level (before email so it always runs)
    try {
      const ghlTags: string[] = [];
      let ghlSource = "Best365 Labs Website";

      if (type === "lead") {
        ghlTags.push("lead", record.source || "direct");
        ghlSource = record.source || "direct";
      } else if (type === "checkout_lead") {
        ghlTags.push("checkout-lead", "cart-abandonment");
        ghlSource = record.source || "checkout";
      } else if (type === "happymd_form") {
        ghlTags.push("happymd-intake", record.campaign || "unknown");
        ghlSource = record.campaign || "happymd";
      }

      const utm = record.utm_params;
      if (utm && typeof utm === "object") {
        if (utm.utm_source) ghlTags.push(`utm-source:${utm.utm_source}`);
        if (utm.utm_medium) ghlTags.push(`utm-medium:${utm.utm_medium}`);
        if (utm.utm_campaign) ghlTags.push(`utm-campaign:${utm.utm_campaign}`);
      }

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      await fetch(`${supabaseUrl}/functions/v1/ghl-sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          action: "create_contact",
          contact: {
            firstName: record.first_name || record.campaign || "Unknown",
            email: record.email || "",
            phone: record.phone || undefined,
            source: ghlSource,
            tags: ghlTags,
            customField: utm && typeof utm === "object" ? {
              utm_source: utm.utm_source || "",
              utm_medium: utm.utm_medium || "",
              utm_campaign: utm.utm_campaign || "",
            } : undefined,
          },
        }),
      });
      console.log("GHL sync triggered for", type);
    } catch (ghlErr) {
      console.error("GHL sync failed (non-blocking):", ghlErr);
    }

    // Enqueue notification email via the durable email queue
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: msgId, error: enqueueError } = await supabase.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        to: notificationEmail,
        from: `Best365 Labs Notifications <notify@${SENDER_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html: htmlBody,
        text: htmlBody.replace(/<[^>]*>/g, ""),
        purpose: "transactional",
        label: "lead_notification",
      },
    });

    if (enqueueError) {
      console.error("Email enqueue failed:", enqueueError.message);
      return new Response(JSON.stringify({ error: enqueueError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Notification email enqueued", { type, message_id: msgId });

    return new Response(JSON.stringify({ success: true, message_id: msgId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Notification error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
