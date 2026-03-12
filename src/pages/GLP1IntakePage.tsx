import { useEffect } from 'react';
import { FileText, Shield, Clock } from 'lucide-react';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import './NHTOIntakePage.css';

const GLP1IntakePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Inject cell365power tracking script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://links.cell365power.com/js/external-tracking.js';
    script.setAttribute('data-tracking-id', 'tk_c5853e3f73314038b40fec8caf106bda');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Listen for happyMD iframe messages
  useEffect(() => {
    const iframe = document.getElementById('happymd-glp1-intake-embed') as HTMLIFrameElement;
    let loadCount = 0;
    let hasFiredNotification = false;

    const fireNotification = (source: string) => {
      if (hasFiredNotification) return;
      hasFiredNotification = true;
      console.log('[GLP1] HappyMD form completed via ' + source);
      fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ type: 'happymd_form', record: { campaign: 'GLP1', tracking_code: 'direct-intake', page_url: window.location.href } }),
      }).catch(err => console.error('[GLP1] notification error:', err));
    };

    const handleLoad = () => {
      loadCount++;
      if (loadCount > 1) fireNotification('iframe-load');
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://happymd.co') return;
      if (iframe && e.data.type === 'resize' && typeof e.data.height === 'number') {
        const safeHeight = Math.min(Math.max(e.data.height, 400), 5000);
        iframe.style.height = safeHeight + 'px';
      }
      if (e.data?.type === 'submit' || e.data?.type === 'glp1-form:submit') {
        fireNotification('postMessage');
      }
    };

    if (iframe) iframe.addEventListener('load', handleLoad);
    window.addEventListener('message', handleMessage);
    return () => {
      if (iframe) iframe.removeEventListener('load', handleLoad);
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
          <a href="/glp1-protocol" className="intake-back-link">← Back to GLP-1 Products</a>
        </div>
      </nav>

      <main>
        <div className="intake-header">
          <h1>GLP-1 Medical Intake Form</h1>
          <p className="intake-header-desc">
            Complete this secure HIPAA-compliant form to begin your GLP-1 telehealth
            consultation with a licensed provider through happyMD.
          </p>
          <div className="intake-trust-badges">
            <div className="intake-badge">
              <div className="intake-badge-icon"><FileText size={20} /></div>
              <div>
                <h4>HIPAA Compliant</h4>
                <p>Your information is secure</p>
              </div>
            </div>
            <div className="intake-badge">
              <div className="intake-badge-icon"><Shield size={20} /></div>
              <div>
                <h4>Licensed Providers</h4>
                <p>Board-certified physicians</p>
              </div>
            </div>
            <div className="intake-badge">
              <div className="intake-badge-icon"><Clock size={20} /></div>
              <div>
                <h4>Quick Process</h4>
                <p>Takes only 5-10 minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="intake-iframe-container">
          <div className="intake-iframe-wrapper">
            <iframe
              id="happymd-glp1-intake-embed"
              src="https://happymd.co/embed/glp1-consultation?vendor_id=best365labgqzb&tracking_code=direct-intake"
              width="100%"
              height="1000px"
              style={{ border: 'none', maxWidth: '100%', display: 'block' }}
              title="happyMD GLP-1 Medical Intake"
              allow="camera; microphone"
              loading="lazy"
            />
          </div>
        </div>

        <div className="intake-bottom-cta">
          <a href="/glp1-protocol">← Back to GLP-1 Products</a>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default GLP1IntakePage;
