"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import ProfilePhoto from "@/components/ui/ProfilePhoto";

/**
 * Hero, laid out from the Framer "Top Section" and moving the way the published
 * template actually moves.
 *
 * Layout comes from the nodes: six renders pinned around a 1100x700 stage —
 *   orange pyramid  t:0   l:80  rot 10      purple sphere   l:0   cy:50%  z2
 *   blue cylinder   b:0   l:80  rot -55     turquoise star  t:0   r:80    z2
 *   green element   r:0   cy:50%            yellow cube     r:80  b:0     z2
 * On Phone each halves to 140px and regroups, and the ticker is hidden.
 *
 * Motion comes from measuring cohesion.framer.ai, because Framer's plugin API
 * exposes no effect parameters at all — the Scroll Section frames carry none,
 * and there is no image export to fall back on. The numbers below were read off
 * the running reference (see /root/measure), sampling each render's bounding-box
 * CENTRE rather than its top: a box shrinking from 280 to 224 moves its own top
 * down 28px without having moved, so top-derived rates are wrong by that much.
 *
 * Three things came out of that, and the third is the one this file used to miss.
 *
 * 1. The hero is NOT pinned. Its heading tracks scroll exactly 1:1 (306 → 206 →
 *    106 → 6 → -94 per 100px), so the 200vh "Hero Scroll Section" in the Framer
 *    tree is an absolutely-positioned overflow clip, not a scroll track. The
 *    section stays one viewport tall.
 *
 * 2. Parallax is linear, with the rate set by the render's vertical band —
 *    0.40 top, 0.50 middle, 0.60 bottom. Extra rise beyond 1:1 scroll, measured:
 *      scroll  150  300  450  600  750  900 1050 1200
 *      0.40 →   66  130  184  238  304  370  426  480
 *      0.50 →   74  142  221  303  371  442  524  600
 *      0.60 →   96  190  274  358  454  550  636  720
 *    Dead straight, so no easing is applied to the parallax itself.
 *
 * 3. The renders ENTER. They mount at scale 0.8 and grow to 1.0 over ~600ms,
 *    all six together with no stagger and no fade — opacity is 1 in the very
 *    first frame sampled. Scrolling then takes them back down to 0.8, where
 *    they stay. 0.8 is both the entry state and the parked state, which is why
 *    the entrance and the scroll shrink compose so cleanly.
 */

// rate: parallax, as a fraction of scroll distance (measured, see above).
// shrinkAt: scroll depth in px by which the scroll-linked shrink to 0.8 has
// finished. The reference completes the top band earlier than the rest — those
// renders leave the viewport first — so this is per-band, not global.
const ELEMENTS = [
  { src: "/3d/orange-pyramid.png", rate: 0.4, shrinkAt: 300, rotate: 10, z: 1, mobile: "top-5 end-0", desktop: "md:top-0 md:start-20 md:end-auto" },
  { src: "/3d/purple-sphere.png", rate: 0.5, shrinkAt: 450, rotate: 0, z: 2, mobile: "-top-5 start-1/2 -translate-x-1/2", desktop: "md:top-1/2 md:-translate-y-1/2 md:start-0 md:translate-x-0" },
  { src: "/3d/blue-cylinder.png", rate: 0.6, shrinkAt: 450, rotate: -55, z: 1, mobile: "top-5 start-0", desktop: "md:top-auto md:bottom-0 md:start-20" },
  { src: "/3d/turquoise-star.png", rate: 0.4, shrinkAt: 300, rotate: 0, z: 2, mobile: "-bottom-5 end-0", desktop: "md:bottom-auto md:top-0 md:end-20" },
  { src: "/3d/lime-green.png", rate: 0.5, shrinkAt: 450, rotate: 0, z: 1, mobile: "-bottom-15 start-1/2 -translate-x-1/2", desktop: "md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:end-0 md:start-auto md:translate-x-0" },
  { src: "/3d/yellow-cube.png", rate: 0.6, shrinkAt: 450, rotate: 0, z: 2, mobile: "-bottom-5 start-0", desktop: "md:bottom-0 md:end-20 md:start-auto" },
];

export default function Hero({ t }) {
  const reduce = useReducedMotion();
  // The renders want raw scroll pixels, because that is the unit their rates
  // were measured in. Nothing else in this section is scroll-linked.
  const { scrollY } = useScroll();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="decor absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden="true">
        <Ticker text={t.hero.ticker} />
      </div>

      <div className="decor absolute inset-0 md:inset-auto md:h-[700px] md:w-[1100px]" aria-hidden="true">
        {ELEMENTS.map((el) => (
          <Decor key={el.src} el={el} scrollY={scrollY} reduce={reduce} />
        ))}
      </div>

      <Profile t={t} />
    </section>
  );
}

function Decor({ el, scrollY, reduce }) {
  // Raw scroll pixels, not a 0..1 section progress: every measured rate is a
  // fraction of scroll DISTANCE, so expressing it in pixels is the measurement
  // written down directly, and it stays correct at any viewport height.
  const y = useTransform(scrollY, (v) => -el.rate * v);
  const shrink = useTransform(scrollY, [0, el.shrinkAt], [1, 0.8], { clamp: true });

  // Two scales, deliberately nested rather than combined. The entrance runs
  // 0.8 → 1.0 on the outer element and the scroll shrink runs 1.0 → 0.8 on the
  // inner one, so the product is 0.8 at first paint, 1.0 once settled and 0.8
  // again once scrolled past — which is exactly the three values measured off
  // the reference. Collapsing them into one value cannot express that, and a
  // `style` MotionValue would silently win over an `animate` prop anyway.
  return (
    <motion.div
      className={`absolute h-[140px] w-[140px] md:h-[280px] md:w-[280px] ${el.mobile} ${el.desktop}`}
      style={{ zIndex: el.z }}
      initial={reduce ? false : { scale: 0.8 }}
      animate={{ scale: 1 }}
      // ~600ms measured, all six together — the reference shows no stagger and
      // no fade, opacity is already 1 in the first frame sampled. The 540ms the
      // reference waits before starting is its hydration point, not an authored
      // delay, so it is not copied; a short beat is enough to read as intentional.
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        // `relative` is load-bearing: next/image with `fill` positions itself
        // against the nearest positioned ancestor, and the entrance wrapper
        // above is the one that used to provide it.
        className="relative h-full w-full"
        style={{ rotate: el.rotate, ...(reduce ? {} : { y, scale: shrink }) }}
      >
        <Image src={el.src} alt="" fill sizes="(max-width: 810px) 140px, 280px" className="object-contain" priority />
      </motion.div>
    </motion.div>
  );
}

/**
 * The profile column does not animate. Not on load, and not on scroll.
 *
 * Sampled from before the document existed, the reference's heading, skills,
 * photo and button are all at full size and opacity 1 in the first frame that
 * has them (152ms) and never move again. Sampled against scroll, the photo runs
 * 310 → 210 → 110 → 10 → -140 → -290 → -440 as the page goes 0 → 750, i.e.
 * exactly 1:1, at a constant 280x280 and opacity 1. So the fade-up heading, the
 * staggered chips and the recede-on-scroll here were all invented; only the six
 * 3D renders enter, and only they parallax. Taking the invented motion out is
 * what makes the six that remain read as deliberate.
 *
 * The spacing is the design's, and it is tighter than a uniform gap: from the
 * node offsets and confirmed on the running page at 1440 —
 *   heading 196→254 · skills 266→298 · photo 310→590 · button 674
 * so 12px, 12px, then 24px. (The reference fills that last 24 with a "80+ Happy
 * Clients" row and puts another 24 below it; with no such row the button simply
 * takes the 24.)
 */
function Profile({ t }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
      <h1 className="t-h1">{t.hero.greeting}</h1>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {[t.hero.role, ...t.hero.skillsTicker].map((s, i) => (
          <span
            key={s}
            className={`t-span rounded-full px-3 py-1.5 ${
              i === 0 ? "bg-blue-70/10 text-blue-70" : "bg-gray-95 text-gray-30"
            }`}
          >
            {s}
          </span>
        ))}
      </div>

      <ProfilePhoto alt={t.hero.greeting} ringText={t.hero.photoRing} />

      {/* 12px of column gap plus 12px here = the measured 24. */}
      <div className="mt-3">
        <span className="hidden md:inline-block">
          <Button href="#contact">{t.hero.cta}</Button>
        </span>
        <span className="inline-block md:hidden">
          <Button href="#contact">{t.hero.ctaMobile}</Button>
        </span>
      </div>
    </div>
  );
}

// The marquee runs on its own clock and on nothing else — the hero travels 1:1
// with the scroll, so the extra scroll-linked drift this used to carry was a
// second motion the reference does not have.
//
// 240px/900 to match the node: the "Hero Ticker" is 288px tall and bleeds past
// the page gutter (r:-24px l:-24px), which is why it sits outside .shell.
function Ticker({ text }) {
  const run = Array.from({ length: 6 }, () => text).join("");

  return (
    <div className="relative flex w-full overflow-hidden">
      <div className="ticker-track flex shrink-0 whitespace-nowrap">
        <span className="px-2 text-[180px] font-bold leading-none text-gray-95">{run}</span>
        <span className="px-2 text-[180px] font-bold leading-none text-gray-95">{run}</span>
      </div>
      <style>{`
        .ticker-track { animation: ticker 40s linear infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      `}</style>
    </div>
  );
}
