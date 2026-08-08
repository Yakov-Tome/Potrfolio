"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Shape3D from "@/components/ui/Shape3D";
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
//
// The shrink to 0.8 is NOT a ramp, and that is the correction here. Sampled
// every 50px the reference holds a flat 1.00 and then snaps:
//   orange, turquoise   1.00 through 150, 0.80 at 200
//   purple, lime        1.00 through 300, 0.80 at 350
//   blue,   yellow      1.00 through 400, 0.80 at 450
// Three thresholds, and one rule generates all of them. With parallax a
// render's centre sits at cy0 - s(1 + rate), so it reaches the top of the
// viewport at s = cy0 / (1 + rate):
//   orange 240/1.4 = 171 · purple 450/1.5 = 300 · blue 660/1.6 = 412
// — each within its own measured bracket. So a render holds full size until
// its CENTRE crosses the top of the screen, and only then parks at 0.8, by
// which point it is out of sight.
//
// This was a linear ramp starting at scroll 0, which shrank all six visibly
// during the first flick of the wheel — the one place the original keeps them
// at full size.
// Size is a three-band step, and the middle band was missing entirely: measured
// on the build, every render is 140px below 810, 200px from 810 to 1199 and
// 280px from 1200. (The Orange Pyramid and Blue Cylinder measure larger — 324
// and 390 at desktop — only because getBoundingClientRect returns the
// axis-aligned box of a rotated element: 280*(cos10+sin10)=324.5 and
// 280*(cos55+sin55)=390. All six are the same square.)
// Positions are PHYSICAL. The Framer file has no RTL, so the orange pyramid is
// at the top-left and the turquoise star at the top-right in both languages;
// `start`/`end` mirrored the whole arrangement on the Hebrew page, which put
// every render on the wrong side of the portrait.
const ELEMENTS = [
  { src: "/3d/orange-pyramid.png", float: 5, rate: 0.4, rotate: 10, z: 1, mobile: "top-5 right-0", desktop: "md:top-0 md:left-20 md:right-auto" },
  { src: "/3d/purple-sphere.png", float: 4, rate: 0.5, rotate: 0, z: 2, mobile: "-top-5 left-1/2 -translate-x-1/2", desktop: "md:top-1/2 md:-translate-y-1/2 md:left-0 md:translate-x-0" },
  { src: "/3d/blue-cylinder.png", float: 6, rate: 0.6, rotate: -55, z: 1, mobile: "top-5 left-0", desktop: "md:top-auto md:bottom-0 md:left-20" },
  { src: "/3d/turquoise-star.png", float: 6, rate: 0.4, rotate: 0, z: 2, mobile: "-bottom-5 right-0", desktop: "md:bottom-auto md:top-0 md:right-20" },
  { src: "/3d/lime-green.png", float: 4, rate: 0.5, rotate: 0, z: 1, mobile: "-bottom-15 left-1/2 -translate-x-1/2", desktop: "md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-0 md:left-auto md:translate-x-0" },
  { src: "/3d/yellow-cube.png", float: 5, rate: 0.6, rotate: 0, z: 2, mobile: "-bottom-5 left-0", desktop: "md:bottom-0 md:right-20 md:left-auto" },
];

const RENDER_BOX = "h-[140px] w-[140px] md:h-[200px] md:w-[200px] lg:h-[280px] lg:w-[280px]";

export default function Hero({ t }) {
  const reduce = useReducedMotion();
  // The renders want raw scroll pixels, because that is the unit their rates
  // were measured in. Nothing else in this section is scroll-linked.
  const { scrollY } = useScroll();

  return (
    // No `overflow-hidden` here. The section is inset by the page gutter now, and
    // the marquee is authored to bleed back out past it (r:-24 l:-24), which a
    // clip on the section would eat. `main` carries `overflow-x: clip` instead,
    // so the bleed paints into the gutter and nothing can widen the document.
    <section className="relative flex min-h-[100svh] items-center justify-center">
      <div
        className="decor absolute -inset-x-[var(--page-gutter)] top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden="true"
      >
        <Ticker text={t.hero.ticker} />
      </div>

      {/* The stage the six renders are pinned inside, and it is not one box.
          Measured: 1100x700 fixed from 1200px up; full container width by 720
          tall in the 810-1199 band; full width by 700 tall below 810, centred
          in the viewport rather than filling it — at 390x844 the stage runs
          y 72..772, i.e. 72px of clearance top and bottom. This used to be
          `inset-0` on phones, which spread the renders 144px further apart
          than the design and pushed two of them off the visible area. */}
      {/* The stage sits inside the page gutter, not against the viewport edge —
          it measures 358 at 390 and 852 at 900. That is now simply the section's
          own width, because the gutter moved to main. */}
      <div
        className="decor absolute inset-x-0 top-1/2 h-[700px] -translate-y-1/2 md:h-[720px] lg:inset-x-auto lg:h-[700px] lg:w-[1100px]"
        aria-hidden="true"
      >
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

  // The park threshold, derived rather than tabulated: this render's centre
  // starts at cy0 and travels up at (1 + rate) per pixel of scroll, so it
  // crosses the top of the screen at cy0 / (1 + rate). Measuring cy0 from the
  // element itself keeps it right at every breakpoint and viewport height,
  // where three hard-coded numbers would only be right at 1440x900.
  const boxRef = useRef(null);
  const [parkAt, setParkAt] = useState(Infinity);
  useEffect(() => {
    const measure = () => {
      const node = boxRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const cy0 = r.top + window.scrollY + r.height / 2;
      setParkAt(cy0 / (1 + el.rate));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [el.rate]);

  const [parked, setParked] = useState(false);
  useEffect(() => {
    if (!Number.isFinite(parkAt)) return;
    const check = (v) => setParked(v >= parkAt);
    check(scrollY.get());
    return scrollY.on("change", check);
  }, [scrollY, parkAt]);

  // Two scales, deliberately nested rather than combined. The entrance runs
  // 0.8 → 1.0 on the outer element and the park runs 1.0 → 0.8 on the inner
  // one, so the product is 0.8 at first paint, 1.0 once settled and 0.8 again
  // once scrolled past — which is exactly the three values measured off the
  // reference. Collapsing them into one value cannot express that.
  return (
    <motion.div
      ref={boxRef}
      className={`absolute ${RENDER_BOX} ${el.mobile} ${el.desktop}`}
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
        style={{ rotate: el.rotate, ...(reduce ? {} : { y }) }}
        animate={reduce ? undefined : { scale: parked ? 0.8 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* The float, on its own layer because the two transforms above are
            already spoken for: the middle one carries the scroll parallax as a
            style-bound motion value and the outer one the entrance scale.
            Measured on the reference at 1440 by sampling every 176ms for 16s:
            all six drift 11.8px, and every one of them sits at the TOP of its
            range when still — our static positions equal the reference's
            minimum to the pixel — so the drift is 0 -> +12 -> 0, downward,
            never upward. The periods come in pairs: orange and yellow 5s,
            purple and lime 4s, blue and turquoise 6s. Being coprime-ish they
            never resolve into one beat, which is what stops six objects
            drifting in lockstep from reading as one moving sheet. */}
        <motion.div
          className="relative h-full w-full"
          animate={reduce ? undefined : { y: [0, 12, 0] }}
          // Linear, which is what the measurement says. Quantised to 9 levels
          // the reference climbs one step per sample almost the whole way and
          // dwells only ~2 samples of 33 at each extreme; a cubic easeInOut
          // dwelt 5 of 29 and easeInOutSine 5 of 30 — both read as a hover and
          // drop rather than a drift. At 12px over 4-6s the turn at each end is
          // far too slow to see as a corner.
          transition={{ duration: el.float, repeat: Infinity, ease: "linear" }}
        >
          <Shape3D
            src={el.src}
            sizes="(max-width: 809px) 140px, (max-width: 1199px) 200px, 280px"
            eager
          />
        </motion.div>
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
    // The PHOTO is the anchor, not the column. In the Framer file the "Profile"
    // frame IS the 280x280 portrait, pinned cx:50% cy:50%, and the heading,
    // skills, clients row and button all hang off it at absolute offsets
    // (t:-114, t:-44, b:-60, b:-168). Measured on the build at 1440x900 the
    // photo sits 310..590 — centred on 450, which is also where the marquee band
    // is centred, so the black type runs straight through the middle of the
    // portrait.
    //
    // Laid out as a centred flex column instead, the whole stack gets centred
    // and the photo rides high: the column spans 196..758, centre 477, so the
    // photo lands ~27px above where the design puts it and the marquee crosses
    // it near the bottom edge rather than through the middle. Anchoring the
    // photo and hanging the rest off it is both what the file says and what
    // keeps the two centres locked together at any heading length.
    <div className="relative z-10 h-[280px] w-[280px]">
      {/* Above the photo: skills 12px clear of it, heading 12px above the skills
          — the node's t:-44 and t:-114 read as those two gaps once the heading's
          own 58px height is taken out, and expressing them as gaps survives a
          heading that wraps or a type step at a breakpoint. */}
      <div className="absolute bottom-[calc(100%+12px)] left-1/2 flex w-[min(92vw,640px)] -translate-x-1/2 flex-col items-center gap-3 text-center">
        {/* Weight 500 with the name at 700 italic — the Framer node is type:MIXED
            so the plugin withholds it, but the build renders the H1 at w500 with
            a w700 span inside. `.t-h1` carries the style's own 700, so the base
            is stepped back down here rather than in the shared class. */}
        <h1 className="t-h1 hero-h1">
          {t.hero.greetingLead}
          <span className="hero-name">{t.hero.greetingName}</span>
          {t.hero.greetingTail}
        </h1>

        <SkillsTicker items={[t.hero.role, ...t.hero.skillsTicker]} />
      </div>

      <ProfilePhoto alt={t.hero.greeting} ringText={t.hero.photoRing} />

      {/* Below: clients 24px clear of the photo, button 24px below that — which
          puts the button 84px under the photo, the node's b:-168 exactly. With
          no clients row the button simply takes the 24. */}
      <div className="absolute top-[calc(100%+24px)] left-1/2 flex w-[min(92vw,640px)] -translate-x-1/2 flex-col items-center gap-6">
        <Clients clients={t.hero.clients} />
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

/**
 * The clients row that sits between the portrait and the button.
 *
 * Measured on the reference at 1440x900, and it is what fills the gap this
 * column was missing: photo bottom 590, row 220x36 at y614, button at y674 —
 * so 24px below the photo and 24px above the button, which is exactly the
 * rhythm already documented in Profile.
 *   row       220x36 · flex row · gap 10
 *   avatars   36x36 · radius 96 · white fill · overflow hidden, each holding a
 *             32x32 image inset 2px, and each overlapping the one before by
 *             ~10px (cluster measures 89 wide for three)
 *   label     14px / 500 / rgb(77,77,77) — the Span style
 *
 * Renders nothing until `clients` exists. The label is a factual claim about
 * the person whose site this is, so it is content, not decoration: it comes
 * from the dictionary or it does not appear at all.
 */
function Clients({ clients }) {
  if (!clients?.label) return null;
  const avatars = clients.avatars ?? [];

  return (
    <div className="flex items-center gap-[10px]">
      {avatars.length > 0 && (
        <div className="flex items-center">
          {avatars.map((src, i) => (
            <span
              key={src}
              // radius 96, not `rounded-full` — it is what the reference's own
              // markup carries (`border-radius: 96px` inline on each avatar).
              // No white ring and no padding: the reference's avatars are bare
              // 32x32 images, measured identical at 390, 900 and 1440. The ring
              // was this rebuild's own addition.
              className="relative block h-8 w-8 overflow-hidden rounded-[96px]"
              // Pitch 28 on a 32px avatar, i.e. 4px of overlap. It was 10.
              style={i > 0 ? { marginInlineStart: -4 } : undefined}
            >
              <Image src={src} alt="" width={32} height={32} className="h-8 w-8 rounded-[96px] object-cover" />
            </span>
          ))}
        </div>
      )}
      <span className="t-span">{clients.label}</span>
    </div>
  );
}

/**
 * The "Skills List": one line at a time in a 32px window, not a row of chips.
 *
 * Measured on the build — five items on a 32px pitch, the track sitting at
 * -60, -92 and -124 (exactly 32 apart), each line held ~2.55s and then slid
 * 32px over ~440ms, easing out. Period between slide starts, 3.05s.
 *
 * Rendered as a two-item window rather than a translated 5-item track so the
 * DOM stays short and the wrap is free.
 */
function SkillsTicker({ items }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 3050);
    return () => clearInterval(id);
  }, [items.length, reduce]);

  if (reduce) {
    return (
      <div className="skills-clip">
        <p className="t-body skills-item">{items[0]}</p>
      </div>
    );
  }

  // A translated track, exactly as the reference does it — one column of items
  // on a 32px pitch sliding inside a 32px window. Not an AnimatePresence swap:
  // that positions the outgoing item against the nearest positioned ancestor,
  // which here is the hero section, so it escapes the clip entirely and lands
  // on the page. Running back to the top at the end is the reference's own
  // behaviour too — measured, it rewinds -124 to -16 in about 220ms.
  return (
    <div className="skills-clip">
      <motion.div
        animate={{ y: -i * 32 }}
        transition={{ duration: i === 0 ? 0.22 : 0.44, ease: [0.16, 1, 0.3, 1] }}
      >
        {items.map((s) => (
          <p key={s} className="t-body skills-item">
            {s}
          </p>
        ))}
      </motion.div>
    </div>
  );
}

// The marquee runs on its own clock and on nothing else — the hero travels 1:1
// with the scroll, so the extra scroll-linked drift this used to carry was a
// second motion the reference does not have.
//
// The type is the correction that matters: the reference's marquee H1 is 240px
// at weight 900 on a 288px line, in SOLID BLACK at opacity 1, running edge to
// edge behind the profile. This was 180px/700 in gray-95 — a faint watermark
// where the design has a black band, which is most of why the hero looked
// emptier than the original. The node is 1200x288 and bleeds past the page
// gutter (r:-24px l:-24px), which is why it sits outside .shell.
function Ticker({ text }) {
  const run = Array.from({ length: 6 }, () => text).join("");
  const trackRef = useRef(null);

  // 60.8 px/s, measured on the reference by least squares over six seconds of
  // frames. Ours ran at 253 — a fixed 40s for a translate of -50%, which is
  // only a speed by accident: it depends on how wide the text happens to be, so
  // the English and Hebrew marquees were running at different wrong speeds.
  // Setting the duration from the measured track width fixes both, and holds
  // after a font swap changes every glyph's width.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const set = () => {
      const cycle = el.scrollWidth / 2; // one -50% pass
      if (cycle > 0) el.style.animationDuration = `${cycle / 60.8}s`;
    };
    set();
    if (document.fonts?.ready) document.fonts.ready.then(set);
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, [text]);

  // `dir="ltr"` on the marquee, and it is load-bearing rather than cosmetic. In
  // an RTL document the flex track lays out from the right edge and the
  // animation's translateX(-50%) then pushes it further the same way, so the
  // whole 14596px track ended up at x=-14056 with a sliver on screen: on the
  // Hebrew page the black band simply was not there. The animation is a
  // physical translate, so the box it moves has to be physical too.
  return (
    <div className="relative flex w-full overflow-hidden" dir="ltr">
      <div ref={trackRef} className="ticker-track flex shrink-0 whitespace-nowrap">
        <span className="hero-ticker px-2">{run}</span>
        <span className="hero-ticker px-2">{run}</span>
      </div>
      <style>{`
        .ticker-track { animation: ticker 40s linear infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      `}</style>
    </div>
  );
}
