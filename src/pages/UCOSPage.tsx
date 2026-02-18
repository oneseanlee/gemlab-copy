// @ts-nocheck
import React, { useState } from 'react';
import './UCOSPage.css';
import '../pages/HomePage.css';
import '../pages/TPrime365Page.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import { CartDrawer } from '../components/CartDrawer';
import { useCartStore } from '../stores/cartStore';
import { Menu, ArrowRight, Sunrise, Sun, Moon, BadgeCheck, Clock, Flag, ShieldCheck, Zap, Brain, Dumbbell, Activity, Sparkles, Heart, RefreshCw, Bed, Dna, Shield, Gem, Flame, ChevronRight, Check, Truck, Package, Award, Lock, Headphones, AlertCircle } from 'lucide-react';

// TODO: Replace with real Shopify variant ID once the UCOS product is created
const UCOS_VARIANT_ID = 'gid://shopify/ProductVariant/PLACEHOLDER_UCOS';
const UCOS_PRODUCT = {
  node: {
    id: 'gid://shopify/Product/PLACEHOLDER_UCOS',
    title: 'Ultimate Cellular Optimization System',
    description: 'Complete 24-Hour Cellular Optimization System — Activate365, Mito365, Restore365',
    handle: 'ucos-complete-system',
    priceRange: { minVariantPrice: { amount: '175.00', currencyCode: 'USD' } },
    images: { edges: [{ node: { url: '/images/product-ucos.png', altText: 'UCOS System' } }] },
    variants: { edges: [{ node: { id: UCOS_VARIANT_ID, title: 'Complete System', price: { amount: '175.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Bundle', value: 'Complete System' }] } }] },
    options: [{ name: 'Bundle', values: ['Complete System'] }]
  }
};

const UCOSPage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const mobileLinks = [
    { label: 'Benefits', href: '#benefits' },
    { label: 'Results', href: '#results' },
    { label: 'Compare', href: '#compare' },
    { label: 'Bundle', href: '#bundle' },
  ];

  const handleOrderNow = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    await addItem({
      product: UCOS_PRODUCT,
      variantId: UCOS_VARIANT_ID,
      variantTitle: 'Complete System',
      price: { amount: '175.00', currencyCode: 'USD' },
      quantity: 1,
      selectedOptions: [{ name: 'Bundle', value: 'Complete System' }]
    });
  };

  const faqItems = [
  { question: "How does the 24-hour cellular optimization system work?", answer: "The system uses three precision-timed supplements: Activate365 in the morning to prime your cells with spermidine, NAD+, and boron; Mito365 at midday to supercharge mitochondrial function with Methylene Blue, PQQ, and NAD+; and Restore365 in the evening to optimize deep sleep and overnight recovery with melatonin, GABA, and boron. Together, they create a complete 24-hour optimization cycle." },
  { question: "What makes this different from taking individual supplements?", answer: "Individual supplements lack coordination and timing. Our system is precisely engineered so each formula amplifies the others — morning activation feeds into midday energy production, which feeds into evening recovery. The cumulative synergy delivers results that individual supplements simply cannot match. Plus, our MODS Max™ delivery technology provides up to 10x enhanced absorption." },
  { question: "Are the ingredients safe and third-party tested?", answer: "Yes. All products are manufactured in FDA-registered, cGMP-certified facilities in the USA. Every batch is third-party tested for purity and potency. Important: Methylene Blue (in Mito365) should NOT be used by patients with G6PD deficiency or those taking MAOIs/SSRIs." },
  { question: "How quickly will I see results with the cellular system?", answer: "Many users report noticeable improvements in energy and focus within the first 1-2 weeks. Sleep quality improvements with Restore365 are often noticed within the first few nights. Full systemic benefits typically develop over 4-8 weeks of consistent use." },
  { question: "What is MODS Max™ delivery technology?", answer: "MODS Max™ (Microdose Optimized Delivery System) is our patent-pending sublingual delivery technology. It uses microdose reactive oxygen species to briefly open mucosal barriers, enabling direct bloodstream absorption that bypasses the digestive system. This results in up to 10x enhanced bioavailability compared to standard oral supplements." },
  { question: "How do I contact 365 Labs for support?", answer: "You can reach our support team by phone at (385) 421-5651 or by email at info@best365labs.com. Our team is available to answer any questions about the system, ingredients, or your order." }];


  return (
    <div className="ucos-page">
            <MobileMenu links={mobileLinks} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* 1. Promo Banner */}
            {showBanner &&
      <div className="b365-promo-banner">
                    🔥 SAVE $83 — Ultimate Cellular Optimization System — Today Only
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
                        <li><a href="#results">Results</a></li>
                        <li><a href="#compare">Compare</a></li>
                        <li><a href="#bundle">Bundle</a></li>
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
            <section className={`ucos-hero-section ${!showBanner ? 'no-banner' : ''}`}>
                <div className="tprime-hero-container">
                    <div className="tprime-hero-img">
                        <img src="/images/ucos-hero.png" alt="Ultimate Cellular Optimization System — Activate365, Mito365, Restore365" />
                    </div>
                    <div className="tprime-hero-text">
                        <p className="ucos-section-label" style={{ textAlign: 'left', marginBottom: 8 }}>Revolutionary Benefits for Both Men and Women</p>
                        <h1>Unlock 24‑Hour Cellular <em>Power</em></h1>
                        <p className="subhead">A Complete 24-Hour Nutritional System: Three Precision Supplements for Energy, Wellness, and Recovery.</p>
                        <div className="ucos-hero-badges">
                            <span className="ucos-hero-badge morning">
                                <Sunrise size={14} />
                                Morning — Activate365
                            </span>
                            <span className="ucos-hero-badge midday">
                                <Sun size={14} />
                                Mid-Day — Mito365
                            </span>
                            <span className="ucos-hero-badge evening">
                                <Moon size={14} />
                                Evening — Restore365
                            </span>
                        </div>
                        <div className="ucos-save-banner">🔥 Save $83 Today Only</div>
                        <div className="price-row">
                        <span className="price-big">$175</span>
                            <span className="price-note" style={{ textDecoration: 'line-through', marginRight: 8 }}>$258</span>
                        </div>
                        <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                            {isLoading ? 'Adding to Cart...' : 'Claim Your System Now'}
                            <ArrowRight size={16} />
                        </AnimatedCTA>
                    </div>
                </div>
            </section>

            {/* 4. Trust Badges */}
            <div className="ucos-trust-strip">
                {[
        { Icon: BadgeCheck, value: '10X', title: 'Faster Absorption', desc: 'MODS Max™' },
        { Icon: Clock, value: '24 Hr', title: 'Sustained Support', desc: 'Time-Release System' },
        { Icon: Flag, value: 'USA Made', title: 'cGMP Certified', desc: 'Quality Controlled' },
        { Icon: ShieldCheck, value: 'Quality Tested', title: 'Third-Party Verified', desc: 'Lab Assured' }].
        map((badge, i) =>
        <div className="ucos-trust-badge" key={i}>
                        <div className="icon-wrap">
                            <badge.Icon size={22} />
                        </div>
                        <div className={`trust-value${badge.value.length > 4 ? ' text-long' : ''}`}>{badge.value}</div>
                        <h4>{badge.title}</h4>
                        <p>{badge.desc}</p>
                    </div>
        )}
            </div>

            {/* 5. Complete Cellular Integration */}
            <section className="b365-section" id="benefits">
                <h2 className="b365-section-heading b365-serif">Complete Cellular <em>Integration</em></h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 40, fontSize: 15, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
                    Three precision formulas work in perfect synergy, flowing together to create the ultimate 24-hour cellular optimization system
                </p>
                <div className="ucos-flow-grid">
                    {[
          { img: '/images/activate365.png', time: 'Morning', timeClass: 'morning', title: 'Activate365', subtitle: 'Morning Cellular Activation', desc: 'Sublingual primer with Spermidine, NAD+, and Boron to activate autophagy and prime cellular energy.' },
          { img: '/images/mito365.png', time: 'Mid-Day', timeClass: 'midday', title: 'Mito365', subtitle: 'All-Day Mitochondrial Power', desc: 'Tablet matrix with Methylene Blue, PQQ, NAD+, and GHK-Cu for sustained mitochondrial performance.' },
          { img: '/images/restore365.png', time: 'Evening', timeClass: 'evening', title: 'Restore365', subtitle: 'Overnight Recovery Optimization', desc: 'Sublingual recovery with Melatonin, GABA, and Boron for deep sleep and cellular repair.' }].
          map((product, i) =>
          <div className="ucos-flow-card" key={i}>
                            {/* PLACEHOLDER IMAGE — Needs: Individual product bottle */}
                            <img className="flow-img" src={product.img} alt={product.title} />
                            <span className={`flow-time ${product.timeClass}`}>{product.time}</span>
                            <h3>{product.title}</h3>
                            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--b365-blue)', marginBottom: 8 }}>{product.subtitle}</p>
                            <p>{product.desc}</p>
                        </div>
          )}
                </div>
            </section>

            {/* 6. Cellular Optimization Benefits — Detailed */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">Cellular Optimization <em>Benefits</em></h2>
                <div className="ucos-product-detail-grid">
                    {[
          {
            img: '/images/benefit-morning-activation.jpg', title: 'Morning Cellular Activation (Activate365)',
            items: ['Spermidine 10mg — Activates autophagy & cellular renewal', 'NAD+ 20mg — Immediate cellular energy production', 'Boron 10mg — Hormone optimization & priming', 'MODS Max™ — 10x enhanced sublingual absorption']
          },
          {
            img: '/images/benefit-midday-power.jpg', title: 'All-Day Mitochondrial Power (Mito365)',
            items: ['Methylene Blue 10mg — 30-40% ATP increase', 'PQQ 20mg — Creates new mitochondria (biogenesis)', 'NAD+ 150mg — Maximum cellular energy', 'GHK-Cu Peptide 10mg — Tissue repair & recovery']
          },
          {
            img: '/images/benefit-evening-restore.jpg', title: 'Overnight Recovery Optimization (Restore365)',
            items: ['Enhanced Melatonin 600mcg — 50-70% faster sleep onset', 'GABA 50mg — Deep sleep support', 'Boron 10mg — Growth hormone release', 'MODS Max™ Sleep Matrix — Overnight cellular repair']
          }].
          map((product, i) =>
          <div className="ucos-product-detail-card" key={i}>
                            <div className="product-img-wrap">
                                <img src={product.img} alt={product.title} />
                            </div>
                            <div className="product-detail-body">
                                <h3>{product.title}</h3>
                                <ul>
                                    {product.items.map((item, j) =>
                <li key={j}><ChevronRight size={14} />{item}</li>
                )}
                                </ul>
                            </div>
                        </div>
          )}
                </div>
            </section>

            {/* 7. Key Benefits Overview */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Experience Targeted Benefits <em>Throughout Your Day</em></h2>
                <div className="tprime-benefits-grid">
                    {[
          { Icon: Zap, title: 'Sustained Daily Energy', desc: 'No more crashes — steady energy from morning to evening.' },
          { Icon: Brain, title: 'Enhanced Mental Clarity', desc: 'Sharper focus and cognitive performance all day long.' },
          { Icon: Dumbbell, title: 'Improved Physical Performance', desc: 'Better workouts, faster recovery, and increased endurance.' },
          { Icon: Activity, title: 'All-Day Sustained Energy', desc: 'Mitochondrial power keeps you performing at your peak.' },
          { Icon: Sparkles, title: 'Enhanced Cognitive Function', desc: 'Methylene Blue and NAD+ work together for mental clarity.' },
          { Icon: Heart, title: 'Better Cellular Health', desc: 'PQQ creates new mitochondria while NAD+ powers existing ones.' },
          { Icon: Moon, title: 'Deeper Restorative Sleep', desc: 'Optimized melatonin and GABA for quality deep sleep.' },
          { Icon: RefreshCw, title: 'Faster Muscle Recovery', desc: 'Overnight cellular repair with growth hormone support.' },
          { Icon: Bed, title: 'Improved Sleep Patterns', desc: 'Fall asleep faster and wake refreshed with consistent quality.' }].
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
            <div className="ucos-mid-cta">
                <h3>Save $83 Today Only</h3>
                <p>Start your complete cellular optimization journey now</p>
                <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Get Your System Now'}
                </AnimatedCTA>
            </div>

            {/* 8. Cumulative System Benefits */}
            <section className="b365-section" id="results">
                <p className="ucos-section-label">SYNERGISTIC POWER</p>
                <h2 className="b365-section-heading b365-serif">Cumulative System <em>Benefits</em></h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 40, fontSize: 15, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
                    Experience the synergistic power of our complete 24-hour cellular optimization system
                </p>
                <div className="ucos-stats-grid">
                    {[
          { Icon: Dna, value: '170mg', label: 'TOTAL DAILY NAD+', desc: 'Maximum cellular energy production and longevity pathway activation throughout entire 24-hour cycle' },
          { Icon: Shield, value: '160mg', label: 'TOTAL DAILY VITAMIN C', desc: 'Complete antioxidant protection during enhanced cellular activity and overnight recovery processes' },
          { Icon: Gem, value: '20mg', label: 'TOTAL DAILY BORON', desc: 'Full hormone optimization cycle with morning priming and evening restoration support' },
          { Icon: Zap, value: '10x', label: 'ENHANCED ABSORPTION', desc: 'MODS Max technology maximizes bioavailability of all nutrients for exponential benefit enhancement' },
          { Icon: RefreshCw, value: '24/7', label: 'COMPLETE AUTOPHAGY CYCLE', desc: 'Morning activation with spermidine, sustained throughout day, enhanced during sleep recovery' },
          { Icon: Flame, value: '3x', label: 'TRIPLE MITOCHONDRIAL SUPPORT', desc: 'Methylene Blue optimization + PQQ biogenesis + NAD+ power for maximum cellular energy' }].
          map((stat, i) =>
          <div className="ucos-stat-card" key={i}>
                            <div className="stat-icon">
                                <stat.Icon size={22} />
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                            <p className="stat-desc">{stat.desc}</p>
                        </div>
          )}
                </div>
            </section>

            {/* 9. Testimonials */}
            <section className="b365-section b365-section-alt">
                <p className="ucos-section-label">TRUSTED VOICES</p>
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
                <div className="ucos-testimonial-grid">
                    {[
          { img: '/images/testimonial-brett-earnshaw.png', name: 'Brett Earnshaw', role: 'Early Tester', quote: "My testosterone went from 658 to 749 in two months—more energy, sharper focus, better performance. This system changed my life." },
          { img: '/placeholder.svg', name: 'Mike VanDyke', role: 'Early Tester', quote: "I experienced rapid improvements in energy and cellular performance. It's a game-changer for anyone serious about health." },
          { img: '/placeholder.svg', name: 'Whitney Lopez', role: 'Early Tester & Controller', quote: "As a busy professional, the system gave me noticeable improvements in energy and focus—plus, I trust the science behind it." },
          { img: '/placeholder.svg', name: 'Jordan Sides', role: 'Early Tester & Research Participant', quote: "I wanted real results and evidence. This program delivered both—better wellness, sharper mind, and research I could be part of every step." },
          { img: '/placeholder.svg', name: 'Maryanne Van Dyke', role: 'Early Tester & Influencer', quote: "The Cellular Optimization System helped me level up my health and share authentic results with my audience—real energy, real confidence, every day." }].
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

                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Get Your System Now — Save $83 Today'}
                    </AnimatedCTA>
                </div>
            </section>

            {/* 10. Complete System Bundle */}
            <section className="b365-section" id="bundle">
                <p className="ucos-section-label">COMPLETE SYSTEM BUNDLE</p>
                <h2 className="b365-section-heading b365-serif">Ultimate Cellular Optimization <em>System</em></h2>
                <div className="ucos-bundle-card">
                    <div className="ucos-bundle-header">
                        <h3>🔥 LIMITED TIME: SAVE $83 TODAY ONLY</h3>
                        <p>Complete 24-Hour Cellular Optimization System</p>
                    </div>
                    <div className="ucos-bundle-body">
                        <div className="ucos-bundle-hero-img">
                            <img src="/images/product-ucos.png" alt="UCOS Complete Bundle" />
                        </div>
                        <div className="ucos-bundle-price-row">
                            <span className="old-price">$258</span>
                            <span className="new-price">$175</span>
                            <span className="save-badge">SAVE $83</span>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--b365-text-secondary)', marginBottom: 8 }}>That's 32% OFF Regular Price!</p>

                        <h4 style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: 'var(--b365-text)', marginBottom: 16 }}>What You Get:</h4>
                        <div className="ucos-bundle-products">
                            <div className="ucos-bundle-product">
                                <h4>Activate365</h4>
                                <div className="product-timing">MORNING — 30 MIN AFTER WAKING</div>
                                <ul>
                                    <li><Check size={12} />Spermidine 10mg</li>
                                    <li><Check size={12} />NAD+ 20mg</li>
                                    <li><Check size={12} />Boron 10mg</li>
                                    <li><Check size={12} />MODS Max™ Delivery</li>
                                </ul>
                            </div>
                            <div className="ucos-bundle-product">
                                <h4>Mito365</h4>
                                <div className="product-timing">MID-DAY — WITH LUNCH</div>
                                <ul>
                                    <li><Check size={12} />Methylene Blue 10mg</li>
                                    <li><Check size={12} />PQQ 20mg</li>
                                    <li><Check size={12} />NAD+ 150mg</li>
                                    <li><Check size={12} />GHK-Cu Peptide 10mg</li>
                                </ul>
                            </div>
                            <div className="ucos-bundle-product">
                                <h4>Restore365</h4>
                                <div className="product-timing">EVENING — 30-60 MIN BEFORE BED</div>
                                <ul>
                                    <li><Check size={12} />Boron 10mg</li>
                                    <li><Check size={12} />Melatonin 600mcg</li>
                                    <li><Check size={12} />GABA 50mg</li>
                                    <li><Check size={12} />MODS Max™ Sleep Matrix</li>
                                </ul>
                            </div>
                        </div>

                        <div className="ucos-bundle-trust">
                            <span><Truck size={16} /> Free Shipping</span>
                            <span><Package size={16} /> Discreet Packaging</span>
                            <span><ShieldCheck size={16} /> Satisfaction Guaranteed</span>
                            <span><Award size={16} /> CGMP Standards</span>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Order Complete 24-Hour System — Save $83'}
                    </AnimatedCTA>
                </div>
            </section>

            {/* 11. Scientific Comparison Table */}
            <section className="b365-section b365-section-alt" id="compare">
                <p className="ucos-section-label">🔬 SCIENTIFIC COMPARISON</p>
                <h2 className="b365-section-heading b365-serif">Best 365 Labs Ultimate System vs. <em>Individual Supplements</em></h2>
                <div className="tprime-table-wrap">
                    <table className="tprime-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th className="highlight-col">Best 365 Labs UCOS</th>
                                <th>Individual Supplements</th>
                                <th>No Treatment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Cellular Energy</td><td className="highlight-col positive">✅ 24-hour optimized cycle</td><td>⚠️ Inconsistent spikes</td><td className="negative">❌ Declining with age</td></tr>
                            <tr><td>Mitochondrial Function</td><td className="highlight-col positive">✅ Complete NAD+/PQQ optimization</td><td>⚠️ Partial improvement</td><td className="negative">❌ Progressive deterioration</td></tr>
                            <tr><td>Sleep Quality</td><td className="highlight-col positive">✅ Restore365 optimizes deep sleep</td><td>⚠️ May help but not coordinated</td><td className="negative">❌ Poor sleep persists</td></tr>
                            <tr><td>Longevity Support</td><td className="highlight-col positive">✅ Spermidine + NAD+ synergy</td><td>⚠️ Limited individual benefits</td><td className="negative">❌ Accelerated aging</td></tr>
                            <tr><td>Synergistic Effects</td><td className="highlight-col positive">✅ Precisely timed interactions</td><td className="negative">❌ No coordination or timing</td><td className="negative">❌ No synergistic benefits</td></tr>
                            <tr><td>Delivery System</td><td className="highlight-col positive">✅ MODS Max™ optimized absorption</td><td>⚠️ Standard formulations</td><td className="negative">❌ No delivery benefits</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 12. Gender-Specific Advantages */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Gender-Specific <em>Advantages</em></h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 40, fontSize: 15, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
                    Why This System Works for Everyone
                </p>
                <div className="ucos-gender-grid">
                    <div className="ucos-gender-card">
                        <div className="gender-icon">👩</div>
                        <h3>For Women</h3>
                        <ul>
                            <li><Check size={16} />Supports hormonal balance during menstrual cycles</li>
                            <li><Check size={16} />Helps maintain energy during pregnancy and postpartum</li>
                            <li><Check size={16} />Supports bone health and calcium absorption</li>
                            <li><Check size={16} />Aids in managing stress from multitasking demands</li>
                            <li><Check size={16} />Promotes healthy aging and skin vitality</li>
                        </ul>
                    </div>
                    <div className="ucos-gender-card">
                        <div className="gender-icon">👨</div>
                        <h3>For Men</h3>
                        <ul>
                            <li><Check size={16} />Supports testosterone production and vitality</li>
                            <li><Check size={16} />Enhances muscle recovery and performance</li>
                            <li><Check size={16} />Promotes cardiovascular health and circulation</li>
                            <li><Check size={16} />Helps maintain mental focus under work stress</li>
                            <li><Check size={16} />Supports healthy metabolic function</li>
                        </ul>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Get Complete System — Save $83 Today'}
                    </AnimatedCTA>
                    <p style={{ fontSize: 13, color: 'var(--b365-text-secondary)', marginTop: 12 }}>✅ Free Shipping • ✅ Made in USA</p>
                </div>
            </section>

            {/* 13. Final CTA */}
            <section className="b365-section">
                <div className="tprime-final-cta">
                    <h2>Get Your Complete System <em>Now!</em></h2>
                    <p className="subtitle text-primary-foreground">🔥 Transform Your Energy in 24 Hours — Ships Today!</p>
                    <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 24, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
                        Complete 24-hour cellular optimization system with precision-timed formulas for maximum results
                    </p>

                    <div className="ucos-order-summary">
                        <div className="order-row">
                            <span>Complete Cellular System</span>
                            <span>$175.00 <span className="old">$258</span></span>
                        </div>
                        <div className="order-row">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div className="order-row">
                            <span>Total</span>
                            <span>$175.00</span>
                        </div>
                    </div>

                    <AnimatedCTA href="#" className="btn-white-cta" onClick={handleOrderNow} disabled={isLoading}>
                        {isLoading ? 'Adding to Cart...' : 'Get the System →'}
                    </AnimatedCTA>
                    <div className="tprime-cta-trust-points">
                        <span><Check size={14} /> Satisfaction Guaranteed</span>
                        <span><Check size={14} /> FREE Fast Shipping</span>
                        <span><Check size={14} /> PayPal Secure Checkout</span>
                    </div>
                    <div className="tprime-cta-trust-strip">
                        <span><Lock size={14} /> SSL Encrypted</span>
                        <span><ShieldCheck size={14} /> PayPal Secure</span>
                        <span><Package size={14} /> FREE Shipping</span>
                    </div>
                </div>
            </section>

            {/* 14. FAQ */}
            <section className="b365-section b365-section-alt" id="faq">
                <p className="ucos-section-label">❓ Medical Questions</p>
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

            {/* 15. Safety Information */}
            <section className="b365-section">
                <div className="tprime-safety">
                    <h3>Important Safety Information</h3>
                    <p style={{ fontSize: 14, color: 'var(--b365-text-secondary)', marginBottom: 12 }}>
                        <strong>Methylene Blue Caution:</strong> Methylene Blue (in Mito365) should NOT be used by patients with glucose-6-phosphate dehydrogenase (G6PD) deficiency. It may also interact with psychiatric medications (MAOIs/SSRIs). Consult your healthcare provider before use.
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

export default UCOSPage;
