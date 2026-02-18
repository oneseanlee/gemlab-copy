import React from 'react';
import './LogoCarousel.css';

const logos = [
  { name: 'Men\'s Health', src: '/images/Men_s_Health.avif' },
  { name: 'Esquire', src: '/images/Esquire_logo__2017__svg.avif' },
  { name: 'BuzzFeed', src: '/images/BuzzFeed_9341afbe-6571-4255-aa76-6460b9611a57.avif' },
  { name: 'Men\'s Journal', src: '/images/MJ.avif' },
];

const LogoCarousel = () => {
  return (
    <section className="logo-carousel-section">
      <p className="logo-carousel-label">As Seen In</p>
      <div className="logo-track">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="press-logo">
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoCarousel;
