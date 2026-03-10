/**
 * Facebook Click ID & Browser ID cookie helpers.
 * Used to enrich dataLayer pushes with _fbc / _fbp for
 * server-side Enhanced Conversions deduplication.
 */

export function getFbcValue(): string | null {
  const cookies = document.cookie.split(';');
  for (const c of cookies) {
    const trimmed = c.trim();
    if (trimmed.startsWith('_fbc=')) return trimmed.substring(5);
  }

  // If no cookie, try to build from fbclid URL parameter
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  if (fbclid) {
    const fbc = 'fb.1.' + Date.now() + '.' + fbclid;
    document.cookie = '_fbc=' + fbc + ';max-age=7776000;path=/';
    return fbc;
  }
  return null;
}

export function getFbpValue(): string | null {
  const cookies = document.cookie.split(';');
  for (const c of cookies) {
    const trimmed = c.trim();
    if (trimmed.startsWith('_fbp=')) return trimmed.substring(5);
  }
  return null;
}
