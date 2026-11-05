import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { formatBlogDate } from "@/lib/blog/parse"
import type { PublishedBlogPost } from "@/lib/blog/types"

export function BlogPostCard({ post }: { post: PublishedBlogPost }) {
  const thumbnail = post.hero?.kind === "photo" ? post.hero : undefined

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        {thumbnail ? (
          <div className="relative aspect-video w-full bg-muted">
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt}
              fill
              className={thumbnail.fit === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
        ) : null}
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{formatBlogDate(post.publishedAt)}</p>
          <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
