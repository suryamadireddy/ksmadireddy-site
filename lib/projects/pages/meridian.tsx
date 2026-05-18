import { ProjectEmbed } from "@/app/components/project/ProjectEmbed";
import { ProjectShell } from "@/app/components/project/ProjectShell";

const MERIDIAN_EMBED = "https://the-meridian-seven.vercel.app";

export default function MeridianProjectPage() {
  return (
    <ProjectShell
      maxWidth="5xl"
      label="Project"
      title="Meridian"
      description="Five stories a day, ranked by real-world impact. Short, factual, no editorializing."
      headerSpacing="compact"
    >
      <ProjectEmbed src={MERIDIAN_EMBED} title="Meridian — live" />
    </ProjectShell>
  );
}
