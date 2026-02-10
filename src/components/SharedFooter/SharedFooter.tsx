import React from 'react';
import './SharedFooter.css';

const SharedFooter = () => {
  return (
    <footer className="shared-footer">
      <div className="shared-footer-inner">
        <div className="shared-footer-grid">
          {/* Brand */}
          <div className="shared-footer-brand">
            <img src="/images/best365labs-logo-white.png" alt="Best 365 Labs" />
            <p>Publicly Traded: BHIC</p>
          </div>

          {/* Contact */}
          <div className="shared-footer-contact">
            <h4>Contact</h4>
            <p>(385) 421-5651</p>
            <p><a href="mailto:info@best365labs.com">info@best365labs.com</a></p>
            <p>14857 S Concorde Park Dr<br />Bluffdale, UT 84065</p>
          </div>

          {/* Legal */}
          <div className="shared-footer-legal">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Return Policy</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4>Follow Us</h4>
            <div className="shared-footer-social">
              <a href="#" aria-label="Facebook">
                <iconify-icon icon="lucide:facebook" width="18"></iconify-icon>
              </a>
              <a href="#" aria-label="Instagram">
                <iconify-icon icon="lucide:instagram" width="18"></iconify-icon>
              </a>
              <a href="#" aria-label="YouTube">
                <iconify-icon icon="lucide:youtube" width="18"></iconify-icon>
              </a>
            </div>
          </div>
        </div>

        <hr className="shared-footer-divider" />

        <div className="shared-footer-disclaimers">
          <p>
            <strong>GLP-1 Program Disclaimer:</strong> Best 365 Labs is an e-commerce platform. Medical services, evaluations, and prescriptions are provided by independent licensed healthcare professionals through the happyMD telehealth network. Best 365 Labs does not provide medical advice, diagnoses, or prescriptions.
          </p>
          <p>
            <strong>Methylene Blue Caution:</strong> Methylene Blue should NOT be used by patients with glucose-6-phosphate dehydrogenase (G6PD) deficiency. It may also interact with psychiatric medications (MAOIs/SSRIs). Consult your healthcare provider before use.
          </p>
          <p>
            *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>

        <div className="shared-footer-copyright">
          © {new Date().getFullYear()} by Best 365 Labs, Inc
        </div>
      </div>
    </footer>
  );
};

export default SharedFooter;
