import { projects } from "@/lib/projects/registry";
import { HeroCard } from "./HeroCard";
import { WorkCard } from "./WorkCard";

export function Work() {
  return (
    <section className="pt-20 md:pt-32 pb-16 md:pb-24">
      <HeroCard />

      {projects.map((project) => (
        <WorkCard key={project.slug} {...project.card} />
      ))}
    </section>
  );
}
