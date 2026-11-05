# How to add a blog post

A new published post is one JSON file plus any photos. You do not add a route, a React page, or a sitemap entry.

## Files

1. Create `content/blog/<slug>.json`. Use a lowercase kebab-case slug that matches the file name, such as `washer-drain-check.json`.
2. Put photos in `public/images/blog/<slug>/`. Name them clearly, for example `hero.jpg` and `drain-hose.jpg`.
3. Point image `src` values at those public paths, such as `/images/blog/washer-drain-check/hero.jpg`.

The next production build picks up the file, lists it on `/blog` when `status` is `"published"`, renders `/blog/<slug>`, and adds it to `/blog/sitemap.xml`.

## Required fields

- `slug`, `title`, `excerpt`, `seoTitle`, `seoDescription`, `status`, `intro`, `body`
- For `status: "published"`: `publishedAt` as a real `YYYY-MM-DD` date. Add `modifiedAt` only when the article actually changed on that date.
- `seoTitle` is the full document title. Do not append `| Natomas Appliance` in a layout. If the title should include the brand, put it in `seoTitle` once.
- `seoTitle` and `seoDescription` must be unique across posts.

`status` is `"draft"`, `"published"`, or `"fixture"`. Drafts and fixtures never appear on the index, in navigation, or in the sitemap. On production they 404. They render only in local `next dev` and on Vercel preview deployments, with `noindex,nofollow`.

Do not set `publishedAt` until the article is actually published. Do not invent dates, author credentials, or business facts.

## Body

`body` is an array of blocks:

- `{ "type": "heading", "level": 2 or 3, "text": "..." }`
- `{ "type": "paragraph", "text": "..." }`
- `{ "type": "image", "image": { ... } }`

The page title is the only H1. Do not put an H1 in `body`.

## Images

Hero (optional, 16:9) also becomes the index card thumbnail:

```json
"hero": {
  "kind": "photo",
  "src": "/images/blog/<slug>/hero.jpg",
  "alt": "What the photo actually shows",
  "caption": "Optional caption",
  "fit": "cover"
}
```

Inline diagnostic photos are optional. Use `"fit": "contain"` when labels or part edges must stay uncropped.

Omit `hero` and image blocks when you have no photo. Those slots disappear. Do not use stock photos, fake repair photos, or empty `src` values.

Before you commit a photo, strip GPS and other location metadata. Use owned or licensed images. Do not show customer faces, house numbers, or street addresses.

`kind: "placeholder"` is only for unpublished preview files (draft or fixture). Placeholders are invalid on published posts. Production 404s drafts and fixtures, so labeled intended-shot boxes never appear on the live site.

## Optional article sections

Omit any of these keys, or use an empty array, when you have no approved copy. The section will not render.

- `homeownerChecks`: safe observations a homeowner can make
- `technicianOnly`: work that needs a technician
- `serviceLinks`: `{ "href": "/services/..." , "label": "..." }`
- `areaLinks`: `{ "href": "/service-areas/..." , "label": "..." }`

Related posts appear only when at least one other published post exists.

The closing phone and booking CTA is already on the article page. Do not duplicate it in JSON.

## Preview files in this folder

`refrigerator-not-cooling-sacramento.json` is a real draft for preview review. It is not published. It has no publication date.

`preview-fixture-no-image.json` is a labeled synthetic template used to check empty image slots. It is not an article. Keep it `status: "fixture"`.

## After launch: add the public Blog link

Navigation launch is a separate approval. When that approval is given, add a `Link` to `/blog` next to Testimonials in:

- `components/site-header.tsx`
- `components/mobile-nav.tsx`

You can add the same link in `components/site-footer.tsx` under Quick Links. No blog files need to change.
