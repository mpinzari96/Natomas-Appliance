import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogArticleBody, BlogArticleHeader } from "@/components/blog/blog-article"
import { loadBlogCatalog } from "@/lib/blog/load-posts"
import { blogPostMetadata } from "@/lib/blog/metadata"
import { findVisiblePost, isPublishedPost, readRuntimeEnv, visiblePosts } from "@/lib/blog/visibility"

export const dynamicParams = false

export function generateStaticParams() {
  const { posts } = loadBlogCatalog()
  return visiblePosts(posts, readRuntimeEnv()).map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { posts } = loadBlogCatalog()
  const post = findVisiblePost(posts, params.slug, readRuntimeEnv())
  if (!post) {
    notFound()
  }
  return blogPostMetadata(post)
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { posts, published } = loadBlogCatalog()
  const post = findVisiblePost(posts, params.slug, readRuntimeEnv())
  if (!post) {
    notFound()
  }

  const related = isPublishedPost(post)
    ? published.filter((item) => item.slug !== post.slug).slice(0, 3)
    : []

  return (
    <article className="flex min-h-screen flex-col">
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <BlogArticleHeader post={post} />
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <BlogArticleBody post={post} related={related} />
      </div>
    </article>
  )
}
