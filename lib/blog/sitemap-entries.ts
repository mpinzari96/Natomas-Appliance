import { SITE_ORIGIN } from "./site"
import type { PublishedBlogPost } from "./types"

export type BlogSitemapEntry = {
  url: string
  lastModified: string
}

export function publishedSitemapEntries(published: PublishedBlogPost[]): BlogSitemapEntry[] {
  if (published.length === 0) {
    return []
  }

  const newest = published[0]
  const entries: BlogSitemapEntry[] = [
    {
      url: `${SITE_ORIGIN}/blog`,
      lastModified: newest.modifiedAt ?? newest.publishedAt,
    },
  ]

  for (const post of published) {
    entries.push({
      url: `${SITE_ORIGIN}/blog/${post.slug}`,
      lastModified: post.modifiedAt ?? post.publishedAt,
    })
  }

  return entries
}
