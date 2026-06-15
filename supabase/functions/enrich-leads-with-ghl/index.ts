import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GHL_API_BASE = "https://services.leadconnectorhq.com";

async function findPhoneByEmail(email: string, apiKey: string, locationId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${GHL_API_BASE}/contacts/?locationId=${locationId}&query=${encodeURIComponent(email)}`,
      { headers: { Authorization: `Bearer ${apiKey}`, Version: "2021-07-28" } }
    );
    if (!res.ok) {
      console.warn(`GHL search failed for ${email}: ${res.status}`);
      return null;
    }
    const data = await res.json();
    const contact = (data.contacts || []).find((c: any) => (c.email || "").toLowerCase() === email.toLowerCase()) || data.contacts?.[0];
    return contact?.phone || null;
  } catch (e) {
    console.error(`GHL lookup error for ${email}:`, e);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const adminPassword = Deno.env.get("ADMIN_DASHBOARD_PASSWORD");
  const body = await req.json().catch(() => ({}));
  const provided = body.password || req.headers.get("x-admin-password") || "";
  if (!adminPassword || provided !== adminPassword) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const ghlKey = Deno.env.get("GHL_API_KEY");
  const ghlLoc = Deno.env.get("GHL_LOCATION_ID");
  if (!ghlKey || !ghlLoc) {
    return new Response(JSON.stringify({ error: "GHL credentials missing" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const since = body.since || "2026-04-01";

  // Pull leads missing phones
  const { data: leads } = await supabase
    .from("leads")
    .select("id, email, phone")
    .gte("created_at", since)
    .or("phone.is.null,phone.eq.");
  const { data: checkoutLeads } = await supabase
    .from("checkout_leads")
    .select("id, email, phone")
    .gte("created_at", since)
    .or("phone.is.null,phone.eq.");

  const results: Array<{ table: string; email: string; phone: string | null; updated: boolean }> = [];
  const phoneCache = new Map<string, string | null>();

  async function processRow(table: "leads" | "checkout_leads", row: { id: string; email: string }) {
    const email = row.email.toLowerCase().trim();
    let phone = phoneCache.get(email);
    if (phone === undefined) {
      phone = await findPhoneByEmail(email, ghlKey, ghlLoc);
      phoneCache.set(email, phone);
    }
    let updated = false;
    if (phone) {
      const { error } = await supabase.from(table).update({ phone }).eq("id", row.id);
      if (!error) updated = true;
      else console.error(`Update failed ${table}/${row.id}:`, error);
    }
    results.push({ table, email, phone, updated });
  }

  for (const row of leads || []) await processRow("leads", row as any);
  for (const row of checkoutLeads || []) await processRow("checkout_leads", row as any);

  const enriched = results.filter((r) => r.updated).length;
  return new Response(
    JSON.stringify({
      scanned: results.length,
      enriched,
      results,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});