import { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import './UrgencyBanner.css';

const UrgencyBanner = () => {
  const initialSeconds = useRef(Math.floor(Math.random() * 600) + 600); // 10-20 min
  const [seconds, setSeconds] = useState(initialSeconds.current);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="checkout-urgency">
      <Clock size={16} className="checkout-urgency-icon" />
      <span>
        🔥 Order within <strong>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</strong> to ship today!
      </span>
    </div>
  );
};

export default UrgencyBanner;
