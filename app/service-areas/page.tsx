import Link from "next/link"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AppointmentModal } from "@/components/appointment-modal"

export default function ServiceAreasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">SERVICE AREAS</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Natomas Appliance provides reliable repair services throughout Sacramento County and surrounding areas.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content - Service Areas List */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-semibold">We service the following areas:</h2>

              <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <Link
                      href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-primary hover:underline"
                    >
                      {area}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 space-y-8">
              <h2 className="text-2xl font-semibold">Why Choose Natomas Appliance for Your Area</h2>
              <p className="text-muted-foreground">
                When your appliances break down, you need a reliable repair service that can respond quickly. Natomas
                Appliance has been serving the greater Sacramento area for years, providing expert appliance repair
                services to homeowners and businesses alike.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-3 text-lg font-medium">Fast Response Times</h3>
                  <p className="text-sm text-muted-foreground">
                    Our technicians are strategically located throughout our service areas to ensure we can respond
                    quickly to your repair needs, often offering same-day service.
                  </p>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-3 text-lg font-medium">Local Expertise</h3>
                  <p className="text-sm text-muted-foreground">
                    As a local business, we understand the specific needs and challenges of appliance owners in the
                    Sacramento area, from climate considerations to common usage patterns.
                  </p>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-3 text-lg font-medium">Comprehensive Coverage</h3>
                  <p className="text-sm text-muted-foreground">
                    No matter where you are in our service area, you'll receive the same high-quality service, fair
                    pricing, and expert repairs that our customers have come to expect.
                  </p>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-3 text-lg font-medium">No Travel Fee Zones</h3>
                  <p className="text-sm text-muted-foreground">
                    Many locations in our primary service area qualify for no travel fees, helping you save money on
                    your appliance repairs. Contact us to learn if your location qualifies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Request Service Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Need Appliance Repair?</h3>
                <p className="mb-6 text-muted-foreground">
                  Our expert technicians are ready to help with your appliance repair needs.
                </p>
                <AppointmentModal buttonText="Request Repair Service" fullWidth={true} />
              </CardContent>
            </Card>

            {/* Service Areas Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">SERVICE AREAS</h3>
                <Separator className="mb-4" />
                <div className="space-y-3">
                  {serviceAreas.slice(0, 10).map((area, index) => (
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

            {/* Service Area Map Placeholder */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Our Service Area</h3>
                <div className="aspect-video overflow-hidden rounded-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d833914.8912031617!2d-121.91517088700269!3d38.11805100105927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6dc4c887b29a14f1%3A0x4c0d6c704fb71cdd!2sNatomas%20Appliance!5e1!3m2!1sen!2sus!4v1743316198013!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  We provide appliance repair services throughout Sacramento County and surrounding areas.
                </p>
              </CardContent>
            </Card>
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
