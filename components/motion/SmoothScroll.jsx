"use client";

import { useEffect } from "react";
import Lenis from "lenis";
// Required, and previously missing. Lenis needs `html.lenis, html.lenis body
// { height: auto }` or the document keeps its own scroll height alongside the
// virtual one, plus the `[data-lenis-prevent]` overscroll rules that let inner
// scrollers (the mobile menu) opt out.
import "lenis/dist/lenis.css";

/**
 * The Framer page carries a "Smooth Scroll" component at the top of the tree
 * with props{intensity:10}. That is the first thing you feel on the published
 * template — every other scroll-linked effect reads as inertial because of it.
 *
 * That component is not a mystery: its module is public, and it is Lenis. The
 * whole of its motion configuration is
 *
 *     new Lenis({ duration: (intensity || 10) / 10 })
 *
 * so intensity 10 means `duration: 1.0` and nothing else — Lenis' own default
 * easing, which is the exponential ease-out spelled out below. This file used
 * to say 1.2, which is a fifth slower than the source and is why the glide felt
 * different rather than merely absent.
 *
 * Turned off entirely for prefers-reduced-motion — hijacking scroll is exactly
 * the kind of motion that setting exists to refuse.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // (intensity 10) / 10 — read off the source module, not chosen.
      duration: 1.0,
      // Lenis' default easing, written out so it is visible that the source
      // relies on it rather than overriding it.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // `smoothTouch` was removed in Lenis 1.x — passing it did nothing. The
      // current name is `syncTouch`, and false is the wanted value: touch
      // devices already have native inertia, and smoothing it again fights the
      // platform.
      syncTouch: false,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors have to go through Lenis, or the browser's own jump
    // fights the virtual scroll position.
    const onClick = (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -64 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
