'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLenis } from '@/hooks/useLenis';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useLenis();
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Custom cursor
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    dot.style.display = 'block';
    ringEl.style.display = 'block';

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const onEnterInteractive = () => {
      ringEl.style.width = '56px';
      ringEl.style.height = '56px';
      ringEl.style.borderColor = '#C9A84C';
      ringEl.style.opacity = '0.8';
    };

    const onLeaveInteractive = () => {
      ringEl.style.width = '32px';
      ringEl.style.height = '32px';
      ringEl.style.borderColor = '#0C4F6A';
      ringEl.style.opacity = '0.5';
    };

    const interactiveEls = document.querySelectorAll('a, button, [role="button"]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    let rafId: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      const size = parseInt(ringEl.style.width || '32');
      ringEl.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-[#C9A84C] z-[9999]"
      />

      {/* Custom cursor elements */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="hidden fixed top-0 left-0 w-2 h-2 bg-[#0C4F6A] rounded-full pointer-events-none z-[9998]"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{ transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.25s ease' }}
        className="hidden fixed top-0 left-0 w-8 h-8 border-2 border-[#0C4F6A] rounded-full pointer-events-none z-[9997] opacity-50"
      />

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
