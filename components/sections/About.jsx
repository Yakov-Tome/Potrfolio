import Image from "next/image";
import Button from "@/components/ui/Button";
import { site } from "@/lib/content";

/**
 * About, from the Framer "About Section": a 350vh column in which the heading
 * and the two 3D renders are sticky, and three cards scroll up and settle on
 * top of each other — each one sticky at t:0 inside its own 100vh slot.
 *
 * The renders are 640px and pinned l:120 / r:120 at centreY on Desktop; on
 * Phone they drop to 240px, one at the bottom and one 96px from the top.
 */
export default function About({ t }) {
  return (
    <section id="about" className="relative rounded-[24px] bg-white">
      {/* Sticky backdrop: heading + decor, held while the cards travel past. */}
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-start overflow-hidden py-[var(--section-pad)]">
        <Image
          src="/3d/purple-cube.png"
          alt=""
          width={640}
          height={640}
          aria-hidden="true"
          className="decor absolute bottom-0 start-0 end-0 mx-auto h-[240px] w-auto object-contain md:inset-auto md:start-30 md:top-1/2 md:h-[640px] md:w-[640px] md:-translate-y-1/2"
        />
        <Image
          src="/3d/blue-pyramid.png"
          alt=""
          width={640}
          height={640}
          aria-hidden="true"
          style={{ transform: "rotate(10deg)" }}
          className="decor absolute top-24 start-1/2 h-[240px] w-[240px] -translate-x-1/2 object-contain md:inset-auto md:end-30 md:top-1/2 md:h-[640px] md:w-[640px] md:translate-x-0 md:-translate-y-1/2"
        />
        <div className="shell relative z-10">
          <h2 className="t-h2 section-title">{t.about.title}</h2>
        </div>
      </div>

      {/* The cards are pulled back up over the sticky backdrop rather than
          positioned absolutely: an absolutely-positioned stack contributes no
          height, so the section would have had to carry a matching spacer and
          the two could drift apart. This way the section is exactly as tall as
          the cards need — one viewport each — and the heading stays stuck
          underneath for all of it. */}
      <div className="-mt-[100svh]">
        {t.about.cards.map((text, i) => (
          <div key={i} className="sticky top-0 flex h-[100svh] items-center justify-center px-[var(--page-gutter)]">
            <div className="tint-card w-full max-w-[900px]">
              <div className="inner flex flex-col items-center justify-center gap-6 text-center">
                <p className="t-body-big">{text}</p>
                {i === t.about.cards.length - 1 && (
                  <Button href={site.cv} icon="cv" external>
                    {t.about.cv}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
