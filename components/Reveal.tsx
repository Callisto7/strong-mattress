'use client';

import { motion, useReducedMotion } from 'motion/react';

type RevealProps = {
  children: React.ReactNode;
  /** Vertical offset to animate from, px */
  y?: number;
  /** Delay before the animation starts, seconds */
  delay?: number;
  /** Make the wrapper fill height (useful inside equal-height grids) */
  fill?: boolean;
  className?: string;
};

export function Reveal({
  children,
  y = 28,
  delay = 0,
  fill = false,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={fill ? { height: '100%' } : undefined}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
