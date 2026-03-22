import { Dispatch, SetStateAction } from "react"

import type {
  FormFieldErrors,
  FormFieldResponses,
  FormSection as FormSectionType
} from "@/lib/definitions"
import { Button } from "@/components/ui/button"
import FormField from "./form-field"
import Header from "./header"

interface SectionProps {
  section: FormSectionType
  isFirstSection: boolean
  isLastSection: boolean
  responses: FormFieldResponses
  setResponses: Dispatch<SetStateAction<FormFieldResponses>>
  errors: FormFieldErrors
  onNextClick: () => void
  onPreviousClick: () => void
}

function FormSection({
  section,
  isFirstSection,
  isLastSection,
  responses,
  setResponses,
  errors,
  onNextClick,
  onPreviousClick
}: SectionProps) {
  return (
    <>
      {!isFirstSection && <Header title={section.title} description={section.description} />}

      {section.fields.map((field) => {
        return (
          <FormField
            key={field.id}
            field={field}
            responses={responses}
            setResponses={setResponses}
            errors={errors}
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
