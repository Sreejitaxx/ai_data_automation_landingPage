// Types for the Nexus AI landing page

export type Currency = 'USD' | 'EUR' | 'INR';
export type BillingCycle = 'monthly' | 'annual';

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  basePriceUSD: number;
  isPopular?: boolean;
  ctaText: string;
}

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  multiplier: number;
  locale: string;
}

export interface PricingState {
  currency: Currency;
  billingCycle: BillingCycle;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  size: 'small' | 'medium' | 'large';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavCTA {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface LogoItem {
  id: string;
  name: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ViewportDimensions {
  width: number;
  height: number;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface AccordionItemState {
  id: string;
  isOpen: boolean;
}

export interface BentoCardProps {
  feature: Feature;
  index: number;
  isActive: boolean;
  onActivate: (id: string) => void;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}
