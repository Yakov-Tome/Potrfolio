"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The entrance every card on the published template uses, and it is one move:
 * scale 0.8 -> 1.0. No travel, no rotation, and a fade only where the design
 * fades.
 *
 * Measured on cohesion.framer.ai by parking a card below the trigger, jumping
 * the scroll past it and sampling every frame in-page. A project card, 612px at
 * rest, runs:
 *   t(ms)    11    52    96   130   161   196   230   262   330   396   465
 *   scale  .800  .807  .870  .926  .966  .990 1.002 1.006 1.004 1.001 1.000
 * so it reaches size at ~230ms, overshoots 0.6% at ~262ms and settles by
 * ~465ms. That is a spring, not an ease: overshoot 0.006 gives a damping ratio
 * of 0.85, and a first peak 251ms after the start gives wn ~= 23.9 rad/s —
 * hence stiffness 570, damping 41 at mass 1. A pricing card runs the identical
 * curve with opacity pinned at 1, which is what `fade` selects between.
 *
 * The trigger is plain viewport entry: at 1440x900 the card was untouched with
 * its top at 956 and already animating at 820, so it fires as the top crosses
 * the fold, with no margin.
 *
 * This used to be `opacity 0, y 24, rotate 0.33, x 4` over 800ms — read off a
 * single frame caught near the END of the real animation, where all that is
 * left is the settling tail. The 0.8 that carries the whole effect happens
 * before that frame, and 0.8 is the same number the hero renders enter on: it
 * is the template's one entrance, used everywhere.
 */

// One spring, exported so the scroll-linked and hover motions can borrow it.
export const APPEAR_SPRING = { type: "spring", stiffness: 570, damping: 41, mass: 1 };

export default function Reveal({ children, delay = 0, fade = false, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <MotionTag
      className={className}
      initial={{ scale: 0.8, ...(fade ? { opacity: 0 } : null) }}
      whileInView={{ scale: 1, ...(fade ? { opacity: 1 } : null) }}
      // `once` so a card never replays on the way back up, and no viewport
      // margin: the reference fires the moment the top crosses the fold.
      viewport={{ once: true, amount: "some" }}
      transition={{ ...APPEAR_SPRING, delay }}
    >
      {children}
    </MotionTag>
  );
}
