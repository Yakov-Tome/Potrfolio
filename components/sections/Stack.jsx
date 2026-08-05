"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import StackCard from "@/components/ui/StackCard";
import { skills } from "@/lib/content";
import { skillCopy } from "@/lib/skill-copy";

/**
 * Stack, from the Framer "Stack Section": a 3-column grid capped at 1200px with
 * a 24px gap, over a large render that stays put while the grid passes it. On
 * Phone the grid collapses to one column, the gap tightens to 16px and the
 * render is hidden outright.
 *
 * The cards are the one place in this design where the entrance is CONTINUOUS
 * rather than triggered. Measured on cohesion.framer.ai at 1440x900, a card's
 * rendered width against its own distance from the viewport top:
 *
 *   card top   940+   852    786    720    654    566   460-
 *   scale      0.800  0.840  0.870  0.900  0.930  0.970  1.000
 *
 * which is dead linear between top=940 and top=500 — no easing, and it tracks
 * the scroll both ways rather than firing once. Expressed against the viewport
 * that is 104% down to 56% of its height, which is what the offsets below say.
 * A timed reveal cannot express it: the card would finish long before it lands.
 */
export default function Stack({ t, locale }) {
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="section relative overflow-hidden">
      {/* The render is parked, not animated. It measures 576px in the reference
          against an authored 720 — i.e. it sits at the same 0.8 this design
          parks everything at — and it neither rotates nor drifts at any scroll
          depth. The rotation and vertical drift here before were invented.
          (The Framer node is named "purple-cube"; the published build serves
          the Turquoise Cube. The layer name is stale, the build is the product.) */}
      {/* 600px in the 810-1199 band, 720 from 1200, hidden below 810 — the
          Tablet frame steps this render down and the Phone frame turns it off. */}
      <div
        aria-hidden="true"
        className="decor pointer-events-none absolute start-1/2 top-[180px] hidden h-[600px] w-[600px] -translate-x-1/2 scale-[0.8] md:block lg:h-[720px] lg:w-[720px]"
      >
        <Image src="/3d/turquoise-cube.png" alt="" fill sizes="(max-width: 1199px) 600px, 720px" className="object-contain" />
      </div>

      <div className="shell relative z-10 flex flex-col gap-[var(--section-gap)]">
        <h2 className="t-h2 section-title">{t.stack.title}</h2>

        {/* Three bands, and the middle one was missing: 1 column with a 16px gap
            below 810; 2 columns capped at 810 with a 24px gap from 810 to 1199;
            3 columns capped at 1200 with a 24px gap from 1200. Measured on the
            build, the column tracks are 358 / 393 / 384 at 390 / 900 / 1440. */}
        <div className="cap grid grid-cols-1 gap-4 md:[--cap:810px] md:grid-cols-2 md:gap-6 lg:[--cap:1200px] lg:grid-cols-3">
          {skills.map((skill) => (
            <ScrollScale key={skill.id} reduce={reduce}>
              <StackCard
                skill={skill}
                description={skillCopy[skill.id]?.[locale] ?? ""}
                flipLabel={t.stack.flip}
                flipBackLabel={t.stack.flipBack}
              />
            </ScrollScale>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Scale 0.8 -> 1.0 driven by the wrapper's own position in the viewport.
 *
 * `offset` reads as: progress 0 when this element's top meets the bottom of the
 * viewport, progress 1 when its top reaches 56% of the viewport height. Those
 * are the two ends of the measured ramp. The transform sits on a wrapper rather
 * than on the card so the card keeps its own hover and flip transforms to
 * itself — two animations on one element's transform is a fight, and the flip
 * would win.
 */
function ScrollScale({ children, reduce }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 56%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1], { clamp: true });

  if (reduce) return <div>{children}</div>;
  return (
    <motion.div ref={ref} style={{ scale }}>
      {children}
    </motion.div>
  );
}
