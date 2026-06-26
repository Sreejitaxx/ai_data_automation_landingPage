import React, { memo, useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '../../hooks';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  blur: number;
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = memo(({
  count = 30,
  className = '',
}) => {
  const { prefersReducedMotion } = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate particles only once
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      blur: Math.random() * 2 + 1,
    }));
  }, [count]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: `radial-gradient(circle, rgba(245, 158, 11, 0.8), rgba(234, 88, 12, 0.4))`,
            filter: `blur(${particle.blur}px)`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

ParticleField.displayName = 'ParticleField';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = memo(({
  children,
  className = '',
  delay = 0,
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div
      className={`glass rounded-xl p-4 animate-float ${className}`}
      style={{
        animationDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        animation: prefersReducedMotion ? 'none' : undefined,
      }}
    >
      {children}
    </div>
  );
});

FloatingCard.displayName = 'FloatingCard';

interface HolographicCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay?: number;
  className?: string;
}

const HolographicCard: React.FC<HolographicCardProps> = memo(({
  icon,
  label,
  value,
  delay = 0,
  className = '',
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div
      className={`
        glass rounded-xl p-3 shadow-lg
        ${!prefersReducedMotion ? 'animate-float' : ''}
        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
        border border-white/[0.1]
        ${className}
      `}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 text-primary-500">{icon}</div>
        <span className="text-xs text-neutral-400">{label}</span>
      </div>
      <div className="text-lg font-semibold text-neutral-200">{value}</div>
    </div>
  );
});

HolographicCard.displayName = 'HolographicCard';

interface GradientMeshProps {
  className?: string;
}

const GradientMesh: React.FC<GradientMeshProps> = memo(({ className = '' }) => {
  const { prefersReducedMotion } = useReducedMotion();
  const meshRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion || !meshRef.current) return;

    const rect = meshRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const element = meshRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    return () => element.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={meshRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute w-full h-full transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at ${position.x}% ${position.y}%, rgba(99, 102, 241, 0.15), transparent 50%),
            radial-gradient(circle at ${100 - position.x}% ${position.y}%, rgba(20, 184, 166, 0.1), transparent 50%),
            radial-gradient(circle at ${position.x}% ${100 - position.y}%, rgba(249, 115, 22, 0.08), transparent 40%)
          `,
        }}
      />
    </div>
  );
});

GradientMesh.displayName = 'GradientMesh';

export { ParticleField, FloatingCard, HolographicCard, GradientMesh };
