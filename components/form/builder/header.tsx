"use client"

import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/lib/utils"
import ContentEditable from "@/components/ui/content-editable"
import FormBlockCard from "./form-field-card"

interface HeaderProps {
  purpose: (typeof headerPurpose)[keyof typeof headerPurpose]
  title: string
  onTitleChange: Dispatch<SetStateAction<string>>
  description: string
  onDescriptionChange: Dispatch<SetStateAction<string>>
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
          "text-2xl font-medium": purpose === headerPurpose.form,
          "text-md": purpose === headerPurpose.section
        })}
        placeholderClassName={cn("font-lora", {
          "text-2xl": purpose === headerPurpose.form
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
