import React, { memo } from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
  maxWidth?: string;
}

const Container: React.FC<ContainerProps> = memo(({
  children,
  className = '',
  as: Component = 'div',
  maxWidth = 'max-w-7xl',
}) => {
  return (
    <Component className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidth} ${className}`}>
      {children}
    </Component>
  );
});

Container.displayName = 'Container';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'none' | 'gradient' | 'glass';
}

const Section: React.FC<SectionProps> = memo(({
  children,
  id,
  className = '',
  background = 'none',
}) => {
  const backgroundClasses = {
    none: '',
    gradient: 'bg-gradient-to-b from-transparent via-primary-950/10 to-transparent',
    glass: 'relative',
  };

  return (
    <section
      id={id}
      className={`relative py-20 lg:py-32 ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = memo(({
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        <span className="gradient-text-animated">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
});

SectionHeading.displayName = 'SectionHeading';

export { Container, Section, SectionHeading };
