"use client"

import type React from "react"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    HCPWidget: {
      openModal: () => void
    }
  }
}

interface HousecallProButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

export function HousecallProButton({
  className,
  variant = "default",
  size = "default",
  children = "Book",
}: HousecallProButtonProps) {
  useEffect(() => {
    // Load the Housecall Pro script if it hasn't been loaded already
    if (!document.querySelector('script[src*="housecallpro.com/script.js"]')) {
      const script = document.createElement("script")
      script.src =
        "https://online-booking.housecallpro.com/script.js?token=c30df0e7abcd4770a92e84493a3c2245&orgName=Natomas-Appliance"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const handleClick = () => {
    if (window.HCPWidget && typeof window.HCPWidget.openModal === "function") {
      window.HCPWidget.openModal()
    }
  }

  return (
    <Button
      data-token="c30df0e7abcd4770a92e84493a3c2245"
      data-orgname="Natomas-Appliance"
      className={`hcp-button ${className || ""}`}
      onClick={handleClick}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  )
}
