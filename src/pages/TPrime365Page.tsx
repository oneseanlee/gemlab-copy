// @ts-nocheck
import React, { useState } from 'react';
import './TPrime365Page.css';
import '../pages/HomePage.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import { Menu, ArrowRight, X, Check, ChevronRight, Syringe, Pill, FlaskConical, Dna, Zap, Dumbbell, Shield, Brain, Flame, Heart, Target, Moon, Bone, Clock, ShieldCheck, Lightbulb, Calendar, AlertCircle, Building2, BadgeCheck, Microscope, Flag, Stethoscope, Lock, Package, Headphones } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const tprimeTestimonials = [
  { img: '/images/testimonial-brett-earnshaw.png', name: 'Brett Earnshaw', using: 'TPrime365™' },
  { img: '/images/testimonial-kerry-reyes-bg.png', name: 'Kerry Reyes', using: 'TPrime365™' },
  { img: '/images/testimonial-mike-vandyke-bg.png', name: 'Mike VanDyke', using: 'TPrime365™' },
  { img: '/images/testimonial-sean-lee.png', name: 'Sean Lee', using: 'TPrime365™' },
  { img: '/images/testimonial-ernesto-cruz.png', name: 'Ernesto Cruz', using: 'TPrime365™' },
  { img: '/images/testimonial-jay-atkins.png', name: 'Jay Atkins', using: 'TPrime365™' },
];

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
      className="b365-testimonials-carousel"
    >
      <CarouselContent className="-ml-4">
        {tprimeTestimonials.map((t, i) => (
          <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="b365-testimonial-card">
              <img src={t.img} alt={t.name} />
              <div className="card-body">
                <div className="name">{t.name}</div>
                <div className="product-using">Using: {t.using}</div>
                <div className="verified">
                  <BadgeCheck size={14} />
                  Verified buyer
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="b365-carousel-dots">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            className={`b365-dot ${i === current ? 'active' : ''}`}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
};

const TPrime365Page = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileLinks = [
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'The Science', href: '#science' },
    { label: 'Compare', href: '#compare' },
    { label: 'FAQ', href: '#faq' },
  ];

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
                        <AnimatedCTA href="/tprime365#process" small>Get Started</AnimatedCTA>
                    </div>
                </div>
            </nav>

            {/* 3. Hero Section */}
            <section className={`tprime-hero-section ${!showBanner ? 'no-banner' : ''}`}>
                <div className="tprime-hero-container">
                    <div className="tprime-hero-img">
                        <img src="/images/tprime-hero-composite.png" alt="TPrime365 bottle with athlete" />
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
                        <p className="guarantee-text">If not approved by physician, fully refunded</p>
                        <AnimatedCTA href="#process">
                            See If You Qualify
                            <ArrowRight size={16} />
                        </AnimatedCTA>
                    </div>
                </div>
            </section>

            {/* Real Clients Testimonial Carousel */}
            <section className="b365-section">
              <h2 className="b365-section-heading b365-serif">Real Clients. <em>Real Results.</em></h2>
              <TPrimeTestimonialsCarousel />
            </section>

            {/* 4. How It Works (moved up for conversion) */}
            <section className="b365-section" id="process">
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
                        <Clock size={16} />
                        Order to delivery: 7-10 days (if approved)
                    </span>
                    <span>
                        <ShieldCheck size={16} />
                        100% Money-Back Guarantee if physician does not approve
                    </span>
                </div>
            </section>

            {/* 5. The Problem */}
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
                                        <ChevronRight size={14} />
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

            {/* UGC Video Testimonials */}
            <section className="b365-section b365-section-alt">
              <h2 className="b365-section-heading b365-serif">Real Men. Measurable <em>Results.</em></h2>
              <p style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto var(--space-8)', fontSize: 'var(--text-body)', color: 'var(--b365-text-secondary)', lineHeight: 1.7 }}>
                These aren't influencers. They're guys who were tired of feeling tired — and decided to do something about it.
              </p>
              <div className="tprime-ugc-grid">
                {[
                  'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec46bac245857f16caa.mp4',
                  'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec4a9efde243ace875b.mp4',
                  'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec43b3cc9f4a7114cf0.mp4',
                  'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec41d5e04501a7a9db9.mp4',
                ].map((src, i) => (
                  <div className="tprime-ugc-card" key={i}>
                    <video controls playsInline preload="metadata" src={src} />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
                <AnimatedCTA href="#process">
                  See If You Qualify
                  <ArrowRight size={16} />
                </AnimatedCTA>
              </div>
            </section>

            {/* Final CTA (moved here, before comparison table) */}
            <section className="b365-section">
                <div className="tprime-final-cta">
                    <h2>Ready to Reclaim Your <em>Prime?</em></h2>
                    <p className="subtitle text-primary-foreground">Join thousands of men optimizing their testosterone naturally with TPrime365™</p>
                    <div className="tprime-final-price-box">
                        <span className="big-price">$149/month</span>
                        <span className="note">Includes everything: Formula + Physician Consultation + Free Shipping</span>
                        <span className="guarantee-text">100% refunded if physician does not approve</span>
                    </div>
                    <AnimatedCTA href="#process" className="btn-white-cta">
                        Order Now — Risk Free
                        <ArrowRight size={16} />
                    </AnimatedCTA>
                    <div className="tprime-cta-trust-points">
                        <span><Check size={14} /> Licensed physician reviews every order</span>
                        <span><Check size={14} /> Full refund if not approved</span>
                        <span><Check size={14} /> FDA-registered compounding pharmacy</span>
                        <span><Check size={14} /> Free shipping — discreet packaging</span>
                        <span><Check size={14} /> Cancel subscription anytime</span>
                    </div>
                    <div className="tprime-cta-trust-strip">
                        <span><Lock size={14} /> Secure Checkout</span>
                        <span><ShieldCheck size={14} /> Money-Back Guarantee</span>
                        <span><Package size={14} /> Fast Shipping</span>
                    </div>
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

            {/* (How It Works moved to after hero) */}

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
            </section>

            {/* 14. Safety & Quality */}
            <section className="b365-section">
                <h2 className="b365-section-heading b365-serif">Pharmaceutical-Grade <em>Standards</em></h2>
                <div className="tprime-trust-grid">
                    {[
          { Icon: Building2, title: 'FDA-Registered 503A Compounding Facility', desc: 'Manufactured in Salt Lake City, UT under strict quality controls' },
          { Icon: BadgeCheck, title: '100% Money-Back Guarantee', desc: 'Full refund if prescription not approved by independent physician' },
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

            {/* 16. FAQ */}
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

            {/* Footer */}
            <SharedFooter />
        </div>);

};

export default TPrime365Page;
