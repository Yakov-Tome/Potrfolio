"use client";

import { useEffect, useRef, useState } from "react";
import Shape3D from "@/components/ui/Shape3D";
import { motion, useReducedMotion } from "framer-motion";
import { experience, education, site } from "@/lib/content";

/**
 * Experience, education and details, laid out as the Framer "Services Section".
 *
 * The design has no section for a CV, so rather than invent a visual language
 * this takes the one the template already uses for a long numbered list and
 * puts real content through it. Everything below is the Services contract, read
 * off the node tree and then measured on cohesion.framer.ai at 1440, 900 and 390.
 *
 *   section    white fill, height = heading block + one 100vh slot per item
 *   heading    Heading 2, centred, full width
 *   row        max-width 1200, flex row, align-items: flex-start
 *     left     30% at >=1200, 40% at 810-1199, hidden below 810
 *              padding 0 24px 0 0, white fill
 *              a sticky block at top: 96px, 336x213 —
 *                number  200px / 800 / Gray/95 on a 240px line, out of flow
 *                title   Heading 3, 146px below the block's top
 *     right    70% / 60% / 100%, gap 0
 *       slot   1fr x 100vh, padding 146px 0 24px 24px (48px 0 0 below 810),
 *              gap 10 (48 below 810), column, centred
 *         text  Body Big, Gray/30, LEFT aligned — the node says centre and the
 *               build says left, and the build is the product
 *         shape 240x240 at every width, sitting ON the slot's bottom edge,
 *               centred, rotated per item. The node says bottom: 72px; the built
 *               page puts the 240 box's bottom exactly at the slot's, and the
 *               build is the product. Measured -1.00 against scroll at every
 *               depth: these do NOT parallax, they pass with their slot.
 *   below 810  the left column is dropped and each slot carries its own number
 *              and title, which is what the Phone frame does with the per-item
 *              "Service Title" it keeps hidden on desktop.
 *
 * The left title swaps as the list runs. Measured against the reference's own
 * slots — active at scroll offsets 700, 1200, 1700, 2200, 2700 was 01, 02, 03,
 * 03, 04 — the rule is: the active item is the LAST one whose slot top has
 * crossed the middle of the viewport. Nothing fades or slides; it is a swap.
 */

// One 3D render per item, each at its own angle, the way the reference gives
// every service a different shape and rotation.
const SHAPES = [
  { src: "/3d/orange-pyramid.png", rotate: -10 },
  { src: "/3d/blue-cylinder.png", rotate: 0 },
  { src: "/3d/lime-green.png", rotate: -15 },
  { src: "/3d/yellow-cube.png", rotate: 0 },
  { src: "/3d/purple-sphere.png", rotate: -45 },
  { src: "/3d/turquoise-star.png", rotate: 25 },
  { src: "/3d/purple-cube.png", rotate: -15 },
];

export default function Resume({ t, locale }) {
  const reduce = useReducedMotion();
  const slotsRef = useRef([]);
  const [active, setActive] = useState(0);

  // Items are composed from the data the site already holds, so the CV stays a
  // single source of truth rather than being restated for this layout.
  // Jobs and certificates run as ONE chronological list, oldest first, rather
  // than as two blocks. The numeral is the slot's own start year, so the list
  // has to be ordered by that year or the watermarks would count backwards.
  // Months in the reading language. Formatting a fixed "YYYY-MM" is
  // deterministic — no clock is read — so the server and the client agree and
  // hydration is quiet. The dates used to be one English display string, which
  // left the Hebrew page reading "Oct 2006 - Oct 2009".
  // Two precisions, because the sources have two. The CV PDF gives years for
  // the four roles, so those print as "2006 – 2009"; the certificates carry a
  // real credential date, so those print as "Sep 2024". Formatting a fixed
  // string is deterministic — no clock is read — so the server and the client
  // agree and hydration is quiet.
  const fmt = (value) => {
    const [y, m] = value.split("-");
    if (!m) return y;
    // en-US, not en-GB: en-GB abbreviates September to "Sept" where every other
    // month is three letters, so one date in the list would be a character
    // wider than the rest.
    return new Intl.DateTimeFormat(locale === "he" ? "he-IL" : "en-US", {
      month: "short",
      year: "numeric",
      // Fixed to UTC so the rendered month cannot slide by a timezone.
      timeZone: "UTC",
    }).format(new Date(Date.UTC(Number(y), Number(m) - 1, 1)));
  };
  const span = (from, to) => `${fmt(from)} – ${to ? fmt(to) : t.experience.present}`;

  const dated = [
    ...experience.map((job) => ({
      key: job.id,
      start: job.start,
      title: t.experience.items[job.id].role,
      // The dictionary may override the organisation — the IDF slot does,
      // because it is military service rather than an employer.
      meta: `${t.experience.items[job.id].company ?? job.company} · ${span(job.start, job.end)}`,
      body: t.experience.items[job.id].detail,
    })),
    ...education.map((cert) => ({
      key: cert.id,
      start: cert.start,
      title: t.education.items[cert.id].name,
      meta: `${cert.provider} · ${fmt(cert.start)}`,
      body: `${t.education.credential}: ${cert.credential}`,
      link: cert.link,
      linkLabel: t.resume.viewCertificate,
    })),
  ].sort((a, b) => a.start.localeCompare(b.start));

  const items = [
    ...dated,
    {
      key: "info",
      title: t.info.title,
      meta: `${t.info.country}: ${t.info.countryValue} · ${t.info.languages}: ${t.info.languagesValue}`,
      pairs: [
        [t.info.fullName, site.name],
        [t.info.role, t.info.roleValue],
        [t.info.experienceLabel, t.info.experienceValue],
        [t.info.specialties, t.info.specialtiesValue],
        [t.info.freelance, t.info.freelanceValue],
        // From the CV's own Hobbies block. The phone number on it is
        // deliberately NOT here: publishing a personal number is a decision
        // with consequences, and nobody asked for it.
        [t.info.interests, t.info.interestsValue],
      ],
    },
  ];

  // "the last slot whose top has crossed the middle of the viewport"
  useEffect(() => {
    let frame = 0;
    const pick = () => {
      frame = 0;
      const line = window.innerHeight / 2;
      let found = 0;
      slotsRef.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) found = i;
      });
      setActive(found);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items.length]);

  // The design's numeral is a sequence — 01, 02, 03. Here it is the year the
  // slot begins, which is what makes the column read as a timeline rather than
  // as a count. Details carries no year and so shows nothing: it is not a point
  // on that timeline, and inventing one would be the only way to fill it.
  const num = (i) => items[i].start?.slice(0, 4) ?? "";

  return (
    <section id="resume" className="section relative bg-white">
      <div className="shell flex w-full flex-col gap-[var(--section-gap)]">
        <h2 className="t-h2 section-title">{t.resume.title}</h2>

        <div className="cap flex md:items-start">
          {/* 30% from 1200, 40% in the tablet band, gone below 810 — and it has
              its own white fill in the design so the numeral never shows through
              from a slot scrolling past behind it. */}
          <div className="hidden self-stretch bg-white pe-6 md:block md:w-[40%] lg:w-[30%]">
            <div className="svc-head sticky top-24">
              <span className="svc-number" aria-hidden="true">
                {num(active)}
              </span>
              <p className="svc-title t-h3 font-medium text-black">{items[active].title}</p>
            </div>
          </div>

          <div className="w-full md:w-[60%] lg:w-[70%]">
            {items.map((item, i) => (
              <div
                key={item.key}
                ref={(el) => (slotsRef.current[i] = el)}
                className="relative flex h-[100svh] flex-col items-center gap-12 pt-12 md:gap-[10px] md:ps-6 md:pb-6 md:pt-[146px]"
              >
                {/* Below 810 the slot carries its own number and title, which is
                    exactly what the Phone frame turns on per Description. */}
                <div className="svc-head relative w-full md:hidden">
                  <span className="svc-number" aria-hidden="true">
                    {num(i)}
                  </span>
                  <p className="svc-title t-h3 font-medium text-black">{item.title}</p>
                </div>

                <div className="w-full">
                  <p className="t-span mb-2 text-blue-70">{item.meta}</p>
                  {item.pairs ? (
                    <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                      {item.pairs.map(([k, v]) => (
                        <div key={k} className="contents">
                          <dt className="t-body-big text-gray-50">{k}</dt>
                          <dd className="t-body-big m-0 text-gray-30">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="t-body-big text-start">{item.body}</p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-body-small link-underline mt-4 inline-flex w-fit font-medium text-black no-underline"
                    >
                      {item.linkLabel}
                    </a>
                  )}
                </div>

                <Shape shape={SHAPES[i % SHAPES.length]} reduce={reduce} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 240x240 at every width — measured 278 rendered for the -10deg item at 1440,
 * 900 and 390 alike, and 240 x (cos10 + sin10) is 278. Pinned 72px off the slot's
 * bottom and centred, with the item's own rotation. It carries the design's usual
 * 0.8 -> 1.0 entrance and nothing else: tracked against scroll the reference's
 * shapes move at exactly -1.00, so there is no parallax to reproduce.
 */
function Shape({ shape, reduce }) {
  const box = (
    <div className="absolute bottom-0 left-1/2 h-[240px] w-[240px] -translate-x-1/2" style={{ rotate: `${shape.rotate}deg` }}>
      <Shape3D src={shape.src} sizes="240px" />
    </div>
  );

  if (reduce) return <div className="decor pointer-events-none">{box}</div>;

  return (
    <motion.div
      aria-hidden="true"
      className="decor pointer-events-none absolute inset-0"
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ type: "spring", stiffness: 570, damping: 41, mass: 1 }}
    >
      {box}
    </motion.div>
  );
}
