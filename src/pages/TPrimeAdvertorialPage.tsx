import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TPrimeAdvertorialPage.css';

const CTA_LINK = "https://cell365power.lovable.app/tprime365";

const faqs = [
  {
    q: "How is TPrime365 different from TRT?",
    a: "TRT replaces your body's testosterone production — once you start, your body stops making its own. TPrime365 does the opposite. It signals your body to produce more testosterone naturally. You keep your fertility, avoid testicular atrophy, and can stop anytime without crashing."
  },
  {
    q: "What if I'm not approved by the physician?",
    a: "If the reviewing physician determines you are not a candidate for TPrime365, the $140 consultation fee is fully refunded. No questions asked."
  },
  {
    q: "When do I pay?",
    a: "You pay $149 when you place your order. This covers your first month's supply plus the physician consultation. If you're not approved, you receive a full refund."
  },
  {
    q: "Will I lose my gains if I stop?",
    a: "Because TPrime365 supports your body's own production rather than replacing it, most men retain their gains after stopping. Your body doesn't become dependent on external hormones."
  },
  {
    q: "How long until I see results?",
    a: "Most men report noticeable improvements in energy, mood, and drive within 2-4 weeks. Blood work typically shows significant testosterone increases within the same timeframe."
  },
  {
    q: "Do I need blood work?",
    a: "Blood work is not required to start but is recommended. Many men get baseline labs before starting and follow-up labs at 4-6 weeks to track their progress."
  },
  {
    q: "Is this a subscription?",
    a: "Yes, TPrime365 ships monthly. But there are no contracts and no commitments — you can cancel anytime with no penalties or fees."
  },
  {
    q: "Can I take this with other supplements?",
    a: "Yes. TPrime365 is compatible with most supplements. However, if you're currently on TRT or any prescription medication, the reviewing physician will evaluate compatibility during your consultation."
  }
];

const TPrimeAdvertorialPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="adv-page">
      {/* ─── 1. Headline Section ─── */}
      <section className="adv-headline-section">
        <div className="adv-container">
          <span className="adv-category-tag">Men's Health</span>
          <h1 className="adv-main-headline">
            Men Are Ditching TRT Injections. Here's What They're Using Instead.
          </h1>
          <p className="adv-subheadline">
            A new 4-in-1 sublingual formula is helping thousands of men boost testosterone naturally — without needles, without shutting down their body, and without a lifetime commitment.
          </p>
          <div className="adv-byline">
            <span>Health &amp; Wellness Desk</span>
            <span className="adv-byline-dot" />
            <span>Updated February 2026</span>
            <span className="adv-byline-dot" />
            <span>8 min read</span>
          </div>
        </div>
      </section>

      {/* ─── Social Proof Strip ─── */}
      <div className="adv-proof-strip adv-container-wide">
        <span className="adv-proof-item">
          <span className="stars">★★★★★</span> 4.9/5
        </span>
        <span className="adv-proof-divider" />
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
          <iconify-icon icon="mdi:stethoscope" />
          Physician-supervised
        </span>
      </div>

      {/* ─── 2. Opening Editorial Copy ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <p className="adv-drop-cap">
            Something is happening to men. Not slowly — rapidly. After 30, testosterone drops roughly 1% every year. By 40, most men have lost 10-20% of the hormone that drives their energy, their confidence, their edge. And it doesn't stop.
          </p>
          <p>
            The symptoms creep in quietly. <strong>The afternoon crashes. The brain fog that won't lift. The muscle that disappears no matter how hard you train.</strong> The libido that used to be automatic — now barely a memory.
          </p>
          <p>
            For decades, the medical establishment offered one solution: <strong>Testosterone Replacement Therapy (TRT).</strong> Needles. Weekly injections. Clinic visits. And a dependency that, once started, most men can never walk away from.
          </p>
          <p>
            But a growing number of physicians and researchers are now questioning whether TRT is even the right approach — especially when the goal isn't to <em>replace</em> testosterone, but to get your body to <strong>produce more of its own.</strong>
          </p>
        </div>
      </section>

      {/* ─── 3. The Dirty Secret About TRT ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading">The Dirty Secret About TRT</h2>
          <p>
            Here's what most TRT clinics won't tell you upfront: <strong>the moment you inject synthetic testosterone, your body stops making its own.</strong>
          </p>
          <p>
            Your brain detects the external supply and shuts down the signal to your testes. Over time, this leads to <strong>testicular atrophy</strong> — your testes physically shrink. Sperm production plummets. Fertility can be permanently compromised.
          </p>
          <p>
            And if you ever try to stop? Your testosterone doesn't bounce back. It crashes — often to levels <strong>lower than where you started.</strong> You're now dependent on injections for life. Not because your body needed them. But because TRT broke the system it was supposed to fix.
          </p>
          <p>
            This is the TRT trap. And <strong>millions of men are locked in it.</strong>
          </p>
        </div>
      </section>

      {/* ─── Mid-page CTA ─── */}
      <div className="adv-container">
        <div className="adv-inline-cta">
          <p>Ready to optimize your testosterone without the risks?</p>
          <a href={CTA_LINK} className="adv-cta-btn">
            Start Your Evaluation Today
            <iconify-icon icon="mdi:arrow-right" />
          </a>
        </div>
      </div>

      {/* ─── 4. Enter TPrime365 ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading">Enter TPrime365</h2>
          <p>
            <strong>TPrime365 is a physician-supervised, 4-in-1 sublingual formula</strong> designed to do what TRT cannot: boost your body's own testosterone production — naturally, safely, and without dependency.
          </p>
          <p>
            Developed by Best 365 Labs and prescribed through licensed telehealth physicians, TPrime365 combines four clinically-backed compounds into a single daily dose. Clinical data shows increases of <strong>60 to 664% in total testosterone</strong> within 2-4 weeks.
          </p>
        </div>

        <div className="adv-container-wide">
          <div className="adv-ingredient-grid">
            <div className="adv-ingredient-card">
              <span className="adv-ingredient-dose">25mg</span>
              <span className="adv-ingredient-name">Enclomiphene</span>
              <span className="adv-ingredient-role">Signals your brain to increase natural testosterone production</span>
            </div>
            <div className="adv-ingredient-card">
              <span className="adv-ingredient-dose">10mg</span>
              <span className="adv-ingredient-name">Spermidine</span>
              <span className="adv-ingredient-role">Cellular renewal agent that promotes autophagy and longevity</span>
            </div>
            <div className="adv-ingredient-card">
              <span className="adv-ingredient-dose">10mg</span>
              <span className="adv-ingredient-name">Boron</span>
              <span className="adv-ingredient-role">Increases free testosterone by reducing SHBG binding</span>
            </div>
            <div className="adv-ingredient-card">
              <span className="adv-ingredient-dose">10mg</span>
              <span className="adv-ingredient-name">Vitamin C</span>
              <span className="adv-ingredient-role">Antioxidant protection and cortisol regulation support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Inline Product Image ─── */}
      <div className="adv-container" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <img
          src="/images/tprime-bottle.png"
          alt="TPrime365 sublingual testosterone optimization formula by Best 365 Labs"
          style={{
            maxWidth: '340px',
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 16px 40px rgba(0, 0, 0, 0.15))',
          }}
          loading="lazy"
        />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-caption)',
          color: 'var(--b365-text-secondary)',
          marginTop: '16px',
          fontStyle: 'italic',
        }}>
          TPrime365 — 4-in-1 sublingual formula. Physician-supervised.
        </p>
      </div>

      {/* ─── 5. Sublingual Delivery ─── */}
      <section className="adv-editorial">
        <div className="adv-container">
          <h2 className="adv-section-heading">Why Sublingual Delivery Changes the Game</h2>
          <p>
            Most oral supplements are swallowed and routed through your digestive system, where <strong>up to 60% of the active compounds are destroyed</strong> by stomach acid and liver metabolism before they ever reach your bloodstream. This is called first-pass metabolism.
          </p>
          <p>
            TPrime365 uses <strong>MODS Max Gold™ sublingual technology</strong> — a micro-liposomal delivery system placed under the tongue. The formula absorbs directly into your bloodstream through the mucosal membrane, bypassing the gut entirely.
          </p>
        </div>

        <div className="adv-container-wide">
          <div className="adv-absorption-compare">
            <div className="adv-absorption-item">
              <div className="adv-absorption-icon pill">
                <iconify-icon icon="mdi:pill" />
              </div>
              <span className="adv-absorption-pct low">~40%</span>
              <span className="adv-absorption-label">Traditional Pills</span>
              <span className="adv-absorption-sublabel">Lost to first-pass metabolism</span>
            </div>
            <span className="adv-absorption-vs">vs</span>
            <div className="adv-absorption-item">
              <div className="adv-absorption-icon sublingual">
                <iconify-icon icon="mdi:eyedropper" />
              </div>
              <span className="adv-absorption-pct high">~100%</span>
              <span className="adv-absorption-label">MODS Max Gold™</span>
              <span className="adv-absorption-sublabel">Direct bloodstream delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Comparison Table ─── */}
      <section className="adv-editorial">
        <div className="adv-container-wide">
          <h2 className="adv-section-heading" style={{ textAlign: 'center' }}>How TPrime365 Compares</h2>
          <div className="adv-comparison-wrapper">
            <table className="adv-comparison-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="highlight">TPrime365</th>
                  <th>Hims</th>
                  <th>Maximus</th>
                  <th>Strut</th>
                  <th>TRT Clinics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Price</td>
                  <td className="highlight">$149/mo</td>
                  <td>$195/mo</td>
                  <td>$199/mo</td>
                  <td>$129/mo</td>
                  <td>$200-400/mo</td>
                </tr>
                <tr>
                  <td>Enclomiphene Dose</td>
                  <td className="highlight">25mg</td>
                  <td>12.5-25mg</td>
                  <td>12.5-25mg</td>
                  <td>12.5mg</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>Delivery Method</td>
                  <td className="highlight">Sublingual</td>
                  <td>Oral</td>
                  <td>Oral</td>
                  <td>Oral</td>
                  <td>Injection</td>
                </tr>
                <tr>
                  <td>Includes Spermidine</td>
                  <td className="highlight"><span className="check">✓</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                </tr>
                <tr>
                  <td>Includes Boron</td>
                  <td className="highlight"><span className="check">✓</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                </tr>
                <tr>
                  <td>Preserves Fertility</td>
                  <td className="highlight"><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">✗</span></td>
                </tr>
                <tr>
                  <td>Shuts Down Natural T</td>
                  <td className="highlight"><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="check" style={{ color: 'var(--b365-red)' }}>✓</span></td>
                </tr>
                <tr>
                  <td>Longevity Benefits</td>
                  <td className="highlight"><span className="check">✓</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                </tr>
                <tr>
                  <td>Money-Back Guarantee</td>
                  <td className="highlight"><span className="check">✓</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                  <td><span className="cross">✗</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 7. Clinical Results ─── */}
      <section className="adv-editorial">
        <div className="adv-container-wide">
          <h2 className="adv-section-heading" style={{ textAlign: 'center' }}>Real Men. Real Results.</h2>
          <div className="adv-results-grid">
            <div className="adv-result-card">
              <span className="adv-result-name">Alex T.</span>
              <span className="adv-result-age">Age 32</span>
              <span className="adv-result-increase">+664%</span>
              <div className="adv-result-levels">
                <span className="adv-result-before">120 ng/dL</span>
                <span>→</span>
                <span className="adv-result-after">917 ng/dL</span>
              </div>
              <span className="adv-result-time">3 weeks</span>
            </div>
            <div className="adv-result-card">
              <span className="adv-result-name">Marcus L.</span>
              <span className="adv-result-age">Age 30</span>
              <span className="adv-result-increase">+130%</span>
              <div className="adv-result-levels">
                <span className="adv-result-before">566 ng/dL</span>
                <span>→</span>
                <span className="adv-result-after">1,305 ng/dL</span>
              </div>
              <span className="adv-result-time">6 weeks</span>
            </div>
            <div className="adv-result-card">
              <span className="adv-result-name">David R.</span>
              <span className="adv-result-age">Age 45</span>
              <span className="adv-result-increase">+202%</span>
              <div className="adv-result-levels">
                <span className="adv-result-before">380 ng/dL</span>
                <span>→</span>
                <span className="adv-result-after">1,150 ng/dL</span>
              </div>
              <span className="adv-result-time">4 weeks</span>
            </div>
            <div className="adv-result-card">
              <span className="adv-result-name">Mark</span>
              <span className="adv-result-age">Age 60</span>
              <span className="adv-result-increase">+400%+</span>
              <div className="adv-result-levels">
                <span className="adv-result-before">Low 200s</span>
                <span>→</span>
                <span className="adv-result-after">1,000+ ng/dL</span>
              </div>
              <span className="adv-result-time">4 weeks</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="adv-zero-adverse">
              <iconify-icon icon="mdi:shield-check" />
              Zero adverse events across all patients.
            </span>
          </div>
        </div>
      </section>

      {/* ─── Mid-page CTA 2 ─── */}
      <div className="adv-container">
        <div className="adv-inline-cta">
          <p>See if you qualify for physician-supervised testosterone optimization.</p>
          <a href={CTA_LINK} className="adv-cta-btn">
            Start Your Evaluation Today
            <iconify-icon icon="mdi:arrow-right" />
          </a>
        </div>
      </div>

      {/* ─── 8. How It Works ─── */}
      <section className="adv-editorial">
        <div className="adv-container-wide">
          <h2 className="adv-section-heading" style={{ textAlign: 'center' }}>How It Works</h2>
          <div className="adv-steps-grid">
            <div className="adv-step-card">
              <span className="adv-step-number">01</span>
              <h3 className="adv-step-title">Complete Your Order</h3>
              <p className="adv-step-desc">Place your order and complete a 5-minute health assessment. No office visit required.</p>
            </div>
            <div className="adv-step-card">
              <span className="adv-step-number">02</span>
              <h3 className="adv-step-title">Physician Review</h3>
              <p className="adv-step-desc">A licensed physician reviews your assessment via happyMD. If not approved, you receive a full refund.</p>
            </div>
            <div className="adv-step-card">
              <span className="adv-step-number">03</span>
              <h3 className="adv-step-title">Shipped to Your Door</h3>
              <p className="adv-step-desc">Your formula is compounded at an FDA-registered 503A pharmacy and shipped directly to you in 7-10 business days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. Who Is This For ─── */}
      <section className="adv-editorial">
        <div className="adv-container-wide">
          <h2 className="adv-section-heading" style={{ textAlign: 'center' }}>Who Is This For?</h2>
          <div className="adv-persona-grid">
            <div className="adv-persona-card">
              <span className="adv-persona-age">Ages 25–40</span>
              <h3 className="adv-persona-title">The Competitive Edge</h3>
              <p className="adv-persona-desc">
                You train hard, eat right, and still feel like you're leaving performance on the table. You want peak energy, sharper focus, lean muscle, and the drive that separates good from great.
              </p>
            </div>
            <div className="adv-persona-card">
              <span className="adv-persona-age">Ages 40–55</span>
              <h3 className="adv-persona-title">The Reclamation</h3>
              <p className="adv-persona-desc">
                The energy is fading. The muscle is disappearing. Brain fog, low libido, and afternoon crashes have become your new normal. You want your edge back — without needles or dependency.
              </p>
            </div>
            <div className="adv-persona-card">
              <span className="adv-persona-age">Ages 55+</span>
              <h3 className="adv-persona-title">The Refusal to Slow Down</h3>
              <p className="adv-persona-desc">
                You refuse to accept that aging means declining. You want vitality, strength, and mental clarity — not because you're fighting age, but because you're redefining it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. Value Stack + Pricing ─── */}
      <section className="adv-pricing-section">
        <div className="adv-container">
          <div className="adv-pricing-card">
            <div className="adv-pricing-header">
              <h3>TPrime365 — Complete Protocol</h3>
            </div>
            <div className="adv-pricing-body">
              <div className="adv-pricing-line">
                <span className="label">Enclomiphene 25mg (30-day supply)</span>
                <span className="value">$129</span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">Spermidine 10mg</span>
                <span className="value">$89</span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">Boron 10mg + Vitamin C 10mg</span>
                <span className="value">$45</span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">MODS Max Gold™ sublingual delivery</span>
                <span className="value">$79</span>
              </div>
              <div className="adv-pricing-line">
                <span className="label">Physician consultation</span>
                <span className="value">$140</span>
              </div>
              <div className="adv-pricing-total">
                <span className="label">Your Price</span>
                <span className="price">$149<span className="per-month">/month</span></span>
              </div>
              <ul className="adv-pricing-includes">
                <li><iconify-icon icon="mdi:check-circle" /> Full 4-in-1 formula</li>
                <li><iconify-icon icon="mdi:check-circle" /> Physician consultation included</li>
                <li><iconify-icon icon="mdi:check-circle" /> MODS Max Gold™ sublingual delivery</li>
                <li><iconify-icon icon="mdi:check-circle" /> Free shipping</li>
                <li><iconify-icon icon="mdi:check-circle" /> No contracts — cancel anytime</li>
                <li><iconify-icon icon="mdi:check-circle" /> Not approved = full refund</li>
              </ul>
              <a href={CTA_LINK} className="adv-cta-btn full-width">
                Start Your Evaluation Today
                <iconify-icon icon="mdi:arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 11. Guarantee ─── */}
      <section className="adv-guarantee">
        <div className="adv-container">
          <div className="adv-guarantee-badge">
            <div className="adv-guarantee-icon">
              <iconify-icon icon="mdi:shield-check" />
            </div>
            <h3 className="adv-guarantee-title">Physician Approval Guarantee</h3>
            <p className="adv-guarantee-text">
              If your physician determines you are not a candidate for TPrime365, the $140 consultation fee is fully refunded. No questions asked. You only pay for what works for you.
            </p>
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
          <p className="adv-final-price">$149/month.</p>
          <p className="adv-final-subtitle">Everything Included. Risk-Free.</p>
          <div className="adv-final-trust">
            <span><iconify-icon icon="mdi:check-circle" /> No contracts</span>
            <span><iconify-icon icon="mdi:check-circle" /> Cancel anytime</span>
            <span><iconify-icon icon="mdi:check-circle" /> Physician consultation included</span>
            <span><iconify-icon icon="mdi:check-circle" /> Free shipping</span>
          </div>
          <a href={CTA_LINK} className="adv-cta-btn">
            Start Your Evaluation Today
            <iconify-icon icon="mdi:arrow-right" />
          </a>
        </div>
      </section>

      {/* ─── 14. Footer ─── */}
      <footer className="adv-footer">
        <div className="adv-footer-inner">
          <div className="adv-footer-about">
            <h4>About Best 365 Labs</h4>
            <p>
              Best 365 Labs is a subsidiary of Best Human Inc. (OTC: BHIC), a publicly traded health optimization company. With over 50,000 clients served and products compounded in FDA-registered 503A facilities, Best 365 Labs is committed to advancing men's health through science-backed, physician-supervised protocols.
            </p>
          </div>
          <div className="adv-footer-disclaimer">
            <p>
              These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Always consult with a qualified healthcare provider before starting any new health protocol.
            </p>
            <p style={{ marginTop: '12px' }}>
              Telehealth consultations are provided by happyMD, an independent licensed telehealth provider. Best 365 Labs does not provide medical advice, diagnosis, or treatment. The prescribing physician makes all clinical decisions independently.
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
      <div className="adv-sticky-cta">
        <div className="adv-sticky-price">
          $149<span>/month</span>
        </div>
        <a href={CTA_LINK} className="adv-sticky-btn">
          Start Your Evaluation — $149/mo
        </a>
      </div>
    </div>
  );
};

export default TPrimeAdvertorialPage;
