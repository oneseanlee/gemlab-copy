import React, { useState } from 'react';
import './AccordionSection.css';

const AccordionItem = ({ title, active, onClick, children }) => {
    return (
        <div className="accordion-item">
            <button
                className={`accordion-header ${active ? 'active' : ''}`}
                onClick={onClick}
            >
                <span>{title}</span>
                <span className="arrow">{active ? '▲' : '▼'}</span>
            </button>
            {active && (
                <div className="accordion-content">
                    {children}
                </div>
            )}
        </div>
    );
};

const AccordionSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        {
            title: 'Ingredients',
            content: (
                <ul className="ingredients-list">
                    <li>Botanical extracts chosen for their purity and skin-loving benefits.</li>
                    <li>Lightweight moisturizers that absorb gently into the skin.</li>
                    <li>Dermatologist-tested actives safe for daily use.</li>
                    <li>High-quality ingredients certified by GemLab standards.</li>
                </ul>
            )
        },
        {
            title: 'How To Use It',
            content: 'Apply generously to wet skin. Lather and rinse thoroughly. For best results, use daily.'
        },
        {
            title: 'Warning',
            content: 'For external use only. Avoid contact with eyes. If irritation occurs, discontinue use.'
        },
        {
            title: 'Storage And Expiration',
            content: 'Store in a cool, dry place away from direct sunlight. Use within 12 months of opening.'
        }
    ];

    return (
        <section className="accordion-section-container">
            <div className="accordion-left">
                {items.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.title}
                        active={activeIndex === index}
                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                        {item.content}
                    </AccordionItem>
                ))}
            </div>
            <div className="accordion-right">
                <div className="lifestyle-image">
                    <img src="/images/sec2.webp" alt="GemLab Lifestyle background" />
                </div>
            </div>
        </section>
    );
};

export default AccordionSection;
