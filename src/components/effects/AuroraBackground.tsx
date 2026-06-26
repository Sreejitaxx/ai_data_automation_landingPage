import React, { memo, useEffect, useRef, useMemo } from 'react';
import { useReducedMotion } from '../../hooks';

const AuroraBackground: React.FC = memo(() => {
  const { prefersReducedMotion } = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    // Animation is CSS-based
  }, [prefersReducedMotion]);

  const gradientStyle = useMemo(() => ({
    position: 'absolute' as const,
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none' as const,
  }), []);

  const blobStyle = useMemo(() => ({
    position: 'absolute' as const,
    borderRadius: '50%',
    filter: 'blur(60px)',
    mixBlendMode: 'screen' as const,
    animation: prefersReducedMotion ? 'none' : undefined,
  }), [prefersReducedMotion]);

  return (
    <div ref={containerRef} style={gradientStyle} aria-hidden="true">
      {/* Aurora gradient layers - warm amber/orange tones */}
      <div
        style={{
          ...blobStyle,
          width: '80%',
          height: '50%',
          left: '10%',
          top: '-20%',
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'aurora 15s linear infinite',
        }}
      />
      <div
        style={{
          ...blobStyle,
          width: '60%',
          height: '40%',
          right: '0%',
          top: '30%',
          background: 'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.12) 0%, transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'aurora 20s linear infinite reverse',
          animationDelay: '-5s',
        }}
      />
      <div
        style={{
          ...blobStyle,
          width: '70%',
          height: '50%',
          left: '10%',
          bottom: '10%',
          background: 'radial-gradient(ellipse at center, rgba(180, 83, 9, 0.1) 0%, transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'aurora 25s linear infinite',
          animationDelay: '-10s',
        }}
      />
      <div
        style={{
          ...blobStyle,
          width: '50%',
          height: '30%',
          left: '25%',
          top: '40%',
          background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
          animation: prefersReducedMotion ? 'none' : 'aurora 18s linear infinite reverse',
          animationDelay: '-8s',
        }}
      />
    </div>
  );
});

AuroraBackground.displayName = 'AuroraBackground';

export { AuroraBackground };
