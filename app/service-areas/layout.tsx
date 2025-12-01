import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service Areas | Natomas Appliance",
  description:
    "Natomas Appliance provides professional appliance repair services throughout Sacramento County and surrounding areas.",
}

export default function ServiceAreasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
