import { redirect } from "next/navigation"

import { login, getSession } from "@/lib/actions/auth"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const session = await getSession()

  if (session) redirect("/dashboard")

  return (
    <div>
      <main className="grid h-dvh w-full place-content-center">
        <Card className="w-xs rounded-sm sm:w-md">
          <CardHeader className="">
            <CardTitle className="font-lora text-xl">
              Welcome to svar!
            </CardTitle>
            <CardDescription>
              svar attempts to be a Google Forms-like form builder. <br />
              Click on the button below to get started.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex-col gap-2">
            <Button onClick={login} className="w-full">
              Continue with Google
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
