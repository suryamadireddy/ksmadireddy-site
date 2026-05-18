import { mediaShellClass } from "../contentLayout";

type ProjectEmbedProps = {
  src: string;
  title: string;
};

export function ProjectEmbed({ src, title }: ProjectEmbedProps) {
  return (
    <div className={`${mediaShellClass} aspect-[16/10]`}>
      <iframe
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        title={title}
        loading="lazy"
      />
    </div>
  );
}
