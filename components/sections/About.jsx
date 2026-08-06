"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { site } from "@/lib/content";

/**
 * About, from the Framer "About Section": a 350vh column in which the heading
 * and the two 3D renders are sticky, and three cards travel up and settle on
 * top of each other — each sticky at t:0 inside its own 100vh slot.
 *
 * The renders are 640px, pinned l:120 / r:120 at centreY on Desktop and
 * dropping to 240px on Phone. They drift against the scroll here for the same
 * reason the hero's do — measured on the published template, the decor never
 * travels at the same rate as the text it sits behind.
 *
 * Each card scales down as the next one covers it, so the stack reads as depth
 * rather than as three slides that happen to overlap.
 */
// The half viewport of travel the design leaves after the last card, expressed
// in viewports. Used both for the spacer and for the progress arithmetic.
const ABOUT_TAIL = 0.5;

export default function About({ t }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const cubeY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const pyramidY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const pyramidRotate = useTransform(scrollYProgress, [0, 1], [10, 22]);

  return (
    <section ref={ref} id="about" className="relative rounded-[24px] bg-white">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-start overflow-hidden py-[var(--section-pad)]">
        {/* Placement is PHYSICAL, not logical, and that is the fix the Hebrew
            page needed: the Framer file has no RTL, so its cube is at left 120
            and its pyramid at right 120 in both languages. Using start/end put
            them on opposite sides in Hebrew — the two renders swapped places.
            `left`/`right` here, deliberately, for both.

            Computed insets read off the reference, one row per band:
              phone    cube  top 486 / left 0 / right 0 / bottom 0   -> 358 sq
                       pyramid 240x240, top 96, centred, rot 10
              tablet   cube  top 264 / left 48 / right 48 / bottom -120 -> 756
                       pyramid 240x240, top 240, centred, rot 10
              desktop  cube  640x640, left 120, centreY
                       pyramid 640x640, right 120, centreY, rot 10
            The rebuild ran the desktop placement from 810 up, so the whole
            tablet band had two 640px renders where the design has one wide
            hanging cube and one small centred pyramid. */}
        <Float period={4.8}>
          <motion.div
            aria-hidden="true"
            className="decor absolute inset-x-0 bottom-0 top-[486px] md:inset-x-12 md:bottom-[-120px] md:top-[264px] lg:inset-auto lg:left-30 lg:top-1/2 lg:h-[640px] lg:w-[640px] lg:-translate-y-1/2"
            style={reduce ? {} : { y: cubeY }}
          >
            <Image src="/3d/purple-cube.png" alt="" fill sizes="(max-width: 1199px) 100vw, 640px" className="object-contain" />
          </motion.div>
        </Float>

        <Float period={5.6}>
          <motion.div
            aria-hidden="true"
            className="decor absolute left-1/2 top-24 h-[240px] w-[240px] -translate-x-1/2 md:top-60 lg:inset-auto lg:left-auto lg:right-30 lg:top-1/2 lg:h-[640px] lg:w-[640px] lg:translate-x-0 lg:-translate-y-1/2"
            style={reduce ? { rotate: 10 } : { y: pyramidY, rotate: pyramidRotate }}
          >
            <Image src="/3d/blue-pyramid.png" alt="" fill sizes="(max-width: 1199px) 240px, 640px" className="object-contain" />
          </motion.div>
        </Float>

        <div className="shell relative z-10">
          <h2 className="t-h2 section-title">{t.about.title}</h2>
        </div>
      </div>

      {/* Pulled back over the sticky backdrop rather than positioned absolutely:
          an absolute stack contributes no height, so the section would need a
          matching spacer and the two could drift apart. */}
      <div className="-mt-[100svh]">
        {t.about.cards.map((text, i) => (
          <AboutCard
            key={i}
            text={text}
            index={i}
            count={t.about.cards.length}
            progress={scrollYProgress}
            last={i === t.about.cards.length - 1}
            cvLabel={t.about.cv}
            reduce={reduce}
          />
        ))}
        {/* The tail. The Framer About Section is 350vh with three 100vh cards,
            not 300vh — measured on the build at every width, the section is
            exactly 3.5 viewports (3150 at 900, 2954 at 844). The extra half
            viewport is what lets the last card sit still and be read before
            the next section arrives; without it the stack ends the instant the
            third card lands. */}
        <div className="h-[50svh]" aria-hidden="true" />
      </div>
    </section>
  );
}

/**
 * The renders never stop moving. Measured on the reference with the page held
 * still, the purple cube's centre runs 463 -> 474 -> 450 -> 473 and the blue
 * pyramid does the same on its own clock: about +/-12px, ~4.8s and ~5.6s, and
 * deliberately out of phase so the two never bob together.
 *
 * This wraps rather than merges because the render already carries a
 * scroll-linked `y`. One element cannot hold both a MotionValue and a repeating
 * keyframe on the same axis, so the float owns the wrapper and the parallax
 * owns the child, and the transforms compose.
 *
 * An earlier pass saw this drift in the data and wrote it off as measurement
 * noise. It is the effect.
 */
function Float({ period, children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return (
    <motion.div
      // Absolute and inset-0 so the wrapper occupies exactly the box its child
      // was already positioning against, and contributes nothing to the flex
      // column it sits in.
      className="pointer-events-none absolute inset-0"
      animate={{ y: [0, -12, 0, 12, 0] }}
      transition={{ duration: period, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AboutCard({ text, index, count, progress, last, cvLabel, reduce }) {
  // A sticky element is pinned at the viewport top for as long as it is stuck,
  // so useScroll against the card itself reports 0 forever. The section's own
  // progress is the only thing that actually advances, and each card's covered
  // range is a fixed slice of it.
  //
  // With n cards and a half-viewport tail the section is (n + 0.5) viewports,
  // so the scrollable range is (n - 0.5) of them and one card's slot is
  // 1/(n - 0.5) of the progress — 0.4 for three cards, not the 0.5 this used
  // to assume. Getting it wrong made every card finish shrinking a fifth of a
  // viewport before the next one actually landed on it.
  const span = 1 / Math.max(1, count - 1 + ABOUT_TAIL);
  const from = index * span;
  const to = Math.min(1, (index + 1) * span);

  // Scale only. Driving opacity from scroll as well would fight the entrance
  // animation for the same value — and on the published template the cards
  // never fade: measured, their opacity stays 1 the whole way down. Depth here
  // comes from the card shrinking as the next one lands on it, nothing else.
  const scale = useTransform(progress, [from, to], [1, last ? 1 : 0.92], { clamp: true });

  // The cards do not arrive square, and the ramp is a straight line — measured
  // against how far the scroll still is from the card's own document top, not
  // against where the card has got to on screen (the card stops moving once it
  // sticks, but the straightening carries on):
  //   offset  900   700   500   380   300   220   140    60
  //   degrees 1.96  1.67  1.23  0.96  0.78  0.60  0.42  0.25
  // Those last five are dead linear at 0.0022 deg/px, and 0.0022 is 2/900 —
  // one viewport. So: 2deg while the card is a full viewport away, falling
  // linearly to 0 as the scroll reaches it, clamped at both ends. Confirmed at
  // 390 too, where the slope is 2/844 rather than 2/900.
  //
  // The sign alternates card to card (+2, -2, +2), which is why the stack reads
  // as hand-placed rather than as a column of identical slabs.
  //
  // This was a five-stop curve fitted to card-top positions, which reached 0 at
  // 78% of the approach and so held a visible tilt in the wrong places. A
  // straight line is both the measurement and the simpler thing.
  const cardRef = useRef(null);
  const { scrollYProgress: approach } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const sign = index % 2 === 0 ? 1 : -1;
  const tilt = useTransform(approach, [0, 1], [2 * sign, 0], { clamp: true });

  return (
    // No side padding: the design's "About Card-01" slot has none and the card
    // inside it is `w:1fr maxW:900`, so it spans the section. With the gutter now
    // on main, keeping it here too indented the card twice — 28px instead of the
    // reference's 14 at 390.
    <div ref={cardRef} className="sticky top-0 flex h-[100svh] items-center justify-center">
      <motion.div
        className="tint-card roomy w-full max-w-[900px]"
        style={reduce ? {} : { scale, rotate: tilt }}
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inner flex flex-col items-center justify-center gap-6 text-center">
          <p className="t-body-big">{text}</p>
          {last && (
            <Button href={site.cv} icon="cv" external>
              {cvLabel}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
