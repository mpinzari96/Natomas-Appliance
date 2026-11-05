import assert from "node:assert/strict"
import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { test } from "node:test"

import { loadBlogCatalog, resetBlogCatalogCache } from "./load-posts"
import { blogIndexMetadata, blogPostMetadata } from "./metadata"
import { publishedSitemapEntries } from "./sitemap-entries"
import { BlogCatalogError, type BlogPost } from "./types"
import { findVisiblePost, isPostVisible, isUnpublishedPreviewAllowed } from "./visibility"

const productionEnv = { NODE_ENV: "production", VERCEL_ENV: "production" }
const previewEnv = { NODE_ENV: "production", VERCEL_ENV: "preview" }
const localProductionEnv = { NODE_ENV: "production" }
const localDevEnv = { NODE_ENV: "development" }

function writePost(dir: string, fileName: string, post: Record<string, unknown>): void {
  writeFileSync(join(dir, fileName), `${JSON.stringify(post, null, 2)}\n`)
}

function publishedSource(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    slug: "washer-drain-check",
    title: "Washer drain check",
    excerpt: "A short published excerpt.",
    seoTitle: "Washer drain check | Natomas Appliance",
    seoDescription: "Published washer drain article description.",
    status: "published",
    publishedAt: "2026-10-02",
    intro: "A brief published intro.",
    body: [
      { type: "heading", level: 2, text: "Before you call" },
      { type: "paragraph", text: "Look at the drain hose." },
    ],
    ...overrides,
  }
}

function fixtureSource(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    slug: "preview-fixture-template",
    title: "Preview fixture template",
    excerpt: "Synthetic fixture excerpt.",
    seoTitle: "Preview fixture template (not for publication)",
    seoDescription: "Synthetic fixture description. Not a published article.",
    status: "fixture",
    intro: "PREVIEW-FIXTURE-TEMPLATE-NOT-FOR-PUBLICATION",
    body: [{ type: "paragraph", text: "Replace this paragraph with approved copy." }],
    ...overrides,
  }
}

function loadFrom(posts: Array<[string, Record<string, unknown>]>) {
  const dir = mkdtempSync(join(tmpdir(), "blog-catalog-"))
  for (const [fileName, post] of posts) {
    writePost(dir, fileName, post)
  }
  resetBlogCatalogCache()
  return loadBlogCatalog({ contentDir: dir })
}

test("published posts are newest-first and drafts are omitted from the public list", () => {
  const catalog = loadFrom([
    [
      "older.json",
      publishedSource({
        slug: "older-post",
        seoTitle: "Older post title",
        seoDescription: "Older post description.",
        publishedAt: "2026-01-01",
      }),
    ],
    [
      "newer.json",
      publishedSource({
        slug: "newer-post",
        seoTitle: "Newer post title",
        seoDescription: "Newer post description.",
        publishedAt: "2026-10-02",
      }),
    ],
    [
      "draft.json",
      {
        ...fixtureSource({
          slug: "draft-post",
          status: "draft",
          seoTitle: "Draft post title",
          seoDescription: "Draft post description.",
          intro: "Draft intro.",
        }),
      },
    ],
  ])

  assert.deepEqual(
    catalog.published.map((post) => post.slug),
    ["newer-post", "older-post"],
  )
  assert.equal(
    catalog.published.some((post) => post.status !== "published"),
    false,
  )
})

test("slug lookup returns the matching post", () => {
  const catalog = loadFrom([
    ["one.json", publishedSource()],
    [
      "two.json",
      publishedSource({
        slug: "dryer-lint-check",
        seoTitle: "Dryer lint check | Natomas Appliance",
        seoDescription: "Published dryer lint article description.",
      }),
    ],
  ])

  const found = findVisiblePost(catalog.posts, "dryer-lint-check", productionEnv)
  assert.equal(found?.title, "Washer drain check")
  assert.equal(found?.slug, "dryer-lint-check")
  assert.equal(findVisiblePost(catalog.posts, "missing-slug", productionEnv), undefined)
})

test("unknown slugs and unpublished production routes resolve as not visible", () => {
  const catalog = loadFrom([
    ["fixture.json", fixtureSource()],
    [
      "draft.json",
      fixtureSource({
        slug: "draft-article",
        status: "draft",
        seoTitle: "Draft article title",
        seoDescription: "Draft article description.",
        intro: "Draft intro.",
      }),
    ],
  ])

  assert.equal(findVisiblePost(catalog.posts, "preview-fixture-template", productionEnv), undefined)
  assert.equal(findVisiblePost(catalog.posts, "draft-article", localProductionEnv), undefined)
  assert.equal(findVisiblePost(catalog.posts, "does-not-exist", previewEnv), undefined)
})

test("fixture and draft posts 404 in production and local production-mode, and render only on preview or local development", () => {
  const catalog = loadFrom([
    ["fixture.json", fixtureSource()],
    [
      "draft.json",
      fixtureSource({
        slug: "draft-article",
        status: "draft",
        seoTitle: "Draft article title",
        seoDescription: "Draft article description.",
        intro: "Draft intro.",
      }),
    ],
  ])
  const fixture = catalog.posts.find((post) => post.slug === "preview-fixture-template")
  const draft = catalog.posts.find((post) => post.slug === "draft-article")
  assert.ok(fixture)
  assert.ok(draft)

  assert.equal(isUnpublishedPreviewAllowed(productionEnv), false)
  assert.equal(isUnpublishedPreviewAllowed(localProductionEnv), false)
  assert.equal(isUnpublishedPreviewAllowed(previewEnv), true)
  assert.equal(isUnpublishedPreviewAllowed(localDevEnv), true)

  assert.equal(isPostVisible(fixture, productionEnv), false)
  assert.equal(isPostVisible(draft, productionEnv), false)
  assert.equal(isPostVisible(fixture, localProductionEnv), false)
  assert.equal(isPostVisible(fixture, previewEnv), true)
  assert.equal(isPostVisible(draft, localDevEnv), true)
  assert.equal(catalog.published.length, 0)
})

test("image slots are omitted when hero and inline image fields are absent", () => {
  const catalog = loadFrom([
    [
      "no-image.json",
      publishedSource({
        slug: "no-image-post",
        seoTitle: "No image post",
        seoDescription: "No image description.",
      }),
    ],
  ])
  const post = catalog.published[0]
  assert.equal(post.hero, undefined)
  assert.equal(
    post.body.some((block) => block.type === "image"),
    false,
  )
})

test("adding a second content file is enough to load another post without a route map", () => {
  const catalog = loadFrom([
    ["fixture-one.json", fixtureSource()],
    [
      "fixture-two.json",
      fixtureSource({
        slug: "preview-fixture-no-image",
        title: "Preview fixture without images",
        excerpt: "Synthetic no-image fixture excerpt.",
        seoTitle: "Preview fixture without images (not for publication)",
        seoDescription: "Synthetic no-image fixture description.",
        intro: "PREVIEW-FIXTURE-NO-IMAGE-NOT-FOR-PUBLICATION",
      }),
    ],
  ])

  const slugs = catalog.posts.map((post) => post.slug).sort()
  assert.deepEqual(slugs, ["preview-fixture-no-image", "preview-fixture-template"])
  assert.equal(
    catalog.posts.every((post: BlogPost) => post.status === "fixture"),
    true,
  )
})

test("duplicate slugs fail the catalog", () => {
  assert.throws(
    () =>
      loadFrom([
        ["one.json", publishedSource()],
        [
          "two.json",
          publishedSource({
            seoTitle: "Other title",
            seoDescription: "Other description.",
          }),
        ],
      ]),
    (error: unknown) => {
      assert.ok(error instanceof BlogCatalogError)
      assert.match(error.message, /duplicates/)
      return true
    },
  )
})

test("invalid slugs fail the catalog", () => {
  assert.throws(
    () => loadFrom([["bad.json", publishedSource({ slug: "Not A Slug" })]]),
    (error: unknown) => {
      assert.ok(error instanceof BlogCatalogError)
      assert.match(error.message, /kebab-case/)
      return true
    },
  )
})

test("published posts require publication fields", () => {
  assert.throws(
    () =>
      loadFrom([
        [
          "missing-date.json",
          publishedSource({
            publishedAt: undefined,
          }),
        ],
      ]),
    (error: unknown) => {
      assert.ok(error instanceof BlogCatalogError)
      assert.match(error.message, /publishedAt/)
      return true
    },
  )
})

test("image alt is required", () => {
  assert.throws(
    () =>
      loadFrom([
        [
          "alt.json",
          publishedSource({
            hero: {
              kind: "photo",
              src: "/images/blog/washer-drain-check/hero.jpg",
              alt: "",
              fit: "cover",
            },
          }),
        ],
      ]),
    (error: unknown) => {
      assert.ok(error instanceof BlogCatalogError)
      assert.match(error.message, /alt/)
      return true
    },
  )
})

test("invalid dates fail the catalog", () => {
  assert.throws(
    () => loadFrom([["date.json", publishedSource({ publishedAt: "2026-13-40" })]]),
    (error: unknown) => {
      assert.ok(error instanceof BlogCatalogError)
      assert.match(error.message, /date/)
      return true
    },
  )
})

test("fixture posts cannot carry a publication date", () => {
  assert.throws(
    () => loadFrom([["fixture.json", fixtureSource({ publishedAt: "2026-10-02" })]]),
    (error: unknown) => {
      assert.ok(error instanceof BlogCatalogError)
      assert.match(error.message, /publishedAt/)
      return true
    },
  )
})

test("disallowed markdown links fail the catalog", () => {
  assert.throws(
    () =>
      loadFrom([
        [
          "links.json",
          publishedSource({
            intro: "See [this](https://example.com/not-allowed).",
          }),
        ],
      ]),
    (error: unknown) => {
      assert.ok(error instanceof BlogCatalogError)
      assert.match(error.message, /disallowed link/)
      return true
    },
  )
})

test("placeholders are rejected on published posts", () => {
  assert.throws(
    () =>
      loadFrom([
        [
          "placeholder.json",
          publishedSource({
            hero: {
              kind: "placeholder",
              label: "Intended shot",
              alt: "Placeholder",
              aspect: "16:9",
              fit: "cover",
            },
          }),
        ],
      ]),
    (error: unknown) => {
      assert.ok(error instanceof BlogCatalogError)
      assert.match(error.message, /placeholders are not allowed on published posts/)
      return true
    },
  )
})

test("sitemap entries include only published posts and their genuine dates", () => {
  const catalog = loadFrom([
    ["fixture.json", fixtureSource()],
    [
      "older.json",
      publishedSource({
        slug: "older-post",
        seoTitle: "Older post title",
        seoDescription: "Older post description.",
        publishedAt: "2026-01-01",
        modifiedAt: "2026-02-01",
      }),
    ],
    [
      "newer.json",
      publishedSource({
        slug: "newer-post",
        seoTitle: "Newer post title",
        seoDescription: "Newer post description.",
        publishedAt: "2026-10-02",
      }),
    ],
  ])

  assert.deepEqual(publishedSitemapEntries(catalog.published), [
    { url: "https://www.natomasappliance.com/blog", lastModified: "2026-10-02" },
    { url: "https://www.natomasappliance.com/blog/newer-post", lastModified: "2026-10-02" },
    { url: "https://www.natomasappliance.com/blog/older-post", lastModified: "2026-02-01" },
  ])
})

test("empty published catalog has an empty sitemap and a noindex index", () => {
  const catalog = loadFrom([["fixture.json", fixtureSource()]])
  assert.deepEqual(publishedSitemapEntries(catalog.published), [])
  const metadata = blogIndexMetadata(catalog.published)
  assert.deepEqual(metadata.robots, { index: false, follow: false })
  assert.equal(metadata.alternates?.canonical, "https://www.natomasappliance.com/blog")
})

test("fixture metadata is noindex and omits Open Graph images", () => {
  const catalog = loadFrom([
    [
      "fixture.json",
      fixtureSource({
        hero: {
          kind: "placeholder",
          label: "Intended shot: 16:9 hero",
          alt: "Labeled intended-shot placeholder, not a real photo.",
          aspect: "16:9",
          fit: "cover",
        },
      }),
    ],
  ])
  const fixture = catalog.posts[0]
  const metadata = blogPostMetadata(fixture)
  assert.deepEqual(metadata.robots, { index: false, follow: false })
  assert.equal(metadata.openGraph?.images, undefined)
  assert.equal(metadata.twitter && "images" in metadata.twitter ? metadata.twitter.images : undefined, undefined)
})

test("draft posts may include labeled placeholders and stay off the published list", () => {
  const catalog = loadFrom([
    [
      "draft.json",
      fixtureSource({
        slug: "draft-with-placeholder",
        status: "draft",
        seoTitle: "Draft with placeholder",
        seoDescription: "Draft placeholder description.",
        intro: "Draft intro.",
        hero: {
          kind: "placeholder",
          label: "Intended shot: 16:9 hero",
          alt: "Labeled intended-shot placeholder, not a real photo.",
          aspect: "16:9",
          fit: "cover",
        },
      }),
    ],
  ])
  assert.equal(catalog.published.length, 0)
  assert.equal(catalog.posts[0]?.status, "draft")
  assert.equal(catalog.posts[0]?.hero?.kind, "placeholder")
  assert.equal(isPostVisible(catalog.posts[0], productionEnv), false)
  assert.equal(isPostVisible(catalog.posts[0], previewEnv), true)
})

test("committed catalog publishes the refrigerator article and keeps the no-image fixture unpublished", () => {
  resetBlogCatalogCache()
  const catalog = loadBlogCatalog()
  const slugs = catalog.posts.map((post) => post.slug).sort()
  assert.deepEqual(slugs, ["preview-fixture-no-image", "refrigerator-not-cooling-sacramento"])
  const article = catalog.posts.find((post) => post.slug === "refrigerator-not-cooling-sacramento")
  const fixture = catalog.posts.find((post) => post.slug === "preview-fixture-no-image")
  assert.equal(article?.status, "published")
  assert.equal(article && "publishedAt" in article ? article.publishedAt : undefined, "2026-11-05")
  assert.equal(article?.hero, undefined)
  assert.equal(article?.body.some((block) => block.type === "image"), false)
  assert.equal(fixture?.status, "fixture")
  assert.equal(catalog.published.length, 1)
  assert.equal(catalog.published[0]?.slug, "refrigerator-not-cooling-sacramento")
  assert.equal(isPostVisible(article!, productionEnv), true)
  assert.equal(isPostVisible(fixture!, productionEnv), false)
  assert.deepEqual(publishedSitemapEntries(catalog.published), [
    { url: "https://www.natomasappliance.com/blog", lastModified: "2026-11-05" },
    {
      url: "https://www.natomasappliance.com/blog/refrigerator-not-cooling-sacramento",
      lastModified: "2026-11-05",
    },
  ])
})

test("published metadata uses the absolute SEO title and a photo only when the hero is real", () => {
  const catalog = loadFrom([
    [
      "photo.json",
      publishedSource({
        hero: {
          kind: "photo",
          src: "/images/blog/washer-drain-check/hero.jpg",
          alt: "Washer drain hose behind a machine.",
          fit: "cover",
        },
      }),
    ],
  ])
  const metadata = blogPostMetadata(catalog.published[0])
  assert.deepEqual(metadata.title, { absolute: "Washer drain check | Natomas Appliance" })
  assert.equal(metadata.alternates?.canonical, "https://www.natomasappliance.com/blog/washer-drain-check")
  assert.deepEqual(metadata.openGraph?.images, [
    { url: "/images/blog/washer-drain-check/hero.jpg", alt: "Washer drain hose behind a machine." },
  ])
})
