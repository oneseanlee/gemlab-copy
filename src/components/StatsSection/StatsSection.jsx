import React from 'react';
import './StatsSection.css';

const StatsSection = () => {
    return (
        <section className="stats-section">
            <div className="section-header">
                <h2>Complete Bodycare Starts Here</h2>
                <p className="subtitle">Join thousands of men who trust GemLab to elevate their daily grooming routine with science-backed, effortless skincare.</p>
            </div>

            <div className="stats-grid">
                {/* Row 1 */}
                <div className="stat-card white-card">
                    <div className="stat-number">50,000+</div>
                    <div className="stat-label">Men across the region choose<br />GemLab for visible improvements.</div>
                </div>

                <div className="stat-card white-card">
                    <div className="stat-label-large">Dermatologist<br />Approved Formulas</div>
                    {/* Decorative element placeholder */}
                    <div className="blob-decoration"></div>
                </div>

                {/* Row 2 - Full Width Image Banner */}
                <div className="stat-banner-card">
                    <div className="banner-content">
                        <div className="stat-number neon">92%</div>
                        <div className="stat-desc-white">
                            of customers report clearer, smoother,<br />
                            healthier-looking skin after consistent use<br />
                            of GemLab products.
                        </div>
                    </div>
                    <div className="banner-image placeholder">
                        {/* Placeholder for Man Face/Towel */}
                    </div>
                </div>

                {/* Row 3 */}
                <div className="stat-card white-card">
                    <div className="stat-label-large">Ongoing Expert<br />Guidance</div>
                    {/* Avatar stack placeholder */}
                    <div className="avatar-stack">
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                    </div>
                </div>

                <div className="stat-card white-card">
                    <div className="stat-label-large">Premium Customer<br />Support</div>
                    {/* Icon placeholder */}
                    <div className="support-icon"></div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
