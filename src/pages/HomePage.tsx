// @ts-nocheck
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import TrustBadges from '../components/TrustBadges/TrustBadges';
import { CartDrawer } from '../components/CartDrawer';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Menu, ArrowRight, Brain, Flame, Zap, Dumbbell, Check, Truck, CheckCircle, Headphones, BadgeCheck, Shield } from 'lucide-react';

/* ──── Parallax hook ──── */
const useParallax = (speed = 0.3) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top * speed;
      const img = el.querySelector('img') as HTMLElement | null;
      if (img) img.style.transform = `translateY(${offset}px) scale(1.08)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return ref;
};

/* ──── Scroll-reveal wrapper ──── */
const RevealSection = ({ children, className = '', ...props }) => {
  const ref = useScrollReveal<HTMLElement>();
  return <section ref={ref} className={className} {...props}>{children}</section>;
};

/* ──── Social proof banner messages ──── */
const socialProofMessages = [
  '🔬 2,847 protocols shipped this month',
  '⭐ Rated 4.9/5 from 50,000+ clients',
  '🏆 Trusted by 50,000+ clients nationwide',
  '💪 New clients activating protocols daily',
  '🚀 Physician-supervised optimization delivered to your door',
];

const products = [
  {
    id: 1,
    name: 'TPrime365™',
    tags: [{ label: 'Flagship', flagship: true }, { label: 'Fertility-Friendly' }],
    category: 'testosterone',
    ribbon: 'MOST POPULAR',
    bestFor: '4-in-1 sublingual testosterone optimizer. Boosts T-levels 60–664% without injections or shutdown.',
    benefits: [
      'Increases testosterone 60–664% in 2–4 weeks',
      'Maintains natural testicular size & fertility',
      'No hormonal dependency or shutdown',
    ],
    price: '$149',
    priceSuffix: '/mo',
    priceNote: 'Includes Physician Consultation',
    shippingBadge: 'Ships in 48hrs',
    image: '/images/product-tprime.png',
    mobileImage: '/images/mobile-tprime.png',
    href: '/tprime365',
  },
  {
    id: 2,
    name: 'GLP-1 Optimization Protocol',
    tags: [{ label: 'Weight Loss' }, { label: 'Mitochondrial' }],
    category: 'weight-loss',
    bestFor: 'Preserve muscle and energy during GLP-1 weight loss therapy.',
    benefits: [
      '72% more lean mass preserved vs GLP-1 alone',
      '38% boost in ATP production',
      '42% reduction in leptin resistance',
    ],
    price: '$39.95',
    priceSuffix: '',
    priceNote: 'Launch Offer (Reg. $90.00)',
    shippingBadge: 'Free Shipping',
    image: '/images/product-glp-protocol.png',
    mobileImage: '/images/mobile-glp-protocol.png',
    href: '/glp1-protocol',
  },
  {
    id: 3,
    name: 'Ultimate Cellular Optimization System',
    tags: [{ label: 'Longevity' }, { label: '3-Product Stack' }],
    category: 'longevity',
    bestFor: '24-hour energy, focus, and longevity optimization — morning to night.',
    benefits: [
      '170mg NAD+ daily for cellular repair',
      'GHK-Cu Peptide + PQQ for mitochondrial biogenesis',
      'Evening recovery with GABA + Melatonin + Zinc',
    ],
    originalPrice: '$258',
    price: '$175',
    priceSuffix: '',
    priceNote: '3-Product Synergistic Stack',
    shippingBadge: 'Free Shipping',
    image: '/images/product-ucos.png',
    mobileImage: '/images/mobile-ucos.png',
    href: '/ucos',
  },
  {
    id: 4,
    name: 'GLP-1 Cellular Bundle',
    tags: [{ label: 'Bundle' }, { label: 'Physician Included' }],
    category: 'systems',
    ribbon: 'BEST VALUE',
    bestFor: 'Complete weight loss system — 4 products + physician consultation + GLP-1 medication (if approved).',
    benefits: [
      'Activate365, Mito365, Restore365 & Metabolism+ included',
      'GLP-1 medication prescribed if medically appropriate',
      'Risk-Free: $140 refund if not approved; keep the $139 supplement bundle',
    ],
    originalPrice: '$279',
    price: '$175',
    priceSuffix: '',
    priceNote: 'Total Value: $655',
    shippingBadge: 'Free Shipping',
    image: '/images/product-glp1-ucos.png',
    mobileImage: '/images/mobile-glp1-ucos.png',
    href: '/glp1-ucos',
  },
  {
    id: 5,
    name: 'Non-Hormonal Testosterone Bundle',
    tags: [{ label: 'Maximum Optimization' }, { label: 'Rx + System' }],
    category: 'systems',
    bestFor: 'Maximum cellular and hormonal synergy — Rx optimizer + complete UCOS stack.',
    benefits: [
      'Prescription-grade sublingual Enclomiphene formula',
      'Complete 3-product cellular optimization stack',
      '$140 refundable if not medically approved; $160 stack is yours to keep',
    ],
    originalPrice: '$300',
    price: '$250',
    priceSuffix: '',
    priceNote: 'Physician Review via happyMD Included',
    shippingBadge: 'Ships in 48hrs',
    image: '/images/product-nhto.png',
    mobileImage: '/images/mobile-nhto.png',
    href: '/nhto',
  },
];

const tabs = [
  { key: 'all', label: 'All Products' },
  { key: 'testosterone', label: 'Testosterone' },
  { key: 'weight-loss', label: 'Weight Loss' },
  { key: 'longevity', label: 'Longevity' },
  { key: 'systems', label: 'Systems' },
];

const faqData = [
  {
    q: 'What is MODS Max™ technology?',
    a: 'MODS Max™ is our patent-pending sublingual delivery system that uses microdose reactive oxygen species (ROS) to briefly open mucosal barriers, delivering up to 10x enhanced absorption directly into the bloodstream — bypassing the digestive system entirely.',
  },
  {
    q: 'What if I\'m not approved?',
    a: 'If the physician determines you are not a candidate for the prescription component, the $140 consultation fee is fully refunded. You keep any supplement products included in your bundle regardless of approval status.',
  },
  {
    q: 'Do I need a prescription?',
    a: 'Products containing Enclomiphene (TPrime365™ and the Non-Hormonal Testosterone Bundle) require a prescription. A licensed physician consultation via the happyMD network is included with your purchase. Our supplement-only products (UCOS, GLP-1 Optimization Protocol) do not require a prescription.',
  },
  {
    q: 'What\'s included in my subscription?',
    a: 'Your monthly subscription includes the complete sublingual formula, physician consultation access, and free shipping. No hidden fees, no contracts — cancel anytime. For example, TPrime365™ at $149/mo includes the 4-in-1 Enclomiphene + Spermidine + Boron + Vitamin C formula plus ongoing physician support.',
  },
  {
    q: 'Will this affect my fertility?',
    a: 'No. Unlike traditional TRT which can suppress sperm production and cause testicular atrophy, TPrime365™ stimulates your body\'s natural LH/FSH production — preserving fertility and maintaining testicular function.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most clients report noticeable improvements in energy and drive within 1–2 weeks. Clinical data shows testosterone increases of 60–664% within 2–4 weeks of consistent use. Individual results vary based on baseline levels and overall health.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Most orders ship within 48 hours of physician approval. Standard delivery takes 7–10 business days. All shipments arrive in discreet packaging. We currently ship within the United States.',
  },
];

const testimonials = [
  { img: '/images/testimonial-brett-earnshaw.png', name: 'Brett Earnshaw', quote: 'My T-levels went from 658 to 749 in two months. More energy, sharper focus, better performance.' },
  { img: '/images/testimonial-kerry-reyes-bg.png', name: 'Kerry Reyes', quote: 'I felt the difference in the first week. No crash, no mood swings — just steady energy all day.' },
  { img: '/images/testimonial-mike-vandyke-bg.png', name: 'Mike VanDyke', quote: 'Rapid improvements in energy and cellular performance. It\'s a game-changer for anyone serious about health.' },
  { img: '/images/testimonial-sean-lee.png', name: 'Sean Lee', quote: 'The sublingual delivery is incredible — absorbs in seconds. I\'m sleeping better and recovering faster.' },
  { img: '/images/testimonial-ernesto-cruz.png', name: 'Ernesto Cruz', quote: 'T-levels from 280 to 680 in 6 weeks. My wife noticed the difference before I did.' },
  { img: '/images/testimonial-jay-atkins.png', name: 'Jay Atkins', quote: 'Finally a protocol that works without needles. I\'ve got my drive back and I feel 10 years younger.' },
];

const TestimonialsCarousel = () => {
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
        {testimonials.map((t, i) => (
          <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="b365-testimonial-card">
              <img src={t.img} alt={t.name} loading="lazy" />
                <div className="card-body">
                <div className="name">{t.name}</div>
                <div className="product-using">Using: {['TPrime365™', 'UCOS System', 'UCOS System', 'TPrime365™', 'TPrime365™', 'TPrime365™'][i]}</div>
                <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
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

/* ──── Social Proof Ticker ──── */
const SocialProofBanner = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(prev => (prev + 1) % socialProofMessages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="b365-social-proof-banner">
      <span key={idx} className="social-proof-msg">{socialProofMessages[idx]}</span>
    </div>
  );
};

/* ──── Sticky Mobile CTA ──── */
const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 700);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`b365-sticky-mobile-cta ${visible ? 'visible' : ''}`}>
      <div className="sticky-cta-inner">
        <div className="sticky-cta-text">
          <span className="sticky-cta-label">Best 365 Labs</span>
          <span className="sticky-cta-price">Explore Protocols</span>
        </div>
        <AnimatedCTA href="#products" small>Find Your Protocol</AnimatedCTA>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const parallaxRef = useParallax(0.25);

  const mobileLinks = [
    { label: 'Solutions', href: '#products' },
    { label: 'The Science', href: '#science' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
  ];

  const filteredProducts = activeTab === 'all' ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="b365-page">
      <MobileMenu links={mobileLinks} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* 1. Social Proof Ticker Banner */}
      <SocialProofBanner />

      {/* 2. Navigation — CartDrawer replaces external community CTA */}
      <nav className="b365-nav with-banner">
        <div className="b365-nav-inner">
          <button className="b365-hamburger" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <a href="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <ul className="b365-nav-links">
            <li><a href="#products">Solutions</a></li>
            <li><a href="#science">The Science</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <div className="b365-nav-right">
            <CartDrawer />
          </div>
        </div>
      </nav>

      {/* 3. Hero Section — benefit-driven copy, Grade 5-7 reading level */}
      <section className="b365-hero">
        <div className="b365-hero-container">
          <div className="b365-hero-image b365-parallax-hero" ref={parallaxRef}>
            <img src="/images/Best365_hero.png" alt="Athletic couple with Best 365 Labs products" fetchPriority="high" />
          </div>
          <div className="b365-hero-text">
            <h1 className="b365-serif hero-entrance hero-entrance-1">More Energy. More Drive. <em>No Needles.</em></h1>
            <p className="subhead hero-entrance hero-entrance-2">
              Get your energy, drive, and strength back. No injections. No hormonal crash.
              Delivered to your door.
            </p>
            <p className="tertiary hero-entrance hero-entrance-3">Absorbs 10x faster than pills — works in under 60 seconds.</p>
            <div className="hero-entrance hero-entrance-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <AnimatedCTA href="#products">
                Find Your Protocol
                <ArrowRight size={16} />
              </AnimatedCTA>
            </div>
            {/* Trusted-by micro-badge */}
            <div className="hero-trusted-badge hero-entrance hero-entrance-5">
              <div className="trusted-avatars">
                <img src="/images/avatar-woman-1.jpg" alt="Client" />
                <img src="/images/avatar-man-1.jpg" alt="Client" />
                <img src="/images/avatar-woman-2.jpg" alt="Client" />
              </div>
              <span>Trusted by <strong>50,000+</strong> clients</span>
            </div>
          </div>
        </div>

        {/* Benefits Row */}
        <div className="b365-benefits-row">
          {[
            { Icon: Brain, label: 'Sharper Focus', image: '/images/benefit-focus.png' },
            { Icon: Flame, label: 'Increased Drive', image: '/images/benefit-drive-new.png' },
            { Icon: Zap, label: 'Elevated Energy', image: '/images/benefit-energy.png' },
            { Icon: Dumbbell, label: 'Stronger Body', image: '/images/benefit-body.png' },
          ].map((b, i) => (
            <div className="b365-benefit-card" key={i}>
              <div className="benefit-card-img">
                <img src={b.image} alt={b.label} loading="lazy" />
              </div>
              <div className="benefit-card-content">
                <div className="icon-wrap">
                  <b.Icon size={22} />
                </div>
                <h4>{b.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* 4. Product Section — shortened tab labels for mobile horizontal scroll */}
      <RevealSection className="b365-section" id="products">
        <h2 className="b365-section-heading b365-serif">Precision Protocols for <em>Every Goal</em></h2>

        <div className="b365-tabs">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`b365-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="b365-product-grid">
          {filteredProducts.map(product => (
            <div className={`b365-product-card ${product.ribbon ? 'has-ribbon' : ''}`} key={product.id}>
              {product.ribbon && (
                <div className={`product-ribbon ${product.ribbon === 'BEST VALUE' ? 'ribbon-value' : ''}`}>
                  {product.ribbon}
                </div>
              )}
              <div className="product-card-image">
                <picture>
                  <source media="(max-width: 640px)" srcSet={product.mobileImage} />
                  <img src={product.image} alt={product.name} loading="lazy" />
                </picture>
              </div>
              <div className="tags">
                {product.tags.map((tag, i) => (
                  <span className={`tag ${tag.flagship ? 'flagship' : ''}`} key={i}>{tag.label}</span>
                ))}
              </div>
              <h3 className="b365-serif">{product.name}</h3>
              <p className="best-for">{product.bestFor}</p>
              <ul className="benefits-list">
                {product.benefits.map((b, i) => (
                  <li key={i}>
                    <Check size={16} className="check" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="price">
                {product.originalPrice && (
                  <span style={{ textDecoration: 'line-through', color: '#999', fontSize: 16, marginRight: 8 }}>
                    {product.originalPrice}
                  </span>
                )}
                {product.price}<span>{product.priceSuffix}</span>
              </div>
              <p className="price-note">{product.priceNote}</p>
              {product.shippingBadge && (
                <div className="shipping-badge">
                  <Truck size={14} />
                  {product.shippingBadge}
                </div>
              )}
              <div className="card-actions" style={{ justifyContent: 'center' }}>
                <AnimatedCTA href={product.href} className="card-cta">View Details</AnimatedCTA>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* 5. 3-Step Process — moved up for better visual hierarchy */}
      <RevealSection className="b365-section b365-section-alt" id="process">
        <h2 className="b365-section-heading b365-serif">It's easy to <em>get started.</em></h2>
        <div className="b365-steps-grid">
          <div className="b365-step-card">
            <div className="step-number">01</div>
            <h3 className="b365-serif">Complete Your Health Intake</h3>
            <p>A quick 5-minute online health questionnaire to understand your goals and medical history.</p>
          </div>
          <div className="b365-step-card">
            <div className="step-number">02</div>
            <h3 className="b365-serif">Physician Review</h3>
            <p>A licensed healthcare provider via the happyMD network reviews your intake and determines the best protocol.</p>
          </div>
          <div className="b365-step-card">
            <div className="step-number">03</div>
            <h3 className="b365-serif">Discreet Delivery</h3>
            <p>Your personalized optimization protocol arrives at your door in 7–10 business days. Discreet packaging guaranteed.</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <AnimatedCTA href="#products">
            Take the Health Intake
            <ArrowRight size={16} />
          </AnimatedCTA>
        </div>
      </RevealSection>

      {/* 6. Testimonials — moved up, now includes quotes */}
      <RevealSection className="b365-section">
        <h2 className="b365-section-heading b365-serif">Real Clients. <em>Real Results.</em></h2>
        <TestimonialsCarousel />
        {/* Post-testimonial CTA — conversion capture at peak social proof */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <AnimatedCTA href="#products">
            See What Protocol Is Right for You
            <ArrowRight size={16} />
          </AnimatedCTA>
        </div>
      </RevealSection>

      {/* 7. Stats / Trust Section */}
      <RevealSection className="b365-section b365-section-alt" id="science">
        <h2 className="b365-section-heading b365-serif">Max performance. <em>Max support.</em></h2>
        <div className="b365-stats-grid">
          <div className="b365-stat-card">
            <div className="stat-label">MODS Max™ Technology</div>
            <div className="stat-value">10x Absorption</div>
            <div className="stat-desc">Patent-pending sublingual delivery bypasses the digestive system for rapid, enhanced bioavailability.</div>
          </div>
          <div className="b365-stat-card">
            <div className="stat-label">The Telehealth Advantage</div>
            <div className="stat-value">24/7 Access</div>
            <div className="stat-desc">Licensed physicians available through the happyMD network. Real support, real guidance, whenever you need it.</div>
          </div>
          <div className="b365-stat-card">
            <div className="stat-label">A Growing Community</div>
            <div className="stat-value">50,000+</div>
            <div className="stat-desc">Clients optimizing their hormones, energy, and longevity with Best 365 Labs protocols.</div>
          </div>
        </div>
      </RevealSection>

      {/* 8. Guarantee Section */}
      <RevealSection className="b365-section">
        <div className="b365-guarantee">
          <div>
            <h2>Improved testosterone <em>or you don't pay.</em></h2>
            <p>
              We stand behind TPrime365™ with a risk-free guarantee. If your physician determines you are not a candidate, the $140 consultation fee is fully refunded. You keep any supplement products included in your bundle regardless of approval status.
            </p>
            <p>
              For approved clients, clinical data shows testosterone increases of 60–664% within 2–4 weeks — with no testicular atrophy, no fertility suppression, and no hormonal dependency.
            </p>
            <AnimatedCTA href="#products" style={{ marginTop: 8 }}>
              Start Risk-Free
              <ArrowRight size={16} />
            </AnimatedCTA>
          </div>
          <div className="b365-guarantee-image">
            <img src="/images/tprime-guarantee-hero.png" alt="TPrime365 product with athlete" loading="lazy" />
          </div>
        </div>
      </RevealSection>

      {/* 9. Clinical Comparison Table */}
      <RevealSection className="b365-section b365-section-alt">
        <h2 className="b365-section-heading b365-serif">The <em>TPrime365™</em> Advantage</h2>
        <div className="b365-table-wrap">
          <table className="b365-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>TPrime365™</th>
                <th>Traditional TRT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-col">Testicular Atrophy</td>
                <td className="positive">None</td>
                <td className="negative">Up to 17% decrease</td>
              </tr>
              <tr>
                <td className="feature-col">Fertility</td>
                <td className="positive">Preserved</td>
                <td className="negative">Suppressed</td>
              </tr>
              <tr>
                <td className="feature-col">Delivery Method</td>
                <td className="positive">Sublingual (MODS Max™)</td>
                <td className="negative">Injections</td>
              </tr>
              <tr>
                <td className="feature-col">Hormonal Dependency</td>
                <td className="positive">None</td>
                <td className="negative">Lifelong</td>
              </tr>
              <tr>
                <td className="feature-col">Natural Production</td>
                <td className="positive">Stimulated</td>
                <td className="negative">Shut down</td>
              </tr>
            </tbody>
          </table>
        </div>
      </RevealSection>

      {/* 10. Power Up Section — CTA now links to products instead of dead-end */}
      <RevealSection className="b365-section b365-power-up">
        <div className="b365-power-up-inner">
          <div>
            <h2>Power up your optimization with <em>MODS Max™</em></h2>
            <p>
              Our patent-pending sublingual delivery system uses microdose reactive oxygen species (ROS) to briefly open mucosal barriers — delivering ingredients directly into your bloodstream with up to 10x enhanced absorption.
            </p>
            <ul className="power-benefits">
              <li>
                <CheckCircle size={20} />
                Bypasses digestive degradation entirely
              </li>
              <li>
                <CheckCircle size={20} />
                Rapid onset — absorbs in under 60 seconds
              </li>
              <li>
                <CheckCircle size={20} />
                No pills, no injections, no gut disruption
              </li>
            </ul>
            <AnimatedCTA href="#products" className="btn-white-cta">Shop Protocols</AnimatedCTA>
          </div>
          <div className="b365-power-up-visual">
            <img src="/images/tprime-sublingual-delivery.jpg" alt="MODS Max sublingual delivery technology" loading="lazy" />
          </div>
        </div>
      </RevealSection>

      {/* 11. FAQ — reordered with price/shipping questions added */}
      <RevealSection className="b365-section" id="faq">
        <div className="b365-faq-layout">
          <div className="b365-faq-left">
            <h2>You have questions, <em>we have answers.</em></h2>
            <AnimatedCTA href="mailto:info@best365labs.com" style={{ marginTop: 8 }}>
              <Headphones size={16} />
              Contact Support
            </AnimatedCTA>
          </div>
          <div>
            {faqData.map((item, i) => (
              <div className="b365-faq-item" key={i}>
                <button className="b365-faq-trigger" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}
                  <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="b365-faq-answer">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 12. Digital Guides & Resources — moved to bottom, de-emphasized */}
      <RevealSection className="b365-section b365-guides-section">
        <h2 className="b365-serif" style={{ textAlign: 'center', marginBottom: 12 }}>
          Digital Guides & <em>Resources</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--b365-text-secondary)', maxWidth: 560, margin: '0 auto 48px', fontSize: 15 }}>
          Expert-backed guides to help you make informed decisions about your health optimization journey.
        </p>
        <div className="b365-guides-grid">
          {[
            { img: '/images/guide-renting-testosterone.png', title: 'The Difference Between Renting Testosterone and Owning It' },
            { img: '/images/guide-testosterone-fertility.png', title: 'Testosterone Optimization Without Sacrificing Fertility' },
            { img: '/images/guide-before-trt.png', title: 'Before You Commit to TRT — Answer These Questions' },
          ].map((guide, i) => (
            <a href="/guides" className="b365-guide-card" key={i}>
              <img src={guide.img} alt={guide.title} loading="lazy" />
              <h4>{guide.title}</h4>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <AnimatedCTA href="/guides">See All Guides</AnimatedCTA>
        </div>
      </RevealSection>

      {/* 13. Footer */}
      <SharedFooter />

    </div>
  );
};

export default HomePage;
