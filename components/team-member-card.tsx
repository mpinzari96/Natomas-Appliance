import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TeamMemberCardProps {
  name: string
  role: string
  phone: string
  email: string
  image: string
  bio?: string
}

export function TeamMemberCard({ name, role, phone, email, image, bio }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image src={image || "/placeholder.svg"} alt={`${name} - ${role}`} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="mb-1 text-2xl font-bold">{name}</h3>
        <p className="mb-4 text-sm font-medium text-primary">{role}</p>
        {bio && <p className="mb-4 text-muted-foreground">{bio}</p>}
        <div className="space-y-2">
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm transition-colors hover:text-primary">
            <Mail className="h-4 w-4" />
            {email}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
