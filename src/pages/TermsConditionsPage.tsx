import SharedFooter from '../components/SharedFooter/SharedFooter';
import './PrivacyPolicyPage.css';

const TermsConditionsPage = () => {
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
        <h1>Terms and Conditions</h1>
        <p className="privacy-updated">Last updated: January 1, 2025</p>

        <h2>Introduction</h2>
        <p>Welcome to www.Best365Labs.com ("the Website"). This Website is owned and operated by Best365 Labs ("we," "us," "our"). By accessing or using the Website, you agree to comply with and be bound by these Terms and Conditions ("Terms"). Please review them carefully. If you do not agree to these Terms, you should not use the Website.</p>

        <h2>Use of the Website</h2>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>Eligibility</h3>
        <p>You must be at least 18 years of age to use this Website. By using the Website, you represent and warrant that you are at least 18 years old and that you have the legal capacity to enter into this agreement.</p>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>Account Creation</h3>
        <p>To access certain features of the Website, you may need to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account.</p>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>Prohibited Activities</h3>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Website for any illegal purposes.</li>
          <li>Upload, post, or transmit any material that is defamatory, obscene, offensive, or otherwise objectionable.</li>
          <li>Interfere with or disrupt the operation of the Website.</li>
          <li>Attempt to gain unauthorized access to any part of the Website, other accounts, computer systems, or networks connected to the Website.</li>
        </ul>

        <h2>Intellectual Property</h2>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>Ownership</h3>
        <p>All content on the Website, including text, graphics, logos, images, and software, is the property of Best365 Labs or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>Limited License</h3>
        <p>We grant you a limited, non-exclusive, non-transferable license to access and use the Website for personal, non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works of the content without our prior written consent.</p>

        <h2>Disclaimers and Limitation of Liability</h2>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>No Warranties</h3>
        <p>The Website is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the Website's operation or the information, content, or materials included on the Website.</p>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>Limitation of Liability</h3>
        <p>To the fullest extent permitted by law, Best365 Labs shall not be liable for any damages arising out of or in connection with your use of the Website. This includes, but is not limited to, direct, indirect, incidental, punitive, and consequential damages.</p>

        <h2>User Content</h2>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>User Submissions</h3>
        <p>You may be able to submit content to the Website, such as reviews or comments. By submitting content, you grant us a worldwide, non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in any media.</p>

        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12, color: '#1a1a1a' }}>Responsibility</h3>
        <p>You are solely responsible for the content you submit and agree not to submit any content that infringes on the rights of others or violates any laws.</p>

        <h2>Privacy Policy</h2>
        <p>Your use of the Website is also governed by our <a href="/privacy" style={{ color: '#b8860b', fontWeight: 500 }}>Privacy Policy</a>. Please review it to understand our practices.</p>

        <h2>Modifications to the Terms</h2>
        <p>We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on the Website. Your continued use of the Website after any changes constitutes your acceptance of the new Terms.</p>

        <h2>Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Best365 Labs operates, without regard to its conflict of law principles.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <address className="privacy-contact">
          <strong>Best365 Labs, Inc</strong><br />
          14857 S Concorde Park Dr<br />
          Bluffdale, UT 84065<br /><br />
          <a href="mailto:info@best365labs.com">Info@Best365Labs.com</a><br />
          <a href="tel:+13854215651">385-421-5651</a>
        </address>

        <p className="privacy-agreement">By using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
      </main>

      <SharedFooter />
    </div>
  );
};

export default TermsConditionsPage;
