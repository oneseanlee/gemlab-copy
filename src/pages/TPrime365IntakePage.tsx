import { useEffect } from 'react';
import { FileText, Shield, Clock } from 'lucide-react';
import { trackMetaEvent } from '@/lib/meta-pixel';

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}
import SharedFooter from '../components/SharedFooter/SharedFooter';
import './NHTOIntakePage.css';

const TPrime365IntakePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const iframe = document.getElementById('happymd-tprime365-embed') as HTMLIFrameElement;
    if (!iframe) return;

    let loadCount = 0;
    let hasFired = false;

    function fireGenerateLead(source: string) {
      if (hasFired) {
        console.log('[TPRIME365] generate_lead already fired — skipping (' + source + ')');
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
        tracking_code: 'TPRIME365CELL',
        vendor_id: 'best365labgqzb',
        campaign_name: 'TPRIME365',
        page_url: window.location.href,
        page_referrer: document.referrer,
        event_id: eventId,
      });

      console.log('[TPRIME365] generate_lead FIRED via ' + source + ' — eventId:', eventId);
    }

    // METHOD 1: Detect iframe internal navigation (second load = form submitted)
    const handleLoad = () => {
      loadCount++;
      console.log('[TPRIME365] iframe load event #' + loadCount);
      if (loadCount > 1) {
        fireGenerateLead('iframe-load');
      }
    };

    // NO auto-resize — it causes the endless scroll bug with dropdowns
    // Using fixed height of 1200px instead
    // Still listen for postMessage submit (in case HappyMD adds it later)
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'submit' || e.data?.type === 'testosterone-form:submit') {
        fireGenerateLead('postMessage');
      }

      if (e.data?.type === 'error' || e.data?.type === 'testosterone-form:error') {
        console.error('[TPRIME365] HappyMD form error:', e.data.error);
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
              height="1200px"
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
