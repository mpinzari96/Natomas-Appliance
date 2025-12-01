import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Natomas Appliance",
  description:
    "Professional appliance repair and maintenance services for all major brands and models in Sacramento and surrounding areas.",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
