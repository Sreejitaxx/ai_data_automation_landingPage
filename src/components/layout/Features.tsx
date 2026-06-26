import { memo, useState, useCallback, useRef } from 'react';
import { Brain, Zap, Shield, Plug, BarChart3, Users } from 'lucide-react';
import { Container, Section, SectionHeading, Accordion } from '../ui';
import { FEATURES } from '../../constants';
import { useViewport, useReducedMotion } from '../../hooks';
import type { Feature } from '../../types';

const Features = memo(() => {
  const { isMobile } = useViewport();
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);

  // Handle feature activation - shared between Bento and Accordion
  const handleActivate = useCallback((id: string) => {
    setActiveFeatureId(id);
  }, []);

  return (
    <Section id="features" background="gradient">
      <Container>
        <SectionHeading
          title="Powerful Features"
          subtitle="Everything you need to automate, analyze, and accelerate your data operations"
        />

        {/* Desktop: Bento Grid */}
        {!isMobile && (
          <BentoGrid
            features={FEATURES}
            activeId={activeFeatureId}
            onActivate={handleActivate}
          />
        )}

        {/* Mobile: Accordion */}
        {isMobile && (
          <FeaturesAccordion
            features={FEATURES}
            activeId={activeFeatureId}
            onActivate={handleActivate}
          />
        )}
      </Container>
    </Section>
  );
});

Features.displayName = 'Features';

// Feature Icon Component
const FeatureIcon = memo(({
  iconName,
  gradient,
  isActive = false
}: {
  iconName: string;
  gradient: string;
  isActive?: boolean;
}) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    brain: Brain,
    zap: Zap,
    shield: Shield,
    plug: Plug,
    chart: BarChart3,
    users: Users,
  };

  const IconComponent = icons[iconName] || Brain;

  return (
    <div className={`
      w-10 h-10 rounded-xl flex items-center justify-center
      bg-gradient-to-br ${gradient}
      ${isActive ? 'shadow-glow' : 'shadow-sm'}
      transition-shadow duration-300
    `}>
      <IconComponent className="w-5 h-5 text-white" />
    </div>
  );
});

FeatureIcon.displayName = 'FeatureIcon';

// Bento Grid Component
interface BentoGridProps {
  features: Feature[];
  activeId: string | null;
  onActivate: (id: string) => void;
}

const BentoGrid = memo(({ features, activeId, onActivate }: BentoGridProps) => {
  // Grid layout configuration
  const gridPositions: Record<string, string> = {
    'ai-automation': 'col-span-2 row-span-2',
    'real-time': 'col-span-1 row-span-2',
    'security': 'col-span-1 row-span-2',
    'integrations': 'col-span-1 row-span-1',
    'analytics': 'col-span-1 row-span-1',
    'collaboration': 'col-span-2 row-span-1',
  };

  return (
    <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
      {features.map((feature, index) => (
        <BentoCard
          key={feature.id}
          feature={feature}
          position={gridPositions[feature.id] || 'col-span-1 row-span-1'}
          isActive={activeId === feature.id}
          onActivate={onActivate}
          index={index}
        />
      ))}
    </div>
  );
});

BentoGrid.displayName = 'BentoGrid';

// Bento Card Component
interface BentoCardProps {
  feature: Feature;
  position: string;
  isActive: boolean;
  onActivate: (id: string) => void;
  index: number;
}

const BentoCard = memo(({
  feature,
  position,
  isActive: _isActive,
  onActivate,
  index
}: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setMousePosition({ x, y });
  }, [prefersReducedMotion]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onActivate(feature.id);
  }, [feature.id, onActivate]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  // Enhanced 3D transform with stronger tilt effect
  const transform = prefersReducedMotion || !isHovered
    ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    : `perspective(1000px) rotateX(${mousePosition.y * -8}deg) rotateY(${mousePosition.x * 8}deg) translateZ(30px)`;

  return (
    <div
      ref={cardRef}
      className={`
        ${position}
        relative group cursor-pointer
        animate-slide-up
      `}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={feature.title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onActivate(feature.id);
        }
      }}
    >
      <div
        className={`
          absolute inset-0 rounded-2xl overflow-hidden
          glass transition-all duration-300
          ${isHovered ? 'shadow-card-hover border-primary-500/30' : 'border-white/[0.08]'}
        `}
        style={{
          transform,
          transition: prefersReducedMotion ? 'none' : 'transform 150ms ease-out, box-shadow 300ms ease-out',
        }}
      >
        {/* Gradient overlay on hover - warm theme */}
        <div
          className={`
            absolute inset-0 opacity-0 transition-opacity duration-300
            bg-gradient-to-br ${feature.gradient}
            ${isHovered ? 'opacity-15' : ''}
          `}
        />

        {/* Dynamic light reflection effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 40}% ${50 + mousePosition.y * 40}%, rgba(245, 158, 11, 0.15), transparent 50%)`,
          }}
        />

        {/* 3D shadow effect */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-200"
          style={{
            boxShadow: isHovered
              ? `${mousePosition.x * -15}px ${mousePosition.y * 15}px 40px rgba(0, 0, 0, 0.4)`
              : 'none',
          }}
        />

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col">
          <FeatureIcon
            iconName={feature.icon}
            gradient={feature.gradient}
            isActive={isHovered}
          />
          <h3 className="text-lg font-semibold text-neutral-200 mt-4 mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
});

BentoCard.displayName = 'BentoCard';

// Features Accordion Component (Mobile)
interface FeaturesAccordionProps {
  features: Feature[];
  activeId: string | null;
  onActivate: (id: string) => void;
}

const FeaturesAccordion = memo(({
  features,
  activeId,
  onActivate
}: FeaturesAccordionProps) => {
  const accordionItems = features.map(feature => ({
    id: feature.id,
    title: (
      <div className="flex items-center gap-3">
        <FeatureIcon
          iconName={feature.icon}
          gradient={feature.gradient}
        />
        <span className="font-medium text-neutral-200">{feature.title}</span>
      </div>
    ),
    content: (
      <div className="space-y-3">
        <p className="text-neutral-400 leading-relaxed">
          {feature.description}
        </p>
      </div>
    ),
  }));

  return (
    <Accordion
      items={accordionItems}
      activeId={activeId ?? undefined}
      onChange={(ids: string[]) => onActivate(ids[0] || '')}
    />
  );
});

FeaturesAccordion.displayName = 'FeaturesAccordion';

export { Features };
