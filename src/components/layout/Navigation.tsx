import { memo, useState, useEffect, useCallback } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '../ui';
import { NAV_LINKS } from '../../constants';
import { useScrollPosition, useScrollToSection } from '../../hooks';

const Navigation = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY, isAtTop } = useScrollPosition();
  const scrollToSection = useScrollToSection();

  // Determine if navbar should have background
  const hasScrolled = !isAtTop && scrollY > 20;

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((href: string) => {
    const id = href.replace('#', '');
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  }, [scrollToSection]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-smooth
        ${hasScrolled ? 'glass py-3 shadow-glass' : 'py-4'}
      `}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            aria-label="Nexus AI - Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <Zap className="w-6 h-6 text-white" aria-hidden="true" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400/50 to-secondary-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold gradient-text">Nexus AI</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200 rounded-lg hover:bg-white/[0.05]"
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.05] transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden fixed inset-x-0 top-[60px] bottom-0 z-40
          transition-all duration-300 ease-smooth
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
        role="menu"
        aria-label="Mobile navigation"
      >
        <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-xl">
          <nav className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-3 text-lg text-neutral-300 hover:text-neutral-100 transition-colors duration-200 rounded-lg hover:bg-white/[0.05]"
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-white/[0.1] my-4" />
            <div className="flex flex-col gap-3 px-4">
              <Button variant="secondary" className="w-full">
                Sign In
              </Button>
              <Button variant="primary" className="w-full">
                Start Free Trial
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
});

Navigation.displayName = 'Navigation';

export { Navigation };
