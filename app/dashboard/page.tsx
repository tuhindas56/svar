import { Suspense } from "react"
import { redirect } from "next/navigation"
import { LogOut } from "lucide-react"
import Image from "next/image"

import { getSession, logout } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import CreateFormDialog from "@/components/dashboard/create-form-dialog"
import FormsList from "@/components/dashboard/forms-list"
import FormsListSkeleton from "@/components/dashboard/forms-list-skeleton"
import PageHeader from "@/components/ui/page-header"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { getForms } from "@/lib/db/data"

interface FormType {
  id: string
  name: string
  created: Date
  modified: Date
  published: boolean
}

async function Dashboard() {
  const session = await getSession()

  if (!session || !session.user) {
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
      <PageHeader>
        {session?.user?.image && session.user?.name && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src={session.user.image}
                alt=""
                height={36}
                width={36}
                className="rounded-full"
              />
            </TooltipTrigger>
            <TooltipContent>
              <span>Logged in as {session.user.name}</span>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={logout} variant="ghost" size="icon-sm">
              <LogOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>

        <CreateFormDialog />
      </PageHeader>

      <Suspense fallback={<FormsListSkeleton />}>
        <FormsList forms={forms as FormType[]} total={total} />
      </Suspense>
    </div>
  )
}

export default Dashboard
