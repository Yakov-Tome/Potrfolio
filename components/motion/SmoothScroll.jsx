"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * The Framer page carries a "Smooth Scroll" component at the top of the tree
 * with props{intensity:10}. That is the first thing you feel on the published
 * template — every other scroll-linked effect reads as inertial because of it.
 *
 * Lenis is the equivalent: intensity 10 maps to a long, heavily damped glide,
 * which is what `duration: 1.2` with an exponential ease-out gives.
 *
 * Turned off entirely for prefers-reduced-motion — hijacking scroll is exactly
 * the kind of motion that setting exists to refuse.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have native inertia; smoothing it again fights
      // the platform and feels laggy.
      smoothTouch: false,
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
