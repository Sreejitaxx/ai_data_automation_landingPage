import React, { memo } from 'react';
import { Container } from '../ui';
import { TRUSTED_LOGOS } from '../../constants';

const TrustedBy: React.FC = memo(() => {
  return (
    <section className="py-12 lg:py-16 border-y border-white/[0.05]" aria-labelledby="trusted-heading">
      <Container>
        <p
          id="trusted-heading"
          className="text-center text-sm text-neutral-500 mb-8"
        >
          Trusted by innovative companies worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {TRUSTED_LOGOS.map((logo) => (
            <CompanyLogo key={logo.id} name={logo.name} />
          ))}
        </div>
      </Container>
    </section>
  );
});

TrustedBy.displayName = 'TrustedBy';

// Company Logo Component - SVG-based
const CompanyLogo: React.FC<{ name: string }> = memo(({ name }) => {
  // Generate a deterministic pattern based on company name
  const getInitials = (n: string) => {
    return n.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div
      className="group flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
      role="img"
      aria-label={name}
    >
      <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-700 group-hover:text-neutral-300 transition-colors">
        <span className="text-xs font-semibold">{getInitials(name)}</span>
      </div>
      <span className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors hidden sm:block">
        {name}
      </span>
    </div>
  );
});

CompanyLogo.displayName = 'CompanyLogo';

export { TrustedBy };
