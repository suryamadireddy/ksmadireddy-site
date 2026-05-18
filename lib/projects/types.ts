import type { Metadata } from "next";
import type { WorkCardProps } from "@/app/components/WorkCard";

export type ProjectDefinition = {
  slug: string;
  metadata: Metadata;
  card: WorkCardProps;
};
