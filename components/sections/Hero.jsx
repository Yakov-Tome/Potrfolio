"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

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
 * exposes no effect parameters — the Scroll Section frames are empty of them.
 * Reading the live transforms at three scroll depths gave:
 *   Orange Pyramid  translateY  +3.8 → -149 → -351   scale 1 → 0.8
 *   Purple Sphere              -131 → -334 → -582    scale 1 → 0.8
 *   Yellow Cube                  +3.8 → -229 → -531  scale 1 → 0.8
 * which is a steady extra rise of 0.40 / 0.50 / 0.60 of the scroll distance —
 * different rates per element, i.e. depth layering, not one parallax speed.
 */

const ELEMENTS = [
  { src: "/3d/orange-pyramid.png", rate: 0.4, rotate: 10, z: 1, mobile: "top-5 end-0", desktop: "md:top-0 md:start-20 md:end-auto" },
  { src: "/3d/purple-sphere.png", rate: 0.5, rotate: 0, z: 2, mobile: "-top-5 start-1/2 -translate-x-1/2", desktop: "md:top-1/2 md:-translate-y-1/2 md:start-0 md:translate-x-0" },
  { src: "/3d/blue-cylinder.png", rate: 0.45, rotate: -55, z: 1, mobile: "top-5 start-0", desktop: "md:top-auto md:bottom-0 md:start-20" },
  { src: "/3d/turquoise-star.png", rate: 0.55, rotate: 0, z: 2, mobile: "-bottom-5 end-0", desktop: "md:bottom-auto md:top-0 md:end-20" },
  { src: "/3d/lime-green.png", rate: 0.5, rotate: 0, z: 1, mobile: "-bottom-15 start-1/2 -translate-x-1/2", desktop: "md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:end-0 md:start-auto md:translate-x-0" },
  { src: "/3d/yellow-cube.png", rate: 0.6, rotate: 0, z: 2, mobile: "-bottom-5 start-0", desktop: "md:bottom-0 md:end-20 md:start-auto" },
];

export default function Hero({ t }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="decor absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden="true">
        <Ticker text={t.hero.ticker} progress={scrollYProgress} reduce={reduce} />
      </div>

      <div className="decor absolute inset-0 md:inset-auto md:h-[700px] md:w-[1100px]" aria-hidden="true">
        {ELEMENTS.map((el) => (
          <Decor key={el.src} el={el} progress={scrollYProgress} reduce={reduce} />
        ))}
      </div>

      <Profile t={t} progress={scrollYProgress} reduce={reduce} />
    </section>
  );
}

function Decor({ el, progress, reduce }) {
  // The measured rise is a fraction of the scroll distance, and the section is
  // one viewport tall, so the fraction is expressed in vh and the rotation the
  // node authored is preserved through the whole move.
  const y = useTransform(progress, [0, 1], ["0vh", `${-el.rate * 100}vh`]);
  // The reference is already at 0.8 by ~400px of an 800px hero and holds there,
  // so the shrink front-loads rather than running the full length of the pin —
  // measured, not guessed: Orange Pyramid and Purple Sphere both read scale 0.8
  // at y=400 and still 0.8 at y=900.
  const scale = useTransform(progress, [0, 0.45, 1], [1, 0.8, 0.8]);

  return (
    <motion.div
      className={`absolute h-[140px] w-[140px] md:h-[280px] md:w-[280px] ${el.mobile} ${el.desktop}`}
      style={{
        zIndex: el.z,
        rotate: el.rotate,
        ...(reduce ? {} : { y, scale }),
      }}
    >
      <Image src={el.src} alt="" fill sizes="(max-width: 810px) 140px, 280px" className="object-contain" priority />
    </motion.div>
  );
}

function Profile({ t, progress, reduce }) {
  // The profile stack recedes as the renders rise past it, which is what stops
  // the hero reading as a flat image that simply scrolls away.
  const scale = useTransform(progress, [0, 1], [1, 0.92]);
  const opacity = useTransform(progress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
      style={reduce ? {} : { scale, opacity }}
    >
      <motion.h1
        className="t-h1"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {t.hero.greeting}
      </motion.h1>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {[t.hero.role, ...t.hero.skillsTicker].map((s, i) => (
          <motion.span
            key={s}
            className={`t-span rounded-full px-3 py-1.5 ${
              i === 0 ? "bg-blue-70/10 text-blue-70" : "bg-gray-95 text-gray-30"
            }`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {s}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="relative h-[280px] w-[280px] overflow-hidden rounded-full bg-gray-95"
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src="/mobile.jpg" alt={t.hero.greeting} fill sizes="280px" className="object-cover" priority />
      </motion.div>

      <motion.div
        className="mt-6"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hidden md:inline-block">
          <Button href="#contact">{t.hero.cta}</Button>
        </span>
        <span className="inline-block md:hidden">
          <Button href="#contact">{t.hero.ctaMobile}</Button>
        </span>
      </motion.div>
    </motion.div>
  );
}

// The marquee runs on its own, and drifts further with scroll so it does not
// read as a static backdrop once the page starts moving.
function Ticker({ text, progress, reduce }) {
  const run = Array.from({ length: 6 }, () => text).join("");
  const x = useTransform(progress, [0, 1], ["0%", "-8%"]);

  return (
    <motion.div className="relative flex w-full overflow-hidden" style={reduce ? {} : { x }}>
      <div className="ticker-track flex shrink-0 whitespace-nowrap">
        <span className="px-2 text-[180px] font-bold leading-none text-gray-95">{run}</span>
        <span className="px-2 text-[180px] font-bold leading-none text-gray-95">{run}</span>
      </div>
      <style>{`
        .ticker-track { animation: ticker 40s linear infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      `}</style>
    </motion.div>
  );
}
