import type { Metadata } from "next"

import { SITE_ORIGIN } from "./site"
import type { BlogImage, BlogPost, PublishedBlogPost } from "./types"
import { isPublishedPost } from "./visibility"

function canonical(path: string): string {
  return `${SITE_ORIGIN}${path}`
}

function photoOgImages(image: BlogImage | undefined): { url: string; alt: string }[] | undefined {
  if (!image || image.kind !== "photo") {
    return undefined
  }
  return [
    {
      url: image.src,
      alt: image.alt,
    },
  ]
}

export function blogIndexMetadata(published: PublishedBlogPost[]): Metadata {
  const title = "Blog"
  const description =
    published.length > 0
      ? "Articles from Natomas Appliance about home appliance care in the Sacramento area."
      : "Natomas Appliance will publish home appliance articles here. No articles are live yet."
  const shouldIndex = published.length > 0

  return {
    title,
    description,
    alternates: {
      canonical: canonical("/blog"),
    },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: canonical("/blog"),
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const url = canonical(`/blog/${post.slug}`)
  const images = photoOgImages(post.hero)
  const indexable = isPublishedPost(post)

  return {
    title: {
      absolute: post.seoTitle,
    },
    description: post.seoDescription,
    alternates: {
      canonical: url,
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url,
      type: "article",
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: post.seoTitle,
      description: post.seoDescription,
      images: images ? images.map((image) => image.url) : undefined,
    },
  }
}
