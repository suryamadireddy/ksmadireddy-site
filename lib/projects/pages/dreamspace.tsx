import { ProjectHeroImage } from "@/app/components/project/ProjectHeroImage";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export default function DreamspaceProjectPage() {
  return (
    <ProjectShell
      maxWidth="5xl"
      label="Project"
      title="DreamSpace"
      description="A marketplace connecting Indian homeowners with vetted architects and interior designers."
      headerSpacing="compact"
    >
      <ProjectHeroImage
        src="/work/dreamspace.png"
        alt="DreamSpace — marketplace connecting Indian homeowners with vetted architects and interior designers"
      />

      <div className="mt-12 md:mt-16 max-w-[60ch] space-y-5 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          DreamSpace was a marketplace startup in Hyderabad — matching homeowners
          with vetted architects and interior designers. I joined as an operator
          to help build the product and go-to-market side of the business.
        </p>
        <p>
          The core problem was trust and discovery: homeowners didn&apos;t know how
          to evaluate firms; good firms struggled to reach qualified leads. We
          focused on curation, structured intake, and a pipeline that made both
          sides of the market legible before anyone committed time.
        </p>
        <p>
          More case-study detail — product flows, metrics, and artifacts — coming
          as this page gets built out.
        </p>
      </div>
    </ProjectShell>
  );
}
