import { cn } from "@/lib/utils"
import type { PlaceholderImage } from "@/lib/blog/types"

export function PlaceholderShot({ image, className }: { image: PlaceholderImage; className?: string }) {
  return (
    <figure className={cn("my-6", className)}>
      <div
        className={cn(
          "flex w-full items-center justify-center border border-dashed border-muted-foreground/40 bg-muted px-6 py-8 text-center",
          image.aspect === "16:9" ? "aspect-video" : "aspect-[4/3]",
        )}
      >
        <p className="max-w-xl text-sm font-medium text-muted-foreground">{image.label}</p>
      </div>
      {image.caption ? (
        <figcaption className="mt-2 text-sm text-muted-foreground">{image.caption}</figcaption>
      ) : null}
    </figure>
  )
}
