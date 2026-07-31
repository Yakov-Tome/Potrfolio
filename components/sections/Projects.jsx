import Image from "next/image";
import { projects } from "@/lib/content";

/**
 * Projects, from the Framer "Projects Section" — the Projects Collection Stack.
 * Each entry is a tinted 48px shell around a white card holding the shot, the
 * name, the role and the description, with the visit link on the inline end.
 */
export default function Projects({ t }) {
  return (
    <section id="projects" className="section">
      <div className="shell flex w-full flex-col gap-[var(--section-gap)]">
        <h2 className="t-h2 section-title">{t.projects.title}</h2>

        <ul className="m-0 flex list-none flex-col gap-6 p-0">
          {projects.map((p) => {
            const copy = t.projects.items[p.id];
            return (
              <li key={p.id} className="tint-card">
                <article className="inner grid gap-6 md:grid-cols-[minmax(0,420px)_1fr] md:items-center">
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-[16px] bg-gray-95">
                    <Image
                      src={p.image}
                      alt={copy.name}
                      fill
                      sizes="(max-width: 810px) 100vw, 420px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="t-span rounded-full bg-blue-70/10 px-3 py-1.5 text-blue-70">{copy.role}</span>
                      <span className="t-span rounded-full bg-gray-95 px-3 py-1.5">{p.stack}</span>
                      <span className="t-span rounded-full bg-gray-95 px-3 py-1.5">{p.year}</span>
                    </div>
                    <h3 className="t-h3 font-medium text-black">{copy.name}</h3>
                    <p className="t-body-small font-medium text-black">{copy.title}</p>
                    <p className="t-body-small">{copy.description}</p>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-body-small link-underline mt-1 inline-flex w-fit items-center gap-2 font-medium text-black no-underline"
                    >
                      {t.projects.visit}
                      <span className="text-gray-50">{p.preview}</span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
