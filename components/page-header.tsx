import type { ReactNode } from "react"

import CreateFormDialog from "./dashboard/create-form-dialog"
import AvatarMenu from "./avatar-menu"
import { Card } from "./ui/card"
import { getSession } from "@/lib/actions/auth"

interface Props {
  children?: ReactNode
}

function PageHeader({ children }: Props) {
  const sessionPromise = getSession()

  return (
    <Card className="sticky top-0 z-25 flex-row items-center justify-between gap-2 px-2 py-2">
      <p className="font-lora w-max rounded px-2 text-xl font-medium">svar</p>

      <div className="flex items-center gap-5 md:gap-3">
        {children}
        <CreateFormDialog />
        <AvatarMenu sessionPromise={sessionPromise} />
      </div>
    </Card>
  )
}

export default PageHeader
