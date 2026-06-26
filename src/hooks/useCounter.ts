import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCounterReturn {
  count: number;
  start: () => void;
  reset: () => void;
  isAnimating: boolean;
}

export function useCounter(
  end: number,
  duration: number = 2000,
  startOnMount: boolean = true
): UseCounterReturn {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentCount = Math.floor(easeOut * end);

    setCount(currentCount);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end);
      setIsAnimating(false);
    }
  }, [end, duration]);

  const start = useCallback(() => {
    if (isAnimating) return;

    startTimeRef.current = null;
    setIsAnimating(true);
    animationRef.current = requestAnimationFrame(animate);
  }, [animate, isAnimating]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = null;
    setCount(0);
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    if (startOnMount) {
      start();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startOnMount, start]);

  return { count, start, reset, isAnimating };
}

// Hook for decimal counters
export function useDecimalCounter(
  end: number,
  decimals: number = 1,
  duration: number = 2000
): UseCounterReturn {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentCount = Number((easeOut * end).toFixed(decimals));

    setCount(currentCount);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end);
      setIsAnimating(false);
    }
  }, [end, decimals, duration]);

  const start = useCallback(() => {
    if (isAnimating) return;
    startTimeRef.current = null;
    setIsAnimating(true);
    animationRef.current = requestAnimationFrame(animate);
  }, [animate, isAnimating]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = null;
    setCount(0);
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [start]);

  return { count, start, reset, isAnimating };
}
