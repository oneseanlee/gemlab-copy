import { useState, useEffect, useRef } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Lock, MessageSquare } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import CheckoutProgressBar from "@/components/Checkout/CheckoutProgressBar";
import SocialProofStrip from "@/components/Checkout/SocialProofStrip";
import UrgencyBanner from "@/components/Checkout/UrgencyBanner";
import GuaranteeBadge from "@/components/Checkout/GuaranteeBadge";
import TrustPaymentBadges from "@/components/Checkout/TrustPaymentBadges";
import "./GLP1BuyPage.css";

/* ── GLP-1 product data (mirrors advertorial) ─────────────── */
const GLP1_VARIANT_ID = "gid://shopify/ProductVariant/46539809235068";
const GLP1_PRODUCT = {
  variantId: GLP1_VARIANT_ID,
  variantTitle: "Default",
  price: { amount: "39.95", currencyCode: "USD" },
  quantity: 1,
  selectedOptions: [{ name: "Title", value: "Default" }],
  product: {
    node: {
      id: "gid://shopify/Product/8542135132284",
      title: "GLP-1 Optimization Protocol",
      description: "",
      handle: "glp-1-optimization-protocol",
      priceRange: { minVariantPrice: { amount: "39.95", currencyCode: "USD" } },
      images: { edges: [{ node: { url: "/images/glp1-protocol-hero.png", altText: "GLP-1 Optimization Protocol" } }] },
      variants: { edges: [] },
      options: [],
    },
  },
};

const COMPARE_PRICE = 90;
const PRICE = 39.95;
const SAVINGS = COMPARE_PRICE - PRICE;
const SAVINGS_PCT = Math.round((SAVINGS / COMPARE_PRICE) * 100);
const PER_DAY = (PRICE / 30).toFixed(2);

/* ── Form schema ──────────────────────────────────────────── */
const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email").max(255),
  phone: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

/* ── Component ────────────────────────────────────────────── */
const GLP1BuyPage = () => {
  const { items, isLoading, addItem, updateBuyerIdentity, getCheckoutUrl } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const addedRef = useRef(false);

  /* Auto-add GLP-1 to cart on mount */
  useEffect(() => {
    if (addedRef.current) return;
    addedRef.current = true;

    const alreadyInCart = items.some((i) => i.variantId === GLP1_VARIANT_ID);
    if (alreadyInCart) {
      setCartReady(true);
      return;
    }

    (async () => {
      await addItem(GLP1_PRODUCT);
      setCartReady(true);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Track InitiateCheckout once cart is ready */
  useEffect(() => {
    if (cartReady) {
      trackMetaEvent("InitiateCheckout", {
        value: PRICE,
        currency: "USD",
        num_items: 1,
      });
    }
  }, [cartReady]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const checkoutUrl = getCheckoutUrl();
    if (!checkoutUrl) {
      toast.error("Cart is still loading. Please wait a moment and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await supabase.from("checkout_leads").insert({
        first_name: data.firstName.trim(),
        last_name: data.lastName?.trim() || null,
        email: data.email.trim(),
        phone: data.phone || null,
        cart_items: [{
          title: GLP1_PRODUCT.product.node.title,
          variantId: GLP1_VARIANT_ID,
          quantity: 1,
          price: GLP1_PRODUCT.price.amount,
        }],
        cart_total: PRICE,
      });

      await updateBuyerIdentity({
        email: data.email,
        phone: data.phone || undefined,
        deliveryAddressPreferences: [],
      });

      window.open(checkoutUrl, "_blank");
    } catch {
      const fallback = getCheckoutUrl();
      if (fallback) window.open(fallback, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Loading state ──────────────────────────────────────── */
  if (!cartReady) {
    return (
      <div className="glp1buy-loading">
        <div className="glp1buy-loading-spinner" />
        <p>Preparing your order…</p>
      </div>
    );
  }

  /* ── Main render ────────────────────────────────────────── */
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <Link to="/" className="checkout-header-logo">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" />
          </Link>
          <h1>Secure Checkout</h1>
          <div />
        </div>

        <CheckoutProgressBar activeStep={1} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-grid">
            {/* Left — Contact Form */}
            <div className="checkout-form-section">
              <div className="checkout-section">
                <h2>Contact Information</h2>
                <p className="checkout-section-note">
                  Enter your details to proceed. Shipping and payment details are collected securely on the next step.
                </p>
                <div className="checkout-field-row" style={{ display: "flex", gap: "0.75rem" }}>
                  <div className="checkout-field" style={{ flex: 1 }}>
                    <label>First Name *</label>
                    <input type="text" placeholder="John" {...register("firstName")} />
                    {errors.firstName && <div className="checkout-field-error">{errors.firstName.message}</div>}
                  </div>
                  <div className="checkout-field" style={{ flex: 1 }}>
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" {...register("lastName")} />
                  </div>
                </div>
                <div className="checkout-field">
                  <label>Email Address *</label>
                  <div className="checkout-field-with-icon">
                    <input type="email" placeholder="you@example.com" {...register("email")} />
                    <MessageSquare size={16} className="checkout-field-icon" />
                  </div>
                  {errors.email && <div className="checkout-field-error">{errors.email.message}</div>}
                </div>
                <div className="checkout-field">
                  <label>Phone (optional)</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
                  <label className="checkout-sms-toggle">
                    <input type="checkbox" checked={smsUpdates} onChange={(e) => setSmsUpdates(e.target.checked)} />
                    <span>📱 Get SMS order updates</span>
                  </label>
                </div>
              </div>

              <div className="checkout-handoff-notice">
                <Lock size={16} />
                <p>
                  Clicking "Continue to Payment" will take you to our secure Shopify checkout where you'll enter your shipping address and payment details.
                </p>
              </div>

              <SocialProofStrip />
            </div>

            {/* Right — Order Summary */}
            <div className="checkout-summary">
              <h2>Order Summary</h2>

              {/* Product card */}
              <div className="glp1buy-product-card">
                <div className="glp1buy-product-image">
                  <img src="/images/glp1-protocol-hero.png" alt="GLP-1 Optimization Protocol" />
                </div>
                <div className="glp1buy-product-info">
                  <h3>GLP-1 Optimization Protocol</h3>
                  <div className="glp1buy-price-row">
                    <span className="glp1buy-price-current">${PRICE.toFixed(2)}</span>
                    <span className="glp1buy-price-compare">${COMPARE_PRICE.toFixed(2)}</span>
                  </div>
                  <span className="glp1buy-savings-badge">SAVE {SAVINGS_PCT}% — ${SAVINGS.toFixed(2)} OFF</span>
                  <div className="glp1buy-per-day">Only ${PER_DAY}/day for your complete protocol</div>
                </div>
              </div>

              <UrgencyBanner />

              {/* Breakdown */}
              <div className="checkout-summary-breakdown">
                <div className="checkout-summary-line"><span>Subtotal</span><span>${PRICE.toFixed(2)}</span></div>
                <div className="checkout-summary-line"><span>Shipping</span><span className="checkout-free-shipping">FREE</span></div>
                <div className="checkout-summary-line"><span>Discount</span><span>—</span></div>
              </div>
              <div className="checkout-summary-total"><span>Total</span><span>${PRICE.toFixed(2)}</span></div>

              <button type="submit" className="checkout-submit-btn" disabled={isSubmitting || isLoading}>
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>Continue to Payment <ArrowRight size={18} /></>
                )}
              </button>

              <div className="checkout-secure-inline">
                <Lock size={14} />
                <span>Secure Checkout – SSL Encrypted</span>
              </div>

              <GuaranteeBadge />
              <TrustPaymentBadges />
            </div>
          </div>
        </form>
      </div>

      {/* Mobile sticky CTA */}
      <div className="checkout-mobile-sticky-cta">
        <button type="button" className="checkout-submit-btn" disabled={isSubmitting || isLoading} onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <>Continue to Payment <ArrowRight size={18} /></>}
        </button>
      </div>
    </div>
  );
};

export default GLP1BuyPage;
