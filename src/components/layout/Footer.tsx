import React, { memo } from 'react';
import { Zap, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { Container } from '../ui';
import { FOOTER_SECTIONS, SOCIAL_LINKS } from '../../constants';

const Footer: React.FC = memo(() => {
  return (
    <footer className="relative border-t border-white/[0.05] bg-neutral-950" role="contentinfo">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4" aria-label="Nexus AI - Home">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold gradient-text">Nexus AI</span>
            </a>
            <p className="text-neutral-400 text-sm mb-6 max-w-xs">
              Transform data into intelligence with AI-powered automation.
              Enterprise-grade reliability, startup simplicity.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => (
                <SocialLinkButton key={link.platform} link={link} />
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <FooterLinkColumn key={section.title} section={section} />
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © 2024 Nexus AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
});

Footer.displayName = 'Footer';

// Footer Link Column
const FooterLinkColumn: React.FC<{ section: typeof FOOTER_SECTIONS[0] }> = memo(({ section }) => (
  <div>
    <h3 className="text-sm font-semibold text-neutral-200 mb-4">{section.title}</h3>
    <nav aria-label={`${section.title} links`}>
      <ul className="space-y-3">
        {section.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
));

FooterLinkColumn.displayName = 'FooterLinkColumn';

// Social Link Button
const SocialLinkButton: React.FC<{ link: typeof SOCIAL_LINKS[0] }> = memo(({ link }) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    youtube: Youtube,
  };

  const IconComponent = icons[link.platform] || Twitter;

  return (
    <a
      href={link.href}
      className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition-colors"
      aria-label={link.label}
    >
      <IconComponent className="w-4 h-4" aria-hidden="true" />
    </a>
  );
});

SocialLinkButton.displayName = 'SocialLinkButton';

export { Footer };
