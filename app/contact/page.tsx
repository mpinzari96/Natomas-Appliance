import { ContactForm } from "@/components/contact-form"
import { AppointmentCard } from "@/components/appointment-card"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhoneLink } from "@/components/phone-link"


export default function ContactPage() {
 return (
   <div className="flex min-h-screen flex-col overflow-x-hidden">
     {/* Page Header */}
     <section className="bg-muted py-12 w-full">
       <div className="container mx-auto px-4 max-w-full">
         <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">CONTACT US</h1>
         <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
           Get in touch with our team for appliance repair services or any questions you may have.
         </p>
       </div>
     </section>


     <div className="container mx-auto px-4 py-12 max-w-full">
       <div className="grid gap-12 lg:grid-cols-2">
         {/* Contact Form and Scheduling */}
         <div className="w-full pr-4 md:pr-0">
           <h2 className="mb-6 text-2xl font-semibold">Get In Touch</h2>


           <Tabs defaultValue="form" className="mb-8 w-full">
             <TabsList className="w-full grid grid-cols-2">
               <TabsTrigger value="form">Get a Free Quote</TabsTrigger>
               <TabsTrigger value="schedule">Schedule Service</TabsTrigger>
             </TabsList>


             <TabsContent value="form" className="mt-6 w-full">
               <Card className="w-full">
                 <CardContent className="p-4 sm:p-6">
                   <ContactForm webhookUrl="https://primary-production-e3b4e.up.railway.app/webhook/06a97321-2604-48d8-ab48-8148b90814a5" />
                 </CardContent>
               </Card>
             </TabsContent>


             <TabsContent value="schedule" className="mt-6 w-full">
               <Card className="w-full">
                 <CardContent className="p-4 sm:p-6">
                   <div className="mb-6 mx-auto max-w-md">
                     <AppointmentCard
                       title="Diagnostic Appointment"
                       duration="2 hrs"
                       price="$80"
                       description="A $20 deposit is required to book this appointment"
                       variant="outline"
                     />
                   </div>


                   <div className="mt-6 w-full">
                     <h3 className="mb-4 text-lg font-medium">Select a Date and Time</h3>
                     <div className="w-full overflow-hidden rounded-lg">
                       <iframe
                         src="https://app.squareup.com/appointments/book/hodac3nztgzf75/LH4P9ASG50VZG/start"
                         width="100%"
                         height="600"
                         frameBorder="0"
                         title="Square Appointments"
                         className="max-w-full"
                       ></iframe>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             </TabsContent>
           </Tabs>
         </div>


         {/* Contact Information */}
         <div className="w-full">
           <h2 className="mb-6 text-2xl font-semibold">Contact Information</h2>


           <div className="space-y-8 w-full">
             <Card className="w-full">
               <CardContent className="p-4 sm:p-6">
                 <div className="flex items-start gap-4">
                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                     <Phone className="h-5 w-5" />
                   </div>
                   <div>
                     <h3 className="mb-2 text-lg font-medium">Phone</h3>
                     <p className="text-xl font-semibold">
                       <PhoneLink showIcon={false} />
                     </p>
                     <p className="mt-1 text-sm text-muted-foreground">
                       Call us to schedule service or for any questions
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>


             <Card className="w-full">
               <CardContent className="p-4 sm:p-6">
                 <div className="flex items-start gap-4">
                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                     <Clock className="h-5 w-5" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <h3 className="mb-2 text-lg font-medium">Business Hours</h3>
                     <div className="space-y-2">
                       <div className="flex justify-between">
                         <span className="font-medium">Monday - Saturday</span>
                         <span>8:00 AM - 8:00 PM</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="font-medium">Sunday</span>
                         <span>Closed</span>
                       </div>
                     </div>
                     <p className="mt-3 text-sm text-muted-foreground">
                       Emergency service available outside regular hours
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>


             <Card className="w-full">
               <CardContent className="p-4 sm:p-6">
                 <div className="flex items-start gap-4">
                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                     <Mail className="h-5 w-5" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <h3 className="mb-2 text-lg font-medium">Email</h3>
                     <p className="font-medium break-words">customerservice@natomasappliance.com</p>
                     <p className="mt-1 text-sm text-muted-foreground">For general inquiries and support</p>
                   </div>
                 </div>
               </CardContent>
             </Card>


             <Card className="w-full">
               <CardContent className="p-4 sm:p-6">
                 <div className="flex items-start gap-4">
                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                     <MapPin className="h-5 w-5" />
                   </div>
                   <div>
                     <h3 className="mb-2 text-lg font-medium">Location</h3>
                     <p className="font-medium">Sacramento, CA 95834</p>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </div>
         </div>
       </div>


       {/* Service Area Map */}
       <div className="mt-16 w-full">
         <h2 className="mb-6 text-2xl font-semibold">Service Area</h2>
         <div className="aspect-video w-full overflow-hidden rounded-lg">
           <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d833914.8912031617!2d-121.91517088700269!3d38.11805100105927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6dc4c887b29a14f1%3A0x4c0d6c704fb71cdd!2sNatomas%20Appliance!5e1!3m2!1sen!2sus!4v1743316198013!5m2!1sen!2sus"
             width="100%"
             height="100%"
             style={{ border: 0 }}
             allowFullScreen
             loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"
             title="Google Map"
             className="max-w-full"
           ></iframe>
         </div>
         <p className="mt-4 text-center text-muted-foreground">
           We provide appliance repair services throughout Sacramento County and surrounding areas.
         </p>
       </div>
     </div>
   </div>
 )
}
