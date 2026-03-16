import * as React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { sendLovableEmail } from "npm:@lovable.dev/email-js";
import { DigitalDeliveryEmail } from "../_shared/email-templates/digital-delivery.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SITE_NAME = "cell365power";
const SENDER_DOMAIN = "notify.cell365power.com";
const FROM_DOMAIN = "cell365power.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.error("LOVABLE_API_KEY not configured");
    return new Response(
      JSON.stringify({ error: "Server config error" }),
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
    const text = await renderAsync(
      React.createElement(DigitalDeliveryEmail, { firstName, orderId }),
      { plainText: true }
    );

    const result = await sendLovableEmail(
      {
        to: email,
        from: `Best 365 Labs <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: "Your Digital Guides & Community Access Are Ready 🎉",
        html,
        text,
        purpose: "transactional",
      },
      { apiKey }
    );

    console.log("Digital delivery email sent", { email, message_id: result.message_id });

    return new Response(
      JSON.stringify({ success: true, message_id: result.message_id }),
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
