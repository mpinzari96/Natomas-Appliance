export type BlogSlug = string & { readonly __brand: "BlogSlug" }
export type IsoDate = string & { readonly __brand: "IsoDate" }

export type ImageFit = "cover" | "contain"
export type ImageAspect = "16:9" | "4:3"

export type PhotoImage = {
  kind: "photo"
  src: string
  alt: string
  caption?: string
  fit: ImageFit
}

export type PlaceholderImage = {
  kind: "placeholder"
  label: string
  alt: string
  caption?: string
  aspect: ImageAspect
  fit: ImageFit
}

export type BlogImage = PhotoImage | PlaceholderImage

export type BlogHeadingBlock = {
  type: "heading"
  level: 2 | 3
  text: string
}

export type BlogParagraphBlock = {
  type: "paragraph"
  text: string
}

export type BlogImageBlock = {
  type: "image"
  image: BlogImage
}

export type BlogListBlock = {
  type: "list"
  ordered: boolean
  items: string[]
}

export type BlogBodyBlock = BlogHeadingBlock | BlogParagraphBlock | BlogImageBlock | BlogListBlock

export type BlogLink = {
  href: string
  label: string
}

type BlogPostFields = {
  slug: BlogSlug
  fileName: string
  title: string
  excerpt: string
  seoTitle: string
  seoDescription: string
  intro: string
  body: BlogBodyBlock[]
  hero?: BlogImage
  homeownerChecks: string[]
  technicianOnly: string[]
  serviceLinks: BlogLink[]
  areaLinks: BlogLink[]
}

export type PublishedBlogPost = BlogPostFields & {
  status: "published"
  publishedAt: IsoDate
  modifiedAt?: IsoDate
}

export type DraftBlogPost = BlogPostFields & {
  status: "draft"
}

export type FixtureBlogPost = BlogPostFields & {
  status: "fixture"
}

export type BlogPost = PublishedBlogPost | DraftBlogPost | FixtureBlogPost

export type BlogCatalog = {
  posts: BlogPost[]
  published: PublishedBlogPost[]
}

export type RuntimeEnv = {
  NODE_ENV?: string
  VERCEL_ENV?: string
}

export class BlogCatalogError extends Error {
  readonly issues: string[]

  constructor(issues: string[]) {
    super(`Invalid blog catalog:\n${issues.map((issue) => `- ${issue}`).join("\n")}`)
    this.name = "BlogCatalogError"
    this.issues = issues
  }
}
