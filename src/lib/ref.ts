// Partner referral code (`?ref=<slug>`) capture and persistence.
// Forwarded to happyMD embeds as their `tracking_code` so individual
// sub-referrers (e.g. ?ref=jay-atkins) get credit under the parent vendor.
// Storage shape matches the official happyMD site-wide snippet:
//   localStorage["happymd_ref"] = JSON.stringify({ value, expires })

const STORAGE_KEY = "happymd_ref";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const MAX_LEN = 64;

function sanitize(raw: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().slice(0, MAX_LEN);
  return trimmed || null;
}

/**
 * Capture `?ref=` from the URL on app load and persist to localStorage
 * with a 30-day TTL, surviving across sessions for cross-visit attribution.
 */
export function captureRefParam(): void {
  try {
    const ref = sanitize(new URLSearchParams(window.location.search).get("ref"));
    if (!ref) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value: ref, expires: Date.now() + TTL_MS })
    );
  } catch {
    /* localStorage may be blocked */
  }
}

/** Retrieve the stored partner ref, or null if missing/expired. */
export function getRefParam(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value?: unknown; expires?: unknown } | null;
    if (!parsed || typeof parsed.value !== "string" || typeof parsed.expires !== "number") {
      return null;
    }
    if (parsed.expires <= Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return sanitize(parsed.value);
  } catch {
    return null;
  }
}