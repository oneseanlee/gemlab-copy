import React from 'react';
import './AnimatedCTA.css';

const AnimatedCTA = React.forwardRef(({ children, href, onClick, className = '', small = false, ...props }, ref) => {
  const Tag = onClick && !href ? 'button' : 'a';
  return (
    <Tag
      ref={ref}
      href={Tag === 'a' ? (href || '#') : undefined}
      onClick={onClick}
      className={`animated-cta${small ? ' cta-sm' : ''} ${className}`}
      {...props}
    >
      <span className="cta-text-default">{children}</span>
      <span className="cta-text-hover" aria-hidden="true">{children}</span>
      <span className="cta-glow" aria-hidden="true" />
    </Tag>
  );
});

AnimatedCTA.displayName = 'AnimatedCTA';

export default AnimatedCTA;
