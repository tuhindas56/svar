import { Suspense } from "react"
import { redirect } from "next/navigation"

import { getSession, logout } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import CreateFormDialog from "@/components/dashboard/create-form-dialog"
import FormsList from "@/components/dashboard/forms-list"
import FormsListSkeleton from "@/components/dashboard/forms-list-skeleton"
import PageHeader from "@/components/ui/page-header"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { LogOut } from "lucide-react"

async function Dashboard() {
  const session = await getSession()
  if (!session) redirect("/")

  return (
    <div className="flex flex-col gap-2">
      <PageHeader>
        <CreateFormDialog />

        {session?.user?.image && session.user?.name && (
          <Tooltip>
            <TooltipTrigger>
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
          <TooltipTrigger>
            <Button onClick={logout} variant="ghost">
              <LogOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>
      </PageHeader>

      <Suspense fallback={<FormsListSkeleton />}>
        <FormsList />
      </Suspense>
    </div>
  )
}

export default Dashboard
