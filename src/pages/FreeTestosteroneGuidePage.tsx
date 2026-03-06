import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Stethoscope, FlaskConical, ArrowRight, Lock, Mail, User, Phone, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import AnimatedCTA from '@/components/AnimatedCTA/AnimatedCTA';
import { supabase } from '@/integrations/supabase/client';
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


/* ── Lead Capture Modal ── */
const LeadModal = ({
  open,
  onClose,
  firstName,
  email,
  phone,
  submitted,
  submitting,
  onFirstNameChange,
  onEmailChange,
  onPhoneChange,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  firstName: string;
  email: string;
  phone: string;
  submitted: boolean;
  submitting: boolean;
  onFirstNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="ftg-modal-backdrop" onClick={onClose}>
      <div className="ftg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="ftg-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="ftg-modal-success">
            <div className="ftg-modal-success-icon">🎉</div>
            <h3>You're In!</h3>
            <p>Check your inbox — your free guide is on the way.</p>
          </div>
        ) : (
          <>
            <div className="ftg-modal-header">
              <img
                src="/images/ftg-ebook-cover.png"
                alt="Free Guide"
                className="ftg-modal-ebook"
              />
              <div>
                <h3 className="ftg-modal-title">Get Your Free Guide</h3>
                <p className="ftg-modal-subtitle">
                  The Difference Between <em>Renting</em> Testosterone and <em>Owning</em> It
                </p>
              </div>
            </div>

            <form ref={formRef} className="ftg-modal-form" onSubmit={onSubmit}>
              <div className="ftg-input-wrap">
                <User size={16} className="ftg-input-icon" />
                <input
                  type="text"
                  className="ftg-input"
                  placeholder="First name"
                  required
                  maxLength={100}
                  autoFocus
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
                  maxLength={255}
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                />
              </div>
              <div className="ftg-input-wrap">
                <Phone size={16} className="ftg-input-icon" />
                <input
                  type="tel"
                  className="ftg-input"
                  placeholder="Phone (optional)"
                  maxLength={20}
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                />
              </div>
              <AnimatedCTA onClick={() => formRef.current?.requestSubmit()} disabled={submitting}>
                {submitting ? 'Sending…' : 'SEND ME THE FREE GUIDE'}
                <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
              </AnimatedCTA>
              <p className="ftg-privacy-note">
                <Lock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                100% Free · No spam · Unsubscribe anytime
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};



const FreeTestosteroneGuidePage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const hasSubmitted = useRef(false);

  // Remove root background so fixed video shows through
  useEffect(() => {
    document.documentElement.classList.add('ftg-active');
    return () => document.documentElement.classList.remove('ftg-active');
  }, []);

  const trustRef = useScrollReveal<HTMLDivElement>();
  const discoverRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();
  const ebookParallax = useParallax(0.06);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (hasSubmitted.current || submitting) return;
    hasSubmitted.current = true;
    setSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({
        first_name: firstName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        source: 'free-testosterone-guide',
      });

      if (error) {
        console.error('Lead insert error:', error.message);
        hasSubmitted.current = false;
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Lead submission failed:', err);
      hasSubmitted.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => { if (!submitting) setModalOpen(false); };

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
        <div className="ftg-hero-left">
          <span className="ftg-hero-tag">Free Guide</span>
          <h1 className="ftg-hero-headline">
            The Difference Between <em>Renting</em> Testosterone and <em>Owning</em> It
          </h1>
          <p className="ftg-hero-sub">
            Most men don't realize they're signing up for a lifetime lease on their own hormones. This guide shows you the difference — and why it matters more than you think.
          </p>
          <AnimatedCTA onClick={openModal}>
            GET FREE GUIDE <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
          </AnimatedCTA>
          <p className="ftg-hero-micro">
            <Lock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            Free · No credit card required
          </p>
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
        <AnimatedCTA onClick={openModal}>
          GET FREE GUIDE <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
        </AnimatedCTA>
        <p className="ftg-cta-micro">Join 50,000+ men optimizing naturally</p>
      </section>

      {/* ── Lead Capture Modal ── */}
      <LeadModal
        open={modalOpen}
        onClose={closeModal}
        firstName={firstName}
        email={email}
        phone={phone}
        submitted={submitted}
        submitting={submitting}
        onFirstNameChange={setFirstName}
        onEmailChange={setEmail}
        onPhoneChange={setPhone}
        onSubmit={handleSubmit}
      />

      {/* ── Footer ── */}
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
