import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const RECOVERY_URL = "https://www.cell365power.com/glp1-buy?recover=1";

async function ghlRequest(path: string, method: string, body: Record<string, unknown>, apiKey: string) {
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
    throw new Error(`GHL API ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function findOrCreateContact(
  apiKey: string,
  locationId: string,
  contact: { firstName: string; email: string; tags: string[] }
): Promise<string> {
  const searchRes = await fetch(
    `${GHL_API_BASE}/contacts/?locationId=${locationId}&query=${encodeURIComponent(contact.email)}`,
    { headers: { Authorization: `Bearer ${apiKey}`, Version: "2021-07-28" } }
  );
  const searchData = await searchRes.json();
  if (searchData.contacts?.length > 0) {
    const existing = searchData.contacts[0];
    if (contact.tags.length) {
      await ghlRequest(`/contacts/${existing.id}`, "PUT", {
        tags: [...new Set([...(existing.tags || []), ...contact.tags])],
      }, apiKey);
    }
    return existing.id;
  }
  const created = await ghlRequest("/contacts/", "POST", {
    locationId,
    firstName: contact.firstName,
    email: contact.email,
    source: "Best365 Labs Website",
    tags: contact.tags,
  }, apiKey);
  return created.contact?.id;
}

function buildRecoveryHtml(firstName: string): string {
  const safeName = firstName.replace(/[<>&"]/g, "").slice(0, 60) || "there";
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f6f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f5f0;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;padding:40px 32px;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
        <tr><td>
          <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:600;margin:0 0 16px;color:#0a0a0a;">${safeName}, your protocol is still reserved.</h1>
          <p style="font-size:16px;line-height:1.6;margin:0 0 16px;color:#333;">You started checkout for the <strong>GLP-1 Optimization Protocol</strong> but didn't finish. Your launch pricing of <strong>$39.95</strong> (56% off) is still active — but only for a short time.</p>
          <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#333;">Here's what's waiting in your cart:</p>
          <ul style="font-size:15px;line-height:1.7;color:#333;padding-left:20px;margin:0 0 28px;">
            <li>30-day GLP-1 Optimization Protocol — <strong>$39.95</strong></li>
            <li>The Ultimate GLP-1 User's Master Guide — <span style="color:#16a34a;font-weight:600;">FREE</span></li>
            <li>Lymphatic Morning Jumpstart System — <span style="color:#16a34a;font-weight:600;">FREE</span></li>
            <li>Smart Science of Enhanced Absorption — <span style="color:#16a34a;font-weight:600;">FREE</span></li>
            <li>Best365 Labs Community Access — <span style="color:#16a34a;font-weight:600;">FREE</span></li>
            <li>Free shipping included</li>
          </ul>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr><td align="center" style="border-radius:8px;background:#0a0a0a;">
              <a href="${RECOVERY_URL}" style="display:inline-block;padding:16px 32px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">Complete My Order →</a>
            </td></tr>
          </table>
          <p style="font-size:14px;line-height:1.6;margin:28px 0 0;color:#666;text-align:center;">Backed by our 30-day, 100% money-back guarantee.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:32px 0;" />
          <p style="font-size:12px;line-height:1.5;color:#999;margin:0;text-align:center;">Best 365 Labs, Inc · 14857 S Concorde Park Dr, Bluffdale, UT 84065</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const ghlApiKey = Deno.env.get("GHL_API_KEY");
  const ghlLocationId = Deno.env.get("GHL_LOCATION_ID");

  if (!ghlApiKey || !ghlLocationId) {
    return new Response(JSON.stringify({ error: "GHL credentials not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Eligible: glp1-buy lead, not completed, no recovery sent, created 60–180 minutes ago
  const now = Date.now();
  const windowEnd = new Date(now - 60 * 60 * 1000).toISOString();
  const windowStart = new Date(now - 180 * 60 * 1000).toISOString();

  const { data: leads, error } = await supabase
    .from("checkout_leads")
    .select("id, email, first_name, phone")
    .eq("source", "glp1-buy")
    .eq("completed", false)
    .is("recovery_email_sent_at", null)
    .gte("created_at", windowStart)
    .lte("created_at", windowEnd)
    .limit(50);

  if (error) {
    console.error("Lookup failed", error);
    return new Response(JSON.stringify({ error: "DB error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let sent = 0;
  let failed = 0;

  for (const lead of leads || []) {
    try {
      const html = buildRecoveryHtml(lead.first_name || "there");
      const contactId = await findOrCreateContact(ghlApiKey, ghlLocationId, {
        firstName: lead.first_name || "",
        email: lead.email,
        tags: ["abandoned-checkout", "glp1-buy"],
      });
      const result = await ghlRequest("/conversations/messages", "POST", {
        type: "Email",
        contactId,
        subject: `${lead.first_name || "Hey"}, your GLP-1 Protocol is still reserved`,
        html,
        emailTo: lead.email,
        emailFrom: "Best 365 Labs <info@email.cell365power.com>",
      }, ghlApiKey);

      await supabase.from("checkout_leads").update({
        recovery_email_sent_at: new Date().toISOString(),
      }).eq("id", lead.id);

      await supabase.from("email_send_log").insert({
        message_id: result?.messageId || crypto.randomUUID(),
        template_name: "abandoned_checkout_recovery",
        recipient_email: lead.email,
        status: "sent",
        metadata: { lead_id: lead.id, source: "glp1-buy" },
      });
      sent++;
    } catch (e) {
      failed++;
      console.error("Recovery send failed", { leadId: lead.id, error: e instanceof Error ? e.message : String(e) });
      await supabase.from("email_send_log").insert({
        message_id: crypto.randomUUID(),
        template_name: "abandoned_checkout_recovery",
        recipient_email: lead.email,
        status: "failed",
        error_message: e instanceof Error ? e.message : String(e),
        metadata: { lead_id: lead.id },
      });
    }
  }

  return new Response(JSON.stringify({ success: true, candidates: leads?.length || 0, sent, failed }), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});