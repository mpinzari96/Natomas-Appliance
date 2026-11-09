import Link from "next/link"

import { splitLinkedText } from "@/lib/blog/safe-links"

export function BlogRichText({ text }: { text: string }) {
  return (
    <>
      {splitLinkedText(text).map((span, index) => {
        if (span.type === "text") {
          return <span key={index}>{span.text}</span>
        }
        if (span.href.startsWith("tel:") || span.href.startsWith("https://")) {
          return (
            <a key={index} href={span.href} className="text-primary hover:underline">
              {span.label}
            </a>
          )
        }
        return (
          <Link key={index} href={span.href} className="text-primary hover:underline">
            {span.label}
          </Link>
        )
      })}
    </>
  )
}
