import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface FormBlockCardProps extends ComponentProps<"div"> {
  children: ReactNode
}

function FormBlockCard({ children, className, ...props }: FormBlockCardProps) {
  return (
    <div
      className={cn(
        "focus-within:border-primary/40 flex w-full flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default FormBlockCard
