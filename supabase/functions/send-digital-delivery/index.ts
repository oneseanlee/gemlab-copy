import * as React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { DigitalDeliveryEmail } from "../_shared/email-templates/digital-delivery.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FROM_EMAIL = "Best 365 Labs <noreply@cell365power.com>";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!resendKey) {
    console.error("RESEND_API_KEY not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
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

    // Send via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "Your Digital Guides & Community Access Are Ready 🎉",
        html,
        text,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend email failed:", resendRes.status, errText);
      return new Response(
        JSON.stringify({ error: `Email send failed: ${errText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendData = await resendRes.json();
    console.log("Digital delivery email sent via Resend", { email, id: resendData.id });

    return new Response(
      JSON.stringify({ success: true, id: resendData.id }),
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
