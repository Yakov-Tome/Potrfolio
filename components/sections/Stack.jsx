"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import StackCard from "@/components/ui/StackCard";
import Reveal from "@/components/motion/Reveal";
import { skills } from "@/lib/content";
import { skillCopy } from "@/lib/skill-copy";

/**
 * Stack, from the Framer "Stack Section": a 3-column grid of flip cards with a
 * 720px render behind them, sticky at t:180px. On Phone the grid collapses to
 * one column, the gap tightens to 16px and the render is hidden outright.
 *
 * The render is sticky in the design, so it holds position while the cards
 * scroll past it and rotates slowly — that slow turn is what keeps a long grid
 * from feeling like a spreadsheet.
 */
export default function Stack({ t, locale }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} id="stack" className="section relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="decor pointer-events-none absolute start-1/2 top-[180px] hidden h-[720px] w-[720px] -translate-x-1/2 md:block"
        style={reduce ? {} : { rotate, y }}
      >
        <Image src="/3d/turquoise-cube.png" alt="" fill sizes="720px" className="object-contain opacity-90" />
      </motion.div>

      <div className="shell relative z-10 flex flex-col gap-[var(--section-gap)]">
        <Reveal as="h2" className="t-h2 section-title">
          {t.stack.title}
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {skills.map((skill, i) => (
            // Stagger runs across the row rather than the whole grid, so a card
            // low in a 22-item list still animates promptly when it appears.
            <Reveal key={skill.id} delay={(i % 3) * 0.08}>
              <StackCard
                skill={skill}
                description={skillCopy[skill.id]?.[locale] ?? ""}
                flipLabel={t.stack.flip}
                flipBackLabel={t.stack.flipBack}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
