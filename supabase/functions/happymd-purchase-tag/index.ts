import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

/**
 * happymd-purchase-tag
 * --------------------
 * Fired when a HappyMD checkout success event is observed on the buy page.
 * Looks up the GHL contact by email and applies a purchase tag.
 *
 * NOTE: This function is built but intentionally NOT wired into the live
 * funnel yet. It is safe to deploy — nothing calls it until we confirm.
 *
 * Body: { email: string; tag?: string; trackingCode?: string }
 */

interface RequestBody {
  email?: string;
  tag?: string;
  trackingCode?: string;
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const DEFAULT_TAG = "tprime365-purchase";

async function ghlFetch(path: string, init: RequestInit, apiKey: string) {
  const res = await fetch(`${GHL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
      ...(init.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`GHL API [${res.status}] ${path}: ${JSON.stringify(data)}`);
  }
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Service-role-only guard. This function is not wired into client code;
  // only trusted server-side callers (or future internal proxies that hold
  // the service role key) may invoke it. Blocks anon-key abuse that would
  // let anyone tag arbitrary GHL contacts.
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!serviceKey || token !== serviceKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Allowlist of tags this endpoint may apply.
  const ALLOWED_TAGS = new Set(["tprime365-purchase", "glp1-purchase", "ucos-purchase"]);

  const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
  const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return new Response(JSON.stringify({ error: "GHL not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: RequestBody = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const tag = (body.tag || DEFAULT_TAG).trim();

    if (!EMAIL_RE.test(email) || email.length > 255) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ALLOWED_TAGS.has(tag)) {
      return new Response(JSON.stringify({ error: "Tag not allowed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Find contact by email
    const search = await ghlFetch(
      `/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(email)}`,
      { method: "GET" },
      GHL_API_KEY,
    );

    const contact = search.contacts?.[0];
    if (!contact) {
      return new Response(
        JSON.stringify({ success: false, reason: "contact_not_found", email }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Merge tag without dropping existing ones
    const tags = [...new Set([...(contact.tags || []), tag])];
    await ghlFetch(`/contacts/${contact.id}`, { method: "PUT", body: JSON.stringify({ tags }) }, GHL_API_KEY);

    console.log(`[happymd-purchase-tag] tagged ${email} with "${tag}"`);
    return new Response(
      JSON.stringify({ success: true, contactId: contact.id, tag }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[happymd-purchase-tag] error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});