import { memo, useCallback, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button, Container, Section, SectionHeading } from '../ui';
import { usePricingControl, useIsolatedPrice } from '../../hooks/usePricing';
import { PRICING_TIERS } from '../../constants/pricing';
import type { PricingTier } from '../../types';

const Pricing = memo(() => {
  return (
    <Section id="pricing" background="gradient">
      <Container>
        <SectionHeading
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that fits your needs. All plans include a 14-day free trial."
        />
        <PricingContent />
      </Container>
    </Section>
  );
});

Pricing.displayName = 'Pricing';

// Pricing Content - does NOT re-render when currency/billing changes
// Only the inner PriceDisplay components re-render
const PricingContent = memo(() => {
  const {
    currency,
    billingCycle,
    setCurrency,
    setBillingCycle,
    annualSavings,
  } = usePricingControl();

  const handleCurrencyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as 'USD' | 'EUR' | 'INR');
  }, [setCurrency]);

  const handleBillingClick = useCallback(() => {
    setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
  }, [billingCycle, setBillingCycle]);

  return (
    <div className="space-y-8">
      {/* Currency and Billing Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        {/* Currency Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="currency" className="text-sm text-neutral-400">
            Currency:
          </label>
          <select
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            className="glass px-4 py-2 rounded-lg text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-3">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-neutral-200' : 'text-neutral-500'}`}>
            Monthly
          </span>
          <button
            type="button"
            onClick={handleBillingClick}
            className={`
              relative w-14 h-7 rounded-full transition-colors duration-200
              ${billingCycle === 'annual' ? 'bg-primary-500' : 'bg-neutral-700'}
            `}
            role="switch"
            aria-checked={billingCycle === 'annual'}
            aria-label="Toggle annual billing"
          >
            <div
              className={`
                absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-200
                ${billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-1'}
              `}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'annual' ? 'text-neutral-200' : 'text-neutral-500'}`}>
            Annual
          </span>
          {billingCycle === 'annual' && (
            <span className="text-xs text-success-500 font-medium px-2 py-1 bg-success-500/10 rounded-full">
              Save {annualSavings}%
            </span>
          )}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {PRICING_TIERS.map((tier, index) => (
          <PricingTierCard
            key={tier.id}
            tier={tier}
            index={index}
            basePriceUSD={tier.basePriceUSD}
          />
        ))}
      </div>

      {/* Enterprise CTA */}
      <div className="text-center mt-8">
        <p className="text-neutral-400 text-sm">
          Need a custom solution?{' '}
          <a href="#" className="text-primary-400 hover:text-primary-300 underline underline-offset-4">
            Contact our sales team
          </a>
        </p>
      </div>
    </div>
  );
});

PricingContent.displayName = 'PricingContent';

// Individual Pricing Tier Card - receives basePriceUSD and uses isolated hook
interface PricingTierCardProps {
  tier: PricingTier;
  index: number;
  basePriceUSD: number;
}

const PricingTierCard = memo(({
  tier,
  index,
  basePriceUSD,
}: PricingTierCardProps) => {
  // This hook isolates the price updates to this component only
  // Parent and sibling components won't re-render
  const { formattedPrice, currencySymbol, billingCycle } = useIsolatedPrice(basePriceUSD);

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Calculate monthly price for annual billing display
  const monthlyPrice = billingCycle === 'annual'
    ? `${currencySymbol}${Math.round(Number(formattedPrice.replace(/[^0-9.]/g, '')) / 12)}`
    : null;

  // 3D tilt effect handlers - 150-200ms as per spec
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  const transform = isHovered
    ? `perspective(1000px) rotateX(${mousePosition.y * -6}deg) rotateY(${mousePosition.x * 6}deg) translateZ(15px)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        animate-slide-up cursor-pointer
        ${tier.isPopular
          ? 'glass-strong border-primary-500/30'
          : 'glass border-white/[0.08]'
        }
      `}
      style={{
        animationDelay: `${index * 100}ms`,
        transform,
        // 150-200ms for micro-interactions as per spec
        transition: 'transform 150ms ease-out, box-shadow 300ms ease-out',
        boxShadow: isHovered
          ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.15), ${mousePosition.x * -10}px ${mousePosition.y * 10}px 30px rgba(0, 0, 0, 0.3)`
          : tier.isPopular ? '0 0 20px rgba(245, 158, 11, 0.3)' : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic light effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(245, 158, 11, 0.1), transparent 60%)`,
          }}
        />
      )}

      {/* Popular Badge */}
      {tier.isPopular && (
        <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600" />
      )}

      <div className="p-6 lg:p-8">
        {/* Popular Label */}
        {tier.isPopular && (
          <div className="flex items-center justify-center gap-1.5 text-primary-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Most Popular
          </div>
        )}

        {/* Tier Name */}
        <h3 className="text-xl font-semibold text-neutral-200 mb-2">
          {tier.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-400 mb-6 line-clamp-2">
          {tier.description}
        </p>

        {/* Price - Only this span updates when currency/billing changes */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold gradient-text">
              {formattedPrice}
            </span>
            <span className="text-neutral-500">/{billingCycle === 'annual' ? 'year' : 'month'}</span>
          </div>
          {billingCycle === 'annual' && monthlyPrice && (
            <p className="text-sm text-neutral-500 mt-1">
              Billed annually ({monthlyPrice}/month)
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Button
          variant={tier.isPopular ? 'primary' : 'secondary'}
          className="w-full mb-6"
        >
          {tier.ctaText}
        </Button>

        {/* Features List */}
        <ul className="space-y-3" role="list">
          {tier.features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="flex items-start gap-2 text-sm"
            >
              <Check
                className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-neutral-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

PricingTierCard.displayName = 'PricingTierCard';

export { Pricing };
