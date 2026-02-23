import { Plus } from "lucide-react"

import {
  FormField as Field,
  FieldType,
  FormSection as FormSectionType
} from "@/lib/definitions"
import { fieldTypes } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import FormField from "./form-field"
import FormCard from "./form-card"
import Header from "./header"

interface SectionProps {
  section: FormSectionType
  isFirstSection: boolean
  showDeleteSection: boolean
  onAddSection: () => void
  onUpdateSection: (section: FormSectionType) => void
  onDuplicateSection: () => void
  onRemoveSection: () => void
  onAddField: (type: FieldType) => void
  onUpdateField: (field: Field) => void
  onDuplicateField: (field: Field, after: number) => void
  onRemoveField: (fieldID: string) => void
}

function FormSection({
  section,
  isFirstSection,
  showDeleteSection,
  onAddSection,
  onUpdateSection,
  onDuplicateSection,
  onRemoveSection,
  onAddField,
  onUpdateField,
  onDuplicateField,
  onRemoveField
}: SectionProps) {
  return (
    <>
      <Header
        childOfFirstSection={isFirstSection}
        title={section.title}
        onTitleChange={(title: string) => {
          onUpdateSection({ ...section, title })
        }}
        description={section.description}
        onDescriptionChange={(description: string) => {
          onUpdateSection({ ...section, description })
        }}
        showDeleteSection={showDeleteSection}
        onDuplicateSection={onDuplicateSection}
        onRemoveSection={onRemoveSection}
      />

      {section.fields.map((field, index) => {
        return (
          <FormField
            key={field.id}
            field={field}
            onUpdateField={onUpdateField}
            onDuplicateField={() => onDuplicateField(field, index)}
            onRemoveField={() => onRemoveField(field.id)}
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
