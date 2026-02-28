import { useState, useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, ShoppingCart, ShieldCheck, Minus, Plus, Lock } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
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

  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (items.length > 0) {
      trackMetaEvent('InitiateCheckout', {
        value: totalPrice,
        currency: 'USD',
        num_items: totalItems,
      });
    }
  }, []); // fire once on mount

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
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
      // Update buyer identity with email/phone — Shopify reliably pre-fills the
      // Contact field with these. Shipping address is collected by Shopify natively.
      await updateBuyerIdentity({
        email: data.email,
        phone: data.phone || undefined,
        deliveryAddressPreferences: [],
      });

      // Always redirect using the stored checkout URL — Shopify handles the rest
      window.open(existingCheckoutUrl, "_blank");
    } catch {
      // On any error still redirect — the cart URL is always valid
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

  return (
    <div className="checkout-page">
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-grid">
            {/* Contact Form */}
            <div className="checkout-form-section">
              <div className="checkout-section">
                <h2>Contact Information</h2>
                <p className="checkout-section-note">
                  Enter your email to proceed. Shipping and payment details are collected securely on the next step.
                </p>
                <div className="checkout-field">
                  <label>Email Address *</label>
                  <input type="email" placeholder="you@example.com" {...register("email")} />
                  {errors.email && <div className="checkout-field-error">{errors.email.message}</div>}
                </div>
                <div className="checkout-field">
                  <label>Phone (optional)</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
                </div>
              </div>

              <div className="checkout-handoff-notice">
                <Lock size={16} />
                <p>
                  Clicking "Continue to Payment" will take you to our secure Shopify checkout where you'll enter your shipping address and payment details.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              <h2>Order Summary</h2>
              {items.map((item) => (
                <div key={item.variantId} className="checkout-summary-item">
                  <div className="checkout-summary-item-image">
                    {item.product.node.images?.edges?.[0]?.node ? (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                      />
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
                      {item.selectedOptions.length > 0 && (
                        <span className="checkout-qty-options">{item.selectedOptions.map((o) => o.value).join(" · ")}</span>
                      )}
                    </div>
                  </div>
                  <div className="checkout-summary-item-price">
                    ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="checkout-summary-breakdown">
                <div className="checkout-summary-line">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="checkout-summary-line">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="checkout-summary-line">
                  <span>Discount</span>
                  <span>—</span>
                </div>
              </div>
              <div className="checkout-summary-total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="checkout-submit-btn"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    Continue to Payment <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="checkout-secure-badge">
                <ShieldCheck size={20} />
                <div>
                  <strong>Secure Checkout – SSL Encrypted</strong>
                  <p>Ensuring your financial and personal details are secure during every transaction.</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
