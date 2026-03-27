"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

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
      </Card>
    </div>
  )
}

export default NotFound
