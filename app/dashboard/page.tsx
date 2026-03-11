import { Suspense } from "react"
import { redirect } from "next/navigation"

import { getSession } from "@/auth"
import { getForms } from "@/lib/db/data"
import FormsList from "@/components/dashboard/forms-list"
import FormsListSkeleton from "@/components/dashboard/forms-list-skeleton"

interface FormType {
  id: string
  name: string
  created: Date
  modified: Date
  published: boolean
}

async function Dashboard() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  const { success, data, error } = await getForms({
    userId: session.user.id as string,
    page: 0,
    pageSize: 10
  })

  if (!success || !data) {
    throw new Error(error)
  }

  const forms = data.forms
  const total = data.total

  return (
    <div className="flex flex-col gap-2">
      <Suspense fallback={<FormsListSkeleton />}>
        <FormsList forms={forms as FormType[]} total={total} />
      </Suspense>
    </div>
  )
}

export default Dashboard
