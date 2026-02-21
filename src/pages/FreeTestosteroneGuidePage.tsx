import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Stethoscope, FlaskConical, ArrowRight, Lock, Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './FreeTestosteroneGuidePage.css';

const trustItems = [
  { icon: Users, label: '50,000+ Men Served' },
  { icon: Building2, label: 'FDA-Registered Facility' },
  { icon: Stethoscope, label: 'Physician-Backed Protocols' },
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
  firstName,
  email,
  submitted,
  onFirstNameChange,
  onEmailChange,
  onSubmit,
}: {
  firstName: string;
  email: string;
  submitted: boolean;
  onFirstNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
}) => {
  if (submitted) {
    return (
      <div className="ftg-success">
        <h3>You're In! 🎉</h3>
        <p>Check your inbox — your free guide is on the way.</p>
      </div>
    );
  }

  return (
    <form className="ftg-form" onSubmit={onSubmit}>
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
      <button type="submit" className="ftg-submit">
        GET YOUR FREE GUIDE <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
      </button>
      <p className="ftg-privacy-note">
        <Lock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
        100% Free. No spam. Unsubscribe anytime.
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ firstName, email });
    setSubmitted(true);
  };

  return (
    <div className="ftg-page">
      {/* Hero */}
      <section className="ftg-hero">
        <div className="ftg-hero-left">
          <span className="ftg-hero-tag">Free Guide</span>
          <h1 className="ftg-hero-headline">
            The Difference Between Renting Testosterone and Owning It
          </h1>
          <p className="ftg-hero-sub">
            Most men don't realize they're signing up for a lifetime lease on their own hormones. This guide shows you the difference between replacing your testosterone and actually optimizing your body to produce it — and why it matters more than you think.
          </p>
          <OptInForm
            firstName={firstName}
            email={email}
            submitted={submitted}
            onFirstNameChange={setFirstName}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="ftg-hero-right">
          <div className="ftg-ebook">
            <span className="ftg-ebook-badge">Free Guide</span>
            <div className="ftg-ebook-title">
              The Difference Between Renting Testosterone and Owning It
            </div>
            <span className="ftg-ebook-brand">Best 365 Labs</span>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="ftg-trust" ref={trustRef}>
        {trustItems.map((item, i) => (
          <div className="ftg-trust-card" key={i}>
            <item.icon size={20} className="ftg-trust-icon" />
            <span className="ftg-trust-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Discover Section */}
      <section className="ftg-discover" ref={discoverRef}>
        <h2 className="ftg-section-heading">Inside This Free Guide, You'll Discover:</h2>
        <div className="ftg-discover-grid">
          {discoverItems.map((text, i) => (
            <div className="ftg-discover-item" key={i}>
              <span className="ftg-discover-num">{i + 1}</span>
              <p className="ftg-discover-text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="ftg-proof" ref={proofRef}>
        <h2 className="ftg-section-heading">Real Results From Real Men</h2>
        <div className="ftg-proof-grid">
          {testimonials.map((t, i) => (
            <div className="ftg-proof-card" key={i}>
              <div className="ftg-proof-stars">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={16} fill="#D4A843" stroke="#D4A843" style={{ display: 'inline' }} />
                ))}
              </div>
              <p className="ftg-proof-quote">"{t.quote}"</p>
              <p className="ftg-proof-name">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="ftg-final-cta" ref={ctaRef}>
        <h2 className="ftg-section-heading">
          Stop Renting. Start Owning.<br />Get the Free Guide Now.
        </h2>
        <OptInForm
          firstName={firstName}
          email={email}
          submitted={submitted}
          onFirstNameChange={setFirstName}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
        />
      </section>

      {/* Footer */}
      <footer className="ftg-footer">
        <p>
          © 2026 Best 365 Labs, Inc. | These statements have not been evaluated by the FDA. This guide is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
        <p>
          <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms &amp; Conditions</Link>
        </p>
      </footer>
    </div>
  );
};

export default FreeTestosteroneGuidePage;
