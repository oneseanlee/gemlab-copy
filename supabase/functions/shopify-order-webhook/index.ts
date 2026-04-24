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

function normalizeEmail(value?: string | null): string {
  return (value ?? "").trim().toLowerCase();
}

function normalizeName(value?: string | null): string {
  return (value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function toAmount(value: unknown): number | null {
  const numericValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numericValue)) return null;
  return Number(numericValue.toFixed(2));
}

function getOrderNames(order: Record<string, any>) {
  const firstName = normalizeName(
    order.customer?.first_name || order.billing_address?.first_name || ""
  );
  const lastName = normalizeName(
    order.customer?.last_name || order.billing_address?.last_name || ""
  );
  const fullName = normalizeName(`${firstName} ${lastName}`.trim());

  return { firstName, fullName };
}

function isNameMatch(leadName: string, orderFirstName: string, orderFullName: string): boolean {
  if (!leadName) return false;
  if (orderFullName && leadName === orderFullName) return true;
  if (orderFirstName && (leadName === orderFirstName || leadName.startsWith(`${orderFirstName} `))) {
    return true;
  }
  return false;
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

  const rawBody = await req.text();

  const hmac = req.headers.get("X-Shopify-Hmac-Sha256") || "";
  if (!verifyShopifyHmac(rawBody, hmac, webhookSecret)) {
    console.error("Invalid HMAC signature");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let order: Record<string, any>;
  try {
    order = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const email = normalizeEmail(order.contact_email || order.email || "");
  if (!email) {
    console.warn("Order has no email, skipping", { orderId: order.id });
    return new Response(JSON.stringify({ skipped: true, reason: "no email" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  console.log("Processing paid order", { orderId: order.id, email });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const orderCreatedAt = new Date(order.processed_at || order.created_at || Date.now());
  const windowStart = new Date(orderCreatedAt.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const windowEnd = new Date(orderCreatedAt.getTime() + 24 * 60 * 60 * 1000).toISOString();
  const orderAmount = toAmount(order.total_price);
  const { firstName: orderFirstName, fullName: orderFullName } = getOrderNames(order);
  const shopifyOrderId = order.id != null ? String(order.id) : null;

  // Idempotency check: if this Shopify order_id has already been recorded, skip.
  if (shopifyOrderId) {
    const { data: existing, error: existingError } = await supabase
      .from("checkout_leads")
      .select("id")
      .eq("shopify_order_id", shopifyOrderId)
      .limit(1);

    if (existingError) {
      console.error("Idempotency lookup failed", { error: existingError, shopifyOrderId });
    } else if (existing && existing.length > 0) {
      console.log("Order already processed — skipping duplicate webhook fire", {
        shopifyOrderId,
        email,
      });
      return new Response(
        JSON.stringify({ success: true, duplicate: true, shopifyOrderId }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  const { data: pendingLeads, error: pendingLeadsError } = await supabase
    .from("checkout_leads")
    .select("id, email, first_name, cart_total, created_at")
    .eq("completed", false)
    .gte("created_at", windowStart)
    .lte("created_at", windowEnd)
    .order("created_at", { ascending: false })
    .limit(500);

  if (pendingLeadsError) {
    console.error("Failed to load pending checkout leads", { error: pendingLeadsError, email });
    return new Response(JSON.stringify({ error: "DB lookup failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const emailMatches = (pendingLeads || []).filter((lead) => normalizeEmail(lead.email) === email);

  let matchedLeadIds = emailMatches.map((lead) => lead.id);
  let reconciliationStrategy: "email" | "name_total_fallback" | "unmatched" = "email";

  if (matchedLeadIds.length === 0 && orderAmount !== null) {
    const fallbackMatches = (pendingLeads || []).filter((lead) => {
      const leadAmount = toAmount(lead.cart_total);
      const leadName = normalizeName(lead.first_name);
      return leadAmount === orderAmount && isNameMatch(leadName, orderFirstName, orderFullName);
    });

    if (fallbackMatches.length === 1) {
      matchedLeadIds = [fallbackMatches[0].id];
      reconciliationStrategy = "name_total_fallback";
      console.warn("Webhook used fallback lead reconciliation", {
        orderId: order.id,
        email,
        matchedLeadId: fallbackMatches[0].id,
        orderFullName,
        orderAmount,
      });
    } else if (fallbackMatches.length > 1) {
      reconciliationStrategy = "unmatched";
      console.error("Ambiguous fallback lead reconciliation", {
        orderId: order.id,
        email,
        orderFullName,
        orderAmount,
        candidateLeadIds: fallbackMatches.map((lead) => lead.id),
      });
    }
  }

  let updatedCount = 0;

  if (matchedLeadIds.length > 0) {
    const { data, error } = await supabase
      .from("checkout_leads")
      .update({ completed: true, shopify_order_id: shopifyOrderId })
      .in("id", matchedLeadIds)
      .eq("completed", false)
      .select("id");

    if (error) {
      console.error("Failed to update checkout_leads", { error, email, matchedLeadIds });
      return new Response(JSON.stringify({ error: "DB update failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    updatedCount = data?.length || 0;
  } else {
    reconciliationStrategy = "unmatched";
    console.warn("No checkout lead matched paid order", {
      orderId: order.id,
      email,
      orderFullName,
      orderAmount,
    });
  }

  console.log("Marked leads as completed", { email, updatedCount, reconciliationStrategy });

  try {
    const orderItems = (order as any).line_items?.map((li: any) => li.title).join(", ") || "Unknown";
    const totalPrice = (order as any).total_price || "0.00";
    const customerName = (order as any).customer?.first_name || (order as any).billing_address?.first_name || email.split("@")[0];

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    await fetch(`${supabaseUrl}/functions/v1/ghl-sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        action: "add_note",
        contact: {
          firstName: customerName,
          email,
          source: "Shopify Order",
          tags: ["customer", "shopify-purchase"],
        },
        order: {
          orderId: order.id,
          totalPrice,
          items: orderItems,
        },
      }),
    });
    console.log("GHL order sync triggered for", email);
  } catch (ghlErr) {
    console.error("GHL order sync failed (non-blocking):", ghlErr);
  }

  try {
    const lineItems = (order as any).line_items || [];
    const hasGlp1 = lineItems.some((item: any) =>
      (item.title || "").toLowerCase().includes("glp-1") ||
      (item.title || "").toLowerCase().includes("glp1")
    );

    if (hasGlp1) {
      const deliveryEmail = normalizeEmail(order.contact_email || order.email || "");
      const deliveryName =
        (order as any).customer?.first_name ||
        (order as any).billing_address?.first_name ||
        deliveryEmail.split("@")[0];

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

      await fetch(`${supabaseUrl}/functions/v1/send-digital-delivery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          email: deliveryEmail,
          firstName: deliveryName,
          orderId: order.id,
        }),
      });
      console.log("Digital delivery email triggered for", deliveryEmail);
    }
  } catch (deliveryErr) {
    console.error("Digital delivery email failed (non-blocking):", deliveryErr);
  }

  return new Response(
    JSON.stringify({ success: true, updatedCount, reconciliationStrategy }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});