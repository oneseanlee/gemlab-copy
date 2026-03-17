import { useState } from 'react';
import { X, Gift, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getUtmParams } from '@/lib/utm';
import { splitName } from '@/lib/split-name';
import { toast } from 'sonner';
import './LeadCaptureModal.css';

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  source?: string;
}

const LeadCaptureModal = ({
  open,
  onClose,
  onSuccess,
  headline = "Almost there! Enter your details to continue",
  subtext = "We'll save your spot and send you order confirmation details.",
  ctaLabel = "Continue to Checkout",
  source = "glp1-article",
}: LeadCaptureModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const { firstName: fn, lastName: ln } = splitName(name);
      const { error } = await supabase.from("checkout_leads").insert({
        first_name: fn,
        last_name: ln,
        email: email.trim(),
        phone: null,
        cart_items: [{ title: "GLP-1 Optimization Protocol", variantId: "gid://shopify/ProductVariant/46539809235068", quantity: 1, price: "39.95" }],
        cart_total: 39.95,
        source,
        utm_params: getUtmParams(),
      } as any);

      if (error) {
        console.error("[LeadCapture] insert error:", error.message);
        toast.error("Could not save your info. Please try again.");
        setSubmitting(false);
        return;
      }

      onSuccess();
    } catch {
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="lead-modal-overlay" onClick={onClose}>
      <div className="lead-modal" onClick={e => e.stopPropagation()}>
        <button className="lead-modal-close" onClick={onClose}><X size={20} /></button>
        <Gift size={36} className="lead-modal-icon" />
        <h2>{headline}</h2>
        <p>{subtext}</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="lead-modal-cta" disabled={submitting}>
            {submitting ? <><Loader2 size={18} className="animate-spin" /> Saving…</> : ctaLabel}
          </button>
        </form>
        <button className="lead-modal-dismiss" onClick={onClose}>No thanks</button>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
