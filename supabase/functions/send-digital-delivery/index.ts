import * as React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { DigitalDeliveryEmail } from "../_shared/email-templates/digital-delivery.tsx";

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
  contact: { firstName: string; email: string; tags?: string[] }
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
    source: "Best365 Labs Website",
    tags: contact.tags || [],
  }, apiKey);

  console.log("Created new GHL contact:", createData.contact?.id);
  return createData.contact?.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
  const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return new Response(
      JSON.stringify({ error: "GHL credentials not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let email: string;
  let firstName: string;
  let orderId: string | number | undefined;

  try {
    const body = await req.json();
    email = body.email;
    firstName = body.firstName || "there";
    orderId = body.orderId;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (!email) {
    return new Response(
      JSON.stringify({ error: "Missing email" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  console.log("Rendering digital delivery email", { email, firstName, orderId });

  try {
    const html = await renderAsync(
      React.createElement(DigitalDeliveryEmail, { firstName, orderId })
    );

    // Step 1: Find/create GHL contact
    const contactId = await findOrCreateContact(GHL_API_KEY, GHL_LOCATION_ID, {
      firstName,
      email,
      tags: ["digital-delivery", "customer"],
    });

    // Step 2: Send email via GHL Conversations API
    const emailResult = await ghlRequest("/conversations/messages", "POST", {
      type: "Email",
      contactId,
      subject: "Your Digital Guides & Community Access Are Ready 🎉",
      html,
      emailTo: email,
      emailFrom: "Best 365 Labs <noreply@cell365power.com>",
    }, GHL_API_KEY);

    console.log("Digital delivery email sent via GHL", { email, messageId: emailResult?.messageId });

    // Log to email_send_log
    const supabase = createClient(supabaseUrl, serviceKey);
    const messageId = emailResult?.messageId || crypto.randomUUID();

    await supabase.from("email_send_log").insert({
      message_id: messageId,
      template_name: "digital_delivery",
      recipient_email: email,
      status: "sent",
    });

    return new Response(
      JSON.stringify({ success: true, message_id: messageId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    console.error("Digital delivery email failed", { error: message, email });
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
