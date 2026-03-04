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

function loadExternalScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const el = document.createElement("script")
    el.async = true
    el.src = src
    el.onload = () => resolve()
    el.onerror = () => reject()
    document.head.appendChild(el)
  })
}

export function GoogleTracking() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    window.dataLayer = window.dataLayer || []

    function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments as unknown as Record<string, unknown>)
    }
    window.gtag = gtag

    // Google Tag Manager
    if (GTM_ID) {
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      })
      loadExternalScript(
        `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
      )
    }

    // Google Ads (gtag.js)
    loadExternalScript(
      `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
    ).then(() => {
      gtag("js", new Date())
      gtag("config", GOOGLE_ADS_ID)
    })

    // Conversion tracking function for phone clicks
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

  // Render GTM noscript fallback via a hidden div with dangerouslySetInnerHTML
  if (!GTM_ID) return null

  return (
    <div
      aria-hidden="true"
      style={{ display: "none" }}
      dangerouslySetInnerHTML={{
        __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
      }}
    />
  )
}
