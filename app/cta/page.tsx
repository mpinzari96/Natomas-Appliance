import { Phone } from "lucide-react"
import { Inter } from "next/font/google"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

// Google Tag Manager ID from .env
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function CTAPage() {
  return (
    <html lang="en">
      <head>
        <title>Schedule Appliance Repair | Natomas Appliance</title>
        <meta
          name="description"
          content="Book your appliance repair service online or call us directly for fast, professional service."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        {/* Google Tag Manager */}
        {GTM_ID && (
          <>
            <Script id="gtm-datalayer-cta" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];`}
            </Script>
            <Script id="google-tag-manager-cta" strategy="beforeInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        {GTM_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}

        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            {/* Logo/Header */}
            <div className="mb-8 flex flex-col items-center justify-center">
              <h1 className="text-center text-2xl font-bold tracking-tight">NATOMAS APPLIANCE</h1>
              <p className="mt-2 text-center text-lg text-gray-600">Professional Appliance Repair Services</p>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Service Highlight */}
              <div className="rounded-lg bg-gray-100 p-4 text-center">
                <h2 className="mb-2 text-xl font-semibold">Same-Day Service Available</h2>
                <p className="text-gray-600">Expert technicians ready to repair all major appliance brands</p>
              </div>

              {/* Book Online Button */}
              <div className="space-y-2">
                <h3 className="text-center font-medium">Schedule Your Appointment</h3>
                <a
                  href="https://app.squareup.com/appointments/book/hodac3nztgzf75/LH4P9ASG50VZG/start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full justify-center rounded-md bg-amber-500 px-4 py-6 text-lg font-semibold uppercase text-white hover:bg-amber-600"
                >
                  Book Online
                </a>
                <p className="text-center text-sm text-gray-500">$20 deposit required for diagnostic appointments</p>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">OR</span>
                </div>
              </div>

              {/* Call Now Button */}
              <div className="space-y-2">
                <h3 className="text-center font-medium">Speak With Us Directly</h3>
                <a
                  href="tel:9169054476"
                  className="flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-6 text-lg font-semibold uppercase text-white hover:bg-gray-800"
                >
                  <Phone className="mr-2 h-5 w-5" /> Call Now (916) 905-4476
                </a>
                <p className="text-center text-sm text-gray-500">Available Monday-Saturday, 8AM-8PM</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <p className="text-sm font-medium">Trusted by Sacramento homeowners since 2015</p>
              <div className="mt-2 flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">4.9 out of 5 based on 60+ reviews</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
