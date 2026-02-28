import { useEffect } from 'react';
import { FileText, Shield, Clock } from 'lucide-react';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import './NHTOIntakePage.css';

const NHTOIntakePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://happymd.co') return;

      const iframe = document.getElementById('happymd-testosterone-embed') as HTMLIFrameElement;
      if (!iframe) return;

      if (e.data.type === 'resize' && typeof e.data.height === 'number') {
        const safeHeight = Math.min(Math.max(e.data.height, 400), 5000);
        iframe.style.height = safeHeight + 'px';
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="intake-page">
      {/* Sticky Nav */}
      <nav className="intake-nav">
        <div className="intake-nav-inner">
          <a href="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <a href="/nhto" className="intake-back-link">← Back to NHTO Products</a>
        </div>
      </nav>

      <main>
        {/* Header */}
        <div className="intake-header">
          <h1>Testosterone Optimization Intake Form</h1>
          <p className="intake-header-desc">
            Complete this secure HIPAA-compliant form to begin your testosterone optimization
            consultation with a licensed provider through happyMD.
          </p>

          {/* Trust Badges */}
          <div className="intake-trust-badges">
            <div className="intake-badge">
              <div className="intake-badge-icon">
                <FileText size={20} />
              </div>
              <div>
                <h4>HIPAA Compliant</h4>
                <p>Your information is secure</p>
              </div>
            </div>
            <div className="intake-badge">
              <div className="intake-badge-icon">
                <Shield size={20} />
              </div>
              <div>
                <h4>Licensed Providers</h4>
                <p>Board-certified physicians</p>
              </div>
            </div>
            <div className="intake-badge">
              <div className="intake-badge-icon">
                <Clock size={20} />
              </div>
              <div>
                <h4>Testosterone Support</h4>
                <p>Natural optimization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Iframe */}
        <div className="intake-iframe-container">
          <div className="intake-iframe-wrapper">
            <iframe
              id="happymd-testosterone-embed"
              src="https://happymd.co/embed/testosterone-optimizer?vendor_id=best365labgqzb&tracking_code=UCOS%2BNHTO&v=v2"
              width="100%"
              height="1200px"
              style={{ border: 'none', maxWidth: '100%', display: 'block' }}
              title="happyMD Testosterone Optimization Form"
              allow="camera; microphone"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="intake-bottom-cta">
          <a href="/nhto">
            ← Back to NHTO Products
          </a>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default NHTOIntakePage;
