import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 10;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const adminPassword = Deno.env.get("ADMIN_DASHBOARD_PASSWORD");
  if (!adminPassword) {
    return new Response(JSON.stringify({ error: "Server config error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Check rate limit before validating password
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("failed_admin_attempts")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("attempted_at", windowStart);

  if ((count ?? 0) >= MAX_ATTEMPTS) {
    return new Response(JSON.stringify({ error: "Too many attempts. Try again later." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (token !== adminPassword) {
    // Record failed attempt
    await supabase.from("failed_admin_attempts").insert({ ip_address: ip });

    // Cleanup old attempts (older than 1 hour)
    const cleanupTime = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    await supabase.from("failed_admin_attempts").delete().lt("attempted_at", cleanupTime);

    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Fetch checkout leads
  const { data: leads, error: leadsError } = await supabase
    .from("checkout_leads")
    .select("*, source, utm_params")
    .order("created_at", { ascending: false });

  if (leadsError) {
    return new Response(JSON.stringify({ error: leadsError.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Fetch intake/guide leads
  const { data: intakeLeads, error: intakeError } = await supabase
    .from("leads")
    .select("*, utm_params")
    .order("created_at", { ascending: false });

  if (intakeError) {
    return new Response(JSON.stringify({ error: intakeError.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Fetch traffic stats (aggregated)
  const { data: trafficData, error: trafficError } = await supabase
    .from("page_views")
    .select("page_path, visitor_id, created_at");

  // Helper: convert UTC timestamp to Pacific Time date string (YYYY-MM-DD)
  const toPTDate = (utcStr: string) =>
    new Date(utcStr).toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });

  const traffic = {
    totalPageViews: 0,
    uniqueVisitors: 0,
    dailyTraffic: [] as { date: string; views: number; unique: number }[],
    topPages: [] as { page: string; views: number; unique: number }[],
  };

  if (!trafficError && trafficData) {
    traffic.totalPageViews = trafficData.length;
    const uniqueSet = new Set(trafficData.map((r: any) => r.visitor_id));
    traffic.uniqueVisitors = uniqueSet.size;

    // Daily breakdown (bucketed by Pacific Time)
    const dailyMap = new Map<string, { views: number; visitors: Set<string> }>();
    trafficData.forEach((r: any) => {
      const day = toPTDate(r.created_at);
      const entry = dailyMap.get(day) || { views: 0, visitors: new Set<string>() };
      entry.views++;
      entry.visitors.add(r.visitor_id);
      dailyMap.set(day, entry);
    });
    traffic.dailyTraffic = Array.from(dailyMap.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, v]) => ({ date, views: v.views, unique: v.visitors.size }));

    // Top pages
    const pageMap = new Map<string, { views: number; visitors: Set<string> }>();
    trafficData.forEach((r: any) => {
      const entry = pageMap.get(r.page_path) || { views: 0, visitors: new Set<string>() };
      entry.views++;
      entry.visitors.add(r.visitor_id);
      pageMap.set(r.page_path, entry);
    });
    traffic.topPages = Array.from(pageMap.entries())
      .sort((a, b) => b[1].views - a[1].views)
      .slice(0, 15)
      .map(([page, v]) => ({ page, views: v.views, unique: v.visitors.size }));
  }

  return new Response(JSON.stringify({ leads, intakeLeads: intakeLeads || [], traffic }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
