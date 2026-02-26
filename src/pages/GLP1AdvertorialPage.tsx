import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { GLP1_VARIANT_ID } from '@/lib/shopify';
import './GLP1AdvertorialPage.css';
import '../pages/TPrimeAdvertorialPage.css';

const GLP1_VARIANT = {
  variantId: 'gid://shopify/ProductVariant/46539809235068',
  variantTitle: 'Default',
  price: { amount: '39.95', currencyCode: 'USD' },
  quantity: 1,
  selectedOptions: [{ name: 'Title', value: 'Default' }],
  product: {
    node: {
      id: 'gid://shopify/Product/8542135132284',
      title: 'GLP-1 Optimization Protocol',
      description: '',
      handle: 'glp-1-optimization-protocol',
      priceRange: { minVariantPrice: { amount: '39.95', currencyCode: 'USD' } },
      images: { edges: [] },
      variants: { edges: [] },
      options: [],
    },
  },
};

const faqs = [
  {
    q: "Is this safe to take with GLP-1 medications?",
    a: "Yes. The GLP-1 Optimization Protocol is designed to complement GLP-1 medications like Ozempic, Wegovy, and Mounjaro. The ingredients support metabolic pathways that GLP-1 medications don't address."
  },
  {
    q: "When should I start this protocol?",
    a: "Ideally, start as soon as you begin GLP-1 therapy. The sooner you support your cellular metabolism and muscle preservation, the better your long-term outcomes."
  },
  {
    q: "What's included in the box?",
    a: "You receive a 30-day supply of Triple Power Methylene Blue (sublingual liquid) and a 60-count bottle of Metabolism+ tablets — everything you need for the full protocol."
  },
  {
    q: "How quickly will I notice results?",
    a: "Most users report noticeable energy improvements within 3-5 days. Body composition benefits typically become apparent within 2-4 weeks of consistent use."
  },
  {
    q: "What if I stop taking GLP-1 medications?",
    a: "The protocol is especially valuable during the transition off GLP-1 therapy. It helps maintain your metabolic rate and preserve the lean mass you've built, reducing the risk of weight regain."
  },
  {
    q: "How is this shipped?",
    a: "Orders ship via USPS Priority Mail from our FDA-registered facility. Most orders arrive within 5-7 business days. Shipping is always free."
  },
  {
    q: "Is there a subscription?",
    a: "No. This is a one-time purchase. No auto-renewals, no recurring charges. Reorder when you're ready."
  },
  {
    q: "Do I need a prescription?",
    a: "No prescription required. The GLP-1 Optimization Protocol contains dietary supplement ingredients and is available for direct purchase."
  }
];

const GLP1AdvertorialPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const isLoading = useCartStore((s) => s.isLoading);

  const handleBuyNow = async () => {
    await addItem(GLP1_VARIANT);
    // Small delay to allow cart creation to complete
    await new Promise(r => setTimeout(r, 300));
    const url = useCartStore.getState().checkoutUrl;
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="adv-page" style={{ paddingBottom: '72px' }}>
      {/* ─── 1. Headline ─── */}
      <section className="adv-headline-section">
        <div className="adv-container">
          <span className="adv-category-tag">GLP-1 Research</span>
          <h1 className="adv-main-headline">
            You're Losing Weight on Ozempic. But Are You Losing the Wrong Kind?
          </h1>
          <p className="adv-subheadline">
            A $39.95 daily protocol is helping GLP-1 users protect their muscle, keep their energy, and actually maintain their results long-term.
          </p>
          <div className="adv-byline">
            <span>Health &amp; Wellness Desk</span>
            <span className="adv-byline-dot" />
            <span>Updated February 2026</span>
            <span className="adv-byline-dot" />
            <span>7 min read</span>
          </div>
        </div>
      </section>

      {/* ─── Social Proof Strip ─── */}
      <div className="adv-proof-strip adv-container-wide">
        <span className="adv-proof-item">
          <iconify-icon icon="mdi:account-group" />
          50,000+ clients served
        </span>
        <span className="adv-proof-divider" />
        <span className="adv-proof-item">
          <iconify-icon icon="mdi:shield-check" />
          FDA-registered facility
        </span>
        <span className="adv-proof-divider" />
        <span className="adv-proof-item">
          <iconify-icon icon="mdi:prescription" />
          No prescription required
        </span>
        <span className="adv-proof-divider" />
        <span className="adv-proof-item">
          <iconify-icon icon="mdi:truck-fast" />
          Free shipping
        </span>
      </div>

      {/* ─── 2. Opening Editorial ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <p className="adv-drop-cap">
            Let's start with the truth: GLP-1 medications work. Ozempic, Wegovy, Mounjaro, Zepbound — they represent a genuine breakthrough in weight management. Millions of people are losing significant weight, often for the first time in their lives.
          </p>
          <p>
            But there's a conversation happening behind the scenes that most patients aren't hearing. A conversation between endocrinologists, sports medicine physicians, and metabolic researchers who are watching something unfold that <strong>doesn't show up on the bathroom scale.</strong>
          </p>

          <div className="adv-stat-highlight">
            <p>Up to 40% of the weight you're losing on GLP-1 medications isn't fat. It's muscle.</p>
          </div>

          <p>
            That's not a fringe claim. It's data from <strong>clinical trials and peer-reviewed research.</strong> And it has enormous implications for what happens next — not just while you're on the medication, but after you stop.
          </p>
        </div>
      </section>

      {/* ─── 3. The Number on the Scale ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading">The Number on the Scale Isn't Telling You the Full Story</h2>
          <p>
            Here's the problem with losing muscle: <strong>muscle is your metabolic engine.</strong> Every pound of lean tissue you carry burns calories around the clock — even while you sleep. Lose it, and your resting metabolic rate drops. Some studies show a decline of <strong>up to 25%.</strong>
          </p>
          <p>
            This creates a devastating cycle. You lose weight — but a significant portion is muscle. Your metabolism slows. The medication suppresses your appetite, masking the damage. And then, when you eventually stop the medication...
          </p>
          <p>
            <strong>85% of people who discontinue GLP-1 therapy regain most of the weight.</strong> Not because they lack willpower. But because their metabolic foundation has been eroded.
          </p>

          <div className="adv-pullquote">
            <p>"You're set up for the worst possible outcome: rapid weight regain with a slower metabolism and less muscle than you started with."</p>
          </div>

          <p>
            This isn't a reason to stop taking your medication. <strong>It's a reason to protect yourself while you're on it.</strong>
          </p>
        </div>
      </section>

      {/* ─── Mid-page CTA ─── */}
      <div className="adv-container">
        <div className="adv-inline-cta">
          <p>Protect your muscle while maximizing your GLP-1 results.</p>
          <button onClick={handleBuyNow} disabled={isLoading} className="adv-cta-btn">
            {isLoading ? 'Processing...' : 'Get the Protocol — $39.95'}
            <iconify-icon icon="mdi:arrow-right" />
          </button>
        </div>
      </div>

      {/* ─── 4. Burn Fat and Keep Your Muscle ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading">What If You Could Burn Fat and Keep Your Muscle?</h2>
          <p>
            The GLP-1 Optimization Protocol was built around one premise: <strong>the medication handles appetite and fat loss — you need something that handles everything else.</strong>
          </p>
          <p>
            This protocol targets three cellular pathways that GLP-1 medications don't address — pathways that determine whether you lose fat <em>and</em> keep your muscle, or lose both.
          </p>
        </div>

        <div className="adv-container-wide">
          <div className="adv-pathway-grid">
            <div className="adv-pathway-card">
              <div className="adv-pathway-icon">
                <iconify-icon icon="mdi:lightning-bolt" />
              </div>
              <span className="adv-pathway-name">AMPK Activation</span>
              <span className="adv-pathway-subtitle">Metabolic Master Switch</span>
              <p className="adv-pathway-desc">Increases fat oxidation and improves insulin sensitivity — telling your body to burn fat for fuel instead of breaking down muscle.</p>
            </div>
            <div className="adv-pathway-card">
              <div className="adv-pathway-icon">
                <iconify-icon icon="mdi:dna" />
              </div>
              <span className="adv-pathway-name">Sirtuin Support</span>
              <span className="adv-pathway-subtitle">Longevity &amp; Repair Enzymes</span>
              <p className="adv-pathway-desc">NAD+ powers the sirtuins — enzymes responsible for DNA repair, inflammation control, and metabolic regulation at the cellular level.</p>
            </div>
            <div className="adv-pathway-card">
              <div className="adv-pathway-icon">
                <iconify-icon icon="mdi:recycle" />
              </div>
              <span className="adv-pathway-name">Autophagy Balance</span>
              <span className="adv-pathway-subtitle">Cellular Cleanup</span>
              <p className="adv-pathway-desc">Spermidine triggers recycling of damaged proteins and organelles — protecting muscle tissue while clearing cellular waste.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. What's in the Protocol ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading">What's in the Protocol</h2>
        </div>

        <div className="adv-container-wide">
          <div className="adv-product-grid">
            <div className="adv-product-card">
              <span className="adv-product-tag">Sublingual</span>
              <h3 className="adv-product-name">Triple Power Methylene Blue</h3>
              <p className="adv-product-form">1mL sublingual liquid — taken upon waking</p>
              <ul className="adv-product-ingredients">
                <li><iconify-icon icon="mdi:circle-small" /> USP Methylene Blue — 150mg</li>
                <li><iconify-icon icon="mdi:circle-small" /> NAD+ — 600mg</li>
                <li><iconify-icon icon="mdi:circle-small" /> Spermidine — 300mg</li>
              </ul>
              <p className="adv-product-usage">"Fires up your mitochondria first thing in the morning."</p>
            </div>
            <div className="adv-product-card">
              <span className="adv-product-tag">Tablets</span>
              <h3 className="adv-product-name">Metabolism+</h3>
              <p className="adv-product-form">2 tablets with breakfast, 2 with lunch</p>
              <ul className="adv-product-ingredients">
                <li><iconify-icon icon="mdi:circle-small" /> USP Methylene Blue</li>
                <li><iconify-icon icon="mdi:circle-small" /> L-Theanine</li>
                <li><iconify-icon icon="mdi:circle-small" /> Caffeine</li>
                <li><iconify-icon icon="mdi:circle-small" /> Guarana</li>
                <li><iconify-icon icon="mdi:circle-small" /> Green Tea Extract</li>
              </ul>
              <p className="adv-product-usage">"Keeps your metabolic engine running all day."</p>
            </div>
          </div>

          <div className="adv-schedule-strip">
            <div className="adv-schedule-item">
              <span className="adv-schedule-time">Upon Waking</span>
              <span className="adv-schedule-action">1mL Triple Power</span>
              <span className="adv-schedule-detail">Hold under tongue 60 seconds</span>
            </div>
            <div className="adv-schedule-item">
              <span className="adv-schedule-time">With Breakfast</span>
              <span className="adv-schedule-action">2 Metabolism+ Tablets</span>
              <span className="adv-schedule-detail">Take with food</span>
            </div>
            <div className="adv-schedule-item">
              <span className="adv-schedule-time">With Lunch</span>
              <span className="adv-schedule-action">2 Metabolism+ Tablets</span>
              <span className="adv-schedule-detail">Take with food</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Clinical Results ─── */}
      <section className="adv-editorial">
        <div className="adv-container-wide">
          <h2 className="adv-section-heading" style={{ textAlign: 'center' }}>The Results Speak for Themselves</h2>
          <div className="adv-stat-grid">
            <div className="adv-stat-card">
              <span className="adv-stat-number">72%</span>
              <span className="adv-stat-label">More lean mass retained vs GLP-1 alone</span>
            </div>
            <div className="adv-stat-card">
              <span className="adv-stat-number">38%</span>
              <span className="adv-stat-label">Increase in ATP production</span>
            </div>
            <div className="adv-stat-card">
              <span className="adv-stat-number">22-30%</span>
              <span className="adv-stat-label">Increase in mitochondrial density</span>
            </div>
            <div className="adv-stat-card">
              <span className="adv-stat-number">42%</span>
              <span className="adv-stat-label">Reduction in leptin resistance</span>
            </div>
            <div className="adv-stat-card">
              <span className="adv-stat-number">28.2 lbs</span>
              <span className="adv-stat-label">Average fat loss over 6 months</span>
            </div>
            <div className="adv-stat-card">
              <span className="adv-stat-number">3.1 lbs</span>
              <span className="adv-stat-label">More muscle retained vs standard GLP-1</span>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: 'var(--text-caption)', color: 'var(--b365-gray-400)', marginTop: 'var(--space-4)' }}>
            Based on company-reported data from protocol users.
          </p>
        </div>
      </section>

      {/* ─── 7. What People Are Feeling ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading">What People Are Actually Feeling</h2>
          <div className="adv-timeline">
            <div className="adv-timeline-item">
              <div className="adv-timeline-dot" />
              <span className="adv-timeline-period">Days 3–5</span>
              <h3 className="adv-timeline-title">Energy Increase</h3>
              <p className="adv-timeline-desc">Noticeable, sustained energy — not jittery, not caffeine-crash energy. Users report a "clean" alertness that lasts through the afternoon.</p>
            </div>
            <div className="adv-timeline-item">
              <div className="adv-timeline-dot" />
              <span className="adv-timeline-period">Week 1</span>
              <h3 className="adv-timeline-title">Mental Clarity</h3>
              <p className="adv-timeline-desc">The brain fog that often accompanies GLP-1 medications begins to lift. Focus sharpens. Cognitive endurance improves.</p>
            </div>
            <div className="adv-timeline-item">
              <div className="adv-timeline-dot" />
              <span className="adv-timeline-period">Weeks 2–4</span>
              <h3 className="adv-timeline-title">Body Composition Shifts</h3>
              <p className="adv-timeline-desc">More muscle preserved, more fat lost. The scale may move slower, but the mirror tells a different story. Clothes fit better. Strength holds.</p>
            </div>
            <div className="adv-timeline-item">
              <div className="adv-timeline-dot" />
              <span className="adv-timeline-period">Long-Term</span>
              <h3 className="adv-timeline-title">Metabolic Foundation</h3>
              <p className="adv-timeline-desc">When tapering off GLP-1, no metabolic deficit. The foundation is built — lean mass preserved, metabolism intact, ready for maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. The Bottom Line ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading">The Bottom Line</h2>
          <p>
            GLP-1 medications are powerful. They work. But they weren't designed to protect your muscle, support your metabolism, or build the foundation you'll need when you eventually stop taking them.
          </p>
          <p>
            <strong>That's what this protocol was built for.</strong>
          </p>
          <p>
            The question isn't whether GLP-1 medications help you lose weight. The question is <strong>whether you'll be able to keep it off.</strong>
          </p>
        </div>
      </section>

      {/* ─── Mid-page CTA 2 ─── */}
      <div className="adv-container">
        <div className="adv-inline-cta">
          <p>Build the foundation your GLP-1 medication can't provide on its own.</p>
          <button onClick={handleBuyNow} disabled={isLoading} className="adv-cta-btn">
            {isLoading ? 'Processing...' : 'Get the Protocol — $39.95 + Free Shipping'}
            <iconify-icon icon="mdi:arrow-right" />
          </button>
        </div>
      </div>

      {/* ─── 9. Value Stack + Pricing ─── */}
      <section className="adv-pricing-section">
        <div className="adv-container">
          <div className="adv-pricing-card">
            <div className="adv-pricing-header">
              <h3>GLP-1 Optimization Protocol</h3>
            </div>
            <div className="adv-pricing-body">
              <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                <span className="adv-launch-badge">
                  <iconify-icon icon="mdi:star-four-points" /> Launch Pricing — Limited Introductory Offer
                </span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">Triple Power Methylene Blue (30-day)</span>
                <span className="value">Included</span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">Metabolism+ Tablets (60 count)</span>
                <span className="value">Included</span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">Free Shipping</span>
                <span className="value">$12 value</span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">Complete Protocol Guide</span>
                <span className="value">$29 value</span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">Total Value</span>
                <span className="value" style={{ textDecoration: 'none', opacity: 1, fontWeight: 700 }}>$131.00</span>
              </div>
              <div className="adv-pricing-total">
                <span className="label">Your Price</span>
                <span className="price">
                  <span className="price-strike">$90.00</span>
                  $39.95
                </span>
              </div>
              <div style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
                <span className="adv-save-badge">
                  <iconify-icon icon="mdi:tag" />
                  You Save $91.05 (70% OFF)
                </span>
              </div>
              <ul className="adv-pricing-includes">
                <li><iconify-icon icon="mdi:check-circle" /> Complete 30-day protocol</li>
                <li><iconify-icon icon="mdi:check-circle" /> No prescription required</li>
                <li><iconify-icon icon="mdi:check-circle" /> Free shipping</li>
                <li><iconify-icon icon="mdi:check-circle" /> No subscription — one-time purchase</li>
                <li><iconify-icon icon="mdi:check-circle" /> 60-day satisfaction guarantee</li>
              </ul>
              <button onClick={handleBuyNow} disabled={isLoading} className="adv-cta-btn full-width">
                {isLoading ? 'Processing...' : 'Get the Protocol — $39.95 + Free Shipping'}
                <iconify-icon icon="mdi:arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. Trust & Guarantee Strip ─── */}
      <section className="adv-editorial">
        <div className="adv-container-wide">
          <div className="adv-trust-strip">
            <div className="adv-trust-badge">
              <iconify-icon icon="mdi:prescription" />
              <span>No Prescription Required</span>
            </div>
            <div className="adv-trust-badge">
              <iconify-icon icon="mdi:cart-check" />
              <span>No Subscription — One-Time Purchase</span>
            </div>
            <div className="adv-trust-badge">
              <iconify-icon icon="mdi:shield-check" />
              <span>FDA-Registered Facility</span>
            </div>
            <div className="adv-trust-badge">
              <iconify-icon icon="mdi:truck-fast" />
              <span>Free Shipping Always</span>
            </div>
          </div>
        </div>

        <div className="adv-guarantee">
          <div className="adv-container">
            <div className="adv-guarantee-badge">
              <div className="adv-guarantee-icon">
                <iconify-icon icon="mdi:shield-check" />
              </div>
              <h3 className="adv-guarantee-title">60-Day Satisfaction Guarantee</h3>
              <p className="adv-guarantee-text">
                Not satisfied with your results? Return the product within 60 days for a full refund. No questions asked. We stand behind the science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 11. Who Is This For ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading" style={{ textAlign: 'center' }}>Who Is This For?</h2>
          <div className="adv-callout-block">
            <p>
              If you're on <strong>Ozempic, Wegovy, Mounjaro, Zepbound</strong>, or any GLP-1 medication — or if you're planning to start — this is the missing piece your provider probably hasn't told you about.
            </p>
            <button onClick={handleBuyNow} disabled={isLoading} className="adv-cta-btn">
              {isLoading ? 'Processing...' : 'Get the Protocol — $39.95'}
              <iconify-icon icon="mdi:arrow-right" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ─── */}
      <section className="adv-faq-section">
        <div className="adv-container">
          <h2 className="adv-section-heading" style={{ textAlign: 'center', marginTop: 0 }}>
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, i) => (
            <div className="adv-faq-item" key={i}>
              <button
                className={`adv-faq-trigger ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <iconify-icon icon="mdi:chevron-down" />
              </button>
              <div className={`adv-faq-answer ${openFaq === i ? 'open' : ''}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 13. Final CTA ─── */}
      <section className="adv-final-cta">
        <div className="adv-container">
          <p className="adv-final-price">For Less Than a Single Lunch Out</p>
          <p className="adv-final-subtitle">
            30 days of cellular optimization designed to protect everything your GLP-1 medication is helping you achieve.
          </p>
          <div style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-title)', fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--b365-white)' }}>
              <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: 'var(--text-h4)', marginRight: '12px' }}>$90.00</span>
              $39.95
            </span>
            <span style={{ display: 'block', fontSize: 'var(--text-body-sm)', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
              Free Shipping — No Subscription
            </span>
          </div>
          <div className="adv-final-trust">
            <span><iconify-icon icon="mdi:check-circle" /> One-time purchase</span>
            <span><iconify-icon icon="mdi:check-circle" /> No auto-renewals</span>
            <span><iconify-icon icon="mdi:check-circle" /> 60-day guarantee</span>
            <span><iconify-icon icon="mdi:check-circle" /> Free shipping</span>
          </div>
          <button onClick={handleBuyNow} disabled={isLoading} className="adv-cta-btn">
            {isLoading ? 'Processing...' : 'Get the Protocol Now'}
            <iconify-icon icon="mdi:arrow-right" />
          </button>
          <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-caption)', color: 'rgba(255,255,255,0.5)' }}>
            One-time purchase. No auto-renewals. Reorder when you're ready.
          </p>
        </div>
      </section>

      {/* ─── 14. Footer ─── */}
      <footer className="adv-footer">
        <div className="adv-footer-inner">
          <div className="adv-footer-about">
            <h4>About Best 365 Labs</h4>
            <p>
              Best 365 Labs is a subsidiary of Best Human Inc. (OTC: BHIC), a publicly traded health optimization company. With over 50,000 clients served and products manufactured in FDA-registered, cGMP-certified facilities, Best 365 Labs is committed to advancing human health through science-backed cellular optimization.
            </p>
          </div>
          <div className="adv-footer-disclaimer">
            <p>
              These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary.
            </p>
            <p style={{ marginTop: '12px' }}>
              Best 365 Labs is an e-commerce platform. Medical services, evaluations, and prescriptions are provided by independent licensed healthcare professionals through the happyMD telehealth network.
            </p>
            <p style={{ marginTop: '12px', fontWeight: 600 }}>
              ⚠️ Methylene Blue should NOT be used by patients with G6PD deficiency. May interact with MAOIs/SSRIs. Consult your healthcare provider before use.
            </p>
          </div>
          <div className="adv-footer-contact">
            <p>
              <a href="mailto:info@best365labs.com">info@best365labs.com</a> &nbsp;|&nbsp; (385) 421-5651
            </p>
          </div>
          <div className="adv-footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/returns">Return Policy</Link>
          </div>
        </div>
      </footer>

      {/* ─── Sticky Mobile CTA ─── */}
      <div className="glp1-sticky-cta">
        <div className="glp1-sticky-price">
          <span className="strike">$90</span> $39.95
          <span className="save">Save $50</span>
        </div>
        <button onClick={handleBuyNow} disabled={isLoading} className="glp1-sticky-btn">
          {isLoading ? '...' : 'Get the Protocol'}
        </button>
      </div>
    </div>
  );
};

export default GLP1AdvertorialPage;
