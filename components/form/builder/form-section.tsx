"use client"

import { FormField as Field, FormSection as Section } from "@/lib/definitions"
import FormField from "./form-field"
import Header, { headerPurpose } from "./header"

interface SectionProps {
  section: Section
  onTitleChange: (value: string) => void
  description?: string
  onDescriptionChange?: (value: string) => void
  onFieldUpdate: (field: Field) => void
  onFieldRemove: (fieldID: string) => void
}

function FormSection({
  section,
  onTitleChange,
  onDescriptionChange,
  onFieldUpdate,
  onFieldRemove
}: SectionProps) {
  return (
    <>
      <Header
        title={section.title}
        onTitleChange={onTitleChange}
        description={section.description}
        onDescriptionChange={onDescriptionChange}
        purpose={headerPurpose.section}
      />

      {section.fields.map((field) => {
        return (
          <FormField
            key={field.id}
            field={field}
            onFieldUpdate={(field) => onFieldUpdate(field)}
            onFieldRemove={() => onFieldRemove(field.id)}
          />
        )
      })}
    </>
  )
}

export default FormSection
