"use client"

import { Plus } from "lucide-react"

import {
  FormField as Field,
  FieldType,
  FormSection as Section
} from "@/lib/definitions"
import { fieldTypes } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import FormField from "./form-field"
import FormCard from "./form-card"
import Header from "./header"

interface SectionProps {
  section: Section
  isFirstSection: boolean
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onAddSection: () => void
  onAddField: (type: FieldType) => void
  onFieldUpdate: (field: Field) => void
  onFieldDuplicate: (field: Field, at: number) => void
  onFieldRemove: (fieldID: string) => void
}

function FormSection({
  section,
  isFirstSection,
  onTitleChange,
  onDescriptionChange,
  onAddSection,
  onAddField,
  onFieldUpdate,
  onFieldDuplicate,
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

      {section.fields.map((field, index) => {
        return (
          <FormField
            key={field.id}
            field={field}
            onFieldUpdate={onFieldUpdate}
            onFieldDuplicate={() => onFieldDuplicate(field, index)}
            onFieldRemove={() => onFieldRemove(field.id)}
          />
        )
      })}

      <FormCard className="flex-row flex-wrap justify-center">
        {fieldTypes.map((type, index) => {
          return (
            <Button
              key={index}
              variant="outline"
              onClick={() => onAddField(type.value)}
            >
              <Plus /> {type.label}
            </Button>
          )
        })}
      </FormCard>

      <Button variant="ghost" className="mt-8 w-full" onClick={onAddSection}>
        <Plus /> Section
      </Button>
    </>
  )
}

export default FormSection
