export type LinkedTextSpan =
  | { type: "text"; text: string }
  | { type: "link"; href: string; label: string }

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g
const INTERNAL_HREF = /^\/(services|service-areas|appointments|contact|blog)(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/
const TEL_HREF = /^tel:9169054476$/
const FDA_HREF = /^https:\/\/www\.fda\.gov\/[A-Za-z0-9._~:/?#@!$&'()*+,;=%-]*$/
const FSIS_HREF = /^https:\/\/www\.fsis\.usda\.gov\/[A-Za-z0-9._~:/?#@!$&'()*+,;=%-]*$/

export function isAllowedContentHref(href: string): boolean {
  return INTERNAL_HREF.test(href) || TEL_HREF.test(href) || FDA_HREF.test(href) || FSIS_HREF.test(href)
}

export function markdownLinksIn(text: string): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = []
  for (const match of text.matchAll(MARKDOWN_LINK)) {
    links.push({ label: match[1], href: match[2] })
  }
  return links
}

export function disallowedMarkdownHrefs(text: string): string[] {
  return markdownLinksIn(text)
    .map((link) => link.href)
    .filter((href) => !isAllowedContentHref(href))
}

export function splitLinkedText(text: string): LinkedTextSpan[] {
  const spans: LinkedTextSpan[] = []
  let cursor = 0
  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const index = match.index ?? 0
    if (index > cursor) {
      spans.push({ type: "text", text: text.slice(cursor, index) })
    }
    const href = match[2]
    if (isAllowedContentHref(href)) {
      spans.push({ type: "link", href, label: match[1] })
    } else {
      spans.push({ type: "text", text: match[0] })
    }
    cursor = index + match[0].length
  }
  if (cursor < text.length) {
    spans.push({ type: "text", text: text.slice(cursor) })
  }
  return spans.length > 0 ? spans : [{ type: "text", text }]
}
