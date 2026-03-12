const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "b365_utm";

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/**
 * Call once on app load — captures UTM params from the URL and persists
 * them in sessionStorage so they survive in-app navigation.
 */
export function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  let found = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      utm[key] = val;
      found = true;
    }
  }

  // Only overwrite if this page load actually has UTM params
  if (found) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  }
}

/**
 * Retrieve stored UTM params. Returns empty object if none captured.
 */
export function getUtmParams(): UtmParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
