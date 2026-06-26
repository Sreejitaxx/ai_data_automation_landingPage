import React, { memo } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button, Container, Section } from '../ui';

const FinalCTA: React.FC = memo(() => {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-neutral-900 to-secondary-900/30"
            aria-hidden="true"
          />

          {/* Mesh Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.3), transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(20, 184, 166, 0.2), transparent 50%)
              `,
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Zap className="w-4 h-4 text-warning-500" aria-hidden="true" />
              <span className="text-sm text-neutral-300">Start your journey today</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto">
              <span className="text-neutral-100">Ready to Transform</span>
              <br />
              <span className="gradient-text-animated">Your Data Operations?</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
              Join thousands of data teams who trust Nexus AI to automate their
              workflows, gain predictive insights, and scale their operations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button variant="secondary" size="lg">
                Schedule Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
});

FinalCTA.displayName = 'FinalCTA';

export { FinalCTA };
