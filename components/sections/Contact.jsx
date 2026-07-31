import Button from "@/components/ui/Button";
import { site } from "@/lib/content";

/**
 * Contact, closing the page the way the Framer design does — a full-height
 * section that the rest of the page scrolls away to reveal.
 *
 * The previous site posted through EmailJS from the browser, which put a
 * public key in the bundle and gave the visitor no copy of what they sent.
 * These are direct links instead: the message goes from their own mail client,
 * and they keep it in their sent folder.
 */
export default function Contact({ t }) {
  const channels = [
    { label: t.contact.email, value: site.email, href: `mailto:${site.email}` },
    { label: t.contact.github, value: "github.com/yakov-tome", href: site.github, external: true },
    { label: t.contact.linkedin, value: "linkedin.com/in/yakov-tome", href: site.linkedin, external: true },
    { label: t.contact.location, value: t.contact.locationValue, href: site.maps, external: true },
  ];

  return (
    <section id="contact" className="section">
      <div className="shell flex w-full flex-col gap-[var(--section-gap)]">
        <div className="tint-card">
          <div className="inner flex flex-col items-center gap-8 py-12 text-center">
            <h2 className="t-h2">{t.contact.title}</h2>
            <p className="t-body-big max-w-[600px]">{t.contact.lead}</p>
            <Button href={`mailto:${site.email}`} icon="mail" external>
              {t.contact.cta}
            </Button>

            <ul className="m-0 grid w-full list-none grid-cols-1 gap-4 p-0 pt-4 md:grid-cols-4">
              {channels.map((c) => (
                <li key={c.label} className="flex flex-col items-center gap-1">
                  <span className="t-span text-gray-50">{c.label}</span>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="t-body-small link-underline font-medium text-black no-underline"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
