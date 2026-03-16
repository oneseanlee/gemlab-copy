// Meta Pixel tracking is handled entirely by GTM via dataLayer pushes.
// This file is kept as a no-op stub so existing imports don't break.

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

/** No-op — GTM fires all FB Pixel events via dataLayer triggers. */
export function trackMetaEvent(_event: MetaStandardEvent, _params?: MetaEventParams): void {
  // intentionally empty
}
