import { useEffect, useMemo } from "react";
import { getUtmParams } from "@/lib/utm";
import { getRefParam } from "@/lib/ref";

/**
 * HappyMD embedded checkout — TPrime365.
 * Customers pay first; HappyMD then handles intake + physician review.
 * Install spec: happyMD-TPrime365-Install-Cell365Power_v2.pdf
 */

const HELPER_SRC = "https://app.happymd.co/embed-helper.js";
const CHECKOUT_BASE = "https://app.happymd.co/embed/checkout";
const PARENT_VENDOR_ID = "cell365power";

export type HappyMDCheckoutProps = {
  product?: string;
  plan?: string;
  partner?: string;
  theme?: string;
  trackingCode?: string;
};

function buildCheckoutUrl({
  product = "tprime365",
  plan = "monthly",
  partner = "cell365power",
  theme = "best365",
  trackingCode,
}: HappyMDCheckoutProps) {
  // Resolve sub-referrer attribution. Direct URL ?ref= (captured at app
  // load) → 30-day stored ref → parent vendor floor. UTM campaign is NOT
  // a fallback — partner ref is the only override of the parent code.
  const directRef =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("ref")?.trim().slice(0, 64) || undefined
      : undefined;
  const storedRef = getRefParam() || undefined;
  const code = trackingCode || directRef || storedRef || PARENT_VENDOR_ID;

  const params = new URLSearchParams({
    product,
    plan,
    partner,
    theme,
    vendor_id: PARENT_VENDOR_ID,
    tracking_code: code,
  });

  // Forward UTM params for HappyMD's own analytics (do not affect tracking_code)
  const utm = getUtmParams() as Record<string, string | undefined>;
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
      style={{ border: 0, width: "100%", maxWidth: "100%", display: "block", borderRadius: 12, background: "#fff" }}
    />
  );
}

/* ── Button variant — opens HappyMD modal ────────────────────────── */
export function HappyMDCheckoutButton(
  props: HappyMDCheckoutProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const {
    product = "tprime365",
    plan = "monthly",
    partner = "cell365power",
    theme = "best365",
    trackingCode,
    children,
    ...buttonProps
  } = props;

  useEffect(() => {
    loadHelperOnce();
  }, []);

  const directRef =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("ref")?.trim().slice(0, 64) || undefined
      : undefined;
  const storedRef = getRefParam() || undefined;
  const code = trackingCode || directRef || storedRef || PARENT_VENDOR_ID;

  return (
    <button
      {...buttonProps}
      data-happymd-checkout=""
      data-happymd-product={product}
      data-happymd-plan={plan}
      data-happymd-partner={partner}
      data-happymd-theme={theme}
      data-vendor-id={PARENT_VENDOR_ID}
      data-happymd-tracking={code}
    >
      {children}
    </button>
  );
}