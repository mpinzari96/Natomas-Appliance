"use client"

import { Phone } from "lucide-react"

declare global {
  interface Window {
    gtag_report_conversion?: (url: string) => boolean
  }
}

interface PhoneLinkProps {
  className?: string
  showIcon?: boolean
  iconClassName?: string
  textClassName?: string
  phoneNumber?: string
  displayNumber?: string
}

export function PhoneLink({
  className,
  showIcon = true,
  iconClassName,
  textClassName,
  phoneNumber = "9169054476",
  displayNumber = "(916) 905-4476",
}: PhoneLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.gtag_report_conversion) {
      e.preventDefault()
      window.gtag_report_conversion(`tel:${phoneNumber}`)
    }
  }

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className={`flex items-center gap-2 ${className || ""}`}
    >
      {showIcon && <Phone className={`h-4 w-4 ${iconClassName || ""}`} />}
      <span className={textClassName || ""}>{displayNumber}</span>
    </a>
  )
}
