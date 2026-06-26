import { memo, useRef } from 'react';
import { useMousePosition, useReducedMotion } from '../../hooks';

interface CursorSpotlightProps {
  size?: number;
  className?: string;
}

const CursorSpotlight: React.FC<CursorSpotlightProps> = memo(({
  size = 400,
  className = '',
}) => {
  const { position } = useMousePosition();
  const { prefersReducedMotion } = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={spotlightRef}
      className={`fixed pointer-events-none z-50 ${className}`}
      style={{
        width: size,
        height: size,
        left: position.x - size / 2,
        top: position.y - size / 2,
        transform: 'translate(0, 0)',
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(20, 184, 166, 0.2), transparent 70%)',
        }}
      />
    </div>
  );
});

CursorSpotlight.displayName = 'CursorSpotlight';

interface GlowLineProps {
  className?: string;
  gradient?: string;
  animated?: boolean;
}

const GlowLine: React.FC<GlowLineProps> = memo(({
  className = '',
  gradient = 'from-primary-500 via-secondary-500 to-accent-500',
  animated = true,
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div className={`absolute inset-x-0 h-px overflow-hidden ${className}`}>
      <div
        className={`
          h-full bg-gradient-to-r ${gradient}
          ${animated && !prefersReducedMotion ? 'animate-shimmer' : ''}
        `}
        style={{
          width: '200%',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
});

GlowLine.displayName = 'GlowLine';

interface GlassReflectionProps {
  className?: string;
}

const GlassReflection: React.FC<GlassReflectionProps> = memo(({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none ${className}`}>
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent"
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 100%)' }}
      />
    </div>
  );
});

GlassReflection.displayName = 'GlassReflection';

interface BreathingElementProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

const BreathingElement: React.FC<BreathingElementProps> = memo(({
  children,
  className = '',
  scale: _scale = 1.02,
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  const style = prefersReducedMotion
    ? {}
    : {
        animation: 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
});

BreathingElement.displayName = 'BreathingElement';

export {
  CursorSpotlight,
  GlowLine,
  GlassReflection,
  BreathingElement
};
