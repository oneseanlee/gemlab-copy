// @ts-nocheck
import React, { useState } from 'react';
import './TPrime365Page.css';
import '../pages/OceanRaysPage.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';

const TPrime365Page = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
  {
    question: "How is this different from TRT injections?",
    answer: "TPrime365 stimulates your NATURAL testosterone production through the HPG axis. TRT shuts down your natural production, causes testicular atrophy, and eliminates fertility. TPrime365 preserves all of that while optimizing your levels."
  },
  {
    question: "What happens if I'm not approved?",
    answer: "You receive a 100% refund. An independent licensed physician reviews every order. If they determine TPrime365 isn't right for you based on your health assessment, your payment is fully refunded — no questions asked."
  },
  {
    question: "When do I pay?",
    answer: "Payment is processed when you complete your order and health assessment. If the physician does not approve your prescription, you are immediately refunded."
  },
  {
    question: "Will I lose my gains if I stop?",
    answer: "No. Because TPrime365 works with your natural system (not replacing it), you can discontinue without major withdrawal effects. Your body continues producing testosterone naturally."
  },
  {
    question: "How long until I see results?",
    answer: "Most men notice improvements in energy and mood within 2 weeks. Testosterone levels typically increase 60-664% within 2-4 weeks. Full benefits develop over 8-12 weeks."
  },
  {
    question: "Do I need blood work?",
    answer: "The physician may recommend baseline testosterone levels, but it's not always required for approval. Many men proceed based on symptoms alone."
  },
  {
    question: "Is this subscription-based?",
    answer: "Yes, TPrime365 is a monthly subscription. You can pause or cancel anytime, though we recommend at least 3 months for optimal results."
  },
  {
    question: "Can I take this with other supplements?",
    answer: "TPrime365 is designed as a complete system. The reviewing physician will evaluate any other medications or supplements you're taking during the approval process."
  }];


  return (
    <div className="tprime-page">

            {/* 1. Promo Banner */}
            {showBanner &&
      <div className="b365-promo-banner">
                    MODS Max™ 10x Absorption Technology — Now Available in All Products
                    <button onClick={() => setShowBanner(false)} aria-label="Close banner">✕</button>
                </div>
      }

            {/* 2. Navigation */}
            <nav className={`b365-nav ${showBanner ? 'with-banner' : ''}`}>
                <div className="b365-nav-inner">
                    <button className="b365-hamburger" aria-label="Menu">
                        <iconify-icon icon="lucide:menu" width="24"></iconify-icon>
                    </button>
                    <a href="/">
                        <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
                    </a>
                    <ul className="b365-nav-links">
                        <li><a href="#ingredients">Ingredients</a></li>
                        <li><a href="#science">The Science</a></li>
                        <li><a href="#compare">Compare</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                    <div className="b365-nav-right">
                        <a href="#" className="b365-login-link">Log In</a>
                        <AnimatedCTA href="#" small>Start Evaluation</AnimatedCTA>
                    </div>
                </div>
            </nav>

            {/* 3. Hero Section */}
            <section className={`tprime-hero-section ${!showBanner ? 'no-banner' : ''}`}>
                <div className="tprime-hero-container">
                    <div className="tprime-hero-img">
                        <img src="/images/tprime-bottle.png" alt="TPrime365 bottle" />
                    </div>
                    <div className="tprime-hero-text">
                        <h1>The Only 4-in-1 Testosterone <em>Optimizer</em></h1>
                        <p className="subhead">
                            <strong>Enclomiphene + Spermidine + Boron + Vitamin C</strong> — Prescription-grade testosterone optimization with sublingual delivery for men who demand more.
                        </p>
                        <div className="price-row">
                            <span className="price-big">$149</span>
                            <span className="price-note">/month — Includes Physician Consultation via HappyMD</span>
                        </div>
                        <p className="guarantee-text">If not approved by physician, fully refunded</p>
                        <AnimatedCTA href="#">
                            Start Your Optimization
                            <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
                        </AnimatedCTA>
                    </div>
                </div>
            </section>

            {/* 4. The Problem */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Traditional Solutions Are <em>Broken</em></h2>
                <div className="tprime-problem-grid">
                    {[
          { title: 'Injectable TRT', icon: 'lucide:syringe', items: ['Shuts down natural production', 'Testicular atrophy guaranteed', 'Fertility destroyed', 'Lifetime dependency'] },
          { title: 'Oral Pills', icon: 'lucide:pill', items: ['Poor absorption (first-pass liver metabolism)', 'Inconsistent results', 'Half the dose wasted', 'Daily capsule hassle'] },
          { title: 'Single-Ingredient Solutions', icon: 'lucide:flask-conical', items: ['One-dimensional approach', 'Missing synergistic compounds', 'Expensive to stack separately', 'No longevity benefits'] }].
          map((card, i) =>
          <div className="tprime-problem-card" key={i}>
                            <div className="icon-wrap">
                                <iconify-icon icon={card.icon} width="22"></iconify-icon>
                            </div>
                            <h3>{card.title}</h3>
                            <ul>
                                {card.items.map((item, j) =>
              <li key={j}>
                                        <iconify-icon icon="lucide:x" width="14"></iconify-icon>
                                        {item}
                                    </li>
              )}
                            </ul>
                        </div>
          )}
                </div>
            </section>

            {/* 5. The Solution */}
            <section className="b365-section b365-section-alt" id="science">
                <h2 className="b365-section-heading b365-serif">TPrime365™: Your Natural Testosterone, <em>Amplified</em></h2>
                <div className="tprime-pillars-grid">
                    {[
          { name: 'Enclomiphene', dose: '25mg' },
          { name: 'Spermidine', dose: '10mg' },
          { name: 'Boron', dose: '10mg' },
          { name: 'Vitamin C', dose: '10mg' }].
          map((p, i) =>
          <div className="tprime-pillar" key={i}>
                            <span className="pillar-name">{p.name}</span>
                            <span className="pillar-dose">{p.dose}</span>
                        </div>
          )}
                </div>
                <div className="tprime-delivery-badge">
                    <span>Sublingual Delivery via MODS Max Gold™</span>
                </div>
                <p className="tprime-formula-tagline">4 Clinically-Proven Ingredients. 1 Powerful Formula.</p>
            </section>

            {/* 6. Ingredient Breakdown */}
            <section className="b365-section" id="ingredients">
                <h2 className="b365-section-heading b365-serif">The Science Behind <em>Each Pillar</em></h2>
                <div className="tprime-ingredient-grid">
                    {[
          {
            icon: 'lucide:dna', title: 'Pillar 1: Enclomiphene 25mg', subtitle: 'The Foundation — Hormone Optimization',
            sections: [
            { heading: 'What It Does:', items: ['Blocks estrogen receptors at the pituitary', 'Signals your body to produce MORE testosterone naturally', 'Increases LH & FSH (the hormones that make testosterone)', 'Preserves fertility & testicular function'] },
            { heading: 'The Science:', items: ['60-664% testosterone increase in 2-4 weeks', 'Non-hormonal: Won\'t shut down your natural production', 'Fertility-safe: Keeps sperm production active'] }]

          },
          {
            icon: 'lucide:zap', title: 'Pillar 2: Spermidine 10mg', subtitle: 'The Longevity Amplifier — Testosterone + Longevity',
            sections: [
            { heading: 'What It Does:', items: ['Boosts testosterone production directly (+48.9% in men under 50)', 'Slashes cortisol by 58% (the testosterone killer)', 'Reduces estradiol by 55.9% in 83% of men', 'Activates autophagy (cellular renewal & anti-aging)'] },
            { heading: 'The Science:', items: ['5-year survival benefit in epidemiological studies', '40% reduction in fatal heart failure risk', 'Supports Leydig cell function (where testosterone is made)'] }]

          },
          {
            icon: 'lucide:dumbbell', title: 'Pillar 3: Boron 10mg', subtitle: 'The Free Testosterone Liberator — Strength & Vitality',
            sections: [
            { heading: 'What It Does:', items: ['Increases FREE testosterone (the usable form)', 'Reduces SHBG (the protein that binds testosterone)', 'Supports bone density & strength', 'Reduces inflammation'] },
            { heading: 'The Science:', items: ['28% increase in free testosterone in 1 week', 'Decreases estradiol levels', 'Improves vitamin D utilization'] }]

          },
          {
            icon: 'lucide:shield', title: 'Pillar 4: Vitamin C 10mg', subtitle: 'The Cellular Protector — Protection & Support',
            sections: [
            { heading: 'What It Does:', items: ['Powerful antioxidant protection', 'Supports Leydig cell health', 'Enhances absorption of other nutrients', 'Reduces oxidative stress'] },
            { heading: 'The Science:', items: ['Protects testosterone-producing cells', 'Supports immune function', 'Essential for cellular repair'] }]

          }].
          map((card, i) =>
          <div className="tprime-ingredient-card" key={i}>
                            <div className="icon-wrap">
                                <iconify-icon icon={card.icon} width="22"></iconify-icon>
                            </div>
                            <h3>{card.title}</h3>
                            <p className="ingredient-subtitle">{card.subtitle}</p>
                            {card.sections.map((sec, j) =>
            <div key={j}>
                                    <h4>{sec.heading}</h4>
                                    <ul>
                                        {sec.items.map((item, k) =>
                <li key={k}>
                                                <iconify-icon icon="lucide:chevron-right" width="14"></iconify-icon>
                                                {item}
                                            </li>
                )}
                                    </ul>
                                </div>
            )}
                        </div>
          )}
                </div>
            </section>

            {/* 7. Delivery Advantage */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">Why Sublingual Changes <em>Everything</em></h2>
                <div className="tprime-delivery-grid">
                    <div className="tprime-delivery-card">
                        <h3>Oral Capsules (Competitors)</h3>
                        <ul>
                            {['First-pass liver metabolism', '40-60% lost before absorption', 'Slow, inconsistent results', 'Digestive breakdown', 'Takes 1-2 hours to absorb'].map((item, i) =>
              <li key={i}>
                                    <iconify-icon icon="lucide:x" width="16" class="icon-x"></iconify-icon>
                                    {item}
                                </li>
              )}
                        </ul>
                        <div className="tprime-delivery-result bad">→ You pay for 25mg, but only get ~10-12mg</div>
                    </div>
                    <div className="tprime-delivery-card highlight">
                        <h3>Sublingual (TPrime365™)</h3>
                        <ul>
                            {['Direct bloodstream delivery', 'Bypasses digestive system', 'Enhanced bioavailability', 'Rapid absorption (30-60 seconds)', 'Patent-pending MODS Max Gold™ technology'].map((item, i) =>
              <li key={i}>
                                    <iconify-icon icon="lucide:check" width="16" class="icon-check"></iconify-icon>
                                    {item}
                                </li>
              )}
                        </ul>
                        <div className="tprime-delivery-result good">→ You get the FULL 25mg dose working for you</div>
                    </div>
                </div>
                <div className="tprime-mods-callout">
                    <h4>MODS Max Gold™ Technology</h4>
                    <p>Our patent-pending sublingual delivery system uses microdose reactive oxygen species (ROS) to briefly open mucosal barriers, delivering enhanced absorption directly into your bloodstream.</p>
                </div>
            </section>

            {/* 8. Who Is This For */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Built For Men Who <em>Want More</em></h2>
                <div className="tprime-persona-grid">
                    {[
          { title: 'The Performer', age: 'Age 25-40', items: ['Peak performance at work', 'Competitive edge in fitness', 'Mental clarity & drive', 'Maintaining lean muscle'] },
          { title: 'The Rebuilder', age: 'Age 40-55', items: ['Energy levels declining', 'Losing muscle despite working out', 'Low libido', 'Brain fog setting in'] },
          { title: 'The Optimizer', age: 'Age 55+', items: ['Want to feel 40, not 60', 'Protect what you\'ve built', 'Stay active & vital', 'Extend healthspan'] }].
          map((persona, i) =>
          <div className="tprime-persona-card" key={i}>
                            <h3>{persona.title}</h3>
                            <span className="age-badge">{persona.age}</span>
                            <ul>
                                {persona.items.map((item, j) =>
              <li key={j}>
                                        <iconify-icon icon="lucide:chevron-right" width="14"></iconify-icon>
                                        {item}
                                    </li>
              )}
                            </ul>
                        </div>
          )}
                </div>
            </section>

            {/* 9. Benefits */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">What You'll <em>Experience</em></h2>
                <div className="tprime-benefits-grid">
                    {[
          { icon: 'lucide:flame', title: 'Energy & Drive', desc: 'Wake up ready to conquer. No more afternoon crashes.' },
          { icon: 'lucide:dumbbell', title: 'Lean Muscle Growth', desc: 'Build and maintain muscle more easily. Faster recovery.' },
          { icon: 'lucide:brain', title: 'Mental Clarity', desc: 'Sharp focus. Better decision-making. Confidence restored.' },
          { icon: 'lucide:heart', title: 'Libido & Performance', desc: 'Reignite desire. Perform like your younger self.' },
          { icon: 'lucide:zap', title: 'Faster Recovery', desc: 'Bounce back from workouts. Less soreness, more gains.' },
          { icon: 'lucide:target', title: 'Fat Loss', desc: 'Shed stubborn fat, especially around the midsection.' },
          { icon: 'lucide:moon', title: 'Better Sleep', desc: 'Deeper, more restorative rest. Wake refreshed.' },
          { icon: 'lucide:bone', title: 'Bone Density', desc: 'Stronger bones. Reduced fracture risk.' },
          { icon: 'lucide:dna', title: 'Longevity', desc: 'Cellular renewal. Healthspan extension. Age better.' }].
          map((b, i) =>
          <div className="tprime-benefit-card" key={i}>
                            <div className="icon-wrap">
                                <iconify-icon icon={b.icon} width="22"></iconify-icon>
                            </div>
                            <h4>{b.title}</h4>
                            <p>{b.desc}</p>
                        </div>
          )}
                </div>
            </section>

            {/* 10. Comparison Table */}
            <section className="b365-section" id="compare">
                <h2 className="b365-section-heading b365-serif">The Only Formula That <em>Does It All</em></h2>
                <div className="tprime-table-wrap">
                    <table className="tprime-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th className="highlight-col">TPrime365</th>
                                <th>Hims</th>
                                <th>Maximus</th>
                                <th>Strut</th>
                                <th>TRT Clinics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Price/Month</td><td className="highlight-col positive">$149 ✓</td><td>$199</td><td>$199</td><td>$119</td><td>$150-$300</td></tr>
                            <tr><td>Enclomiphene Dose</td><td className="highlight-col positive">25mg ✓</td><td>Variable</td><td>12.5-25mg</td><td>6.25-25mg</td><td className="negative">N/A</td></tr>
                            <tr><td>Delivery Method</td><td className="highlight-col positive">Sublingual</td><td>Oral pill</td><td>Oral pill</td><td>Oral pill</td><td className="negative">Injection</td></tr>
                            <tr><td>Spermidine Included</td><td className="highlight-col positive">✓ 10mg</td><td className="negative">✗</td><td className="negative">✗</td><td className="negative">✗</td><td className="negative">✗</td></tr>
                            <tr><td>Boron Included</td><td className="highlight-col positive">✓ 10mg</td><td className="negative">✗</td><td className="negative">✗</td><td className="negative">✗</td><td className="negative">✗</td></tr>
                            <tr><td>Physician Consultation</td><td className="highlight-col positive">✓ Included</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
                            <tr><td>Preserves Fertility</td><td className="highlight-col positive">✓</td><td>✓</td><td>✓</td><td>✓</td><td className="negative">✗</td></tr>
                            <tr><td>Shuts Down Natural T</td><td className="highlight-col positive">✗</td><td>✗</td><td>✗</td><td>✗</td><td className="negative">✓</td></tr>
                            <tr><td>Longevity Benefits</td><td className="highlight-col positive">✓</td><td className="negative">✗</td><td className="negative">✗</td><td className="negative">✗</td><td className="negative">✗</td></tr>
                            <tr><td>FDA-Registered Pharmacy</td><td className="highlight-col positive">✓ 503A</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
                            <tr><td>Money-Back Guarantee</td><td className="highlight-col positive">✓ Full refund</td><td>Varies</td><td>Varies</td><td>Varies</td><td className="negative">✗</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 11. Value Breakdown */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">$149 = Premium Formula + <em>Expert Care</em></h2>
                <div className="tprime-value-card">
                    <h3>What You Get with TPrime365</h3>
                    <div className="tprime-value-item"><span className="name">Enclomiphene 25mg (30-day supply)</span><span className="price">Retail Value: $99-$199</span></div>
                    <div className="tprime-value-item"><span className="name">Spermidine 10mg Supplement</span><span className="price">Retail Value: $40-$60</span></div>
                    <div className="tprime-value-item"><span className="name">Boron 10mg + Vitamin C 10mg</span><span className="price">Retail Value: $15-$25</span></div>
                    <div className="tprime-value-item"><span className="name">Licensed Physician Consultation (via HappyMD)</span><span className="price">Retail Value: $75-$150</span></div>
                    <div className="tprime-value-item special"><span className="name">Sublingual MODS Max Gold™ Delivery</span><span className="price">Patent-Pending Technology</span></div>
                    <div className="tprime-value-total">
                        <div className="row"><span>TOTAL VALUE:</span><span>$229-$434</span></div>
                        <div className="row"><span>YOUR PRICE:</span><span className="highlight-price">$149/MONTH</span></div>
                        <div className="row"><span>SAVINGS:</span><span>UP TO $285/MONTH</span></div>
                    </div>
                </div>
            </section>

            {/* 12. How It Works */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Get Started in <em>3 Simple Steps</em></h2>
                <div className="b365-steps-grid">
                    <div className="b365-step-card">
                        <div className="step-number">01</div>
                        <h3 className="b365-serif">Complete Your Order & Health Assessment</h3>
                        <p>Complete payment on our HIPAA-compliant platform. Fill out a secure online form (5 minutes) with your health information and symptoms.</p>
                    </div>
                    <div className="b365-step-card">
                        <div className="step-number">02</div>
                        <h3 className="b365-serif">Physician Review via HappyMD</h3>
                        <p>An independent licensed physician evaluates your case and determines if TPrime365 is right for you. If NOT approved: full refund processed immediately.</p>
                    </div>
                    <div className="b365-step-card">
                        <div className="step-number">03</div>
                        <h3 className="b365-serif">Receive & Start Optimizing</h3>
                        <p>Compounded at an FDA-registered 503A facility and shipped directly to your door in discreet packaging. Begin your transformation.</p>
                    </div>
                </div>
                <div className="tprime-timeline-callout">
                    <span>
                        <iconify-icon icon="lucide:clock" width="16"></iconify-icon>
                        Order to delivery: 7-10 days (if approved)
                    </span>
                    <span>
                        <iconify-icon icon="lucide:shield-check" width="16"></iconify-icon>
                        100% Money-Back Guarantee if physician does not approve
                    </span>
                </div>
            </section>

            {/* 13. Dosing Instructions */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">Simple <em>Daily Routine</em></h2>
                <div className="tprime-dosing-card">
                    <div>
                        <div className="tprime-dosing-item"><span className="label">WHEN:</span><span>30-60 minutes before bedtime</span></div>
                        <div className="tprime-dosing-item"><span className="label">HOW:</span><span>Place 1 dropper (1mL) under tongue</span></div>
                        <div className="tprime-dosing-item"><span className="label">HOLD:</span><span>30 seconds for optimal absorption</span></div>
                        <div className="tprime-dosing-item"><span className="label">SWALLOW:</span><span>Then swallow remaining liquid</span></div>
                        <p className="tprime-dosing-supply">
                            <iconify-icon icon="lucide:calendar" width="16" style={{ marginRight: 6 }}></iconify-icon>
                            Supply: 30-day supply per bottle
                        </p>
                    </div>
                    <div className="tprime-pro-tip">
                        <h4>
                            <iconify-icon icon="lucide:lightbulb" width="16"></iconify-icon>
                            For Best Results:
                        </h4>
                        <ul>
                            {['Take on an empty stomach', 'Avoid eating/drinking 15 minutes before and after', 'Store at room temperature (do not freeze)', 'Track your progress weekly'].map((item, i) =>
              <li key={i}>
                                    <iconify-icon icon="lucide:check" width="14"></iconify-icon>
                                    {item}
                                </li>
              )}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 14. Safety & Quality */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Pharmaceutical-Grade <em>Standards</em></h2>
                <div className="tprime-trust-grid">
                    {[
          { icon: 'lucide:building-2', title: 'FDA-Registered 503A Compounding Facility', desc: 'Manufactured in Salt Lake City, UT under strict quality controls' },
          { icon: 'lucide:badge-check', title: '100% Money-Back Guarantee', desc: 'Full refund if prescription not approved by independent physician' },
          { icon: 'lucide:microscope', title: 'Third-Party Tested', desc: 'Every batch verified for purity and potency' },
          { icon: 'lucide:flag', title: 'Made in the USA', desc: 'American-made, American quality' },
          { icon: 'lucide:stethoscope', title: 'Licensed Physician Oversight', desc: 'Real doctors reviewing every case' },
          { icon: 'lucide:lock', title: 'HIPAA Compliant', desc: 'Your health data stays private and secure' }].
          map((badge, i) =>
          <div className="tprime-trust-card" key={i}>
                            <div className="icon-wrap">
                                <iconify-icon icon={badge.icon} width="22"></iconify-icon>
                            </div>
                            <h4>{badge.title}</h4>
                            <p>{badge.desc}</p>
                        </div>
          )}
                </div>
            </section>

            {/* 15. Contraindications */}
            <section className="b365-section b365-section-alt">
                <div className="tprime-safety">
                    <h3>Important Safety Information</h3>
                    <p style={{ fontSize: 14, color: 'var(--b365-text-secondary)' }}>TPrime365 May Not Be Appropriate If You:</p>
                    <ul>
                        {['Have prostate cancer or breast cancer', 'Have severe liver or kidney disease', 'Are under 18 years of age', 'Are allergic to any ingredients', 'Are taking certain medications (physician will review)'].map((item, i) =>
            <li key={i}>
                                <iconify-icon icon="lucide:alert-circle" width="14"></iconify-icon>
                                {item}
                            </li>
            )}
                    </ul>
                    <p className="report">Report adverse events: 1-385-421-5651</p>
                    <p className="disclaimer">
                        This is a compounded drug for Rx ONLY. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                    </p>
                </div>
            </section>

            {/* 16. FAQ */}
            <section className="b365-section" id="faq">
                <div className="b365-faq-layout">
                    <div className="b365-faq-left">
                        <h2>Your questions, <em>answered.</em></h2>
                        <AnimatedCTA href="#" style={{ marginTop: 8 }}>
                            <iconify-icon icon="lucide:headphones" width="16"></iconify-icon>
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

            {/* 17. Final CTA */}
            <section className="b365-section">
                <div className="tprime-final-cta">
                    <h2>Ready to Reclaim Your <em>Prime?</em></h2>
                    <p className="subtitle text-primary-foreground">Join thousands of men optimizing their testosterone naturally with TPrime365™</p>
                    <div className="tprime-final-price-box">
                        <span className="big-price">$149/month</span>
                        <span className="note">Includes everything: Formula + Physician Consultation + Free Shipping</span>
                        <span className="guarantee-text">100% refunded if physician does not approve</span>
                    </div>
                    <AnimatedCTA href="#" className="btn-white-cta">
                        Order Now — Risk Free
                        <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
                    </AnimatedCTA>
                    <div className="tprime-cta-trust-points">
                        <span><iconify-icon icon="lucide:check" width="14"></iconify-icon> Licensed physician reviews every order</span>
                        <span><iconify-icon icon="lucide:check" width="14"></iconify-icon> Full refund if not approved</span>
                        <span><iconify-icon icon="lucide:check" width="14"></iconify-icon> FDA-registered compounding pharmacy</span>
                        <span><iconify-icon icon="lucide:check" width="14"></iconify-icon> Free shipping — discreet packaging</span>
                        <span><iconify-icon icon="lucide:check" width="14"></iconify-icon> Cancel subscription anytime</span>
                    </div>
                    <div className="tprime-cta-trust-strip">
                        <span><iconify-icon icon="lucide:lock" width="14"></iconify-icon> Secure Checkout</span>
                        <span><iconify-icon icon="lucide:shield-check" width="14"></iconify-icon> Money-Back Guarantee</span>
                        <span><iconify-icon icon="lucide:package" width="14"></iconify-icon> Fast Shipping</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <SharedFooter />
        </div>);

};

export default TPrime365Page;