import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import './SharedFooter.css';

const SharedFooter = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer ref={ref} className="shared-footer">
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
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms and Conditions</Link></li>
              <li><Link to="/returns">Return Policy</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4>Follow Us</h4>
            <div className="shared-footer-social">
              <a href="https://www.facebook.com/Best365Labs" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/best365labs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/channel/UCZpFZ__arXCIsboHoRAMQWw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube size={18} />
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
});

SharedFooter.displayName = 'SharedFooter';

export default SharedFooter;
