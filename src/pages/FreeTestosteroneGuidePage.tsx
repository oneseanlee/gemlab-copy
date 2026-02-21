import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Stethoscope, FlaskConical, ArrowRight, Lock, Star, ChevronDown, Mail, User } from 'lucide-react';
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

const testimonials = [
  { name: 'Brett Earnshaw', quote: 'My testosterone went from 658 to 749 in two months — more energy, sharper focus, better performance.', img: '/images/testimonial-brett-earnshaw.png' },
  { name: 'Sean Lee', quote: 'From 120 to 917 ng/dL in 3 weeks. This changed everything.', img: '/images/testimonial-sean-lee.png' },
  { name: 'Darren Lopez', quote: '380 to 1,150 ng/dL in 4 weeks. I feel like I\'m 30 again.', img: '/images/testimonial-darren-lopez.png' },
];

const pressLogos = [
  { name: "Men's Health", src: '/images/Men_s_Health.avif' },
  { name: 'Esquire', src: '/images/Esquire_logo__2017__svg.avif' },
  { name: 'BuzzFeed', src: '/images/BuzzFeed_9341afbe-6571-4255-aa76-6460b9611a57.avif' },
  { name: "Men's Journal", src: '/images/MJ.avif' },
];

const faqItems = [
  { q: "Is this really free? What's the catch?", a: "Yes — 100% free, no credit card required. We created this guide to educate men about their options. If you find it valuable, you may choose to explore our protocols, but there's zero obligation." },
  { q: 'What format is the guide in?', a: "It's a beautifully designed PDF you can read on any device — phone, tablet, or computer. You'll get instant access via email." },
  { q: 'Will you spam me with emails?', a: "No. You'll receive the guide and occasional science-backed content (1-2x/month). You can unsubscribe with one click at any time." },
  { q: 'Who is this guide for?', a: "Any man who wants to understand the difference between replacing testosterone (TRT) and optimizing it naturally. Whether you're 25 or 65, considering TRT or already on it — this guide gives you the full picture." },
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
      <div className="ftg-input-row">
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

/* ── FAQ Accordion Item ── */
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ftg-faq-item ${open ? 'ftg-faq-open' : ''}`}>
      <button className="ftg-faq-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <ChevronDown size={18} className="ftg-faq-chevron" />
      </button>
      <div className="ftg-faq-content">
        <p>{a}</p>
      </div>
    </div>
  );
};

const FreeTestosteroneGuidePage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const trustRef = useScrollReveal<HTMLDivElement>();
  const discoverRef = useScrollReveal<HTMLDivElement>();
  const midCtaRef = useScrollReveal<HTMLDivElement>();
  const proofRef = useScrollReveal<HTMLDivElement>();
  const faqRef = useScrollReveal<HTMLDivElement>();
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

      {/* ── Press Logos (P1) ── */}
      <div className="ftg-press">
        <p className="ftg-press-label">As Featured In</p>
        <div className="ftg-press-logos">
          {pressLogos.map((logo, i) => (
            <div key={i} className="ftg-press-logo">
              <img src={logo.src} alt={logo.name} loading="lazy" />
            </div>
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

      {/* ── Mid-Page CTA (P1) ── */}
      <section className="ftg-mid-cta" ref={midCtaRef}>
        <p className="ftg-mid-cta-text">Ready to learn the difference?</p>
        <OptInForm
          formId="ftg-mid-form"
          firstName={firstName}
          email={email}
          submitted={submitted}
          onFirstNameChange={setFirstName}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
        />
      </section>

      {/* ── Social Proof (P1: headshots) ── */}
      <section className="ftg-proof" ref={proofRef}>
        <div className="ftg-proof-badge">
          <Star size={14} fill="var(--b365-blue)" stroke="var(--b365-blue)" />
          <span>4.9/5 from 50,000+ clients</span>
        </div>
        <h2 className="ftg-section-heading">Real Results From Real Men</h2>
        <div className="ftg-proof-stack">
          {testimonials.map((t, i) => (
            <blockquote className="ftg-quote-block" key={i}>
              <div className="ftg-quote-header">
                <img src={t.img} alt={t.name} className="ftg-quote-avatar" loading="lazy" />
                <cite className="ftg-quote-name">{t.name}</cite>
              </div>
              <p className="ftg-quote-text">"{t.quote}"</p>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── FAQ Section (P1) ── */}
      <section className="ftg-faq" ref={faqRef}>
        <h2 className="ftg-section-heading">Frequently Asked Questions</h2>
        <div className="ftg-faq-list">
          {faqItems.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
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
