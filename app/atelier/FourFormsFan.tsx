"use client";

import type { CSSProperties } from "react";

/* Six cards on a shallow arc: signed distance from center drives rotation,
 * its square drives vertical drop. Second from left leads. */
const CARD_OFFSETS = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];
const LEAD_INDEX = 1;

export function FourFormsFan() {
  return (
    <figure className="four-forms-fan mt-10 md:mt-12" aria-label="An idea, fanned into candidate forms">
      <p className="display text-center text-xl md:text-2xl text-[var(--color-fg)]">
        A quiet third place where time slows down.
      </p>
      <div className="mt-8 flex items-start justify-center gap-3 sm:gap-4">
        {CARD_OFFSETS.map((offset, index) => (
          <div
            key={offset}
            aria-hidden="true"
            className={[
              "fan-card aspect-[3/4] w-12 rounded-md sm:w-16 md:w-20",
              index === LEAD_INDEX
                ? "border border-[var(--color-border-strong)]"
                : "border border-[var(--color-border)]",
            ].join(" ")}
            style={
              {
                "--fan-rotate": `${offset * 4}deg`,
                "--fan-drop": `${offset * offset * 4.5}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <style jsx>{`
        @media (min-width: 640px) {
          .fan-card {
            transform: translateY(var(--fan-drop)) rotate(var(--fan-rotate));
          }
        }
      `}</style>
    </figure>
  );
}
