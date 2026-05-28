import { useEffect } from "react";

/**
 * useHappyMDPurchaseTag — BUILT BUT NOT WIRED IN.
 * ------------------------------------------------
 * Listens for a HappyMD checkout "payment success" postMessage and, when one
 * fires, calls the `happymd-purchase-tag` edge function to apply a purchase
 * tag to the matching GHL contact (looked up by the captured lead email).
 *
 * This hook is intentionally NOT mounted on any page yet. To activate later,
 * call it from TPrimeBuyPage (or wherever the HappyMD checkout iframe lives):
 *
 *   useHappyMDPurchaseTag({ tag: "tprime365-purchase" });
 *
 * HappyMD currently does NOT emit a success event — once they enable one and
 * we confirm the event name/origin, this will start working automatically.
 */

const HAPPYMD_ORIGINS = ["https://app.happymd.co", "https://happymd.co"];

// Candidate success event shapes to match once HappyMD documents theirs.
const SUCCESS_TYPES = [
  "payment:success",
  "payment_success",
  "order:complete",
  "order_complete",
  "checkout:success",
  "checkout_complete",
];

interface Options {
  tag?: string;
  trackingCode?: string;
  enabled?: boolean;
}

export function useHappyMDPurchaseTag({ tag = "tprime365-purchase", trackingCode, enabled = true }: Options = {}) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    let fired = false;

    const handleMessage = (e: MessageEvent) => {
      if (!HAPPYMD_ORIGINS.includes(e.origin)) return;
      const type = typeof e.data === "string" ? e.data : e.data?.type;
      if (!type || !SUCCESS_TYPES.includes(type)) return;
      if (fired) return;
      fired = true;

      const email = localStorage.getItem("intake_lead_email") || e.data?.email;
      if (!email) {
        console.warn("[happymd-purchase-tag] success event but no email available");
        return;
      }

      // Fire Meta Purchase via dataLayer (GTM handles the pixel)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "purchase", funnel: "tprime365", tracking_code: trackingCode });

      // Tag the GHL contact
      fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/happymd-purchase-tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ email, tag, trackingCode }),
      })
        .then(() => console.log("[happymd-purchase-tag] tag request sent for", email))
        .catch((err) => console.error("[happymd-purchase-tag] request error:", err));
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [tag, trackingCode, enabled]);
}