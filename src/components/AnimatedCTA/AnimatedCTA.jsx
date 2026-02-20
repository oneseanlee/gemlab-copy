import React from 'react';
import './AnimatedCTA.css';

const AnimatedCTA = React.forwardRef(function AnimatedCTA(
  { children, href, onClick, className = '', small = false, ...props },
  ref
) {
  if (onClick && !href) {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`animated-cta${small ? ' cta-sm' : ''} ${className}`}
        {...props}
      >
        <span className="cta-text-default">{children}</span>
        <span className="cta-text-hover" aria-hidden="true">{children}</span>
        <span className="cta-glow" aria-hidden="true" />
      </button>
    );
  }

  return (
    <a
      ref={ref}
      href={href || '#'}
      onClick={onClick}
      className={`animated-cta${small ? ' cta-sm' : ''} ${className}`}
      {...props}
    >
      <span className="cta-text-default">{children}</span>
      <span className="cta-text-hover" aria-hidden="true">{children}</span>
      <span className="cta-glow" aria-hidden="true" />
    </a>
  );
});

AnimatedCTA.displayName = 'AnimatedCTA';

export default AnimatedCTA;
