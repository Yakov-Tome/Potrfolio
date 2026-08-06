"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import StackCard from "@/components/ui/StackCard";
import { APPEAR_SPRING } from "@/components/motion/Reveal";
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
    // `overflow-clip`, not `overflow-hidden`: the render inside is sticky, and
    // `hidden` would make this a scroll container and kill that outright. Clip
    // still keeps the cube inside the section so it cannot ride into Resume.
    <section id="stack" className="section relative overflow-clip">
      <StackRender reduce={reduce} />

      <div className="shell relative z-10 flex flex-col gap-[var(--section-gap)]">
        <h2 className="t-h2 section-title">{t.stack.title}</h2>

        {/* Three bands, and the middle one was missing: 1 column with a 16px gap
            below 810; 2 columns capped at 810 with a 24px gap from 810 to 1199;
            3 columns capped at 1200 with a 24px gap from 1200. Measured on the
            build, the column tracks are 358 / 393 / 384 at 390 / 900 / 1440.

            `relative` because the render is anchored to THIS box: measured in
            document space the cube's top sits at the grid's top +16 on desktop
            and -106 on tablet, and its centre is the grid's centre. It used to
            hang off the section with `start-1/2 -translate-x-1/2`, which is the
            bug behind the cube sliding off the left edge in Hebrew — `start-1/2`
            resolves to `right: 50%` in RTL while `-translate-x-1/2` stays
            physical, so the two compose into a box a full width off-centre. */}
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
 * The render behind the grid: 600px in the 810-1199 band, 720 from 1200, hidden
 * below 810 — the Tablet frame steps it down and the Phone frame turns it off.
 *
 * It is STICKY, and that is the behaviour this section was missing. Tracked
 * through the whole section at 1440x900, the reference's cube moves at -1.00 per
 * pixel of scroll until its top reaches 252, holds there across roughly a
 * thousand pixels of scrolling, and only then resumes -1.00:
 *   scrollY  4210  4540  4870  5200  5529  5859  6189  6518
 *   cube top 1146   816   486   252   252   252   119  -210
 * Ours ran -1.00 the whole way, so the cube was gone before the grid had really
 * started — the user sees the top of it clipped between the first two rows and
 * nothing after.
 *
 * 252 is the top at the 0.8 scale; the box itself is 720 and sticks at 180
 * (180 + 720*0.1 = 252). It is a fixed pixel offset, not a viewport fraction:
 * measured at 700, 900 and 1100 tall the stuck top stays ~195-205 rather than
 * scaling with the viewport.
 *
 * On top of that it drifts. Held completely still with the scroll frozen the
 * cube runs y 180 -> 204 -> 180 at 1440 and 60 -> 84 -> 60 at 900: a +/-12px
 * vertical float on a ~4.3s cycle, never horizontal, never rotating. And it
 * takes the design's usual 0.8 -> 1.0 entrance like every other block.
 *
 * Three transforms, three wrappers, deliberately: sticky cannot live on an
 * element whose transform is being animated, and the float and the entrance
 * cannot share one transform either.
 */
function StackRender({ reduce }) {
  const cube = (
    <Image src="/3d/turquoise-cube.png" alt="" fill sizes="(max-width: 1199px) 600px, 720px" className="object-contain" />
  );

  const box = "absolute left-1/2 top-0 h-full w-[600px] -translate-x-1/2 lg:w-[720px]";

  return (
    <div className="decor pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      {/* The sticky element carries the cube's HEIGHT, and that is what decides
          where it lets go: a sticky box releases when its own bottom reaches the
          bottom of its containing block, so a zero-height one would stay pinned
          720px too long — measured, ours held at 252 all the way to the end of
          the section while the reference had already resumed -1.00. The wrapper
          is absolutely positioned over the section, so this height costs the
          layout nothing. */}
      <div className="sticky top-[180px] h-[600px] lg:h-[720px]">
        {reduce ? (
          <div className={box}>{cube}</div>
        ) : (
          <motion.div
            className={box}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={APPEAR_SPRING}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ y: [0, -12, 0, 12, 0] }}
              transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
            >
              {cube}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
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
