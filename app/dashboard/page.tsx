import { Suspense } from "react"
import { redirect } from "next/navigation"

import { getSession } from "@/lib/actions/auth"
import { getForms } from "@/lib/db/data"
import FormsList from "@/components/dashboard/forms-list"
import FormsListSkeleton from "@/components/dashboard/forms-list-skeleton"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

async function Dashboard() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  const formsPromise = getForms({
    userId: session.user.id as string,
    page: 0,
    pageSize: 10
  })

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader className="">
          <CardTitle className="text-lg font-medium">
            Welcome to svar, {session.user.name.split(" ")[0]}!
          </CardTitle>
          <CardDescription>Manage your existing forms or start building a new one.</CardDescription>
        </CardHeader>
      </Card>
      <Suspense fallback={<FormsListSkeleton />}>
        <FormsList formsPromise={formsPromise} />
      </Suspense>
    </div>
  )
}

export default Dashboard
