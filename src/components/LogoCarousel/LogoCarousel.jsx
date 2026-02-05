import React from 'react';
import './LogoCarousel.css';

const LogoCarousel = () => {
    // Using text placeholders styled to look like logos for now
    const logos = [
        'marie claire',
        'Esquire',
        'BuzzFeed',
        'Forbes',
        'VOGUE'
    ];

    return (
        <section className="logo-carousel-section">
            <div className="logo-track">
                {logos.map((logo, i) => (
                    <div key={i} className={`press-logo logo-${i}`}>
                        {logo}
                    </div>
                ))}
                {/* Duplicate for infinite scroll illusion if needed, strictly text here */}
                {logos.map((logo, i) => (
                    <div key={`dup-${i}`} className={`press-logo logo-${i}`}>
                        {logo}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LogoCarousel;
