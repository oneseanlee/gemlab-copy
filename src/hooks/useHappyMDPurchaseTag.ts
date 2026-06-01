import { useEffect } from "react";

/**
 * useHappyMDPurchaseTag
 * ---------------------
 * Listens for HappyMD checkout "payment success" postMessages and forwards
 * the buyer's email to the `happymd-purchase-tag` edge function. That
 * function (idempotently) records the buyer in `public.leads`, marks the
 * intake completed, and applies a purchase tag to the matching GHL contact.
 *
 * Mount this on any page that embeds the HappyMD iframe (buy + intake).
 * In dev/preview every HappyMD-origin message is logged to the console so
 * we can verify the real event shape on the first live purchase.
 */

const HAPPYMD_ORIGINS = ["https://app.happymd.co", "https://happymd.co"];

// Candidate success event names. HappyMD has not yet confirmed which one
// they emit — once observed in the console log below we'll narrow this.
const SUCCESS_TYPES = [
  "payment:success",
  "payment_success",
  "order:complete",
  "order_complete",
  "checkout:success",
  "checkout_complete",
  "purchase",
  "purchase:complete",
];

interface Options {
  tag?: string;
  trackingCode?: string;
  source?: string;
  enabled?: boolean;
}

export function useHappyMDPurchaseTag({
  tag = "tprime365-purchase",
  trackingCode,
  source,
  enabled = true,
}: Options = {}) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    let fired = false;

    const handleMessage = (e: MessageEvent) => {
      if (!HAPPYMD_ORIGINS.includes(e.origin)) return;
      // Debug: surface every HappyMD-origin message so we can identify the
      // real success event name + payload shape on the first live purchase.
      try {
        console.info("[happymd-purchase-tag] message:", e.origin, e.data);
      } catch {}

      const type = typeof e.data === "string" ? e.data : e.data?.type;
      if (!type || !SUCCESS_TYPES.includes(type)) return;
      if (fired) return;
      fired = true;

      const payload = (typeof e.data === "object" && e.data) || {};
      const email =
        payload.email ||
        payload?.customer?.email ||
        payload?.data?.email ||
        localStorage.getItem("intake_lead_email");
      const firstName =
        payload.first_name ||
        payload.firstName ||
        payload?.customer?.first_name ||
        undefined;

      if (!email) {
        console.warn("[happymd-purchase-tag] success event but no email available");
        return;
      }

      // Fire Meta Purchase via dataLayer (GTM handles the pixel)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        funnel: source || "tprime365",
        tracking_code: trackingCode,
      });

      // Tag the GHL contact
      fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/happymd-purchase-tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ email, tag, trackingCode, firstName, source }),
      })
        .then(() => console.log("[happymd-purchase-tag] tag request sent for", email))
        .catch((err) => console.error("[happymd-purchase-tag] request error:", err));
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [tag, trackingCode, source, enabled]);
}