"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { redirect } from "next/navigation"

export default function Error() {
  return (
    <div className="grid h-dvh place-content-center">
      <div className="flex items-center justify-center gap-4">
        <div>
          <h1 className="text-foreground text-xl font-semibold">404</h1>
          <p className="text-muted-foreground leading-relaxed">
            The page you tried to visit does not exist
          </p>
        </div>
      </div>

      <div className="mt-2 flex justify-start">
        <Button
          onClick={() => redirect("/")}
          size="lg"
          className="p-0!"
          variant="link"
        >
          Go home
        </Button>
      </div>
    </div>
  )
}
