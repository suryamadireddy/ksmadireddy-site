import { ProjectHeroImage } from "@/app/components/project/ProjectHeroImage";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export default function PlacemakingProjectPage() {
  return (
    <ProjectShell
      maxWidth="5xl"
      label="Project"
      title="Placemaking"
      description="Designing third places that give people a reason to stay."
      headerSpacing="compact"
    >
      <ProjectHeroImage
        src="/work/placemaking.png"
        alt="Placemaking — designing third places that give people a reason to stay"
        objectFit="contain"
      />

      <div className="mt-12 md:mt-16 max-w-[60ch] space-y-5 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Field research across Asia and Europe on how public and semi-public
          spaces earn repeat visits — not through novelty alone, but through
          rhythm, comfort, and reasons to linger.
        </p>
        <p>
          The thread is placemaking as systems design: circulation, seating,
          light, sound, and the small cues that signal &ldquo;you can stay.&rdquo;
          Third places fail when they optimize for throughput; they work when
          they optimize for belonging without requiring a transaction.
        </p>
        <p>
          Notes, sketches, and site studies will live here as the project page
          grows.
        </p>
      </div>
    </ProjectShell>
  );
}
