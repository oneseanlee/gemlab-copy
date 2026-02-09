import React from 'react';
import './AnimatedCTA.css';

const AnimatedCTA = ({ children, href = '#', className = '', small = false, ...props }) => {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href || undefined}
      className={`animated-cta${small ? ' cta-sm' : ''} ${className}`}
      {...props}
    >
      <span className="cta-text-default">{children}</span>
      <span className="cta-text-hover" aria-hidden="true">{children}</span>
      <span className="cta-glow" aria-hidden="true" />
    </Tag>
  );
};

export default AnimatedCTA;
