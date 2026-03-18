import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHL_BASE = "https://services.leadconnectorhq.com";
const CALENDAR_ID = "3d6bWBAUBH4knTmsIyaX";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
    if (!GHL_API_KEY) {
      throw new Error("GHL_API_KEY is not configured");
    }

    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const timezone = url.searchParams.get("timezone") || "America/New_York";

    if (!startDate || !endDate) {
      return new Response(
        JSON.stringify({ error: "startDate and endDate are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ghlUrl = `${GHL_BASE}/calendars/${CALENDAR_ID}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=${encodeURIComponent(timezone)}`;

    const response = await fetch(ghlUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${GHL_API_KEY}`,
        Version: "2021-04-15",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("GHL API error:", response.status, data);
      return new Response(
        JSON.stringify({ error: "Failed to fetch slots", detail: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
