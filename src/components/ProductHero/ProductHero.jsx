import React, { useState } from 'react';
import './ProductHero.css';

const ProductHero = () => {
    const [selectedSize, setSelectedSize] = useState('100ml');
    const [selectedScent, setSelectedScent] = useState('cedarwood');

    // Product gallery images
    const productImages = [
        '/images/shutterstock_2492074411-2.webp',
        '/images/shutterstock_2492074411_2619622d-2a1a-4eae-8396-e3cbc16d9744.webp',
        '/images/Cedar.webp',
        '/images/Citrus_Herb_13762097-0fc0-4c76-97d0-8789cb32b42f.webp',
        '/images/Almond_Milk_47e93f36-efa0-4408-8b2c-e687cc6f0933.webp'
    ];
    const [activeIndex, setActiveIndex] = useState(3); // Default to Citrus Herb
    const [isAnimating, setIsAnimating] = useState(false);

    const handleThumbnailClick = (index) => {
        if (index !== activeIndex) {
            setIsAnimating(true);
            setTimeout(() => {
                setActiveIndex(index);
                setTimeout(() => setIsAnimating(false), 50);
            }, 150);
        }
    };

    const sizes = ['100ml', '250ml', '500ml', '1000ml'];
    const scents = [
        { id: 'cedarwood', color: '#1a1a1a', label: 'Cedarwood', image: '/images/Cedar.webp' },
        { id: 'oakmoss', color: '#6b705c', label: 'Oakmoss', image: '/images/Almond_Milk_47e93f36-efa0-4408-8b2c-e687cc6f0933.webp' }, // Using available image as fallback
        { id: 'spiced', color: '#8d2d2d', label: 'Spiced', image: '/images/Calm_bloom.webp' },
        { id: 'fresh', color: '#5c6b60', label: 'Fresh', image: '/images/Citrus_Herb_13762097-0fc0-4c76-97d0-8789cb32b42f.webp' }
    ];

    return (
        <section className="product-hero">
            <div className="gallery-container">
                {/* Main image fills the container */}
                <div className={`main-image ${isAnimating ? 'slide-out' : 'slide-in'}`}>
                    <img src={productImages[activeIndex]} alt="GemLab Body Wash" />
                </div>
                {/* Thumbnails overlay on the left */}
                <div className="thumbnail-list">
                    {productImages.map((img, i) => (
                        <div
                            key={i}
                            className={`thumbnail ${activeIndex === i ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(i)}
                        >
                            <img src={img} alt={`Thumbnail ${i + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="product-details">
                <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-text">4.9 star ratings</span>
                </div>

                <h1 className="product-title">GEMLAB BODY WASH</h1>

                <p className="product-description">
                    Infused with natural botanical extracts and enriched with vitamins, this formula leaves your skin feeling refreshed, balanced, and softly scented with warm cedarwood notes.
                </p>

                <div className="price">$49.99</div>

                <div className="variant-selector">
                    <div className="section-label">SCENT: {scents.find(s => s.id === selectedScent)?.label.toUpperCase()}</div>
                    <div className="scent-options">
                        {scents.map((scent) => (
                            <button
                                key={scent.id}
                                className={`scent-btn ${selectedScent === scent.id ? 'active' : ''}`}
                                onClick={() => setSelectedScent(scent.id)}
                                aria-label={scent.label}
                            >
                                <div className="scent-img-container">
                                    <img src={scent.image} alt={scent.label} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="size-selector">
                    <div className="section-label">SIZE: {selectedSize.toUpperCase()}</div>
                    <div className="size-options">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cart-actions">
                    <div className="quantity-selector">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <button className="add-to-cart-btn">
                        ADD TO CART • $49.99
                    </button>
                </div>

                <div className="estimate-delivery">
                    Estimate delivery between <strong>Feb 07 - Feb 10</strong>
                </div>
            </div>
        </section>
    );
};

export default ProductHero;
