'use client';

import { motion, type TargetAndTransition } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'left' | 'right' | 'fade';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

const variants: Record<Direction, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  up:    { initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  left:  { initial: { x: -40, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  right: { initial: { x: 40, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  fade:  { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
}: RevealOnScrollProps) {
  const { initial, animate } = variants[direction];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
