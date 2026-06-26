import { useState, useEffect } from 'react';

interface ViewportInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
}

export function useViewport(): ViewportInfo {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    breakpoint: 'desktop',
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      let breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (isMobile) breakpoint = 'mobile';
      else if (isTablet) breakpoint = 'tablet';

      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        breakpoint,
      });
    };

    updateViewport();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateViewport, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return viewport;
}
