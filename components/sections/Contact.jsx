import Link from "next/link";
import Button from "@/components/ui/Button";
import { site } from "@/lib/content";

/**
 * The page's closing region, in the shape the reference closes with.
 *
 * Measured on the build at 1440: the block is capped at 1200 and centred (x120,
 * width 1200), laid out as a row of columns with a 24px gap, each column headed
 * at 24px — Heading 4 — and the first one wide (490 against ~245 for the rest)
 * because it carries the call to action as well as the details. 192px below the
 * columns sits the copyright row, which is Footer.jsx.
 *
 * There is no tinted card here and nothing is centred: the reference's closing
 * region is plain left-aligned columns. This used to be a centred tint-card
 * panel, which was the rebuild's own invention.
 *
 * Three columns rather than the reference's four. Its fourth is "Legal", and
 * filling that would mean publishing a privacy policy and terms that do not
 * exist — the geometry is the design's, the content stays true.
 *
 * The links are real destinations and the mail goes from the visitor's own
 * client, so they keep a copy in their sent folder; the previous site posted
 * through EmailJS, which put a public key in the bundle and gave the sender
 * nothing.
 */
export default function Contact({ t, locale }) {
  const links = [
    { href: `/${locale}#about`, label: t.nav.about },
    { href: `/${locale}#stack`, label: t.nav.stack },
    { href: `/${locale}#resume`, label: t.nav.resume },
    { href: `/${locale}#projects`, label: t.nav.projects },
    { href: `/${locale}/blog`, label: t.nav.blog },
  ];

  const social = [
    { href: site.github, label: "GitHub" },
    { href: site.linkedin, label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="section">
      <div className="cap shell flex w-full flex-col gap-12 md:flex-row md:gap-6">
        {/* The wide first column: the reference puts its "Book a Call" button
            here alongside the details. */}
        <div className="flex flex-col items-start gap-6 md:w-[40%]">
          <h2 className="t-h4">{t.contact.columns.contact}</h2>
          <Button href={`mailto:${site.email}`} icon="mail" external>
            {t.contact.cta}
          </Button>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${site.email}`}
              className="t-body-small link-underline font-medium text-black no-underline"
            >
              {site.email}
            </a>
            <a
              href={site.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="t-body-small link-underline text-gray-30 no-underline"
            >
              {t.contact.locationValue}
            </a>
          </div>
        </div>

        <nav className="flex flex-col items-start gap-6 md:w-[20%]" aria-label={t.contact.columns.links}>
          <h2 className="t-h4">{t.contact.columns.links}</h2>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="t-body-small link-underline text-gray-30 no-underline hover:text-black">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-6 md:w-[20%]">
          <h2 className="t-h4">{t.contact.columns.social}</h2>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-body-small link-underline text-gray-30 no-underline hover:text-black"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
