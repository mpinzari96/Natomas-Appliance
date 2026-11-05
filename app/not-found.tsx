import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Page Not Found</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
        We couldn&apos;t find the page you&apos;re looking for. Head back home or get in touch and we&apos;ll help you
        get your appliance running again.
      </p>
      <nav className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="font-medium text-primary hover:underline">
          Home
        </Link>
        <Link href="/services" className="font-medium text-primary hover:underline">
          Services
        </Link>
        <Link href="/contact" className="font-medium text-primary hover:underline">
          Contact
        </Link>
      </nav>
    </div>
  )
}
