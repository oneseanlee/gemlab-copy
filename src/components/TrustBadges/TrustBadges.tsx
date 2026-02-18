import React from 'react';
import { Shield, Award, Flag, BadgeCheck } from 'lucide-react';
import './TrustBadges.css';

const badges = [
  { icon: Shield, label: 'Physician-Supervised', desc: 'Licensed Provider Network' },
  { icon: Award, label: 'cGMP Certified', desc: 'Pharmaceutical-Grade Quality' },
  { icon: Flag, label: 'Made in USA', desc: 'FDA-Registered Facilities' },
  { icon: BadgeCheck, label: '30-Day Guarantee', desc: 'Risk-Free Promise' },
];

const TrustBadges = () => (
  <section className="b365-trust-badges">
    <div className="trust-badges-inner">
      {badges.map((b, i) => (
        <div className="trust-badge" key={i}>
          <div className="trust-badge-icon">
            <b.icon size={24} strokeWidth={1.5} />
          </div>
          <div className="trust-badge-text">
            <span className="trust-badge-label">{b.label}</span>
            <span className="trust-badge-desc">{b.desc}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBadges;
