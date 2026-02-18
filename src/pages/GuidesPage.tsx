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
    title: 'The GLP-1 Muscle Loss Problem — And How to Solve It',
    description: 'Why up to 40% of weight lost on GLP-1 medications can be lean muscle — and the mitochondrial protocol that prevents it.',
    image: '',
    category: 'glp1',
    price: 0,
    comingSoon: true,
  },
  {
    id: 5,
    title: 'Cellular Longevity: The NAD+ & Mitochondria Guide',
    description: 'A deep dive into how NAD+ precursors, PQQ, and peptide support work together to slow cellular aging and boost daily energy.',
    image: '',
    category: 'longevity',
    price: 0,
    comingSoon: true,
  },
  {
    id: 6,
    title: 'The Complete MODS Max™ Science Breakdown',
    description: 'How our patent-pending sublingual delivery system achieves 10x absorption — the clinical research behind microdose ROS technology.',
    image: '',
    category: 'longevity',
    price: 0,
    comingSoon: true,
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
          <div className="guides-hero-icon">
            <BookOpen size={32} />
          </div>
          <h1 className="b365-serif">Digital Guides & <em>Resources</em></h1>
          <p className="guides-hero-sub">
            Expert-backed guides to help you make informed decisions about your health optimization journey.
          </p>

          {/* Category Filters */}
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

      {/* Guides Grid */}
      <section className="guides-grid-section">
        <div className="guides-grid">
          {filtered.map(guide => (
            <div className={`guide-card ${guide.comingSoon ? 'coming-soon' : ''}`} key={guide.id}>
              <div className="guide-card-image">
                {guide.image ? (
                  <img src={guide.image} alt={guide.title} />
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
                    <span className="guide-btn-disabled">
                      Coming Soon
                    </span>
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
          ))}
        </div>
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
