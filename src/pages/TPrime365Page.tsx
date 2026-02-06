import React, { useState } from 'react';
import './TPrime365Page.css';

const TPrime365Page = () => {
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
        }
    ];

    return (
        <div className="tprime-container">
            {/* Header */}
            <div className="tprime-header">
                <div className="tprime-logo">TPrime365™</div>
            </div>

            {/* Hero Section */}
            <div className="tprime-hero-card">
                <h1 className="tprime-hero-title">
                    The Only 4-in-1 Testosterone Optimizer<br />
                    With Sublingual Delivery
                </h1>
                <div className="tprime-hero-divider"></div>
                <p className="tprime-hero-subtitle">
                    <strong>Enclomiphene + Spermidine + Boron + Vitamin C</strong><br />
                    Prescription-grade testosterone optimization for men who demand more
                </p>
                <div className="tprime-price-banner">
                    <span className="price">$149/month</span>
                    <span className="price-note">Includes Licensed Physician Consultation via HappyMD</span>
                </div>
                <p className="tprime-guarantee">If not approved by physician, fully refunded</p>
                <button className="tprime-cta-button">START YOUR OPTIMIZATION →</button>
            </div>

            {/* Section 1: The Problem */}
            <div className="section-header">
                <h2 className="section-title">Traditional Testosterone Solutions Are Broken</h2>
            </div>

            <div className="problem-cards-grid">
                <div className="problem-card">
                    <div className="problem-icon">❌</div>
                    <h3 className="problem-title">Injectable TRT</h3>
                    <ul className="problem-list">
                        <li>Shuts down natural production</li>
                        <li>Testicular atrophy guaranteed</li>
                        <li>Fertility destroyed</li>
                        <li>Lifetime dependency</li>
                    </ul>
                </div>
                <div className="problem-card">
                    <div className="problem-icon">❌</div>
                    <h3 className="problem-title">Oral Pills</h3>
                    <ul className="problem-list">
                        <li>Poor absorption (first-pass liver metabolism)</li>
                        <li>Inconsistent results</li>
                        <li>Half the dose wasted</li>
                        <li>Daily capsule hassle</li>
                    </ul>
                </div>
                <div className="problem-card">
                    <div className="problem-icon">❌</div>
                    <h3 className="problem-title">Single-Ingredient Solutions</h3>
                    <ul className="problem-list">
                        <li>One-dimensional approach</li>
                        <li>Missing synergistic compounds</li>
                        <li>Expensive to stack separately</li>
                        <li>No longevity benefits</li>
                    </ul>
                </div>
            </div>

            {/* Section 2: The Solution */}
            <div className="solution-section">
                <h2 className="section-title">TPrime365™: Your Natural Testosterone, Amplified</h2>
                <div className="pillars-diagram">
                    <div className="pillar-box">
                        <span className="pillar-name">ENCLOMIPHENE</span>
                        <span className="pillar-dose">25mg</span>
                    </div>
                    <div className="pillar-box">
                        <span className="pillar-name">SPERMIDINE</span>
                        <span className="pillar-dose">10mg</span>
                    </div>
                    <div className="pillar-box">
                        <span className="pillar-name">BORON</span>
                        <span className="pillar-dose">10mg</span>
                    </div>
                    <div className="pillar-box">
                        <span className="pillar-name">VITAMIN C</span>
                        <span className="pillar-dose">10mg</span>
                    </div>
                </div>
                <div className="delivery-badge">
                    SUBLINGUAL DELIVERY via MODS Max Gold™
                </div>
                <p className="formula-tagline">4 Clinically-Proven Ingredients. 1 Powerful Formula.</p>
            </div>

            {/* Section 3: Ingredient Breakdown */}
            <div className="section-header">
                <h2 className="section-title">The Science Behind Each Pillar</h2>
            </div>

            <div className="ingredient-grid">
                <div className="ingredient-card">
                    <div className="ingredient-badge">🧬</div>
                    <h3 className="ingredient-title">PILLAR 1: ENCLOMIPHENE 25mg</h3>
                    <p className="ingredient-subtitle">The Foundation — Hormone Optimization</p>
                    <div className="ingredient-section">
                        <h4>What It Does:</h4>
                        <ul>
                            <li>Blocks estrogen receptors at the pituitary</li>
                            <li>Signals your body to produce MORE testosterone naturally</li>
                            <li>Increases LH & FSH (the hormones that make testosterone)</li>
                            <li>Preserves fertility & testicular function</li>
                        </ul>
                    </div>
                    <div className="ingredient-section">
                        <h4>The Science:</h4>
                        <ul>
                            <li>60-664% testosterone increase in 2-4 weeks</li>
                            <li>Non-hormonal: Won't shut down your natural production</li>
                            <li>Fertility-safe: Keeps sperm production active</li>
                        </ul>
                    </div>
                </div>

                <div className="ingredient-card">
                    <div className="ingredient-badge">⚡</div>
                    <h3 className="ingredient-title">PILLAR 2: SPERMIDINE 10mg</h3>
                    <p className="ingredient-subtitle">The Longevity Amplifier — Testosterone + Longevity</p>
                    <div className="ingredient-section">
                        <h4>What It Does:</h4>
                        <ul>
                            <li>Boosts testosterone production directly (+48.9% in men under 50)</li>
                            <li>Slashes cortisol by 58% (the testosterone killer)</li>
                            <li>Reduces estradiol by 55.9% in 83% of men</li>
                            <li>Activates autophagy (cellular renewal & anti-aging)</li>
                        </ul>
                    </div>
                    <div className="ingredient-section">
                        <h4>The Science:</h4>
                        <ul>
                            <li>5-year survival benefit in epidemiological studies</li>
                            <li>40% reduction in fatal heart failure risk</li>
                            <li>Supports Leydig cell function (where testosterone is made)</li>
                        </ul>
                    </div>
                </div>

                <div className="ingredient-card">
                    <div className="ingredient-badge">💪</div>
                    <h3 className="ingredient-title">PILLAR 3: BORON 10mg</h3>
                    <p className="ingredient-subtitle">The Free Testosterone Liberator — Strength & Vitality</p>
                    <div className="ingredient-section">
                        <h4>What It Does:</h4>
                        <ul>
                            <li>Increases FREE testosterone (the usable form)</li>
                            <li>Reduces SHBG (the protein that binds testosterone)</li>
                            <li>Supports bone density & strength</li>
                            <li>Reduces inflammation</li>
                        </ul>
                    </div>
                    <div className="ingredient-section">
                        <h4>The Science:</h4>
                        <ul>
                            <li>28% increase in free testosterone in 1 week</li>
                            <li>Decreases estradiol levels</li>
                            <li>Improves vitamin D utilization</li>
                        </ul>
                    </div>
                </div>

                <div className="ingredient-card">
                    <div className="ingredient-badge">🛡️</div>
                    <h3 className="ingredient-title">PILLAR 4: VITAMIN C 10mg</h3>
                    <p className="ingredient-subtitle">The Cellular Protector — Protection & Support</p>
                    <div className="ingredient-section">
                        <h4>What It Does:</h4>
                        <ul>
                            <li>Powerful antioxidant protection</li>
                            <li>Supports Leydig cell health</li>
                            <li>Enhances absorption of other nutrients</li>
                            <li>Reduces oxidative stress</li>
                        </ul>
                    </div>
                    <div className="ingredient-section">
                        <h4>The Science:</h4>
                        <ul>
                            <li>Protects testosterone-producing cells</li>
                            <li>Supports immune function</li>
                            <li>Essential for cellular repair</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Section 4: Delivery Advantage */}
            <div className="section-header">
                <h2 className="section-title">Why Sublingual Changes Everything</h2>
            </div>

            <div className="delivery-comparison">
                <div className="delivery-col competitor">
                    <h3 className="delivery-col-title">ORAL CAPSULES (Competitors)</h3>
                    <ul className="delivery-list cons">
                        <li>❌ First-pass liver metabolism</li>
                        <li>❌ 40-60% lost before absorption</li>
                        <li>❌ Slow, inconsistent results</li>
                        <li>❌ Digestive breakdown</li>
                        <li>❌ Takes 1-2 hours to absorb</li>
                    </ul>
                    <p className="delivery-result bad">→ You pay for 25mg, but only get ~10-12mg</p>
                </div>
                <div className="delivery-col tprime">
                    <h3 className="delivery-col-title">SUBLINGUAL (TPrime365™)</h3>
                    <ul className="delivery-list pros">
                        <li>✅ Direct bloodstream delivery</li>
                        <li>✅ Bypasses digestive system</li>
                        <li>✅ Enhanced bioavailability</li>
                        <li>✅ Rapid absorption (30-60 seconds)</li>
                        <li>✅ Patent-pending MODS Max Gold™ technology</li>
                    </ul>
                    <p className="delivery-result good">→ You get the FULL 25mg dose working for you</p>
                </div>
            </div>

            <div className="mods-callout">
                <h4>MODS Max Gold™ Technology</h4>
                <p>Our patent-pending sublingual delivery system uses microdose reactive oxygen species (ROS) to briefly open mucosal barriers, delivering enhanced absorption directly into your bloodstream.</p>
            </div>

            {/* Section 5: Who Is This For */}
            <div className="section-header">
                <h2 className="section-title">Built For Men Who Want More</h2>
            </div>

            <div className="persona-grid">
                <div className="persona-card">
                    <h3 className="persona-title">THE PERFORMER</h3>
                    <span className="persona-age">Age 25-40</span>
                    <ul className="persona-list">
                        <li>Peak performance at work</li>
                        <li>Competitive edge in fitness</li>
                        <li>Mental clarity & drive</li>
                        <li>Maintaining lean muscle</li>
                    </ul>
                </div>
                <div className="persona-card">
                    <h3 className="persona-title">THE REBUILDER</h3>
                    <span className="persona-age">Age 40-55</span>
                    <ul className="persona-list">
                        <li>Energy levels declining</li>
                        <li>Losing muscle despite working out</li>
                        <li>Low libido</li>
                        <li>Brain fog setting in</li>
                    </ul>
                </div>
                <div className="persona-card">
                    <h3 className="persona-title">THE OPTIMIZER</h3>
                    <span className="persona-age">Age 55+</span>
                    <ul className="persona-list">
                        <li>Want to feel 40, not 60</li>
                        <li>Protect what you've built</li>
                        <li>Stay active & vital</li>
                        <li>Extend healthspan</li>
                    </ul>
                </div>
            </div>

            {/* Section 6: Benefits */}
            <div className="section-header">
                <h2 className="section-title">What You'll Experience</h2>
            </div>

            <div className="benefits-grid">
                <div className="benefit-item">
                    <span className="benefit-icon">🔥</span>
                    <h4>Energy & Drive</h4>
                    <p>Wake up ready to conquer. No more afternoon crashes.</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">💪</span>
                    <h4>Lean Muscle Growth</h4>
                    <p>Build and maintain muscle more easily. Faster recovery.</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">🧠</span>
                    <h4>Mental Clarity</h4>
                    <p>Sharp focus. Better decision-making. Confidence restored.</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">❤️</span>
                    <h4>Libido & Performance</h4>
                    <p>Reignite desire. Perform like your younger self.</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">⚡</span>
                    <h4>Faster Recovery</h4>
                    <p>Bounce back from workouts. Less soreness, more gains.</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">🎯</span>
                    <h4>Fat Loss</h4>
                    <p>Shed stubborn fat, especially around the midsection.</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">😴</span>
                    <h4>Better Sleep</h4>
                    <p>Deeper, more restorative rest. Wake refreshed.</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">🦴</span>
                    <h4>Bone Density</h4>
                    <p>Stronger bones. Reduced fracture risk.</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">🧬</span>
                    <h4>Longevity</h4>
                    <p>Cellular renewal. Healthspan extension. Age better.</p>
                </div>
            </div>

            {/* Section 7: Comparison Table */}
            <div className="section-header">
                <h2 className="section-title">The Only Formula That Does It All</h2>
            </div>

            <div className="comparison-table-wrapper">
                <table className="comparison-table-full">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th className="highlight">TPrime365</th>
                            <th>Hims</th>
                            <th>Maximus</th>
                            <th>Strut</th>
                            <th>TRT Clinics</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Price/Month</td>
                            <td className="highlight">$149 ✓</td>
                            <td>$199</td>
                            <td>$199</td>
                            <td>$119</td>
                            <td>$150-$300</td>
                        </tr>
                        <tr>
                            <td>Enclomiphene Dose</td>
                            <td className="highlight">25mg ✓</td>
                            <td>Variable</td>
                            <td>12.5-25mg</td>
                            <td>6.25-25mg</td>
                            <td>N/A</td>
                        </tr>
                        <tr>
                            <td>Delivery Method</td>
                            <td className="highlight">Sublingual</td>
                            <td>Oral pill</td>
                            <td>Oral pill</td>
                            <td>Oral pill</td>
                            <td>Injection</td>
                        </tr>
                        <tr>
                            <td>Spermidine Included</td>
                            <td className="highlight">✓ 10mg</td>
                            <td>✗</td>
                            <td>✗</td>
                            <td>✗</td>
                            <td>✗</td>
                        </tr>
                        <tr>
                            <td>Boron Included</td>
                            <td className="highlight">✓ 10mg</td>
                            <td>✗</td>
                            <td>✗</td>
                            <td>✗</td>
                            <td>✗</td>
                        </tr>
                        <tr>
                            <td>Physician Consultation</td>
                            <td className="highlight">✓ Included</td>
                            <td>✓</td>
                            <td>✓</td>
                            <td>✓</td>
                            <td>✓</td>
                        </tr>
                        <tr>
                            <td>Preserves Fertility</td>
                            <td className="highlight">✓</td>
                            <td>✓</td>
                            <td>✓</td>
                            <td>✓</td>
                            <td>✗</td>
                        </tr>
                        <tr>
                            <td>Shuts Down Natural T</td>
                            <td className="highlight">✗</td>
                            <td>✗</td>
                            <td>✗</td>
                            <td>✗</td>
                            <td>✓</td>
                        </tr>
                        <tr>
                            <td>Longevity Benefits</td>
                            <td className="highlight">✓</td>
                            <td>✗</td>
                            <td>✗</td>
                            <td>✗</td>
                            <td>✗</td>
                        </tr>
                        <tr>
                            <td>FDA-Registered Pharmacy</td>
                            <td className="highlight">✓ 503A</td>
                            <td>✓</td>
                            <td>✓</td>
                            <td>✓</td>
                            <td>✓</td>
                        </tr>
                        <tr>
                            <td>Money-Back Guarantee</td>
                            <td className="highlight">✓ Full refund</td>
                            <td>Varies</td>
                            <td>Varies</td>
                            <td>Varies</td>
                            <td>✗</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Section 8: Value Breakdown */}
            <div className="section-header">
                <h2 className="section-title">$149 = Premium Formula + Expert Care</h2>
            </div>

            <div className="value-stack-card">
                <h3>WHAT YOU GET WITH TPRIME365</h3>
                <div className="value-item">
                    <span className="value-name">Enclomiphene 25mg (30-day supply)</span>
                    <span className="value-price">Retail Value: $99-$199</span>
                </div>
                <div className="value-item">
                    <span className="value-name">Spermidine 10mg Supplement</span>
                    <span className="value-price">Retail Value: $40-$60</span>
                </div>
                <div className="value-item">
                    <span className="value-name">Boron 10mg + Vitamin C 10mg</span>
                    <span className="value-price">Retail Value: $15-$25</span>
                </div>
                <div className="value-item">
                    <span className="value-name">Licensed Physician Consultation (via HappyMD)</span>
                    <span className="value-price">Retail Value: $75-$150</span>
                </div>
                <div className="value-item special">
                    <span className="value-name">Sublingual MODS Max Gold™ Delivery</span>
                    <span className="value-price">Patent-Pending Technology</span>
                </div>
                <div className="value-total">
                    <div className="total-row">
                        <span>TOTAL VALUE:</span>
                        <span>$229-$434</span>
                    </div>
                    <div className="your-price-row">
                        <span>YOUR PRICE:</span>
                        <span className="highlight-price">$149/MONTH</span>
                    </div>
                    <div className="savings-row">
                        <span>SAVINGS:</span>
                        <span>UP TO $285/MONTH</span>
                    </div>
                </div>
            </div>

            {/* Section 9: How It Works */}
            <div className="section-header">
                <h2 className="section-title">Get Started in 3 Simple Steps</h2>
            </div>

            <div className="process-steps">
                <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-icon">📝</div>
                    <h4>Complete Your Order & Health Assessment</h4>
                    <ul>
                        <li>Complete payment — HIPAA-compliant platform</li>
                        <li>Fill out secure online form (5 minutes)</li>
                        <li>Enter health information and symptoms</li>
                    </ul>
                </div>
                <div className="process-arrow">↓</div>
                <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-icon">👨‍⚕️</div>
                    <h4>Physician Review via HappyMD</h4>
                    <ul>
                        <li>Independent licensed physician evaluates your case</li>
                        <li>Determines if TPrime365 is right for you</li>
                        <li>If NOT approved: Full refund processed immediately</li>
                        <li>If approved: Prescription issued and sent to pharmacy</li>
                    </ul>
                </div>
                <div className="process-arrow">↓</div>
                <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-icon">📦</div>
                    <h4>Receive & Start Optimizing</h4>
                    <ul>
                        <li>Compounded at FDA-registered 503A facility</li>
                        <li>Shipped directly to your door (discreet packaging)</li>
                        <li>Begin your transformation</li>
                    </ul>
                </div>
            </div>

            <div className="timeline-callout">
                <span>⏱️ Order to delivery: 7-10 days (if approved)</span>
                <span>💯 100% Money-Back Guarantee if physician does not approve</span>
            </div>

            {/* Section 10: Dosing Instructions */}
            <div className="section-header">
                <h2 className="section-title">Simple Daily Routine</h2>
            </div>

            <div className="dosing-card">
                <div className="dosing-main">
                    <div className="dosing-item">
                        <span className="dosing-label">WHEN:</span>
                        <span>30-60 minutes before bedtime</span>
                    </div>
                    <div className="dosing-item">
                        <span className="dosing-label">HOW:</span>
                        <span>Place 1 dropper (1mL) under tongue</span>
                    </div>
                    <div className="dosing-item">
                        <span className="dosing-label">HOLD:</span>
                        <span>30 seconds for optimal absorption</span>
                    </div>
                    <div className="dosing-item">
                        <span className="dosing-label">SWALLOW:</span>
                        <span>Then swallow remaining liquid</span>
                    </div>
                    <p className="dosing-supply">📅 Supply: 30-day supply per bottle</p>
                </div>
                <div className="pro-tip-box">
                    <h4>💡 For Best Results:</h4>
                    <ul>
                        <li>Take on an empty stomach</li>
                        <li>Avoid eating/drinking 15 minutes before and after</li>
                        <li>Store at room temperature (do not freeze)</li>
                        <li>Track your progress weekly</li>
                    </ul>
                </div>
            </div>

            {/* Section 11: Safety & Quality */}
            <div className="section-header">
                <h2 className="section-title">Pharmaceutical-Grade Standards</h2>
            </div>

            <div className="trust-badges-grid">
                <div className="trust-badge">
                    <span className="trust-icon">🏛️</span>
                    <h4>FDA-Registered 503A Compounding Facility</h4>
                    <p>Manufactured in Salt Lake City, UT under strict quality controls</p>
                </div>
                <div className="trust-badge">
                    <span className="trust-icon">✅</span>
                    <h4>100% Money-Back Guarantee</h4>
                    <p>Full refund if prescription not approved by independent physician</p>
                </div>
                <div className="trust-badge">
                    <span className="trust-icon">🔬</span>
                    <h4>Third-Party Tested</h4>
                    <p>Every batch verified for purity and potency</p>
                </div>
                <div className="trust-badge">
                    <span className="trust-icon">🇺🇸</span>
                    <h4>Made in the USA</h4>
                    <p>American-made, American quality</p>
                </div>
                <div className="trust-badge">
                    <span className="trust-icon">👨‍⚕️</span>
                    <h4>Licensed Physician Oversight</h4>
                    <p>Real doctors reviewing every case</p>
                </div>
                <div className="trust-badge">
                    <span className="trust-icon">🔒</span>
                    <h4>HIPAA Compliant</h4>
                    <p>Your health data stays private and secure</p>
                </div>
            </div>

            {/* Section 12: Contraindications */}
            <div className="safety-section">
                <h3>Important Safety Information</h3>
                <p>TPrime365 May Not Be Appropriate If You:</p>
                <ul className="contraindications-list">
                    <li>Have prostate cancer or breast cancer</li>
                    <li>Have severe liver or kidney disease</li>
                    <li>Are under 18 years of age</li>
                    <li>Are allergic to any ingredients</li>
                    <li>Are taking certain medications (physician will review)</li>
                </ul>
                <p className="report-adverse">Report adverse events: 1-385-421-5651</p>
                <p className="disclaimer">
                    This is a compounded drug for Rx ONLY. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
            </div>

            {/* Section 13: FAQ */}
            <div className="section-header">
                <h2 className="section-title">Your Questions, Answered</h2>
            </div>

            <div className="faq-section">
                {faqItems.map((item, index) => (
                    <div key={index} className="faq-item">
                        <button 
                            className={`faq-header ${openFaq === index ? 'active' : ''}`}
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                            <span>{item.question}</span>
                            <span className="faq-arrow">{openFaq === index ? '▲' : '▼'}</span>
                        </button>
                        {openFaq === index && (
                            <div className="faq-content">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Section 14: Testimonials Placeholder */}
            <div className="testimonials-section">
                <h2 className="section-title">Real Men, Real Results</h2>
                <p className="testimonials-placeholder">[Testimonials coming soon]</p>
            </div>

            {/* Section 15: Final CTA */}
            <div className="final-cta-card">
                <h2 className="final-cta-title">Ready to Reclaim Your Prime?</h2>
                <p className="final-cta-subtitle">Join thousands of men optimizing their testosterone naturally with TPrime365™</p>
                <div className="final-price-callout">
                    <span className="final-price">$149/month</span>
                    <span className="final-price-note">Includes everything: Formula + Physician Consultation + Free Shipping</span>
                    <span className="final-guarantee">100% refunded if physician does not approve</span>
                </div>
                <button className="tprime-cta-button large">ORDER NOW — RISK-FREE →</button>
                <div className="cta-trust-points">
                    <span>✓ Licensed physician reviews every order</span>
                    <span>✓ Full refund if not approved</span>
                    <span>✓ FDA-registered compounding pharmacy</span>
                    <span>✓ Free shipping — discreet packaging</span>
                    <span>✓ Cancel subscription anytime</span>
                </div>
                <div className="cta-trust-strip">
                    <span>🔒 Secure Checkout</span>
                    <span>💯 Money-Back Guarantee</span>
                    <span>📦 Fast Shipping</span>
                </div>
            </div>

            {/* Footer */}
            <footer className="tprime-footer">
                <div className="footer-company">
                    <p>Compounded by an FDA-Registered 503A Facility for Best365Labs</p>
                    <p>Salt Lake City, Utah</p>
                    <p><a href="https://best365labs.com">best365labs.com</a></p>
                </div>
                <div className="footer-contact">
                    <p>Questions? <a href="mailto:support@best365labs.com">support@best365labs.com</a> | 1-385-421-5651</p>
                </div>
                <div className="footer-physician">
                    <p>Physician consultations facilitated by HappyMD</p>
                    <p>Independent licensed healthcare providers</p>
                </div>
                <div className="footer-legal">
                    <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a>
                </div>
                <p className="footer-copyright">© 2025 Best365Labs. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TPrime365Page;
