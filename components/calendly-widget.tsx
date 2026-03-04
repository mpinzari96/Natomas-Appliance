"use client"

import { useEffect } from "react"

interface CalendlyWidgetProps {
  url: string
  height?: number
}

export function CalendlyWidget({ url, height = 700 }: CalendlyWidgetProps) {
  useEffect(() => {
    // Only load Calendly on actual deployed domains
    const host = window.location.hostname
    const isProd =
      window.location.protocol === "https:" &&
      !host.includes("localhost") &&
      (host.endsWith(".vercel.app") || host.includes("natomasappliance"))
    if (!isProd) return

    fetch("https://assets.calendly.com/assets/external/widget.js")
      .then((r) => r.text())
      .then((code) => { try { new Function(code)() } catch {} })
      .catch(() => {})
  }, [])

  return (
    <div
      className="calendly-inline-widget w-full rounded-lg border shadow-sm"
      data-url={url}
      style={{ minWidth: "320px", height: `${height}px` }}
    />
  )
}
