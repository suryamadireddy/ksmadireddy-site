import type { Metadata } from "next";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export const metadata: Metadata = {
  title: "KSM Studio | Krishna Surya Madireddy",
  description:
    "Four-tier agentic system with strict isolation contracts and a multi-pass distillation pipeline.",
};

const INTRO = [
  "KSM Studio is the agentic system I built to test architecture ideas I kept returning to. Four tiers — Triage, Sharpening, Artifacts, Distillation — with explicit isolation contracts at each boundary.",
  "The real work isn’t the agents — it’s the contracts. Each tier has one job: interrogate the idea, research the space, draft the spec, and distill it for reading.",
];

const TIERS = [
  "Triage interviews an idea across six dimensions without ever disclosing its scores.",
  "Sharpening grounds the problem in web research before any artifact exists.",
  "Artifacts runs four accumulating passes.",
  "Distillation renders the public-facing output without exposing the evaluation underneath.",
];

export default function KsmStudioProjectPage() {
  return (
    <ProjectShell title="KSM STUDIO">
      <CaseStudySection label="Introduction">
        <CaseStudyProse paragraphs={INTRO} />
      </CaseStudySection>

      <CaseStudySection label="Tiers and contracts">
        <CaseStudyProse paragraphs={TIERS} />
      </CaseStudySection>
    </ProjectShell>
  );
}
