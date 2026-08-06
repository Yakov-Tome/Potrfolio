"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The hero portrait, which is a card that turns over when you point at it.
 *
 * The Framer component "Profile Photo" carries a `gesture: "hover"` variant, so
 * the interaction is authored in the design — but the plugin API exposes only
 * the variant's end state, and the difference between the two variants is just
 * the back face's fill (white -> rgba(255,255,255,0.85)). The turn itself is an
 * effect, which the API does not expose at all, so it was measured on the
 * running reference:
 *
 *   front  rotateY   10deg  ->  -180deg
 *   back   rotateY  -180deg ->   -10deg     settling by ~800ms
 *
 * Note the resting 10deg: the card never sits flat. That is also why it catches
 * the light differently from a plain round photo, which is what this replaced.
 *
 * Everything else comes from the node tree:
 *   card        280x280 · r48px
 *   front       fill rgb(102,112,255) · portrait h420 clipped to the box
 *   back        fill white · two 1px black outlined circles, 165px and 96px
 *               · a thin ArrowDown 48x60 at top 104px
 *               · an Arc of text, `rotate:true animateDuration:20`
 */
export default function ProfilePhoto({ alt, ringText }) {
  const reduce = useReducedMotion();

  // 800ms measured. A spring would overshoot a half-turn in a way the reference
  // does not, so this is a plain ease.
  const turn = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.div
      className="profile-card"
      initial="rest"
      animate="rest"
      whileHover={reduce ? undefined : "flip"}
      whileFocus={reduce ? undefined : "flip"}
      tabIndex={0}
      aria-label={alt}
    >
      <motion.div
        className="profile-face profile-front"
        variants={{ rest: { rotateY: 10 }, flip: { rotateY: -180 } }}
        transition={turn}
      >
        {/* The node authors its portrait 420px tall inside a 280px frame and
            top-aligns it, because its source is a 2:3 photo and that framing
            keeps the face in the square. This source is 1:1, so the same trick
            would blow it up to 420 and crop everything below the eyes — a
            square image wants the square box. Rendered at 560 for 2x. */}
        <Image
          src="/profile.png"
          alt={alt}
          width={560}
          height={560}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      <motion.div
        className="profile-face profile-back"
        variants={{ rest: { rotateY: -180 }, flip: { rotateY: -10 } }}
        transition={turn}
        aria-hidden="true"
      >
        <span className="profile-circle profile-circle-big" />
        <span className="profile-circle profile-circle-small" />

        <svg className="profile-ring" viewBox="0 0 140 140">
          <defs>
            {/* r=56 puts the baseline between the two circles. */}
            <path id="profile-ring-path" fill="none" d="M70,14 a56,56 0 1,1 -0.1,0" />
          </defs>
          <text>
            <textPath href="#profile-ring-path" startOffset="0">
              {ringText}
            </textPath>
          </text>
        </svg>

        <svg className="profile-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v16M6 14l6 6 6-6" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
