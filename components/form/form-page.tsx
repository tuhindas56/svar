"use client"

import { SubmitEvent, useState } from "react"
import { toast } from "sonner"

import { submitFormAction } from "@/lib/actions/form"
import { FormSchema, FormSection as FormSectionType } from "@/lib/definitions"
import Header from "./header"
import FormSection from "./form-section"
import SubmissionSuccess from "./submission-success"

interface Props {
  form: FormSchema
}

function FormPage({ form }: Props) {
  const [activeSection, setActiveSection] = useState(0)
  const [sections, setSections] = useState<FormSectionType[]>(form.sections)
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const validated = sections[activeSection].fields
      .filter((field) => field.required)
      .every((field) => field.value && field.value.length > 0)

    if (!validated) {
      setSections((prev) =>
        prev.map((section, index) => {
          if (index !== activeSection) return section

          return {
            ...section,
            fields: section.fields.map((field) => {
              if (field.required && !field?.value?.length) {
                return { ...field, error: "This is a required question" }
              }
              return { ...field, error: null }
            })
          }
        })
      )
    } else {
      setSections((prev) =>
        prev.map((section, index) => {
          if (index !== activeSection) return section

          return {
            ...section,
            fields: section.fields.map((field) => {
              return { ...field, error: null }
            })
          }
        })
      )
    }

    return validated
  }

  function onNextClick() {
    if (!validate()) return

    setActiveSection((prev) => prev + 1)
  }

  function onPreviousClick() {
    setActiveSection((prev) => prev - 1)
  }

  function onUpdateField({
    fieldId,
    value,
    isCustomAnswer,
    customAnswer
  }: {
    fieldId: string
    value?: string | string[]
    isCustomAnswer?: boolean
    customAnswer?: string
  }) {
    setSections((prev) => {
      return prev.map((section) => ({
        ...section,
        fields: section.fields.map((field) => {
          if (field.id !== fieldId) return field
          if (isCustomAnswer) return { ...field, customAnswer }

          return { ...field, value }
        })
      }))
    })
  }

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (!validate()) return

    const result = await submitFormAction(form.id, sections)

    if (result.success) {
      setSubmitted(true)
    } else {
      toast.error("Failed to submit")
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex flex-col gap-8 px-4 py-8 md:w-10/12 lg:w-3xl"
    >
      <Header title={form.name} description={form.description} isFormHeader />

      {!submitted && (
        <FormSection
          section={sections[activeSection]}
          onUpdateField={onUpdateField}
          isFirstSection={activeSection === 0}
          isLastSection={activeSection === form.sections.length - 1}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
        />
      )}

      {submitted && <SubmissionSuccess />}
    </form>
  )
}

export default FormPage
