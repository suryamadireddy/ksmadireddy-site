import { mediaShellBase } from "../contentLayout";

type ProjectEmbedProps = {
  src: string;
  title: string;
  size?: "default" | "hero";
};

const sizeClass: Record<NonNullable<ProjectEmbedProps["size"]>, string> = {
  default:
    "min-h-[240px] sm:min-h-[320px] lg:min-h-[380px] aspect-[16/10]",
  hero: "min-h-[400px] sm:min-h-[480px] lg:min-h-[560px] aspect-[16/11]",
};

export function ProjectEmbed({
  src,
  title,
  size = "default",
}: ProjectEmbedProps) {
  return (
    <div
      className={`${mediaShellBase} relative w-full overflow-hidden ${sizeClass[size]}`}
    >
      <iframe
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        title={title}
        loading="lazy"
      />
    </div>
  );
}
