import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { parseBlogPostFile } from "./parse"
import type { BlogCatalog, BlogPost, PublishedBlogPost } from "./types"
import { BlogCatalogError } from "./types"
import { isPublishedPost } from "./visibility"

export const DEFAULT_BLOG_DIR = join(process.cwd(), "content/blog")

const catalogCache = new Map<string, BlogCatalog>()

function comparePublished(a: PublishedBlogPost, b: PublishedBlogPost): number {
  if (a.publishedAt !== b.publishedAt) {
    return a.publishedAt < b.publishedAt ? 1 : -1
  }
  return a.slug.localeCompare(b.slug)
}

function loadCatalogFromDir(contentDir: string): BlogCatalog {
  const fileNames = readdirSync(contentDir)
    .filter((name) => name.endsWith(".json"))
    .sort()

  const issues: string[] = []
  const posts: BlogPost[] = []
  const slugs = new Map<string, string>()
  const seoTitles = new Map<string, string>()
  const seoDescriptions = new Map<string, string>()

  for (const fileName of fileNames) {
    const raw = readFileSync(join(contentDir, fileName), "utf8")
    let data: unknown
    try {
      data = JSON.parse(raw)
    } catch {
      issues.push(`${fileName}: file is not valid JSON`)
      continue
    }

    const parsed = parseBlogPostFile({ data, fileName })
    if (!parsed.ok) {
      issues.push(...parsed.issues)
      continue
    }

    const duplicateSlug = slugs.get(parsed.post.slug)
    if (duplicateSlug) {
      issues.push(`${fileName}: slug "${parsed.post.slug}" duplicates ${duplicateSlug}`)
      continue
    }
    slugs.set(parsed.post.slug, fileName)

    const duplicateTitle = seoTitles.get(parsed.post.seoTitle)
    if (duplicateTitle) {
      issues.push(`${fileName}: seoTitle duplicates ${duplicateTitle}`)
    } else {
      seoTitles.set(parsed.post.seoTitle, fileName)
    }

    const duplicateDescription = seoDescriptions.get(parsed.post.seoDescription)
    if (duplicateDescription) {
      issues.push(`${fileName}: seoDescription duplicates ${duplicateDescription}`)
    } else {
      seoDescriptions.set(parsed.post.seoDescription, fileName)
    }

    posts.push(parsed.post)
  }

  if (issues.length > 0) {
    throw new BlogCatalogError(issues)
  }

  const published = posts.filter(isPublishedPost).sort(comparePublished)
  return { posts, published }
}

export function loadBlogCatalog(options?: { contentDir?: string }): BlogCatalog {
  const contentDir = options?.contentDir ?? DEFAULT_BLOG_DIR
  const allowCache = process.env.NODE_ENV === "production"
  if (allowCache) {
    const cached = catalogCache.get(contentDir)
    if (cached) {
      return cached
    }
  }
  const catalog = loadCatalogFromDir(contentDir)
  if (allowCache) {
    catalogCache.set(contentDir, catalog)
  }
  return catalog
}

export function resetBlogCatalogCache(): void {
  catalogCache.clear()
}
