import React, { memo, useRef, useState, useCallback } from 'react';
import { useTilt, useReducedMotion } from '../../hooks';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableGlow?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

const Card: React.FC<CardProps> = memo(({
  children,
  className = '',
  enableTilt = true,
  enableGlow = true,
  onClick,
  as: Component = 'div',
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const { prefersReducedMotion } = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const { style, handleMouseMove, handleMouseLeave } = useTilt(cardRef as React.RefObject<HTMLElement>, {
    maxTilt: 12,
    perspective: 1000,
  });

  const shouldAnimate = !prefersReducedMotion && enableTilt;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseMoveWrapper = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
    if (shouldAnimate) {
      handleMouseMove(e as React.MouseEvent<HTMLElement>);
    }
  }, [shouldAnimate, handleMouseMove]);

  const handleMouseLeaveWrapper = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
    if (shouldAnimate) {
      handleMouseLeave();
    }
  }, [handleMouseLeave, shouldAnimate]);

  const baseClasses = 'relative rounded-2xl overflow-hidden transition-transform duration-300';
  const glassClasses = 'glass';
  const glowClasses = enableGlow
    ? 'transition-shadow duration-300'
    : '';
  const hoverClasses = enableGlow
    ? isHovered
      ? 'shadow-glow'
      : ''
    : '';

  const combinedClasses = `${baseClasses} ${glassClasses} ${glowClasses} ${hoverClasses} ${className}`;

  return (
    <Component
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className={combinedClasses}
      style={shouldAnimate ? style : {}}
      onMouseMove={shouldAnimate ? handleMouseMoveWrapper : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveWrapper}
      onClick={onClick}
    >
      {/* Dynamic light reflection */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(245, 158, 11, 0.4), transparent 60%)`,
          }}
        />
      </div>

      {/* Gradient border overlay */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : ''}
        `}>
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(234, 88, 12, 0.3))',
              boxShadow: 'inset 0 0 0 1px rgba(245, 158, 11, 0.5)',
            }}
          />
        </div>
      </div>

      {/* 3D Shadow effect */}
      {isHovered && enableGlow && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `
              ${(mousePosition.x - 0.5) * -20}px ${(mousePosition.y - 0.5) * -20}px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(245, 158, 11, 0.2)
            `,
            transition: 'box-shadow 0.2s ease-out',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
});

Card.displayName = 'Card';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

const GlassContainer: React.FC<GlassContainerProps> = memo(({
  children,
  className = '',
  intensity = 'medium',
}) => {
  const intensityClasses = {
    light: 'bg-white/[0.02] backdrop-blur-lg border-white/[0.05]',
    medium: 'bg-white/[0.03] backdrop-blur-xl border-white/[0.08]',
    strong: 'bg-white/[0.06] backdrop-blur-2xl border-white/[0.12]',
  };

  return (
    <div className={`relative rounded-2xl border ${intensityClasses[intensity]} ${className}`}>
      {children}
    </div>
  );
});

GlassContainer.displayName = 'GlassContainer';

export { Card, GlassContainer };
