import { redirect } from "next/navigation"

import { getSession } from "@/lib/actions/auth"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubLogin, GoogleLogin } from "@/components/login-buttons"

export default async function Home() {
  const session = await getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div>
      <main className="flex h-dvh w-full justify-center">
        <Card className="bg-background mx-auto my-auto h-max w-xs rounded-sm shadow-none sm:w-md">
          <CardHeader className="">
            <CardTitle className="font-lora text-2xl">Welcome to svar!</CardTitle>
            <CardDescription>svar attempts to be a Google Forms-like form builder.</CardDescription>
          </CardHeader>

          <CardFooter className="flex-col gap-4">
            <GithubLogin />
            <GoogleLogin />
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
