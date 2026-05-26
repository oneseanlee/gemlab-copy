// Partner referral code (`?ref=<slug>`) capture and persistence.
// Mirrors src/lib/utm.ts. Used to forward partner attribution to
// happyMD embeds as their `tracking_code` (see partner install guide).

const STORAGE_KEY = "b365_ref";

/**
 * Capture `?ref=` from the URL on app load and persist to sessionStorage,
 * so it survives in-app navigation. Only overwrites when a new ref is present.
 */
export function captureRefParam(): void {
  try {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) sessionStorage.setItem(STORAGE_KEY, ref);
  } catch {
    /* sessionStorage may be blocked */
  }
}

/** Retrieve the stored partner ref, or null if none was captured. */
export function getRefParam(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}