"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The design's pill button.
 *
 * Static geometry lives in `.btn-pill` in globals.css next to the measurements
 * that produced it. The short version: a white pill inside a 6px blue-70/10
 * halo, with a black 72px disc parked beyond the pill's inline-end edge and
 * rotated 180deg, which slides in and un-rotates on hover while the pill widens
 * by 51px to receive it.
 *
 * Two things about the reference that this file exists to get right.
 *
 * No colour changes on hover. An earlier version inverted the whole button to
 * white-on-black; the reference renders identical colours in both states and
 * the entire interaction is the disc's travel.
 *
 * The motion is a spring, not an ease — and the reference agrees structurally:
 * its own transition-duration computes to 0s, so it is animating in JS too.
 * Sampled with an in-page rAF loop (sampling over the debugger adds tens of ms
 * and flatters whichever side you measure second), the disc's rotation runs
 *   t ms      0    30    60    90   120   200   300   500
 *   ref    .033  .236  .348  .534  .678  .851  .946  .993
 *   here   .029  .198  .393  .492  .647  .869  .963  .998
 * which is a critically damped spring at w ~ 16.4 rad/s, i.e. stiffness = w^2
 * and damping = 2w at mass 1. Worst-case divergence is ~0.04, most points
 * within 0.02.
 *
 * It is animated here rather than in CSS because the equivalent `linear()`
 * curve is silently dropped from the built stylesheet by Lightning CSS, which
 * leaves a plain bezier in force and no warning that it happened.
 */

const SPRING = { type: "spring", stiffness: 269, damping: 33, mass: 1 };

// `motion.create` rather than the deprecated `motion(Link)`, and rather than
// `legacyBehavior` — both are removal candidates and neither is needed here.
const MotionLink = motion.create(Link);

// The disc's resting offset: 78px beyond the pill's inline-end edge, per the
// node (`inset-inline-end: -78px`) and confirmed on the reference.
const OUT = 78;

export default function Button({
  href,
  children,
  icon = "arrow-down",
  external = false,
  className = "",
}) {
  const reduce = useReducedMotion();
  // Transforms have no logical-property equivalent, so the travel direction has
  // to be flipped by hand on an RTL page. Reading it after mount is safe: at
  // rest the disc is outside the pill either way, and the outer `overflow:
  // hidden` clips both edges, so a first paint that guesses LTR shows nothing
  // different.
  const [rtl, setRtl] = useState(false);
  useEffect(() => {
    setRtl(document.documentElement.dir === "rtl");
  }, []);

  const out = rtl ? -OUT : OUT;
  const variants = {
    rest: { icon: { x: out, rotate: 180 }, pad: { paddingInlineEnd: 48 } },
    hover: { icon: { x: 0, rotate: 0 }, pad: { paddingInlineEnd: 99 } },
  };

  const inner = (
    <motion.span
      className="btn-pill-inner"
      variants={{ rest: variants.rest.pad, hover: variants.hover.pad }}
      transition={reduce ? { duration: 0 } : SPRING}
    >
      <span className="btn-pill-label">{children}</span>
      <motion.span
        className="btn-pill-icon"
        variants={{ rest: variants.rest.icon, hover: variants.hover.icon }}
        transition={reduce ? { duration: 0 } : SPRING}
        aria-hidden="true"
      >
        <Icon name={icon} />
      </motion.span>
    </motion.span>
  );

  // `initial`/`animate` both name "rest" so the variant is the resting state
  // rather than an entrance; whileHover and whileFocus drive the change, and
  // naming both keeps keyboard focus and pointer hover on the same animation.
  const common = {
    className: `btn-pill ${className}`.trim(),
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
    whileFocus: "hover",
  };

  if (external) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...common}>
        {inner}
      </motion.a>
    );
  }
  return (
    <MotionLink href={href} {...common}>
      {inner}
    </MotionLink>
  );
}

function Icon({ name }) {
  // 36px to match the Phosphor instance inside the disc — the old 22px left the
  // disc looking empty next to the reference.
  const common = {
    width: 36,
    height: 36,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "cv") {
    return (
      <svg {...common}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }
  // The hero and section CTAs all point further down the page.
  return (
    <svg {...common}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}
