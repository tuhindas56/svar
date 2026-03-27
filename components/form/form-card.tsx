import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

type FormBlockCardProps = ComponentProps<"div"> & {
  children: ReactNode
}

function FormCard({ children, className, ...props }: FormBlockCardProps) {
  return (
    <div
      className={cn(
        "bg-background flex w-full flex-col gap-4 rounded border p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default FormCard
