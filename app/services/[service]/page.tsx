import Link from "next/link"
import { ArrowLeft, CheckCircle, Wrench } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AppointmentModal } from "@/components/appointment-modal"
import { PhoneLink } from "@/components/phone-link"

export function generateStaticParams() {
  const services = [
    "cooktop-repair",
    "dishwasher-repair",
    "dryer-repair",
    "dryer-vent-repair",
    "freezer-repair",
    "ice-maker-repair",
    "microwave-repair",
    "oven-repair",
    "range-repair",
    "range-hood-repair",
    "refrigerator-repair",
    "washer-repair",
    "wine-cooler-repair",
    "wine-refrigerator-repair",
    "appliance-maintenance",
    "refrigerator-maintenance",
    "washer-maintenance",
    "dryer-maintenance",
  ]

  return services.map((service) => ({
    service,
  }))
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const serviceName = params.service
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const isRepair = params.service.includes("repair")
  const applianceType = serviceName.replace(" Repair", "").replace(" Maintenance", "")

  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start gap-2">
            <Link href="/services" className="mb-2 flex items-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to All Services
            </Link>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{serviceName}</h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Professional {serviceName.toLowerCase()} services for all major brands and models.
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
                <h2 className="mb-4 text-2xl font-semibold">
                  {isRepair ? `${applianceType} Repair Services` : `${applianceType} Maintenance Services`}
                </h2>
                <p className="text-muted-foreground">
                  {isRepair
                    ? `Natomas Appliance provides expert ${applianceType.toLowerCase()} repair services for all major brands. Our certified technicians have the training and experience to diagnose and fix any ${applianceType.toLowerCase()} issue quickly and efficiently.`
                    : `Regular maintenance of your ${applianceType.toLowerCase()} is essential to ensure optimal performance, energy efficiency, and longevity. Natomas Appliance offers comprehensive ${applianceType.toLowerCase()} maintenance services to keep your appliance running smoothly.`}
                </p>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-semibold">
                  {isRepair ? `Common ${applianceType} Problems We Fix` : `Our ${applianceType} Maintenance Process`}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(isRepair ? getCommonProblems(applianceType) : getMaintenanceSteps(applianceType)).map(
                    (item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        {isRepair ? (
                          <Wrench className="mt-1 h-4 w-4 text-primary" />
                        ) : (
                          <CheckCircle className="mt-1 h-4 w-4 text-primary" />
                        )}
                        <span>{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-semibold">Brands We Service</h2>
                <p className="mb-4 text-muted-foreground">
                  Our technicians are trained to work on all major {applianceType.toLowerCase()} brands, including:
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {brands.map((brand, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{brand}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-semibold">Why Choose Natomas Appliance</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="mt-1 h-4 w-4 text-primary" />
                          <div>
                            <h3 className="font-medium">{benefit.title}</h3>
                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Request Service Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Schedule {serviceName}</h3>
                <p className="mb-6 text-muted-foreground">
                  Our expert technicians are ready to help with your {applianceType.toLowerCase()} needs.
                </p>
                <AppointmentModal buttonText="Schedule Service" fullWidth={true} />
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Or call us at <PhoneLink showIcon={false} textClassName="font-medium" />
                </p>
              </CardContent>
            </Card>

            {/* Other Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Other Services</h3>
                <div className="space-y-3">
                  {otherServices
                    .filter((s) => s !== serviceName)
                    .slice(0, 5)
                    .map((service, index) => (
                      <Link
                        key={index}
                        href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block hover:text-primary hover:underline"
                      >
                        {service}
                      </Link>
                    ))}
                  <div className="pt-2">
                    <Link href="/services" className="block font-medium text-primary hover:underline">
                      View All Services →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Service Areas</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  We provide {serviceName.toLowerCase()} services throughout Sacramento County and surrounding areas,
                  including:
                </p>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  {serviceAreas.slice(0, 6).map((area, index) => (
                    <Link
                      key={index}
                      href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-primary hover:underline"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2">
                  <Link href="/service-areas" className="text-sm font-medium text-primary hover:underline">
                    View All Areas →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCommonProblems(applianceType: string) {
  const problemsMap: Record<string, string[]> = {
    Refrigerator: [
      "Not cooling properly",
      "Making unusual noises",
      "Leaking water",
      "Ice maker not working",
      "Freezer not freezing",
      "Temperature fluctuations",
      "Frost buildup",
      "Compressor issues",
    ],
    Dishwasher: [
      "Not cleaning dishes properly",
      "Leaking water",
      "Not draining",
      "Strange noises during operation",
      "Door not latching",
      "Not filling with water",
      "Control panel issues",
      "Soap dispenser problems",
    ],
    Washer: [
      "Not spinning or agitating",
      "Leaking water",
      "Making loud noises",
      "Not draining properly",
      "Not filling with water",
      "Control panel issues",
      "Door or lid problems",
      "Vibration or movement during cycles",
    ],
    Dryer: [
      "Not heating",
      "Not tumbling",
      "Taking too long to dry clothes",
      "Making unusual noises",
      "Shutting off prematurely",
      "Overheating",
      "Control panel issues",
      "Door not latching properly",
    ],
    Oven: [
      "Not heating properly",
      "Uneven cooking",
      "Temperature inaccuracy",
      "Self-cleaning feature not working",
      "Door not closing properly",
      "Control panel issues",
      "Burners not igniting",
      "Strange odors during operation",
    ],
  }

  // Default problems for appliances not specifically listed
  const defaultProblems = [
    "Not turning on",
    "Unusual noises during operation",
    "Performance issues",
    "Control panel problems",
    "Electrical issues",
    "Mechanical failures",
    "Efficiency problems",
    "Component failures",
  ]

  return problemsMap[applianceType] || defaultProblems
}

function getMaintenanceSteps(applianceType: string) {
  const stepsMap: Record<string, string[]> = {
    Refrigerator: [
      "Clean condenser coils",
      "Check and clean door seals",
      "Inspect and clean drain pan",
      "Check temperature settings",
      "Clean ice maker components",
      "Inspect water filter and lines",
      "Check compressor operation",
      "Ensure proper airflow",
    ],
    Washer: [
      "Clean drum and gaskets",
      "Check hoses for leaks or damage",
      "Clean detergent dispensers",
      "Inspect drain pump and filter",
      "Check belt tension and condition",
      "Ensure proper leveling",
      "Test water inlet valves",
      "Inspect control board connections",
    ],
    Dryer: [
      "Clean lint trap and vent system",
      "Check belt tension and condition",
      "Inspect drum rollers and bearings",
      "Test heating element",
      "Check door seal integrity",
      "Inspect control board connections",
      "Test thermostat and thermal fuse",
      "Ensure proper airflow",
    ],
    Appliance: [
      "Comprehensive inspection of all components",
      "Clean internal and external parts",
      "Check electrical connections",
      "Test operational performance",
      "Identify potential issues before they become problems",
      "Ensure energy-efficient operation",
      "Verify safety features are working properly",
      "Provide maintenance recommendations",
    ],
  }

  // Default maintenance steps for appliances not specifically listed
  const defaultSteps = [
    "Comprehensive inspection",
    "Clean all components",
    "Check electrical connections",
    "Test operational performance",
    "Identify potential issues",
    "Ensure energy-efficient operation",
    "Verify safety features",
    "Provide maintenance recommendations",
  ]

  return stepsMap[applianceType] || defaultSteps
}

const brands = [
  "Whirlpool",
  "GE",
  "Samsung",
  "LG",
  "Maytag",
  "KitchenAid",
  "Frigidaire",
  "Bosch",
  "Electrolux",
  "Kenmore",
  "Sub-Zero",
  "Wolf",
  "Viking",
  "Thermador",
  "Miele",
]

const benefits = [
  {
    title: "Factory-Trained Technicians",
    description: "Our technicians receive ongoing training to stay current with the latest appliance technologies.",
  },
  {
    title: "Upfront, Transparent Pricing",
    description: "We provide clear pricing before any work begins, with no hidden fees or surprises.",
  },
  {
    title: "Fully Stocked Service Vans",
    description: "Our vans are stocked with common parts to complete most repairs in a single visit.",
  },
  {
    title: "Warranty on Parts & Labor",
    description: "All our repairs come with a warranty for your peace of mind and protection.",
  },
]

const otherServices = [
  "Refrigerator Repair",
  "Dishwasher Repair",
  "Washer Repair",
  "Dryer Repair",
  "Oven Repair",
  "Range Repair",
  "Microwave Repair",
  "Freezer Repair",
  "Appliance Maintenance",
  "Refrigerator Maintenance",
  "Washer Maintenance",
  "Dryer Maintenance",
]

const serviceAreas = [
  "Natomas",
  "Sacramento",
  "Elk Grove",
  "Roseville",
  "Folsom",
  "Citrus Heights",
  "Fair Oaks",
  "Carmichael",
  "Rancho Cordova",
  "West Sacramento",
  "Antelope",
  "Rocklin",
]
