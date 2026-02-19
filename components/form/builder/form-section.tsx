"use client"

import {
  FormField as Field,
  FieldType,
  FormSection as Section
} from "@/lib/definitions"
import FormField from "./form-field"
import Header from "./header"
import { Button } from "@/components/ui/button"
import { Plus, Rows } from "lucide-react"
import FormCard from "./form-card"
import { fieldTypes } from "@/lib/constants"

interface SectionProps {
  section: Section
  description?: string
  isFirstSection: boolean
  onSectionAdd: () => void
  onTitleChange: (value: string) => void
  onDescriptionChange?: (value: string) => void
  onFieldAdd: (type: FieldType) => void
  onFieldUpdate: (field: Field) => void
  onFieldRemove: (fieldID: string) => void
}

function FormSection({
  section,
  isFirstSection,
  onSectionAdd,
  onTitleChange,
  onDescriptionChange,
  onFieldAdd,
  onFieldUpdate,
  onFieldRemove
}: SectionProps) {
  return (
    <>
      <Header
        childOfFirstSection={isFirstSection}
        title={section.title}
        description={section.description}
        onTitleChange={onTitleChange}
        onDescriptionChange={onDescriptionChange}
      />

      {section.fields.map((field) => {
        return (
          <FormField
            key={field.id}
            field={field}
            onFieldUpdate={onFieldUpdate}
            onFieldRemove={() => onFieldRemove(field.id)}
          />
        )
      })}

      <FormCard className="flex-row flex-wrap justify-center">
        {fieldTypes.map((type) => {
          return (
            <Button variant="outline" onClick={() => onFieldAdd(type.value)}>
              <Plus /> {type.label}
            </Button>
          )
        })}
      </FormCard>

      <Button variant="ghost" className="mt-8 w-full" onClick={onSectionAdd}>
        <Plus /> Section
      </Button>
    </>
  )
}

export default FormSection
