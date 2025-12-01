import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Natomas Appliance",
  description:
    "Contact Natomas Appliance for professional appliance repair services in Sacramento and surrounding areas.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
