import { ProjectProse } from "@/app/components/project/ProjectProse";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export default async function AtlasProjectPage() {
  return (
    <ProjectShell label="Working spec">
      <div className="max-w-[60ch] mb-16 md:mb-20 space-y-4 text-lg md:text-xl leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Atlas isn&apos;t built yet. This is the spec I&apos;m working from,
          posted because the iteration story — built Meridian Seven, used it,
          realized news wasn&apos;t the framing I wanted — is most of what
          I&apos;d want a hiring manager to see. Ask for trade routes, historical
          empires, or species migrations and they surface as visual layers.
          Evolved from Meridian
        </p>
        <p>
          The document below is the working version, unchanged. It&apos;s
          written for me, not for an audience. That&apos;s the point.
        </p>
      </div>

      <ProjectProse
        contentPath="content/atlas-spec.md"
        missingMessage="The spec file could not be loaded. If you're developing locally, ensure"
      />
    </ProjectShell>
  );
}
