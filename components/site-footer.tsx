import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

import { PhoneLink } from "@/components/phone-link"

export function SiteFooter() {
  return (
    <footer className="bg-muted">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">NATOMAS APPLIANCE</h3>
            <p className="mb-4 text-muted-foreground">
              Providing reliable appliance repair services for all brands and types of appliances in the Sacramento
              area.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Sacramento, CA</span>
              </li>
              <li className="flex items-start">
                <PhoneLink className="text-muted-foreground hover:text-primary" />
              </li>
              <li className="flex items-start">
  <Mail className="mr-2 h-5 w-5 text-primary" />
  <a 
    href="mailto:customerservice@natomasappliance.com" 
    className="text-muted-foreground"
  >
    customerservice@natomasappliance.com
  </a>
</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Natomas Appliance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
