"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
    gtag_report_conversion: (url: string) => boolean
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ""
const GOOGLE_ADS_ID = "AW-10844025205"
const CONVERSION_LABEL = "w2TDCJX6wr8aEPXi6rIo"

// Check if we're running in a real production deployment (not v0 preview)
const IS_PROD =
  typeof window !== "undefined" &&
  window.location.protocol === "https:" &&
  !window.location.hostname.includes("localhost") &&
  // Only load on actual deployed domains, not any preview/sandbox
  (window.location.hostname.endsWith(".vercel.app") ||
    window.location.hostname.includes("natomasappliance"))

export function GoogleTracking() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Initialize dataLayer and gtag stubs (always available for conversion calls)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments as unknown as Record<string, unknown>)
    }

    // Stub conversion function so phone links work in all environments
    window.gtag_report_conversion = function (url: string) {
      if (!IS_PROD) {
        if (typeof url !== "undefined") {
          window.location.href = url
        }
        return false
      }
      const callback = function () {
        if (typeof url !== "undefined") {
          window.location.href = url
        }
      }
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`,
        event_callback: callback,
      })
      return false
    }

    // Only load external tracking scripts on deployed production site
    if (!IS_PROD) return

    // Google Tag Manager
    if (GTM_ID) {
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      })
      const gtmLink = document.createElement("link")
      gtmLink.rel = "preload"
      gtmLink.as = "fetch"
      gtmLink.href = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
      gtmLink.crossOrigin = "anonymous"
      document.head.appendChild(gtmLink)

      fetch(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`)
        .then((r) => r.text())
        .then((code) => { try { new Function(code)() } catch {} })
        .catch(() => {})
    }

    // Google Ads (gtag.js)
    fetch(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`)
      .then((r) => r.text())
      .then((code) => {
        try { new Function(code)() } catch {}
        window.gtag("js", new Date())
        window.gtag("config", GOOGLE_ADS_ID)
      })
      .catch(() => {})
  }, [])

  return null
}
