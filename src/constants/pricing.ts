import type { Currency, BillingCycle, CurrencyConfig, PricingTier } from '../types';

// Annual discount factor - exactly 20% off
export const ANNUAL_DISCOUNT_FACTOR = 0.8;

// Currency configurations with regional multipliers and conversion rates
export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    multiplier: 1,
    locale: 'en-US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    multiplier: 0.92, // EUR is slightly stronger
    locale: 'de-DE',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    multiplier: 83.5, // INR exchange rate
    locale: 'en-IN',
  },
} as const;

// Base pricing tiers with USD prices
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects getting started with AI automation.',
    features: [
      '5,000 API calls per month',
      'Basic data connectors',
      'Email support',
      'Community access',
      'Basic analytics dashboard',
      '1 team member',
    ],
    basePriceUSD: 49,
    ctaText: 'Start Free Trial',
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Ideal for growing teams that need more power and advanced features.',
    features: [
      '50,000 API calls per month',
      'Advanced data connectors',
      'Priority email support',
      'Private Slack community',
      'Advanced analytics & reporting',
      '5 team members',
      'Custom workflows',
      'Webhook integrations',
    ],
    basePriceUSD: 149,
    isPopular: true,
    ctaText: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations requiring maximum scale and security.',
    features: [
      'Unlimited API calls',
      'Enterprise data connectors',
      '24/7 dedicated support',
      'Custom SLA',
      'Advanced security & compliance',
      'Unlimited team members',
      'Custom AI model training',
      'On-premise deployment option',
      'SSO & SAML integration',
      'Audit logs & governance',
    ],
    basePriceUSD: 299,
    ctaText: 'Contact Sales',
  },
];

// Pricing calculations
export function calculatePrice(
  basePriceUSD: number,
  currency: Currency,
  billingCycle: BillingCycle
): number {
  const currencyConfig = CURRENCIES[currency];
  const convertedPrice = basePriceUSD * currencyConfig.multiplier;
  const finalPrice = billingCycle === 'annual'
    ? convertedPrice * ANNUAL_DISCOUNT_FACTOR
    : convertedPrice;
  return finalPrice;
}

export function formatPrice(
  price: number,
  currency: Currency
): string {
  return new Intl.NumberFormat(CURRENCIES[currency].locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getFormattedPrice(
  basePriceUSD: number,
  currency: Currency,
  billingCycle: BillingCycle
): string {
  const price = calculatePrice(basePriceUSD, currency, billingCycle);
  return formatPrice(price, currency);
}
