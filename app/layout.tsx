import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleTracking } from "@/components/google-tracking"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.natomasappliance.com"),
  title: {
    default: "Natomas Appliance - Reliable Appliance Repair Services",
    template: "%s | Natomas Appliance",
  },
  description:
    "Professional appliance repair services for all brands and types of appliances in the Natomas area.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <GoogleTracking />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <SiteHeader />
            <main className="flex-1 overflow-x-hidden">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
