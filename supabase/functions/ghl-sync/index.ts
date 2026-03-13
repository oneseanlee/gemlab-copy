const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHL_API_BASE = "https://services.leadconnectorhq.com";

interface GHLContactPayload {
  firstName: string;
  email: string;
  phone?: string;
  source?: string;
  tags?: string[];
  customField?: Record<string, string>;
}

interface GHLSyncRequest {
  action: "create_contact" | "add_opportunity" | "add_note" | "add_tags";
  contact: GHLContactPayload;
  opportunity?: {
    pipelineId: string;
    stageId: string;
    name: string;
    monetaryValue?: number;
  };
  note?: string;
  order?: {
    orderId: number | string;
    totalPrice: string;
    items: string;
  };
}

async function ghlRequest(path: string, method: string, body: Record<string, unknown>, apiKey: string) {
  const res = await fetch(`${GHL_API_BASE}${path}`, {
    method,
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Version": "2021-07-28",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error(`GHL API error [${res.status}] ${path}:`, JSON.stringify(data));
    throw new Error(`GHL API call failed [${res.status}]: ${JSON.stringify(data)}`);
  }
  return data;
}

async function findOrCreateContact(
  apiKey: string,
  locationId: string,
  contact: GHLContactPayload
): Promise<string> {
  // Try to find existing contact by email
  const searchRes = await fetch(
    `${GHL_API_BASE}/contacts/?locationId=${locationId}&query=${encodeURIComponent(contact.email)}`,
    {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Version": "2021-07-28",
      },
    }
  );
  const searchData = await searchRes.json();

  if (searchData.contacts?.length > 0) {
    const existing = searchData.contacts[0];
    console.log("Found existing GHL contact:", existing.id);

    // Update with any new tags
    if (contact.tags?.length) {
      await ghlRequest(`/contacts/${existing.id}`, "PUT", {
        tags: [...new Set([...(existing.tags || []), ...contact.tags])],
      }, apiKey);
    }

    return existing.id;
  }

  // Create new contact
  const createData = await ghlRequest("/contacts/", "POST", {
    locationId,
    firstName: contact.firstName,
    email: contact.email,
    phone: contact.phone || undefined,
    source: contact.source || "Best365 Labs Website",
    tags: contact.tags || [],
    customFields: contact.customField ? Object.entries(contact.customField).map(([key, value]) => ({ key, field_value: value })) : [],
  }, apiKey);

  console.log("Created new GHL contact:", createData.contact?.id);
  return createData.contact?.id;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Authenticate: only allow calls with the service role key
  const authHeader = req.headers.get("Authorization") || "";
  const expectedKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  if (authHeader !== `Bearer ${expectedKey}`) {
    console.error("Unauthorized ghl-sync call");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const GHL_API_KEY = Deno.env.get("GHL_API_KEY");
  if (!GHL_API_KEY) {
    console.error("GHL_API_KEY not configured");
    return new Response(JSON.stringify({ error: "GHL_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");
  if (!GHL_LOCATION_ID) {
    console.error("GHL_LOCATION_ID not configured");
    return new Response(JSON.stringify({ error: "GHL_LOCATION_ID not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: GHLSyncRequest = await req.json();
    const { action, contact, opportunity, note, order } = body;

    // Step 1: Always find or create the contact
    const contactId = await findOrCreateContact(GHL_API_KEY, GHL_LOCATION_ID, contact);

    const result: Record<string, unknown> = { contactId };

    // Step 2: Add opportunity if requested
    if (action === "add_opportunity" && opportunity) {
      const oppData = await ghlRequest("/opportunities/", "POST", {
        pipelineId: opportunity.pipelineId,
        locationId: GHL_LOCATION_ID,
        stageId: opportunity.stageId,
        name: opportunity.name,
        contactId,
        monetaryValue: opportunity.monetaryValue || 0,
        status: "open",
      }, GHL_API_KEY);
      result.opportunityId = oppData.opportunity?.id;
    }

    // Step 3: Add note if requested (for order details, UTM data, etc.)
    if ((action === "add_note" || note) && contactId) {
      const noteBody = note || (order
        ? `Order #${order.orderId} — Total: $${order.totalPrice}\nItems: ${order.items}`
        : "Contact synced from Best365 Labs");

      await ghlRequest(`/contacts/${contactId}/notes`, "POST", {
        body: noteBody,
      }, GHL_API_KEY);
      result.noteAdded = true;
    }

    // Step 4: Add tags if provided
    if (action === "add_tags" && contact.tags?.length) {
      await ghlRequest(`/contacts/${contactId}`, "PUT", {
        tags: contact.tags,
      }, GHL_API_KEY);
      result.tagsUpdated = true;
    }

    console.log("GHL sync complete:", result);

    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GHL sync error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
