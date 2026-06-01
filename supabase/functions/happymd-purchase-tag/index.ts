import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

/**
 * happymd-purchase-tag
 * --------------------
 * Fired by `useHappyMDPurchaseTag` when a HappyMD checkout success
 * postMessage is observed on a buy / intake page. Performs three things,
 * each idempotent:
 *   1. Upserts a row in `public.leads` and marks `happymd_completed = true`
 *   2. Inserts a row in `public.intake_completions` (funnel analytics)
 *   3. Tags the matching GHL contact with the supplied purchase tag
 *
 * Body: {
 *   email: string;
 *   tag?: "tprime365-purchase" | "glp1-purchase" | "ucos-purchase";
 *   trackingCode?: string;
 *   firstName?: string;
 *   source?: string; // e.g. "tprime365" | "nhto" | "tprime-buy"
 * }
 *
 * Callable with the project anon key (clients invoke directly from the
 * browser). Abuse is bounded by: strict input validation, a tag allowlist,
 * and the natural idempotency of `happymd_completed` (re-firing for the
 * same email is a no-op for both the lead row and the GHL tag set).
 */

interface RequestBody {
  email?: string;
  tag?: string;
  trackingCode?: string;
  firstName?: string;
  source?: string;
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const DEFAULT_TAG = "tprime365-purchase";
const ALLOWED_TAGS = new Set(["tprime365-purchase", "glp1-purchase", "ucos-purchase"]);
const ALLOWED_SOURCES = new Set(["tprime365", "nhto", "tprime-buy", "glp1", "ucos"]);

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

  const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
  const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!GHL_API_KEY || !GHL_LOCATION_ID || !SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: "Server not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const body: RequestBody = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const tag = (body.tag || DEFAULT_TAG).trim();
    const trackingCode = (body.trackingCode || "").trim().slice(0, 64) || "TPRIME365CELL";
    const firstName = (body.firstName || "").trim().slice(0, 100) || "HappyMD Buyer";
    const source = ALLOWED_SOURCES.has((body.source || "").trim())
      ? (body.source as string).trim()
      : "tprime365";

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

    // ── 1. Persist the buyer on our side (idempotent) ──────────────────
    const { data: existingLead } = await admin
      .from("leads")
      .select("id, happymd_completed")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let alreadyCompleted = false;
    if (existingLead) {
      alreadyCompleted = !!existingLead.happymd_completed;
      if (!alreadyCompleted) {
        await admin
          .from("leads")
          .update({ happymd_completed: true, happymd_completed_at: new Date().toISOString() })
          .eq("id", existingLead.id);
      }
    } else {
      await admin.from("leads").insert({
        first_name: firstName,
        email,
        source,
        happymd_completed: true,
        happymd_completed_at: new Date().toISOString(),
      });
    }

    if (!alreadyCompleted) {
      await admin
        .from("intake_completions")
        .insert({ source, tracking_code: trackingCode });
    }

    // ── 2. Tag the GHL contact ─────────────────────────────────────────
    // Find contact by email
    const search = await ghlFetch(
      `/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(email)}`,
      { method: "GET" },
      GHL_API_KEY,
    );

    const contact = search.contacts?.[0];
    if (!contact) {
      console.log(`[happymd-purchase-tag] no GHL contact for ${email} — lead persisted only`);
      return new Response(
        JSON.stringify({ success: true, reason: "contact_not_found", email, leadPersisted: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Merge tag without dropping existing ones
    const tags = [...new Set([...(contact.tags || []), tag])];
    await ghlFetch(`/contacts/${contact.id}`, { method: "PUT", body: JSON.stringify({ tags }) }, GHL_API_KEY);

    console.log(`[happymd-purchase-tag] tagged ${email} with "${tag}" (alreadyCompleted=${alreadyCompleted})`);
    return new Response(
      JSON.stringify({ success: true, contactId: contact.id, tag, alreadyCompleted }),
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