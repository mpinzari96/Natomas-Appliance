import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meet the Team | Natomas Appliance",
  description:
    "Meet the experienced appliance repair professionals at Natomas Appliance. Our certified technicians are dedicated to providing quality service.",
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
