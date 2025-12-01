import { TeamMemberCard } from "@/components/team-member-card"

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Meet the Team</h1>
            <p className="text-lg text-muted-foreground">
              Our expert technicians are dedicated to providing exceptional appliance repair services to the Natomas
              community and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
                phone={member.phone}
                email={member.email}
                image={member.image}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Why Choose Our Team</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Certified & Experienced</h3>
                <p className="text-sm text-muted-foreground">
                  Our technicians are fully certified and have years of hands-on experience with all major appliance
                  brands.
                </p>
              </div>
              <div className="rounded-lg bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Customer-Focused</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize clear communication and transparent pricing to ensure you have the best service
                  experience.
                </p>
              </div>
              <div className="rounded-lg bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Locally Owned</h3>
                <p className="text-sm text-muted-foreground">
                  As a local business, we understand our community's needs and are committed to building lasting
                  relationships.
                </p>
              </div>
              <div className="rounded-lg bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Same-Day Service</h3>
                <p className="text-sm text-muted-foreground">
                  We offer same-day service for most repairs to minimize disruption to your daily routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const teamMembers = [
  {
    name: "Daniel Gavrilenko",
    role: "Lead Technician",
    phone: "(916) 905-4476",
    email: "Support@natomasappliance.com",
    image: "/images/team/daniel-gavrilenko.jpg",
    bio: "Daniel brings extensive expertise in appliance repair and is dedicated to providing top-quality service to every customer.",
  },
  {
    name: "Tim Gerbel",
    role: "Sales Manager",
    phone: "(916) 477-1897",
    email: "Customerservice@natomasappliance.com",
    image: "/images/team/tim-gerbel.jpg",
    bio: "Tim leads our sales team with a focus on exceptional customer service and building strong relationships with our clients.",
  },
]
