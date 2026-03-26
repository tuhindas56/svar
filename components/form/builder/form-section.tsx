import { Plus } from "lucide-react"

import { FormField as Field, FieldType, FormSection as FormSectionType } from "@/lib/definitions"
import { FIELD_TYPE } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import FormField from "./form-field"
import FormCard from "../form-card"
import Header from "./header"

type SectionProps = {
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

      <FormCard className="border-0 p-0">
        <Button variant="outline" className="flex-1" onClick={() => onAddField(FIELD_TYPE.SHORT)}>
          <Plus /> Add Question
        </Button>
        <Button variant="outline" className="flex-1" onClick={onAddSection}>
          <Plus /> Section
        </Button>
      </FormCard>
    </>
  )
}

export default FormSection
