import SharedFooter from '../components/SharedFooter/SharedFooter';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
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
        <h1>Privacy Policy</h1>
        <p className="privacy-updated">Last updated: January 1, 2025</p>

        <div className="privacy-notice">
          <p>IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE EXIT THIS SITE IMMEDIATELY.</p>
          <p>PLEASE BE ADVISED THAT YOUR CONTINUED USE OF THIS SITE OR THE INFORMATION PROVIDED HEREIN SHALL INDICATE YOUR CONSENT AND AGREEMENT TO THIS PRIVACY POLICY.</p>
        </div>

        <p>We are fully committed to protecting and maintaining your privacy. This Privacy Policy discloses our information gathering and dissemination practices, as well as our use of all personally identifiable information.</p>

        <h2>General Policy</h2>
        <p>In general, any and all personal information we receive from this site will remain completely confidential and will be used solely:</p>
        <ul>
          <li>(i) for our internal marketing or administrative purposes,</li>
          <li>(ii) to provide the services and/or information which you have requested, or</li>
          <li>(iii) as otherwise required under the law.</li>
        </ul>
        <p>We will not share your personal information with any non-affiliated third parties. However, personal information may occasionally be shared with our business partners.</p>

        <h2>Personal Information</h2>
        <p>The personal information we may ask you for may include your name, title, address, email address, and/or phone number. We may use your information to provide you with important information about any product, service, or information that you are using. Additionally, we may send you information about our other products and services.</p>
        <p>We may use the information we receive from individuals, either from their completion of "opt-in" forms, polls, surveys, orders, or the like, in a non-identifying manner to create aggregate statistics which may be published and/or used for our marketing or administrative purposes. This aggregated and non-personally identifying information may also be shared with third parties.</p>
        <p>Further, we may employ the use of "cookies." A "cookie" is a small data file that is placed on your hard drive through which we may collect certain personally identifiable information when you visit our site, such as your IP address, the date and time you access the site, and the pages that you access while at this site. This information is collected and stored for statistical purposes, to help us improve and administer this site more appropriately, and to help provide you with better service.</p>
        <p>Please be advised that our advertisers and/or partners may also use their own "cookies." We do not control use of these "cookies" and expressly disclaim responsibility for any information collected or disseminated through them.</p>

        <h2>Links to Other Sites</h2>
        <p>We are neither responsible for the privacy practices nor the content of any other web sites to which we may link.</p>

        <h2>Changes to Privacy Policy</h2>
        <p>We reserve the right to change this Privacy Policy at any time. Please refer to this Privacy Policy regularly to remain informed of its terms. Your continued use of this site or the information provided herein shall indicate your consent and agreement to any changes made in this Privacy Policy.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
        <address className="privacy-contact">
          <strong>Best 365 Labs, Inc.</strong><br />
          14857 S Concorde Park Dr<br />
          Bluffdale, UT 84065<br /><br />
          <a href="mailto:info@best365labs.com">info@best365labs.com</a><br />
          <a href="tel:+13854215651">(385) 421-5651</a>
        </address>

        <p className="privacy-agreement">By using the Website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.</p>
      </main>

      <SharedFooter />
    </div>
  );
};

export default PrivacyPolicyPage;
