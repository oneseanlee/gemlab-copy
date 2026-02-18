// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import './GLP1BundlePage.css';
import '../pages/OceanRaysPage.css';
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

// TODO: Replace with real Shopify variant ID once the GLP-1 Bundle product is created
const GLP1_BUNDLE_VARIANT_ID = 'gid://shopify/ProductVariant/PLACEHOLDER_GLP1_BUNDLE';
const GLP1_BUNDLE_PRODUCT = {
  node: {
    id: 'gid://shopify/Product/PLACEHOLDER_GLP1_BUNDLE',
    title: 'Complete GLP-1 Cellular Optimization System',
    description: '4-Product System + Licensed Physician Consultation + GLP-1 Medication (if approved)',
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
  };

  const faqItems = [
  { question: "What happens if I'm not medically approved for GLP-1?", answer: "If the independent provider determines you're not a candidate, your $140 consultation fee is fully refunded—and you keep the supplements ($139 value) regardless of approval. No hidden fees, no risk." },
  { question: "What's included in the $175 package?", answer: "Your package includes 4 premium supplement products (Activate365, Mito365, Metabolism Plus, Restore365) valued at $205, plus a licensed physician consultation and GLP-1 medication (if approved) valued at $450. Total value: $655." },
  { question: "Is this safe to take with GLP-1 medications like Ozempic or Wegovy?", answer: "Yes. This system is specifically designed to complement GLP-1 therapy. The supplements support lean mass preservation, energy, and recovery during weight management. Always inform your healthcare provider about all supplements you take." },
  { question: "What makes Metabolism Plus different from regular supplements?", answer: "Metabolism Plus is specifically formulated for GLP-1 users. It targets the unique metabolic changes that occur during GLP-1 therapy, supporting healthy metabolic function while preserving muscle mass during weight loss." },
  { question: "How do I take the 4-product system throughout the day?", answer: "Morning: Activate365 (30 min after waking) for muscle protection. Mid-Day: Mito365 (with lunch) for energy support. Afternoon: Metabolism Plus for metabolic support. Evening: Restore365 (30-60 min before bed) for sleep and recovery." },
  { question: "Will this help support muscle preservation while losing weight on GLP-1s?", answer: "Yes. The system is designed specifically to support lean mass during weight-management routines. Activate365 provides muscle protection and hormone support, while Restore365 enhances overnight muscle recovery." },
  { question: "How quickly will I notice results?", answer: "Many users report noticeable improvements in energy within the first 1-2 weeks. Sleep quality improvements are often noticed within the first few nights. Full systemic benefits typically develop over 4-8 weeks of consistent use." },
  { question: "What is the dosing for Metabolism Plus?", answer: "Metabolism Plus is taken as 2 tablets daily in the afternoon. It contains a precision blend of ingredients designed specifically for GLP-1 users to support healthy metabolic function." },
  { question: "How does the happyMD consultation work?", answer: "After purchase, you'll receive a secure HIPAA-compliant intake form from happyMD. A licensed provider reviews your information to determine GLP-1 eligibility. If approved, your medication is shipped directly to you—included in your $175 package." },
  { question: "How do I contact support if I have questions?", answer: "You can reach our support team by phone at (385) 421-5651 or by email at info@best365labs.com. Our team is available to answer any questions about the system, ingredients, or your order." }];


  return (
    <div className="glp1b-page">
            <MobileMenu links={mobileLinks} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* 1. Promo Banner */}
            {showBanner &&
      <div className="b365-promo-banner">
                    🔥 LIMITED TIME — Save $376 on the Complete GLP-1 Optimization System
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
                            <span className="price-note" style={{ textDecoration: 'line-through', marginRight: 8 }}>$655</span>
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
        { Icon: Stethoscope, title: 'GLP-1 Program', desc: 'via happyMD' },
        { Icon: ShieldCheck, title: 'Consultation', desc: 'Refund if not approved' },
        { Icon: Truck, title: 'Free Shipping', desc: 'Free on all orders' },
        { Icon: Award, title: 'Professional Grade', desc: 'Premium quality' },
        { Icon: Flag, title: 'Made in USA', desc: 'Made in the USA' }].
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
                <h3>Save $376 Today</h3>
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
                        {isLoading ? 'Adding...' : 'Ready to Experience These Benefits? — Save $376 Today'}
                    </AnimatedCTA>
                </div>
            </section>

            {/* 9. Pricing & Payment Breakdown */}
            <section className="b365-section b365-section-alt" id="pricing">
                <p className="glp1b-section-label">🔥 LIMITED TIME OFFER — Huge savings!</p>
                <h2 className="b365-section-heading b365-serif">Get The Complete GLP-1 <em>Optimization System</em></h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 12, fontSize: 16, fontWeight: 600 }}>4 Products. 24-Hour Protection. One Low Price.</p>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 40, fontSize: 14 }}>+ Telehealth GLP-1 Consultation with Refund Protection</p>

                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <span style={{ fontSize: 16, color: 'var(--b365-text-secondary)', textDecoration: 'line-through', marginRight: 12 }}>Total Value: $655</span>
                    <span style={{ fontSize: 48, fontWeight: 800, color: '#16a34a', fontFamily: "'Playfair Display', Georgia, serif" }}>$279</span>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--b365-blue)', marginTop: 8 }}>COMPLETE SYSTEM + CONSULTATION</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#16a34a', marginTop: 4 }}>Huge savings!</p>
                </div>

                {/* Transparent Payment Breakdown */}
                <div className="glp1b-payment-card">
                    <div className="glp1b-payment-header">📋 Transparent Payment Breakdown</div>
                    <div className="glp1b-payment-body">
                        <div className="glp1b-payment-row">
                            <div className="label">
                                <strong>Ultimate Cellular Optimization System (4 Products) <span className="glp1b-refund-tag non-refundable">Non-Refundable</span></strong>
                                <span>$205 value — Yours to keep regardless of medical approval</span>
                            </div>
                            <div className="amount">$139</div>
                        </div>
                        <div className="glp1b-payment-row">
                            <div className="label">
                                <strong>Licensed Physician Consultation + GLP-1 Medication <span className="glp1b-refund-tag refundable">Refundable If Not Approved</span></strong>
                                <span>$450 value — If approved: includes consultation + GLP-1 medication (first vial/supply)</span>
                            </div>
                            <div className="amount">$140</div>
                        </div>
                        <div className="glp1b-payment-row">
                            <div className="label"><strong>Total Package Price</strong></div>
                            <div className="amount" style={{ fontSize: 20, color: '#16a34a' }}>$279</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Refund Protection Guarantee */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">🛡️ Risk-Free Medical <em>Consultation Guarantee</em></h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 16, fontSize: 15, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
                    If the independent provider determines you're not a candidate, your $140 consultation fee is fully refunded—and you keep the supplements regardless of approval.
                </p>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 40, fontSize: 14, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
                    You'll still keep your Ultimate Cellular Optimization System supplements ($205 value) to support your wellness journey. No hidden fees—no risk.
                </p>
                <div className="glp1b-refund-grid">
                    <div className="glp1b-refund-card approved">
                        <h3>✅ If Approved for GLP-1</h3>
                        <ul>
                            <li><Check size={16} style={{ color: 'var(--b365-green)' }} />Keep all 4 supplement products ($139)</li>
                            <li><Check size={16} style={{ color: 'var(--b365-green)' }} />Get consultation + GLP-1 medication ($140 included)</li>
                            <li><Check size={16} style={{ color: 'var(--b365-green)' }} />Medication is INCLUDED in your package (first vial/supply)</li>
                            <li><Check size={16} style={{ color: 'var(--b365-green)' }} />Full support for your optimization journey</li>
                        </ul>
                    </div>
                    <div className="glp1b-refund-card not-approved">
                        <h3>💚 If NOT Approved</h3>
                        <ul>
                            <li><Check size={16} style={{ color: 'var(--b365-green)' }} />Keep all 4 supplement products ($139)</li>
                            <li><Check size={16} style={{ color: 'var(--b365-green)' }} />Get full $140 refund (consultation + medication fee)</li>
                            <li><Check size={16} style={{ color: 'var(--b365-green)' }} />No questions asked</li>
                            <li><Check size={16} style={{ color: 'var(--b365-green)' }} />Optimize your health with premium supplements</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 11. Bundle Value Card + Order Summary */}
            <section className="b365-section b365-section-alt">
                <p className="glp1b-section-label">🔥 LIMITED TIME OFFER — Huge savings!</p>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: 'var(--b365-text-secondary)' }}>Total Value: $655</span>
                    <span style={{ fontSize: 13, color: 'var(--b365-text-secondary)', margin: '0 8px' }}>($205 Supplements + $450 GLP-1 Program)</span>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--b365-text-secondary)' }}>now only</span>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 48, fontWeight: 800, color: '#16a34a', fontFamily: "'Playfair Display', Georgia, serif" }}>$279</span>
                </div>
                <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--b365-blue)', marginBottom: 8 }}>GLP-1 BUNDLE PRICE</p>
                <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--b365-text)', marginBottom: 8 }}>4-Product Complete System</p>
                <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--b365-blue)', marginBottom: 4 }}>🎁 BONUS INCLUDED:</p>
                <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: 'var(--b365-text)', marginBottom: 4 }}>GLP-1 Prescription + Consultation + First Vial</p>
                <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--b365-text-secondary)', marginBottom: 24 }}>($450 Value • No Additional Costs • No Hidden Fees)</p>
                <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#16a34a', marginBottom: 32 }}>Huge savings!</p>

                <h3 style={{ textAlign: 'center', fontSize: 16, fontWeight: 700, color: 'var(--b365-text)', marginBottom: 16 }}>Your Complete GLP-1 System Includes:</h3>
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

                        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--b365-text)', fontWeight: 600, marginBottom: 8 }}>
                            4 Premium Products — $205 Value for just $139
                        </div>
                        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--b365-text)', fontWeight: 600, marginBottom: 16 }}>
                            Medical Consultation + GLP-1 via happyMD — $450 Value for just $140
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
                            Ultimate Cellular Optimization System (4 Products)
                            <small><span className="glp1b-refund-tag non-refundable" style={{ marginLeft: 0 }}>NON-REFUNDABLE</span> Yours to keep regardless of medical approval</small>
                        </div>
                        <div className="os-amount">$139</div>
                    </div>
                    <div className="glp1b-order-row">
                        <div className="os-label">
                            Licensed Physician Consultation + GLP-1 Medication
                            <small><span className="glp1b-refund-tag refundable" style={{ marginLeft: 0 }}>REFUNDABLE IF NOT APPROVED</span> If approved: includes consultation + GLP-1 medication (first vial/supply)</small>
                        </div>
                        <div className="os-amount">$140</div>
                    </div>
                    <div className="glp1b-order-row">
                        <div className="os-label">
                            🎁 GLP-1 Medication
                            <small>INCLUDED if approved (first vial/supply)</small>
                        </div>
                        <div className="os-amount" style={{ color: 'var(--b365-green)' }}>Included</div>
                    </div>
                    <div className="glp1b-order-row">
                        <div className="os-label">Shipping</div>
                        <div className="os-amount" style={{ color: 'var(--b365-green)' }}>FREE</div>
                    </div>
                    <div className="glp1b-order-row">
                        <div className="os-label">Total Package Price</div>
                        <div className="os-amount" style={{ color: '#16a34a', fontSize: 20 }}>$279</div>
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

            {/* 13. Bonus Offer — GLP-1 Prescription Program */}
            <section className="b365-section b365-section-alt">
                <div className="glp1b-bonus-card">
                    <div className="glp1b-bonus-header">
                        <h3>🎁 EXCLUSIVE BONUS OFFER</h3>
                        <p>Your Personalized GLP-1 Prescription Program</p>
                    </div>
                    <div className="glp1b-bonus-body">
                        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--b365-text-secondary)', marginBottom: 24 }}>
                            Consultation facilitated by happyMD — Medical evaluation and prescription eligibility determined by an independent licensed provider.
                        </p>
                        <div className="glp1b-bonus-items">
                            <div className="glp1b-bonus-item">
                                <h4>Medical Consultation</h4>
                                <p>Complete evaluation with licensed healthcare provider through happyMD</p>
                                <span className="value-tag">$200 Value</span>
                            </div>
                            <div className="glp1b-bonus-item">
                                <h4>GLP-1 Prescription</h4>
                                <p>Personalized prescription issued by independent provider (upon approval)</p>
                                <span className="value-tag">Included (if approved)</span>
                            </div>
                            <div className="glp1b-bonus-item">
                                <h4>GLP-1 Medication INCLUDED</h4>
                                <p>Shipped directly to you (if approved): first vial/supply as prescribed</p>
                                <span className="value-tag">INCLUDED in $279</span>
                            </div>
                        </div>

                        <h4 style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: 'var(--b365-text)', marginBottom: 20 }}>How It Works:</h4>
                        <div className="glp1b-steps-grid">
                            {[
              { num: 1, title: 'Complete Your Order', desc: 'Purchase the $279 Ultimate Cellular Optimization System for GLP-1 users' },
              { num: 2, title: 'Complete HIPAA-Compliant Intake', desc: "You'll receive a secure intake form from happyMD after purchase" },
              { num: 3, title: 'Medical Review by Licensed Provider', desc: 'A licensed provider reviews your information to determine GLP-1 eligibility' },
              { num: 4, title: 'Medication Shipped (if approved)', desc: 'If approved, your GLP-1 medication (first supply) is shipped directly to you—INCLUDED in your $279 package' }].
              map((step, i) =>
              <div className="glp1b-step" key={i}>
                                    <div className="step-num">{step.num}</div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
              )}
                        </div>

                        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'var(--b365-blue)', marginTop: 24 }}>$450 VALUE — GLP-1 PROGRAM INCLUDED (upon provider approval)</p>
                        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--b365-text-secondary)' }}>With your $279 purchase today</p>
                    </div>
                </div>

                <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--b365-text-secondary)', marginTop: 24, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
                    Important: Medical evaluation provided by an independent licensed provider through happyMD. Prescriptions are issued only after medical review and provider approval. The $279 package includes the 4-product supplement system ($139 non-refundable), consultation + GLP-1 medication ($140 refundable if not medically approved). If approved, your first supply of GLP-1 medication is INCLUDED in the $279 package. No hidden fees. Medical eligibility and prescription decisions are made solely by the independent healthcare provider based on individual medical evaluation.
                </p>
            </section>

            {/* 14. Final CTA */}
            <section className="b365-section">
                <div className="tprime-final-cta">
                    <h2>Ready to Transform Your <em>GLP-1 Journey?</em></h2>
                    <p className="subtitle text-primary-foreground">Get Your Complete 4-Product System + GLP-1 Program Access</p>

                    <div className="tprime-final-price-box">
                        <span className="note">Just</span>
                        <span className="big-price">$279</span>
                        <span className="note">Total Value: $655 — Save $376!</span>
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
                <p className="glp1b-section-label">❓ Medical Questions</p>
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
                    <p style={{ fontSize: 14, color: 'var(--b365-text-secondary)', marginBottom: 12 }}>
                        <strong>Medical Disclaimer:</strong> Medical evaluation provided by an independent licensed provider through happyMD. Prescriptions are issued only after medical review and provider approval. GLP-1 medication eligibility and prescription decisions are made solely by the independent healthcare provider.
                    </p>
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
