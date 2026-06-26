import { memo, useRef } from 'react';
import { Play, ArrowRight, Sparkles, TrendingUp, Database, Cpu } from 'lucide-react';
import { Button } from '../ui';
import { HolographicCard } from '../effects';
import { useReducedMotion } from '../../hooks';

const Hero = memo(() => {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary-400" aria-hidden="true" />
              <span className="text-sm text-neutral-300">Introducing Nexus AI v3.0</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-6"
            >
              <span className="block text-neutral-100">Transform Data</span>
              <span className="block gradient-text-animated">Into Intelligence</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-neutral-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Automate complex data workflows with AI. From ingestion to insights,
              Nexus AI delivers enterprise-grade data automation in minutes, not months.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="primary" size="lg">
                Start Free Trial
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button variant="secondary" size="lg">
                <Play className="w-5 h-5" aria-hidden="true" />
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-success-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="hidden sm:block w-px h-4 bg-neutral-700" />
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-success-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                14-day free trial
              </span>
              <span className="hidden sm:block w-px h-4 bg-neutral-700" />
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-success-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Right Content - Dashboard Illustration */}
          <DashboardIllustration />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

// Dashboard Illustration Component
const DashboardIllustration = memo(() => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div className="relative w-full aspect-square lg:aspect-[4/3] animate-fade-in animation-delay-200">
      {/* Main Dashboard Container */}
      <div className="relative w-full h-full perspective">
        <div className="absolute inset-0 preserve-3d">
          {/* Dashboard Frame */}
          <div className="absolute inset-0 glass-strong rounded-3xl overflow-hidden shadow-elevated">
            {/* Dashboard Header */}
            <div className="h-12 flex items-center justify-between px-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error-500" />
                <div className="w-3 h-3 rounded-full bg-warning-500" />
                <div className="w-3 h-3 rounded-full bg-success-500" />
              </div>
              <div className="text-xs text-neutral-500 font-mono">nexus-ai-dashboard</div>
              <div className="w-20" />
            </div>

            {/* Dashboard Content */}
            <div className="p-4 h-[calc(100%-48px)] overflow-hidden">
              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <DashboardMetric
                  icon={<TrendingUp className="w-4 h-4" />}
                  label="Revenue"
                  value="$2.4M"
                  change="+24%"
                  positive
                />
                <DashboardMetric
                  icon={<Database className="w-4 h-4" />}
                  label="Data Points"
                  value="847K"
                  change="+12%"
                  positive
                />
                <DashboardMetric
                  icon={<Cpu className="w-4 h-4" />}
                  label="AI Models"
                  value="23"
                  change="Active"
                  positive
                />
              </div>

              {/* Chart Area */}
              <div className="glass rounded-xl p-4 mb-4">
                <div className="text-xs text-neutral-500 mb-3">Predictive Analytics</div>
                <div className="relative h-32">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(245, 158, 11, 0.4)" />
                        <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
                      </linearGradient>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d="M 0 70 Q 50 60, 80 50 T 160 40 T 240 20 T 320 30 T 400 15 V 100 H 0 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* Line */}
                    <path
                      d="M 0 70 Q 50 60, 80 50 T 160 40 T 240 20 T 320 30 T 400 15"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      className={prefersReducedMotion ? '' : 'animate-pulse-slow'}
                    />
                    {/* Data points */}
                    {[[80, 50], [160, 40], [240, 20], [320, 30], [400, 15]].map(([x, y], i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#f59e0b"
                        stroke="#18181b"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              {/* AI Workflow Visual */}
              <div className="glass rounded-xl p-4">
                <div className="text-xs text-neutral-500 mb-3">Active AI Pipeline</div>
                <div className="flex items-center justify-between">
                  <WorkflowNode label="Ingest" status="active" />
                  <WorkflowConnector />
                  <WorkflowNode label="Process" status="active" />
                  <WorkflowConnector />
                  <WorkflowNode label="Transform" status="processing" />
                  <WorkflowConnector />
                  <WorkflowNode label="Deploy" status="pending" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Holographic Cards */}
      <HolographicCard
        icon={<Sparkles className="w-4 h-4" />}
        label="AI Insights"
        value="98.5% Accuracy"
        delay={0}
        className="absolute -left-4 top-1/3 hidden lg:block animate-float"
      />
      <HolographicCard
        icon={<TrendingUp className="w-4 h-4" />}
        label="Growth"
        value="+147%"
        delay={500}
        className="absolute -right-4 top-1/4 hidden lg:block animate-float"
      />
    </div>
  );
});

DashboardIllustration.displayName = 'DashboardIllustration';

// Metric Card Component
const DashboardMetric: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}> = memo(({ icon, label, value, change, positive }) => (
  <div className="glass rounded-lg p-3">
    <div className="flex items-center gap-1.5 mb-1.5 text-neutral-400">
      <span className="w-4 h-4">{icon}</span>
      <span className="text-xs">{label}</span>
    </div>
    <div className="text-lg font-semibold text-neutral-200">{value}</div>
    <div className={`text-xs ${positive ? 'text-success-500' : 'text-error-500'}`}>
      {change}
    </div>
  </div>
));

DashboardMetric.displayName = 'DashboardMetric';

// Workflow Node Component
const WorkflowNode: React.FC<{
  label: string;
  status: 'active' | 'processing' | 'pending';
}> = memo(({ label, status }) => {
  const statusStyles = {
    active: 'bg-primary-500 shadow-glow',
    processing: 'bg-primary-600 animate-pulse',
    pending: 'bg-neutral-600',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-lg ${statusStyles[status]} flex items-center justify-center`}>
        <div className="w-3 h-3 bg-white rounded-sm" />
      </div>
      <span className="text-xs text-neutral-500">{label}</span>
    </div>
  );
});

WorkflowNode.displayName = 'WorkflowNode';

// Workflow Connector Component
const WorkflowConnector: React.FC = memo(() => (
  <div className="flex-1 h-px bg-gradient-to-r from-primary-500/50 to-primary-600/50 relative mx-1">
    <div
      className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 animate-shimmer"
      style={{ backgroundSize: '200% 100%' }}
    />
  </div>
));

WorkflowConnector.displayName = 'WorkflowConnector';

export { Hero };
