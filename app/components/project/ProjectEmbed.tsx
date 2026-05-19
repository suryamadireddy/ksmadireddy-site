import { mediaShellBase } from "../contentLayout";

type ProjectEmbedProps = {
  src: string;
  title: string;
};

export function ProjectEmbed({ src, title }: ProjectEmbedProps) {
  return (
    <div
      className={`${mediaShellBase} relative w-full overflow-hidden min-h-[240px] sm:min-h-[320px] lg:min-h-[380px] aspect-[16/10]`}
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
