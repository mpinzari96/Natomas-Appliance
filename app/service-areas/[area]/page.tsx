import Link from "next/link"
import { MapPin, ArrowLeft, Clock, Wrench } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AppointmentModal } from "@/components/appointment-modal"
import { PhoneLink } from "@/components/phone-link"

export function generateStaticParams() {
  const areas = [
    "antelope",
    "carmichael",
    "citrus-heights",
    "elk-grove",
    "elverta",
    "fair-oaks",
    "folsom",
    "granite-bay",
    "lincoln",
    "loomis",
    "natomas",
    "north-highlands",
    "orangevale",
    "rancho-cordova",
    "rio-linda",
    "rocklin",
    "roseville",
    "sacramento",
    "west-sacramento",
  ]

  return areas.map((area) => ({
    area,
  }))
}

export default function AreaPage({ params }: { params: { area: string } }) {
  const areaName = params.area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start gap-2">
            <Link
              href="/service-areas"
              className="mb-2 flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to All Service Areas
            </Link>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Appliance Repair in {areaName}, CA
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Professional appliance repair services for all major brands in {areaName}.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Appliance Repair Services in {areaName}</h2>
                <p className="text-muted-foreground">
                  Natomas Appliance is proud to provide expert appliance repair services to the residents of {areaName},
                  CA. Our team of certified technicians is equipped to handle repairs for all major appliance brands and
                  models, ensuring your household runs smoothly.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium">Same-Day Service</h3>
                    <p className="text-sm text-muted-foreground">
                      We offer same-day service for {areaName} residents when you call before noon, subject to
                      availability.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium">Convenient Scheduling</h3>
                    <p className="text-sm text-muted-foreground">
                      Book your appointment online or by phone for a time that works best for your schedule.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-semibold">Appliances We Repair in {areaName}</h2>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {appliances.map((appliance, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{appliance}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-semibold">Why {areaName} Residents Choose Us</h2>
                <p className="mb-4 text-muted-foreground">
                  Residents of {areaName} trust Natomas Appliance for their repair needs because of our:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                  <li>Experienced and certified technicians</li>
                  <li>Upfront, transparent pricing with no hidden fees</li>
                  <li>Warranty on all parts and labor</li>
                  <li>Commitment to customer satisfaction</li>
                  <li>Fast response times and efficient service</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Request Service Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Schedule Service in {areaName}</h3>
                <p className="mb-6 text-muted-foreground">
                  Our expert technicians are ready to help with your appliance repair needs in {areaName}.
                </p>
                <div className="space-y-4">
                  <AppointmentModal buttonText="Schedule Online" fullWidth={true} />
                  <div className="flex items-center justify-center gap-2">
                    <PhoneLink textClassName="font-medium" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Nearby Service Areas</h3>
                <Separator className="mb-4" />
                <div className="space-y-3">
                  {serviceAreas.slice(0, 5).map((area, index) => (
                    <Link
                      key={index}
                      href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block hover:text-primary hover:underline"
                    >
                      Appliance Repair in {area}, CA
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <Link href="/service-areas" className="block font-medium text-primary hover:underline">
                    View All Service Areas →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
          
          </div>
        </div>
      </div>
    </div>
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

const appliances = [
  "Refrigerators",
  "Freezers",
  "Dishwashers",
  "Ovens",
  "Ranges",
  "Cooktops",
  "Microwaves",
  "Washers",
  "Dryers",
  "Ice Makers",
  "Wine Coolers",
  "Garbage Disposals",
]
