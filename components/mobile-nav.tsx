"use client"
import * as React from "react"
import Link from "next/link"
import { MapPin, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AppointmentModal } from "@/components/appointment-modal"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const [serviceAreasOpen, setServiceAreasOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col pr-0 h-full overflow-y-auto">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="text-lg font-bold">NATOMAS APPLIANCE</span>
          </Link>
        </div>

        <nav className="mt-8 flex flex-col gap-4">
          <Link href="/" className="px-7 text-base font-medium" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/services" className="px-7 text-base font-medium" onClick={() => setOpen(false)}>
            Services
          </Link>

          <Collapsible open={serviceAreasOpen} onOpenChange={setServiceAreasOpen} className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between px-7 text-base font-medium">
              Service Areas
              <div className="rounded-full p-1 hover:bg-accent">
                {serviceAreasOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-2 space-y-2 px-7 max-h-64 overflow-y-auto">
              {serviceAreas.map((area) => (
                <Link
                  key={area}
                  href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <MapPin className="h-3 w-3" /> {area}
                </Link>
              ))}
              <Link
                href="/service-areas"
                className="mt-2 block py-1 text-sm font-medium text-primary hover:underline"
                onClick={() => setOpen(false)}
              >
                View All Service Areas
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Link href="/brands" className="px-7 text-base font-medium" onClick={() => setOpen(false)}>
            Brands
          </Link>
          <Link href="/team" className="px-7 text-base font-medium" onClick={() => setOpen(false)}>
            Team
          </Link>
          <Link href="/testimonials" className="px-7 text-base font-medium" onClick={() => setOpen(false)}>
            Testimonials
          </Link>
          <Link href="/contact" className="px-7 text-base font-medium" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>

        <div className="mt-auto px-7 py-4">
          <AppointmentModal buttonVariant="default" fullWidth={true} />
        </div>
      </SheetContent>
    </Sheet>
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
