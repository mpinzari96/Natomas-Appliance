import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Online Appointments | Natomas Appliance",
  description:
    "Schedule your appliance repair service online with Natomas Appliance. Fast, reliable service for all major brands.",
}

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
