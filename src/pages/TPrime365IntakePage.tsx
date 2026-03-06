import { useEffect } from 'react';
import { FileText, Shield, Clock } from 'lucide-react';
import { trackMetaEvent } from '@/lib/meta-pixel';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
import SharedFooter from '../components/SharedFooter/SharedFooter';
import './NHTOIntakePage.css';

const TPrime365IntakePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const iframe = document.getElementById('happymd-tprime365-embed') as HTMLIFrameElement;
      if (!iframe) return;

      // Auto-resize iframe
      if (e.data?.type === 'resize' || e.data?.type === 'testosterone-form:resize') {
        iframe.style.height = e.data.height + 'px';
      }

      // Form Submission — fire tracking
      if (e.data?.type === 'submit' || e.data?.type === 'testosterone-form:submit') {
        const eventId = 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Client-side Meta Pixel — Lead with eventID for dedup
        trackMetaEvent('Lead', {});
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {}, { eventID: eventId });
        }

        // GTM dataLayer push
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'generate_lead',
          form_name: 'testosterone-optimizer',
          tracking_code: (e.data.trackingCode as string) || 'TPRIME365CELL',
          vendor_id: (e.data.vendorCode as string) || 'best365labgqzb',
          campaign_name: 'TPRIME365',
          page_url: window.location.href,
          page_referrer: document.referrer,
          event_id: eventId,
        });

        console.log('[TPRIME365] generate_lead pushed — eventId:', eventId);
      }

      // Error handling
      if (e.data?.type === 'error' || e.data?.type === 'testosterone-form:error') {
        console.error('[TPRIME365] HappyMD form error:', e.data.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="intake-page">
      <nav className="intake-nav">
        <div className="intake-nav-inner">
          <a href="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <a href="/tprime365" className="intake-back-link">← Back to TPrime365</a>
        </div>
      </nav>

      <main>
        <div className="intake-header">
          <h1>TPrime365™ Testosterone Optimization Intake Form</h1>
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
              id="happymd-tprime365-embed"
              src="https://happymd.co/embed/testosterone-optimizer?vendor_id=best365labgqzb&tracking_code=TPRIME365CELL&v=v2&theme=best365"
              width="100%"
              height="800px"
              scrolling="auto"
              style={{ border: 'none', maxWidth: '100%', display: 'block' }}
              title="happyMD TPrime365 Testosterone Optimization Form"
              allow="camera; microphone"
            />
          </div>
        </div>

        <div className="intake-bottom-cta">
          <a href="/tprime365">← Back to TPrime365</a>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default TPrime365IntakePage;
