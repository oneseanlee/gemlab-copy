import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (token !== adminPassword) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Fetch checkout leads
  const { data: leads, error: leadsError } = await supabase
    .from("checkout_leads")
    .select("*")
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
    .select("*")
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

    // Daily breakdown
    const dailyMap = new Map<string, { views: number; visitors: Set<string> }>();
    trafficData.forEach((r: any) => {
      const day = r.created_at.slice(0, 10);
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
