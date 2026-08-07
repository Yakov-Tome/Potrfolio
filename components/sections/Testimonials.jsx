"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The Framer " Testimonials Section" — a white 100vh panel holding a heading and
 * a slideshow that advances on its own.
 *
 * From the node: the section is `h:fit-content` with a `Content` frame at
 * `h:100vh`, `pad 192px 0px 48px 0px`, `gap 96px`, radius 24 and a White fill,
 * carrying a Heading 2 and a "Testimonials Slider" of 1152x418.
 *
 * Everything else is measured on the running build:
 *   section    1392x900 at 1440, 852x900 at 900 — one viewport, radius 24, white
 *   heading    38px, centred, full width
 *   slider     1392x518 at 1440, 852x374 at 900
 *   card       flex column, centred, gap 48
 *     avatar   96x96, round
 *     name     Heading 3 (28 / 24 / 20)
 *     role     Span, 14/500, rgb(77,77,77)
 *     quote    Quotes — italic, 20/18/16, 1.2em, rgb(77,77,77), centred
 *   dots       three, 10x10, Blue/70, active opacity 1 and the rest 0.2
 *   arrows     present in the markup but `display: none`, so not built here
 *   advance    every ~3.0s: the active dot changed at 1771, 4811, 7839, 10893,
 *              13877, 16896 and 20007ms, i.e. gaps of 3040, 3028, 3054, 2984,
 *              3019 and 3111
 *
 * The reference's track is draggable (`cursor: grab`, `touch-action: pan-y`), so
 * this one is too, and a drag past a tenth of the width steps a slide.
 */
const ADVANCE_MS = 3000;

export default function Testimonials({ t }) {
  const data = t.testimonials;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = data?.items?.length ?? 0;
  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % count), ADVANCE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

  // Rendering nothing is the off switch: drop `testimonials` from a dictionary
  // and the section disappears rather than showing an empty panel.
  if (!count) return null;

  return (
    // 100vh and a 48px bottom, both from the node's Content frame — the section
    // is one viewport tall like About's header and Hero, not content-height.
    <section id="testimonials" className="section section--short-bottom min-h-[100svh] rounded-[24px] bg-white">
      <div className="shell flex w-full flex-col gap-[var(--section-gap)]">
        <h2 className="t-h2 section-title">{data.title}</h2>

        <div
          className="relative overflow-hidden pb-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          aria-roledescription="carousel"
        >
          <motion.div
            className="slides-track flex cursor-grab active:cursor-grabbing"
            animate={{ x: `${-index * 100}%` }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 34 }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              // A tenth of the viewport of travel, or a decisive flick, steps one.
              if (info.offset.x < -60 || info.velocity.x < -400) go(index + 1);
              else if (info.offset.x > 60 || info.velocity.x > 400) go(index - 1);
            }}
          >
            {data.items.map((item, i) => (
              <div
                key={i}
                className="slides-slide w-full shrink-0"
                aria-hidden={i !== index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${count}`}
              >
                <figure className="m-0 flex flex-col items-center gap-12 px-4">
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      src={item.avatar}
                      alt=""
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <figcaption className="flex flex-col items-center">
                      <span className="t-h3 font-medium text-black">{item.name}</span>
                      <span className="t-span">{item.role}</span>
                    </figcaption>
                  </div>
                  <blockquote className="t-quote m-0 max-w-[940px]">{item.quote}</blockquote>
                </figure>
              </div>
            ))}
          </motion.div>

          {/* 10x10 dots in Blue/70, the active one opaque and the rest at 0.2 —
              measured. Real buttons rather than the reference's bare divs, so
              the slideshow is reachable without a pointer. */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
            {data.items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1} / ${count}`}
                aria-current={i === index}
                className="cursor-pointer border-0 bg-transparent px-[5px] py-[10px] first:ps-[10px] last:pe-[10px]"
              >
                <span
                  className="block h-[10px] w-[10px] rounded-full bg-blue-70 transition-opacity duration-300"
                  style={{ opacity: i === index ? 1 : 0.2 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
