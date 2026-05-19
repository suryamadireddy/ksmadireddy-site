import { projects } from "@/lib/projects/registry";
import { HeroIntro } from "./HeroIntro";
import { WorkCard } from "./WorkCard";

export function Work() {
  return (
    <section className="pt-20 md:pt-32 pb-16 md:pb-24">
      <HeroIntro />

      {projects.map((project) => (
        <WorkCard key={project.slug} {...project.card} />
      ))}
    </section>
  );
}
