import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";

export type AtelierComponentId =
  | "vault"
  | "workshop"
  | "bench"
  | "scrapped"
  | "gallery";

const INTROS: Record<AtelierComponentId, string[]> = {
  vault: [
    "Ideas come the way they always do: half-formed and easy to forget. So the first thing the Atelier needed was a place to put them down without ceremony. The Idea Vault is that place, you catch the thing before it's gone and you move on. A creative system that's hard to feed doesn't get fed, so on your side the entry point costs nothing.",
    "But the Vault doesn't just hold an idea, it gets a head start on it: in the background it does a first pass of research, the basic landscape and obvious questions, so that when you come back the idea isn't cold.",
  ],
  workshop: [
    "A passing idea lands in the Workshop — the active floor, where the things worth my time right now live, each one ready to pick up exactly where I left off.",
  ],
  bench: [
    "An idea with promise but no urgency gets benched — set aside where I can find it when I have a reason to take it on.",
  ],
  scrapped: [
    "And an idea that didn't survive is scrapped, not deleted, because the Kiln can be wrong and an idea that fails today might be right in a year.",
  ],
  gallery: [
    "The work I'm proud of leaves the studio for the Gallery, the room that faces outward. Not everything that survives belongs in public, so the Gallery is curated, not automatic.",
    "The studio is where things are made. The Gallery is where the few worth showing are shown.",
  ],
};

const SCRAPPED_IDEAS = [
  {
    name: "[SCRAPPED IDEA 1 NAME]",
    reason: "[one-line reason it didn't survive]",
  },
  {
    name: "[SCRAPPED IDEA 2 NAME]",
    reason: "[one-line reason it didn't survive]",
  },
  {
    name: "[SCRAPPED IDEA 3 NAME]",
    reason: "[one-line reason it didn't survive]",
  },
] as const;

type AtelierComponentIntroProps = {
  id: AtelierComponentId;
};

export function AtelierComponentIntro({ id }: AtelierComponentIntroProps) {
  return (
    <CaseStudySection label="Introduction">
      <CaseStudyProse paragraphs={INTROS[id]} />
      {id === "vault" ? (
        <div className="mt-8 md:mt-10">
          {/* Vault capture screenshot — added later */}
          <div
            className="aspect-video w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
            aria-hidden="true"
          />
        </div>
      ) : null}
      {id === "scrapped" ? (
        <>
          <ul className="mt-8 md:mt-10 space-y-6 md:space-y-7">
            {SCRAPPED_IDEAS.map((idea) => (
              <li key={idea.name}>
                <p className="text-base leading-relaxed md:text-lg">
                  <span className="text-[var(--color-fg-muted)]" aria-hidden>
                    —{" "}
                  </span>
                  <span className="font-semibold text-[var(--color-fg)]">
                    {idea.name}
                  </span>
                  <span className="text-[var(--color-fg-muted)]">
                    : {idea.reason}
                  </span>
                </p>
                <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                  Still recoverable
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 md:mt-10 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
            Nothing is deleted. Each keeps its verdict and its reasoning, so if
            the ground shifts, I can find it again.
          </p>
        </>
      ) : null}
    </CaseStudySection>
  );
}
