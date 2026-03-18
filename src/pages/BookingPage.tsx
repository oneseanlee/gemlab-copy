import React from 'react';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import { Calendar, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';
import './BookingPage.css';

const highlights = [
  { Icon: TrendingUp, text: '20% recurring commissions on every referral' },
  { Icon: Shield, text: 'Publicly traded company (BHIC) — real credibility' },
  { Icon: Users, text: '50,000+ satisfied customers across all products' },
  { Icon: CheckCircle, text: 'Dedicated partner success manager' },
];

const BookingPage: React.FC = () => {
  return (
    <div className="booking-page">
      {/* Nav — minimal for clean booking experience */}
      <nav className="booking-nav">
        <a href="/">
          <img
            src="/images/best365labs-logo.png"
            alt="Best 365 Labs"
            width={140}
            height={36}
            loading="eager"
          />
        </a>
      </nav>

      <main className="booking-main">
        {/* Left — Value Prop */}
        <section className="booking-info">
          <span className="booking-badge">
            <Calendar size={14} />
            Strategic Partnerships
          </span>
          <h1>
            Let's Build Something <em>Together</em>
          </h1>
          <p className="booking-subtitle">
            Schedule a 1-on-1 strategy call with our partnerships team. We'll explore how we can grow together — whether you're an influencer, clinic, or affiliate marketer.
          </p>

          <ul className="booking-highlights">
            {highlights.map((h, i) => (
              <li key={i}>
                <span className="booking-highlight-icon">
                  <h.Icon size={18} />
                </span>
                {h.text}
              </li>
            ))}
          </ul>

          <div className="booking-trust-note">
            <Shield size={16} />
            <span>Your information is kept confidential and will only be used to prepare for our call.</span>
          </div>
        </section>

        {/* Right — GHL Calendar Embed */}
        <section className="booking-calendar">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/3d6bWBAUBH4knTmsIyaX"
            title="Schedule a Strategic Partnership Call — Best 365 Labs"
            style={{ width: '100%', height: '100%', border: 'none', minHeight: 700 }}
            scrolling="no"
            loading="lazy"
          />
        </section>
      </main>

      <SharedFooter />
    </div>
  );
};

export default BookingPage;
