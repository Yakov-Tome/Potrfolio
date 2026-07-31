import Link from "next/link";
import { site } from "@/lib/content";
import LocaleSwitch from "./LocaleSwitch";

// The Framer page has no persistent navbar — it is a single scrolling column.
// A thin sticky bar is added here because the site has more than one page
// (the blog) and two languages, and neither is reachable without it.
export default function Nav({ locale, t }) {
  const links = [
    { href: `/${locale}#about`, label: t.nav.about },
    { href: `/${locale}#stack`, label: t.nav.stack },
    { href: `/${locale}#projects`, label: t.nav.projects },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}#contact`, label: t.nav.contact },
  ];

  return (
    // Glass, not a white bar. The reference's nav computes to
    // `backdrop-filter: blur(10px)` over `background: rgba(255,255,255,0)` with
    // no border and no shadow, and it is identical at every scroll depth —
    // there is no scrolled state, the effect is simply the page blurring
    // through it as it passes underneath. This was `bg-white/85` with a border,
    // which is opaque enough that nothing legible moves behind it.
    <header className="sticky top-0 z-50 backdrop-blur-[10px]">
      <nav className="shell flex h-16 items-center gap-6">
        <Link href={`/${locale}`} className="t-h4 !text-[20px] font-medium text-black no-underline">
          {site.name}
        </Link>
        <ul className="ms-auto hidden list-none items-center gap-6 p-0 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="t-body-small link-underline text-gray-30 no-underline hover:text-black">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ms-auto md:ms-0">
          <LocaleSwitch locale={locale} label={t.otherLocaleName} />
        </div>
      </nav>
    </header>
  );
}
