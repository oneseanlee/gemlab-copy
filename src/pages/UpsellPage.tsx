import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Shield, Lock, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './UpsellPage.css';

/* ── Countdown Timer ── */
const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(900);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="upsell-timer">
      <span className="upsell-timer-label">This offer expires in</span>
      <div className="upsell-timer-digits">
        <span className="upsell-digit">{mm}</span>
        <span className="upsell-timer-sep">:</span>
        <span className="upsell-digit">{ss}</span>
      </div>
    </div>
  );
};

/* ── Data ── */
const guides = [
  { title: 'The Ultimate Cellular Optimization System: Enhancing Testosterone Therapy Results', desc: 'Maximize every aspect of your testosterone protocol with cellular-level strategies.', img: '/images/guide-maximize-results.png' },
  { title: "The Simple, Powerful Roadmap to Faster Progress: Dr. Steven Warren's Inside Secrets", desc: 'Physician-insider shortcuts that accelerate hormonal optimization.', img: '/images/guide-dr-warren-protocol.png' },
  { title: "Dr. Warren's Ultimate Cellular Optimization & Testosterone Protocol", desc: "The complete clinical protocol used in Dr. Warren's practice.", img: '/images/guide-dr-warren-protocol.png' },
  { title: 'What Happens After You Start TRT (That No One Explains)', desc: 'The hidden side effects, timelines, and decisions most doctors skip.', img: '/images/guide-what-happens-trt.png' },
  { title: 'Testosterone Optimization Without Sacrificing Fertility', desc: 'Protect your fertility while optimizing testosterone naturally.', img: '/images/guide-testosterone-fertility.png' },
  { title: 'Testosterone Starts in the Brain — Not the Syringe', desc: 'How the HPG axis controls everything — and how to leverage it.', img: '/images/guide-testosterone-brain.png' },
  { title: 'How Physicians Restore Testosterone Without Hormone Shutdown', desc: 'The clinical alternatives to traditional TRT that preserve natural production.', img: '/images/guide-physicians-restore.png' },
  { title: 'Before You Commit to TRT, Answer These Questions', desc: 'The 12 critical questions every man should ask before starting TRT.', img: '/images/guide-before-trt.png' },
];

const valueItems = [
  { name: 'The Ultimate Cellular Optimization System', value: 29 },
  { name: "Dr. Warren's Roadmap to Faster Progress", value: 29 },
  { name: "Dr. Warren's Cellular Optimization & Testosterone Protocol", value: 29 },
  { name: 'What Happens After You Start TRT', value: 19 },
  { name: 'Optimization Without Sacrificing Fertility', value: 19 },
  { name: 'Testosterone Starts in the Brain', value: 19 },
  { name: 'How Physicians Restore Testosterone', value: 19 },
  { name: 'Before You Commit to TRT', value: 19 },
  { name: 'BONUS: Priority Access to Best 365 Labs Community', value: 49 },
];


const UpsellPage: React.FC = () => {
  const headlineRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();
  const valueRef = useScrollReveal<HTMLDivElement>();
  const warrenRef = useScrollReveal<HTMLDivElement>();
  const guaranteeRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    document.documentElement.classList.add('ftg-active');
    window.scrollTo(0, 0);
    return () => document.documentElement.classList.remove('ftg-active');
  }, []);

  const handleCTA = () => {
    console.log('CTA clicked — Vault purchase for $29');
  };

  return (
    <div className="upsell-page">
      {/* ── Full-page Fixed Video Background (same as FTG) ── */}
      <div className="ftg-hero-video-bg" aria-hidden="true">
        <video autoPlay muted loop playsInline className="ftg-hero-video">
          <source src="/images/ftg-bg-running.mp4" type="video/mp4" />
        </video>
        <div className="ftg-hero-video-overlay" />
      </div>

      {/* ── Green Confirmation Bar ── */}
      <div className="upsell-confirm-bar">
        <p className="upsell-confirm-main">✅ Your Free Guide Is On Its Way! Check your email in a few minutes.</p>
        <p className="upsell-confirm-sub">WAIT — Before you go, see this one-time offer available only on this page.</p>
      </div>

      {/* ── Headline Section ── */}
      <section className="upsell-headline" ref={headlineRef}>
        <span className="upsell-badge">ONE-TIME OFFER</span>
        <h1 className="upsell-h1">
          Unlock the Complete Testosterone Optimization Vault — 8 Premium Guides for Just <span className="upsell-gold">$29</span>
        </h1>
        <p className="upsell-sub">
          You've just learned the difference between renting and owning your testosterone. Now go deeper — get the complete physician-backed protocol library including Dr. Steven Warren's clinical optimization system.
        </p>
        <CountdownTimer />
      </section>

      {/* ── Product Grid ── */}
      <section className="upsell-grid-section" ref={gridRef}>
        <div className="upsell-grid">
          {guides.map((g, i) => (
            <div className="upsell-card" key={i}>
              <div className="upsell-card-cover">
                <img src={g.img} alt={g.title} className="upsell-card-img" loading="lazy" />
              </div>
              <p className="upsell-card-desc">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Value Stack ── */}
      <section className="upsell-value" ref={valueRef}>
        <h2 className="upsell-value-heading">Here's Everything You're Getting Today</h2>
        <div className="upsell-value-card">
          {valueItems.map((item, i) => (
            <div className="upsell-value-row" key={i}>
              <Check size={16} className="upsell-check" />
              <span className="upsell-value-name">{item.name}</span>
              <span className="upsell-value-price">${item.value} value</span>
            </div>
          ))}
          <div className="upsell-value-total">
            <div className="upsell-value-line">
              <span>Total Value:</span>
              <span>$231</span>
            </div>
            <div className="upsell-value-line upsell-strikethrough">
              <span>Regular Price:</span>
              <span>$197</span>
            </div>
            <div className="upsell-value-line upsell-final-price">
              <span>YOUR PRICE TODAY:</span>
              <span className="upsell-gold-big">$29</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="upsell-cta" onClick={handleCTA}>
          YES — GIVE ME THE COMPLETE VAULT FOR $29 <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </button>
        <p className="upsell-secure">
          <Lock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
          Secure checkout. Instant digital delivery. 60-day money-back guarantee.
        </p>

        {/* Skip */}
        <Link to="/free-testosterone-guide/thank-you" className="upsell-skip">
          No thanks, I just want my free guide →
        </Link>
      </section>

      {/* ── Dr. Warren ── */}
      <section className="upsell-warren" ref={warrenRef}>
        <div className="upsell-warren-card">
          <h2 className="upsell-warren-heading">These Protocols Come From Dr.&nbsp;Steven Warren, MD, PhD</h2>
          <p className="upsell-warren-text">
            Triple board-certified with 35+ years of clinical experience. Dr.&nbsp;Warren's protocols have been used by thousands of men to optimize testosterone safely — without hormonal shutdown or fertility loss.
          </p>
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section className="upsell-guarantee" ref={guaranteeRef}>
        <Shield size={40} className="upsell-shield" />
        <h2 className="upsell-guarantee-heading">60-Day Money-Back Guarantee</h2>
        <p className="upsell-guarantee-text">
          If these guides don't transform your understanding of testosterone optimization, email us for a full refund. No questions asked.
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="upsell-footer">
        <p>© 2026 Best 365 Labs, Inc. | These statements have not been evaluated by the FDA. These guides are for educational purposes only and are not intended to diagnose, treat, cure, or prevent any disease.</p>
        <p>
          <Link to="/privacy">Privacy Policy</Link>
          <span className="upsell-footer-dot">·</span>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </p>
      </footer>
    </div>
  );
};

export default UpsellPage;
