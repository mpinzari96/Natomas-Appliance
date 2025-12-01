import { Phone } from "lucide-react"

interface PhoneLinkProps {
  className?: string
  showIcon?: boolean
  iconClassName?: string
  textClassName?: string
}

export function PhoneLink({ className, showIcon = true, iconClassName, textClassName }: PhoneLinkProps) {
 return (
   <a href="tel:9169054476" className={`flex items-center gap-2 ${className || ""}`}>
     {showIcon && <Phone className={`h-4 w-4 ${iconClassName || ""}`} />}
     <span className={textClassName || ""}>(916) 905-4476</span>
   </a>
  )
}
