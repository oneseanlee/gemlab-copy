import { useState, useEffect, useCallback } from 'react';
import { X, Gift } from 'lucide-react';
import './ExitIntentPopup.css';

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [fired, setFired] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !fired) {
      setShow(true);
      setFired(true);
    }
  }, [fired]);

  // Mobile: detect scroll-up
  const lastScrollY = { current: 0 };
  const handleScroll = useCallback(() => {
    if (fired) return;
    const currentY = window.scrollY;
    if (currentY < lastScrollY.current - 100 && currentY < 200) {
      setShow(true);
      setFired(true);
    }
    lastScrollY.current = currentY;
  }, [fired]);

  useEffect(() => {
    const shown = sessionStorage.getItem('exit-intent-shown');
    if (shown) { setFired(true); return; }

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseLeave, handleScroll]);

  useEffect(() => {
    if (show) sessionStorage.setItem('exit-intent-shown', 'true');
  }, [show]);

  if (!show) return null;

  return (
    <div className="exit-intent-overlay" onClick={() => setShow(false)}>
      <div className="exit-intent-popup" onClick={e => e.stopPropagation()}>
        <button className="exit-intent-close" onClick={() => setShow(false)}><X size={20} /></button>
        <Gift size={40} className="exit-intent-gift" />
        <h2>Wait! Don't Leave Empty-Handed 🎁</h2>
        <p>Get 10% off your GLP-1 Optimization Protocol right now. This offer expires when you close this page.</p>
        <div className="exit-intent-code">SAVE10</div>
        <button className="exit-intent-cta" onClick={() => setShow(false)}>Apply Discount & Continue</button>
        <button className="exit-intent-dismiss" onClick={() => setShow(false)}>No thanks, I'll pay full price</button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
