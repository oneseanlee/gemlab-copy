import { useState, useEffect, useRef } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Lock, Check, Zap, Flame, Brain, Dumbbell, ChevronLeft, ChevronRight, Star, ShieldCheck, Phone, Volume2, Shield, FlaskConical, Truck } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { TPRIME_VARIANT_ID } from "@/lib/shopify";
import { toast } from "sonner";
import "./TPrimeBuyPage.css";

/* ── TPrime product data ───────────────────────────────── */
const TPRIME_PRODUCT = {
  node: {
    id: "gid://shopify/Product/8988427911308",
    title: "TPrime365™ — Natural Testosterone Optimization",
    description: "",
    handle: "tprime365",
    priceRange: { minVariantPrice: { amount: "149.00", currencyCode: "USD" } },
    images: { edges: [{ node: { url: "/images/tprime-bottle.png", altText: "TPrime365" } }] },
    variants: { edges: [{ node: { id: TPRIME_VARIANT_ID, title: "Monthly Subscription", price: { amount: "149.00", currencyCode: "USD" }, availableForSale: true, selectedOptions: [{ name: "Plan", value: "Monthly Subscription" }] } }] },
    options: [{ name: "Plan", values: ["Monthly Subscription"] }],
  },
};

const PRICE = 149.00;
const COMPARE_PRICE = 299.00;

/* ── Carousel media ──────────────────────────────────── */
type MediaItem = { type: "image"; src: string };
const carouselMedia: MediaItem[] = [
  { type: "image", src: "/images/tprime-hero-composite.png" },
  { type: "image", src: "/images/tprime-whats-included.png" },
  { type: "image", src: "/images/tprime-risk-free.png" },
  { type: "image", src: "/images/tprime-bottle.png" },
  { type: "image", src: "/images/tprime-product-benefits.png" },
  { type: "image", src: "/images/tprime-sublingual-delivery.jpg" },
];

/* ── Form schema ──────────────────────────────────────── */
const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email").max(255),
});
type FormData = z.infer<typeof schema>;

/* ── Component ────────────────────────────────────────── */
const TPrimeBuyPage = () => {
  const { items, isLoading, addItem, updateBuyerIdentity, getCheckoutUrl } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const addedRef = useRef(false);
  const hasSubmitted = useRef(false);

  /* Auto-add TPrime to cart on mount */
  useEffect(() => {
    if (addedRef.current) return;
    addedRef.current = true;

    const alreadyInCart = items.some((i) => i.variantId === TPRIME_VARIANT_ID);
    if (alreadyInCart) {
      setCartReady(true);
      return;
    }

    (async () => {
      await addItem({
        product: TPRIME_PRODUCT,
        variantId: TPRIME_VARIANT_ID,
        variantTitle: "Monthly Subscription",
        price: { amount: "149.00", currencyCode: "USD" },
        quantity: 1,
        selectedOptions: [{ name: "Plan", value: "Monthly Subscription" }],
      });
      setCartReady(true);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Track InitiateCheckout once cart is ready */
  useEffect(() => {
    if (cartReady) {
      trackMetaEvent("InitiateCheckout", { value: PRICE, currency: "USD", num_items: 1 });
    }
  }, [cartReady]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (hasSubmitted.current) return;

    const checkoutUrl = getCheckoutUrl();
    if (!checkoutUrl) {
      toast.error("Cart is still loading. Please wait a moment and try again.");
      return;
    }

    hasSubmitted.current = true;
    setIsSubmitting(true);
    try {
      await supabase.from("checkout_leads").insert({
        first_name: data.name.trim(),
        last_name: null,
        email: data.email.trim(),
        phone: null,
        cart_items: [{ title: TPRIME_PRODUCT.node.title, variantId: TPRIME_VARIANT_ID, quantity: 1, price: "149.00" }],
        cart_total: PRICE,
      });

      const nameParts = data.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      await updateBuyerIdentity({
        email: data.email,
        deliveryAddressPreferences: [{
          deliveryAddress: {
            firstName,
            lastName: lastName || "",
            address1: "",
            city: "",
            province: "",
            zip: "",
            country: "US",
          },
        }],
      });

      window.location.href = checkoutUrl;
    } catch {
      const fallback = getCheckoutUrl();
      if (fallback) window.location.href = fallback;
    }
  };

  /* ── Loading state ────────────────────────────────── */
  if (!cartReady) {
    return (
      <div className="tprimebuy-loading">
        <div className="tprimebuy-loading-spinner" />
        <p>Preparing your order…</p>
      </div>
    );
  }

  /* ── Main render ──────────────────────────────────── */
  return (
    <div className="tprimebuy-page">

      {/* Checkout Section */}
      <section className="b365-section glp1-checkout-section">
        <div className="glp1-checkout-grid">
          {/* LEFT COLUMN — Product Display */}
          <div className="glp1-checkout-left">
            <div className="glp1-promo-strip">🔥 SAVE $150 + FREE SHIPPING 🔥</div>

            {/* Main product display */}
            <div className="glp1-product-display">
              <img src={carouselMedia[activeThumb].src} alt="TPrime365" loading="lazy" />
            </div>

            <div className="glp1-thumb-carousel">
              <button className="thumb-arrow thumb-arrow-left" onClick={() => { const el = document.querySelector('.tprimebuy-page .thumb-track'); if (el) el.scrollBy({ left: -80, behavior: 'smooth' }); }} aria-label="Scroll thumbnails left"><ChevronLeft size={16} /></button>
              <div className="thumb-track">
                {carouselMedia.map((item, i) => (
                  <img key={i} src={item.src} alt={`Product view ${i + 1}`} className={`thumb-img ${i === activeThumb ? 'active' : ''}`} loading="lazy" onClick={() => setActiveThumb(i)} style={{ cursor: 'pointer' }} />
                ))}
              </div>
              <button className="thumb-arrow thumb-arrow-right" onClick={() => { const el = document.querySelector('.tprimebuy-page .thumb-track'); if (el) el.scrollBy({ left: 80, behavior: 'smooth' }); }} aria-label="Scroll thumbnails right"><ChevronRight size={16} /></button>
            </div>

            <div className="glp1-benefit-callouts">
              <div className="benefit-item"><div className="benefit-icon"><Zap size={20} /></div><span>Boost Natural T</span></div>
              <div className="benefit-item"><div className="benefit-icon"><Dumbbell size={20} /></div><span>Build Lean Muscle</span></div>
              <div className="benefit-item"><div className="benefit-icon"><Brain size={20} /></div><span>Sharpen Focus</span></div>
              <div className="benefit-item"><div className="benefit-icon"><Flame size={20} /></div><span>Maximize Drive</span></div>
            </div>

            <div className="tprimebuy-trust-strip">
              <div className="tprimebuy-trust-item"><Shield size={18} /><span>Made in USA</span></div>
              <div className="tprimebuy-trust-item"><FlaskConical size={18} /><span>FDA-Registered</span></div>
              <div className="tprimebuy-trust-item"><Truck size={18} /><span>Free Shipping</span></div>
            </div>

            <div className="tprimebuy-testimonial">
              <div className="tprimebuy-testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="tprimebuy-testimonial-quote">"Testosterone went from 658 to 749 in two months. More energy, better sleep, and I'm building muscle again without any injections."</p>
              <cite className="tprimebuy-testimonial-cite">— Brett E., Verified Buyer</cite>
            </div>
          </div>

          {/* RIGHT COLUMN — Offer + Inline Form */}
          <div className="glp1-checkout-right">
            <h2 className="glp1-checkout-title">TPrime365™ — Natural Testosterone Optimization</h2>

            <div className="glp1-star-rating">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
              <span className="star-subtext">4.8 (94 reviews)</span>
            </div>

            <p className="glp1-checkout-desc">Physician-prescribed sublingual formula combining Enclomiphene, Spermidine, Boron & Vitamin C. Stimulates your NATURAL testosterone production through the HPG axis — no injections, no shutdown, no dependency. 10x absorption via MODS Max™ sublingual delivery.*</p>

            <ul className="glp1-check-list">
              <li><Check size={16} />Enclomiphene + Spermidine + Boron + Vitamin C sublingual formula</li>
              <li><Check size={16} />Increases testosterone 60–664% within 2–4 weeks*</li>
              <li><Check size={16} />Preserves fertility &amp; natural production — no TRT shutdown</li>
              <li><Check size={16} />MODS Max™ 10x sublingual absorption technology</li>
              <li><Check size={16} />Physician-reviewed — FDA-registered 503A pharmacy</li>
              <li><Check size={16} />Includes physician consultation via HappyMD</li>
            </ul>

            <div className="glp1-checkout-price">
              <span className="checkout-big-price">$149.00</span>
              <span className="checkout-strike">${COMPARE_PRICE.toFixed(2)}</span>
              <span className="checkout-discount-badge">50% OFF TODAY</span>
            </div>
            <p className="checkout-shipping-note">FREE SHIPPING — INCLUDES PHYSICIAN CONSULTATION</p>

            <div className="glp1-bonuses-section">
              <h4 className="bonuses-title">WHAT'S INCLUDED</h4>
              <div className="glp1-bonuses-row">
                <div className="bonus-card">
                  <span className="bonus-free-tag">INCLUDED</span>
                  <span className="bonus-name">Physician Consultation</span>
                  <span className="bonus-value">$150 Value</span>
                </div>
                <div className="bonus-card">
                  <span className="bonus-free-tag">FREE</span>
                  <span className="bonus-name">Priority Shipping</span>
                  <span className="bonus-value">$12 Value</span>
                </div>
                <div className="bonus-card">
                  <span className="bonus-free-tag">FREE</span>
                  <span className="bonus-name">Community Access</span>
                  <span className="bonus-value">$49 Value</span>
                </div>
              </div>
            </div>

            {/* Inline Name + Email Form */}
            <form className="glp1buy-inline-form" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="glp1buy-form-headline">Start Your TPrime365™ Protocol — Ships Free in 7–10 Days</h3>
              <p className="glp1buy-form-subtext">Enter your details below to get started. You'll complete secure payment on the next page — takes less than 60 seconds.</p>
              <div className="glp1buy-field">
                <label htmlFor="tprimebuy-name">Your Name *</label>
                <input id="tprimebuy-name" type="text" placeholder="John Doe" {...register("name")} />
                {errors.name && <div className="glp1buy-field-error">{errors.name.message}</div>}
              </div>
              <div className="glp1buy-field">
                <label htmlFor="tprimebuy-email">Email Address *</label>
                <input id="tprimebuy-email" type="email" placeholder="you@example.com" {...register("email")} />
                {errors.email && <div className="glp1buy-field-error">{errors.email.message}</div>}
              </div>

              <button type="submit" className="glp1-checkout-cta" disabled={isSubmitting || isLoading || hasSubmitted.current}>
                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Redirecting…</> : <>Get My TPrime365™ <ArrowRight size={18} /></>}
              </button>

              <div className="glp1buy-secure-note">
                <Lock size={13} />
                <span>Secure checkout — SSL encrypted. Payment on next page.</span>
              </div>
            </form>

            <div className="glp1-guarantee-badge">
              <ShieldCheck size={28} />
              <div>
                <strong>Physician-Reviewed Protocol</strong>
                <span>Your intake is reviewed by an independent licensed physician. If you're not approved, you won't be charged.</span>
              </div>
            </div>

            <p className="glp1-phone-line">
              <Phone size={14} />
              Questions? Call us: <a href="tel:+13854215651">(385) 421-5651</a>
            </p>

            <p className="glp1-fda-disclaimer">*These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="glp1-sticky-mobile-cta">
        <span className="sticky-price">$149 <span className="sticky-strike">$299</span></span>
        <button className="sticky-cta-btn" disabled={isSubmitting || isLoading || hasSubmitted.current} onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Redirecting…</> : <>Get My TPrime365™ <ArrowRight size={14} /></>}
        </button>
      </div>
    </div>
  );
};

export default TPrimeBuyPage;
