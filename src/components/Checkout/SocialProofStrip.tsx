import { Star } from 'lucide-react';
import './SocialProofStrip.css';

const SocialProofStrip = () => (
  <div className="checkout-social-proof">
    <div className="checkout-social-proof-top">
      <div className="checkout-social-proof-avatars">
        <img src="/images/avatar-woman-1.jpg" alt="Customer" />
        <img src="/images/avatar-man-1.jpg" alt="Customer" />
        <img src="/images/avatar-woman-2.jpg" alt="Customer" />
      </div>
      <div className="checkout-social-proof-rating">
        <div className="checkout-social-proof-stars">
          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#E8913A" color="#E8913A" />)}
        </div>
        <span>Trusted by 2,500+ customers</span>
      </div>
    </div>
    <blockquote className="checkout-testimonial">
      "This protocol changed my approach to weight management. Seeing real results in just 2 weeks."
      <cite>— Sarah M., Verified Buyer</cite>
    </blockquote>
  </div>
);

export default SocialProofStrip;
