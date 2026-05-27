import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { getUtmParams } from '@/lib/utm';
import { splitName } from '@/lib/split-name';
import './PartnerApplicationForm.css';

const CHANNELS = [
  'Instagram', 'TikTok', 'YouTube', 'Email List',
  'Podcast', 'Blog / SEO', 'Clinic / In-person', 'Other',
];

const AUDIENCE_SIZES = [
  '< 1,000', '1k – 10k', '10k – 50k', '50k – 250k', '250k+',
];

const Schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Enter a valid email').max(255),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  website: z.string().trim().max(255).optional().or(z.literal('')),
  audienceSize: z.string().min(1, 'Select an audience size'),
  channels: z.array(z.string()).min(1, 'Pick at least one channel'),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
});

const PartnerApplicationForm = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', website: '',
    audienceSize: '', channels: [] as string[], message: '',
    honeypot: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const toggleChannel = (c: string) =>
    set('channels', form.channels.includes(c)
      ? form.channels.filter((x) => x !== c)
      : [...form.channels, c]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot — silently succeed for bots
    if (form.honeypot) { setSuccess(true); return; }

    const parsed = Schema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      setError(first || 'Please check your details and try again.');
      return;
    }

    setSubmitting(true);
    const { firstName, lastName } = splitName(parsed.data.name);

    const { error: insertErr } = await supabase.from('leads').insert({
      first_name: firstName,
      last_name: lastName,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone || null,
      source: 'partners_application',
      utm_params: {
        ...getUtmParams(),
        partner: {
          company: parsed.data.company || null,
          website: parsed.data.website || null,
          audience_size: parsed.data.audienceSize,
          channels: parsed.data.channels,
          message: parsed.data.message || null,
        },
      },
    } as any);

    setSubmitting(false);

    if (insertErr) {
      const msg = insertErr.message?.toLowerCase() || '';
      if (msg.includes('rate') || msg.includes('check_lead_rate_limit')) {
        setError('We just received an application from this email. Please wait a minute and try again.');
      } else {
        setError("We couldn't send your application. Please try again or email info@best365labs.com.");
      }
      return;
    }

    // GTM event
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: 'partner_application_submit', email: parsed.data.email });
    } catch { /* noop */ }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="partner-form-success" role="status" aria-live="polite">
        <CheckCircle2 size={56} strokeWidth={1.5} />
        <h3>Application Received</h3>
        <p>
          Thanks — our partnerships team will review your application and reach out within 48 hours
          with your tracking link and marketing assets.
        </p>
      </div>
    );
  }

  return (
    <form className="partner-form" onSubmit={handleSubmit} noValidate>
      <div className="partner-form-row two">
        <label>
          <span>Full Name</span>
          <input
            type="text" required maxLength={100}
            placeholder="Alex Johnson"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email" required maxLength={255}
            placeholder="alex@yourbrand.com"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </label>
      </div>

      <div className="partner-form-row two">
        <label>
          <span>Phone <em>(optional)</em></span>
          <input
            type="tel" maxLength={20}
            placeholder="(555) 123-4567"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </label>
        <label>
          <span>Company / Brand <em>(optional)</em></span>
          <input
            type="text" maxLength={120}
            placeholder="Peak Performance Co."
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
          />
        </label>
      </div>

      <label className="partner-form-row">
        <span>Website or Social Link</span>
        <input
          type="text" maxLength={255}
          placeholder="instagram.com/yourhandle or yoursite.com"
          value={form.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </label>

      <div className="partner-form-row">
        <span className="partner-form-label">Audience Size</span>
        <div className="partner-chip-row">
          {AUDIENCE_SIZES.map((size) => (
            <button
              key={size} type="button"
              className={`partner-chip ${form.audienceSize === size ? 'active' : ''}`}
              onClick={() => set('audienceSize', size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="partner-form-row">
        <span className="partner-form-label">Where will you promote? <em>(select all that apply)</em></span>
        <div className="partner-chip-row">
          {CHANNELS.map((c) => (
            <button
              key={c} type="button"
              className={`partner-chip ${form.channels.includes(c) ? 'active' : ''}`}
              onClick={() => toggleChannel(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <label className="partner-form-row">
        <span>Anything else? <em>(optional)</em></span>
        <textarea
          rows={4} maxLength={1000}
          placeholder="Tell us about your audience and how you'd like to promote Best 365 Labs."
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
        />
      </label>

      {/* Honeypot */}
      <input
        type="text" name="company_url" tabIndex={-1} autoComplete="off"
        className="partner-form-hp"
        value={form.honeypot}
        onChange={(e) => set('honeypot', e.target.value)}
      />

      {error && <div className="partner-form-error" role="alert">{error}</div>}

      <button type="submit" className="partner-form-submit" disabled={submitting}>
        {submitting
          ? (<><Loader2 size={18} className="partner-form-spin" /> Submitting…</>)
          : 'Apply Now — Start Earning 20%'}
      </button>

      <p className="partner-form-note">
        By submitting, you agree to be contacted about the Best 365 Labs partner program.
        No spam — ever.
      </p>
    </form>
  );
};

export default PartnerApplicationForm;