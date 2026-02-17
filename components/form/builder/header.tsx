"use client"

import { cn } from "@/lib/utils"
import ContentEditable from "@/components/ui/content-editable"
import FormBlockCard from "./form-field-card"

interface HeaderProps {
  purpose: (typeof headerPurpose)[keyof typeof headerPurpose]
  title: string
  onTitleChange: (value: string) => void
  description?: string
  onDescriptionChange?: (value: string) => void
}

export const headerPurpose = {
  form: "form",
  section: "section"
} as const

function Header({
  title = "",
  onTitleChange = () => {},
  description = "",
  onDescriptionChange = () => {},
  purpose = headerPurpose.section
}: HeaderProps) {
  return (
    <FormBlockCard>
      <ContentEditable
        value={title}
        onChange={onTitleChange}
        placeholder={`Untitled ${headerPurpose[purpose]}`}
        className={cn("font-lora", {
          "text-2xl font-bold": purpose === headerPurpose.form,
          "text-lg font-bold": purpose === headerPurpose.section
        })}
        placeholderClassName={cn("font-lora", {
          "text-2xl": purpose === headerPurpose.form,
          "text-lg": purpose === headerPurpose.section
        })}
      />
      <ContentEditable
        value={description}
        onChange={onDescriptionChange}
        placeholder="Description (optional)"
      />
    </FormBlockCard>
  )
}

export default Header
