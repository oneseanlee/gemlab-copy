import React from 'react';
import './Testimonials.css';

const TestimonialCard = ({ title, name, feature, quote, type, image }) => {
    return (
        <div className="testimonial-card">
            <div className="testimonial-images">
                {image ? (
                    <img src={image} alt={`${title} result`} className="before-after-image" />
                ) : (
                    <>
                        <div className="test-img placeholder before">Before</div>
                        <div className="test-img placeholder after">After</div>
                    </>
                )}
            </div>

            <div className="testimonial-content">
                <h3>{title}</h3>
                <div className="customer-info">
                    <span className="customer-name">{name}</span>
                    <span className="verified-badge">✔ Verified Customer</span>
                </div>

                <ul className="testimonial-features">
                    {feature.map((f, i) => <li key={i}>{f}</li>)}
                </ul>

                <p className="testimonial-quote">"{quote}"</p>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const reviews = [
        {
            title: 'Skin Firming',
            name: 'David L.',
            feature: ['Improves skin firmness', 'Helps even out skin tone', 'Makes the body look smoother'],
            quote: "I didn't know body skincare could make such a difference. GemLab made my skin look tighter and more even in just a few weeks. It's now part of my daily routine.",
            image: '/images/bot-1.webp'
        },
        {
            title: 'Long-Lasting Odor Control',
            name: 'David L.',
            feature: ['Keeps body odor under control', 'Neutralizes sweat smell', 'Leaves skin feeling clean'],
            quote: "I stay active all day, and GemLab is the only body wash that keeps me smelling fresh from morning to night. Zero dryness, zero heaviness just clean confidence.",
            image: '/images/bot-2.webp'
        },
        {
            title: 'Rough Skin Repair',
            name: 'Khai T.',
            feature: ['Softens rough, dry skin', 'Provides deep moisture', 'Ideal for working outdoors'],
            quote: "My skin was always rough from sports and sun exposure. GemLab absorbs instantly and keeps me moisturized all day. My arms and legs look healthier than ever.",
            image: '/images/bot-3.webp'
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="section-header">
                <h2>Over 100,000 Happy Customers</h2>
                <p className="subtitle">Join thousands of men who trust GemLab to elevate their daily grooming routine with science-backed, effortless skincare.</p>
            </div>

            <div className="testimonials-grid">
                {reviews.map((review, index) => (
                    <TestimonialCard key={index} {...review} />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
