import SharedFooter from '../components/SharedFooter/SharedFooter';
import './PrivacyPolicyPage.css';

const ReturnPolicyPage = () => {
  return (
    <div className="privacy-page">
      <nav className="privacy-nav">
        <div className="privacy-nav-inner">
          <a href="/">
            <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 36 }} />
          </a>
          <a href="/" className="privacy-back-link">← Back to Home</a>
        </div>
      </nav>

      <main className="privacy-content">
        <h1>Return &amp; Refund Policy</h1>
        <p className="privacy-updated">Last updated: January 1, 2025</p>

        <div className="privacy-notice">
          <p style={{ textTransform: 'none', fontWeight: 500, fontSize: 15 }}>
            Best 365 Labs, Inc guarantees every product sold. If you are unsatisfied with your purchase for any reason, return the unused portion of the product within <strong>30 days</strong> of purchase.
          </p>
        </div>

        <div style={{
          background: '#fff8ec',
          border: '1px solid #e8d5a8',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 32,
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
          <p style={{ margin: 0, fontSize: 14, color: '#7a5c00', lineHeight: 1.7 }}>
            <strong>Important:</strong> Please email{' '}
            <a href="mailto:mike@best365labs.com" style={{ color: '#b8860b', fontWeight: 600 }}>mike@best365labs.com</a>{' '}
            for authorization and shipping instructions <strong>before</strong> sending any returns.
          </p>
        </div>

        <h2>For Returns</h2>
        <address className="privacy-contact">
          <strong>Best 365 Labs, Inc.</strong><br />
          14857 S Concorde Park Dr<br />
          Bluffdale, UT 84065
        </address>

        <h2>For Disputes</h2>
        <address className="privacy-contact">
          3936 W Sugarbeet Dr<br />
          West Valley City, UT 84120
        </address>

        <h2>Important Notes</h2>
        <ul>
          <li>Returns must be authorized before shipping to ensure proper processing</li>
          <li>Only unused portions of products are eligible for refund</li>
          <li>30-day return window begins from the date of purchase</li>
          <li>Customer is responsible for return shipping costs unless product was defective</li>
        </ul>

        <h2>Have Questions?</h2>
        <p>If you have any questions about returns or refunds, please contact us:</p>
        <address className="privacy-contact">
          <a href="mailto:mike@best365labs.com">mike@best365labs.com</a><br />
          <a href="tel:+13854215651">(385) 421-5651</a>
        </address>

        <p className="privacy-agreement">By purchasing from Best 365 Labs, you acknowledge that you have read, understood, and agree to be bound by this Return &amp; Refund Policy.</p>
      </main>

      <SharedFooter />
    </div>
  );
};

export default ReturnPolicyPage;
