import Image from "next/image"
import { CheckCircle, ShieldCheck, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
// Import the alternative testimonials section as a fallback
import TestimonialsSection from "@/components/testimonials-section-alt"
import { AppointmentCard } from "@/components/appointment-card"
import { PhoneLink } from "@/components/phone-link"
import { AppointmentModal } from "@/components/appointment-modal"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home-appliances.webp"
            alt="Modern home appliances including refrigerator, washing machine, stove, and vacuum"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32 md:py-40">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              HOME APPLIANCE REPAIR <span className="text-white">YOU CAN COUNT ON</span>
            </h1>
            <p className="mb-8 text-xl text-white/90">
              We provide reliable repair services for all brands and types of appliances!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <AppointmentModal buttonText="Schedule Service" buttonSize="lg" className="text-base" />
              <Button
                size="lg"
                variant="outline"
                className="bg-background/10 text-base text-white backdrop-blur-sm hover:bg-background/20"
                asChild
              >
                <PhoneLink className="justify-center" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Our Repair Services</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="rounded-lg bg-card p-6 shadow-md transition-all hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose Natomas Appliance
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">ONLINE APPOINTMENTS</h2>
            <p className="mb-12 text-center text-muted-foreground">
              Book your service appointment online and get priority scheduling
            </p>

            <div className="mx-auto max-w-md">
              <AppointmentCard
                title="Diagnostic Appointment"
                duration="2 hrs"
                price="$80"
                description="A $20 deposit is required to book this appointment"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  )
}

const services = [
  {
    title: "Refrigerator Repair",
    description:
      "Expert repair for all refrigerator brands and models, including cooling issues, ice maker problems, and more.",
    icon: Wrench,
  },
  {
    title: "Dishwasher Repair",
    description: "Professional dishwasher repair services for leaks, drainage problems, cleaning issues, and more.",
    icon: Wrench,
  },
  {
    title: "Washer & Dryer Repair",
    description:
      "Comprehensive repair services for all types of washing machines and dryers, fixing any mechanical or electrical issues.",
    icon: Wrench,
  },
  {
    title: "Oven & Range Repair",
    description:
      "Expert repair for electric and gas ovens, ranges, and cooktops, addressing heating problems and control issues.",
    icon: Wrench,
  },
  {
    title: "Microwave Repair",
    description:
      "Professional repair services for all microwave brands, fixing heating issues, turntable problems, and more.",
    icon: Wrench,
  },
  {
    title: "Preventive Maintenance",
    description:
      "Regular maintenance services to keep your appliances running efficiently and prevent costly breakdowns.",
    icon: ShieldCheck,
  },
]

const benefits = [
  {
    title: "Experienced Technicians",
    description: "Our certified technicians have years of experience repairing all major appliance brands and models.",
  },
  {
    title: "Same-Day Service",
    description: "We offer same-day service for most repairs to get your appliances back up and running quickly.",
  },
  {
    title: "Warranty on Parts & Labor",
    description: "All our repairs come with a warranty on both parts and labor for your peace of mind.",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees or surprises. We provide upfront pricing before any work begins.",
  },
  {
    title: "Locally Owned & Operated",
    description: "We're proud to be a local business serving the Natomas community and surrounding areas.",
  },
  {
    title: "Fully Stocked Service Vans",
    description: "Our service vans are fully stocked with common parts to complete most repairs in a single visit.",
  },
]
