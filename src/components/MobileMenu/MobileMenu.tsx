import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './MobileMenu.css';

interface MobileMenuProps {
  links: Array<{ label: string; href: string }>;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ links, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <img src="/images/best365labs-logo.png" alt="Best 365 Labs" style={{ height: 32 }} />
          <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-menu-nav">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="mobile-menu-link" onClick={onClose}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <a href="mailto:info@best365labs.com" className="mobile-menu-contact">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
