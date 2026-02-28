import { ShieldCheck } from 'lucide-react';
import './GuaranteeBadge.css';

const GuaranteeBadge = () => (
  <div className="checkout-guarantee">
    <ShieldCheck size={24} className="checkout-guarantee-icon" />
    <div>
      <strong>30-Day Money-Back Guarantee</strong>
      <p>Not satisfied? Get a full refund, no questions asked.</p>
    </div>
  </div>
);

export default GuaranteeBadge;
