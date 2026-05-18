import { ProjectProse } from "@/app/components/project/ProjectProse";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export default async function KsmStudioProjectPage() {
  return (
    <ProjectShell label="Project notes">
      <ProjectProse
        contentPath="content/ksm-studio.md"
        missingMessage="This page could not be loaded. If you're developing locally, ensure"
      />
    </ProjectShell>
  );
}
