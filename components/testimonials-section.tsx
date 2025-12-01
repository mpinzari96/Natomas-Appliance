import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

// Make sure we're exporting the component correctly
export function TestimonialsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Don't just take our word for it. See what our customers have to say about our appliance repair services.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredTestimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{testimonial.text}</p>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild>
            <Link href="/testimonials">Read More Reviews</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const featuredTestimonials = [
  {
    name: "John Smith",
    location: "Sacramento, CA",
    rating: 5,
    text: "Excellent service! The technician was on time, professional, and fixed my refrigerator quickly. He explained what was wrong and what he did to fix it. I highly recommend Natomas Appliance for any appliance repair needs.",
  },
  {
    name: "Emily Johnson",
    location: "Elk Grove, CA",
    rating: 5,
    text: "I had a great experience with Natomas Appliance. They were able to schedule me quickly when my washing machine broke down. The repair was done efficiently and at a reasonable price. Very satisfied with their service!",
  },
  {
    name: "Michael Davis",
    location: "Roseville, CA",
    rating: 5,
    text: "I've used Natomas Appliance twice now - once for my dishwasher and once for my dryer. Both times they provided excellent service. The technicians are knowledgeable and friendly. They're now my go-to for all appliance repairs.",
  },
]
