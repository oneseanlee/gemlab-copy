import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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
    // type: "lead", "checkout_lead", or "happymd_form"

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

    // Send email via Lovable Email API
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRes = await fetch("https://api.lovable.dev/v1/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: notificationEmail,
        subject,
        html: htmlBody,
        from: "Best365 Labs Notifications <notify@notify.cell365power.com>",
        purpose: "transactional",
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Email send failed:", errText);
      return new Response(JSON.stringify({ error: "Failed to send notification" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
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
