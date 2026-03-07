import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { createHmac, timingSafeEqual } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function verifyShopifyHmac(body: string, hmacHeader: string, secret: string): boolean {
  const digest = createHmac("sha256", secret).update(body, "utf8").digest("base64");
  try {
    return timingSafeEqual(
      new TextEncoder().encode(digest),
      new TextEncoder().encode(hmacHeader)
    );
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const webhookSecret = Deno.env.get("SHOPIFY_WEBHOOK_SECRET");
  if (!webhookSecret) {
    console.error("SHOPIFY_WEBHOOK_SECRET not configured");
    return new Response(JSON.stringify({ error: "Server config error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Read body once for both verification and parsing
  const rawBody = await req.text();

  // Verify HMAC signature
  const hmac = req.headers.get("X-Shopify-Hmac-Sha256") || "";
  if (!verifyShopifyHmac(rawBody, hmac, webhookSecret)) {
    console.error("Invalid HMAC signature");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Parse order payload
  let order: { email?: string; contact_email?: string; id?: number };
  try {
    order = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const email = (order.contact_email || order.email || "").toLowerCase().trim();
  if (!email) {
    console.warn("Order has no email, skipping", { orderId: order.id });
    return new Response(JSON.stringify({ skipped: true, reason: "no email" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  console.log("Processing paid order", { orderId: order.id, email });

  // Update checkout_leads using service role
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data, error } = await supabase
    .from("checkout_leads")
    .update({ completed: true })
    .eq("email", email)
    .eq("completed", false)
    .select("id");

  if (error) {
    console.error("Failed to update checkout_leads", { error, email });
    return new Response(JSON.stringify({ error: "DB update failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const updatedCount = data?.length || 0;
  console.log("Marked leads as completed", { email, updatedCount });

  return new Response(
    JSON.stringify({ success: true, updatedCount }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
