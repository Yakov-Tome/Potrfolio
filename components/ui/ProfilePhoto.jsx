"use client";

import Image from "next/image";

// The asset name carries a version because the optimizer cache is keyed by URL.
// Replacing profile.png in place left /_next/image?url=%2Fprofile.png&w=... 
// serving the PREVIOUS square crop long after the file on disk was 2:3 — the
// page measured 280x420 for the element and 280x280 for the resource, so the
// square got `cover`-cropped 34px off the top of the head with a black band
// below. Clearing .next/cache/images fixes it once; changing the name fixes it
// for every cache between here and the phone, including the visitor's own.
import { useEffect, useState } from "react";
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

  // Above 1200 the card is a tilted, turnable object; below it, a flat photo
  // and nothing more. That is the component's Desktop/Mobile variant split, and
  // the Framer file puts Mobile on the Tablet frame as well as the Phone one —
  // confirmed on the build, where the tilt is present at 1210 and gone at 1199,
  // and where hovering below 1200 moves neither face.
  const [turnable, setTurnable] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1200px)");
    const sync = () => setTurnable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // 800ms measured. A spring would overshoot a half-turn in a way the reference
  // does not, so this is a plain ease.
  const turn = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

  // The flat state. No back face at all — it is never reachable below 1200, so
  // rendering it would only leave the text ring spinning where nobody can see
  // it. The resting transform comes from the stylesheet, not from here.
  if (!turnable) {
    return (
      <div className="profile-card" aria-label={alt}>
        <div className="profile-face profile-front">
          <Image src="/profile-2.png" alt={alt} width={560} height={840} priority className="profile-photo" />
        </div>
      </div>
    );
  }

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
        {/* 280x420 in a 280x280 clip — the geometry is in .profile-photo, and
            it is the reference's, measured: the img element really is 420 tall
            with `object-fit: cover` and `object-position: 47.9% 24.1%`, and the
            face's overflow eats the bottom third. Served at 2x. */}
        <Image src="/profile-2.png" alt={alt} width={560} height={840} priority className="profile-photo" />
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
