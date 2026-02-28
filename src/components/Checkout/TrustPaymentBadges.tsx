import { Lock } from 'lucide-react';
import './TrustPaymentBadges.css';

const TrustPaymentBadges = () => (
  <div className="checkout-trust-payments">
    <div className="checkout-payment-icons">
      <span className="checkout-payment-badge">VISA</span>
      <span className="checkout-payment-badge">MC</span>
      <span className="checkout-payment-badge">AMEX</span>
      <span className="checkout-payment-badge">PayPal</span>
      <span className="checkout-payment-badge checkout-ssl-badge"><Lock size={10} /> SSL</span>
    </div>
  </div>
);

export default TrustPaymentBadges;
