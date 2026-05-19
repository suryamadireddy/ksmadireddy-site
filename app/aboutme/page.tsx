import type { Metadata } from "next";
import { Background } from "@/app/components/Background";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export const metadata: Metadata = {
  title: "About — Krishna Surya Madireddy",
  description:
    "Background — GM platform PM, building across the U.S., India, and Southeast Asia.",
};

export default function AboutProjectPage() {
  return (
    <ProjectShell title="ABOUT">
      <Background />
    </ProjectShell>
  );
}
