// This file tells Next.js to treat this route as a standalone page
export const dynamic = "force-static"

// Skip the root layout for this route
export const generateStaticParams = async () => {
  return []
}
