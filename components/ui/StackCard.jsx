"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * The Framer "Stack Card" is a flip card: a 48px-radius tinted shell around a
 * white 24px card, with a logo face and a description face, and a "Tap to flip"
 * hint at the bottom. Both faces exist in the component; the variants only
 * differ by which one is opaque.
 *
 * Implemented as a button so it is reachable by keyboard, which the design's
 * tap-only interaction is not.
 */
export default function StackCard({ skill, description, flipLabel, flipBackLabel }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className="flip w-full cursor-pointer border-0 bg-transparent p-0 text-start"
      data-flipped={flipped}
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={skill.name}
    >
      <span className="flip-inner block">
        <span className="flip-face front tint-card block">
          <span className="inner flex flex-col items-center justify-center gap-3">
            <Image src={skill.logo} alt="" width={120} height={120} className="h-[120px] w-[120px] object-contain" />
            <span className="t-h3 font-medium text-black">{skill.name}</span>
            <span className="t-span absolute bottom-9">{flipLabel}</span>
          </span>
        </span>

        <span className="flip-face back tint-card block">
          <span className="inner flex flex-col items-center justify-center gap-3 text-center">
            <span className="t-h3 font-medium text-black">{skill.name}</span>
            <span className="t-body-small">{description}</span>
            <span className="t-span absolute bottom-9">{flipBackLabel}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
