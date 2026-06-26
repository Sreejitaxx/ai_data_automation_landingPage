import type { Feature, Testimonial, FAQItem, StatItem, NavLink, LogoItem, FooterSection, SocialLink } from '../types';

// Navigation links
export const NAV_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

// Logo items for trusted-by section
export const TRUSTED_LOGOS: LogoItem[] = [
  { id: 'acme', name: 'Acme Corp' },
  { id: 'quantum', name: 'Quantum Labs' },
  { id: 'neural', name: 'Neural Systems' },
  { id: 'future', name: 'FutureTech' },
  { id: 'data', name: 'DataFlow' },
  { id: 'cloud', name: 'CloudScale' },
];

// Features for Bento Grid
export const FEATURES: Feature[] = [
  {
    id: 'ai-automation',
    title: 'AI-Powered Automation',
    description: 'Intelligent workflows that learn and adapt to your data patterns, reducing manual work by up to 90%.',
    icon: 'brain',
    gradient: 'from-primary-500 to-primary-600',
    size: 'large',
  },
  {
    id: 'real-time',
    title: 'Real-Time Processing',
    description: 'Process millions of data points in milliseconds with our distributed architecture.',
    icon: 'zap',
    gradient: 'from-primary-600 to-primary-500',
    size: 'medium',
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with end-to-end encryption and granular access controls.',
    icon: 'shield',
    gradient: 'from-accent-500 to-primary-500',
    size: 'medium',
  },
  {
    id: 'integrations',
    title: '500+ Integrations',
    description: 'Connect to any data source or destination with pre-built connectors.',
    icon: 'plug',
    gradient: 'from-primary-500 to-accent-500',
    size: 'small',
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'Visualize insights with customizable dashboards and real-time metrics.',
    icon: 'chart',
    gradient: 'from-secondary-500 to-primary-500',
    size: 'small',
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description: 'Built-in version control, comments, and approval workflows for teams.',
    icon: 'users',
    gradient: 'from-accent-500 to-secondary-500',
    size: 'large',
  },
];

// Statistics
export const STATISTICS: StatItem[] = [
  {
    id: 'users',
    value: 50000,
    suffix: '+',
    label: 'Active Users',
    description: 'Trusted by data professionals worldwide',
  },
  {
    id: 'processed',
    value: 2.5,
    suffix: 'B',
    label: 'Events Processed',
    description: 'Daily event processing capacity',
  },
  {
    id: 'uptime',
    value: 99.99,
    suffix: '%',
    label: 'Uptime SLA',
    description: 'Enterprise-grade reliability',
  },
  {
    id: 'satisfaction',
    value: 4.9,
    suffix: '/5',
    label: 'Customer Rating',
    description: 'Based on 2,500+ reviews',
  },
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'VP of Data Engineering',
    company: 'TechCorp',
    content: 'Nexus AI transformed our data pipeline completely. What used to take weeks now happens in hours. The AI automation is genuinely intelligent, not just marketing fluff.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marcus Johnson',
    role: 'Head of Analytics',
    company: 'DataFlow Inc',
    content: 'The best investment we made this year. The platform scales effortlessly with our growing data needs, and the support team is exceptional.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Priya Patel',
    role: 'CTO',
    company: 'StartupXYZ',
    content: 'Finally, a data platform that understands modern AI workflows. The integrations are seamless and the learning curve is minimal.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'David Kim',
    role: 'Director of Engineering',
    company: 'Enterprise Solutions',
    content: 'Moving from our legacy system to Nexus AI was the smoothest transition we\'ve experienced. The ROI was visible within the first month.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Emma Wilson',
    role: 'Data Scientist Lead',
    company: 'AI Labs',
    content: 'The predictive analytics capabilities are extraordinary. Our models now train in a fraction of the time, and accuracy has improved significantly.',
    rating: 5,
  },
  {
    id: 't6',
    name: 'Alex Rivera',
    role: 'Senior Architect',
    company: 'CloudFirst',
    content: 'Built by engineers who understand what engineers need. Every feature is thoughtfully designed, and the API documentation is impeccable.',
    rating: 5,
  },
];

// FAQ items
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'q1',
    question: 'How does the free trial work?',
    answer: 'Start with a 14-day free trial with full access to all features. No credit card required. At the end of your trial, choose a plan that fits your needs or continue with our free tier offering limited features.',
  },
  {
    id: 'q2',
    question: 'Can I switch plans anytime?',
    answer: 'Absolutely. You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately, and we\'ll prorate any differences based on your billing cycle.',
  },
  {
    id: 'q3',
    question: 'What happens if I exceed my API limit?',
    answer: 'We\'ll notify you at 80% and 100% usage. After reaching your limit, additional requests are $0.001 per call for Starter, and $0.0005 for Growth plans. Enterprise plans have custom overage rates.',
  },
  {
    id: 'q4',
    question: 'Is my data secure?',
    answer: 'Yes. We use AES-256 encryption at rest and TLS 1.3 in transit. We\'re SOC 2 Type II and GDPR compliant. Enterprise plans include additional security features like dedicated encryption keys and on-premise deployment.',
  },
  {
    id: 'q5',
    question: 'What integrations do you support?',
    answer: 'We support 500+ integrations including AWS, GCP, Azure, Snowflake, Databricks, PostgreSQL, MongoDB, Salesforce, Hubspot, and many more. Custom integrations can be built using our SDK.',
  },
  {
    id: 'q6',
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for annual plans. Monthly plans can be cancelled anytime with no further charges. Contact support if you\'re not completely satisfied.',
  },
  {
    id: 'q7',
    question: 'Can I use Nexus AI for commercial projects?',
    answer: 'Yes, all paid plans include commercial usage rights. Enterprise plans include additional features for enterprise deployment such as white-labeling and custom branding options.',
  },
  {
    id: 'q8',
    question: 'How do I get technical support?',
    answer: 'Starter plans include email support with 24-hour response time. Growth plans have priority support with 4-hour response. Enterprise plans include 24/7 dedicated support with 1-hour SLA.',
  },
];

// Footer sections
export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#' },
      { label: 'API Docs', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Webinars', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'GDPR', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
];

// Social links
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'twitter', href: '#', label: 'Twitter' },
  { platform: 'linkedin', href: '#', label: 'LinkedIn' },
  { platform: 'github', href: '#', label: 'GitHub' },
  { platform: 'youtube', href: '#', label: 'YouTube' },
];
