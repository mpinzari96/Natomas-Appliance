import type { MetadataRoute } from "next"

import { loadBlogCatalog } from "@/lib/blog/load-posts"
import { publishedSitemapEntries } from "@/lib/blog/sitemap-entries"

export default function sitemap(): MetadataRoute.Sitemap {
  const { published } = loadBlogCatalog()
  return publishedSitemapEntries(published).map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
  }))
}
