import { useEffect, useState, useCallback, RefObject } from 'react';

interface UseReducedMotionReturn {
  prefersReducedMotion: boolean;
}

export function useReducedMotion(): UseReducedMotionReturn {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return { prefersReducedMotion };
}

interface UseTiltReturn {
  style: React.CSSProperties;
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: () => void;
}

export function useTilt(
  ref: RefObject<HTMLElement>,
  options: { maxTilt?: number; perspective?: number } = {}
): UseTiltReturn {
  const { maxTilt = 10, perspective = 1000 } = options;

  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: 'transform 300ms ease-out',
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (-mouseY / (rect.height / 2)) * maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
      transition: 'transform 100ms ease-out',
    });
  }, [ref, maxTilt, perspective]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
      transition: 'transform 300ms ease-out',
    });
  }, [perspective]);

  return { style, handleMouseMove, handleMouseLeave };
}
