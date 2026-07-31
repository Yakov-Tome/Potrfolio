import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * Hero, laid out from the Framer "Top Section": six 3D renders pinned around a
 * 1100x700 stage, a full-bleed ticker running behind them, and the 280px
 * profile stack floating on top at z-index 2.
 *
 * Positions and rotations are the node values, not eyeballed:
 *   orange pyramid  t:0    l:80  rot 10
 *   purple sphere   l:0    cy:50%      z2
 *   blue cylinder   b:0    l:80  rot -55
 *   turquoise star  t:0    r:80        z2
 *   green element   r:0    cy:50%
 *   yellow cube     r:80   b:0         z2
 * On Phone every render halves to 140px and regroups — that is the breakpoint
 * diff, expressed below in the md: variants.
 */

const ELEMENTS = [
  { src: "/3d/orange-pyramid.png", alt: "", mobile: "top-5 end-0", desktop: "md:top-0 md:start-20 md:end-auto", rotate: 10, z: 1 },
  { src: "/3d/purple-sphere.png", alt: "", mobile: "-top-5 start-1/2 -translate-x-1/2", desktop: "md:top-auto md:start-0 md:translate-x-0 md:top-1/2 md:-translate-y-1/2", rotate: 0, z: 2 },
  { src: "/3d/blue-cylinder.png", alt: "", mobile: "top-5 start-0", desktop: "md:top-auto md:bottom-0 md:start-20", rotate: -55, z: 1 },
  { src: "/3d/turquoise-star.png", alt: "", mobile: "-bottom-5 end-0", desktop: "md:bottom-auto md:top-0 md:end-20", rotate: 0, z: 2 },
  { src: "/3d/lime-green.png", alt: "", mobile: "-bottom-15 start-1/2 -translate-x-1/2", desktop: "md:bottom-auto md:end-0 md:start-auto md:translate-x-0 md:top-1/2 md:-translate-y-1/2", rotate: 0, z: 1 },
  { src: "/3d/yellow-cube.png", alt: "", mobile: "-bottom-5 start-0", desktop: "md:bottom-0 md:end-20 md:start-auto", rotate: 0, z: 2 },
];

export default function Hero({ t }) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Full-bleed ticker, hidden on Phone exactly as the breakpoint says. */}
      <div className="decor absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden="true">
        <Ticker text={t.hero.ticker} />
      </div>

      {/* The 3D stage. */}
      <div className="decor absolute inset-0 md:inset-auto md:h-[700px] md:w-[1100px]" aria-hidden="true">
        {ELEMENTS.map((el) => (
          <div
            key={el.src}
            className={`absolute h-[140px] w-[140px] md:h-[280px] md:w-[280px] ${el.mobile} ${el.desktop}`}
            style={{ zIndex: el.z, transform: el.rotate ? `rotate(${el.rotate}deg)` : undefined }}
          >
            <Image src={el.src} alt="" fill sizes="(max-width: 810px) 140px, 280px" className="object-contain" priority />
          </div>
        ))}
      </div>

      {/* Profile stack. */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="t-h1">{t.hero.greeting}</h1>
        <SkillsList items={t.hero.skillsTicker} role={t.hero.role} />
        <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full bg-gray-95">
          <Image
            src="/mobile.jpg"
            alt={`${t.hero.greeting}`}
            fill
            sizes="280px"
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-6">
          {/* The design changes this label on Phone; both strings are real content. */}
          <span className="hidden md:inline-block">
            <Button href="#contact">{t.hero.cta}</Button>
          </span>
          <span className="inline-block md:hidden">
            <Button href="#contact">{t.hero.ctaMobile}</Button>
          </span>
        </div>
      </div>
    </section>
  );
}

function SkillsList({ items, role }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="t-span rounded-full bg-blue-70/10 px-3 py-1.5 text-blue-70">{role}</span>
      {items.map((s) => (
        <span key={s} className="t-span rounded-full bg-gray-95 px-3 py-1.5 text-gray-30">
          {s}
        </span>
      ))}
    </div>
  );
}

// A marquee whose content is duplicated so the loop has no visible seam. It is
// decorative, so it is hidden from assistive tech and frozen for anyone who
// asked for reduced motion.
function Ticker({ text }) {
  const run = Array.from({ length: 6 }, () => text).join("");
  return (
    <div className="relative flex w-full overflow-hidden">
      <div className="ticker-track flex shrink-0 whitespace-nowrap">
        <span className="px-2 text-[180px] font-bold leading-none text-gray-95">{run}</span>
        <span className="px-2 text-[180px] font-bold leading-none text-gray-95">{run}</span>
      </div>
      <style>{`
        .ticker-track { animation: ticker 40s linear infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      `}</style>
    </div>
  );
}
