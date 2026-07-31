"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The entrance every block on the published template uses.
 *
 * Measured off cohesion.framer.ai rather than guessed: an About card caught
 * mid-animation sits at matrix(0.999983, 0.00577895, …, 3.98, 3.98) and settles
 * to identity — a ~0.33° rotation and a ~4px offset, easing out. It is a much
 * smaller move than the usual "fade up 40px", and copying that restraint is
 * most of why the original feels expensive rather than busy.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  rotate = 0.33,
  className = "",
  as = "div",
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, rotate, x: 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
