import Image from "next/image"
import { Star, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">TESTIMONIALS</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            See what our customers are saying about our appliance repair services.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Overall Rating Section */}
        <div className="mb-12 rounded-lg border bg-card p-6 shadow-md">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 overflow-hidden">
                  <Image src="/images/yelp-icon.svg" alt="Yelp" width={24} height={24} />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white overflow-hidden">
                  <Image src="/images/google-icon.png" alt="Google" width={24} height={24} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9</div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Based on 60 Reviews</span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full md:w-auto">
                  <MessageSquare className="mr-2 h-4 w-4" /> Write a Review
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a
                    href="https://maps.app.goo.gl/3wzALABKniY3u6sP6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <div className="mr-2 h-5 w-5 overflow-hidden">
                      <Image src="/images/google-icon.png" alt="Google" width={20} height={20} />
                    </div>
                    Review on Google
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="https://www.yelp.com/writeareview/biz/gYlj-j_Yd58A5hG0P9JyhQ?return_url=%2Fbiz%2FgYlj-j_Yd58A5hG0P9JyhQ&review_origin=biz-details-war-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <div className="mr-2 h-5 w-5 overflow-hidden">
                      <Image src="/images/yelp-icon.svg" alt="Yelp" width={20} height={20} />
                    </div>
                    Review on Yelp
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="yelp">Yelp</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-primary text-xl font-bold text-primary-foreground">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.date}</div>
                      </div>
                      <div className="ml-auto">
                        {testimonial.source === "google" && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white overflow-hidden">
                            <Image src="/images/google-icon.png" alt="Google" width={16} height={16} />
                          </div>
                        )}
                        {testimonial.source === "yelp" && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 overflow-hidden">
                            <Image src="/images/yelp-icon.svg" alt="Yelp" width={16} height={16} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="google" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials
                .filter((testimonial) => testimonial.source === "google")
                .map((testimonial, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                          {testimonial.avatar ? (
                            <Image
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary text-xl font-bold text-primary-foreground">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.date}</div>
                        </div>
                        <div className="ml-auto">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white overflow-hidden">
                            <Image src="/images/google-icon.png" alt="Google" width={16} height={16} />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="yelp" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials
                .filter((testimonial) => testimonial.source === "yelp")
                .map((testimonial, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                          {testimonial.avatar ? (
                            <Image
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary text-xl font-bold text-primary-foreground">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                          <div className="text-xs text-muted-foreground">{testimonial.date}</div>
                        </div>
                        <div className="ml-auto">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 overflow-hidden">
                            <Image src="/images/yelp-icon.svg" alt="Yelp" width={16} height={16} />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const testimonials = [
  // Yelp reviews
  {
    name: "James T.",
    avatar: "",
    location: "Alameda, CA",
    date: "December 14, 2023",
    rating: 5,
    source: "yelp",
    text: "There's always a reason why a business is 5 star... I'm sometimes skeptical whether it's real. Daniel is legit... I left a few messages for other appliance repair businesses but didn't hear back.... He was prompt and communication was superb. He does require an upfront payment for service/estimate of $70 if you won't be there in person eg. if you have a tenant. However, thats extremely fair as other businesses start at around $90. I just love a technician who knows his stuff and is honest. He texted photos of the part needed. Crazy meticulous. I'm looking for the automotive equivalent of Daniel... or maybe I'll just ask him if he fixes cars.",
  },
  {
    name: "Aaron L.",
    avatar: "",
    location: "Sacramento, CA",
    date: "December 1, 2023",
    rating: 5,
    source: "yelp",
    text: "I had a buzzing noise coming from my oven. I reached out to Natomas Appliances based on previous Yelp reviews. Daniel called me and an appointment was made for the next day. Daniel was able to determine the issue and a new part was ordered. A couple days later the part came in and Daniel replaced it. It's been several weeks and several uses of the oven, the buzzing noise is gone. Oven fixed! The price for the part and consultation seemed to be on par with other companies that I had researched. I did like Daniel's promptness, cleanliness when replacing the part, and overall knowledge of the oven. Great job!",
  },
  {
    name: "Jennifer H.",
    avatar: "",
    location: "Sacramento, CA",
    date: "March 31, 2025",
    rating: 5,
    source: "yelp",
    text: "This review is a little late but I wanted to make sure I provided the great review they deserve. We were having issues with our dryer. They came out very quickly and diagnosed the issue for us. They repaired the issue which saved us from having to buy a new dryer. We will definitely use them again in the future.",
  },
  {
    name: "Diane A.",
    avatar: "",
    location: "Sacramento, CA",
    date: "February 27, 2024",
    rating: 5,
    source: "yelp",
    text: "I requested a quote and got an immediate response and questions answered. I made an appointment straight away and Daniel showed up right on time and went straight to work to see what was going on with my noisy dryer. He made it sound like new and the service was quick! He recommended I get a new dryer vent installed and I'm very grateful for that. The advice is invaluable and service well worth it. I'm so happy with the service and will contact Daniel again, shall I need anything repaired. Great price and peace of mind is invaluable. Couldn't recommend enough!",
  },

  // Google reviews
  {
    name: "Jaynia Anderson",
    avatar: "",
    date: "March 15, 2024",
    rating: 5,
    source: "google",
    text: "We had a squealing dryer that needed to be fixed asap. Daniel was able to come out quickly and got the dryer repaired in 1 hour, and also provided some helpful maintenance recommendations for us. Service was excellent, professional, and reasonably priced.",
  },
  {
    name: "Karen Quant",
    avatar: "",
    date: "December 15, 2023",
    rating: 5,
    source: "google",
    text: "Daniel's service was EXCELLENT, and at a level you don't see very often these days. He's knowledgeable and honest. We called him on a Monday afternoon, by Wednesday am (because we couldn't do it sooner) our 25 year old Whirlpool dryer was fixed!",
  },
  {
    name: "Maki Kobayashi",
    avatar: "",
    date: "August 10, 2023",
    rating: 5,
    source: "google",
    text: "Daniel was communicative, affordable, and professional. He came to my house in El Dorado Hills, so he serves a broad area. He understands all the components of appliances very well - highly recommend!",
  },
]
