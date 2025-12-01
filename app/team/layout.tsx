import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meet the Team - Natomas Appliance",
  description:
    "Meet our expert appliance repair technicians serving the Natomas area. Certified professionals dedicated to exceptional service.",
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
