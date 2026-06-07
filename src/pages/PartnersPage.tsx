import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './PartnersPage.css';
import '../pages/HomePage.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import LogoCarousel from '../components/LogoCarousel/LogoCarousel';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import PartnerApplicationForm from '../components/PartnerApplicationForm/PartnerApplicationForm';
import PartnerFAQ from '../components/PartnerFAQ/PartnerFAQ';
import partnersHero from '../assets/partners-hero.jpg';
import {
  Percent, TrendingUp, FlaskConical, Users,
  HeartPulse, Video, Dumbbell, Atom, MonitorSmartphone, Megaphone,
  ShieldCheck, BadgeCheck, Award, Building2, Menu,
  Link2, FileText, ImageIcon, BarChart3,
} from 'lucide-react';
import SEO from '@/components/SEO';

const valueProps = [
  { Icon: Percent, title: '20% Commission', desc: 'Competitive recurring commissions on every referral you send our way.' },
  { Icon: TrendingUp, title: 'Publicly Traded (BHIC)', desc: 'The credibility and longevity of a publicly traded company behind every product.' },
  { Icon: FlaskConical, title: 'Patent-Pending Tech', desc: 'MODS Max™ sublingual delivery — a truly differentiated product your audience won\'t find elsewhere.' },
  { Icon: Users, title: '50,000+ Clients', desc: 'Proven market demand and exceptional customer satisfaction across all products.' },
];

const products = [
  { name: 'TPrime365™', price: '$149', period: '/mo', hook: '4-in-1 testosterone optimizer', commission: '$29.80' },
  { name: 'GLP-1 Protocol', price: '$39.95', period: '', hook: 'Mitochondrial support protocol', commission: '$7.99' },
  { name: 'UCOS', price: '$175', period: '', hook: '24-hour cellular optimization', commission: '$35.00' },
  { name: 'GLP-1 Bundle', price: '$175', period: '', hook: '4-product system + physician consult', commission: '$35.00' },
  { name: 'NHTO Bundle', price: '$250', period: '', hook: 'TPrime365 Rx + full UCOS system', commission: '$50.00' },
];

const audiences = [
  { Icon: HeartPulse, label: 'Health & Wellness Clinics' },
  { Icon: Video, label: 'Fitness Influencers & Creators' },
  { Icon: Dumbbell, label: 'Gym Owners & Personal Trainers' },
  { Icon: Atom, label: 'Biohacking & Longevity Communities' },
  { Icon: MonitorSmartphone, label: 'Telehealth Platforms & Practitioners' },
  { Icon: Megaphone, label: 'Affiliate Marketers in Men\'s Health' },
];

const commissionExamples = [
  { product: 'TPrime365™', price: '$149', referrals: 10, earning: '$298' },
  { product: 'UCOS', price: '$175', referrals: 15, earning: '$525' },
  { product: 'GLP-1 Bundle', price: '$175', referrals: 25, earning: '$875' },
  { product: 'NHTO Bundle', price: '$250', referrals: 20, earning: '$1,000' },
];

const trustSignals = [
  { Icon: ShieldCheck, label: 'FDA-Registered Manufacturing' },
  { Icon: BadgeCheck, label: '503A Licensed Pharmacy' },
  { Icon: Award, label: 'cGMP Certified' },
  { Icon: Building2, label: 'Publicly Traded (BHIC)' },
];

const ugcVideos = [
  'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec46bac245857f16caa.mp4',
  'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec4a9efde243ace875b.mp4',
  'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec43b3cc9f4a7114cf0.mp4',
  'https://storage.googleapis.com/msgsndr/5qn625UKZAh4DtULiYYp/media/69940ec41d5e04501a7a9db9.mp4',
];

const assetKit = [
  { Icon: Link2, title: 'Tracking Link', desc: 'Personal URL with 60-day cookie attribution.' },
  { Icon: FileText, title: 'Swipe Copy', desc: 'Email scripts, captions, hooks that convert.' },
  { Icon: ImageIcon, title: 'Product Imagery', desc: 'Hero shots, lifestyle photos, UGC clips.' },
  { Icon: BarChart3, title: 'Live Dashboard', desc: 'Track clicks, conversions, and earnings.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const PartnersPage: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Affiliate Partner Program — Earn 20% | Best 365 Labs';
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? '';
    meta?.setAttribute(
      'content',
      'Join the Best 365 Labs partner program. Earn 20% recurring commission promoting patent-pending men\'s health products from a publicly traded brand.'
    );
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc) meta.setAttribute('content', prevDesc);
    };
  }, []);

  const navLinks = [
    { label: 'Why Partner', href: '#why' },
    { label: 'Products', href: '#products' },
    { label: 'Earnings', href: '#earnings' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Apply', href: '#apply' },
  ];

  return (
    <div className="partners-page">
      <SEO title={"Partner Program | Earn 20% Commission — Best 365 Labs"} description={"Join the Best 365 Labs partner program. Earn 20% commission on TPrime365, UCOS, GLP-1 products."} path={"/partners"} />

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
          <button
            className="b365-hamburger"
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <a href="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <ul className="b365-nav-links">
            <li><a href="#why">Why Partner</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#earnings">Earnings</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#apply">Apply</a></li>
          </ul>
          <div className="b365-nav-right">
            <AnimatedCTA href="#apply" small>Apply Now</AnimatedCTA>
          </div>
        </div>
      </nav>
      <MobileMenu links={navLinks} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* 3. Hero — Lifestyle Image Card (TPrime365 Style) */}
      <section className={`partners-hero-section ${!showBanner ? 'no-banner' : ''}`}>
        <div className="partners-hero-container">
          <div className="partners-hero-img">
            <img
              src={partnersHero}
              alt="Best 365 Labs partner holding a premium supplement bottle"
              width={1024}
              height={1024}
            />
          </div>
          <div className="partners-hero-text">
            <span className="partners-hero-badge">Affiliate Program</span>
            <h1>Partner With<br />Best 365 <em>Labs</em></h1>
            <p className="subhead">
              Earn 20% commission on every sale. Join the movement redefining men's health optimization with patent-pending technology and a publicly traded brand.
            </p>
            <AnimatedCTA href="#apply">
              Apply to Become a Partner
            </AnimatedCTA>
            <div className="partners-hero-microproof">
              <span><strong>20%</strong> commission</span>
              <span><strong>60-day</strong> cookie</span>
              <span><strong>$50</strong> avg / sale</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <motion.section id="why" className="b365-section" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">
          Why Partner With <em>Us</em>
        </h2>
        <div className="partners-value-grid">
          {valueProps.map((v, i) => (
            <div className="partners-value-card" key={i}>
              <div className="partners-value-icon">
                <v.Icon size={28} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Product Portfolio */}
      <motion.section id="products" className="b365-section b365-section-alt" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">
          Products You'll <em>Promote</em>
        </h2>
        <p className="partners-sub">Five premium products with strong margins and proven conversion rates.</p>
        <div className="partners-products-grid">
          {products.map((p, i) => (
            <div className="partners-product-card" key={i}>
              <h4>{p.name}</h4>
              <div className="partners-product-price">
                {p.price}<span className="partners-product-period">{p.period}</span>
              </div>
              <div className="partners-product-hook">{p.hook}</div>
              <div className="partners-product-commission">You earn {p.commission}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* UGC Video Testimonials */}
      <motion.section className="b365-section" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">See the <em>Results</em></h2>
        <div className="partners-ugc-grid">
          {ugcVideos.map((src, i) => (
            <div className="partners-ugc-card" key={i}>
              <video controls playsInline preload="metadata" src={src} />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Who This Is For */}
      <motion.section className="b365-section b365-section-alt" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">
          Who This Is <em>For</em>
        </h2>
        <div className="partners-audience-grid">
          {audiences.map((a, i) => (
            <div className="partners-audience-card" key={i}>
              <div className="partners-audience-icon">
                <a.Icon size={24} />
              </div>
              <h4>{a.label}</h4>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section className="b365-section" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">
          How It <em>Works</em>
        </h2>
        <div className="partners-steps">
          <div className="partners-step">
            <div className="partners-step-number">1</div>
            <h4>Apply</h4>
            <p>Fill out our quick partner application below.</p>
            <span className="partners-step-connector">→</span>
          </div>
          <div className="partners-step">
            <div className="partners-step-number">2</div>
            <h4>Get Approved</h4>
            <p>Receive your unique tracking link and marketing assets.</p>
            <span className="partners-step-connector">→</span>
          </div>
          <div className="partners-step">
            <div className="partners-step-number">3</div>
            <h4>Earn</h4>
            <p>Share with your audience and earn 20% on every sale.</p>
          </div>
        </div>
      </motion.section>

      {/* Asset Kit */}
      <motion.section className="b365-section b365-section-alt" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">
          What You'll <em>Get</em>
        </h2>
        <p className="partners-sub">Everything you need to start sending traffic on day one.</p>
        <div className="partners-kit-grid">
          {assetKit.map((k, i) => (
            <div className="partners-kit-card" key={i}>
              <span className="partners-kit-icon"><k.Icon size={22} /></span>
              <h4>{k.title}</h4>
              <p>{k.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Commission Breakdown */}
      <motion.section id="earnings" className="b365-section" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">
          Earning <em>Potential</em>
        </h2>
        <p className="partners-sub">See what your monthly revenue could look like at just 20% commission.</p>
        <div className="partners-commission-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Referrals / Mo</th>
                <th>You Earn</th>
              </tr>
            </thead>
            <tbody>
              {commissionExamples.map((row, i) => (
                <tr key={i}>
                  <td>{row.product}</td>
                  <td>{row.price}</td>
                  <td>{row.referrals}</td>
                  <td className="earning-highlight">{row.earning}/mo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="partners-commission-note">
          These are example projections. Top partners earn significantly more with larger audiences.
        </p>
      </motion.section>

      {/* Trust Signals */}
      <motion.section className="b365-section b365-section-alt" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">
          Trusted & <em>Verified</em>
        </h2>
        <div className="partners-trust-grid">
          {trustSignals.map((t, i) => (
            <div className="partners-trust-item" key={i}>
              <span className="partners-trust-icon">
                <t.Icon size={24} />
              </span>
              {t.label}
            </div>
          ))}
        </div>
        <LogoCarousel />
      </motion.section>

      {/* FAQ */}
      <motion.section id="faq" className="b365-section" {...fadeUp}>
        <h2 className="b365-section-heading b365-serif">
          Partner <em>Questions</em>
        </h2>
        <p className="partners-sub">Everything you might be wondering about the program.</p>
        <PartnerFAQ />
      </motion.section>

      {/* Application CTA — Light Blue Card */}
      <section id="apply" className="partners-apply-section">
        <div className="partners-apply-card">
          <h2>Ready to <em>Partner?</em></h2>
          <p>
            Send us your details and our partnerships team will get back to you within 48 hours with everything you need to start earning.
          </p>
          <PartnerApplicationForm />
        </div>
      </section>

      <SharedFooter />
    </div>
  );
};

export default PartnersPage;
