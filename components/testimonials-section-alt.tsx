import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function TestimonialsSection() {
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
    name: "Jaynia Anderson",
    location: "Sacramento, CA",
    rating: 5,
    text: "We had a squealing dryer that needed to be fixed asap. Daniel was able to come out quickly and got the dryer repaired in 1 hour, and also provided some helpful maintenance recommendations for us. Service was excellent, professional, and reasonably priced.",
  },
  {
    name: "Karen Quant",
    location: "Sacramento, CA",
    rating: 5,
    text: "Daniel's service was EXCELLENT, and at a level you don't see very often these days. He's knowledgeable and honest. We called him on a Monday afternoon, by Wednesday am (because we couldn't do it sooner) our 25 year old Whirlpool dryer was fixed!",
  },
  {
    name: "Maki Kobayashi",
    location: "El Dorado Hills, CA",
    rating: 5,
    text: "Daniel was communicative, affordable, and professional. He came to my house in El Dorado Hills, so he serves a broad area. He understands all the components of appliances very well - highly recommend!",
  },
]
