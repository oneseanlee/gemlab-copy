import React from 'react';
import './PartnersPage.css';
import '../pages/OceanRaysPage.css';
import AnimatedCTA from '../components/AnimatedCTA/AnimatedCTA';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import LogoCarousel from '../components/LogoCarousel/LogoCarousel';

const valueProps = [
  { icon: 'lucide:percent', title: '20% Commission', desc: 'Competitive recurring commissions on every referral you send our way.' },
  { icon: 'lucide:trending-up', title: 'Publicly Traded (BHIC)', desc: 'The credibility and longevity of a publicly traded company behind every product.' },
  { icon: 'lucide:flask-conical', title: 'Patent-Pending Tech', desc: 'MODS Max™ sublingual delivery — a truly differentiated product your audience won\'t find elsewhere.' },
  { icon: 'lucide:users', title: '50,000+ Clients', desc: 'Proven market demand and exceptional customer satisfaction across all products.' },
];

const products = [
  { name: 'TPrime365™', price: '$149', period: '/mo', hook: '4-in-1 testosterone optimizer', commission: '$29.80' },
  { name: 'GLP-1 Protocol', price: '$39.95', period: '', hook: 'Mitochondrial support protocol', commission: '$7.99' },
  { name: 'UCOS', price: '$175', period: '', hook: '24-hour cellular optimization', commission: '$35.00' },
  { name: 'GLP-1 Bundle', price: '$175', period: '', hook: '4-product system + physician consult', commission: '$35.00' },
  { name: 'NHTO Bundle', price: '$250', period: '', hook: 'TPrime365 Rx + full UCOS system', commission: '$50.00' },
];

const audiences = [
  { icon: 'lucide:heart-pulse', label: 'Health & Wellness Clinics' },
  { icon: 'lucide:video', label: 'Fitness Influencers & Creators' },
  { icon: 'lucide:dumbbell', label: 'Gym Owners & Personal Trainers' },
  { icon: 'lucide:atom', label: 'Biohacking & Longevity Communities' },
  { icon: 'lucide:monitor-smartphone', label: 'Telehealth Platforms & Practitioners' },
  { icon: 'lucide:megaphone', label: 'Affiliate Marketers in Men\'s Health' },
];

const commissionExamples = [
  { product: 'TPrime365™', price: '$149', referrals: 10, earning: '$298' },
  { product: 'UCOS', price: '$175', referrals: 15, earning: '$525' },
  { product: 'GLP-1 Bundle', price: '$175', referrals: 25, earning: '$875' },
  { product: 'NHTO Bundle', price: '$250', referrals: 20, earning: '$1,000' },
];

const trustSignals = [
  { icon: 'lucide:shield-check', label: 'FDA-Registered Manufacturing' },
  { icon: 'lucide:badge-check', label: '503A Licensed Pharmacy' },
  { icon: 'lucide:award', label: 'cGMP Certified' },
  { icon: 'lucide:building-2', label: 'Publicly Traded (BHIC)' },
];

const PartnersPage = () => {
  const handleApplyClick = () => {
    const subject = encodeURIComponent('Partner Application — Best 365 Labs');
    const body = encodeURIComponent(
      'Hi Best 365 Labs Team,\n\nI\'m interested in becoming an affiliate partner.\n\nName:\nCompany / Brand:\nWebsite / Social Links:\nAudience Size:\nMessage:\n\nLooking forward to hearing from you.'
    );
    window.location.href = `mailto:info@best365labs.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="partners-page">

      {/* Navigation */}
      <nav className="b365-nav">
        <div className="b365-nav-inner">
          <a href="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <ul className="b365-nav-links">
            <li><a href="#why">Why Partner</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#earnings">Earnings</a></li>
            <li><a href="#apply">Apply</a></li>
          </ul>
          <div className="b365-nav-right">
            <AnimatedCTA href="#apply" small>Apply Now</AnimatedCTA>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="partners-hero">
        <div className="partners-hero-inner">
          <span className="partners-hero-badge">Affiliate Program</span>
          <h1>Partner With<br />Best 365 <em>Labs</em></h1>
          <p className="subhead">
            Earn 20% commission on every sale. Join the movement redefining men's health optimization with patent-pending technology and a publicly traded brand.
          </p>
          <AnimatedCTA href="#apply" className="btn-white-cta">
            Apply to Become a Partner
          </AnimatedCTA>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section id="why" className="b365-section">
        <h2 className="b365-section-heading b365-serif">
          Why Partner With <em>Us</em>
        </h2>
        <div className="partners-value-grid">
          {valueProps.map((v, i) => (
            <div className="partners-value-card" key={i}>
              <div className="partners-value-icon">
                <iconify-icon icon={v.icon} width="28"></iconify-icon>
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Portfolio */}
      <section id="products" className="b365-section b365-section-alt">
        <h2 className="b365-section-heading b365-serif">
          Products You'll <em>Promote</em>
        </h2>
        <p className="partners-sub">Five premium products with strong margins and proven conversion rates.</p>
        <div className="partners-products-grid">
          {products.map((p, i) => (
            <div className="partners-product-card" key={i}>
              <h4>{p.name}</h4>
              <div className="partners-product-price">{p.price}<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--b365-text-secondary)' }}>{p.period}</span></div>
              <div className="partners-product-hook">{p.hook}</div>
              <div className="partners-product-commission">You earn {p.commission}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who This Is For */}
      <section className="b365-section">
        <h2 className="b365-section-heading b365-serif">
          Who This Is <em>For</em>
        </h2>
        <div className="partners-audience-grid">
          {audiences.map((a, i) => (
            <div className="partners-audience-card" key={i}>
              <div className="partners-audience-icon">
                <iconify-icon icon={a.icon} width="24"></iconify-icon>
              </div>
              <h4>{a.label}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="b365-section b365-section-alt">
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
      </section>

      {/* Commission Breakdown */}
      <section id="earnings" className="b365-section">
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
      </section>

      {/* Trust Signals */}
      <section className="b365-section b365-section-alt">
        <h2 className="b365-section-heading b365-serif">
          Trusted & <em>Verified</em>
        </h2>
        <div className="partners-trust-grid">
          {trustSignals.map((t, i) => (
            <div className="partners-trust-item" key={i}>
              <span className="partners-trust-icon">
                <iconify-icon icon={t.icon} width="24"></iconify-icon>
              </span>
              {t.label}
            </div>
          ))}
        </div>
        <LogoCarousel />
      </section>

      {/* Application CTA */}
      <section id="apply" className="partners-apply-section">
        <div className="partners-apply-inner">
          <h2>Ready to <em>Partner?</em></h2>
          <p>
            Send us your details and our partnerships team will get back to you within 48 hours with everything you need to start earning.
          </p>
          <AnimatedCTA
            href="#"
            className="btn-white-cta"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); handleApplyClick(); }}
          >
            Apply Now — Start Earning 20%
          </AnimatedCTA>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
};

export default PartnersPage;
