// @ts-nocheck
import React, { useState } from 'react';
import './GLP1Page.css';
import '../pages/HomePage.css';
import '../pages/TPrime365Page.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import { CartDrawer } from '../components/CartDrawer';
import { useCartStore } from '../stores/cartStore';
import { GLP1_VARIANT_ID } from '../lib/shopify';
import { Menu, Tag, ArrowRight, ClipboardList, Sunrise, Coffee, Utensils, ChevronRight, X, Check, Zap, Flame, Brain, Target, Footprints, Trophy, Dna, Recycle, AlertCircle, Lock, ShieldCheck, Package, Headphones, Dumbbell } from 'lucide-react';

// Minimal product shape for cart
const GLP1_PRODUCT = {
  node: {
    id: 'gid://shopify/Product/8542135132284',
    title: 'GLP-1 Optimization Protocol — Complete 30-Day System',
    description: 'Complete 30-Day GLP-1 optimization protocol with Triple Power Methylene Blue and Metabolism+.',
    handle: 'glp-1-optimization-protocol',
    priceRange: { minVariantPrice: { amount: '39.95', currencyCode: 'USD' } },
    images: { edges: [{ node: { url: '/placeholder.svg', altText: 'GLP-1 Optimization Protocol' } }] },
    variants: { edges: [{ node: { id: GLP1_VARIANT_ID, title: '30-Day Protocol', price: { amount: '39.95', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Size', value: '30-Day Protocol' }] } }] },
    options: [{ name: 'Size', values: ['30-Day Protocol'] }]
  }
};

const GLP1Page = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const mobileLinks = [
    { label: 'Protocol', href: '#protocol' },
    { label: 'Results', href: '#results' },
    { label: 'The Science', href: '#science' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleOrderNow = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    await addItem({
      product: GLP1_PRODUCT,
      variantId: GLP1_VARIANT_ID,
      variantTitle: '30-Day Protocol',
      price: { amount: '39.95', currencyCode: 'USD' },
      quantity: 1,
      selectedOptions: [{ name: 'Size', value: '30-Day Protocol' }]
    });
  };

  const faqItems = [
  {
    question: "Is this safe to take with GLP-1 medications?",
    answer: "Yes. Triple Power Methylene Blue and Metabolism+ are dietary supplements designed to complement GLP-1 therapy. They work alongside your medication by supporting the mitochondrial systems that GLP-1 doesn't address. Always inform your prescribing physician of all supplements you're taking."
  },
  {
    question: "When should I start this protocol?",
    answer: "Ideally, start from Day 1 of your GLP-1 therapy. The first 30 days set the metabolic pattern for your entire weight loss journey. However, starting at any point during GLP-1 therapy will still provide significant benefits."
  },
  {
    question: "What's included in the protocol?",
    answer: "You receive Triple Power Methylene Blue (30-day sublingual supply with USP Methylene Blue 150mg, NAD+ 600mg, and Spermidine 300mg), Metabolism+ tablets (60 tablets for 30 days), a complete Protocol Guide with timing and meal suggestions, and FREE shipping."
  },
  {
    question: "How quickly will I notice results?",
    answer: "Most users report improved energy within 3-5 days. Mental clarity improvements are typically noticed within the first week. Measurable differences in body composition and metabolic markers are usually apparent within 2-4 weeks of consistent use."
  },
  {
    question: "What if I stop taking GLP-1?",
    answer: "This protocol is especially valuable when transitioning off GLP-1. By supporting your mitochondria and metabolism throughout your GLP-1 journey, you're building the metabolic foundation needed to maintain your weight loss long-term — addressing the #1 problem with GLP-1 therapy."
  },
  {
    question: "How is this shipped?",
    answer: "Orders ship within 24-48 hours via USPS Priority Mail. You'll receive tracking information via email. All packages arrive in discreet packaging. Shipping is always FREE."
  },
  {
    question: "Is there a subscription?",
    answer: "This is a one-time purchase of a 30-day protocol. No subscriptions, no auto-renewals, no hidden charges. Reorder when you're ready."
  },
  {
    question: "Do I need a prescription?",
    answer: "No. Triple Power and Metabolism+ are dietary supplements and do not require a prescription. They are manufactured in an FDA-registered facility with third-party testing for purity and potency."
  }];


  return (
    <div className="glp1-page">
            <MobileMenu links={mobileLinks} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* 1. Promo Banner */}
            {showBanner &&
      <div className="b365-promo-banner">
                    🔥 SPECIAL LAUNCH OFFER: Complete 30-Day Protocol — Save $50 + FREE Shipping
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
                        <li><a href="#protocol">Protocol</a></li>
                        <li><a href="#results">Results</a></li>
                        <li><a href="#science">The Science</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                    <div className="b365-nav-right">
                        <CartDrawer />
                        <AnimatedCTA href="#" small onClick={handleOrderNow} disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Order Now'}
                        </AnimatedCTA>
                    </div>
                </div>
            </nav>

            {/* 3. Hero Section */}
            <section className={`glp1-hero-section ${!showBanner ? 'no-banner' : ''}`}>
                <div className="tprime-hero-container">
                    <div className="tprime-hero-img">
                        <img src="/images/glp1-hero.png" alt="GLP-1 Optimization Protocol — Triple Power Methylene Blue and Metabolism+ product bundle" />
                    </div>
                    <div className="tprime-hero-text">
                        <div className="glp1-save-badge text-primary">
                            <Tag size={14} />
                            Save $50 + FREE Shipping
                        </div>
                        <h1>Transform Your Weight Loss Journey with <em>Cellular-Level Support</em></h1>
                        <p className="subhead">
                            The complete mitochondrial protocol designed to protect your muscle, preserve your metabolism, and maximize your GLP-1 results.
                        </p>
                        <div className="glp1-price-row">
                            <span className="price-big">$39.95</span>
                            <span className="price-strike">$90.00</span>
                        </div>
                        <p className="guarantee-text text-primary">Complete 30-Day Protocol + FREE Shipping</p>
                        <a href="/glp1-intake" className="glp1-intake-link">
                            <ClipboardList size={16} />
                            Start GLP-1 Intake Form →
                        </a>
                        <AnimatedCTA href="#" onClick={handleOrderNow} disabled={isLoading}>
                            {isLoading ? 'Adding to Cart...' : 'Order Now — $39.95'}
                            <ArrowRight size={16} />
                        </AnimatedCTA>
                    </div>
                </div>
            </section>

            {/* 4. The Hidden Crisis */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">The Hidden Crisis of <em>GLP-1 Therapy</em></h2>
                <p className="glp1-crisis-intro">You're losing weight... but at what cost?</p>
                <div className="b365-table-wrap">
                    <table className="b365-table">
                        <thead>
                            <tr>
                                <th>The Problem</th>
                                <th>What You Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="feature-col">40% of weight lost is MUSCLE</td><td className="negative">Saggy skin, weakness, slower metabolism</td></tr>
                            <tr><td className="feature-col">Metabolic slowdown up to 25%</td><td className="negative">Extreme fatigue, can't function normally</td></tr>
                            <tr><td className="feature-col">Energy crashes</td><td className="negative">Brain fog, unable to exercise or work</td></tr>
                            <tr><td className="feature-col">85% regain weight after stopping</td><td className="negative">All that effort... wasted</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="glp1-callout-card">
                    <h4>Are You Losing FAT or Destroying Your METABOLISM?</h4>
                    <p>Your mitochondria — the cellular powerhouses — determine whether you burn fat for fuel or cannibalize your own muscle tissue. Without mitochondrial support, GLP-1 is like putting regular gas in a Ferrari. It'll run... but not the way it should.</p>
                </div>
            </section>

            {/* 5. Complete Daily Protocol */}
            <section className="b365-section b365-section-alt" id="protocol">
                <h2 className="b365-section-heading b365-serif">Your Complete <em>Daily Protocol</em></h2>
                <div className="glp1-protocol-grid">
                    {[
          {
            Icon: Sunrise, timing: 'Upon Waking', title: 'Morning Activation',
            product: '1 mL Triple Power Methylene Blue',
            image: '/images/triple-power-methylene-blue.png',
            items: ['Activates AMPK (fat burning), Sirtuins (cellular repair), and Autophagy (cellular cleanup)', 'Contains USP Methylene Blue, NAD+, Spermidine, Vitamin C, and MODS Max™']
          },
          {
            Icon: Coffee, timing: 'With Breakfast', title: 'Metabolic Ignition',
            product: '2 Tablets Metabolism+',
            image: '/images/metabolism-plus.png',
            items: ['Ignites metabolism with USP Methylene Blue, L-Theanine, Caffeine, Guarana, and Green Tea', 'Enhances energy production and fat oxidation']
          },
          {
            Icon: Utensils, timing: 'With Lunch', title: 'Sustained Activation',
            product: '2 Tablets Metabolism+',
            image: '/images/metabolism-plus.png',
            items: ['Sustains metabolic activation throughout eating window', 'Maintains energy levels and supports lean muscle preservation']
          }].
          map((card, i) =>
          <div className="glp1-protocol-card" key={i}>
                            <div className="protocol-card-header">
                                <img src={card.image} alt={card.product} className="protocol-product-img" />
                            </div>
                            <div className="protocol-icon-badge">
                                <card.Icon size={18} />
                                <span>{card.timing}</span>
                            </div>
                            <h3>{card.title}</h3>
                            <p className="product-name">{card.product}</p>
                            <ul>
                                {card.items.map((item, j) =>
              <li key={j}>
                                        <ChevronRight size={14} />
                                        {item}
                                    </li>
              )}
                            </ul>
                        </div>
          )}
                </div>
            </section>

            {/* 6. Lifestyle Optimization */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Lifestyle Optimization <em>Formula</em></h2>
                <div className="glp1-lifestyle-layout">
                    <div className="glp1-lifestyle-image">
                        <img src="/images/glp1-lifestyle-hero.png" alt="Active woman representing lifestyle optimization" />
                    </div>
                    <div className="tprime-pillars-grid">
                        {[
              { name: '9-Hour Eating Window', dose: '↓1.5% HbA1c' },
              { name: '2 Meals + 1 Snack', dose: 'Max Absorption' },
              { name: '7 Hours Sleep', dose: 'NAD+ Recycling' },
              { name: '8,000 Steps Daily', dose: '300-400 cal' }].
              map((p, i) =>
              <div className="tprime-pillar" key={i}>
                                <span className="pillar-name">{p.name}</span>
                                <span className="pillar-dose">{p.dose}</span>
                            </div>
              )}
                    </div>
                </div>
            </section>

            {/* 7. Clinical Results */}
            <section className="b365-section b365-section-alt" id="results">
                <h2 className="b365-section-heading b365-serif">Clinical <em>Results</em></h2>
                <div className="b365-stats-grid glp1-clinical-grid">
                    {[
          { label: 'Mitochondrial Density', value: '22-30%', desc: 'Increased mitochondrial density with protocol support' },
          { label: 'ATP Production', value: '+38%', desc: 'Boost in cellular energy production' },
          { label: 'Lean Mass Preserved', value: '72%', desc: 'More lean mass preserved vs GLP-1 alone' },
          { label: 'Leptin Resistance', value: '-42%', desc: 'Reduction in leptin resistance for better appetite control' },
          { label: '6-Month Fat Loss', value: '28.2 lbs', desc: 'Average fat loss over 6 months with protocol' },
          { label: 'Muscle Retained', value: '+3.1 lbs', desc: 'Additional muscle retained vs standard GLP-1 therapy' }].
          map((s, i) =>
          <div className="b365-stat-card" key={i}>
                            <div className="stat-label">{s.label}</div>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-desc">{s.desc}</div>
                        </div>
          )}
                </div>
            </section>

            {/* 8. The Transformation */}
            <section className="b365-section glp1-transformation-section">
                <h2 className="b365-section-heading b365-serif">The Transformation <em>You'll Experience</em></h2>
                <div className="tprime-delivery-grid">
                    <div className="tprime-delivery-card">
                        <h3>Without This Protocol</h3>
                        <ul>
                            {[
              'Losing muscle + fat together',
              'Exhausted, can\'t function',
              'Slow, frustrating fat loss',
              'Brain fog, poor focus',
              'Constant hunger, cravings',
              'Weight regain after stopping'].
              map((item, i) =>
              <li key={i}>
                                    <X size={16} className="icon-x" />
                                    {item}
                                </li>
              )}
                        </ul>
                    </div>
                    <div className="tprime-delivery-card highlight">
                        <h3>WITH This Protocol</h3>
                        <ul>
                            {[
              '72% MORE muscle preserved',
              '38% energy boost — feel ALIVE',
              'FASTER fat burning, visible results',
              'Crystal-clear mental sharpness',
              '42% better appetite control',
              'KEEP your results long-term'].
              map((item, i) =>
              <li key={i}>
                                    <Check size={16} className="icon-check" />
                                    {item}
                                </li>
              )}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 9. Six Powerful Benefits */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">Six Powerful Benefits You'll Feel <em>Within Days</em></h2>
                <div className="tprime-benefits-grid">
                    {[
          { Icon: Zap, title: 'Wake Up with ACTUAL Energy', desc: 'Real, cellular ATP production that lasts all day. 38% increase means you can finally exercise, work, and live your life during weight loss.' },
          { Icon: Flame, title: 'Burn Fat, Not Muscle', desc: '72% more lean tissue retention means you lose fat from your belly, hips, and thighs — NOT from your arms, legs, and butt.' },
          { Icon: Brain, title: 'Think Clearly Again', desc: 'Methylene Blue crosses into your brain, powering neurons and eliminating the fog that makes GLP-1 feel like functioning at 50%.' },
          { Icon: Target, title: 'Stop Fighting Hunger', desc: '42% reduction in leptin resistance means your body FINALLY responds to fullness signals. No more white-knuckling through cravings.' },
          { Icon: Footprints, title: 'Actually WANT to Move', desc: 'When your mitochondria work properly, exercise stops feeling like torture. Suddenly you have the energy for those 8,000 steps.' },
          { Icon: Trophy, title: 'Keep Your Results FOREVER', desc: 'Metabolic optimization means when you finish GLP-1, your metabolism doesn\'t crash. You maintain your weight loss long-term.' }].
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

            {/* 10. Three Longevity Pathways */}
            <section className="b365-section" id="science">
                <h2 className="b365-section-heading b365-serif">Three Longevity Pathways <em>Working Together</em></h2>
                <div className="tprime-ingredient-grid">
                    {[
          {
            Icon: Zap, title: 'AMPK Activation', subtitle: 'The Metabolic Master Switch',
            sections: [
            { heading: 'What It Does:', items: ['Increases fat burning and improves insulin sensitivity', 'Methylene Blue enhances mitochondrial electron flow and ATP output', 'Complements GLP-1\'s metabolic effects for superior fat oxidation'] }]
          },
          {
            Icon: Dna, title: 'Sirtuin Support', subtitle: 'Longevity & Repair Enzymes',
            sections: [
            { heading: 'What It Does:', items: ['NAD+ fuels enzymes that control DNA repair, inflammation, and mitochondrial health', 'Enhances tissue repair, resilience, and recovery during weight loss', 'Maintains cellular function even under caloric restriction'] }]
          },
          {
            Icon: Recycle, title: 'Autophagy Balance', subtitle: 'Cellular Cleanup',
            sections: [
            { heading: 'What It Does:', items: ['Spermidine induces cellular cleanup and protein quality control', 'Removes damaged mitochondria and proteins', 'Creates space for healthy, functional tissue regeneration'] }]
          }].
          map((card, i) =>
          <div className="tprime-ingredient-card" key={i}>
                            <div className="icon-wrap">
                                <card.Icon size={22} />
                            </div>
                            <h3>{card.title}</h3>
                            <p className="ingredient-subtitle">{card.subtitle}</p>
                            {card.sections.map((sec, j) =>
            <div key={j}>
                                    <h4>{sec.heading}</h4>
                                    <ul>
                                        {sec.items.map((item, k) =>
                <li key={k}>
                                                <ChevronRight size={14} />
                                                {item}
                                            </li>
                )}
                                    </ul>
                                </div>
            )}
                        </div>
          )}
                </div>
                {/* PLACEHOLDER IMAGE — Needs: Visual diagram showing AMPK + Sirtuin + Autophagy pathways working together */}
            </section>

            {/* 11. Value Stack */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">Your Complete GLP-1 <em>Success Package</em></h2>
                <div className="tprime-value-card">
                    <h3>Everything You Need for 30 Days of Transformation</h3>
                    <div className="tprime-value-item"><span className="name">Triple Power Methylene Blue (30-day supply)</span><span className="price">USP MB 150mg + NAD+ 600mg + Spermidine 300mg</span></div>
                    <div className="tprime-value-item"><span className="name">Metabolism+ Tablets (60 tablets)</span><span className="price">Morning & lunch metabolic activation</span></div>
                    <div className="tprime-value-item special"><span className="name">FREE Shipping</span><span className="price">$12 value</span></div>
                    <div className="tprime-value-item special"><span className="name">Complete Protocol Guide</span><span className="price">$29 value</span></div>
                    <div className="tprime-value-total">
                        <div className="row"><span>TOTAL VALUE:</span><span>$131.00</span></div>
                        <div className="row text-primary-foreground"><span>YOUR PRICE:</span><span className="highlight-price">$39.95</span></div>
                        <div className="row"><span>YOU SAVE:</span><span>$91.05 (70% OFF)</span></div>
                    </div>
                </div>
            </section>

            {/* 12. Price Perspective */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Let's Put This <em>In Perspective</em></h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 32, fontSize: 15 }}>At $1.33 per day, this costs LESS than:</p>
                <div className="glp1-perspective-grid">
                    {[
          { Icon: Coffee, label: '2 trips to Starbucks per week' },
          { Icon: Target, label: 'Your monthly GLP-1 copay' },
          { Icon: Dumbbell, label: 'A single personal training session' },
          { Icon: Package, label: 'One month of a basic multivitamin' }].
          map((item, i) =>
          <div className="glp1-perspective-card" key={i}>
                            <div className="icon-wrap">
                                <item.Icon size={18} />
                            </div>
                            <span>{item.label}</span>
                        </div>
          )}
                </div>
                <div className="glp1-perspective-outcome">
                    <h4>But it could be the difference between:</h4>
                    <ul>
                        <li><Check size={16} />Losing 28 lbs of FAT (keeping muscle) vs. losing fat + muscle ("skinny fat")</li>
                        <li><Check size={16} />Having energy to live your life vs. being exhausted for months</li>
                        <li><Check size={16} />Keeping your results forever vs. regaining everything within a year</li>
                    </ul>
                    <p className="glp1-daily-cost">$1.33/day — The cheapest insurance policy for your GLP-1 investment.</p>
                </div>
            </section>

            {/* 13. What's Happening Inside Your Cells */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">What's Really Happening <em>Inside Your Cells</em></h2>
                <div className="glp1-timeline-grid">
                    {[
          { stage: 'Week 1-2', title: 'Appetite Drops', desc: 'You eat less, weight starts falling. But your mitochondria struggle to produce energy with fewer calories.' },
          { stage: 'Week 3-8', title: 'Crisis Point', desc: 'Your body needs energy but isn\'t getting enough food. It starts breaking down MUSCLE because that\'s easier than burning fat.' },
          { stage: 'Week 8+', title: 'Starvation Mode', desc: 'Metabolism slows down. You\'re losing weight but feeling worse. Your body hoards every calorie.' },
          { stage: 'After Stopping', title: 'The Regain', desc: 'With damaged mitochondria and slower metabolism, weight floods back. You\'re now WORSE off than before.' }].
          map((s, i) =>
          <div className="glp1-timeline-card" key={i}>
                            <span className="stage-badge">{s.stage}</span>
                            <h4>{s.title}</h4>
                            <p>{s.desc}</p>
                        </div>
          )}
                </div>
                <div className="glp1-solution-callout">
                    <h4>Triple Power + Metabolism+ Changes EVERYTHING</h4>
                    <ul>
                        <li><Check size={16} />Protects your cellular engines from GLP-1 stress</li>
                        <li><Check size={16} />Forces fat burning instead of muscle breakdown</li>
                        <li><Check size={16} />Maintains energy production even with fewer calories</li>
                        <li><Check size={16} />Prevents metabolic slowdown so results last forever</li>
                    </ul>
                    <p className="bottom-line">This turns GLP-1 from a temporary weight loss drug into a permanent body transformation.</p>
                </div>
            </section>

            {/* 14. Final CTA */}
            <section className="b365-section">
                <div className="tprime-final-cta">
                    <h2>Start Your GLP-1 <em>Optimization Today</em></h2>
                    <p className="subtitle text-primary-foreground">Every day on GLP-1 without mitochondrial support is another day of muscle loss and metabolic stress.</p>
                    <div className="tprime-final-price-box">
                        <span className="big-price">$39.95</span>
                        <span className="note">Complete 30-Day Protocol — Total Value: $131.00</span>
                        <span className="guarantee-text">Save $91.05 (70% OFF) + FREE Shipping</span>
                    </div>
                    <AnimatedCTA href="#" className="btn-white-cta" onClick={handleOrderNow} disabled={isLoading}>
                        {isLoading ? 'Adding to Cart...' : 'Order Now — $39.95'}
                        <ArrowRight size={16} />
                    </AnimatedCTA>
                    <div className="tprime-cta-trust-points">
                        <span><Check size={14} /> No prescription required</span>
                        <span><Check size={14} /> Ships within 24-48 hours</span>
                        <span><Check size={14} /> FDA-registered facility</span>
                        <span><Check size={14} /> FREE shipping — discreet packaging</span>
                        <span><Check size={14} /> Third-party tested for purity</span>
                    </div>
                    <div className="tprime-cta-trust-strip">
                        <span><Lock size={14} /> Secure Checkout</span>
                        <span><ShieldCheck size={14} /> Quality Guaranteed</span>
                        <span><Package size={14} /> Fast Shipping</span>
                    </div>
                </div>
            </section>

            {/* 15. FAQ */}
            <section className="b365-section b365-section-alt" id="faq">
                <div className="b365-faq-layout">
                    <div className="b365-faq-left">
                        <h2>Your questions, <em>answered.</em></h2>
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
                    <h3>Important Safety Information</h3>
                    <ul>
                        {[
            'These statements have not been evaluated by the Food and Drug Administration',
            'This product is not intended to diagnose, treat, cure, or prevent any disease',
            'Methylene Blue may interact with MAO inhibitors, SSRIs, and other psychiatric medications',
            'Consult with a healthcare professional before use, especially if pregnant, nursing, or have a medical condition',
            'Always inform your healthcare provider of all supplements you are taking'].
            map((item, i) =>
            <li key={i}>
                                <AlertCircle size={14} />
                                {item}
                            </li>
            )}
                    </ul>
                    <p className="report">Questions? Call us: (385) 421-5651</p>
                    <p className="disclaimer">
                        *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Methylene Blue should NOT be used by patients with glucose-6-phosphate dehydrogenase (G6PD) deficiency.
                    </p>
                </div>
            </section>

            {/* 17. Footer */}
            <SharedFooter />
        </div>);

};

export default GLP1Page;
