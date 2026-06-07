'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function KineticText({
  text,
  className,
  delay = 0,
  as: Tag = 'h1',
}: KineticTextProps) {
  const words = text.split(' ');

  return (
    <Tag className={cn('flex flex-wrap gap-x-[0.3em]', className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
