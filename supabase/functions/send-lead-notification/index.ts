import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHL_API_BASE = "https://services.leadconnectorhq.com";

async function ghlRequest(
  path: string,
  method: string,
  body: Record<string, unknown>,
  apiKey: string
) {
  const res = await fetch(`${GHL_API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`GHL API error [${res.status}] ${path}:`, JSON.stringify(data));
    throw new Error(`GHL API call failed [${res.status}]: ${JSON.stringify(data)}`);
  }
  return data;
}

async function findOrCreateContact(
  apiKey: string,
  locationId: string,
  contact: { firstName: string; email: string; phone?: string; source?: string; tags?: string[] }
): Promise<string> {
  const searchRes = await fetch(
    `${GHL_API_BASE}/contacts/?locationId=${locationId}&query=${encodeURIComponent(contact.email)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
    }
  );
  const searchData = await searchRes.json();

  if (searchData.contacts?.length > 0) {
    const existing = searchData.contacts[0];
    console.log("Found existing GHL contact:", existing.id);
    if (contact.tags?.length) {
      await ghlRequest(`/contacts/${existing.id}`, "PUT", {
        tags: [...new Set([...(existing.tags || []), ...contact.tags])],
      }, apiKey);
    }
    return existing.id;
  }

  const createData = await ghlRequest("/contacts/", "POST", {
    locationId,
    firstName: contact.firstName,
    email: contact.email,
    phone: contact.phone || undefined,
    source: contact.source || "Best365 Labs Website",
    tags: contact.tags || [],
  }, apiKey);

  console.log("Created new GHL contact:", createData.contact?.id);
  return createData.contact?.id;
}

async function sendGHLEmail(
  apiKey: string,
  contactId: string,
  subject: string,
  html: string,
  emailTo: string,
  emailFrom: string
) {
  return await ghlRequest("/conversations/messages", "POST", {
    type: "Email",
    contactId,
    subject,
    html,
    emailTo: emailTo,
    emailFrom: emailFrom,
  }, apiKey);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");
  const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
  const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");

  if (!notificationEmail) {
    return new Response(JSON.stringify({ error: "NOTIFICATION_EMAIL not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return new Response(JSON.stringify({ error: "GHL credentials not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

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

    // Step 1: Sync contact to GHL (with tags)
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

    const contactId = await findOrCreateContact(GHL_API_KEY, GHL_LOCATION_ID, {
      firstName: record.first_name || record.campaign || "Unknown",
      email: record.email || "",
      phone: record.phone || undefined,
      source: ghlSource,
      tags: ghlTags,
    });

    console.log("GHL contact synced:", contactId);

    // Step 2: Send notification email via GHL
    // Find/create the admin contact to receive notifications
    const adminContactId = await findOrCreateContact(GHL_API_KEY, GHL_LOCATION_ID, {
      firstName: "Admin",
      email: notificationEmail,
      source: "Internal",
      tags: ["admin-notifications"],
    });

    const emailResult = await sendGHLEmail(
      GHL_API_KEY,
      adminContactId,
      subject,
      htmlBody,
      notificationEmail,
      "Best 365 Labs <info@email.cell365power.com>"
    );

    console.log("GHL notification email sent:", emailResult?.messageId || "ok");

    // Log to email_send_log
    await supabase.from("email_send_log").insert({
      message_id: emailResult?.messageId || crypto.randomUUID(),
      template_name: "lead_notification",
      recipient_email: notificationEmail,
      status: "sent",
    });

    return new Response(JSON.stringify({ success: true, contactId, messageId: emailResult?.messageId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Notification error:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
