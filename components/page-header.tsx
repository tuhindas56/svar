import type { ReactNode } from "react"

import CreateFormDialog from "./dashboard/create-form-dialog"
import AvatarMenu from "./avatar-menu"
import { Card } from "./ui/card"
import BuilderActions from "./form/builder/builder-actions"

interface Props {
  children?: ReactNode
}

function PageHeader({ children }: Props) {
  return (
    <Card className="sticky top-0 z-25 flex-row flex-wrap items-center justify-between gap-2 px-2 py-2">
      <p className="font-lora w-max rounded px-2 text-xl font-medium">svar</p>

      <div className="ml-auto flex flex-wrap-reverse items-center justify-end gap-5 md:gap-3">
        {children}
        <CreateFormDialog />
        <BuilderActions />
        <AvatarMenu />
      </div>
    </Card>
  )
}

export default PageHeader
