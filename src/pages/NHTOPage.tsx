// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NHTOPage.css';
import '../pages/HomePage.css';
import '../pages/TPrime365Page.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import { CartDrawer } from '../components/CartDrawer';
import { useCartStore } from '../stores/cartStore';
import { Menu, CheckCircle, ShieldCheck, Gift, Shrink, Baby, Link2, AlertTriangle, X, Check, Shield, Activity, SlidersHorizontal, ChevronRight, Truck, Award, Stethoscope, ArrowRight, Flame, User, Sunrise, Clock, Moon, Pill, Headphones, Lock, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const NHTO_VARIANT_ID = 'gid://shopify/ProductVariant/46309998133388';
const NHTO_PRODUCT = {
    node: {
        id: 'gid://shopify/Product/NHTO',
        title: 'Non-Hormonal Testosterone Optimizer — Complete System',
        description: 'Complete Non-Hormonal Testosterone Optimizer system with UCOS bundle and physician consultation.',
        handle: 'nhto-complete-system',
        priceRange: { minVariantPrice: { amount: '250.00', currencyCode: 'USD' } },
        images: { edges: [{ node: { url: '/images/product-nhto.png', altText: 'NHTO System' } }] },
        variants: { edges: [{ node: { id: NHTO_VARIANT_ID, title: 'Complete System', price: { amount: '250.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Bundle', value: 'Complete System' }] } }] },
        options: [{ name: 'Bundle', values: ['Complete System'] }],
    }
};

// Dynamic urgency helpers (matching TPrime365)
const getMonthName = () => new Date().toLocaleString('en-US', { month: 'long' });
const getNextMonth = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleString('en-US', { month: 'long' });
};

// Mid-page CTA block (matching TPrime365)
const MidPageCTA = ({ onClick }: { onClick: (e?: React.MouseEvent) => void }) => (
    <div className="tprime-mid-cta">
        <AnimatedCTA onClick={onClick}>
            See If I Qualify
            <ArrowRight size={16} />
        </AnimatedCTA>
    </div>
);

const NHTOPage = () => {
    const [showBanner, setShowBanner] = useState(true);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [leadForm, setLeadForm] = useState({ firstName: '', email: '' });
    const [leadSubmitting, setLeadSubmitting] = useState(false);
    const [leadError, setLeadError] = useState('');
    const navigate = useNavigate();
    const addItem = useCartStore(state => state.addItem);
    const isLoading = useCartStore(state => state.isLoading);

    const mobileLinks = [
      { label: 'Benefits', href: '#benefits' },
      { label: 'Results', href: '#results' },
      { label: 'Compare', href: '#compare' },
      { label: 'Bundle', href: '#bundle' },
    ];

    const handleStartProtocol = (e?: React.MouseEvent) => {
        e?.preventDefault();
        setShowLeadModal(true);
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLeadError('');
        if (!leadForm.firstName.trim() || !leadForm.email.trim()) {
            setLeadError('Please fill out both fields.');
            return;
        }
        setLeadSubmitting(true);
        try {
            await supabase.from('leads').insert({
                first_name: leadForm.firstName.trim(),
                email: leadForm.email.trim(),
                source: 'nhto',
            });
            setShowLeadModal(false);
            navigate('/nhto-intake');
        } catch {
            setLeadError('Something went wrong. Please try again.');
        } finally {
            setLeadSubmitting(false);
        }
    };

    const faqItems = [
        { question: "How is the consultation facilitated?", answer: "Your consultation is facilitated through happyMD, a licensed telehealth platform. After you complete your health intake, an independent licensed physician reviews your information and determines eligibility for the Non-Hormonal Testosterone Optimizer prescription." },
        { question: "What happens if I'm not approved?", answer: "If the independent physician determines you're not a candidate for prescription treatment, you'll be notified promptly. The intake process is free — you only move forward if you qualify." },
        { question: "Can I use this with my current TRT?", answer: "Yes! The Non-Hormonal Testosterone Optimizer powered by MODS Max is specifically designed to work alongside TRT. It helps maintain testicular function, preserve fertility, and optimize hormone balance that TRT alone can compromise." },
        { question: "Does this preserve fertility?", answer: "Yes. Unlike traditional TRT which suppresses sperm production, the Non-Hormonal Testosterone Optimizer stimulates natural LH/FSH production, maintaining your body's natural reproductive function." },
        { question: "How quickly will I see results?", answer: "Most men notice improvements in energy and mood within 2-3 weeks. Testosterone levels typically increase significantly within 3-6 weeks. The UCOS supplements provide additional cellular optimization benefits from day one." },
        { question: "Are there side effects?", answer: "Clinical data shows zero adverse events across all patients. The non-hormonal approach avoids the common side effects of traditional TRT including testicular atrophy, fertility suppression, and estrogen issues." },
        { question: "Is this FDA approved?", answer: "The Non-Hormonal Testosterone Optimizer is compounded at an FDA-registered 503A facility. The UCOS supplements are manufactured in FDA-registered facilities. These statements have not been evaluated by the FDA." },
        { question: "What's included in the bundle?", answer: "The complete system includes: Non-Hormonal Testosterone Optimizer (Rx, 30-day supply), Activate365 (morning cellular activation), Mito365 (peak performance enhancement), Restore365 (overnight recovery), and a licensed physician consultation via happyMD." },
        { question: "How do I take the products?", answer: "Activate365 first thing after waking, Mito365 15 minutes after Activate365, Restore365 30-60 minutes before bed, and the Non-Hormonal Testosterone Optimizer as prescribed by your physician." },
        { question: "Who is happyMD?", answer: "happyMD is a licensed telehealth platform that connects patients with board-certified physicians. They facilitate the medical consultation and prescription process for the Non-Hormonal Testosterone Optimizer." },
    ];

    return (
        <div className="nhto-page">
            <MobileMenu links={mobileLinks} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* 1. Promo Banner */}
            {showBanner && (
                <div className="b365-promo-banner">
                    🔥 SAVE $159 — Complete Testosterone Optimization System + Physician Consultation
                    <button onClick={() => setShowBanner(false)} aria-label="Close banner">✕</button>
                </div>
            )}

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
                        <AnimatedCTA onClick={handleStartProtocol} small>
                            See If I Qualify
                            <ArrowRight size={14} />
                        </AnimatedCTA>
                    </div>
                </div>
            </nav>

            {/* 3. Hero Section */}
            <section className={`nhto-hero-section ${!showBanner ? 'no-banner' : ''}`}>
                <div className="tprime-hero-container">
                    <div className="tprime-hero-img">
                        <img src="/images/product-nhto.png" alt="Non-Hormonal Testosterone Optimizer — Complete System" />
                    </div>
                    <div className="tprime-hero-text">
                        <h1>Revolutionary Non-Hormonal <em>Testosterone Optimizer</em></h1>
                        <p className="subhead">Restore your testosterone naturally. No injections, no hormones, no fertility risks. Physician-reviewed. FDA-registered 503A facility.</p>
                        <div className="price-row">
                            <span className="price-big">$250</span>
                            <span className="price-note" style={{ textDecoration: 'line-through', marginRight: 8 }}>$300</span>
                            <span className="price-note">Complete System + Physician Consultation</span>
                        </div>
                        <p className="guarantee-text">Complete your intake to see if you qualify</p>

                        {/* Urgency line */}
                        <div className="tprime-urgency-line">
                            <Clock size={14} />
                            <span>{getMonthName()} pricing locked at $250 — Next price review: {getNextMonth()} 1</span>
                        </div>

                        <AnimatedCTA onClick={handleStartProtocol}>
                            See If I Qualify
                            <ArrowRight size={16} />
                        </AnimatedCTA>

                        {/* Hero trust micro-badges */}
                        <div className="tprime-hero-trust-row">
                            <span><Check size={14} /> Physician-Reviewed</span>
                            <span><Check size={14} /> FDA-Registered Pharmacy</span>
                            <span><Check size={14} /> HIPAA Compliant</span>
                            <span><Truck size={14} /> Free Shipping</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Trust Strip */}
            <div className="nhto-trust-strip">
                {[
                    { Icon: Truck, title: 'Free Shipping', desc: 'Nationwide delivery' },
                    { Icon: ShieldCheck, title: 'Physician-Reviewed', desc: 'Licensed provider network' },
                    { Icon: Award, title: 'Premium Quality', desc: 'Made in USA' },
                    { Icon: Stethoscope, title: 'Doctor Consultation', desc: 'Included with order' },
                ].map((badge, i) => (
                    <div className="nhto-trust-badge" key={i}>
                        <div className="icon-wrap">
                            <badge.Icon size={22} />
                        </div>
                        <h4>{badge.title}</h4>
                        <p>{badge.desc}</p>
                    </div>
                ))}
            </div>

            {/* 5. Critical Information — TRT Side Effects */}
            <section className="b365-section" id="benefits">
                <p className="nhto-section-label">CRITICAL INFORMATION</p>
                <h2 className="b365-section-heading b365-serif">If You're Considering TRT,<br /> <em>You Need to Know This</em></h2>
                <div className="nhto-problem-grid">
                    {[
                        { Icon: Shrink, title: 'Testicular Atrophy', desc: 'Up to 17% volume decrease in studies' },
                        { Icon: Baby, title: 'Fertility Impact', desc: 'Significant sperm production suppression' },
                        { Icon: Link2, title: 'Hormonal Dependency', desc: 'Natural production shutdown' },
                        { Icon: AlertTriangle, title: 'Estrogen Issues', desc: 'Increased aromatization and side effects' },
                    ].map((card, i) => (
                        <div className="nhto-problem-card" key={i}>
                            <div className="icon-wrap">
                                <card.Icon size={22} />
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                        </div>
                    ))}
                </div>
                <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 6. The Non-Hormonal Alternative */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">The Non-Hormonal Alternative That Protects <em>Your Vitality</em></h2>
                <div className="tprime-delivery-grid">
                    <div className="tprime-delivery-card">
                        <h3>TRT Alone</h3>
                        <ul>
                            {['Shuts down natural testosterone production', 'Causes testicular atrophy (up to 17%)', 'Destroys fertility and sperm production', 'Creates lifetime hormonal dependency', 'Increases estrogen conversion'].map((item, i) => (
                                <li key={i}><X size={16} className="icon-x" />{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="tprime-delivery-card highlight">
                        <h3>MODS Max + TRT</h3>
                        <ul>
                            {['Maintains natural testosterone production', 'Preserves testicular size and function', 'Protects fertility and sperm count', 'Easy to discontinue — no dependency', 'Optimal estrogen management'].map((item, i) => (
                                <li key={i}><Check size={16} className="icon-check" />{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div style={{ height: 40 }}></div>
                <div className="nhto-benefit-grid">
                    {[
                        { Icon: Shield, title: 'Maintains Testicular Function', desc: 'Preserves natural size and health while optimizing testosterone production' },
                        { Icon: Baby, title: 'Protects Fertility', desc: 'Maintains sperm production capacity unlike traditional TRT' },
                        { Icon: Activity, title: 'Stimulates Natural LH/FSH', desc: 'Keeps your hormone system active and functioning properly' },
                        { Icon: SlidersHorizontal, title: 'Optimizes Hormone Balance', desc: 'Better overall hormone management without dependency' },
                    ].map((card, i) => (
                        <div className="nhto-benefit-card" key={i}>
                            <div className="icon-wrap">
                                <card.Icon size={22} />
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                        </div>
                    ))}
                </div>
                <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 7. How It Works (4 Steps) */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">How It <em>Works</em></h2>
                <div className="nhto-steps-grid">
                    {[
                        { num: '01', title: 'Complete Your Health Intake', desc: 'Submit your health history through our secure online form. Takes just 5 minutes.', link: '/nhto-intake' },
                        { num: '02', title: 'Licensed Provider Review', desc: 'An independent licensed physician (via happyMD) reviews your information to determine eligibility.' },
                        { num: '03', title: 'Supplements Ship Immediately', desc: 'Your Ultimate Cellular Optimization bundle "UCOS" ships right away — yours to keep regardless of approval.' },
                        { num: '04', title: 'Prescription Issued If Approved', desc: 'If the provider determines you\'re a candidate, your prescription is issued and fulfilled.' },
                    ].map((step, i) => (
                        <div className="b365-step-card" key={i}>
                            <div className="step-number">{step.num}</div>
                            <h3 className="b365-serif">{step.title}</h3>
                            <p>{step.desc}</p>
                            {'link' in step && (
                                <a href={(step as any).link} className="nhto-step-link">
                                    Start Intake Form →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
                <div className="tprime-timeline-callout">
                    <span>
                        <Clock size={16} />
                        Order to delivery: 7-10 days (if approved)
                    </span>
                    <span>
                        <ShieldCheck size={16} />
                        Complete your intake to see if you qualify
                    </span>
                </div>
            </section>

            {/* 8. Clinical Results / Real Transformations */}
            <section className="b365-section b365-section-alt" id="results">
                <p className="nhto-section-label">CLINICAL RESULTS</p>
                <h2 className="b365-section-heading b365-serif">Real <em>Transformations</em></h2>
                <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', marginBottom: 32, fontSize: 15, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
                    Men across all ages are experiencing dramatic improvements in energy, vitality, and overall wellness.
                </p>
                <div className="nhto-safety-badge">
                    <span><ShieldCheck size={16} /> ZERO Adverse Events Across ALL Patients</span>
                </div>
                <div className="nhto-stats-strip">
                    {[
                        { value: '664%', label: 'Max T Increase' },
                        { value: '3 Weeks', label: 'Avg. Results Time' },
                        { value: '100%', label: 'Patient Safety' },
                        { value: '1000+', label: 'ng/dL Achieved' },
                    ].map((stat, i) => (
                        <div className="nhto-stat-item" key={i}>
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
                <div className="nhto-results-grid">
                    {[
                        { name: 'Alex T.', age: 'Age 32', increase: 'Up to 664%', time: 'in 3 weeks', before: '120 ng/dL', after: '917 ng/dL', quote: '"I went from feeling like an old man to having the energy of a teenager."' },
                        { name: 'Marcus L.', age: 'Age 30', increase: 'Up to 130%', time: 'in 6 weeks', before: '566 ng/dL', after: '1,305 ng/dL', quote: '"Brain fog lifted, workouts exploded, confidence skyrocketed."' },
                        { name: 'David R.', age: 'Age 45', increase: 'Up to 202%', time: 'in 4 weeks', before: '380 ng/dL', after: '1,150 ng/dL', quote: '"My productivity is through the roof. Best investment I\'ve made in myself."' },
                        { name: 'Mark', age: 'Age 60', increase: 'Up to 400%+', time: 'in 4 weeks', before: 'Low 200s', after: '1,000+ ng/dL', quote: '"I feel 20 years younger. My energy is through the roof."' },
                    ].map((t, i) => (
                        <div className="nhto-result-card" key={i}>
                            <img className="result-avatar" src={['/images/avatar-man-1.jpg', '/images/avatar-woman-1.jpg', '/images/avatar-woman-2.jpg', '/images/avatar-man-1.jpg'][i]} alt={t.name} />
                            <div className="result-name">{t.name}</div>
                            <div className="result-age">{t.age}</div>
                            <div className="result-increase">{t.increase}<br /><span style={{ fontSize: 12, fontWeight: 400, fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'var(--b365-text-secondary)' }}>{t.time}</span></div>
                            <div className="result-levels">
                                <span className="level-before">{t.before}</span>
                                <ArrowRight size={14} style={{ color: 'var(--b365-text-secondary)' }} />
                                <span className="level-after">{t.after}</span>
                            </div>
                            <div className="result-quote">{t.quote}</div>
                        </div>
                    ))}
                </div>
                <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 9. Complete Product Breakdown */}
            <section className="b365-section" id="bundle">
                <p className="nhto-section-label">WHAT'S INCLUDED</p>
                <h2 className="b365-section-heading b365-serif">Complete <em>Product Breakdown</em></h2>
                <div className="nhto-product-grid">
                    {[
                        {
                            img: '/images/product-nhto.png', title: 'Non-Hormonal Testosterone Optimizer', tag: 'Rx Formula', tagClass: 'tag-rx',
                            subtitle: 'Powered by MODS Max',
                            items: ['Clinical-grade Enclomiphene', 'Boron 10mg for free testosterone', 'Vitamin C for cellular protection', 'Patent-pending 10X absorption delivery']
                        },
                        {
                            img: '/images/activate365.png', title: 'Activate365 — Morning Cellular Activation', tag: 'UCOS', tagClass: 'tag-supp',
                            items: ['Spermidine 10mg: Activates autophagy', 'NAD+ 20mg: Immediate cellular energy', 'Boron 10mg: Hormone optimization', 'MODS Max Technology: 10x absorption']
                        },
                        {
                            img: '/images/mito365.png', title: 'Mito365 — Peak Performance Enhancement', tag: 'UCOS', tagClass: 'tag-supp',
                            items: ['Methylene Blue 10mg: 30-40% ATP increase', 'GHK-Cu Peptide 10mg: Faster tissue repair', 'PQQ 20mg: Creates new mitochondria', 'NAD+ 150mg + B12 + Vitamin C']
                        },
                        {
                            img: '/images/restore365.png', title: 'Restore365 — Overnight Recovery', tag: 'UCOS', tagClass: 'tag-supp',
                            items: ['Enhanced Melatonin: 50-70% faster sleep onset', 'GABA 50mg: Deep sleep support', 'Boron 10mg: Growth hormone release', 'Zinc: Immune and tissue repair']
                        },
                    ].map((product, i) => (
                        <div className="nhto-product-card" key={i}>
                            <div className="nhto-product-img">
                                <img src={product.img} alt={product.title} />
                            </div>
                            <div className="nhto-product-info">
                                <h3>{product.title}</h3>
                                <span className={`product-tag ${product.tagClass}`}>{product.tag}</span>
                                {product.subtitle && <p style={{ fontSize: 13, color: 'var(--b365-blue)', fontWeight: 600, marginBottom: 12 }}>{product.subtitle}</p>}
                                <ul>
                                    {product.items.map((item, j) => (
                                        <li key={j}><ChevronRight size={14} />{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                    {/* Consultation card */}
                    <div className="nhto-product-card full-width">
                        <div className="icon-wrap" style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--b365-light-blue)', color: 'var(--b365-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Stethoscope size={24} />
                        </div>
                        <div className="nhto-product-info">
                            <h3>Licensed Physician Consultation via happyMD</h3>
                            <span className="product-tag tag-rx">$200 VALUE</span>
                            <ul>
                                <li><ChevronRight size={14} />Board-certified physician review</li>
                                <li><ChevronRight size={14} />Personalized optimization protocol</li>
                                <li><ChevronRight size={14} />Prescription issued if medically approved</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. Value Breakdown */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">$250 = Complete System + <em>Expert Care</em></h2>
                <div className="tprime-value-card">
                    <h3>What You Get with the NHTO System</h3>
                    <div className="tprime-value-item"><span className="name">Non-Hormonal Testosterone Optimizer (Rx, 30-day)</span><span className="price">Retail Value: $140</span></div>
                    <div className="tprime-value-item"><span className="name">Activate365 — Morning Cellular Activation</span><span className="price">Retail Value: $49</span></div>
                    <div className="tprime-value-item"><span className="name">Mito365 — Peak Performance Enhancement</span><span className="price">Retail Value: $49</span></div>
                    <div className="tprime-value-item"><span className="name">Restore365 — Overnight Recovery</span><span className="price">Retail Value: $49</span></div>
                    <div className="tprime-value-item special"><span className="name">Licensed Physician Consultation (via happyMD)</span><span className="price">Retail Value: $200</span></div>
                    <div className="tprime-value-total">
                        <div className="row"><span>TOTAL VALUE:</span><span>$487+</span></div>
                        <div className="row"><span>YOUR PRICE:</span><span className="highlight-price">$250</span></div>
                        <div className="row"><span>YOU SAVE:</span><span>$237+</span></div>
                    </div>
                </div>
                <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 12. Doctor Testimonials */}
            <section className="b365-section">
                <p className="nhto-section-label">DOCTOR TESTIMONIALS</p>
                <h2 className="b365-section-heading b365-serif">What Medical Professionals <em>Say</em></h2>
                <div className="nhto-doctor-grid">
                    {[
                        { Icon: User, name: 'Dr. Steven Warren, MD, PhD', credential: '35+ years experience, Triple Board-Certified', quote: '"The clinical results with Testosterone Optimizer powered by MODS Max are unprecedented. Men are getting their lives back without compromising their natural hormone production."' },
                        { Icon: User, name: 'Board-Certified Urologist', credential: '15+ years TRT experience', quote: '"I\'ve been prescribing TRT for 15 years. Adding this to my protocols has eliminated most of the side effects I used to see. Testicular atrophy is virtually non-existent now."' },
                        { Icon: User, name: 'Dr. K, Cardiologist', credential: 'Participant & Medical Professional', quote: '"As a cardiologist who experienced the benefits firsthand, the cardiovascular safety profile is excellent. The patent-pending delivery system is revolutionary."' },
                    ].map((doc, i) => (
                        <div className="nhto-doctor-card" key={i}>
                            <div className="icon-wrap">
                                <doc.Icon size={24} />
                            </div>
                            <h4>{doc.name}</h4>
                            <div className="credential">{doc.credential}</div>
                            <blockquote>{doc.quote}</blockquote>
                        </div>
                    ))}
                </div>
            </section>

            {/* 13. Scientific Comparison Table */}
            <section className="b365-section b365-section-alt" id="compare">
                <p className="nhto-section-label">SCIENTIFIC COMPARISON</p>
                <h2 className="b365-section-heading b365-serif">MODS Max vs. <em>Traditional TRT</em></h2>
                <div className="tprime-table-wrap">
                    <table className="tprime-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th className="highlight-col">MODS Max + TRT</th>
                                <th>TRT Alone</th>
                                <th>No Treatment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Testicular Function</td><td className="highlight-col positive">✅ Maintains</td><td className="negative">❌ Up to 17% atrophy</td><td className="negative">❌ Declining</td></tr>
                            <tr><td>Fertility</td><td className="highlight-col positive">✅ Preserved</td><td className="negative">❌ Suppressed</td><td className="negative">❌ May decline</td></tr>
                            <tr><td>Hormone Balance</td><td className="highlight-col positive">✅ Natural LH/FSH</td><td className="negative">❌ Shut down</td><td className="negative">❌ Imbalanced</td></tr>
                            <tr><td>Estrogen Control</td><td className="highlight-col positive">✅ Optimal management</td><td className="negative">❌ Often elevated</td><td>❌ Variable</td></tr>
                            <tr><td>Dependency Risk</td><td className="highlight-col positive">✅ Easy to stop</td><td className="negative">❌ Difficult</td><td className="positive">✅ None</td></tr>
                            <tr><td>Total Testosterone</td><td className="highlight-col positive">✅ Highest</td><td>⚠️ Limited</td><td className="negative">❌ Dropping</td></tr>
                        </tbody>
                    </table>
                </div>
                <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 14. Final CTA */}
            <section className="b365-section">
                <div className="tprime-final-cta">
                    <h2>Ready to Optimize Your <em>Testosterone?</em></h2>
                    <p className="subtitle">Join men who are restoring their testosterone naturally — without shutting down their body's own production.</p>
                    <div className="tprime-final-price-box">
                        <span className="big-price">$250</span>
                        <span className="note">Complete System — NHTO + UCOS + Physician Consultation</span>
                        <span className="guarantee-text">Complete your intake to see if you qualify</span>
                    </div>
                    <AnimatedCTA onClick={handleStartProtocol} className="btn-white-cta">
                        See If I Qualify
                        <ArrowRight size={16} />
                    </AnimatedCTA>
                    <div className="tprime-cta-trust-points">
                        <span><Check size={14} /> Licensed physician reviews every order</span>
                        <span><Check size={14} /> See if you qualify in minutes</span>
                        <span><Check size={14} /> FDA-registered compounding pharmacy</span>
                        <span><Check size={14} /> Free shipping — discreet packaging</span>
                    </div>
                    <div className="tprime-cta-trust-strip">
                        <span><Lock size={14} /> Secure Checkout</span>
                        <span><ShieldCheck size={14} /> HIPAA Compliant</span>
                        <span><Package size={14} /> Fast Shipping</span>
                    </div>
                </div>
            </section>

            {/* 15. Product Timing Schedule */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">Your Daily <em>Optimization Schedule</em></h2>
                <div className="nhto-timing-grid">
                    {[
                        { Icon: Sunrise, when: 'Morning', title: 'Activate365', desc: 'First thing after waking' },
                        { Icon: Clock, when: '15 Min Later', title: 'Mito365', desc: '15 minutes after Activate365' },
                        { Icon: Moon, when: 'Evening', title: 'Restore365', desc: '30-60 min before bed' },
                        { Icon: Pill, when: 'As Prescribed', title: 'NHTO', desc: 'Per physician instructions' },
                    ].map((t, i) => (
                        <div className="nhto-timing-card" key={i}>
                            <div className="timing-icon">
                                <t.Icon size={22} />
                            </div>
                            <span className="timing-when">{t.when}</span>
                            <h4>{t.title}</h4>
                            <p>{t.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 16. FAQ */}
            <section className="b365-section" id="faq">
                <p className="nhto-section-label">❓ Medical Questions</p>
                <div className="b365-faq-layout">
                    <div className="b365-faq-left">
                        <h2>Frequently Asked <em>Questions</em></h2>
                        <AnimatedCTA href="mailto:info@best365labs.com" style={{ marginTop: 8 }}>
                            <Headphones size={16} />
                            Contact Support
                        </AnimatedCTA>
                    </div>
                    <div>
                        {faqItems.map((item, index) => (
                            <div className="b365-faq-item" key={index}>
                                <button className="b365-faq-trigger" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                                    {item.question}
                                    <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                                </button>
                                {openFaq === index && <div className="b365-faq-answer">{item.answer}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <SharedFooter />

            {/* Sticky Mobile CTA Bar */}
            <div className="tprime-sticky-mobile-cta">
                <div className="sticky-price">$250 <span>/system</span></div>
                <button className="sticky-cta-btn" onClick={handleStartProtocol}>
                    See If I Qualify <ArrowRight size={14} />
                </button>
            </div>

            {/* Lead Capture Modal */}
            <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
              <DialogContent className="sm:max-w-md" style={{ background: '#fff', borderRadius: 16, padding: '2rem' }}>
                <DialogHeader>
                  <DialogTitle className="b365-serif" style={{ fontSize: '1.5rem', color: 'var(--b365-text)', textAlign: 'center' }}>
                    See If You Qualify
                  </DialogTitle>
                  <DialogDescription style={{ textAlign: 'center', color: '#666', marginTop: 8 }}>
                    Enter your info below and we'll take you to the physician intake form.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={leadForm.firstName}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                    style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #d0d5dd', fontSize: '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #d0d5dd', fontSize: '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                  />
                  {leadError && <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: 0 }}>{leadError}</p>}
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    style={{
                      padding: '16px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'var(--b365-blue)',
                      color: '#fff',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      cursor: leadSubmitting ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      opacity: leadSubmitting ? 0.7 : 1,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    {leadSubmitting ? 'Submitting...' : 'Continue to Intake Form'}
                    {!leadSubmitting && <ArrowRight size={16} />}
                  </button>
                  <p style={{ fontSize: '0.75rem', color: '#999', textAlign: 'center', margin: 0 }}>
                    🔒 Your information is secure and HIPAA-compliant.
                  </p>
                </form>
              </DialogContent>
            </Dialog>
        </div>
    );
};

export default NHTOPage;
