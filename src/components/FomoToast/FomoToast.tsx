import { useState, useEffect, useCallback, useRef } from 'react';
import { CheckCircle, X } from 'lucide-react';
import './FomoToast.css';

const MALE_NAMES = [
  'Mike', 'David', 'James', 'Chris', 'Brian', 'Kevin', 'Derek', 'Tyler',
  'Justin', 'Ryan', 'Matt', 'Andrew', 'Eric', 'Josh', 'Mark',
];

const FEMALE_NAMES = [
  'Sarah', 'Jessica', 'Emily', 'Ashley', 'Amanda', 'Nicole', 'Lauren',
  'Megan', 'Rachel', 'Stephanie', 'Jennifer', 'Heather', 'Danielle',
  'Brittany', 'Tiffany',
];

const CITIES = [
  'Austin, TX', 'Denver, CO', 'Nashville, TN', 'Phoenix, AZ', 'San Diego, CA',
  'Tampa, FL', 'Charlotte, NC', 'Portland, OR', 'Dallas, TX', 'Atlanta, GA',
  'Miami, FL', 'Chicago, IL', 'Seattle, WA', 'Houston, TX', 'Scottsdale, AZ',
  'Raleigh, NC', 'Orlando, FL', 'Columbus, OH', 'Indianapolis, IN', 'Salt Lake City, UT',
];

const PRODUCTS: { name: string; img: string; gender: 'male' | 'female' | 'any' }[] = [
  { name: 'TPrime365', img: '/images/tprime-bottle.png', gender: 'male' },
  { name: 'GLP-1 Optimization Protocol', img: '/images/product-glp-protocol-new.png', gender: 'female' },
  { name: 'NHTO', img: '/images/nhto-bottle.png', gender: 'male' },
  { name: 'Ultimate Cell Optimization System', img: '/images/product-ucos.png', gender: 'any' },
];

const TIME_AGO = ['2 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago', '15 minutes ago', '23 minutes ago', '1 hour ago'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const FomoToast = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', city: '', product: PRODUCTS[0], time: '' });
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const dismissed = useRef(false);

  const showNext = useCallback(() => {
    if (dismissed.current) return;
    const product = pick(PRODUCTS);
    let name: string;
    if (product.gender === 'male') {
      name = pick(MALE_NAMES);
    } else if (product.gender === 'female') {
      name = Math.random() < 0.9 ? pick(FEMALE_NAMES) : pick(MALE_NAMES);
    } else {
      name = pick([...MALE_NAMES, ...FEMALE_NAMES]);
    }
    setData({
      name,
      city: pick(CITIES),
      product,
      time: pick(TIME_AGO),
    });
    setVisible(true);

    // Hide after 5s
    timerRef.current = setTimeout(() => {
      setVisible(false);
      // Schedule next in 12-25s
      timerRef.current = setTimeout(showNext, (Math.random() * 13000) + 12000);
    }, 5000);
  }, []);

  useEffect(() => {
    // First appearance after 8-15s
    timerRef.current = setTimeout(showNext, (Math.random() * 7000) + 8000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [showNext]);

  const handleClose = () => {
    setVisible(false);
    dismissed.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className={`fomo-toast ${visible ? 'visible' : ''}`} role="status" aria-live="polite">
      <img className="fomo-toast-img" src={data.product.img} alt={data.product.name} />
      <div className="fomo-toast-body">
        <div className="fomo-toast-title">
          <strong>{data.name}</strong> from {data.city} just purchased <strong>{data.product.name}</strong>
        </div>
        <div className="fomo-toast-sub">
          <CheckCircle size={12} className="verified" /> <span>Verified Purchase</span> · {data.time}
        </div>
      </div>
      <button className="fomo-toast-close" onClick={handleClose} aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
};

export default FomoToast;
