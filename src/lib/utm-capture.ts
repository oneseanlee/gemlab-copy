// src/lib/utm-capture.ts

const UTM_STORAGE_KEY = 'c365_utm_data';

interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  timestamp?: string;
  fbclid?: string;
  gclid?: string;
}

export function captureUTMs(): void {
  try {
    // Don't overwrite if we already have UTMs from this session
    const existing = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (existing) return;

    const params = new URLSearchParams(window.location.search);
    const utmData: UTMData = {};
    let hasData = false;

    // Capture all UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign',
     'utm_content', 'utm_term'].forEach(key => {
      const val = params.get(key);
      if (val) {
        utmData[key as keyof UTMData] = val;
        hasData = true;
      }
    });

    // Capture click IDs (fbclid from Meta, gclid from Google)
    ['fbclid', 'gclid'].forEach(key => {
      const val = params.get(key);
      if (val) {
        utmData[key as keyof UTMData] = val;
        hasData = true;
      }
    });

    // Always store landing page and timestamp
    if (hasData) {
      utmData.landing_page = window.location.pathname;
      utmData.timestamp = new Date().toISOString();
      sessionStorage.setItem(
        UTM_STORAGE_KEY, JSON.stringify(utmData)
      );
    }
  } catch (e) {
    // sessionStorage may be blocked in some browsers
    console.warn('UTM capture failed:', e);
  }
}

export function getStoredUTMs(): UTMData | null {
  try {
    const data = sessionStorage.getItem(UTM_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function getAttributeParams(): string {
  const utms = getStoredUTMs();
  if (!utms) return '';

  const params = Object.entries(utms)
    .filter(([_, val]) => val)
    .map(([key, val]) =>
      `attributes[${encodeURIComponent(key)}]`
      + `=${encodeURIComponent(val!)}`
    )
    .join('&');

  return params;
}
