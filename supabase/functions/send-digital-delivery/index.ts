import * as React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { createClient } from "npm:@supabase/supabase-js@2";
import { DigitalDeliveryEmail } from "../_shared/email-templates/digital-delivery.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SENDER_DOMAIN = "notify.cell365power.com";
const FROM_DOMAIN = "cell365power.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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

    // Enqueue via durable email queue instead of direct send
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: msgId, error: enqueueError } = await supabase.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        to: email,
        from: `Best 365 Labs <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject: "Your Digital Guides & Community Access Are Ready 🎉",
        html,
        text,
        purpose: "transactional",
        template_name: "digital_delivery",
      },
    });

    if (enqueueError) {
      console.error("Email enqueue failed", { error: enqueueError.message, email });
      return new Response(
        JSON.stringify({ error: enqueueError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Digital delivery email enqueued", { email, message_id: msgId });

    return new Response(
      JSON.stringify({ success: true, message_id: msgId }),
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
