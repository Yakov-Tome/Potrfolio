"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES } from "@/lib/content";

/**
 * Swaps the locale segment of the current path, so switching language keeps you
 * on the page you were reading instead of dropping you at the home page.
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

  return (
    <Link
      href={segments.join("/") || `/${other}`}
      hrefLang={other}
      // Sits inside a .nav-pill now, so it is a nav link like the others rather
      // than an outlined button of its own — the reference's second pill holds
      // a plain label too.
      className="nav-link"
    >
      {label}
    </Link>
  );
}
