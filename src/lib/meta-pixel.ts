// Type-safe Meta Pixel helper
// Pixel is loaded globally in index.html — this wrapper guards against missing fbq

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type MetaStandardEvent =
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration';

interface MetaEventParams {
  content_name?: string;
  content_type?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
  num_items?: number;
  [key: string]: unknown;
}

export function trackMetaEvent(event: MetaStandardEvent, params?: MetaEventParams): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
  }
}
