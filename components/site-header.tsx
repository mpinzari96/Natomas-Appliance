import Link from "next/link"
import { ChevronDown, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MobileNav } from "@/components/mobile-nav"
import { AppointmentModal } from "@/components/appointment-modal"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <MobileNav />
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">NATOMAS APPLIANCE</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Services
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Service Areas <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <div className="grid grid-cols-2 gap-1 p-2">
                  {serviceAreas.map((area) => (
                    <DropdownMenuItem key={area} asChild>
                      <Link
                        href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" /> {area}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuItem asChild className="font-medium text-primary">
                  <Link href="/service-areas">View All Service Areas</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/brands"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Brands
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <AppointmentModal buttonVariant="default" className="hidden md:flex" />
        </div>
      </div>
    </header>
  )
}

const serviceAreas = [
  "Antelope",
  "Carmichael",
  "Citrus Heights",
  "Elk Grove",
  "Elverta",
  "Fair Oaks",
  "Folsom",
  "Granite Bay",
  "Lincoln",
  "Loomis",
  "Natomas",
  "North Highlands",
  "Orangevale",
  "Rancho Cordova",
  "Rio Linda",
  "Rocklin",
  "Roseville",
  "Sacramento",
  "West Sacramento",
]
