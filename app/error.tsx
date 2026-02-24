"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

function Error() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-4 py-8 text-center">
      <h1 className="mb-1.5 text-3xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground mb-6 max-w-sm">
        The page you were at has encountered an error.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to home page</Link>
      </Button>
    </div>
  )
}

export default Error
