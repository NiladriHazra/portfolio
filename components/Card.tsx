import NextLink from "next/link";
import { posterFor } from "@/lib/poster";

interface CraftCardProps {
  title: string;
  description: string;
  media?: string;
  mediaType?: "image" | "video" | "component";
  preview?: React.ReactNode;
}

interface ProjectCardProps {
  title: string;
  description: string;
  media: string;
  mediaType: "image" | "video";
  href?: string;
  tags?: string[];
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  bgImage?: string;
  contentSize?: string;
}

export const ProjectCard = ({
  title,
  description,
  media,
  mediaType,
  href,
  tags,
  size = "sm",
  bgColor,
  bgImage,
  contentSize,
}: ProjectCardProps) => {
  const hasBackground = bgColor || bgImage;

  const cardContent = (
    <div className="w-full rounded-xl group cursor-pointer">
      <div
        className={`card-white relative rounded-xl border border-neutral-200 overflow-hidden flex items-center justify-center ${
          size === "lg" ? "h-80 sm:h-92" : size === "md" ? "h-64 sm:h-64" : "h-56 sm:h-48"
        }`}
        style={{
          backgroundColor: bgColor,
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* fix: absolute inset-0 when no bg so video doesn't spread */}
        <div className={`overflow-hidden ${
            hasBackground && contentSize !== "w-full h-full"
              ? `relative ${contentSize || "w-[85%] h-[85%]"}`
              : "absolute inset-0"
          }`}>
          {mediaType === "video" ? (
            <video
              src={media}
              poster={posterFor(media)}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={media}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

      </div>

      <div className="flex flex-col gap-1 px-1 pt-2">
        <h3 className="text-black dark:text-white font-medium transition-colors duration-200 group-hover:text-blue">{title}</h3>
        <p className="text-balance text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[40px]">{description}</p>
        {tags && (
          <div className="flex gap-2 mt-1 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <NextLink
        href={href}
        className="block"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {cardContent}
      </NextLink>
    );
  }

  return cardContent;
};

export const CraftCard = ({
  title,
  description,
  media,
  mediaType,
  preview,
}: CraftCardProps) => {
  return (
    <div className="w-full rounded-lg pb-2">
      <div className="card-white relative rounded-lg h-72 sm:h-92 border border-neutral-200 overflow-hidden flex items-center justify-center">
        {mediaType === "component" && preview}
        {mediaType === "video" && (
          <video src={media} poster={media && posterFor(media)} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        )}
        {mediaType === "image" && (
          <img src={media} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>
      <div className="flex flex-col gap-1 px-1 pt-2">
        <h3 className="list-title text-base sm:text-lg">{title}</h3>
        <p className="list-meta text-sm text-balance">{description}</p>
      </div>
    </div>
  );
};
