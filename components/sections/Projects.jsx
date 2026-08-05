import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { projects } from "@/lib/content";

/**
 * Projects, from the Framer "Projects Section".
 *
 * The shape here was wrong and the published build settles it: this is a
 * TWO-COLUMN grid of portrait cards, not a single column of wide ones. Measured
 * at 1440x900 —
 *   grid          1248 wide, `grid-template-columns: 612px 612px`, gap 24, centred
 *   card          612 wide, flex column, gap 12, padding-bottom 24
 *     image shell 612x431, padding 24, radius 48, rgba(102,112,255,.05), blur(5px)
 *       image     564x382, object-fit: cover  (the shell's content box exactly)
 *     text block  padding 0 24px, gap 6, column, align start
 *   row pitch     584 for a 559-tall card, i.e. the same 24
 *
 * So the tint shell wraps the SHOT, and the words sit outside it on the page —
 * the inverse of the About and Stack cards, where the shell wraps everything.
 * That is why a project reads as a picture with a caption rather than as
 * another panel.
 *
 * These cards are also the only ones in the design that fade: measured, a
 * project card runs opacity 0 -> 1 alongside its scale 0.8 -> 1.0, while a
 * pricing card runs the identical scale with opacity pinned at 1.
 */
export default function Projects({ t }) {
  return (
    <section id="projects" className="section">
      <div className="shell flex w-full flex-col gap-[var(--section-gap)]">
        <h2 className="t-h2 section-title">{t.projects.title}</h2>

        <ul className="cap m-0 grid list-none grid-cols-1 gap-6 p-0 [--cap:1248px] md:grid-cols-2">
          {projects.map((p) => {
            const copy = t.projects.items[p.id];
            return (
              <Reveal key={p.id} as="li" fade className="group flex flex-col gap-3 pb-6">
                {/* The tint shell holds the shot and nothing else. */}
                <div className="tint-card">
                  <div className="relative aspect-3/2 w-full overflow-hidden rounded-[24px] bg-gray-95">
                    <Image
                      src={p.image}
                      alt={copy.name}
                      fill
                      sizes="(max-width: 810px) 100vw, 612px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* 6px gap and a 24px inline inset, matching the caption block. */}
                <div className="flex flex-col gap-1.5 px-6">
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
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
