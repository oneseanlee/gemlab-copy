import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, ShoppingCart, ShieldCheck, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import "./CheckoutPage.css";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "State/Province is required"),
  zip: z.string().min(1, "ZIP/Postal code is required"),
  country: z.string().min(2, "Country is required"),
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: "US" },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    const existingCheckoutUrl = getCheckoutUrl();
    if (!existingCheckoutUrl) {
      toast.error("No active cart found. Please add items and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateBuyerIdentity({
        email: data.email,
        phone: data.phone || undefined,
        deliveryAddressPreferences: [
          {
            deliveryAddress: {
              firstName: data.firstName,
              lastName: data.lastName,
              address1: data.address1,
              address2: data.address2 || undefined,
              city: data.city,
              province: data.province,
              zip: data.zip,
              country: data.country,
            },
          },
        ],
      });

      // Use the fresh checkout URL from the buyer identity update if available,
      // otherwise fall back to the stored checkout URL — always proceed
      const checkoutUrl = result.checkoutUrl || existingCheckoutUrl;
      window.open(checkoutUrl, "_blank");
    } catch {
      // Even on error, try to redirect using the existing checkout URL
      if (existingCheckoutUrl) {
        window.open(existingCheckoutUrl, "_blank");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
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
            <img src="/images/best365labs-logo.png" alt="Cell365 Power" />
          </Link>
          <h1>Checkout</h1>
          <button className="checkout-back-link" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout-grid">
            {/* Form */}
            <div className="checkout-form-section">
              <div className="checkout-section">
                <h2>Contact Information</h2>
                <div className="checkout-field">
                  <label>Email *</label>
                  <input type="email" placeholder="you@example.com" {...register("email")} />
                  {errors.email && <div className="checkout-field-error">{errors.email.message}</div>}
                </div>
                <div className="checkout-field">
                  <label>Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" {...register("phone")} />
                </div>
              </div>

              <div className="checkout-section">
                <h2>Shipping Address</h2>
                <div className="checkout-field-row">
                  <div className="checkout-field">
                    <label>First Name *</label>
                    <input type="text" placeholder="John" {...register("firstName")} />
                    {errors.firstName && <div className="checkout-field-error">{errors.firstName.message}</div>}
                  </div>
                  <div className="checkout-field">
                    <label>Last Name *</label>
                    <input type="text" placeholder="Doe" {...register("lastName")} />
                    {errors.lastName && <div className="checkout-field-error">{errors.lastName.message}</div>}
                  </div>
                </div>
                <div className="checkout-field">
                  <label>Address *</label>
                  <input type="text" placeholder="123 Main Street" {...register("address1")} />
                  {errors.address1 && <div className="checkout-field-error">{errors.address1.message}</div>}
                </div>
                <div className="checkout-field">
                  <label>Apartment, suite, etc.</label>
                  <input type="text" placeholder="Apt 4B" {...register("address2")} />
                </div>
                <div className="checkout-field-row">
                  <div className="checkout-field">
                    <label>City *</label>
                    <input type="text" placeholder="New York" {...register("city")} />
                    {errors.city && <div className="checkout-field-error">{errors.city.message}</div>}
                  </div>
                  <div className="checkout-field">
                    <label>State / Province *</label>
                    <input type="text" placeholder="NY" {...register("province")} />
                    {errors.province && <div className="checkout-field-error">{errors.province.message}</div>}
                  </div>
                </div>
                <div className="checkout-field-row">
                  <div className="checkout-field">
                    <label>ZIP / Postal Code *</label>
                    <input type="text" placeholder="10001" {...register("zip")} />
                    {errors.zip && <div className="checkout-field-error">{errors.zip.message}</div>}
                  </div>
                  <div className="checkout-field">
                    <label>Country *</label>
                    <select {...register("country")}>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                    </select>
                  </div>
                </div>
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
