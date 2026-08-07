"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import LocaleSwitch from "./LocaleSwitch";

/**
 * The nav, rebuilt as the reference's centred pill rather than as a bar.
 *
 * There is no nav node anywhere in the Framer file — `getWebPages` is missing
 * from this plugin build, so the bridge only sees the open canvas page and the
 * nav lives on another one. Everything below is measured off the published
 * build at 1440x900:
 *
 *   <nav>    1440x72 · padding 24px 0 0 · flex · justify:center · align:end
 *            · gap 10px · backdrop-filter: blur(10px) over rgba(255,255,255,0)
 *   pill     501x48 · radius 24 · padding 3 · white
 *            · box-shadow rgba(0,0,0,.05) 0 5px 20px
 *   link     padding 6px 18px · 14px/500 · rgb(77,77,77)
 *   active   radius 96 · fill rgb(249,71,6) (Orange/60) · white label · 42px tall
 *   a second pill sits to its right inside the same centred group
 *
 * The active chip is ONE element that moves between links, not a background per
 * link. That is what makes the reference's nav read as a single object rather
 * than as five buttons. It is positioned from a measurement rather than with
 * `layoutId` — see the note at the chip itself for why.
 *
 * The bar is fixed and the page runs underneath it, which is the only reason
 * the 10px blur has anything to blur.
 */
export default function Nav({ locale, t }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const onBlog = pathname?.startsWith(`/${locale}/blog`);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const pillRef = useRef(null);
  const [chip, setChip] = useState({ x: 0, w: 0 });

  // Close the phone menu on navigation — a hash link does not remount this.
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { id: "home", href: `/${locale}`, label: t.nav.home },
    { id: "about", href: `/${locale}#about`, label: t.nav.about },
    { id: "stack", href: `/${locale}#stack`, label: t.nav.stack },
    // Sits where "Services" sits in the reference's nav, because this is the
    // section built in that layout.
    { id: "resume", href: `/${locale}#resume`, label: t.nav.resume },
    { id: "projects", href: `/${locale}#projects`, label: t.nav.projects },
    { id: "blog", href: `/${locale}/blog`, label: t.nav.blog },
    { id: "contact", href: `/${locale}#contact`, label: t.nav.contact },
  ];

  // The chip tracks the section under the middle of the viewport. An
  // IntersectionObserver is the wrong tool here: these sections are up to 3.5
  // viewports tall and several intersect at once, so "is it visible" cannot
  // choose between them. Asking which one covers the midpoint always can.
  useEffect(() => {
    if (onBlog) return;
    let frame = 0;
    const pick = () => {
      frame = 0;
      const mid = window.scrollY + window.innerHeight / 2;
      let found = "home";
      for (const l of links) {
        if (l.id === "home" || l.id === "blog") continue;
        const el = document.getElementById(l.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (mid >= top) found = l.id;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBlog, locale]);

  const current = onBlog ? "blog" : active;

  // Where the chip has to be. Measured from the link's own box inside the pill,
  // so it is correct on first paint, after a font swap, after a resize and in
  // either writing direction.
  // The active link is found by querying the pill, not by reading a ref map.
  // The map version placed the chip correctly on a link CLICK and never again:
  // when the section changed under a scroll, `data-active` moved to the right
  // link while the chip stayed on Home, at x=3 w=75, and a resize could not
  // shake it loose either — so the lookup, not the effect, was what failed.
  // A query has no such state to get out of step with the render.
  useEffect(() => {
    const place = () => {
      const pill = pillRef.current;
      const el = pill?.querySelector(`[data-nav="${current}"]`);
      if (!el || !pill) return;
      const e = el.getBoundingClientRect();
      const p = pill.getBoundingClientRect();
      setChip((c) => {
        const x = Math.round(e.left - p.left);
        const w = Math.round(e.width);
        return c.x === x && c.w === w ? c : { x, w };
      });
    };
    place();
    // Web fonts land after hydration and change every label's width.
    if (document.fonts?.ready) document.fonts.ready.then(place);
    // Scroll as well as resize: the pill itself does not move, but this is the
    // one cheap place to re-check that the chip agrees with what is rendered.
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
    };
  }, [current, t]);

  return (
    // Two bars, because the design has two. Below 810 the reference's nav is
    // 64px tall with `padding: 16px 16px 0`, carries NO backdrop-filter, and
    // holds one thing: a 48x48 white pill at the inline end. From 810 up it is
    // 72px with `padding: 24px 0 0`, blur(10px), and the centred pill group.
    <header className="fixed inset-x-0 top-0 z-50 pt-4 md:pt-6 md:backdrop-blur-[10px]">
      <nav className="flex items-center justify-end gap-[10px] px-4 md:justify-center md:px-[var(--page-gutter)]">
        <div ref={pillRef} className="nav-pill relative hidden md:flex">
          {/* ONE chip, positioned from a measurement, not a shared-layout
              animation. `layoutId` looked right until the target was Blog or
              Contact, where the chip dropped in from above or below instead of
              travelling along the bar: framer-motion projects layout in page
              coordinates, and inside a `position: fixed` bar that adds the
              current scroll offset to the delta. The further down the page the
              switch happened, the bigger the vertical jump — which is exactly
              why it looked fine on About and wrong on Contact.
              Reading offsetLeft/offsetWidth off the active link and animating x
              and width has no such failure mode, and it is physical, so it
              travels the right way in Hebrew too. */}
          {chip.w > 0 && (
            <motion.span
              className="nav-chip"
              initial={false}
              animate={{ x: chip.x, width: chip.w }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 570, damping: 41 }}
            />
          )}
          {links.map((l) => {
            const isActive = l.id === current;
            return (
              <Link
                key={l.id}
                href={l.href}
                data-nav={l.id}
                data-active={isActive}
                className="nav-link relative shrink-0"
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-pill hidden shrink-0 md:flex">
          <LocaleSwitch locale={locale} label={t.otherLocaleName} />
        </div>

        {/* The phone bar. The reference collapses to exactly this one 48x48
            pill; what it opens was not measured, so the panel below stays in
            the design's own language rather than inventing a new one. */}
        <div className="relative md:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={t.nav.home}
            onClick={() => setOpen((v) => !v)}
            className="nav-pill flex h-12 w-12 cursor-pointer items-center justify-center border-0 p-0"
          >
            {/* Two bars, not three — that is what the reference's 48x48 pill
                draws at 390. */}
            <span className="flex h-[9px] w-[18px] flex-col justify-between">
              <span className="block h-0.5 w-full rounded bg-black" />
              <span className="block h-0.5 w-full rounded bg-black" />
            </span>
          </button>

          {open && (
            <div
              id="nav-menu"
              className="absolute end-0 top-14 flex min-w-[200px] flex-col gap-1 rounded-[24px] bg-white p-3 shadow-[0_5px_20px_rgba(0,0,0,0.05)]"
            >
              {links.map((l) => (
                <Link
                  key={l.id}
                  href={l.href}
                  data-active={l.id === current}
                  onClick={() => setOpen(false)}
                  className={`nav-link ${l.id === current ? "bg-orange-60" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
              <LocaleSwitch locale={locale} label={t.otherLocaleName} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
