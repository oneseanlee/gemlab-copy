import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ThankYouPage: React.FC = () => (
  <div style={{
    minHeight: '100vh',
    background: 'var(--b365-navy)',
    color: 'var(--b365-white)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    padding: '48px 24px',
    textAlign: 'center',
  }}>
    <Mail size={48} style={{ color: '#D4A843', marginBottom: 24 }} />
    <h1 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(26px, 5vw, 38px)',
      fontWeight: 700,
      marginBottom: 16,
    }}>
      Your Free Guide Is On Its Way!
    </h1>
    <p style={{
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--b365-gray-200)',
      maxWidth: 480,
      marginBottom: 32,
    }}>
      Check your inbox in the next few minutes. If you don't see it, check your spam or promotions folder.
    </p>
    <Link to="/" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--b365-gray-400)',
      fontSize: 14,
      textDecoration: 'underline',
      textUnderlineOffset: 3,
    }}>
      <ArrowLeft size={14} /> Back to Home
    </Link>
  </div>
);

export default ThankYouPage;
