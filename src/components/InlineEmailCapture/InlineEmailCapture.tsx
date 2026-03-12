import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import './InlineEmailCapture.css';

const InlineEmailCapture = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [captured, setCaptured] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        first_name: name.trim(),
        email: email.trim(),
        source: "glp1-protocol-inline",
      });

      if (error) {
        console.error("[InlineCapture] insert error:", error.message);
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

  if (captured) {
    return (
      <div className="inline-capture-section inline-capture-success">
        <CheckCircle size={32} />
        <h3>You're In! Check Your Inbox</h3>
        <p>We've sent you the protocol guide. Keep scrolling to learn more about how it works.</p>
      </div>
    );
  }

  return (
    <div className="inline-capture-section">
      <div className="inline-capture-badge">FREE GUIDE</div>
      <h3>Get the GLP-1 Optimization Protocol Guide</h3>
      <p>Learn the exact 3-pathway protocol that helps protect lean muscle and sustain energy on GLP-1 therapy. Delivered instantly to your inbox.</p>
      <form className="inline-capture-form" onSubmit={handleSubmit}>
        <div className="inline-capture-fields">
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
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Get the Free Guide <ArrowRight size={16} /></>}
        </button>
      </form>
      <p className="inline-capture-privacy">No spam. Unsubscribe anytime. Your data is safe.</p>
    </div>
  );
};

export default InlineEmailCapture;
