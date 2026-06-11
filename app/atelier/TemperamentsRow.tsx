/* Hand-authored design copy illustrating how the temperaments are
 * characterized — not live system output. Nothing here may imply the
 * studio generated these takes. */

const BRIEF_FRAMING =
  "Four temperaments, one shared sense of taste, each pulling a different way. Given a single idea, here is how each one sees it:";

const BRIEF_TEXT =
  "a small retail space where time slows down: a calm, nature-rooted third place, funded by a high-efficiency convenience engine.";

const TEMPERAMENTS = [
  {
    name: "Clay",
    lens: "atmosphere and material",
    question: "How does it feel?",
    take: "Start at the threshold: the three steps where street noise falls away and the light turns from white to warm. If the body doesn't register the change in the first five seconds, nothing on the menu can fix it.",
  },
  {
    name: "August",
    lens: "monument and narrative",
    question: "What story does it tell at scale?",
    take: "One gesture should carry the whole room — the courtyard tree, visible from the street through the full depth of the building. Make it the reason people describe this place to a friend; everything else is supporting cast.",
  },
  {
    name: "Cedar",
    lens: "craft and region",
    question: "Where is the joint, the detail, the hand?",
    take: "The cabinetry is the argument. Show the joinery where shelf meets case, let the wood and stone say Texas rather than a rendering of Kyoto, and keep the hand visible at every point a guest touches.",
  },
  {
    name: "Wren",
    lens: "lightness and daring",
    question: "Can it be lighter, almost not there?",
    take: "Subtract until it nearly disappears: thinner shelves, no visible counter mass, the garden reading as though the room has no back wall. The luxury is the nerve to leave it almost empty.",
  },
];

export function TemperamentsRow() {
  return (
    <div className="mt-6">
      <span className="label">The temperaments</span>

      <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
        {BRIEF_FRAMING}
      </p>

      <div className="mt-5 rounded-md border border-[var(--color-border-strong)] px-5 py-4 md:px-6 md:py-5">
        <p className="text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
          <span className="display text-lg md:text-xl text-[var(--color-fg)]">
            Serenity
          </span>{" "}
          — {BRIEF_TEXT}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
        {TEMPERAMENTS.map((temperament) => (
          <article
            key={temperament.name}
            className="flex flex-col rounded-md bg-[var(--color-bg-elevated)] p-5 ring-1 ring-[var(--color-border)]"
          >
            <h4 className="display text-xl md:text-2xl text-[var(--color-fg)]">
              {temperament.name}
            </h4>
            <span className="label mt-2">{temperament.lens}</span>
            <p className="mt-4 font-serif text-base md:text-lg italic text-[var(--color-fg)]">
              {temperament.question}
            </p>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--color-fg-muted)]">
              {temperament.take}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
