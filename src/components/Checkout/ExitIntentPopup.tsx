import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Gift, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getUtmParams } from '@/lib/utm';
import { splitName } from '@/lib/split-name';
import { toast } from 'sonner';
import './ExitIntentPopup.css';

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [fired, setFired] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [captured, setCaptured] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !fired) {
      setShow(true);
      setFired(true);
    }
  }, [fired]);

  const lastScrollY = useRef(0);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const { firstName: fn, lastName: ln } = splitName(name);
      const { error } = await supabase.from("leads").insert({
        first_name: fn,
        last_name: ln,
        email: email.trim(),
        source: "exit-intent",
        utm_params: getUtmParams(),
      } as any);

      if (error) {
        console.error("[ExitIntent] insert error:", error.message);
        toast.error("Could not save your info. Please try again.");
        setSubmitting(false);
        return;
      }

      setCaptured(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="exit-intent-overlay" onClick={() => setShow(false)}>
      <div className="exit-intent-popup" onClick={e => e.stopPropagation()}>
        <button className="exit-intent-close" onClick={() => setShow(false)}><X size={20} /></button>
        <Gift size={40} className="exit-intent-gift" />

        {captured ? (
          <>
            <h2>Your Code Is Ready! 🎉</h2>
            <p>Use this code at checkout to save 10%. This offer expires when you close this page.</p>
            <div className="exit-intent-code">SAVE10</div>
            <button className="exit-intent-cta" onClick={() => setShow(false)}>Continue Shopping</button>
          </>
        ) : (
          <>
            <h2>Wait! Don't Leave Empty-Handed 🎁</h2>
            <p>Enter your email to unlock an exclusive 10% discount on your GLP-1 Optimization Protocol.</p>
            <form className="exit-intent-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                maxLength={100}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                maxLength={255}
              />
              <button type="submit" className="exit-intent-cta" disabled={submitting}>
                {submitting ? <><Loader2 size={18} className="animate-spin" /> Saving…</> : 'Unlock My 10% Discount'}
              </button>
            </form>
            <button className="exit-intent-dismiss" onClick={() => setShow(false)}>No thanks, I'll pay full price</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitIntentPopup;
