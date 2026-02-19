"use client"

import { cn } from "@/lib/utils"
import ContentEditable from "@/components/ui/content-editable"
import FormBlockCard from "./form-card"

interface HeaderProps {
  title: string
  onTitleChange: (value: string) => void
  description?: string
  onDescriptionChange?: (value: string) => void
  childOfFirstSection: boolean
}

function Header({
  title = "",
  onTitleChange = () => {},
  description = "",
  onDescriptionChange = () => {},
  childOfFirstSection
}: HeaderProps) {
  return (
    <FormBlockCard>
      <ContentEditable
        value={title}
        onChange={onTitleChange}
        placeholder={`Untitled ${childOfFirstSection ? "form" : "section"}`}
        className={cn("font-lora text-lg font-bold", {
          "text-3xl": childOfFirstSection
        })}
        placeholderClassName={cn("font-lora font-bold text-lg", {
          "text-3xl": childOfFirstSection
        })}
        width="100%"
      />
      <ContentEditable
        value={description}
        onChange={onDescriptionChange}
        placeholder="Description (optional)"
        width="100%"
      />
    </FormBlockCard>
  )
}

export default Header
