import React from 'react';
import './RitualSection.css';

const ProductCard = ({ title, type, price, imagePlaceholderType }) => {
    return (
        <div className="ritual-card">
            <div className={`ritual-image placeholder ${imagePlaceholderType}`}>
                <div className="placeholder-content">{type} Image</div>
            </div>
            <h3 className="ritual-title">{title}</h3>
            <p className="ritual-description">
                Infused with natural botanical extracts and enriched with vitamins, this formula leaves your skin feeling refreshed and balanced.
            </p>
            <button className="ritual-add-btn">
                ADD TO CART • {price}
            </button>
        </div>
    )
}

const RitualSection = () => {
    const [activeCategory, setActiveCategory] = React.useState('bath-body');

    const products = {
        'bath-body': [
            { title: "Cedarwood Body Wash", type: "Body Wash", price: "$59.99", imagePlaceholderType: "bottle-black" },
            { title: "Cedarwood Body Lotion", type: "Body Lotion", price: "$59.99", imagePlaceholderType: "bottle-black" },
            { title: "Cedarwood Moisturizer", type: "Moisturizer", price: "$19.99", imagePlaceholderType: "tube-black" }
        ],
        'daycare-rituals': [
            { title: "Daily Face Cleanser", type: "Face Cleanser", price: "$34.99", imagePlaceholderType: "tube-black" },
            { title: "Hydrating Day Cream", type: "Day Cream", price: "$44.99", imagePlaceholderType: "bottle-black" },
            { title: "SPF 50 Sunscreen", type: "Sunscreen", price: "$29.99", imagePlaceholderType: "tube-black" }
        ]
    };

    const currentProducts = products[activeCategory];

    return (
        <section className="ritual-section">
            <h2>Discover Your GemLab Ritual</h2>

            <div className="categories-toggle">
                <button
                    className={`category-btn ${activeCategory === 'bath-body' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('bath-body')}
                >
                    Bath & Body
                </button>
                <button
                    className={`category-btn ${activeCategory === 'daycare-rituals' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('daycare-rituals')}
                >
                    Daycare Rituals
                </button>
            </div>

            <div className="ritual-grid">
                <ProductCard
                    title={currentProducts[0].title}
                    type={currentProducts[0].type}
                    price={currentProducts[0].price}
                    imagePlaceholderType={currentProducts[0].imagePlaceholderType}
                />

                <div className="plus-icon">+</div>

                <ProductCard
                    title={currentProducts[1].title}
                    type={currentProducts[1].type}
                    price={currentProducts[1].price}
                    imagePlaceholderType={currentProducts[1].imagePlaceholderType}
                />

                <div className="plus-icon">+</div>

                <ProductCard
                    title={currentProducts[2].title}
                    type={currentProducts[2].type}
                    price={currentProducts[2].price}
                    imagePlaceholderType={currentProducts[2].imagePlaceholderType}
                />
            </div>
        </section>
    );
};

export default RitualSection;
