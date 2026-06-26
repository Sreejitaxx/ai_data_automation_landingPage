import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionReturn {
  position: MousePosition;
  normalized: { x: number; y: number };
  relativeToElement: (element: HTMLElement | null) => MousePosition;
}

export function useMousePosition(): UseMousePositionReturn {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const normalized = {
    x: position.x / (typeof window !== 'undefined' ? window.innerWidth : 1),
    y: position.y / (typeof window !== 'undefined' ? window.innerHeight : 1),
  };

  const relativeToElement = useCallback((element: HTMLElement | null): MousePosition => {
    if (!element) return { x: 0, y: 0 };
    const rect = element.getBoundingClientRect();
    return {
      x: position.x - rect.left,
      y: position.y - rect.top,
    };
  }, [position]);

  return { position, normalized, relativeToElement };
}
