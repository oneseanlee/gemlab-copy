import { useEffect, useMemo } from "react";
import { getUtmParams } from "@/lib/utm";

/**
 * HappyMD embedded checkout — TPrime365.
 * Customers pay first; HappyMD then handles intake + physician review.
 * Install spec: happyMD-TPrime365-Install-Cell365Power_v2.pdf
 */

const HELPER_SRC = "https://app.happymd.co/embed-helper.js";
const CHECKOUT_BASE = "https://app.happymd.co/embed/checkout";

export type HappyMDCheckoutProps = {
  product?: string;
  plan?: string;
  partner?: string;
  theme?: string;
  trackingCode?: string;
};

function buildCheckoutUrl({
  product = "tprime365",
  plan = "subscription",
  partner = "cell365power",
  theme = "best365",
  trackingCode,
}: HappyMDCheckoutProps) {
  const params = new URLSearchParams({ product, plan, partner, theme });
  const utm = getUtmParams() as Record<string, string | undefined>;
  const code = trackingCode || utm?.utm_campaign || "TPRIME365CELL";
  if (code) params.set("tracking_code", code);
  // Forward UTM params (HappyMD ignores unknown keys safely)
  Object.entries(utm || {}).forEach(([k, v]) => {
    if (v && !params.has(k)) params.set(k, String(v));
  });
  return `${CHECKOUT_BASE}?${params.toString()}`;
}

let helperLoaded = false;
function loadHelperOnce() {
  if (helperLoaded || typeof document === "undefined") return;
  if (document.querySelector(`script[src="${HELPER_SRC}"]`)) {
    helperLoaded = true;
    return;
  }
  const s = document.createElement("script");
  s.src = HELPER_SRC;
  s.async = true;
  document.body.appendChild(s);
  helperLoaded = true;
}

/* ── Iframe variant — drop into a buy page ───────────────────────── */
export function HappyMDCheckoutIframe(
  props: HappyMDCheckoutProps & { height?: number; className?: string; title?: string }
) {
  const { height = 1100, className, title = "TPrime365 Checkout", ...rest } = props;
  const src = useMemo(() => buildCheckoutUrl(rest), [rest.product, rest.plan, rest.partner, rest.theme, rest.trackingCode]);
  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height={height}
      frameBorder={0}
      scrolling="auto"
      allow="payment *; clipboard-write"
      className={className}
      style={{ border: 0, width: "100%", maxWidth: "800px", display: "block", borderRadius: 12, background: "#fff", margin: "0 auto" }}
    />
  );
}

/* ── Button variant — opens HappyMD modal ────────────────────────── */
export function HappyMDCheckoutButton(
  props: HappyMDCheckoutProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const {
    product = "tprime365",
    plan = "subscription",
    partner = "cell365power",
    theme = "best365",
    trackingCode,
    children,
    ...buttonProps
  } = props;

  useEffect(() => {
    loadHelperOnce();
  }, []);

  const utm = getUtmParams() as Record<string, string | undefined>;
  const code = trackingCode || utm?.utm_campaign || "TPRIME365CELL";

  return (
    <button
      {...buttonProps}
      data-happymd-checkout=""
      data-happymd-product={product}
      data-happymd-plan={plan}
      data-happymd-partner={partner}
      data-happymd-theme={theme}
      data-happymd-tracking={code}
    >
      {children}
    </button>
  );
}