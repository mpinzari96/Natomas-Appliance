import { z } from "zod"

import { disallowedMarkdownHrefs } from "./safe-links"
import type {
  BlogBodyBlock,
  BlogImage,
  BlogPost,
  BlogSlug,
  FixtureBlogPost,
  IsoDate,
  PublishedBlogPost,
} from "./types"

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/
const PHOTO_SRC_PATTERN = /^\/images\/blog\/[A-Za-z0-9._/-]+$/
const SERVICE_HREF_PATTERN = /^\/services(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/
const AREA_HREF_PATTERN = /^\/service-areas(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/

function brandSlug(value: string): BlogSlug {
  return value as BlogSlug
}

function brandIsoDate(value: string): IsoDate {
  return value as IsoDate
}

function isRealCalendarDate(value: string): boolean {
  const match = ISO_DATE_PATTERN.exec(value)
  if (!match) {
    return false
  }
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

const isoDateSchema = z
  .string()
  .regex(ISO_DATE_PATTERN, "must be YYYY-MM-DD")
  .refine(isRealCalendarDate, "must be a real calendar date")

const photoImageSchema = z
  .object({
    kind: z.literal("photo"),
    src: z.string().regex(PHOTO_SRC_PATTERN, "must be a /images/blog/... path"),
    alt: z.string().trim().min(1, "alt is required"),
    caption: z.string().trim().min(1).optional(),
    fit: z.enum(["cover", "contain"]),
  })
  .strict()

const placeholderImageSchema = z
  .object({
    kind: z.literal("placeholder"),
    label: z.string().trim().min(1, "placeholder label is required"),
    alt: z.string().trim().min(1, "alt is required"),
    caption: z.string().trim().min(1).optional(),
    aspect: z.enum(["16:9", "4:3"]),
    fit: z.enum(["cover", "contain"]),
  })
  .strict()

const imageSchema = z.discriminatedUnion("kind", [photoImageSchema, placeholderImageSchema])

const headingBlockSchema = z
  .object({
    type: z.literal("heading"),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string().trim().min(1),
  })
  .strict()

const paragraphBlockSchema = z
  .object({
    type: z.literal("paragraph"),
    text: z.string().trim().min(1),
  })
  .strict()

const imageBlockSchema = z
  .object({
    type: z.literal("image"),
    image: imageSchema,
  })
  .strict()

const listBlockSchema = z
  .object({
    type: z.literal("list"),
    ordered: z.boolean(),
    items: z.array(z.string().trim().min(1)).min(1),
  })
  .strict()

const bodyBlockSchema = z.discriminatedUnion("type", [
  headingBlockSchema,
  paragraphBlockSchema,
  imageBlockSchema,
  listBlockSchema,
])

const serviceLinkSchema = z
  .object({
    href: z.string().regex(SERVICE_HREF_PATTERN, "must be a /services or /services/[slug] path"),
    label: z.string().trim().min(1),
  })
  .strict()

const areaLinkSchema = z
  .object({
    href: z.string().regex(AREA_HREF_PATTERN, "must be a /service-areas or /service-areas/[slug] path"),
    label: z.string().trim().min(1),
  })
  .strict()

const postInputSchema = z
  .object({
    slug: z.string().regex(SLUG_PATTERN, "must be lowercase kebab-case"),
    title: z.string().trim().min(1),
    excerpt: z.string().trim().min(1),
    seoTitle: z.string().trim().min(1),
    seoDescription: z.string().trim().min(1),
    status: z.enum(["published", "draft", "fixture"]),
    publishedAt: isoDateSchema.optional(),
    modifiedAt: isoDateSchema.optional(),
    intro: z.string().trim().min(1),
    body: z.array(bodyBlockSchema).min(1),
    hero: imageSchema.optional(),
    homeownerChecks: z.array(z.string().trim().min(1)).optional(),
    technicianOnly: z.array(z.string().trim().min(1)).optional(),
    serviceLinks: z.array(serviceLinkSchema).optional(),
    areaLinks: z.array(areaLinkSchema).optional(),
  })
  .strict()

export type ParseBlogPostResult =
  | { ok: true; post: BlogPost }
  | { ok: false; issues: string[] }

function formatIssue(fileName: string, path: string, message: string): string {
  return path ? `${fileName}: ${path} ${message}` : `${fileName}: ${message}`
}

function collectLinkedText(value: z.infer<typeof postInputSchema>): Array<[string, string]> {
  const fields: Array<[string, string]> = [
    ["intro", value.intro],
    ["excerpt", value.excerpt],
  ]
  for (const [index, item] of (value.homeownerChecks ?? []).entries()) {
    fields.push([`homeownerChecks.${index}`, item])
  }
  for (const [index, item] of (value.technicianOnly ?? []).entries()) {
    fields.push([`technicianOnly.${index}`, item])
  }
  for (const [index, block] of value.body.entries()) {
    if (block.type === "paragraph" || block.type === "heading") {
      fields.push([`body.${index}.text`, block.text])
    }
    if (block.type === "list") {
      for (const [itemIndex, item] of block.items.entries()) {
        fields.push([`body.${index}.items.${itemIndex}`, item])
      }
    }
  }
  return fields
}

function collectImages(hero: BlogImage | undefined, body: BlogBodyBlock[]): BlogImage[] {
  const images: BlogImage[] = []
  if (hero) {
    images.push(hero)
  }
  for (const block of body) {
    if (block.type === "image") {
      images.push(block.image)
    }
  }
  return images
}

export function parseBlogPostFile(input: { data: unknown; fileName: string }): ParseBlogPostResult {
  const parsed = postInputSchema.safeParse(input.data)
  if (!parsed.success) {
    return {
      ok: false,
      issues: parsed.error.issues.map((issue) =>
        formatIssue(input.fileName, issue.path.join("."), issue.message),
      ),
    }
  }

  const value = parsed.data
  const issues: string[] = []
  const images = collectImages(value.hero, value.body)
  const hasPlaceholder = images.some((image) => image.kind === "placeholder")

  if (value.status === "published") {
    if (!value.publishedAt) {
      issues.push(formatIssue(input.fileName, "publishedAt", "is required for published posts"))
    }
  } else if (value.publishedAt) {
    issues.push(
      formatIssue(input.fileName, "publishedAt", "is only allowed on published posts"),
    )
  }

  if (value.modifiedAt && value.status !== "published") {
    issues.push(
      formatIssue(input.fileName, "modifiedAt", "is only allowed on published posts"),
    )
  }

  if (value.publishedAt && value.modifiedAt && value.modifiedAt < value.publishedAt) {
    issues.push(formatIssue(input.fileName, "modifiedAt", "must be on or after publishedAt"))
  }

  if (value.status === "published" && hasPlaceholder) {
    issues.push(
      formatIssue(input.fileName, "hero/body", "placeholders are not allowed on published posts"),
    )
  }

  for (const [path, text] of collectLinkedText(value)) {
    for (const href of disallowedMarkdownHrefs(text)) {
      issues.push(formatIssue(input.fileName, path, `contains a disallowed link (${href})`))
    }
  }

  if (issues.length > 0) {
    return { ok: false, issues }
  }

  const fields = {
    slug: brandSlug(value.slug),
    fileName: input.fileName,
    title: value.title,
    excerpt: value.excerpt,
    seoTitle: value.seoTitle,
    seoDescription: value.seoDescription,
    intro: value.intro,
    body: value.body,
    hero: value.hero,
    homeownerChecks: value.homeownerChecks ?? [],
    technicianOnly: value.technicianOnly ?? [],
    serviceLinks: value.serviceLinks ?? [],
    areaLinks: value.areaLinks ?? [],
  }

  if (value.status === "published" && value.publishedAt) {
    const post: PublishedBlogPost = {
      ...fields,
      status: "published",
      publishedAt: brandIsoDate(value.publishedAt),
      modifiedAt: value.modifiedAt ? brandIsoDate(value.modifiedAt) : undefined,
    }
    return { ok: true, post }
  }

  if (value.status === "fixture") {
    const post: FixtureBlogPost = {
      ...fields,
      status: "fixture",
    }
    return { ok: true, post }
  }

  return {
    ok: true,
    post: {
      ...fields,
      status: "draft",
    },
  }
}

export function formatBlogDate(date: IsoDate): string {
  const [year, month, day] = date.split("-").map(Number)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))
}
