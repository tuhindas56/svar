import { cn } from "@/lib/utils"
import FormBlockCard from "./form-card"

interface HeaderProps {
  title: string
  description?: string
  isFormHeader?: boolean
}

function Header({ title = "", description = "", isFormHeader }: HeaderProps) {
  return (
    <FormBlockCard
      className={cn(
        "border-t-primary border-t-2",
        isFormHeader && "border-t-4"
      )}
    >
      <h1
        className={cn("font-lora text-2xl font-bold", {
          "text-3xl": isFormHeader
        })}
      >
        {title || "Untitled form"}
      </h1>
      <p>{description}</p>
    </FormBlockCard>
  )
}

export default Header
