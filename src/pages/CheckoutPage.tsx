import { useState, useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, ShoppingCart, Lock, Minus, Plus, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import CheckoutProgressBar from "@/components/Checkout/CheckoutProgressBar";
import SocialProofStrip from "@/components/Checkout/SocialProofStrip";
import UrgencyBanner from "@/components/Checkout/UrgencyBanner";
import GuaranteeBadge from "@/components/Checkout/GuaranteeBadge";
import TrustPaymentBadges from "@/components/Checkout/TrustPaymentBadges";
import ExitIntentPopup from "@/components/Checkout/ExitIntentPopup";
import "./CheckoutPage.css";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, isLoading, updateBuyerIdentity, getCheckoutUrl, updateQuantity } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  // Compare-at price overrides keyed by variant ID (most reliable identifier in cart)
  const compareAtByVariant: Record<string, number> = {
    'gid://shopify/ProductVariant/46539809235068': 90, // GLP-1 Optimization Protocol
    'gid://shopify/ProductVariant/46265391579276': 90, // GLP-1 Optimization Protocol (alt)
  };

  const getComparePrice = () => {
    return items.reduce((sum, item) => {
      const override = compareAtByVariant[item.variantId];
      const itemCompare = override ? override * item.quantity : parseFloat(item.price.amount) * item.quantity * 1.5;
      return sum + itemCompare;
    }, 0);
  };

  const comparePrice = getComparePrice();
  const savings = comparePrice - totalPrice;
  const savingsPercent = savings > 0 ? Math.round((savings / comparePrice) * 100) : 0;
  const perDay = (totalPrice / 30).toFixed(2);

  useEffect(() => {
    if (items.length > 0) {
      trackMetaEvent('InitiateCheckout', {
        value: totalPrice,
        currency: 'USD',
        num_items: totalItems,
      });
    }
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    const existingCheckoutUrl = getCheckoutUrl();
    if (!existingCheckoutUrl) {
      toast.error("No active cart found. Please add items and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateBuyerIdentity({
        email: data.email,
        phone: data.phone || undefined,
        deliveryAddressPreferences: [],
      });
      window.open(existingCheckoutUrl, "_blank");
    } catch {
      window.open(existingCheckoutUrl, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty">
            <ShoppingCart size={48} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
            <h2>Your cart is empty</h2>
            <p>Add some items before checking out.</p>
            <Link to="/">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  const orderSummaryContent = (
    <>
      {items.map((item) => (
        <div key={item.variantId} className="checkout-summary-item">
          <div className="checkout-summary-item-image">
            {item.product.node.images?.edges?.[0]?.node ? (
              <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} />
            ) : (
              <div className="checkout-summary-item-placeholder" />
            )}
          </div>
          <div className="checkout-summary-item-details">
            <h4>{item.product.node.title}</h4>
            <div className="checkout-qty-controls">
              <button type="button" className="checkout-qty-btn" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                <Minus size={12} />
              </button>
              <span className="checkout-qty-value">{item.quantity}</span>
              <button type="button" className="checkout-qty-btn" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                <Plus size={12} />
              </button>
            </div>
            {item.selectedOptions.length > 0 && (
              <span className="checkout-qty-options">{item.selectedOptions.map(o => o.value).join(" · ")}</span>
            )}
          </div>
          <div className="checkout-summary-item-price">
            ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      {/* Value Anchor */}
      <div className="checkout-value-anchor">
        <div className="checkout-compare-price">Compare at: <s>${comparePrice.toFixed(2)}</s></div>
        <div className="checkout-savings">You save ${savings.toFixed(2)} ({savingsPercent}% OFF)</div>
        <div className="checkout-per-day">That's only ${perDay}/day for your complete protocol</div>
      </div>

      <UrgencyBanner />

      <div className="checkout-summary-breakdown">
        <div className="checkout-summary-line"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
        <div className="checkout-summary-line"><span>Shipping</span><span>Calculated at next step</span></div>
        <div className="checkout-summary-line"><span>Discount</span><span>—</span></div>
      </div>
      <div className="checkout-summary-total"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>

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
    </>
  );

  return (
    <div className="checkout-page">
      <ExitIntentPopup />
      <div className="checkout-container">
        <div className="checkout-header">
          <Link to="/" className="checkout-header-logo">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" />
          </Link>
          <h1>Checkout</h1>
          <button className="checkout-back-link" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <CheckoutProgressBar activeStep={1} />

        {/* Mobile collapsed summary */}
        <div className="checkout-mobile-summary-toggle" onClick={() => setMobileExpanded(!mobileExpanded)}>
          <div className="checkout-mobile-summary-preview">
            <ShoppingCart size={16} />
            <span>{items[0]?.product.node.title}{items.length > 1 ? ` +${items.length - 1} more` : ''}</span>
          </div>
          <div className="checkout-mobile-summary-right">
            <strong>${totalPrice.toFixed(2)}</strong>
            {mobileExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-grid">
            {/* Left — Contact Form */}
            <div className="checkout-form-section">
              <div className="checkout-section">
                <h2>Contact Information</h2>
                <p className="checkout-section-note">
                  Enter your email to proceed. Shipping and payment details are collected securely on the next step.
                </p>
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
                    <input type="checkbox" checked={smsUpdates} onChange={e => setSmsUpdates(e.target.checked)} />
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
            <div className={`checkout-summary ${mobileExpanded ? 'mobile-expanded' : ''}`}>
              <h2>Order Summary</h2>
              {orderSummaryContent}
            </div>
          </div>
        </form>
      </div>

      {/* Mobile sticky CTA */}
      <div className="checkout-mobile-sticky-cta">
        <button type="submit" form="checkout-form" className="checkout-submit-btn" disabled={isSubmitting || isLoading}
          onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <>Continue to Payment <ArrowRight size={18} /></>}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
