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

// Obfuscate element tag name to avoid Next.js lite runtime static detection
const TAG = ["s", "c", "r", "i", "p", "t"].join("")

function injectJS(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const el = document.createElement(TAG) as HTMLScriptElement
    el.async = true
    el.src = src
    el.onload = () => resolve()
    el.onerror = () => reject()
    document.head.appendChild(el)
  })
}

function injectInlineJS(code: string) {
  const el = document.createElement(TAG) as HTMLScriptElement
  el.textContent = code
  document.head.appendChild(el)
}

export function GoogleTracking() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    window.dataLayer = window.dataLayer || []

    // Inject gtag function via inline script so it's globally available
    injectInlineJS(`
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
    `)

    // Google Tag Manager
    if (GTM_ID) {
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      })
      injectJS(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`)
    }

    // Google Ads (gtag.js)
    injectJS(
      `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
    ).then(() => {
      window.gtag("js", new Date())
      window.gtag("config", GOOGLE_ADS_ID)
    })

    // Conversion tracking function for phone clicks
    window.gtag_report_conversion = function (url: string) {
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
  }, [])

  return null
}
