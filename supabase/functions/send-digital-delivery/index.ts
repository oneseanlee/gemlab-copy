import * as React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { DigitalDeliveryEmail } from "../_shared/email-templates/digital-delivery.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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

    // Enqueue via the durable email queue
    const supabase = createClient(supabaseUrl, serviceKey);
    const messageId = crypto.randomUUID();

    const { error: enqueueError } = await supabase.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        to: email,
        from: "Best 365 Labs <noreply@cell365power.com>",
        sender_domain: "notify.cell365power.com",
        subject: "Your Digital Guides & Community Access Are Ready 🎉",
        html,
        text,
        purpose: "transactional",
        label: "digital_delivery",
        message_id: messageId,
        queued_at: new Date().toISOString(),
      },
    });

    if (enqueueError) {
      console.error("Failed to enqueue digital delivery email:", enqueueError);
      return new Response(
        JSON.stringify({ error: "Failed to enqueue email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Digital delivery email enqueued", { email, messageId });

    return new Response(
      JSON.stringify({ success: true, message_id: messageId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to enqueue email";
    console.error("Digital delivery email failed", { error: message, email });
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
