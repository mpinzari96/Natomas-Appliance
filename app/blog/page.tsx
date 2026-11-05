import type { Metadata } from "next"

import { BlogPostCard } from "@/components/blog/blog-post-card"
import { loadBlogCatalog } from "@/lib/blog/load-posts"
import { blogIndexMetadata } from "@/lib/blog/metadata"

export function generateMetadata(): Metadata {
  const { published } = loadBlogCatalog()
  return blogIndexMetadata(published)
}

export default function BlogIndexPage() {
  const { published } = loadBlogCatalog()

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">BLOG</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Practical notes on home appliances from Natomas Appliance. New posts appear here when they are published.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {published.length === 0 ? (
          <p className="max-w-3xl text-lg text-muted-foreground">
            No articles have been published yet. Check back after the first post is approved.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {published.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
