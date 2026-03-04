"use client"

import { useEffect } from "react"

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

export function GoogleTracking() {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []

    // Define gtag function
    function gtag(...args: unknown[]) {
      window.dataLayer.push(arguments as unknown as Record<string, unknown>)
    }
    window.gtag = gtag

    // --- Google Tag Manager ---
    if (GTM_ID) {
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      })
      const gtmScript = document.createElement("script")
      gtmScript.async = true
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
      document.head.appendChild(gtmScript)
    }

    // --- Google Ads (gtag.js) ---
    const gtagScript = document.createElement("script")
    gtagScript.async = true
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
    document.head.appendChild(gtagScript)

    gtagScript.onload = () => {
      gtag("js", new Date())
      gtag("config", GOOGLE_ADS_ID)
    }

    // --- Conversion tracking function ---
    window.gtag_report_conversion = function (url: string) {
      const callback = function () {
        if (typeof url !== "undefined") {
          window.location.href = url
        }
      }
      gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`,
        event_callback: callback,
      })
      return false
    }
  }, [])

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
    </>
  )
}
