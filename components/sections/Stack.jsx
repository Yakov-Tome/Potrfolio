import Image from "next/image";
import StackCard from "@/components/ui/StackCard";
import { skills } from "@/lib/content";
import { skillCopy } from "@/lib/skill-copy";

/**
 * Stack, from the Framer "Stack Section": a 3-column grid of flip cards with a
 * 720px render sitting sticky behind them at t:180px. On Phone the grid
 * collapses to one column, the gap tightens to 16px and the render is hidden
 * outright — all three are in the breakpoint diff.
 */
export default function Stack({ t, locale }) {
  return (
    <section id="stack" className="section relative overflow-hidden">
      <Image
        src="/3d/turquoise-cube.png"
        alt=""
        width={720}
        height={720}
        aria-hidden="true"
        className="decor absolute start-1/2 top-[180px] hidden h-[720px] w-[720px] -translate-x-1/2 object-contain opacity-90 md:block"
      />
      <div className="shell relative z-10 flex flex-col gap-[var(--section-gap)]">
        <h2 className="t-h2 section-title">{t.stack.title}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {skills.map((skill) => (
            <StackCard
              key={skill.id}
              skill={skill}
              description={skillCopy[skill.id]?.[locale] ?? ""}
              flipLabel={t.stack.flip}
              flipBackLabel={t.stack.flipBack}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
