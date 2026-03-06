import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Stethoscope, FlaskConical, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import AnimatedCTA from '@/components/AnimatedCTA/AnimatedCTA';
import './FreeTestosteroneGuidePage.css';

/* ── Parallax hook ── */
const useParallax = (speed = 0.08) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = Math.max(-30, Math.min(30, rect.top * speed));
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return ref;
};

const trustItems = [
  { icon: Users, label: '50,000+ Men Served' },
  { icon: Building2, label: 'FDA-Registered Facility' },
  { icon: Stethoscope, label: 'Physician-Backed' },
  { icon: FlaskConical, label: 'Patent-Pending Science' },
];

const discoverItems = [
  "Why traditional TRT is 'renting' testosterone — and what happens to your body the moment you stop paying rent",
  "The biological difference between testosterone replacement and testosterone optimization (most doctors don't explain this)",
  "How TRT shuts down your HPG axis — the master control system your body uses to produce testosterone naturally",
  "Why men on TRT experience testicular atrophy, fertility loss, and hormonal dependency — and how to avoid all three",
  "The alternative pathway that stimulates your body's own production instead of replacing it",
  "What 'owning' your testosterone actually looks like — keeping your gains even if you stop the protocol",
  "The 4-compound approach shown to increase testosterone 60-664% without a single injection",
];




/* ── Opt-in form with first name + email ── */
const OptInForm = ({
  formId,
  firstName,
  email,
  submitted,
  onFirstNameChange,
  onEmailChange,
  onSubmit,
}: {
  formId: string;
  firstName: string;
  email: string;
  submitted: boolean;
  onFirstNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  if (submitted) {
    return (
      <div className="ftg-success">
        <h3>You're In! 🎉</h3>
        <p>Check your inbox — your free guide is on the way.</p>
      </div>
    );
  }

  return (
    <form id={formId} ref={formRef} className="ftg-form" onSubmit={onSubmit}>
      <div className="ftg-input-wrap">
        <User size={16} className="ftg-input-icon" />
        <input
          type="text"
          className="ftg-input"
          placeholder="First name"
          required
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
        />
      </div>
      <div className="ftg-input-wrap">
        <Mail size={16} className="ftg-input-icon" />
        <input
          type="email"
          className="ftg-input"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </div>
      <AnimatedCTA onClick={() => formRef.current?.requestSubmit()}>
        GET FREE GUIDE <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
      </AnimatedCTA>
      <p className="ftg-privacy-note">
        <Lock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
        100% Free · No spam · Unsubscribe anytime
      </p>
    </form>
  );
};



const FreeTestosteroneGuidePage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Remove root background so fixed video shows through
  useEffect(() => {
    document.documentElement.classList.add('ftg-active');
    return () => document.documentElement.classList.remove('ftg-active');
  }, []);

  const trustRef = useScrollReveal<HTMLDivElement>();
  const discoverRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();
  const ebookParallax = useParallax(0.06);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ firstName, email });
    setSubmitted(true);
  };

  return (
    <div className="ftg-page">
      {/* ── Full-page Fixed Video Background ── */}
      <div className="ftg-hero-video-bg" aria-hidden="true">
        <video autoPlay muted loop playsInline className="ftg-hero-video">
          <source src="/images/ftg-bg-running.mp4" type="video/mp4" />
        </video>
        <div className="ftg-hero-video-overlay" />
      </div>

      {/* ── Hero ── */}
      <section className="ftg-hero">
        {/* P0: On mobile, CTA-side renders first via CSS order */}
        <div className="ftg-hero-left">
          <span className="ftg-hero-tag">Free Guide</span>
          <h1 className="ftg-hero-headline">
            The Difference Between <em>Renting</em> Testosterone and <em>Owning</em> It
          </h1>
          <p className="ftg-hero-sub">
            Most men don't realize they're signing up for a lifetime lease on their own hormones. This guide shows you the difference — and why it matters more than you think.
          </p>
          <OptInForm
            formId="ftg-hero-form"
            firstName={firstName}
            email={email}
            submitted={submitted}
            onFirstNameChange={setFirstName}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="ftg-hero-right" ref={ebookParallax}>
          <div className="ftg-ebook-wrapper">
            <img
              src="/images/ftg-ebook-cover.png"
              alt="Free Guide: The Difference Between Renting Testosterone and Owning It"
              className="ftg-ebook-img"
              loading="eager"
              fetchPriority="high"
            />
            <div className="ftg-ebook-shadow" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <div className="ftg-trust" ref={trustRef}>
        <div className="ftg-trust-bar">
          {trustItems.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="ftg-trust-divider" aria-hidden="true" />}
              <div className="ftg-trust-item">
                <item.icon size={18} className="ftg-trust-icon" />
                <span className="ftg-trust-label">{item.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>


      {/* ── Discover Section ── */}
      <section className="ftg-discover" ref={discoverRef}>
        <div className="ftg-section-header">
          <span className="ftg-section-rule" aria-hidden="true" />
          <h2 className="ftg-section-heading">Inside This Free Guide</h2>
          <span className="ftg-section-rule" aria-hidden="true" />
        </div>
        <div className="ftg-discover-list">
          {discoverItems.map((text, i) => (
            <div className="ftg-discover-item" key={i} style={{ animationDelay: `${i * 80}ms` }}>
              <span className="ftg-discover-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="ftg-discover-accent" aria-hidden="true" />
              <p className="ftg-discover-text">{text}</p>
            </div>
          ))}
        </div>
      </section>



      {/* ── Final CTA ── */}
      <section className="ftg-final-cta" ref={ctaRef}>
        <div className="ftg-cta-video-bg" aria-hidden="true">
          <video autoPlay muted loop playsInline className="ftg-cta-video">
            <source src="/images/ftg-bg-blue.mp4" type="video/mp4" />
          </video>
          <div className="ftg-cta-video-overlay" />
        </div>
        <h2 className="ftg-cta-headline">
          Stop Renting.<br />Start Owning.
        </h2>
        <p className="ftg-cta-sub">Get the Free Guide Now.</p>
        <OptInForm
          formId="ftg-cta-form"
          firstName={firstName}
          email={email}
          submitted={submitted}
          onFirstNameChange={setFirstName}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
        />
        <p className="ftg-cta-micro">Join 50,000+ men optimizing naturally</p>
      </section>

      {/* ── Footer (P2: contact info) ── */}
      <footer className="ftg-footer">
        <img src="/images/best365labs-logo.png" alt="Best 365 Labs" className="ftg-footer-logo" />
        <p>
          © 2026 Best 365 Labs, Inc. · These statements have not been evaluated by the FDA. This guide is for educational purposes only.
        </p>
        <p>
          Questions? <a href="mailto:info@best365labs.com">info@best365labs.com</a>
        </p>
        <p>
          <Link to="/privacy">Privacy Policy</Link>
          <span className="ftg-footer-dot">·</span>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </p>
      </footer>
    </div>
  );
};

export default FreeTestosteroneGuidePage;
