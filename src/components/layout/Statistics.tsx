import { memo, useRef, useEffect, useState, useCallback } from 'react';
import { Container, Section } from '../ui';
import { STATISTICS } from '../../constants';
import { useInView } from '../../hooks';

const Statistics = memo(() => {
  return (
    <Section id="stats">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATISTICS.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
});

Statistics.displayName = 'Statistics';

// Individual Stat Card
interface StatCardProps {
  stat: typeof STATISTICS[0];
  index: number;
}

const StatCard: React.FC<StatCardProps> = memo(({ stat, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.5 });

  return (
    <div
      ref={ref}
      className="glass rounded-2xl p-6 text-center group hover:bg-white/[0.06] transition-all duration-300"
    >
      <AnimatedCounter
        target={stat.value}
        suffix={stat.suffix}
        isInView={isInView}
        delay={index * 100}
      />
      <div className="text-lg font-semibold text-neutral-200 mt-2 mb-1">
        {stat.label}
      </div>
      <div className="text-sm text-neutral-500">
        {stat.description}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

// Animated Counter Component
interface AnimatedCounterProps {
  target: number;
  suffix: string;
  isInView: boolean;
  delay?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = memo(({
  target,
  suffix,
  isInView,
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = isDecimal
        ? Number((easeOut * target).toFixed(1))
        : Math.floor(easeOut * target);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, target, isDecimal, delay]);

  const formatValue = useCallback((val: number) => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(val >= 10000 ? 0 : 1) + 'K';
    }
    return val.toString();
  }, []);

  return (
    <div className="text-3xl lg:text-4xl font-bold gradient-text">
      {formatValue(displayValue)}
      {suffix}
    </div>
  );
});

AnimatedCounter.displayName = 'AnimatedCounter';

export { Statistics };
