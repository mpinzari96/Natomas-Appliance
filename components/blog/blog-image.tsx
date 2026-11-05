import Image from "next/image"

import { PlaceholderShot } from "@/components/blog/placeholder-shot"
import type { BlogImage } from "@/lib/blog/types"
import { cn } from "@/lib/utils"

export function BlogImageBlock({
  image,
  priority = false,
  className,
}: {
  image: BlogImage | undefined
  priority?: boolean
  className?: string
}) {
  if (!image) {
    return null
  }

  if (image.kind === "placeholder") {
    return <PlaceholderShot image={image} className={className} />
  }

  const aspectClass = image.fit === "contain" ? "aspect-[4/3] bg-muted" : "aspect-video bg-muted"

  return (
    <figure className={cn("my-6", className)}>
      <div className={cn("relative w-full overflow-hidden", aspectClass)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          className={image.fit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-2 text-sm text-muted-foreground">{image.caption}</figcaption>
      ) : null}
    </figure>
  )
}
