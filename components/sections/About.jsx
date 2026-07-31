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
        <Float period={4.8}>
          <motion.div
            aria-hidden="true"
            className="decor absolute bottom-0 start-0 end-0 mx-auto h-[240px] w-[240px] md:inset-auto md:start-30 md:top-1/2 md:h-[640px] md:w-[640px] md:-translate-y-1/2"
            style={reduce ? {} : { y: cubeY }}
          >
            <Image src="/3d/purple-cube.png" alt="" fill sizes="(max-width: 810px) 240px, 640px" className="object-contain" />
          </motion.div>
        </Float>

        <Float period={5.6}>
          <motion.div
            aria-hidden="true"
            className="decor absolute top-24 start-1/2 h-[240px] w-[240px] -translate-x-1/2 md:inset-auto md:end-30 md:top-1/2 md:h-[640px] md:w-[640px] md:translate-x-0 md:-translate-y-1/2"
            style={reduce ? { rotate: 10 } : { y: pyramidY, rotate: pyramidRotate }}
          >
            <Image src="/3d/blue-pyramid.png" alt="" fill sizes="(max-width: 810px) 240px, 640px" className="object-contain" />
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
  // range is a fixed slice of it: with n cards over n viewports, card i is
  // covered between i/(n-1) and (i+1)/(n-1). The last card is never covered.
  const span = 1 / Math.max(1, count - 1);
  const from = index * span;
  const to = Math.min(1, (index + 1) * span);

  // Scale only. Driving opacity from scroll as well would fight the entrance
  // animation for the same value — and on the published template the cards
  // never fade: measured, their opacity stays 1 the whole way down. Depth here
  // comes from the card shrinking as the next one lands on it, nothing else.
  const scale = useTransform(progress, [from, to], [1, last ? 1 : 0.92], { clamp: true });

  // The cards do not arrive square. Measured against the card's own distance
  // from the viewport top, the reference holds a full tilt while the card is
  // still below the fold and straightens only as it lands:
  //   card top   1014   714   411   308   settled
  //   rotation   2.00  1.89  1.23  0.56      0
  // and the sign alternates card to card (+2, -2, +2), so the stack reads as
  // hand-placed rather than as a column of identical slabs. The stops below are
  // those measurements interpolated, not a curve chosen to look similar — the
  // fall-off is far too late and too sharp for any simple easing to reproduce.
  //
  // It is driven by scroll, not by a timed entrance: this used to be a 0.33deg
  // rotation animated to 0 over 0.8s, which is both a sixth of the angle and
  // finished before the card is anywhere near its resting place.
  const cardRef = useRef(null);
  const { scrollYProgress: approach } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const sign = index % 2 === 0 ? 1 : -1;
  const tilt = useTransform(approach, [0, 0.21, 0.54, 0.66, 0.78], [2 * sign, 1.89 * sign, 1.23 * sign, 0.56 * sign, 0], {
    clamp: true,
  });

  return (
    <div ref={cardRef} className="sticky top-0 flex h-[100svh] items-center justify-center px-[var(--page-gutter)]">
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
