"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES } from "@/lib/content";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "@/lib/locale-cookie";

/**
 * Swaps the locale segment of the current path, so switching language keeps you
 * on the page you were reading instead of dropping you at the home page.
 *
 * It also records the choice. The site starts in English for everyone; this
 * switch is the only thing that changes what a bare visit to the domain shows
 * next time, which is what makes it a preference rather than a per-tab toggle.
 */
export default function LocaleSwitch({ locale, label }) {
  const pathname = usePathname() || `/${locale}`;
  const other = LOCALES.find((l) => l !== locale) ?? locale;

  const segments = pathname.split("/");
  if (LOCALES.includes(segments[1])) {
    segments[1] = other;
  } else {
    segments.splice(1, 0, other);
  }

  // Written here rather than in the middleware on every /he request: a shared
  // link should show the language it names without quietly rewriting the
  // recipient's preference. `SameSite=Lax` so it survives arriving from another
  // site; no `Secure` flag in development, where there is no https to set it on.
  const remember = () => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LOCALE_COOKIE}=${other}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  };

  return (
    <Link
      href={segments.join("/") || `/${other}`}
      hrefLang={other}
      onClick={remember}
      // Sits inside a .nav-pill now, so it is a nav link like the others rather
      // than an outlined button of its own — the reference's second pill holds
      // a plain label too.
      className="nav-link"
    >
      {label}
    </Link>
  );
}
