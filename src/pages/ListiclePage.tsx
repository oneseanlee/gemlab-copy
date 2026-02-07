import React from 'react';
import './ListiclePage.css';
import '../index.css';

const ListiclePage = () => {
    return (
        <div className="listicle-container">
            {/* Hero Section */}
            <div className="hero-card">
                <div className="article-meta">
                    <span className="category-badge">MEN'S HEALTH</span>
                    <span className="meta-separator">•</span>
                    <span className="publish-date">February 7, 2026</span>
                    <span className="meta-separator">•</span>
                    <span className="read-time">4 min read</span>
                </div>

                <h1 className="hero-title">
                    5 Reasons TPrime365 Is Helping Men Optimize Their Testosterone Naturally
                </h1>
                <div className="hero-divider"></div>
                <p className="hero-subtitle">
                    Here are 5 reasons why TPrime365's 4-in-1 sublingual formula is becoming the top choice for men who struggle with low energy, declining muscle, and reduced drive — even after trying TRT clinics and other solutions.
                </p>

                <div className="author-byline">
                    <div className="author-avatar">JM</div>
                    <div className="author-info">
                        <span className="author-name">James Mitchell</span>
                        <span className="author-title">Health & Wellness Editor</span>
                    </div>
                </div>

                <div className="social-proof">
                    <span>★★★★★</span>
                    <span>Trusted By 2,500+ Men</span>
                </div>

                <div className="press-logos">
                    <img src="/images/Esquire_logo__2017__svg.avif" alt="Esquire" className="press-logo esquire" />
                    <img src="/images/BuzzFeed_9341afbe-6571-4255-aa76-6460b9611a57.avif" alt="BuzzFeed" className="press-logo buzzfeed" />
                    <img src="/images/MJ.avif" alt="Men's Journal" className="press-logo mens-journal" />
                    <img src="/images/Men_s_Health.avif" alt="Men's Health" className="press-logo mens-health" />
                </div>
            </div>

            {/* Brand Introduction */}
            <div className="brand-intro">
                <span className="brand-intro-text">A Product By</span>
                <img src="/images/best365labs-logo.png" alt="Best365Labs" className="brand-logo" />
            </div>

            {/* Product Showcase - Visual */}
            <div className="product-showcase">
                <div className="product-image-container">
                    <img src="/images/tprime-bottle.png" alt="TPrime365 Bottle" className="bottles-image" />
                </div>
            </div>

            {/* Reason 1 */}
            <div className="reason-card">
                <div className="list-number">1</div>
                <h2 className="list-title">
                    A 4-in-1 Formula That Works With Your Body, Not Against It
                </h2>
                <p className="list-description">
                    TPrime365 combines Enclomiphene (25mg), Spermidine (10mg), Boron (10mg), and Vitamin C (10mg) in one powerful sublingual formula.<br /><br />
                    Unlike TRT, it stimulates your natural testosterone production through the HPG axis — preserving fertility and testicular function.
                </p>
            </div>
            <div className="image-card testimonial-card">
                <img src="/images/testimonial-kerry-reyes.png" alt="Kerry Reyes testimonial - Early Tester" />
            </div>

            {/* Reason 2 */}
            <div className="reason-card">
                <div className="list-number">2</div>
                <h2 className="list-title">
                    Made For Men Who Want Results Without Needles
                </h2>
                <p className="list-description">
                    If you're tired of weekly injections, testicular shrinkage, and lifetime dependency, TPrime365 is your answer. Our sublingual delivery bypasses the digestive system entirely, giving you the full dose — not the 40-60% you'd lose with oral pills.
                </p>
            </div>
            <div className="image-card testimonial-card">
                <img src="/images/testimonial-sean-lee.png" alt="Sean Lee testimonial - Business Professional" />
            </div>

            {/* Reason 3 */}
            <div className="reason-card">
                <div className="list-number">3</div>
                <h2 className="list-title">
                    Physician-Verified, FDA-Registered Pharmacy
                </h2>
                <p className="list-description">
                    TPrime365 follows a <strong>physician-supervised approach</strong> to testosterone optimization.<br />
                    Every order is reviewed by a licensed physician via HappyMD.<br />
                    Compounded at an FDA-registered 503A facility in Salt Lake City, Utah.
                </p>
            </div>
            <div className="image-card step-overlay">
                <img src="/images/tprime-label.png" alt="TPrime365 Label Details" />
            </div>

            {/* Reason 4 */}
            <div className="reason-card">
                <div className="list-number">4</div>
                <h2 className="list-title">
                    Visible Results In Just 2-4 Weeks
                </h2>
                <p className="list-description">
                    Men typically see 60-664% testosterone increase within 2-4 weeks. Energy improves, brain fog lifts, libido returns, and muscle starts building more easily. By week 4, most men report feeling like themselves again — or better.
                </p>
            </div>
            <div className="image-card testimonial-card">
                <img src="/images/testimonial-brett-earnshaw.png" alt="Brett Earnshaw testimonial - Early Tester" />
            </div>

            {/* Reason 5 */}
            <div className="reason-card">
                <div className="list-number">5</div>
                <h2 className="list-title">
                    Longevity Benefits Beyond Just Testosterone
                </h2>
                <p className="list-description">
                    Spermidine activates autophagy (cellular renewal), slashes cortisol by 58%, and has been linked to 5-year survival benefits.<br /><br />
                    This isn't just testosterone optimization — it's healthspan extension.
                </p>
            </div>
            <div className="image-card testimonial-card">
                <img src="/images/testimonial-mike-vandyke.png" alt="Mike VanDyke testimonial - Early Tester" />
            </div>

            {/* Offer Banner - Top */}
            <div className="travel-kit-banner">
                <div className="offer-content">
                    <h2 className="offer-title">LIMITED TIME OFFER<br />$149/month</h2>
                    <p className="offer-description">
                        Order TPrime365 today. Includes licensed physician consultation via HappyMD. If not approved, you receive a full refund — no questions asked.
                    </p>
                    <div className="countdown-timer">
                        <div className="time-box">
                            <span className="time-value">00</span>
                            <span className="time-label">Day</span>
                        </div>
                        <div className="time-box">
                            <span className="time-value">00</span>
                            <span className="time-label">Hrs</span>
                        </div>
                        <div className="time-box">
                            <span className="time-value">00</span>
                            <span className="time-label">Min</span>
                        </div>
                    </div>
                    <button className="cta-button">START YOUR OPTIMIZATION</button>
                </div>
                <div className="offer-image">
                    <img src="/images/tprime-risk-free.png" alt="TPrime365 Risk Free Guarantee" />
                </div>
            </div>

            {/* Founders Testimonials Section */}
            <div className="founders-section">
                <h2 className="founders-title">From The Founders</h2>
                <p className="founders-subtitle">The minds behind TPrime365 share their vision</p>
                <div className="founders-grid">
                    <div className="founder-card">
                        <img src="/images/testimonial-darren-lopez.png" alt="Darren Lopez - Co-Founder" />
                    </div>
                    <div className="founder-card">
                        <img src="/images/testimonial-dan-schmidt.png" alt="Dan Schmidt - Co-Founder" />
                    </div>
                </div>
            </div>

            {/* Comparison Section */}
            <div className="comparison-section">
                <h2 className="comparison-title">TPrime365 vs Traditional Alternatives</h2>
                <div className="comparison-table">
                    {/* Headers Column */}
                    <div className="comparison-header-col">
                        <div className="comparison-header-row">Ratings</div>
                        <div className="comparison-header-row">Product Info</div>
                        <div className="comparison-header-row">Pros</div>
                        <div className="comparison-header-row" style={{ borderBottom: 'none' }}>Cons</div>
                    </div>

                    {/* TPrime365 Column */}
                    <div className="comparison-col gemlab">
                        <div className="col-image">
                            <img src="/images/tprime-product-benefits.png" alt="TPrime365 Bottle" />
                        </div>
                        <div className="col-brand-name">TPrime365</div>

                        <div className="comparison-row">
                            <div className="rating-stars">
                                4.9/5 ★★★★★
                            </div>
                        </div>

                        <div className="comparison-row">
                            TPrime365 is the only 4-in-1 testosterone optimizer with sublingual delivery. Enclomiphene + Spermidine + Boron + Vitamin C, physician-supervised, FDA-registered pharmacy.
                        </div>

                        <div className="comparison-row">
                            <div className="check-list-item"><span className="check-icon">✓</span> 60-664% testosterone increase in 2-4 weeks</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Preserves natural production & fertility</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Sublingual delivery - full dose absorbed</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Longevity benefits (autophagy activation)</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Physician consultation included</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Money-back guarantee if not approved</div>
                        </div>

                        <div className="comparison-row" style={{ borderBottom: 'none' }}>
                            <div className="check-list-item"><span className="check-icon" style={{ color: '#EF4444' }}>⊗</span> Requires consistent daily use</div>
                            <div className="check-list-item"><span className="check-icon" style={{ color: '#EF4444' }}>⊗</span> Prescription required (physician must approve)</div>
                        </div>
                    </div>

                    {/* Competitor Column */}
                    <div className="comparison-col competitor">
                        <div className="col-image" style={{ background: '#E2E8F0', borderRadius: '1rem' }}>
                            <div style={{ color: '#94A3B8', fontWeight: 'bold' }}>TRT CLINIC</div>
                        </div>
                        <div className="col-brand-name">Traditional TRT Clinics</div>

                        <div className="comparison-row">
                            <div className="rating-stars" style={{ color: '#64748B' }}>
                                3.8/5 ★★★★☆
                            </div>
                        </div>

                        <div className="comparison-row">
                            Traditional TRT clinics use testosterone injections that shut down natural production, cause testicular atrophy, and create lifetime dependency.
                        </div>

                        <div className="comparison-row">
                            <div className="check-list-item"><span className="check-icon good">✓</span> Immediate testosterone increase</div>
                            <div className="check-list-item"><span className="check-icon good">✓</span> Widely available</div>
                            <div className="check-list-item"><span className="check-icon good">✓</span> Established treatment protocol</div>
                        </div>

                        <div className="comparison-row" style={{ borderBottom: 'none' }}>
                            <div className="check-list-item"><span className="check-icon bad">⊗</span> Shuts down natural production</div>
                            <div className="check-list-item"><span className="check-icon bad">⊗</span> Testicular atrophy guaranteed</div>
                            <div className="check-list-item"><span className="check-icon bad">⊗</span> Fertility often destroyed</div>
                            <div className="check-list-item"><span className="check-icon bad">⊗</span> Weekly injections required</div>
                            <div className="check-list-item"><span className="check-icon bad">⊗</span> Lifetime dependency</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Offer Banner - Bottom */}
            <div className="travel-kit-banner">
                <div className="offer-content">
                    <h2 className="offer-title">LIMITED TIME OFFER<br />$149/month</h2>
                    <p className="offer-description">
                        Order TPrime365 today. Includes licensed physician consultation via HappyMD. If not approved, you receive a full refund — no questions asked.
                    </p>
                    <div className="countdown-timer">
                        <div className="time-box">
                            <span className="time-value">00</span>
                            <span className="time-label">Day</span>
                        </div>
                        <div className="time-box">
                            <span className="time-value">00</span>
                            <span className="time-label">Hrs</span>
                        </div>
                        <div className="time-box">
                            <span className="time-value">00</span>
                            <span className="time-label">Min</span>
                        </div>
                    </div>
                    <button className="cta-button">START YOUR OPTIMIZATION</button>
                </div>
                <div className="offer-image">
                    <img src="/images/tprime-whats-included.png" alt="TPrime365 What's Included Bundle" />
                </div>
            </div>

            {/* Footer Legal */}
            <div className="legal-footer">
                <p className="legal-text">
                    *TPrime365 is a prescription-only compound. All orders require physician approval via HappyMD. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Compounded at an FDA-registered 503A pharmacy in Salt Lake City, Utah.
                </p>
                <div className="copyright">
                    © 2025, Best365Labs. <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Terms of Service</a> | <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default ListiclePage;
