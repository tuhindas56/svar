"use client"

import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  console.error(error)

  return (
    <div className="flex h-dvh w-full justify-center">
      <Card className="bg-background mt-24 h-max w-xs rounded-sm shadow-none sm:w-md">
        <CardHeader className="">
          <CardTitle className="font-lora text-2xl">
            Something went wrong
          </CardTitle>
          <CardDescription>
            We encountered an unexpected error. Please try again.
          </CardDescription>
        </CardHeader>

        <CardFooter className="gap-4">
          <Button onClick={reset} size="lg" variant="outline">
            <RefreshCw /> Reload
          </Button>
          <Button onClick={() => redirect("/")} size="lg" variant="outline">
            <Home /> Go home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
