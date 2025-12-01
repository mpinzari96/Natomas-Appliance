"use client"

import { useEffect } from "react"

interface CalendlyWidgetProps {
  url: string
  height?: number
}

export function CalendlyWidget({ url, height = 700 }: CalendlyWidgetProps) {
  useEffect(() => {
    // Load the Calendly script
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget w-full rounded-lg border shadow-sm"
      data-url={url}
      style={{ minWidth: "320px", height: `${height}px` }}
    />
  )
}
