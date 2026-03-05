"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Home } from "lucide-react"
import { redirect } from "next/navigation"

function NotFound() {
  return (
    <div className="flex h-dvh w-full justify-center">
      <Card className="bg-background mt-24 h-max w-xs rounded-sm shadow-none sm:w-md">
        <CardHeader className="">
          <CardTitle className="font-lora text-2xl">404</CardTitle>
          <CardDescription>
            The page you&apos;re looking for does not exist.
          </CardDescription>
        </CardHeader>

        <CardFooter className="gap-4">
          <Button onClick={() => redirect("/")} size="lg" variant="outline">
            <Home /> Go home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NotFound
