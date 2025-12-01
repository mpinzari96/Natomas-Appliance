import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brands We Service | Natomas Appliance",
  description:
    "Natomas Appliance repairs all major appliance brands including Whirlpool, GE, LG, Samsung, Maytag, and many more.",
}

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
