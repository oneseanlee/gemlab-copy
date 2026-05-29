// @ts-nocheck
import React, { useState, useEffect } from 'react';
import './GLP1ActivatePage.css';
import './HomePage.css';        // shared b365-promo-banner / b365-nav / b365-section
import './TPrime365Page.css';   // shared tprime-hero-container / tprime-hero-img / tprime-hero-text
import './GLP1Page.css';        // shared glp1-* hero tweaks (no harm if unused)

import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import JsonLd from '../components/JsonLd';
import { glp1ActivateProductSchema, glp1ActivateFaqSchema } from '../lib/seo-schemas';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import { CartDrawer } from '../components/CartDrawer';
import { useCartStore } from '../stores/cartStore';
import {
  GLP1_ACTIVATE_ONETIME_VARIANT_ID,
  GLP1_ACTIVATE_MONTHLY_VARIANT_ID,
  GLP1_ACTIVATE_BIMONTHLY_VARIANT_ID,
} from '../lib/shopify';
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion';
import {
  Menu, X, Shield, Flame, Droplet, Clock, Check, Plus, Minus,
  Bone, Dumbbell, AlertCircle, Truck, FlaskConical, BadgeCheck, ArrowRight,
  Activity,
} from 'lucide-react';

import glp1ActivateBottle from '@/assets/glp1-activate-bottle.png';
const PRODUCT_IMG = glp1ActivateBottle;
const PRODUCT_IMG_FALLBACK = '/images/product-glp-protocol.png';

const ACTIVATE_PRODUCT = {
  node: {
    id: 'gid://shopify/Product/9252736073868',
    title: 'GLP-1 Activate — GLP-1 Cellular Companion™',
    description: 'Sublingual cellular support for GLP-1 therapy. NAD+, 1-MNA, Spermidine, Boron.',
    handle: 'glp-1-activate',
    priceRange: { minVariantPrice: { amount: '27.00', currencyCode: 'USD' } },
    images: { edges: [{ node: { url: PRODUCT_IMG, altText: 'GLP-1 Activate dropper bottle' } }] },
    variants: { edges: [] },
    options: [{ name: 'Purchase Option', values: ['One-Time', 'Monthly Subscription', 'Every 2 Months Subscription'] }],
  },
};

type PurchaseType = 'onetime' | 'monthly' | 'bimonthly';

const VARIANTS: Record<PurchaseType, { id: string; price: string; label: string; saveTag: boolean }> = {
  onetime:   { id: GLP1_ACTIVATE_ONETIME_VARIANT_ID,   price: '30.00', label: 'One-Time',       saveTag: false },
  monthly:   { id: GLP1_ACTIVATE_MONTHLY_VARIANT_ID,   price: '27.00', label: 'Monthly',        saveTag: true  },
  bimonthly: { id: GLP1_ACTIVATE_BIMONTHLY_VARIANT_ID, price: '27.00', label: 'Every 2 Months', saveTag: true  },
};

const faqs = [
  { q: 'How is this different from other NAD+ supplements?',
    a: 'Most NAD+ products use precursors (NR, NMN) and rely on your body to convert them — a process GLP-1 medications can disrupt by slowing digestion. GLP-1 Activate delivers actual NAD+ molecules sublingually, then uses 1-MNA to prevent breakdown. Faster onset, longer duration, no gut required.' },
  { q: 'Will this interfere with my Ozempic®, Wegovy®, Mounjaro®, or Zepbound®?',
    a: 'No. Sublingual absorption bypasses the digestive system entirely, which is exactly the system your GLP-1 medication has slowed. There is zero pharmacokinetic interference.' },
  { q: 'When will it ship?',
    a: 'Preorders ship May 1, 2026. Subscription billing begins on your first shipment.' },
  { q: 'Can I cancel my subscription?',
    a: 'Yes. Pause, skip, or cancel anytime from your account.' },
  { q: 'Do I need a prescription?',
    a: 'No. GLP-1 Activate is a dietary supplement manufactured in an FDA-registered facility. No prescription needed.' },
  { q: 'Is this safe with my GLP-1 medication?',
    a: 'Yes — designed specifically to complement GLP-1 therapy. Always inform your prescribing physician of any supplements you take.' },
  { q: 'How quickly will I notice results?',
    a: 'Most users report energy improvements within 3–7 days. Cellular benefits compound over 4–8 weeks of consistent daily use.' },
];

const GLP1ActivatePage: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [purchase, setPurchase] = useState<PurchaseType>('monthly');
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const isLoading = useCartStore((s) => s.isLoading);

  const selected = VARIANTS[purchase];

  useEffect(() => {
    const prev = document.title;
    document.title = 'GLP-1 Activate — Your GLP-1 Has a Blind Spot. This Fixes It.';
    return () => { document.title = prev; };
  }, []);

  const handleAdd = async () => {
    await addItem({
      product: ACTIVATE_PRODUCT,
      variantId: selected.id,
      variantTitle: selected.label,
      price: { amount: selected.price, currencyCode: 'USD' },
      quantity: qty,
      selectedOptions: [{ name: 'Purchase Option', value: selected.label }],
    });
    setCartOpen(true);
  };

  const mobileLinks = [
    { label: 'Benefits', href: '#benefits' },
    { label: 'Science', href: '#science' },
    { label: 'Stack', href: '#stack' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Shop All', href: '/' },
  ];

  return (
    <div className="glpa-page">
      <JsonLd id="glp1-activate-product" schema={glp1ActivateProductSchema} />
      <JsonLd id="glp1-activate-faq" schema={glp1ActivateFaqSchema} />
      <MobileMenu links={mobileLinks} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* 1. Promo banner — shared b365-promo-banner */}
      {showBanner && (
        <div className="b365-promo-banner">
          <span className="promo-desktop">🧪 Preorder Now — Ships May 1, 2026 · Free U.S. Shipping over $40</span>
          <span className="promo-mobile">🧪 Preorder · Ships May 1 · Free Shipping $40+</span>
          <button onClick={() => setShowBanner(false)} aria-label="Close banner">✕</button>
        </div>
      )}

      {/* 2. Nav — shared b365-nav with Best365Labs logo */}
      <nav className={`b365-nav ${showBanner ? 'with-banner' : ''}`}>
        <div className="b365-nav-inner">
          <button className="b365-hamburger" aria-label="Menu" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
          <a href="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <ul className="b365-nav-links">
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#science">Science</a></li>
            <li><a href="#stack">Stack</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <div className="b365-nav-right">
            <CartDrawer />
            <AnimatedCTA href="#" small onClick={handleAdd} disabled={isLoading}>
              {isLoading ? 'Adding…' : 'Preorder Now'}
            </AnimatedCTA>
          </div>
        </div>
      </nav>

      {/* 3. Hero — uses shared tprime-hero-container layout */}
      <section className={`glpa-hero-section ${!showBanner ? 'no-banner' : ''}`}>
        <div className="tprime-hero-container">
          <div className="tprime-hero-img">
            <img
              src={PRODUCT_IMG}
              alt="GLP-1 Activate sublingual dropper bottle"
              width="600"
              height="600"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = PRODUCT_IMG_FALLBACK; }}
            />
          </div>
          <div className="tprime-hero-text">
            <span className="glpa-eyebrow">GLP-1 Cellular Companion™</span>
            <h1>Your GLP-1 Has a <em>Blind Spot.</em> This Fixes It.</h1>
            <p className="glpa-subhead">
              The first sublingual cellular support formula designed specifically for GLP-1 therapy.
              Bypasses the gut entirely. Reaches your bloodstream in 5–15 minutes. Zero GLP-1 interference.
            </p>
            <div className="glpa-pills">
              <span className="glpa-pill"><Droplet size={12} /> Bypasses the Gut</span>
              <span className="glpa-pill"><Flame size={12} /> Powers Fat Metabolism</span>
              <span className="glpa-pill"><Shield size={12} /> Protects Muscle & Bone</span>
            </div>

            {/* Buy box */}
            <div className="glpa-buybox">
              <div className="glpa-purchase-toggle">
                {(['onetime', 'monthly', 'bimonthly'] as PurchaseType[]).map((p) => (
                  <button
                    key={p}
                    className={`glpa-toggle-btn ${purchase === p ? 'active' : ''}`}
                    onClick={() => setPurchase(p)}
                    type="button"
                  >
                    {VARIANTS[p].label}
                    {VARIANTS[p].saveTag && <span className="glpa-save-tag">SAVE 10%</span>}
                    <small>${VARIANTS[p].price}{p !== 'onetime' ? ' / shipment' : ''}</small>
                  </button>
                ))}
              </div>
              <div className="glpa-price-row">
                <span className="glpa-price-big">${selected.price}</span>
                {purchase !== 'onetime' && <span className="glpa-strike">$30.00</span>}
                <span className="glpa-price-suffix">
                  {purchase === 'monthly' && '/ month'}
                  {purchase === 'bimonthly' && '/ every 2 months'}
                  {purchase === 'onetime' && 'one-time'}
                </span>
              </div>
              <div className="glpa-qty-row">
                <div className="glpa-qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={14} /></button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Increase"><Plus size={14} /></button>
                </div>
                <AnimatedCTA onClick={handleAdd} disabled={isLoading}>
                  {isLoading ? 'Adding…' : 'Preorder Now'} <ArrowRight size={16} />
                </AnimatedCTA>
              </div>
              <div className="glpa-ship-note">📦 Ships May 1, 2026 · Free U.S. Shipping over $40</div>
            </div>

            <div className="glpa-trust-row">
              <span><FlaskConical size={14} /> 3rd Party Lab Tested</span>
              <span><BadgeCheck size={14} /> FDA-Registered Facility</span>
              <span><Truck size={14} /> Free Shipping $40+</span>
              <span><Droplet size={14} /> Sublingual Delivery</span>
              <span><Check size={14} /> Made in USA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Hidden Problem */}
      <section className="b365-section" id="benefits">
        <h2 className="b365-section-heading b365-serif">The Hidden Problem with <em>GLP-1 Therapy</em></h2>
        <p className="glpa-lede">
          GLP-1 medications (Ozempic®, Wegovy®, Mounjaro®, Zepbound®) slow gastric emptying — meaning your capsules,
          tablets, and powders absorb unpredictably or not at all. Published research shows GLP-1 drugs alter oral
          supplement absorption by <strong>64–205%</strong>.
        </p>
        <div className="glpa-card-grid-3">
          <div className="glpa-pcard">
            <div className="glpa-pcard-icon"><Clock size={22} /></div>
            <h3>Capsules sit in your stomach</h3>
            <p>Unabsorbed for hours — your nutrients never reach your bloodstream when you need them.</p>
          </div>
          <div className="glpa-pcard">
            <div className="glpa-pcard-icon"><AlertCircle size={22} /></div>
            <h3>Powders ferment instead of fueling</h3>
            <p>Slowed transit means powders sit and ferment in the gut rather than reaching your cells.</p>
          </div>
          <div className="glpa-pcard">
            <div className="glpa-pcard-icon"><Activity size={22} /></div>
            <h3>Tablets break down unpredictably</h3>
            <p>Dissolution windows shift wildly, making consistent dosing nearly impossible.</p>
          </div>
        </div>
      </section>

      {/* 5. The Solution */}
      <section className="b365-section b365-section-alt" id="science">
        <h2 className="b365-section-heading b365-serif">GLP-1 Activate <em>Bypasses the Gut</em> Entirely</h2>
        <p className="glpa-lede">
          Delivered under the tongue, GLP-1 Activate reaches your bloodstream in <strong>5–15 minutes</strong> —
          completely bypassing the digestive system that GLP-1 medications have slowed down.
        </p>
        <div className="glpa-absorption">
          <div className="glpa-abscard">
            <h4>Oral Capsules</h4>
            <p className="glpa-abs-time">Onset: 60–180 minutes (slowed further by GLP-1)</p>
            <div className="glpa-bar"><div className="glpa-bar-fill slow" style={{ width: '32%' }} /></div>
            <p className="glpa-abs-stat">GLP-1 medications can reduce oral bioavailability by <strong>64–205%</strong>.</p>
          </div>
          <div className="glpa-abscard">
            <h4>GLP-1 Activate (Sublingual)</h4>
            <p className="glpa-abs-time">Onset: 5–15 minutes</p>
            <div className="glpa-bar"><div className="glpa-bar-fill" style={{ width: '92%' }} /></div>
            <p className="glpa-abs-stat">Direct mucosal absorption — <strong>no gut, no GLP-1 interference</strong>.</p>
          </div>
        </div>
      </section>

      {/* 6. Dual NAD+ Strategy */}
      <section className="b365-section">
        <h2 className="b365-section-heading b365-serif">The Dual NAD+ <em>Strategy™</em></h2>
        <p className="glpa-lede">
          Most supplements give you a precursor and hope your body converts it. We deliver actual NAD+ molecules
          directly into your bloodstream, then 1-MNA locks them in by blocking the enzyme that breaks NAD+ down.
          Fast boost + all-day preservation in a single dose.
        </p>
        <div className="glpa-compare">
          <div className="glpa-cmp bad">
            <h3>Other NAD+ Supplements</h3>
            <ul>
              <li><X size={18} /> Give you a precursor (NR, NMN)</li>
              <li><X size={18} /> Rely on your body to convert it</li>
              <li><X size={18} /> Conversion fails when GLP-1 slows the gut</li>
              <li><X size={18} /> Rapid breakdown — short-lived elevation</li>
            </ul>
          </div>
          <div className="glpa-cmp good">
            <h3>GLP-1 Activate</h3>
            <ul>
              <li><Check size={18} /> <strong>Direct NAD+ delivery</strong> sublingually</li>
              <li><Check size={18} /> Bypasses conversion bottlenecks entirely</li>
              <li><Check size={18} /> 1-MNA <strong>blocks NAD+ breakdown</strong></li>
              <li><Check size={18} /> Sustained elevation across the full day</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Ingredients */}
      <section className="b365-section b365-section-alt" id="formula">
        <h2 className="b365-section-heading b365-serif">Why Each Ingredient <em>Earns Its Place</em></h2>
        <p className="glpa-lede">Four molecules. One sublingual dose. Engineered to do what your GLP-1 can't.</p>
        <div className="glpa-card-grid-4">
          <div className="glpa-icard">
            <div className="glpa-icard-dose">NAD+ · 20 mg</div>
            <h3>NAD+</h3>
            <div className="glpa-nick">The Battery Charger</div>
            <p>Your cells need fuel to burn the fat GLP-1 is mobilizing. NAD+ powers your mitochondria. Without it, released fat just gets re-stored.<span className="footnote">*</span></p>
          </div>
          <div className="glpa-icard">
            <div className="glpa-icard-dose">1-MNA · 25 mg</div>
            <h3>1-MNA</h3>
            <div className="glpa-nick">The Battery Protector</div>
            <p>Prevents NAD+ breakdown. Keeps levels elevated all day. Adds cardiovascular and anti-inflammatory benefits that stack on top of GLP-1's heart-health effects.<span className="footnote">*</span></p>
          </div>
          <div className="glpa-icard">
            <div className="glpa-icard-dose">Spermidine · 10 mg</div>
            <h3>Spermidine</h3>
            <div className="glpa-nick">The Cellular Cleanup Crew</div>
            <p>Amplifies autophagy — your body's recycling system. GLP-1's caloric restriction starts the process; spermidine supercharges it.<span className="footnote">*</span></p>
          </div>
          <div className="glpa-icard">
            <div className="glpa-icard-dose">Boron · 10 mg</div>
            <h3>Boron</h3>
            <div className="glpa-nick">The Hormone & Bone Shield</div>
            <p>Rapid weight loss can weaken bones and disrupt hormones. Boron protects both during aggressive fat loss — preserving what GLP-1 can accidentally strip away.<span className="footnote">*</span></p>
          </div>
        </div>
      </section>

      {/* 8. What GLP-1 Strips Away */}
      <section className="b365-section">
        <h2 className="b365-section-heading b365-serif">What GLP-1 Can <em>Quietly Take From You</em></h2>
        <p className="glpa-lede">Aggressive fat loss has a downside. Most patients aren't told until it's too late.</p>
        <div className="glpa-strips">
          <div className="glpa-strip">
            <div className="glpa-strip-icon"><Dumbbell size={26} /></div>
            <p>Up to <strong>40%</strong> of weight lost on GLP-1 is muscle.</p>
          </div>
          <div className="glpa-strip">
            <div className="glpa-strip-icon"><Bone size={26} /></div>
            <p>Bone density loss <strong>accelerates</strong> during rapid fat loss.</p>
          </div>
          <div className="glpa-strip">
            <div className="glpa-strip-icon"><Activity size={26} /></div>
            <p>Hormonal disruption is <strong>common</strong> during caloric restriction.</p>
          </div>
        </div>
        <p className="glpa-strip-close">GLP-1 Activate is engineered to protect all three.</p>
      </section>

      {/* 9. How To Use */}
      <section className="b365-section b365-section-alt">
        <h2 className="b365-section-heading b365-serif">How To <em>Use</em></h2>
        <p className="glpa-lede">Three steps. Sixty seconds. Once a day.</p>
        <div className="glpa-steps">
          <div className="glpa-step">
            <div className="glpa-step-num">01</div>
            <h4>Place 20 drops (1 mL) under tongue</h4>
            <p>Use the calibrated dropper for a precise daily dose.</p>
          </div>
          <div className="glpa-step">
            <div className="glpa-step-num">02</div>
            <h4>Hold 60–90 seconds</h4>
            <p>Sublingual mucosa absorbs the formula directly into your bloodstream.</p>
          </div>
          <div className="glpa-step">
            <div className="glpa-step-num">03</div>
            <h4>Swallow remainder</h4>
            <p>Take once daily, morning preferred for sustained energy.</p>
          </div>
        </div>
        <div className="glpa-zero-int">
          ✓ Works with all injectable and oral GLP-1 medications with zero interference.
        </div>
      </section>

      {/* 10. Choose Your Plan */}
      <section className="b365-section">
        <h2 className="b365-section-heading b365-serif">Choose Your <em>Plan</em></h2>
        <p className="glpa-lede">Subscribe and save 10% on every shipment. Pause or cancel anytime.</p>
        <div className="glpa-subs">
          <div
            className={`glpa-subcard ${purchase === 'onetime' ? 'active' : ''}`}
            onClick={() => setPurchase('onetime')}
          >
            <h3>One-Time Purchase</h3>
            <div className="glpa-subprice">$30.00</div>
            <ul>
              <li><Check size={16} /> 30-day supply</li>
              <li><Check size={16} /> No commitment</li>
              <li><Check size={16} /> Free shipping over $40</li>
            </ul>
          </div>
          <div
            className={`glpa-subcard ${purchase === 'monthly' ? 'active' : ''}`}
            onClick={() => setPurchase('monthly')}
          >
            <h3>Monthly Subscription <span className="glpa-save-tag">BEST</span></h3>
            <div className="glpa-subprice">$27.00<small>/ month</small></div>
            <ul>
              <li><Check size={16} /> Save 10% on every shipment</li>
              <li><Check size={16} /> Pause or cancel anytime</li>
              <li><Check size={16} /> Never run out</li>
              <li><Check size={16} /> Free shipping included</li>
            </ul>
          </div>
        </div>
        <p className="glpa-subs-extra">
          Subscribers also get early access to new Best365Labs formulas and member-only pricing on UCOS,
          Triple Power Methylene Blue, and the GLP-1 Cellular Bundle.
        </p>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <AnimatedCTA onClick={handleAdd} disabled={isLoading}>
            {isLoading ? 'Adding…' : 'Preorder Now'} <ArrowRight size={16} />
          </AnimatedCTA>
        </div>
      </section>

      {/* 11. Cross-sell */}
      <section className="b365-section b365-section-alt" id="stack">
        <h2 className="b365-section-heading b365-serif">Stack With the <em>Complete GLP-1 System</em></h2>
        <p className="glpa-lede">GLP-1 Activate is the cellular companion. These complete the protocol.</p>
        <div className="glpa-cross">
          <div className="glpa-xcard">
            <h4>GLP-1 Optimization Protocol</h4>
            <div className="glpa-xprice">$39.95</div>
            <p>Complete 30-day system for muscle preservation, energy, and metabolic optimization on GLP-1 therapy.</p>
            <a href="/glp1-protocol">Add to Stack <ArrowRight size={14} /></a>
          </div>
          <div className="glpa-xcard">
            <h4>GLP-1 Cellular Bundle</h4>
            <div className="glpa-xprice">$279</div>
            <p>4-product bundle including consultation and prescription medication. Total value: $340.</p>
            <a href="/glp1-ucos">Add to Stack <ArrowRight size={14} /></a>
          </div>
          <div className="glpa-xcard">
            <h4>Triple Power Methylene Blue</h4>
            <div className="glpa-xprice">Best365Labs</div>
            <p>Pharmaceutical-grade methylene blue for mitochondrial energy and cognitive performance.</p>
            <a href="https://best365labs.com" target="_blank" rel="noopener noreferrer">Shop Now <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="b365-section" id="faq">
        <h2 className="b365-section-heading b365-serif">Questions, <em>Answered</em></h2>
        <div className="glpa-faq" style={{ marginTop: 32 }}>
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--b365-text-secondary)' }}>
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 13. Final CTA */}
      <section className="glpa-final-cta">
        <h2>Don't Let GLP-1 Take More Than the Weight.</h2>
        <p className="sub">Protect your muscle. Protect your bones. Power your burn. One dropper a day.</p>
        <div className="glpa-final-price">
          $27<small>/ month subscription</small> &nbsp;·&nbsp; $30<small>one-time</small>
        </div>
        <AnimatedCTA onClick={handleAdd} disabled={isLoading}>
          {isLoading ? 'Adding…' : 'Preorder GLP-1 Activate'} <ArrowRight size={16} />
        </AnimatedCTA>
        <p className="glpa-final-trust">Ships May 1, 2026 · 3rd Party Lab Tested · Free U.S. Shipping $40+</p>
      </section>

      {/* 14. FDA Disclaimer */}
      <div className="glpa-disclaimer">
        *These statements have not been evaluated by the Food and Drug Administration.
        This product is not intended to diagnose, treat, cure, or prevent any disease.
        <br />Independent, 3rd Party Lab Tested. Manufactured in an FDA-Registered Facility.
      </div>

      <SharedFooter />

      {/* Sticky mobile CTA */}
      <div className="glpa-sticky-mobile">
        <div className="glpa-sticky-price">
          ${selected.price}
          <small>{purchase === 'onetime' ? 'One-time' : purchase === 'monthly' ? 'Monthly · Save 10%' : 'Every 2mo · Save 10%'}</small>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <AnimatedCTA small onClick={handleAdd} disabled={isLoading}>
            {isLoading ? 'Adding…' : 'Preorder'}
          </AnimatedCTA>
        </div>
      </div>
    </div>
  );
};

export default GLP1ActivatePage;
