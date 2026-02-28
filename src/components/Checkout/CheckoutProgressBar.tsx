import { Check } from 'lucide-react';
import './CheckoutProgressBar.css';

const steps = [
  { label: 'Contact Info', step: 1 },
  { label: 'Shipping & Payment', step: 2 },
  { label: 'Confirmation', step: 3 },
];

const CheckoutProgressBar = ({ activeStep = 1 }: { activeStep?: number }) => (
  <div className="checkout-progress">
    {steps.map((s, i) => (
      <div key={s.step} className={`checkout-progress-step ${s.step <= activeStep ? 'active' : ''} ${s.step < activeStep ? 'completed' : ''}`}>
        <div className="checkout-progress-circle">
          {s.step < activeStep ? <Check size={14} strokeWidth={3} /> : s.step}
        </div>
        <span className="checkout-progress-label">Step {s.step}: {s.label}</span>
        {i < steps.length - 1 && <div className="checkout-progress-line" />}
      </div>
    ))}
  </div>
);

export default CheckoutProgressBar;
