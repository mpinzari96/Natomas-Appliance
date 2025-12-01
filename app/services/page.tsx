import Link from "next/link"
import { CheckCircle, Star, Wrench, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AppointmentModal } from "@/components/appointment-modal"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">SERVICES</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Professional appliance repair and maintenance services for your home.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <p className="mb-10 text-lg text-muted-foreground">We service all makes and models of appliances.</p>

            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold">Machines We Repair</h2>
              <p className="mb-6 text-muted-foreground">These are just a few of the type of machines we service:</p>

              <div className="grid gap-y-2 sm:grid-cols-2 md:grid-cols-3">
                {repairServices.map((service, index) => (
                  <Link
                    key={index}
                    href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}-repair`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Wrench className="h-4 w-4" />
                    {service} Repair
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold">Our Maintenance Services</h2>

              <div className="grid gap-y-2 sm:grid-cols-2">
                {maintenanceServices.map((service, index) => (
                  <Link
                    key={index}
                    href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}-maintenance`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {service} Maintenance
                  </Link>
                ))}
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-4 w-4" />
                  Dryer Vent Cleanings (limited)
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="mb-6 text-2xl font-bold">Why Choose Our Services</h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {serviceFeatures.map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold">Our Service Process</h2>

              <div className="space-y-6">
                {serviceProcess.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
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

            {/* Services Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">SERVICES</h3>
                <div className="space-y-3">
                  <Link href="/services/appliance-maintenance" className="block hover:text-primary hover:underline">
                    Appliance Maintenance
                  </Link>
                  <Link href="/services/appliance-repair" className="block hover:text-primary hover:underline">
                    Appliance Repair
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Customer Testimonial */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-center text-lg font-semibold">OUR HAPPY CUSTOMER</h3>
                <div className="flex flex-col items-center">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    A
                  </div>
                  <p className="mb-1 font-medium">Aaron L.</p>
                  <p className="mb-1 text-xs text-muted-foreground">Sacramento, CA</p>
                  <div className="mb-3 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    "I had a buzzing noise coming from my oven. Daniel was able to determine the issue and a new part
                    was ordered. The price was on par with other companies. I did like Daniel's promptness, cleanliness,
                    and overall knowledge. Great job!"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-center text-lg font-semibold">WE ACCEPT</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span>All major credit and debit cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span>Tap to pay / Mobile payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Personal checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Cash</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const repairServices = [
  "Cooktop",
  "Dishwasher",
  "Dryer",
  "Dryer Vent",
  "Freezer",
  "Ice Maker",
  "Microwave",
  "Oven",
  "Range",
  "Range Hood",
  "Refrigerator",
  "Washer",
  "Wine Cooler",
  "Wine Refrigerator",
]

const maintenanceServices = ["Appliance", "Refrigerator", "Washer", "Dryer"]

const serviceFeatures = [
  {
    title: "Expert Technicians",
    description: "Our technicians are factory-trained and certified to work on all major appliance brands.",
    icon: CheckCircle,
  },
  {
    title: "Same-Day Service",
    description: "We offer same-day service for most repairs when you call before noon.",
    icon: CheckCircle,
  },
  {
    title: "Upfront Pricing",
    description: "We provide clear, upfront pricing before any work begins, with no hidden fees or surprises.",
    icon: CheckCircle,
  },
  {
    title: "Warranty Protection",
    description: "All our repairs come with a warranty on both parts and labor for your peace of mind.",
    icon: CheckCircle,
  },
]

const serviceProcess = [
  {
    title: "Schedule Your Service",
    description: "Contact us by phone or online to schedule a convenient appointment time.",
  },
  {
    title: "Diagnostic Assessment",
    description: "Our technician will thoroughly inspect your appliance to identify the issue.",
  },
  {
    title: "Upfront Quote",
    description: "We'll provide a clear, detailed quote before any repair work begins.",
  },
  {
    title: "Professional Repair",
    description: "Our expert technician will complete the repair efficiently and effectively.",
  },
  {
    title: "Quality Assurance",
    description: "We'll test your appliance to ensure it's working properly before we leave.",
  },
]
