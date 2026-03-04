"use client"

import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

declare global {
  interface Window {
    gtag_report_conversion?: (url: string) => boolean
  }
}

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">MEET THE TEAM</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Get to know the experienced professionals behind Natomas Appliance.
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-square w-full">
                  <Image src={member.photo || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                  <p className="mb-4 text-sm font-medium text-primary">{member.title}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <a
                        href={`tel:${member.phone.replace(/\D/g, "")}`}
                        onClick={(e) => {
                          if (typeof window !== "undefined" && window.gtag_report_conversion) {
                            e.preventDefault()
                            window.gtag_report_conversion(`tel:${member.phone.replace(/\D/g, "")}`)
                          }
                        }}
                        className="hover:text-primary hover:underline"
                      >
                        {member.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary hover:underline">
                        {member.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const teamMembers = [
  {
    name: "Daniel Gavrilenko",
    title: "Lead Technician",
    phone: "(916) 905-4476",
    email: "Support@natomasappliance.com",
    photo: "/images/team/daniel-gavrilenko.jpg",
  },
  {
    name: "Tim Gerbel",
    title: "Sales Manager",
    phone: "(916) 477-1897",
    email: "Customerservice@natomasappliance.com",
    photo: "/images/team/tim-gerbel.jpg",
  },
]
