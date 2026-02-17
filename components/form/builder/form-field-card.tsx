import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface FormBlockCardProps extends ComponentProps<"div"> {
  children: ReactNode
}

function FormBlockCard({ children, className, ...props }: FormBlockCardProps) {
  return (
    <div
      className={cn(
        "bg-background flex w-10/12 flex-col gap-4 rounded border p-6 lg:w-3xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default FormBlockCard
