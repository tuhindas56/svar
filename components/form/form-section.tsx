import { FormSection as FormSectionType } from "@/lib/definitions"
import { Button } from "@/components/ui/button"
import FormField from "./form-field"
import Header from "./header"

interface SectionProps {
  section: FormSectionType
  isFirstSection: boolean
  isLastSection: boolean
  onUpdateField: ({
    fieldId,
    value,
    isCustomAnswer
  }: {
    fieldId: string
    value?: string | string[]
    isCustomAnswer?: boolean
    customAnswer?: string
  }) => void
  onNextClick: () => void
  onPreviousClick: () => void
}

function FormSection({
  section,
  isFirstSection,
  isLastSection,
  onUpdateField,
  onNextClick,
  onPreviousClick
}: SectionProps) {
  return (
    <>
      {!isFirstSection && (
        <Header title={section.title} description={section.description} />
      )}

      {section.fields.map((field) => {
        return (
          <FormField
            key={field.id}
            field={field}
            onUpdateField={onUpdateField}
          />
        )
      })}

      <div className="flex flex-wrap items-center gap-4">
        {!isFirstSection && (
          <Button variant="outline" type="button" onClick={onPreviousClick}>
            Previous
          </Button>
        )}

        {!isLastSection && (
          <Button variant="outline" type="button" onClick={onNextClick}>
            Next
          </Button>
        )}

        {isLastSection && <Button type="submit">Submit</Button>}

        <Button className="ml-auto" variant="ghost" type="button">
          Clear form
        </Button>
      </div>
    </>
  )
}

export default FormSection
