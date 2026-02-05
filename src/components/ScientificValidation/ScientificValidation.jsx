import React from 'react';
import './ScientificValidation.css';

const ScientificValidation = () => {
    return (
        <section className="science-section">
            <div className="science-card">
                <div className="science-text">
                    <h2>Scientifically Validated Results For Hydration, Skin Barrier, And Odor Control</h2>

                    <div className="science-legend">
                        <span className="legend-item"><span className="dot regular"></span> Regular Body Wash</span>
                        <span className="legend-item"><span className="dot gemlab"></span> GemLab</span>
                    </div>

                    <div className="footnote">
                        <p>* In-house clinical test on 32 male participants with active lifestyles, using GemLab body wash for 14 days.</p>
                        <p>* Parameters measured: TEWL (transepidermal water loss), hydration index, microbiome culture test.</p>
                    </div>
                </div>

                <div className="science-chart">
                    <img src="/images/sec4.webp" alt="Effectiveness Chat" className="chart-image" />
                </div>
            </div>
        </section>
    );
};

export default ScientificValidation;
