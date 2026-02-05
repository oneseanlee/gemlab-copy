import React from 'react';
import './RefillBanner.css';

const RefillBanner = () => {
    return (
        <section className="refill-banner">
            <div className="refill-content">
                <div className="refill-text-left">
                    <h2 className="refill-title">Gemlab Refill Program</h2>
                </div>
                <div className="refill-text-center">
                    <p>Keep your bottle, refill for a fair and<br />friendly price. Get <strong>35% off</strong> your first refill.</p>
                </div>
                <div className="refill-action-right">
                    <button className="shop-refill-btn">SHOP REFILL</button>
                </div>
            </div>
        </section>
    );
};

export default RefillBanner;
