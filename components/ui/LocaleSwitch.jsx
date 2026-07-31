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
      className="t-span rounded-full border border-gray-70 px-4 py-2 text-black no-underline transition-colors hover:border-black hover:bg-black hover:text-white"
    >
      {label}
    </Link>
  );
}
