import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatBlogDate } from "@/lib/blog/parse"
import type { PublishedBlogPost } from "@/lib/blog/types"
import { cn } from "@/lib/utils"

export function BlogPostCard({ post }: { post: PublishedBlogPost }) {
  const thumbnail = post.hero?.kind === "photo" ? post.hero : undefined

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex h-full flex-col overflow-hidden border shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-lg group-focus-visible:-translate-y-1 group-focus-visible:border-primary/20 group-focus-visible:shadow-lg">
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
        <CardContent className="flex flex-1 flex-col p-6">
          <h2 className="text-xl font-semibold tracking-tight text-primary underline-offset-4 transition-colors group-hover:underline group-focus-visible:underline">
            {post.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{formatBlogDate(post.publishedAt)}</p>
          <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
          <span
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "mt-6 w-fit")}
            aria-hidden="true"
          >
            Read more
            <ArrowRight />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
