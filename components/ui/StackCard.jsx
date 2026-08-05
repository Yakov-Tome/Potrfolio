"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The Framer "Stack Card": a 48px-radius tinted shell around a white 24px card,
 * a logo face and a description face. Read from the component definition —
 *   shell   r48 · pad 24 · rgba(102,112,255,.05)
 *   inner   r24 · pad 24 · white · 1fr x 1fr, centred
 *   logo    120x120, then the name at Heading 3, stacked with a 12px gap
 *   hint    "Tap to flip" at 36px from the bottom, Span 14/500 gray-30 —
 *           HIDDEN on the Desktop variant, visible on Mobile
 *
 * The turn is on the X axis. At rest the reference's description face computes
 * to matrix3d(1,0,0,0, 0,-1,0,0, 0,0,-1,0.002, 0,0,0,1) with backface-visibility
 * hidden — m22 = m33 = -1 is rotateX(180deg), and m34 = 0.002 is a 500px
 * perspective on the element itself. It was rebuilt here as a rotateY, which
 * also needed an RTL special case; on the X axis that disappears.
 *
 * Kept as a click on a real <button>: neither hover nor click flips the card on
 * the published build at 1440 (both were tried, and both did nothing), so the
 * description face is simply unreachable there. An affordance that works with a
 * keyboard is worth more than reproducing that.
 */
export default function StackCard({ skill, description, flipLabel, flipBackLabel }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      className="flip w-full cursor-pointer border-0 bg-transparent p-0 text-start"
      data-flipped={flipped}
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={skill.name}
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <span className="flip-inner block">
        <span className="flip-face front tint-card block">
          <span className="inner flex flex-col items-center justify-center gap-3">
            <Image src={skill.logo} alt="" width={120} height={120} className="h-[120px] w-[120px] object-contain" />
            <span className="t-h3 font-medium text-black">{skill.name}</span>
            <span className="t-span absolute bottom-9">{flipLabel}</span>
          </span>
        </span>

        <span className="flip-face back tint-card block">
          <span className="inner flex flex-col items-center justify-center gap-3 text-center">
            <span className="t-h3 font-medium text-black">{skill.name}</span>
            <span className="t-body-small">{description}</span>
            <span className="t-span absolute bottom-9">{flipBackLabel}</span>
          </span>
        </span>
      </span>
    </motion.button>
  );
}
