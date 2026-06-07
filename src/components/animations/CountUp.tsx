'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ target, suffix = '', duration = 1500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current || !ref.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const el = ref.current;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = value.toString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    }

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}
