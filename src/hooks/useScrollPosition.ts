import { useState, useEffect, useCallback, RefObject } from 'react';

interface ScrollInfo {
  scrollY: number;
  scrollProgress: number;
  direction: 'up' | 'down' | 'none';
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScrollPosition(): ScrollInfo {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollY: 0,
    scrollProgress: 0,
    direction: 'none',
    isAtTop: true,
    isAtBottom: false,
  });

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;

      const direction = currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : 'none';

      setScrollInfo({
        scrollY: currentScrollY,
        scrollProgress: progress,
        direction,
        isAtTop: currentScrollY < 10,
        isAtBottom: currentScrollY >= maxScroll - 10,
      });

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return scrollInfo;
}

export function useInView(
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px' }
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options.threshold, options.rootMargin]);

  return isInView;
}

export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return scrollToSection;
}
