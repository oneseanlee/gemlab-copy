// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GuidesPage.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import { Download, ExternalLink, BookOpen } from 'lucide-react';

interface Guide {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'testosterone' | 'glp1' | 'longevity';
  price: number; // 0 = free
  downloadUrl?: string;
  paymentUrl?: string;
  comingSoon?: boolean;
}

const guides: Guide[] = [
  {
    id: 1,
    title: 'The Difference Between Renting Testosterone and Owning It',
    description: 'Understand why traditional TRT creates dependency — and how non-hormonal optimization lets you produce your own testosterone naturally.',
    image: '/images/guide-renting-testosterone.png',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 2,
    title: 'Testosterone Optimization Without Sacrificing Fertility',
    description: 'Learn how enclomiphene-based protocols preserve sperm production and testicular function while boosting testosterone levels.',
    image: '/images/guide-testosterone-fertility.png',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 3,
    title: 'Before You Commit to TRT — Answer These Questions',
    description: 'A critical self-assessment guide covering the 7 questions every man should answer before starting testosterone replacement therapy.',
    image: '/images/guide-before-trt.png',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 4,
    title: 'What Happens After You Start TRT (That No One Explains)',
    description: 'The real side effects, timeline, and hormonal shifts that happen in weeks 1–12 of TRT — and what they mean for your long-term health.',
    image: '/images/guide-what-happens-trt.png',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 5,
    title: 'How Physicians Restore Testosterone Without Hormone Shutdown',
    description: 'The clinical protocol used by forward-thinking physicians to raise testosterone levels while keeping the HPG axis fully intact.',
    image: '/images/guide-physicians-restore.png',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 6,
    title: 'Testosterone Starts in the Brain — Not the Syringe',
    description: 'Why the hypothalamic-pituitary axis is the real control center for testosterone — and how to optimize it without exogenous hormones.',
    image: '/images/guide-testosterone-brain.png',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 7,
    title: "Dr. Warren's Ultimate Cellular Optimization & Testosterone Protocol",
    description: "A comprehensive digital manual by Steven E. Warren M.D., Ph.D. — the complete owner's guide for optimizing hormonal health at the cellular level.",
    image: '/images/guide-dr-warren-protocol.jpeg',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 8,
    title: 'The Ultimate Cellular Optimization System',
    description: 'How Restore365, Mito365, and Activate365 work together to enhance testosterone therapy results through cellular regeneration and longevity support.',
    image: '/images/guide-cellular-optimization.jpeg',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 9,
    title: "Dr. Steven Warren's Inside Secrets",
    description: 'The simple, powerful roadmap to faster progress — insider strategies from Dr. Warren for accelerating your optimization results.',
    image: '/images/guide-dr-warren-roadmap.jpeg',
    category: 'testosterone',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 10,
    title: 'Maximize Your Results',
    description: 'The smart science of enhanced absorption — understand how MODS Max™ technology delivers 10x bioavailability for superior cellular performance.',
    image: '/images/guide-maximize-results.jpeg',
    category: 'longevity',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 11,
    title: "The Ultimate GLP-1 User's Master Guide",
    description: 'Complete metabolic optimization system for successful weight loss with muscle preservation — everything GLP-1 users need to know.',
    image: '/images/guide-glp1-master.jpeg',
    category: 'glp1',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 12,
    title: 'Guía Maestro del Usuario de GLP-1',
    description: 'Sistema completo de optimización metabólica para una pérdida de peso exitosa con preservación muscular. Versión en español.',
    image: '/images/guide-glp1-master-es.jpeg',
    category: 'glp1',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 13,
    title: 'The GLP-1 Energy Blueprint',
    description: "Why you're exhausted on GLP-1 medications and how to fix it this week — the complete energy restoration protocol.",
    image: '/images/guide-glp1-energy-blueprint.jpeg',
    category: 'glp1',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 14,
    title: 'The GLP-1 Muscle Shield',
    description: 'How to lose fat without losing your strength — the evidence-based approach to preserving lean muscle mass during GLP-1 therapy.',
    image: '/images/guide-glp1-muscle-shield.jpeg',
    category: 'glp1',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 15,
    title: '10 Minute Easy Lymphatic Morning Jumpstart System',
    description: 'A simple daily morning routine to activate your lymphatic system, reduce inflammation, and boost natural detoxification in just 10 minutes.',
    image: '/images/guide-lymphatic-jumpstart.jpeg',
    category: 'longevity',
    price: 0,
    downloadUrl: '/article',
  },
  {
    id: 16,
    title: 'The GLP-1 Food Framework',
    description: 'What to eat when you\'re never hungry — the complete nutritional guide for GLP-1 users to maintain optimal health and energy levels.',
    image: '/images/guide-glp1-food-framework.jpeg',
    category: 'glp1',
    price: 0,
    downloadUrl: '/article',
  },
];

const categories = [
  { key: 'all', label: 'All Guides' },
  { key: 'testosterone', label: 'Testosterone' },
  { key: 'glp1', label: 'GLP-1' },
  { key: 'longevity', label: 'Longevity' },
];

const GuidesPage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileLinks = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/#products' },
    { label: 'The Science', href: '/#science' },
    { label: 'FAQ', href: '/#faq' },
  ];

  const filtered = activeCategory === 'all'
    ? guides
    : guides.filter(g => g.category === activeCategory);

  const categoryLabels: Record<string, string> = {
    testosterone: 'Testosterone Optimization',
    glp1: 'GLP-1 Support',
    longevity: 'Longevity & Wellness',
  };

  const categoryDescriptions: Record<string, string> = {
    testosterone: 'Clinically-informed guides to help you understand and optimize your testosterone levels naturally.',
    glp1: 'Essential resources for GLP-1 users — from nutrition to muscle preservation to energy management.',
    longevity: 'Science-backed strategies for cellular health, absorption, and daily wellness routines.',
  };

  const groupedCategories = activeCategory === 'all'
    ? (['testosterone', 'glp1', 'longevity'] as const)
    : [activeCategory as 'testosterone' | 'glp1' | 'longevity'];

  const renderGuideCard = (guide: Guide) => (
    <div className={`guide-card ${guide.comingSoon ? 'coming-soon' : ''}`} key={guide.id}>
      <div className="guide-card-image">
        {guide.image ? (
          <img src={guide.image} alt={guide.title} loading="lazy" />
        ) : (
          <div className="guide-card-placeholder">
            <BookOpen size={40} />
            <span>Coming Soon</span>
          </div>
        )}
        <div className="guide-price-badge">
          {guide.comingSoon ? (
            <span className="badge-coming-soon">COMING SOON</span>
          ) : guide.price === 0 ? (
            <span className="badge-free">FREE</span>
          ) : (
            <span className="badge-paid">${guide.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="guide-card-body">
        <h3 className="b365-serif">{guide.title}</h3>
        <p>{guide.description}</p>
        <div className="guide-card-action">
          {guide.comingSoon ? (
            <span className="guide-btn-disabled">Coming Soon</span>
          ) : guide.price === 0 ? (
            <a href={guide.downloadUrl} className="guide-btn-free" target={guide.downloadUrl?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              <Download size={16} />
              Download Free
            </a>
          ) : (
            <a href={guide.paymentUrl} className="guide-btn-paid" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} />
              Get Guide — ${guide.price.toFixed(2)}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="b365-page">
      <MobileMenu links={mobileLinks} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Promo Banner */}
      {showBanner && (
        <div className="b365-promo-banner">
          MODS Max™ 10x Absorption Technology — Now Available in All Products
          <button onClick={() => setShowBanner(false)} aria-label="Close banner">✕</button>
        </div>
      )}

      {/* Navigation */}
      <nav className={`b365-nav ${showBanner ? 'with-banner' : ''}`}>
        <div className="b365-nav-inner">
          <button className="b365-hamburger" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
            <iconify-icon icon="lucide:menu" width="24"></iconify-icon>
          </button>
          <Link to="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </Link>
          <ul className="b365-nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#products">Solutions</Link></li>
            <li><Link to="/#science">The Science</Link></li>
            <li><Link to="/#faq">FAQ</Link></li>
          </ul>
          <div className="b365-nav-right">
            <AnimatedCTA href="https://www.skool.com/best365labs/about" small target="_blank" rel="noopener noreferrer">Join the Community</AnimatedCTA>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={`guides-hero ${!showBanner ? 'no-banner' : ''}`}>
        <div className="guides-hero-inner">
          <div className="guides-count-badge">
            <BookOpen size={14} />
            {filtered.length} Free Guides Available
          </div>
          <h1 className="b365-serif">Digital Guides & <em>Resources</em></h1>
          <p className="guides-hero-sub">
            Expert-backed guides to help you make informed decisions about your health optimization journey.
          </p>
          <div className="guides-filters">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`b365-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides by Category */}
      <section className="guides-grid-section">
        {groupedCategories.map(cat => {
          const catGuides = filtered.filter(g => g.category === cat);
          if (catGuides.length === 0) return null;
          return (
            <div className="guides-category-group" key={cat}>
              {activeCategory === 'all' && (
                <div className="guides-category-header">
                  <div className={`guides-category-accent accent-${cat}`} />
                  <div>
                    <h2 className="b365-serif">{categoryLabels[cat]}</h2>
                    <p>{categoryDescriptions[cat]}</p>
                  </div>
                </div>
              )}
              <div className="guides-grid">
                {catGuides.map(renderGuideCard)}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA Section */}
      <section className="guides-cta-section">
        <div className="guides-cta-inner">
          <h2 className="b365-serif">Ready to take the <em>next step?</em></h2>
          <p>Explore our clinically-backed protocols and start your optimization journey today.</p>
          <AnimatedCTA href="/#products">
            View All Products
          </AnimatedCTA>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
};

export default GuidesPage;
