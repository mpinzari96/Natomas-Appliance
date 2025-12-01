import { Card, CardContent } from "@/components/ui/card"
import { HousecallProButton } from "@/components/housecall-pro-button"

interface AppointmentCardProps {
  title: string
  duration: string
  price: string
  description?: string
  variant?: "default" | "outline"
}

export function AppointmentCard({ title, duration, price, description, variant = "default" }: AppointmentCardProps) {
  return (
    <Card className={variant === "outline" ? "border shadow-sm" : ""}>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <h3 className="mb-2 text-xl font-medium">{title}</h3>
        <p className="mb-2 text-muted-foreground">
          {duration} {price && `| ${price}`}
        </p>
        {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
        <HousecallProButton className="min-w-24 bg-amber-500 font-medium uppercase hover:bg-amber-600">
          Book
        </HousecallProButton>
      </CardContent>
    </Card>
  )
}
