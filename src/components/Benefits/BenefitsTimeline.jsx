import React from 'react';
import './BenefitsTimeline.css';

const BenefitsTimeline = () => {
    return (
        <section className="benefits-section">
            <h2>What should I expect from consistent use of GEMLAB?</h2>

            <div className="benefits-container">
                <div className="benefits-image-col">
                    <div className="benefits-image">
                        <img src="/images/sec3.webp" alt="Magic Foam" />
                    </div>
                </div>

                <div className="timeline-col">
                    <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                            <div className="timeline-tag">WEEK 2</div>
                            <h3>Smoother skin, less irritation</h3>
                            <p>Your stomach feels calmer after meals. Digestion is more predictable. Bloating noticeably reduced, gut lining less inflamed. You're starting to see the flat stomach you've been missing.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                            <div className="timeline-tag">WEEK 4</div>
                            <h3>Your skin finds its balance</h3>
                            <p>Texture becomes visibly more even. Ingrown hairs reduce, especially on the chest and back. Skin stays fresh longer throughout the day, even after workouts. Your shower routine starts feeling like something you actually look forward to.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-marker last"></div>
                        <div className="timeline-content">
                            <div className="timeline-tag">MONTH 2</div>
                            <h3>Real confidence kicks in</h3>
                            <p>You feel cleaner, fresher, and more put-together every day. Shirts fit better without worrying about back acne. People notice you look healthier: "Your skin looks really good — what are you using?" Sweat-related odor becomes easier to manage, even on busy days.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsTimeline;
