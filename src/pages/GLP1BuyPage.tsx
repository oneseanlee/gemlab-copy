import { useState, useEffect, useRef } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Lock, Check, Zap, Flame, Brain, Dumbbell, ChevronLeft, ChevronRight, Star, ShieldCheck, Phone, Volume2, Shield, FlaskConical, Truck } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { GLP1_VARIANT_ID } from "@/lib/shopify";
import { toast } from "sonner";
import "./GLP1BuyPage.css";

/* ── GLP-1 product data ───────────────────────────────── */
const GLP1_PRODUCT = {
  node: {
    id: "gid://shopify/Product/8542135132284",
    title: "GLP-1 Optimization Protocol — Complete 30-Day System",
    description: "",
    handle: "glp-1-optimization-protocol",
    priceRange: { minVariantPrice: { amount: "39.95", currencyCode: "USD" } },
    images: { edges: [{ node: { url: "/images/product-glp-protocol.png", altText: "GLP-1 Optimization Protocol" } }] },
    variants: { edges: [{ node: { id: GLP1_VARIANT_ID, title: "30-Day Protocol", price: { amount: "39.95", currencyCode: "USD" }, availableForSale: true, selectedOptions: [{ name: "Size", value: "30-Day Protocol" }] } }] },
    options: [{ name: "Size", values: ["30-Day Protocol"] }],
  },
};

const PRICE = 39.95;

/* ── Carousel media (video + images) ──────────────────── */
const VIDEO_URL = "https://assets.cdn.filesafe.space/aYvoAsXxf5xBOSngnm2U/media/69a89b28edd08719031fc70e.mp4";
type MediaItem = { type: "video"; src: string } | { type: "image"; src: string };
const carouselMedia: MediaItem[] = [
  { type: "video", src: VIDEO_URL },
  { type: "image", src: "/images/glp1-whats-included.png" },
  { type: "image", src: "/images/glp1-risk-free.png" },
  { type: "image", src: "/images/product-glp-protocol.png" },
  { type: "image", src: "/images/triple-power-methylene-blue.png" },
  { type: "image", src: "/images/metabolism-plus.png" },
];

/* ── Form schema ──────────────────────────────────────── */
const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  phone: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

/* ── Component ────────────────────────────────────────── */
const GLP1BuyPage = () => {
  const { items, isLoading, addItem, updateBuyerIdentity, getCheckoutUrl } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const addedRef = useRef(false);
  const hasSubmitted = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSoundOverlayClick = () => {
    setShowSoundHint(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

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
      await addItem({
        product: GLP1_PRODUCT,
        variantId: GLP1_VARIANT_ID,
        variantTitle: "30-Day Protocol",
        price: { amount: "39.95", currencyCode: "USD" },
        quantity: 1,
        selectedOptions: [{ name: "Size", value: "30-Day Protocol" }],
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
        phone: data.phone || null,
        cart_items: [{ title: GLP1_PRODUCT.node.title, variantId: GLP1_VARIANT_ID, quantity: 1, price: "39.95" }],
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

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'USD',
          value: PRICE,
          items: [{
            item_id: GLP1_VARIANT_ID,
            item_name: GLP1_PRODUCT.node.title,
            price: PRICE,
            quantity: 1,
          }],
        },
      });
      window.location.href = checkoutUrl;
    } catch {
      const fallback = getCheckoutUrl();
      if (fallback) window.location.href = fallback;
    }
    // Note: intentionally no finally/setIsSubmitting(false) — keep button disabled after redirect
  };

  /* ── Loading state ────────────────────────────────── */
  if (!cartReady) {
    return (
      <div className="glp1buy-loading">
        <div className="glp1buy-loading-spinner" />
        <p>Preparing your order…</p>
      </div>
    );
  }

  /* ── Main render ──────────────────────────────────── */
  return (
    <div className="glp1buy-page">

      {/* Checkout Section — mirrors GLP1Page final CTA */}
      <section className="b365-section glp1-checkout-section">
        <div className="glp1-checkout-grid">
          {/* LEFT COLUMN — Product Display */}
          <div className="glp1-checkout-left">
            <div className="glp1-promo-strip">🔥 SAVE $50 + FREE SHIPPING 🔥</div>

            {/* Main product display — video or image */}
            <div className="glp1-product-display">
              {carouselMedia[activeThumb].type === "video" ? (
                <div className="glp1buy-hero-video">
                  <video
                    ref={videoRef}
                    src={VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                  <div className={`glp1buy-sound-overlay ${showSoundHint ? '' : 'hidden'}`} onClick={handleSoundOverlayClick}>
                    <div className="glp1buy-sound-circle">
                      <Volume2 size={28} color="#fff" />
                    </div>
                    <span className="glp1buy-sound-label">TAP FOR SOUND</span>
                  </div>
                </div>
              ) : (
                <img src={carouselMedia[activeThumb].src} alt="GLP-1 Optimization Protocol" loading="lazy" />
              )}
            </div>

            <div className="glp1-thumb-carousel">
              <button className="thumb-arrow thumb-arrow-left" onClick={() => { const el = document.querySelector('.glp1buy-page .thumb-track'); if (el) el.scrollBy({ left: -80, behavior: 'smooth' }); }} aria-label="Scroll thumbnails left"><ChevronLeft size={16} /></button>
              <div className="thumb-track">
                {carouselMedia.map((item, i) => (
                  item.type === "video" ? (
                    <div key={i} className={`thumb-img thumb-video ${i === activeThumb ? 'active' : ''}`} onClick={() => setActiveThumb(i)} style={{ cursor: 'pointer' }}>
                      <Volume2 size={16} />
                    </div>
                  ) : (
                    <img key={i} src={item.src} alt={`Product view ${i + 1}`} className={`thumb-img ${i === activeThumb ? 'active' : ''}`} loading="lazy" onClick={() => setActiveThumb(i)} style={{ cursor: 'pointer' }} />
                  )
                ))}
              </div>
              <button className="thumb-arrow thumb-arrow-right" onClick={() => { const el = document.querySelector('.glp1buy-page .thumb-track'); if (el) el.scrollBy({ left: 80, behavior: 'smooth' }); }} aria-label="Scroll thumbnails right"><ChevronRight size={16} /></button>
            </div>

            <div className="glp1-benefit-callouts">
              <div className="benefit-item"><div className="benefit-icon"><Zap size={20} /></div><span>Activate Metabolism</span></div>
              <div className="benefit-item"><div className="benefit-icon"><Dumbbell size={20} /></div><span>Preserve Lean Muscle</span></div>
              <div className="benefit-item"><div className="benefit-icon"><Brain size={20} /></div><span>Restore Mental Clarity</span></div>
              <div className="benefit-item"><div className="benefit-icon"><Flame size={20} /></div><span>Optimize Fat Burning</span></div>
            </div>

            <div className="glp1buy-trust-strip">
              <div className="glp1buy-trust-item"><Shield size={18} /><span>Made in USA</span></div>
              <div className="glp1buy-trust-item"><FlaskConical size={18} /><span>cGMP Certified</span></div>
              <div className="glp1buy-trust-item"><Truck size={18} /><span>Free Shipping</span></div>
            </div>

            <div className="glp1buy-testimonial">
              <div className="glp1buy-testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="glp1buy-testimonial-quote">"I started the GLP-1 Protocol three weeks ago and the energy difference is night and day. I'm keeping my muscle, my brain fog is gone, and I actually want to work out again."</p>
              <cite className="glp1buy-testimonial-cite">— Sarah M., Verified Buyer</cite>
            </div>
          </div>

          {/* RIGHT COLUMN — Offer + Inline Form */}
          <div className="glp1-checkout-right">
            <h2 className="glp1-checkout-title">GLP-1 Optimization Protocol</h2>

            <div className="glp1-star-rating">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
              <span className="star-subtext">4.9 (127 reviews)</span>
            </div>

            <p className="glp1-checkout-desc">The complete cellular optimization system designed to protect your metabolism, preserve lean muscle, and eliminate the energy crashes that sabotage your GLP-1 results. Two precision-formulated products working together through three longevity pathways.*</p>

            <ul className="glp1-check-list">
              <li><Check size={16} />Triple Power Methylene Blue + Metabolism+ Tablets — full 30-day protocol</li>
              <li><Check size={16} />Activates AMPK, Sirtuins &amp; Autophagy — three longevity pathways</li>
              <li><Check size={16} />Up to 72% more lean tissue retention vs GLP-1 alone*</li>
              <li><Check size={16} />Made in USA — FDA-registered, cGMP-certified facility</li>
              <li><Check size={16} />30-day 100% money-back guarantee, because it works*</li>
            </ul>

            <div className="glp1-checkout-price">
              <span className="checkout-big-price">$39.95</span>
              <span className="checkout-strike">$90.00</span>
              <span className="checkout-discount-badge">56% OFF TODAY</span>
            </div>
            <p className="checkout-shipping-note">FREE SHIPPING — NO CODE REQUIRED</p>

            <div className="glp1-bonuses-section">
              <h4 className="bonuses-title">YOUR FREE BONUSES</h4>
              <div className="glp1-bonuses-row">
                <div className="bonus-card">
                  <span className="bonus-free-tag">FREE</span>
                  <span className="bonus-name">Complete Protocol Guide</span>
                  <span className="bonus-value">$29 Value</span>
                </div>
                <div className="bonus-card">
                  <span className="bonus-free-tag">FREE</span>
                  <span className="bonus-name">Community Access</span>
                  <span className="bonus-value">$49 Value</span>
                </div>
                <div className="bonus-card">
                  <span className="bonus-free-tag">FREE</span>
                  <span className="bonus-name">Free Priority Shipping</span>
                  <span className="bonus-value">$12 Value</span>
                </div>
              </div>
            </div>

            {/* Inline Name + Email Form */}
            <form className="glp1buy-inline-form" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="glp1buy-form-headline">Claim Your 30-Day Protocol — Ships Free in 24–48 Hours</h3>
              <p className="glp1buy-form-subtext">Enter your details below to reserve your protocol. You'll complete secure payment on the next page — takes less than 60 seconds.</p>
              <div className="glp1buy-field">
                <label htmlFor="glp1buy-name">Your Name *</label>
                <input id="glp1buy-name" type="text" placeholder="e.g. Sarah Mitchell" {...register("name")} />
                {errors.name && <div className="glp1buy-field-error">{errors.name.message}</div>}
              </div>
              <div className="glp1buy-field">
                <label htmlFor="glp1buy-email">Email Address *</label>
                <input id="glp1buy-email" type="email" placeholder="your.email@gmail.com" {...register("email")} />
                {errors.email && <div className="glp1buy-field-error">{errors.email.message}</div>}
              </div>
              <p style={{ fontSize: '13px', color: '#DC2626', textAlign: 'center', margin: '8px 0' }}>⚡ Launch pricing — limited availability</p>

              <button type="submit" className="glp1-checkout-cta" disabled={isSubmitting || isLoading || hasSubmitted.current}>
                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Redirecting…</> : <>Get My GLP-1 Protocol <ArrowRight size={18} /></>}
              </button>

              <div className="glp1buy-secure-note">
                <Lock size={13} />
                <span>Secure checkout — SSL encrypted. Payment on next page.</span>
              </div>
            </form>

            <div className="glp1-guarantee-badge">
              <ShieldCheck size={28} />
              <div>
                <strong>30-Day Money-Back Guarantee</strong>
                <span>Try it risk-free. If you're not thrilled with your results, we'll refund every penny — no questions asked.</span>
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
        <span className="sticky-price">$39.95 <span className="sticky-strike">$90</span></span>
        <button className="sticky-cta-btn" disabled={isSubmitting || isLoading || hasSubmitted.current} onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Redirecting…</> : <>Get My GLP-1 Protocol <ArrowRight size={14} /></>}
        </button>
      </div>
    </div>
  );
};

export default GLP1BuyPage;
