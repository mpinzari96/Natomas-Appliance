import { Separator } from "@/components/ui/separator"
import { AppointmentCard } from "@/components/appointment-card"

export default function AppointmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">ONLINE APPOINTMENTS</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Schedule your appliance repair service online for your convenience.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Separator className="mb-12" />

        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-md">
            <AppointmentCard
              title="Diagnostic Appointment"
              duration="2 hrs"
              price="$80"
              description="A $20 deposit is required to book this appointment"
            />
          </div>

          <div className="mt-12 rounded-lg border bg-muted/30 p-6">
            <h2 className="mb-4 text-xl font-semibold">About Our Appointments</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our diagnostic appointments include a thorough inspection of your appliance to identify the issue. The
                $80 diagnostic fee will be applied toward the cost of repairs if you choose to proceed with our service.
              </p>
              <p>
                A $20 deposit is required to book a diagnostic appointment. This deposit will be applied to your total
                service cost.
              </p>
              <p>
                All appointments include a 30-minute arrival window. Our technicians will call you when they're on their
                way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
