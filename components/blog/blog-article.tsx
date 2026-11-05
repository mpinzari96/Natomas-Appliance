import Link from "next/link"

import { BlogCta } from "@/components/blog/blog-cta"
import { BlogImageBlock } from "@/components/blog/blog-image"
import { BlogRichText } from "@/components/blog/blog-rich-text"
import { formatBlogDate } from "@/lib/blog/parse"
import type { BlogPost, PublishedBlogPost } from "@/lib/blog/types"

function StatusBanner({ post }: { post: BlogPost }) {
  if (post.status === "published") {
    return null
  }

  const label =
    post.status === "fixture"
      ? "Preview fixture. Not a published article. Template copy only."
      : "Draft article. Not published. Preview only."

  return (
    <p className="mb-6 rounded-md border border-dashed border-muted-foreground/40 bg-background px-4 py-3 text-sm font-medium">
      {label}
    </p>
  )
}

function ArticleBreadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-foreground">{title}</li>
      </ol>
    </nav>
  )
}

export function BlogArticleHeader({ post }: { post: BlogPost }) {
  return (
    <header className="mx-auto max-w-3xl">
      <ArticleBreadcrumb title={post.title} />
      <StatusBanner post={post} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
      {post.status === "published" ? (
        <p className="mt-3 text-sm text-muted-foreground">{formatBlogDate(post.publishedAt)}</p>
      ) : null}
      <p className="mt-4 text-lg text-muted-foreground">
        <BlogRichText text={post.intro} />
      </p>
    </header>
  )
}

export function BlogArticleBody({
  post,
  related,
}: {
  post: BlogPost
  related: PublishedBlogPost[]
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <BlogImageBlock image={post.hero} priority className="mt-0" />

      <div className="mt-8 space-y-4">
        {post.body.map((block, index) => {
          if (block.type === "heading" && block.level === 2) {
            return (
              <h2 key={index} className="pt-4 text-2xl font-semibold">
                {block.text}
              </h2>
            )
          }
          if (block.type === "heading") {
            return (
              <h3 key={index} className="pt-2 text-xl font-medium">
                {block.text}
              </h3>
            )
          }
          if (block.type === "image") {
            return <BlogImageBlock key={index} image={block.image} />
          }
          if (block.type === "list") {
            const ListTag = block.ordered ? "ol" : "ul"
            return (
              <ListTag
                key={index}
                className={
                  block.ordered
                    ? "list-decimal space-y-2 pl-5 text-muted-foreground"
                    : "list-disc space-y-2 pl-5 text-muted-foreground"
                }
              >
                {block.items.map((item) => (
                  <li key={item}>
                    <BlogRichText text={item} />
                  </li>
                ))}
              </ListTag>
            )
          }
          return (
            <p key={index} className="text-muted-foreground">
              <BlogRichText text={block.text} />
            </p>
          )
        })}
      </div>

      {post.homeownerChecks.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Safe homeowner checks</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {post.homeownerChecks.map((item) => (
              <li key={item}>
                <BlogRichText text={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {post.technicianOnly.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Technician-only work</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {post.technicianOnly.map((item) => (
              <li key={item}>
                <BlogRichText text={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {post.serviceLinks.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Related services</h2>
          <ul className="mt-4 space-y-2">
            {post.serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {post.areaLinks.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Service areas</h2>
          <ul className="mt-4 space-y-2">
            {post.areaLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Related posts</h2>
          <ul className="mt-4 space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="text-primary hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <BlogCta />
    </div>
  )
}
