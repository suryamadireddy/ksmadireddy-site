import type { Metadata } from "next";
import { ProjectShell } from "@/app/components/project/ProjectShell";
import { AtelierPageContent } from "./AtelierPageContent";

export const metadata: Metadata = {
  title: "Atelier | Krishna Surya Madireddy",
  description:
    "A studio that knows me well enough to judge which ideas deserve the work — and how each deserves to be shown.",
};

export default function AtelierPage() {
  return (
    <ProjectShell title="ATELIER">
      <AtelierPageContent />
    </ProjectShell>
  );
}
