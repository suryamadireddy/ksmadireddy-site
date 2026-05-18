import { mediaShellClass } from "../contentLayout";

type ProjectHeroImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  objectFit?: "contain" | "cover";
  objectPosition?: string;
};

export function ProjectHeroImage({
  src,
  alt,
  aspectRatio = "16 / 10",
  objectFit = "cover",
  objectPosition = "center",
}: ProjectHeroImageProps) {
  return (
    <div
      className={mediaShellClass}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${
          objectFit === "cover" ? "object-cover" : "object-contain"
        }`}
        style={{ objectPosition }}
        loading="lazy"
      />
    </div>
  );
}
