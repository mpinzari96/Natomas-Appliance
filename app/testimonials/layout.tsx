import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Testimonials | Natomas Appliance",
  description:
    "Read reviews from our satisfied customers about our appliance repair services in Sacramento and surrounding areas.",
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
