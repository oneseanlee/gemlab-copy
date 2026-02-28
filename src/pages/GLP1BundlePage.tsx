// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import { trackMetaEvent } from '../lib/meta-pixel';
import './GLP1BundlePage.css';
import '../pages/HomePage.css';
import '../pages/TPrime365Page.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import { CartDrawer } from '../components/CartDrawer';
import { useCartStore } from '../stores/cartStore';
import EarlyTestersCarousel from '../components/EarlyTestersCarousel/EarlyTestersCarousel';
import { Menu, Shield, Zap, Activity, Moon, Stethoscope, ShieldCheck, Truck, Award, Flag, Check, Lock, Calendar, Package, Headphones } from 'lucide-react';

const CertificateLottie = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/images/certificate-lottie.json').then(r => r.json()).then(setData);
  }, []);
  if (!data) return <div style={{ width: 80, height: 80, margin: '0 auto 16px' }} />;
  return (
    <div style={{ width: 80, height: 80, margin: '0 auto 16px' }}>
      <Lottie animationData={data} loop={true} />
    </div>
  );
};

const GLP1_BUNDLE_VARIANT_ID = 'gid://shopify/ProductVariant/46309998100620';
const GLP1_BUNDLE_PRODUCT = {
  node: {
    id: 'gid://shopify/Product/GLP1_BUNDLE',
    title: 'Complete GLP-1 Cellular Optimization System',
    description: '4-Product Cellular Optimization System',
    handle: 'glp1-cellular-optimization-system',
    priceRange: { minVariantPrice: { amount: '175.00', currencyCode: 'USD' } },
    images: { edges: [{ node: { url: '/placeholder.svg', altText: 'GLP-1 Bundle' } }] },
    variants: { edges: [{ node: { id: GLP1_BUNDLE_VARIANT_ID, title: 'Complete Bundle', price: { amount: '175.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Bundle', value: 'Complete System + Consultation' }] } }] },
    options: [{ name: 'Bundle', values: ['Complete System + Consultation'] }]
  }
};

const GLP1BundlePage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    trackMetaEvent('ViewContent', { content_name: 'Complete GLP-1 Cellular Optimization System', content_type: 'product', value: 175.00, currency: 'USD' });
  }, []);

  const mobileLinks = [
    { label: 'Benefits', href: '#benefits' },
    { label: 'System', href: '#system' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleOrderNow = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    await addItem({
      product: GLP1_BUNDLE_PRODUCT,
      variantId: GLP1_BUNDLE_VARIANT_ID,
      variantTitle: 'Complete Bundle',
      price: { amount: '175.00', currencyCode: 'USD' },
      quantity: 1,
      selectedOptions: [{ name: 'Bundle', value: 'Complete System + Consultation' }]
    });
    useCartStore.getState().setCartOpen(true);
  };

  const faqItems = [
  { question: "What's included in the package?", answer: "Your package includes 4 premium supplement products (Activate365, Mito365, Metabolism Plus, Restore365) designed to support lean mass, energy, metabolism, and recovery." },
  { question: "Is this safe to take with GLP-1 medications like Ozempic or Wegovy?", answer: "Yes. This system is specifically designed to complement GLP-1 therapy. The supplements support lean mass preservation, energy, and recovery during weight management. Always inform your healthcare provider about all supplements you take." },
  { question: "What makes Metabolism Plus different from regular supplements?", answer: "Metabolism Plus is specifically formulated for GLP-1 users. It targets the unique metabolic changes that occur during GLP-1 therapy, supporting healthy metabolic function while preserving muscle mass during weight loss." },
  { question: "How do I take the 4-product system throughout the day?", answer: "Morning: Activate365 (30 min after waking) for muscle protection. Mid-Day: Mito365 (with lunch) for energy support. Afternoon: Metabolism Plus for metabolic support. Evening: Restore365 (30-60 min before bed) for sleep and recovery." },
  { question: "Will this help support muscle preservation while losing weight on GLP-1s?", answer: "Yes. The system is designed specifically to support lean mass during weight-management routines. Activate365 provides muscle protection and hormone support, while Restore365 enhances overnight muscle recovery." },
  { question: "How quickly will I notice results?", answer: "Many users report noticeable improvements in energy within the first 1-2 weeks. Sleep quality improvements are often noticed within the first few nights. Full systemic benefits typically develop over 4-8 weeks of consistent use." },
  { question: "What is the dosing for Metabolism Plus?", answer: "Metabolism Plus is taken as 2 tablets daily in the afternoon. It contains a precision blend of ingredients designed specifically for GLP-1 users to support healthy metabolic function." },
  { question: "How do I contact support if I have questions?", answer: "You can reach our support team by phone at (385) 421-5651 or by email at info@best365labs.com. Our team is available to answer any questions about the system, ingredients, or your order." }];


  return (
    <div className="glp1b-page">
            <MobileMenu links={mobileLinks} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* 1. Promo Banner */}
            {showBanner &&
      <div className="b365-promo-banner">
                    🔥 LIMITED TIME — Save on the Complete GLP-1 Cellular Optimization System
                    <button onClick={() => setShowBanner(false)} aria-label="Close banner">✕</button>
                </div>
      }

            {/* 2. Navigation */}
            <nav className={`b365-nav ${showBanner ? 'with-banner' : ''}`}>
                <div className="b365-nav-inner">
                    <button className="b365-hamburger" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <a href="/">
                        <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
                    </a>
                    <ul className="b365-nav-links">
                        <li><a href="#benefits">Benefits</a></li>
                        <li><a href="#system">System</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                    <div className="b365-nav-right">
                        <CartDrawer />
                        <AnimatedCTA href="#" small onClick={handleOrderNow} disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Get The System'}
                        </AnimatedCTA>
                    </div>
                </div>
            </nav>

            {/* 3. Hero Section */}
            <section className={`glp1b-hero-section ${!showBanner ? 'no-banner' : ''}`}>
                <div className="tprime-hero-container">
                    <div className="tprime-hero-img" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="glp1b-section-label" style={{ marginBottom: 12 }}>✨ Complete GLP-1 Optimization Bundle</p>
                        <div style={{ overflow: 'hidden', borderRadius: 16, aspectRatio: '16/9', maxHeight: 520, width: '100%', position: 'relative' }}>
                            <video
                ref={videoRef}
                src="https://storage.googleapis.com/msgsndr/aYvoAsXxf5xBOSngnm2U/media/6966cb954d18c5dcdb2173e1.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                            <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted;
                    setIsMuted(!isMuted);
                  }
                }}
                style={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  background: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: 18,
                  backdropFilter: 'blur(4px)',
                  transition: 'background 0.2s'
                }}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}>

                                {isMuted ? '🔇' : '🔊'}
                            </button>
                        </div>
                        <div className="glp1b-hero-badges" style={{ marginTop: 16 }}>
                            <span className="glp1b-hero-badge">
                                <Shield size={14} />
                                Supports lean mass
                            </span>
                            <span className="glp1b-hero-badge">
                                <Zap size={14} />
                                Supports daily energy
                            </span>
                            <span className="glp1b-hero-badge">
                                <Activity size={14} />
                                Supports metabolic health
                            </span>
                        </div>
                    </div>
                    <div className="tprime-hero-text">
                        <h1>GLP-1 Cellular<br />Optimization System<br /><em>for Daily Energy + Recovery</em></h1>
                        <p className="subhead">The complete 4-product system designed to support lean mass, daily energy, and metabolic health during GLP-1 routines.</p>
                        <div className="price-row">
                            <span className="price-big">$175</span>
                            <span className="price-note" style={{ textDecoration: 'line-through', marginRight: 8 }}>$205</span>
                        </div>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                            <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                                {isLoading ? 'Adding to Cart...' : 'Get The System'}
                            </AnimatedCTA>
                            <a href="#system" style={{ color: 'var(--b365-blue)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                                See What's Included ↓
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Trust Strip */}
            <div className="glp1b-trust-strip">
                {[
        { Icon: ShieldCheck, title: '60-Day Guarantee', desc: 'Risk-free purchase' },
        { Icon: Truck, title: 'Free Shipping', desc: 'Free on all orders' },
        { Icon: Award, title: 'Professional Grade', desc: 'Premium quality' },
        { Icon: Flag, title: 'Made in USA', desc: 'Made in the USA' },
        { Icon: Zap, title: '4-Product System', desc: '24-hour optimization' }].
        map((badge, i) =>
        <div className="glp1b-trust-badge" key={i}>
                        <div className="icon-wrap">
                            <badge.Icon size={20} />
                        </div>
                        <h4>{badge.title}</h4>
                        <p>{badge.desc}</p>
                    </div>
        )}
            </div>

            {/* 5. Supporting Your Routine */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">Supporting Your Routine <em>During GLP-1 Use</em></h2>
                <div className="glp1b-intro">
                    <p>GLP-1 medications are commonly used as part of weight-management programs.</p>
                    <p>Alongside nutrition, movement, and sleep, some people also focus on supporting lean mass, daily energy, and recovery during reduced calorie intake.</p>
                    <p>This system is designed to complement those priorities as part of a broader healthy routine.</p>
                    <p style={{ fontWeight: 600, color: 'var(--b365-blue)', marginTop: 16 }}>See what's included below ↓</p>
                </div>
            </section>

            {/* 6. 4-Product System */}
            <section className="b365-section" id="system">
                <p className="glp1b-section-label">THE GLP-1 CELLULAR OPTIMIZATION SYSTEM</p>
                <h2 className="b365-section-heading b365-serif">The Only 4-Product System<br />Designed <em>SPECIFICALLY</em> for GLP-1 Users</h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 40, fontSize: 15, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
                    This complete 24-hour cellular optimization system supports lean mass, daily energy, and metabolic health — all while complementing your GLP-1 routine.
                </p>
                <div className="glp1b-flow-grid">
                    {[
          { img: '/images/glp1-activate365.png', time: 'Morning', timeClass: 'morning', title: 'Activate365', subtitle: 'Muscle Protection & Hormone Support', items: ['Preserve lean muscle mass during weight loss', 'Support healthy testosterone & growth hormone levels', 'Maintain strength and vitality'] },
          { img: '/images/glp1-mito365.png', time: 'Mid-Day', timeClass: 'midday', title: 'Mito365', subtitle: 'Cellular Energy & Anti-Fatigue', items: ['Supports energy and reduces fatigue', 'Boost mitochondrial energy production', 'Enhance focus and mental clarity'] },
          { img: '/images/glp1-metabolism.png', time: 'Afternoon', timeClass: 'afternoon', title: 'Metabolism Plus', subtitle: 'Metabolic Support for GLP-1 Users*', items: ['Designed specifically for GLP-1 users', 'Support healthy metabolic function during weight loss', 'Support metabolic health while preserving muscle'] },
          { img: '/images/glp1-restore365.png', time: 'Evening', timeClass: 'evening', title: 'Restore365', subtitle: 'Sleep & Muscle Recovery', items: ['Improve sleep quality disrupted by weight loss', 'Enhance overnight muscle recovery & repair', 'Reduce stress from body composition changes'] }].
          map((product, i) =>
          <div className="glp1b-flow-card" key={i}>
                            <img className="flow-img" src={product.img} alt={product.title} />
                            <span className={`flow-time ${product.timeClass}`}>{product.time}</span>
                            <h3>{product.title}</h3>
                            <p className="flow-subtitle">{product.subtitle}</p>
                            <ul>
                                {product.items.map((item, j) =>
              <li key={j}><Check size={14} />{item}</li>
              )}
                            </ul>
                        </div>
          )}
                </div>
            </section>

            {/* 7. Key Benefits */}
            <section className="b365-section b365-section-alt" id="benefits">
                <h2 className="b365-section-heading b365-serif">How This System Supports <em>Your GLP-1 Routine</em></h2>
                <div className="tprime-benefits-grid" style={{ maxWidth: 1000, gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    {[
          { Icon: Shield, title: 'Supports Lean Mass', desc: 'Helps support muscle during weight-management routines' },
          { Icon: Activity, title: 'Supports Metabolism', desc: 'Supports metabolic health during and after your routine' },
          { Icon: Zap, title: 'Supports Daily Energy', desc: 'Supports cellular energy for your daily activities' },
          { Icon: Moon, title: 'Supports Recovery', desc: 'Deep sleep supports better recovery during your routine' }].
          map((b, i) =>
          <div className="tprime-benefit-card" key={i}>
                            <div className="icon-wrap">
                                <b.Icon size={22} />
                            </div>
                            <h4>{b.title}</h4>
                            <p>{b.desc}</p>
                        </div>
          )}
                </div>
            </section>

            {/* Mid CTA */}
            <div className="glp1b-mid-cta">
                <h3>Save $30 Today</h3>
                <p>See pricing and order details below</p>
                <AnimatedCTA href="#pricing" onClick={(e) => {e.preventDefault();document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });}}>
                    See Pricing ↓
                </AnimatedCTA>
            </div>

            {/* 8. Testimonials */}
            <section className="b365-section">
                <p className="glp1b-section-label">TRUSTED VOICES</p>
                <h2 className="b365-section-heading b365-serif">Ultimate Cellular Optimization System: <em>Trusted Voices</em></h2>

                <h3 style={{ textAlign: 'center', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: 'var(--b365-text)', marginBottom: 24 }}>Co-Founders</h3>
                <div className="ucos-testimonial-grid" style={{ marginBottom: 40 }}>
                    {[
          { img: '/images/testimonial-dan-schmidt.png', name: 'Dan Schmidt', role: 'Co-Founder', quote: "I'm proud to help build a system that combines the latest science with real-world results—empowering everyone to achieve peak cellular health." },
          { img: '/images/testimonial-darren-lopez.png', name: 'Darren Lopez', role: 'Co-Founder', quote: "Our goal was simple: create a solution that truly helps people reclaim their energy, resilience, and confidence by optimizing health at the cellular level." }].
          map((t, i) =>
          <div className="ucos-testimonial-card" key={i}>
                            <img className="testimonial-avatar" src={t.img} alt={t.name} />
                            <div className="testimonial-body">
                                <h4>{t.name}</h4>
                                <div className="role">{t.role}</div>
                                <blockquote>"{t.quote}"</blockquote>
                            </div>
                        </div>
          )}
                </div>

                <h3 style={{ textAlign: 'center', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: 'var(--b365-text)', marginBottom: 24 }}>Early Testers</h3>
                <EarlyTestersCarousel />

                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Ready to Experience These Benefits? — Get The System'}
                    </AnimatedCTA>
                </div>
            </section>

            {/* 9. Pricing & Payment Breakdown */}
            <section className="b365-section b365-section-alt" id="pricing">
                <p className="glp1b-section-label">🔥 LIMITED TIME OFFER — Huge savings!</p>
                <h2 className="b365-section-heading b365-serif">Get The Complete GLP-1 <em>Optimization System</em></h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 40, fontSize: 16, fontWeight: 600 }}>4 Products. 24-Hour Optimization. One Low Price.</p>

                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <span style={{ fontSize: 16, color: 'var(--b365-text-secondary)', textDecoration: 'line-through', marginRight: 12 }}>$205</span>
                    <span style={{ fontSize: 48, fontWeight: 800, color: '#16a34a', fontFamily: "'Playfair Display', Georgia, serif" }}>$175</span>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--b365-blue)', marginTop: 8 }}>COMPLETE 4-PRODUCT SYSTEM</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#16a34a', marginTop: 4 }}>Save $30 today!</p>
                </div>
            </section>

            {/* 11. Bundle Value Card + Order Summary */}
            <section className="b365-section b365-section-alt">
                <p className="glp1b-section-label">🔥 LIMITED TIME OFFER</p>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: 'var(--b365-text-secondary)' }}>Total Value: $205</span>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--b365-text-secondary)' }}>now only</span>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 48, fontWeight: 800, color: '#16a34a', fontFamily: "'Playfair Display', Georgia, serif" }}>$175</span>
                </div>
                <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--b365-blue)', marginBottom: 8 }}>COMPLETE 4-PRODUCT SYSTEM</p>
                <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--b365-text)', marginBottom: 32 }}>4-Product Complete System</p>

                <h3 style={{ textAlign: 'center', fontSize: 16, fontWeight: 700, color: 'var(--b365-text)', marginBottom: 16 }}>Your Complete System Includes:</h3>
                <div className="ucos-bundle-card" style={{ marginBottom: 32 }}>
                    <div className="ucos-bundle-body">
                        <div className="ucos-bundle-products" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                            {[
              { name: 'Activate365', desc: 'Muscle Protection', detail: '30 servings' },
              { name: 'Mito365', desc: 'Energy Support', detail: '60 tablets' },
              { name: 'Metabolism Plus', desc: 'Lean & Energized', detail: '60 tablets' },
              { name: 'Restore365', desc: 'Sleep & Recovery', detail: '30 servings' }].
              map((p, i) =>
              <div className="ucos-bundle-product" key={i}>
                                    <h4>{p.name}</h4>
                                    <div className="product-timing">{p.desc}</div>
                                    <p style={{ fontSize: 12, color: 'var(--b365-text-secondary)', margin: 0 }}>{p.detail}</p>
                                </div>
              )}
                        </div>

                        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--b365-text)', fontWeight: 600, marginBottom: 16 }}>
                            4 Premium Products — $205 Value for just $175
                        </div>

                        <div className="ucos-bundle-trust">
                            <span><Truck size={16} /> Free Shipping</span>
                            <span><Calendar size={16} /> 60-Day Guarantee</span>
                            <span><Award size={16} /> GMP Certified</span>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="glp1b-order-summary">
                    <div className="os-header">📦 Order Summary</div>
                    <div className="glp1b-order-row">
                        <div className="os-label">
                            GLP-1 Cellular Optimization System (4 Products)
                        </div>
                        <div className="os-amount">$175</div>
                    </div>
                    <div className="glp1b-order-row">
                        <div className="os-label">Shipping</div>
                        <div className="os-amount" style={{ color: 'var(--b365-green)' }}>FREE</div>
                    </div>
                    <div className="glp1b-order-row">
                        <div className="os-label">Total</div>
                        <div className="os-amount" style={{ color: '#16a34a', fontSize: 20 }}>$175</div>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Get The System — Secure checkout next'}
                    </AnimatedCTA>
                </div>
            </section>

            {/* 12. 60-Day Guarantee */}
            <section className="b365-section">
                <div className="glp1b-guarantee-card">
                    <CertificateLottie />
                    <h3>Our 60-Day Satisfaction Guarantee</h3>
                    <p>Try the GLP-1 Cellular Optimization System risk-free for 60 days. If you're not satisfied with your experience, simply return it for a full refund. No questions asked.</p>
                    <p style={{ fontWeight: 600, color: 'var(--b365-text)', marginTop: 16 }}>Your satisfaction is our priority.</p>
                </div>
            </section>


            {/* 14. Final CTA */}
            <section className="b365-section">
                <div className="tprime-final-cta">
                    <h2>Ready to Transform Your <em>GLP-1 Journey?</em></h2>
                    <p className="subtitle text-primary-foreground">Get Your Complete 4-Product Cellular Optimization System</p>

                    <div className="tprime-final-price-box">
                        <span className="note">Just</span>
                        <span className="big-price">$175</span>
                        <span className="note">$205 Value — Save $30!</span>
                    </div>

                    <AnimatedCTA href="#" className="btn-white-cta" onClick={handleOrderNow} disabled={isLoading}>
                        {isLoading ? 'Adding to Cart...' : 'Get The System — Secure checkout next'}
                    </AnimatedCTA>
                    <div className="tprime-cta-trust-strip">
                        <span><Lock size={14} /> 256-bit SSL Encrypted</span>
                        <span><Truck size={14} /> Free Shipping</span>
                        <span><ShieldCheck size={14} /> 60-Day Guarantee</span>
                    </div>
                </div>
            </section>

            {/* 15. FAQ */}
            <section className="b365-section b365-section-alt" id="faq">
                <p className="glp1b-section-label">❓ Common Questions</p>
                <div className="b365-faq-layout">
                    <div className="b365-faq-left">
                        <h2>Frequently Asked <em>Questions</em></h2>
                        <AnimatedCTA href="mailto:info@best365labs.com" style={{ marginTop: 8 }}>
                            <Headphones size={16} />
                            Contact Support
                        </AnimatedCTA>
                    </div>
                    <div>
                        {faqItems.map((item, index) =>
            <div className="b365-faq-item" key={index}>
                                <button className="b365-faq-trigger" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                                    {item.question}
                                    <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                                </button>
                                {openFaq === index && <div className="b365-faq-answer">{item.answer}</div>}
                            </div>
            )}
                    </div>
                </div>
            </section>

            {/* 16. Safety Information */}
            <section className="b365-section">
                <div className="tprime-safety">
                    <h3>Important Safety & Disclaimer Information</h3>
                    <p style={{ fontSize: 12, color: 'var(--b365-text-secondary)', fontStyle: 'italic', lineHeight: 1.7 }}>
                        *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.
                    </p>
                    <p className="report">📞 Questions? Call: (385) 421-5651 | 📧 info@best365labs.com</p>
                </div>
            </section>

            {/* Footer */}
            <SharedFooter />
        </div>);

};

export default GLP1BundlePage;
