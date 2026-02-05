import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-links">
                <a href="#faq">FAQ</a>
                <a href="#delivery">Delivery Information</a>
                <a href="#returns">Return & Exchange</a>
                <a href="#contact">Contact Us</a>
            </div>

            <div className="footer-bottom">
                <div className="social-icons">
                    <span className="icon">G</span>
                    <span className="icon">IG</span>
                    <span className="icon">FB</span>
                </div>

                <div className="copyright">
                    Copyright © 2024 GemPages.
                </div>

                <div className="payment-methods">
                    <span className="pay-icon">VISA</span>
                    <span className="pay-icon">MC</span>
                    <span className="pay-icon">AMEX</span>
                    <span className="pay-icon">GPay</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
