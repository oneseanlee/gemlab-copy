import { useEffect } from 'react';
import { FileText, Shield, Clock } from 'lucide-react';
import { getFbcValue, getFbpValue } from '@/lib/fb-cookies';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}
import SharedFooter from '../components/SharedFooter/SharedFooter';
import './NHTOIntakePage.css';

const NHTOIntakePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const iframe = document.getElementById('happymd-testosterone-embed') as HTMLIFrameElement;
    if (!iframe) return;

    let loadCount = 0;
    let hasFired = false;

    function fireGenerateLead(source: string) {
      if (hasFired) {
        console.log('[UCOSNHTO] generate_lead already fired — skipping (' + source + ')');
        return;
      }
      hasFired = true;

      const eventId = 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

      // DO NOT call fbq() here — GTM Pixel_Event tag already fires Lead
      // Just push to dataLayer and let GTM handle everything
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        form_name: 'testosterone-optimizer',
        tracking_code: 'UCOSNHTOCELL',
        vendor_id: 'best365labgqzb',
        campaign_name: 'UCOSNHTO',
        page_url: window.location.href,
        page_referrer: document.referrer,
        event_id: eventId,
        user_data: {
          fbc: getFbcValue(),
          fbp: getFbpValue(),
        },
      });

      console.log('[UCOSNHTO] generate_lead FIRED via ' + source + ' — eventId:', eventId);

      // Send email notification
      fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ type: 'happymd_form', record: { campaign: 'UCOSNHTO', tracking_code: 'UCOSNHTOCELL', page_url: window.location.href } }),
      }).catch(err => console.error('[UCOSNHTO] notification error:', err));

      // Save HappyMD completion to database
      const leadEmail = localStorage.getItem('intake_lead_email');
      const leadSource = localStorage.getItem('intake_lead_source') || 'nhto';
      if (leadEmail) {
        (supabase.rpc as any)('mark_intake_completed', { p_email: leadEmail, p_source: leadSource })
          .then(({ error }: { error: any }) => {
            if (error) console.error('[UCOSNHTO] mark_intake_completed error:', error);
            else console.log('[UCOSNHTO] intake completion saved for', leadEmail);
          });
      } else {
        // Fallback: no email available, log to intake_completions
        (supabase.from as any)('intake_completions').insert({
          source: 'nhto',
          tracking_code: 'UCOSNHTOCELL',
        }).then(({ error }: { error: any }) => {
          if (error) console.error('[UCOSNHTO] intake_completions insert error:', error);
          else console.log('[UCOSNHTO] fallback intake completion logged');
        });
      }
    }

    // METHOD 1: Detect iframe internal navigation (second load = form submitted)
    const handleLoad = () => {
      loadCount++;
      console.log('[UCOSNHTO] iframe load event #' + loadCount);
      if (loadCount > 1) {
        fireGenerateLead('iframe-load');
      }
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://happymd.co') return;

      // resize handler removed — causes infinite loop with HappyMD dropdowns

      if (e.data?.type === 'submit' || e.data?.type === 'testosterone-form:submit') {
        fireGenerateLead('postMessage');
      }

      if (e.data?.type === 'error' || e.data?.type === 'testosterone-form:error') {
        console.error('[UCOSNHTO] HappyMD form error:', e.data.error);
      }
    };

    iframe.addEventListener('load', handleLoad);
    window.addEventListener('message', handleMessage);
    return () => {
      iframe.removeEventListener('load', handleLoad);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="intake-page">
      <nav className="intake-nav">
        <div className="intake-nav-inner">
          <a href="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <a href="/nhto" className="intake-back-link">← Back to NHTO Products</a>
        </div>
      </nav>

      <main>
        <div className="intake-header">
          <h1>Testosterone Optimization Intake Form</h1>
          <p className="intake-header-desc">
            Complete this secure HIPAA-compliant form to begin your testosterone optimization
            consultation with a licensed provider through happyMD.
          </p>
          <div className="intake-trust-badges">
            <div className="intake-badge">
              <div className="intake-badge-icon"><FileText size={20} /></div>
              <div><h4>HIPAA Compliant</h4><p>Your information is secure</p></div>
            </div>
            <div className="intake-badge">
              <div className="intake-badge-icon"><Shield size={20} /></div>
              <div><h4>Licensed Providers</h4><p>Board-certified physicians</p></div>
            </div>
            <div className="intake-badge">
              <div className="intake-badge-icon"><Clock size={20} /></div>
              <div><h4>Quick Process</h4><p>Takes only 5-10 minutes</p></div>
            </div>
          </div>
        </div>

        <div className="intake-iframe-container">
          <div className="intake-iframe-wrapper">
            <iframe
              id="happymd-testosterone-embed"
              src="https://happymd.co/embed/testosterone-optimizer?vendor_id=best365labgqzb&tracking_code=UCOSNHTOCELL&v=v2&theme=best365"
              width="100%"
              height="1200px"
              scrolling="auto"
              style={{ border: 'none', maxWidth: '100%', display: 'block' }}
              title="happyMD UCOSNHTO Testosterone Optimization Form"
              allow="camera; microphone"
            />
          </div>
        </div>

        <div className="intake-bottom-cta">
          <a href="/nhto">← Back to NHTO Products</a>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default NHTOIntakePage;
