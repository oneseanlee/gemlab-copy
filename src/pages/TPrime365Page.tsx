// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackMetaEvent } from '../lib/meta-pixel';
import './TPrime365Page.css';
import '../pages/HomePage.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import { Menu, ArrowRight, X, Check, ChevronRight, Syringe, Pill, FlaskConical, Dna, Zap, Dumbbell, Shield, Brain, Flame, Heart, Target, Moon, Bone, Clock, ShieldCheck, Lightbulb, Calendar, AlertCircle, Building2, BadgeCheck, Microscope, Flag, Stethoscope, Lock, Package, Headphones, Truck } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { CartDrawer } from '../components/CartDrawer';
import { useCartStore } from '../stores/cartStore';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const TPRIME_VARIANT_ID = 'gid://shopify/ProductVariant/46309997936780';
const TPRIME_PRODUCT = {
  node: {
    id: 'gid://shopify/Product/TPrime365',
    title: 'TPrime365™',
    description: 'Physician-prescribed natural testosterone optimization. Monthly subscription includes formula + consultation + free shipping.',
    handle: 'tprime365',
    priceRange: { minVariantPrice: { amount: '149.00', currencyCode: 'USD' } },
    images: { edges: [{ node: { url: '/images/tprime-bottle.png', altText: 'TPrime365' } }] },
    variants: { edges: [{ node: { id: TPRIME_VARIANT_ID, title: 'Monthly Subscription', price: { amount: '149.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Plan', value: 'Monthly Subscription' }] } }] },
    options: [{ name: 'Plan', values: ['Monthly Subscription'] }]
  }
};

const tprimeTestimonials = [
  { img: '/images/testimonial-brett-earnshaw.png', name: 'Brett Earnshaw', using: 'TPrime365™', quote: 'Testosterone went from 658 to 749 in two months' },
  { img: '/images/testimonial-kerry-reyes-bg.png', name: 'Kerry Reyes', using: 'TPrime365™', quote: 'More energy within the first two weeks' },
  { img: '/images/testimonial-mike-vandyke-bg.png', name: 'Mike VanDyke', using: 'TPrime365™', quote: 'Rapid improvements in energy and cellular performance' },
  { img: '/images/testimonial-sean-lee.png', name: 'Sean Lee', using: 'TPrime365™', quote: 'Finally found something that actually works' },
  { img: '/images/testimonial-ernesto-cruz.png', name: 'Ernesto Cruz', using: 'TPrime365™', quote: 'Better focus, better sleep, better everything' },
  { img: '/images/testimonial-jay-atkins.png', name: 'Jay Atkins', using: 'TPrime365™', quote: 'Wish I started this years ago' },
];

// Reusable mid-page CTA block
const MidPageCTA = ({ onClick }: { onClick: (e?: React.MouseEvent) => void }) => (
  <div className="tprime-mid-cta">
    <AnimatedCTA onClick={onClick}>
      See If I Qualify
      <ArrowRight size={16} />
    </AnimatedCTA>
  </div>
);

// Dynamic urgency helpers
const getMonthName = () => new Date().toLocaleString('en-US', { month: 'long' });
const getNextMonth = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleString('en-US', { month: 'long' });
};

const TPrimeTestimonialsCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Carousel
      opts={{ align: 'start', loop: true }}
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
      setApi={setApi}
      className="b365-testimonials-carousel">

      <CarouselContent className="-ml-4">
        {tprimeTestimonials.map((t, i) =>
        <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="b365-testimonial-card">
              <img src={t.img} alt={t.name} />
              <div className="card-body">
                <div className="name">{t.name}</div>
                <div className="product-using">Using: {t.using}</div>
                {t.quote && <p className="testimonial-inline-quote">"{t.quote}"</p>}
                <div className="verified">
                  <BadgeCheck size={14} />
                  Verified buyer
                </div>
              </div>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <div className="b365-carousel-dots">
        {Array.from({ length: count }).map((_, i) =>
        <button
          key={i}
          className={`b365-dot ${i === current ? 'active' : ''}`}
          onClick={() => api?.scrollTo(i)}
          aria-label={`Go to slide ${i + 1}`} />
        )}
      </div>
    </Carousel>);
};

const TPrime365Page = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dosingVisible, setDosingVisible] = useState(false);
  const dosingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    trackMetaEvent('ViewContent', { content_name: 'TPrime365™', content_type: 'product', value: 149.00, currency: 'USD' });
  }, []);

  useEffect(() => {
    const el = dosingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setDosingVisible(true); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ firstName: '', email: '' });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState('');
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

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
        source: 'tprime365',
      });
      setShowLeadModal(false);
      navigate('/tprime365-intake');
    } catch {
      setLeadError('Something went wrong. Please try again.');
    } finally {
      setLeadSubmitting(false);
    }
  };

  const mobileLinks = [
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'The Science', href: '#science' },
  { label: 'Compare', href: '#compare' },
  { label: 'FAQ', href: '#faq' }];

  const faqItems = [
  {
    question: "How is this different from TRT injections?",
    answer: "TPrime365 stimulates your NATURAL testosterone production through the HPG axis. TRT shuts down your natural production, causes testicular atrophy, and eliminates fertility. TPrime365 preserves all of that while optimizing your levels."
  },
  {
    question: "What happens if I'm not approved?",
    answer: "If the independent physician determines TPrime365 isn't right for you based on your health assessment, you'll be notified promptly. The intake process is free — you only move forward if you qualify."
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
            <MobileMenu links={mobileLinks} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

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
                    <button className="b365-hamburger" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
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
                        <CartDrawer />
                        <AnimatedCTA onClick={handleStartProtocol} small>
                          See If I Qualify
                          <ArrowRight size={14} />
                        </AnimatedCTA>
                    </div>
                </div>
            </nav>

            {/* 3. Hero Section */}
            <section className={`tprime-hero-section ${!showBanner ? 'no-banner' : ''}`}>
                <div className="tprime-hero-container">
                    <div className="tprime-hero-img">
                        <img src="/images/tprime-hero-composite.png" alt="TPrime365 bottle with athlete" fetchPriority="high" width="600" height="600" />
                    </div>
                    <div className="tprime-hero-text">
                        <h1>More Energy. More Muscle. More Drive.<br /><em>Without Shutting Down Your Natural Testosterone.</em></h1>
                        <p className="subhead">
                            Enclomiphene + Spermidine + Boron + Vitamin C — compounded into one sublingual formula. Physician-reviewed. FDA-registered 503A facility. Delivered to your door.
                        </p>
                        <div className="price-row">
                            <span className="price-big">$149</span>
                            <span className="price-note">/month — Includes Physician Consultation via HappyMD</span>
                        </div>
                        <p className="guarantee-text">Complete your intake to see if you qualify</p>

                        {/* Urgency line */}
                        <div className="tprime-urgency-line">
                          <Clock size={14} />
                          <span>{getMonthName()} pricing locked at $149/mo — Next price review: {getNextMonth()} 1</span>
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

            {/* Real Clients Testimonial Carousel */}
            <section className="b365-section">
              <h2 className="b365-section-heading b365-serif">Real Clients. <em>Real Results.</em></h2>
              <TPrimeTestimonialsCarousel />
            </section>

            {/* 4. How It Works */}
            <section className="tprime-steps-section" id="process">
                <div className="tprime-steps-layout b365-section">
                    <div className="tprime-steps-content">
                        <h2 className="b365-serif" style={{textAlign:'left',fontSize:'var(--text-h1)',fontWeight:700,lineHeight:1.2,marginBottom:'var(--space-12)',color:'var(--b365-text)'}}>Get Started in <em>3 Simple Steps</em></h2>
                        <div className="tprime-steps-stacked">
                            <div className="tprime-step-row">
                                <span className="tprime-step-num">01</span>
                                <div>
                                    <h3>Complete Your Order & Health Assessment</h3>
                                    <p>Complete payment on our HIPAA-compliant platform. Fill out a secure online form (5 minutes) with your health information and symptoms.</p>
                                </div>
                            </div>
                            <div className="tprime-step-row">
                                <span className="tprime-step-num">02</span>
                                <div>
                                    <h3>Physician Review via HappyMD</h3>
                                    <p>An independent licensed physician evaluates your case and determines if TPrime365 is right for you.</p>
                                </div>
                            </div>
                            <div className="tprime-step-row">
                                <span className="tprime-step-num">03</span>
                                <div>
                                    <h3>Receive & Start Optimizing</h3>
                                    <p>Compounded at an FDA-registered 503A facility and shipped directly to your door in discreet packaging. Begin your transformation.</p>
                                </div>
                            </div>
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
                    </div>
                    <div className="tprime-steps-hero-img">
                        <img src="/images/tprime-model.png" alt="TPrime365 lifestyle" />
                    </div>
                </div>
            </section>

            {/* 5. The Problem + CTA */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Traditional Solutions Are <em>Broken</em></h2>
                <div className="tprime-problem-grid">
                    {[
          { title: 'Injectable TRT', Icon: Syringe, items: ['Shuts down natural production', 'Testicular atrophy guaranteed', 'Fertility destroyed', 'Lifetime dependency'] },
          { title: 'Oral Pills', Icon: Pill, items: ['Poor absorption (first-pass liver metabolism)', 'Inconsistent results', 'Half the dose wasted', 'Daily capsule hassle'] },
          { title: 'Single-Ingredient Solutions', Icon: FlaskConical, items: ['One-dimensional approach', 'Missing synergistic compounds', 'Expensive to stack separately', 'No longevity benefits'] }].
          map((card, i) =>
          <div className="tprime-problem-card" key={i}>
                            <div className="icon-wrap">
                                <card.Icon size={22} />
                            </div>
                            <h3>{card.title}</h3>
                            <ul>
                                {card.items.map((item, j) =>
              <li key={j}>
                                        <X size={14} />
                                        {item}
                                    </li>
              )}
                            </ul>
                        </div>
          )}
                </div>
                <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 6. The Solution + CTA */}
            <section className="b365-section b365-section-alt tprime-solution-section" id="science" style={{ overflow: 'hidden', paddingBottom: 0 }}>
                <div className="tprime-solution-layout">
                    <div className="tprime-solution-img">
                        <img src="/images/tprime-model-2.png" alt="TPrime365 model" />
                    </div>
                    <div className="tprime-solution-content">
                        <h2 className="b365-section-heading b365-serif" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>TPrime365™: Your Natural Testosterone, <em>Amplified</em></h2>
                        <div className="tprime-pillars-grid-2x2">
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
                        <div className="tprime-delivery-badge" style={{ textAlign: 'center' }}>
                            <span>Sublingual Delivery via MODS Max Gold™</span>
                        </div>
                        <p className="tprime-formula-tagline" style={{ textAlign: 'center' }}>4 Clinically-Proven Ingredients. 1 Powerful Formula.</p>
                        <MidPageCTA onClick={handleStartProtocol} />
                    </div>
                </div>
            </section>

            {/* 7. Ingredient Breakdown + CTA */}
            <section className="b365-section" id="ingredients">
                <h2 className="b365-section-heading b365-serif">The Science Behind <em>Each Pillar</em></h2>
                <div className="tprime-ingredient-grid">
                    {[
          {
            Icon: Dna, title: 'Pillar 1: Enclomiphene 25mg', subtitle: 'The Foundation — Hormone Optimization',
            sections: [
            { heading: 'What It Does:', items: ['Blocks estrogen receptors at the pituitary', 'Signals your body to produce MORE testosterone naturally', 'Increases LH & FSH (the hormones that make testosterone)', 'Preserves fertility & testicular function'] },
            { heading: 'The Science:', items: ['60-664% testosterone increase in 2-4 weeks', 'Non-hormonal: Won\'t shut down your natural production', 'Fertility-safe: Keeps sperm production active'] }]
          },
          {
            Icon: Zap, title: 'Pillar 2: Spermidine 10mg', subtitle: 'The Longevity Amplifier — Testosterone + Longevity',
            sections: [
            { heading: 'What It Does:', items: ['Boosts testosterone production directly (+48.9% in men under 50)', 'Slashes cortisol by 58% (the testosterone killer)', 'Reduces estradiol by 55.9% in 83% of men', 'Activates autophagy (cellular renewal & anti-aging)'] },
            { heading: 'The Science:', items: ['5-year survival benefit in epidemiological studies', '40% reduction in fatal heart failure risk', 'Supports Leydig cell function (where testosterone is made)'] }]
          },
          {
            Icon: Dumbbell, title: 'Pillar 3: Boron 10mg', subtitle: 'The Free Testosterone Liberator — Strength & Vitality',
            sections: [
            { heading: 'What It Does:', items: ['Increases FREE testosterone (the usable form)', 'Reduces SHBG (the protein that binds testosterone)', 'Supports bone density & strength', 'Reduces inflammation'] },
            { heading: 'The Science:', items: ['28% increase in free testosterone in 1 week', 'Decreases estradiol levels', 'Improves vitamin D utilization'] }]
          },
          {
            Icon: Shield, title: 'Pillar 4: Vitamin C 10mg', subtitle: 'The Cellular Protector — Protection & Support',
            sections: [
            { heading: 'What It Does:', items: ['Powerful antioxidant protection', 'Supports Leydig cell health', 'Enhances absorption of other nutrients', 'Reduces oxidative stress'] },
            { heading: 'The Science:', items: ['Protects testosterone-producing cells', 'Supports immune function', 'Essential for cellular repair'] }]
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
                <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 8. Delivery Advantage */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">Why Sublingual Changes <em>Everything</em></h2>
                <div className="tprime-delivery-grid">
                    <div className="tprime-delivery-card">
                        <h3>Oral Capsules (Competitors)</h3>
                        <ul>
                            {['First-pass liver metabolism', '40-60% lost before absorption', 'Slow, inconsistent results', 'Digestive breakdown', 'Takes 1-2 hours to absorb'].map((item, i) =>
              <li key={i}>
                                    <X size={16} className="icon-x" />
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
                                    <Check size={16} className="icon-check" />
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

            {/* 9. Who Is This For */}
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
                                        <ChevronRight size={14} />
                                        {item}
                                    </li>
              )}
                            </ul>
                        </div>
          )}
                </div>
            </section>

            {/* 10. Benefits */}
            <section className="b365-section b365-section-alt">
                <h2 className="b365-section-heading b365-serif">What You'll <em>Experience</em></h2>
                <div className="tprime-benefits-grid">
                    {[
          { Icon: Flame, title: 'Energy & Drive', desc: 'Wake up ready to conquer. No more afternoon crashes.' },
          { Icon: Dumbbell, title: 'Lean Muscle Growth', desc: 'Build and maintain muscle more easily. Faster recovery.' },
          { Icon: Brain, title: 'Mental Clarity', desc: 'Sharp focus. Better decision-making. Confidence restored.' },
          { Icon: Heart, title: 'Libido & Performance', desc: 'Reignite desire. Perform like your younger self.' },
          { Icon: Zap, title: 'Faster Recovery', desc: 'Bounce back from workouts. Less soreness, more gains.' },
          { Icon: Target, title: 'Fat Loss', desc: 'Shed stubborn fat, especially around the midsection.' },
          { Icon: Moon, title: 'Better Sleep', desc: 'Deeper, more restorative rest. Wake refreshed.' },
          { Icon: Bone, title: 'Bone Density', desc: 'Stronger bones. Reduced fracture risk.' },
          { Icon: Dna, title: 'Longevity', desc: 'Cellular renewal. Healthspan extension. Age better.' }].
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

            {/* 11. UGC Video Testimonials + CTA */}
            <section className="b365-section b365-section-alt">
              <h2 className="b365-section-heading b365-serif">Real Men. Measurable <em>Results.</em></h2>
              <p style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto var(--space-8)', fontSize: 'var(--text-body)', color: 'var(--b365-text-secondary)', lineHeight: 1.7 }}>
                These aren't influencers. They're guys who were tired of feeling tired — and decided to do something about it.
              </p>
              <div className="tprime-ugc-grid full-width">
                {[
          'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec46bac245857f16caa.mp4',
          'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec4a9efde243ace875b.mp4',
          'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec43b3cc9f4a7114cf0.mp4',
          'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec41d5e04501a7a9db9.mp4'].
          map((src, i) =>
          <div className="tprime-ugc-card" key={i}>
                    <video autoPlay muted loop playsInline preload="metadata" src={src} />
                  </div>
          )}
              </div>
              <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 12. Comparison Table (moved up) + CTA */}
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
                            
                        </tbody>
                    </table>
                </div>
                <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* 13. Value Breakdown (moved up) */}
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

            {/* 14. Final CTA */}
            <section className="b365-section">
                <div className="tprime-final-cta">
                    <h2>Ready to Reclaim Your <em>Prime?</em></h2>
                    <p className="subtitle text-primary-foreground">Join thousands of men optimizing their testosterone naturally with TPrime365™</p>
                    <div className="tprime-final-price-box">
                        <span className="big-price">$149/month</span>
                        <span className="note">Includes everything: Formula + Physician Consultation + Free Shipping</span>
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
                        <span><Check size={14} /> Cancel subscription anytime</span>
                    </div>
                    <div className="tprime-cta-trust-strip">
                        <span><Lock size={14} /> Secure Checkout</span>
                        <span><ShieldCheck size={14} /> HIPAA Compliant</span>
                        <span><Package size={14} /> Fast Shipping</span>
                    </div>
                </div>
            </section>

            {/* 15. Dosing Instructions */}
            <section className="b365-section b365-section-alt" ref={dosingRef}>
                <h2 className="b365-section-heading b365-serif">Your Nightly <em>Protocol</em></h2>
                <div className="tprime-dosing-split">
                    <div className="tprime-dosing-image">
                        <img src="/images/tprime-bottle.png" alt="TPrime365 bottle" />
                    </div>
                    <div className="tprime-dosing-steps">
                        <div className="tprime-dosing-card">
                            <div className={`tprime-dosing-item ${dosingVisible ? 'step-visible' : ''}`}><span className="tprime-step-number">1</span><span className="label">WHEN</span><span>30–60 minutes before bedtime</span></div>
                            <div className={`tprime-dosing-item ${dosingVisible ? 'step-visible' : ''}`}><span className="tprime-step-number">2</span><span className="label">PLACE</span><span>1 dropper (1 mL) under tongue</span></div>
                            <div className={`tprime-dosing-item ${dosingVisible ? 'step-visible' : ''}`}><span className="tprime-step-number">3</span><span className="label">HOLD</span><span>30 seconds for optimal absorption</span></div>
                            <div className={`tprime-dosing-item ${dosingVisible ? 'step-visible' : ''}`}><span className="tprime-step-number">4</span><span className="label">SWALLOW</span><span>Then swallow remaining liquid</span></div>
                            <p className="tprime-dosing-supply">
                                <Calendar size={16} style={{ marginRight: 6 }} />
                                Supply: 30-day supply per bottle
                            </p>
                        </div>
                        <div className="tprime-pro-tip">
                            <h4>
                                <Lightbulb size={16} />
                                For Best Results:
                            </h4>
                            <ul>
                                {['Take on an empty stomach', 'Avoid eating/drinking 15 minutes before and after', 'Store at room temperature (do not freeze)', 'Track your progress weekly'].map((item, i) =>
                                    <li key={i}>
                                        <Check size={14} />
                                        {item}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 16. Safety & Quality */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Pharmaceutical-Grade <em>Standards</em></h2>
                <div className="tprime-trust-grid">
                    {[
          { Icon: Building2, title: 'FDA-Registered 503A Compounding Facility', desc: 'Manufactured in Salt Lake City, UT under strict quality controls' },
          { Icon: BadgeCheck, title: 'Patent-Pending Delivery', desc: 'MODS Max Gold™ sublingual technology for 10x absorption' },
          { Icon: Microscope, title: 'Third-Party Tested', desc: 'Every batch verified for purity and potency' },
          { Icon: Flag, title: 'Made in the USA', desc: 'American-made, American quality' },
          { Icon: Stethoscope, title: 'Licensed Physician Oversight', desc: 'Real doctors reviewing every case' },
          { Icon: Lock, title: 'HIPAA Compliant', desc: 'Your health data stays private and secure' }].
          map((badge, i) =>
          <div className="tprime-trust-card" key={i}>
                            <div className="icon-wrap">
                                <badge.Icon size={22} />
                            </div>
                            <h4>{badge.title}</h4>
                            <p>{badge.desc}</p>
                        </div>
          )}
                </div>
            </section>

            {/* 17. FAQ */}
            <section className="b365-section" id="faq">
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

            {/* Post-FAQ CTA */}
            <section className="b365-section">
              <MidPageCTA onClick={handleStartProtocol} />
            </section>

            {/* Footer */}
            <SharedFooter />

            {/* Sticky Mobile CTA Bar */}
            <div className="tprime-sticky-mobile-cta">
              <span className="sticky-price">$149<span>/mo</span></span>
              <button className="sticky-cta-btn" onClick={handleStartProtocol}>
                See If I Qualify
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Lead Capture Modal */}
            <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
              <DialogContent className="sm:max-w-md" style={{ background: '#fff', borderRadius: 16, padding: '2rem' }}>
                <DialogHeader>
                  <DialogTitle className="b365-serif" style={{ fontSize: '1.5rem', color: 'var(--b365-text)', textAlign: 'center' }}>
                    Start Your TPrime365™ Protocol
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
        </div>);

};

export default TPrime365Page;
