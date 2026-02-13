// @ts-nocheck
import React, { useState } from 'react';
import './OceanRaysPage.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const products = [
  {
    id: 1,
    name: 'TPrime365™',
    tags: [{ label: 'Flagship', flagship: true }, { label: 'Fertility-Friendly' }],
    category: 'testosterone',
    bestFor: '4-in-1 Testosterone Optimizer — Enclomiphene (25mg) + Spermidine (10mg) + Boron (10mg) + Vitamin C (10mg)',
    benefits: [
      'Increases testosterone 60–664% in 2–4 weeks',
      'Maintains natural testicular size & fertility',
      'No hormonal dependency or shutdown',
    ],
    price: '$149',
    priceSuffix: '/mo',
    priceNote: 'Includes Physician Consultation',
    image: '/images/product-tprime.png',
    mobileImage: '/images/mobile-tprime.png',
  },
  {
    id: 2,
    name: 'GLP-1 Optimization Protocol',
    tags: [{ label: 'Weight Loss' }, { label: 'Mitochondrial' }],
    category: 'weight-loss',
    bestFor: 'Mitochondrial support to prevent muscle loss and metabolic crash during active GLP-1 therapy.',
    benefits: [
      '72% more lean mass preserved vs GLP-1 alone',
      '38% boost in ATP production',
      '42% reduction in leptin resistance',
    ],
    price: '$39.95',
    priceSuffix: '',
    priceNote: 'Launch Offer (Reg. $90.00)',
    image: '/images/product-glp-protocol.png',
    mobileImage: '/images/mobile-glp-protocol.png',
  },
  {
    id: 3,
    name: 'Ultimate Cellular Optimization System',
    tags: [{ label: 'Longevity' }, { label: '3-Product Stack' }],
    category: 'longevity',
    bestFor: '24-hour total energy, focus, and longevity optimization — Activate365 + Mito365 + Restore365.',
    benefits: [
      '170mg NAD+ daily for cellular repair',
      'GHK-Cu Peptide + PQQ for mitochondrial biogenesis',
      'Evening recovery with GABA + Melatonin + Zinc',
    ],
    price: '$258',
    priceSuffix: '',
    priceNote: '3-Product Synergistic Stack',
    image: '/images/product-ucos.png',
    mobileImage: '/images/mobile-ucos.png',
  },
  {
    id: 4,
    name: 'GLP-1 Cellular Bundle',
    tags: [{ label: 'Bundle' }, { label: 'Physician Included' }],
    category: 'systems',
    bestFor: 'Full weight loss system — 4-Product Stack + Licensed Physician Consultation + GLP-1 Medication (if approved).',
    benefits: [
      'Activate365, Mito365, Restore365 & Metabolism+ included',
      'GLP-1 medication prescribed if medically appropriate',
      'Risk-Free: $140 refund if not approved; keep the $139 supplement bundle',
    ],
    price: '$279',
    priceSuffix: '',
    priceNote: 'Total Value: $655',
    image: '/images/product-glp1-ucos.png',
    mobileImage: '/images/mobile-glp1-ucos.png',
  },
  {
    id: 5,
    name: 'Non-Hormonal Testosterone Bundle',
    tags: [{ label: 'Maximum Optimization' }, { label: 'Rx + System' }],
    category: 'systems',
    bestFor: 'Maximum cellular and hormonal synergy — Rx Enclomiphene Optimizer + Complete UCOS System.',
    benefits: [
      'Prescription-grade sublingual Enclomiphene formula',
      'Complete 3-product cellular optimization stack',
      '$140 refundable if not medically approved; $160 stack is yours to keep',
    ],
    price: '$300',
    priceSuffix: '',
    priceNote: 'Physician Review via happyMD Included',
    image: '/images/product-nhto.png',
    mobileImage: '/images/mobile-nhto.png',
  },
];

const tabs = [
  { key: 'all', label: 'All Products' },
  { key: 'testosterone', label: 'Testosterone Optimization' },
  { key: 'weight-loss', label: 'Weight Loss Support' },
  { key: 'longevity', label: 'Cellular Longevity' },
  { key: 'systems', label: 'Complete Systems' },
];

const faqData = [
  {
    q: 'What is MODS Max™ technology?',
    a: 'MODS Max™ is our patent-pending sublingual delivery system that uses microdose reactive oxygen species (ROS) to briefly open mucosal barriers, delivering up to 10x enhanced absorption directly into the bloodstream — bypassing the digestive system entirely.',
  },
  {
    q: 'Do I need a prescription?',
    a: 'Products containing Enclomiphene (TPrime365™ and the Non-Hormonal Testosterone Bundle) require a prescription. A licensed physician consultation via the happyMD network is included with your purchase. Our supplement-only products (UCOS, GLP-1 Optimization Protocol) do not require a prescription.',
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
    q: 'What if I\'m not approved?',
    a: 'If the physician determines you are not a candidate for the prescription component, the $140 consultation fee is fully refunded. You keep any supplement products included in your bundle regardless of approval status.',
  },
];

const testimonials = [
  { img: '/images/testimonial-brett-earnshaw.png', name: 'Brett Earnshaw' },
  { img: '/images/testimonial-kerry-reyes-bg.png', name: 'Kerry Reyes' },
  { img: '/images/testimonial-mike-vandyke-bg.png', name: 'Mike VanDyke' },
  { img: '/images/testimonial-sean-lee.png', name: 'Sean Lee' },
  { img: '/images/testimonial-ernesto-cruz.png', name: 'Ernesto Cruz' },
  { img: '/images/testimonial-jay-atkins.png', name: 'Jay Atkins' },
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
              <img src={t.img} alt={t.name} />
              <div className="card-body">
                <div className="name">{t.name}</div>
                <div className="product-using">Using: TPrime365™</div>
                <div className="verified">
                  <iconify-icon icon="lucide:badge-check" width="14"></iconify-icon>
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

const OceanRaysPage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredProducts = activeTab === 'all' ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="b365-page">

      {/* 1. Promo Banner */}
      {showBanner && (
        <div className="b365-promo-banner">
          MODS Max™ 10x Absorption Technology — Now Available in All Products
          <button onClick={() => setShowBanner(false)} aria-label="Close banner">✕</button>
        </div>
      )}

      {/* 2. Navigation */}
      <nav className={`b365-nav ${showBanner ? 'with-banner' : ''}`}>
        <div className="b365-nav-inner">
          <button className="b365-hamburger" aria-label="Menu">
            <iconify-icon icon="lucide:menu" width="24"></iconify-icon>
          </button>
          <a href="#">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <ul className="b365-nav-links">
            <li><a href="#products">Solutions</a></li>
            <li><a href="#science">The Science</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <div className="b365-nav-right">
            <a href="#" className="b365-login-link">Log In</a>
            <AnimatedCTA href="https://community.cell365power.com/" small target="_blank" rel="noopener noreferrer">Join the Community</AnimatedCTA>
          </div>
        </div>
      </nav>

      {/* 3. Hero Section */}
      <section className={`b365-hero ${!showBanner ? 'no-banner' : ''}`}>
        <div className="b365-hero-container">
          <div className="b365-hero-image">
            <img src="/images/hero-couple.png" alt="Athletic couple with Best 365 Labs products" />
          </div>
          <div className="b365-hero-text">
            <h1 className="b365-serif">Your Hormones, <em>Optimized.</em></h1>
            <p className="subhead">
              Precision-grade testosterone and metabolic support delivered to your door.
              No needles. No hormonal shutdown. Just science-backed results.
            </p>
            <p className="tertiary">Powered by MODS Max™ 10x Absorption Technology.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <AnimatedCTA href="#products">
                Start my evaluation
                <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
              </AnimatedCTA>
            </div>
          </div>
        </div>

        {/* Benefits Row */}
        <div className="b365-benefits-row">
          {[
            { icon: 'lucide:brain', label: 'Sharper Focus', image: '/images/benefit-focus.png' },
            { icon: 'lucide:flame', label: 'Increased Drive', image: '/images/benefit-drive-new.png' },
            { icon: 'lucide:zap', label: 'Elevated Energy', image: '/images/benefit-energy.png' },
            { icon: 'lucide:dumbbell', label: 'Stronger Body', image: '/images/benefit-body.png' },
          ].map((b, i) => (
            <div className="b365-benefit-card" key={i}>
              <div className="benefit-card-img">
                <img src={b.image} alt={b.label} />
              </div>
              <div className="benefit-card-content">
                <div className="icon-wrap">
                  <iconify-icon icon={b.icon} width="22"></iconify-icon>
                </div>
                <h4>{b.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Product Section */}
      <section className="b365-section" id="products">
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
            <div className="b365-product-card" key={product.id}>
              <div className="product-card-image">
                <picture>
                  <source media="(max-width: 640px)" srcSet={product.mobileImage} />
                  <img src={product.image} alt={product.name} />
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
                    <iconify-icon icon="lucide:check" width="16" class="check"></iconify-icon>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="price">{product.price}<span>{product.priceSuffix}</span></div>
              <p className="price-note">{product.priceNote}</p>
              <div className="card-actions" style={{ justifyContent: 'center' }}>
                <AnimatedCTA href="#" className="card-cta">Start evaluation</AnimatedCTA>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Stats / Trust Section */}
      <section className="b365-section b365-section-alt" id="science">
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
      </section>

      {/* 6. Guarantee Section */}
      <section className="b365-section">
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
              Start my evaluation
              <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
            </AnimatedCTA>
          </div>
          <div className="b365-guarantee-image">
            <img src="/images/tprime-guarantee-hero.png" alt="TPrime365 product with athlete" />
          </div>
        </div>
      </section>

      {/* 7. Clinical Comparison Table */}
      <section className="b365-section b365-section-alt">
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
      </section>

      {/* 8. Power Up Section */}
      <section className="b365-section b365-power-up">
        <div className="b365-power-up-inner">
          <div>
            <h2>Power up your optimization with <em>MODS Max™</em></h2>
            <p>
              Our patent-pending sublingual delivery system uses microdose reactive oxygen species (ROS) to briefly open mucosal barriers — delivering ingredients directly into your bloodstream with up to 10x enhanced absorption.
            </p>
            <ul className="power-benefits">
              <li>
                <iconify-icon icon="lucide:check-circle" width="20"></iconify-icon>
                Bypasses digestive degradation entirely
              </li>
              <li>
                <iconify-icon icon="lucide:check-circle" width="20"></iconify-icon>
                Rapid onset — absorbs in under 60 seconds
              </li>
              <li>
                <iconify-icon icon="lucide:check-circle" width="20"></iconify-icon>
                No pills, no injections, no gut disruption
              </li>
            </ul>
            <AnimatedCTA href="#" className="btn-white-cta">Learn More</AnimatedCTA>
          </div>
          <div className="b365-power-up-visual">
            <img src="/images/tprime-sublingual-delivery.jpg" alt="MODS Max sublingual delivery technology" />
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="b365-section">
        <h2 className="b365-section-heading b365-serif">Real Clients. <em>Real Results.</em></h2>
        <TestimonialsCarousel />
      </section>

      {/* 10. Digital Guides & Resources */}
      <section className="b365-section b365-guides-section">
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
            <a href="#" className="b365-guide-card" key={i}>
              <img src={guide.img} alt={guide.title} />
              <h4>{guide.title}</h4>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <AnimatedCTA href="#">See All Guides</AnimatedCTA>
        </div>
      </section>

      {/* 11. 3-Step Process */}
      <section className="b365-section b365-section-alt" id="process">
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
            Start my evaluation
            <iconify-icon icon="lucide:arrow-right" width="16"></iconify-icon>
          </AnimatedCTA>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="b365-section" id="faq">
        <div className="b365-faq-layout">
          <div className="b365-faq-left">
            <h2>You have questions, <em>we have answers.</em></h2>
            <AnimatedCTA href="#" style={{ marginTop: 8 }}>
              <iconify-icon icon="lucide:headphones" width="16"></iconify-icon>
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
      </section>

      {/* 13. Footer */}
      <SharedFooter />
    </div>
  );
};

export default OceanRaysPage;
