import React, { memo } from 'react';
import type { ButtonProps, ButtonVariant, ButtonSize } from '../../types';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-neutral-900 hover:bg-primary-400 active:bg-primary-600 shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5',
  secondary: 'glass text-neutral-200 hover:bg-white/[0.08] hover:border-white/[0.15]',
  ghost: 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05]',
  outline: 'border border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button: React.FC<ButtonProps> = memo(({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel,
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950';
  const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
