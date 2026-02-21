import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Stethoscope, FlaskConical, ArrowRight, Lock, Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import AnimatedCTA from '@/components/AnimatedCTA/AnimatedCTA';
import './FreeTestosteroneGuidePage.css';

/* ── Parallax hook for ebook image ── */
const useParallax = (speed = 0.08) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top * speed;
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

const testimonials = [
  { name: 'Brett Earnshaw', quote: 'My testosterone went from 658 to 749 in two months — more energy, sharper focus, better performance.' },
  { name: 'Alex T., Age 32', quote: 'From 120 to 917 ng/dL in 3 weeks. This changed everything.' },
  { name: 'David R., Age 45', quote: '380 to 1,150 ng/dL in 4 weeks. I feel like I\'m 30 again.' },
];

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
      <input
        type="text"
        className="ftg-input"
        placeholder="First Name"
        required
        value={firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
      />
      <input
        type="email"
        className="ftg-input"
        placeholder="Email Address"
        required
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <AnimatedCTA onClick={() => formRef.current?.requestSubmit()}>
        GET YOUR FREE GUIDE <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
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

  const trustRef = useScrollReveal<HTMLDivElement>();
  const discoverRef = useScrollReveal<HTMLDivElement>();
  const proofRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();
  const ebookParallax = useParallax(0.06);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ firstName, email });
    setSubmitted(true);
  };

  return (
    <div className="ftg-page">
      {/* ── Hero ── */}
      <section className="ftg-hero">
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
            <div
              className="ftg-discover-item"
              key={i}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="ftg-discover-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="ftg-discover-accent" aria-hidden="true" />
              <p className="ftg-discover-text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="ftg-proof" ref={proofRef}>
        <div className="ftg-proof-badge">
          <Star size={14} fill="var(--b365-blue)" stroke="var(--b365-blue)" />
          <span>4.9/5 from 50,000+ clients</span>
        </div>
        <h2 className="ftg-section-heading">Real Results From Real Men</h2>
        <div className="ftg-proof-stack">
          {testimonials.map((t, i) => (
            <blockquote className="ftg-quote-block" key={i}>
              <span className="ftg-quote-mark" aria-hidden="true">"</span>
              <p className="ftg-quote-text">{t.quote}</p>
              <footer className="ftg-quote-footer">
                <span className="ftg-quote-dash" aria-hidden="true" />
                <cite className="ftg-quote-name">{t.name}</cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="ftg-final-cta" ref={ctaRef}>
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

      {/* ── Footer ── */}
      <footer className="ftg-footer">
        <p>
          © 2026 Best 365 Labs, Inc. · These statements have not been evaluated by the FDA. This guide is for educational purposes only.
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
