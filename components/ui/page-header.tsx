import type { ReactNode } from "react"

interface Props {
  children?: ReactNode
}

function PageHeader({ children }: Props) {
  return (
    <div className="bg-background sticky top-0 z-50 flex w-full items-center justify-between gap-2 rounded-xs border px-2 py-2">
      <p className="font-lora w-max rounded px-2 text-xl font-medium">svar</p>

      <div className="flex items-center gap-5 md:gap-3">{children}</div>
    </div>
  )
}
export default PageHeader
