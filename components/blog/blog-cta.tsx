import { AppointmentModal } from "@/components/appointment-modal"
import { PhoneLink } from "@/components/phone-link"

export function BlogCta() {
  return (
    <section className="mt-12 rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Need appliance repair?</h2>
      <p className="mt-2 text-muted-foreground">
        Call us or book a diagnostic appointment. Our technicians are ready to help with your appliance repair needs.
      </p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <AppointmentModal buttonText="Schedule Service" />
        <PhoneLink className="text-muted-foreground hover:text-primary" />
      </div>
    </section>
  )
}
