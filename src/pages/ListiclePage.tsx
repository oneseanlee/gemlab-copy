import React from 'react';
import './ListiclePage.css';
import '../index.css';

// Using local images if available, otherwise placeholders, but mapped to the Source Images folder where possible
import cedarwoodImg from '../../Source Images/Cedarwood_dce964ee-7b55-4b81-9aee-e34c406886f6.webp';
import almondImg from '../../Source Images/Almond_Milk_47e93f36-efa0-4408-8b2c-e687cc6f0933.webp';
import sunflowerImg from '../../Source Images/Citrus_Herb_13762097-0fc0-4c76-97d0-8789cb32b42f.webp'; // Using Citrus Herb as placeholder for 3rd ingredient
import sec3Img from '../../Source Images/sec3.webp'; // Using sec3 for reason 3 (steps likely?) or sec2?
import sec2Img from '../../Source Images/sec2.webp';
import sec4Img from '../../Source Images/sec4.webp';
import heroImg from '../../Source Images/shutterstock_2492074411_2619622d-2a1a-4eae-8396-e3cbc16d9744.webp'; // Placeholder for bottles main shot?
import menFaceWashImg from '../../Source Images/shutterstock_2492074411-2.webp';
// Using the same hero image as placeholder for Kit if specific kit image not available, or sec2?
// Actually let's use the sec2Img for now or find another one. 
// I will just reuse one of the existing defined images or map a new one if I see a better fit.
// Let's use the main hero image as the 'Kit' placeholder since it shows 3 bottles often.
const shutterstockKitImg = heroImg;

const ListiclePage = () => {
    return (
        <div className="listicle-container">
            <div className="advertorial-banner">
                Advertorial
            </div>

            <div className="listicle-header">
                <div className="gemlab-logo">GEMLAB</div>
            </div>

            {/* Hero Section */}
            <div className="hero-card">
                <h1 className="hero-title">
                    5 Reasons GemLab Is Helping Men Fix Their Skin Faster
                </h1>
                <div className="hero-divider"></div>
                <p className="hero-subtitle">
                    Here are 5 reasons why GemLab's botanical body care system is becoming the top choice for men who struggle with dry, itchy, or easily irritated skin — even after trying countless products from big brands.
                </p>

                <div className="social-proof">
                    <span>Trusted By 1,200+ Men</span>
                    <span className="stars">★★★★★</span>
                    <span>Real Reviews & Proven Results</span>
                </div>

                <div className="press-logos">
                    <img src="/images/Esquire_logo__2017__svg.avif" alt="Esquire" className="press-logo esquire" />
                    <img src="/images/BuzzFeed_9341afbe-6571-4255-aa76-6460b9611a57.avif" alt="BuzzFeed" className="press-logo buzzfeed" />
                    <img src="/images/MJ.avif" alt="Men's Journal" className="press-logo mens-journal" />
                    <img src="/images/Men_s_Health.avif" alt="Men's Health" className="press-logo mens-health" />
                </div>
            </div>

            {/* Product Showcase - Visual (Reason 0/Intro) */}
            <div className="product-showcase">
                <div className="product-image-container">
                    <img src="/images/listicle-2.webp" alt="GemLab Bottles" className="bottles-image" />
                </div>
            </div>

            {/* Reason 1 */}
            {/* Reason 1 */}
            <div className="reason-card">
                <div className="list-number">1</div>
                <h2 className="list-title">
                    A Botanical-Based Formula That Protects Men's Skin
                </h2>
                <p className="list-description">
                    GemLab is different. Its botanical-based formula, featuring natural ingredients like oat extract, aloe, and chamomile, is designed to soothe sensitive skin while supporting a healthier moisture barrier.<br /><br />
                    And yes — it cleans deeply without stripping.
                </p>
            </div>
            <div className="image-card">
                <img src={sec2Img} alt="Man showering" />
            </div>

            {/* Reason 2 */}
            <div className="reason-card">
                <div className="list-number">2</div>
                <h2 className="list-title">
                    Made For Sensitive, Easily Irritated Skin
                </h2>
                <p className="list-description">
                    If you're a guy who burns, flakes, or gets irritated easily, it's not your fault. GemLab was made for men with easily irritated or inflamed skin. Finally, a body wash and lotion that doesn't cause more problems than it solves. Men say they didn't realize how harsh their old products were until they switched.
                </p>
            </div>
            <div className="image-card">
                <img src={almondImg} alt="Soothing Almond Milk Ingredient" />
            </div>

            {/* Reason 3 */}
            {/* Reason 3 */}
            <div className="reason-card">
                <div className="list-number">3</div>
                <h2 className="list-title">
                    Dermatologist-Verified, Safe For Daily Use
                </h2>
                <p className="list-description">
                    GemLab follows a <strong>science-backed 3-step approach</strong> to healthier skin.<br />
                    Dermatologists love it for one reason:<br />
                    It's made for male skin thickness and oil levels, not repurposed from generic formulas.
                </p>
            </div>
            <div className="image-card step-overlay">
                <img src={sec3Img} alt="3 Step Process on Skin" />
            </div>

            {/* Reason 4 */}
            <div className="reason-card">
                <div className="list-number">4</div>
                <h2 className="list-title">
                    Visible Results In Just A Few Days
                </h2>
                <p className="list-description">
                    GemLab's pH-balanced, moisture-restoring formula begins showing improvements within just a few days. Men often notice that rough patches feel softer, itchiness on the arms and legs decreases, and the tight, uncomfortable feeling after showering starts to fade. Even typically dry areas like the elbows, knees, and hands become noticeably smoother. Many users report that by the end of the first weekend, their skin already feels calmer, softer, and more comfortable overall.
                </p>
            </div>
            <div className="image-card">
                <img src={sec4Img} alt="Before and After Results" />
            </div>

            {/* Reason 5 */}
            <div className="reason-card">
                <div className="list-number">5</div>
                <h2 className="list-title">
                    Lightweight Body Care That Feels Like Skincare
                </h2>
                <p className="list-description">
                    And because it uses naturally derived ingredients, your skin gets hydration that lasts longer — without artificial fragrances or chemicals that dry you out.<br />
                    It's body care, but with the thoughtfulness of a premium skincare routine.<br />
                    Your skin doesn't just look better — it feels healthier.
                </p>
            </div>
            <div className="image-card">
                <img src={menFaceWashImg} alt="Man applying face wash" />
            </div>

            {/* Travel Kit Offer Banner - Top Duplicate */}
            <div className="travel-kit-banner">
                <div className="offer-content">
                    <h2 className="offer-title">UPGRADE YOUR ROUTINE<br />FREE TRAVEL KIT</h2>
                    <p className="offer-description">
                        Buy any GemLab product today and receive a complimentary Travel Kit Box — perfect for gym bags, trips, and daily carry.
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
                    <button className="cta-button">Check Availability</button>
                </div>
                <div className="offer-image">
                    <img src={shutterstockKitImg} alt="GemLab Travel Kit Box" />
                </div>
            </div>

            {/* Comparison Section */}
            <div className="comparison-section">
                <h2 className="comparison-title">Gemlab's Formula For Men Vs Alternatives</h2>
                <div className="comparison-table">
                    {/* Headers Column */}
                    <div className="comparison-header-col">
                        <div className="comparison-header-row">Ratings</div>
                        <div className="comparison-header-row">Product Info</div>
                        <div className="comparison-header-row">Pros</div>

                        <div className="comparison-header-row" style={{ borderBottom: 'none' }}>Cons</div>
                    </div>

                    {/* GemLab Column */}
                    <div className="comparison-col gemlab">
                        <div className="col-image">
                            <img src={heroImg} alt="GemLab Bottle" />
                        </div>
                        <div className="col-brand-name">GEMLAB</div>

                        <div className="comparison-row">
                            <div className="rating-stars">
                                4.8/5 ★★★★★
                            </div>
                        </div>

                        <div className="comparison-row">
                            GemLab is designed specifically for men who struggle with dryness, itchiness, and sensitivity on their body skin. Its pH-balanced, moisture-restoring formula helps soothe rough patches, post-shower tightness, and dry areas on elbows, knees, and hands. The lightweight lotion absorbs quickly, with a subtle masculine scent that isn’t overpowering.
                        </div>

                        <div className="comparison-row">
                            <div className="check-list-item"><span className="check-icon">✓</span> Reduces dryness, rough texture, and itchiness</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Calms tightness after showering</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Lightweight, non-greasy texture</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Gentle enough for sensitive or reactive skin</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Subtle masculine scent</div>
                            <div className="check-list-item"><span className="check-icon">✓</span> Improvements within just a few days</div>
                        </div>

                        <div className="comparison-row" style={{ borderBottom: 'none' }}>
                            <div className="check-list-item"><span className="check-icon" style={{ color: '#EF4444' }}>⊗</span> Requires consistent daily use for best results</div>
                            <div className="check-list-item"><span className="check-icon" style={{ color: '#EF4444' }}>⊗</span> Frequently sells out due to high demand</div>
                        </div>
                    </div>

                    {/* Competitor Column */}
                    <div className="comparison-col competitor">
                        <div className="col-image" style={{ background: '#E2E8F0', borderRadius: '1rem' }}>
                            {/* Placeholder for generic bottle */}
                            <div style={{ color: '#94A3B8', fontWeight: 'bold' }}>GENERIC STORE BRAND</div>
                        </div>
                        <div className="col-brand-name">Men+Care Store Brand</div>

                        <div className="comparison-row">
                            <div className="rating-stars" style={{ color: '#64748B' }}>
                                4.2/5 ★★★★★
                            </div>
                        </div>

                        <div className="comparison-row">
                            Most Men+Care store brands are built around strong cleansing and heavy fragrance to create a “fresh” feel. However, these formulas often contain harsher detergents and bold scents that can strip moisture — leaving men with even drier or itchier skin over time.
                        </div>

                        <div className="comparison-row">
                            <div className="check-list-item"><span className="check-icon good">✓</span> Affordable and widely available</div>
                            <div className="check-list-item"><span className="check-icon good">✓</span> Strong cleansing power and instant fresh feel</div>
                            <div className="check-list-item"><span className="check-icon good">✓</span> Convenient option for men who don’t think much about skincare</div>
                        </div>

                        <div className="comparison-row" style={{ borderBottom: 'none' }}>
                            <div className="check-list-item"><span className="check-icon bad">⊗</span> Can cause dryness, flakiness, or itchiness</div>
                            <div className="check-list-item"><span className="check-icon bad">⊗</span> Strong fragrances may irritate sensitive skin</div>
                            <div className="check-list-item"><span className="check-icon bad">⊗</span> Not formulated for men with dry or reactive skin</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Travel Kit Offer Banner */}
            <div className="travel-kit-banner">
                <div className="offer-content">
                    <h2 className="offer-title">UPGRADE YOUR ROUTINE<br />FREE TRAVEL KIT</h2>
                    <p className="offer-description">
                        Buy any GemLab product today and receive a complimentary Travel Kit Box — perfect for gym bags, trips, and daily carry.
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
                    <button className="cta-button">Check Availability</button>
                </div>
                <div className="offer-image">
                    {/* Using a placeholder or reusing an image since exact travel kit image isn't available.
                        Reusing sec3Img (steps) or similar as placeholder, OR just a box div if needed.
                        But user wants it to look like the screenshot.
                        Let's use sec2Img temporarily or the hero bottle img if fits better,
                        OR ideally simple text if no image fits.
                        Actually, I'll use the hero layout image again as it's a 'kit' of sorts.
                    */}
                    <img src={shutterstockKitImg} alt="GemLab Travel Kit Box" />
                </div>
            </div>

            {/* Footer Legal */}
            <div className="legal-footer">
                <p className="legal-text">
                    *Special sale discount is valid only on the first delivery of a new Gemlab created on https://gemlab.com/ by 04/08/2025 at 11:59pm PST and includes the price of free gifts. Gemlab subscription renews every 30 days at a discounted rate of the price listed at checkout. Max one offer per customer. Cannot be combined with any other offers or sales.
                </p>
                <div className="copyright">
                    © 2025, GemLab. <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Terms of Service</a> | <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>
                </div>
            </div>

            {/* Footer CTA - Removed as per user request to remove whitespace */}

        </div>
    );
};

export default ListiclePage;
