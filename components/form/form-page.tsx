"use client"

import { SubmitEvent, useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { submitFormAction } from "@/lib/actions/form"
import type {
  FormFieldErrors,
  FormFieldResponses,
  FormSchema,
  FormSection as FormSectionType
} from "@/lib/definitions"
import { CUSTOM_ANSWER } from "@/lib/constants"
import Header from "./header"
import FormSection from "./form-section"
import SubmissionSuccess from "./submission-success"

interface Props {
  form: FormSchema
}

function prepareResponses(sections: FormSectionType[]) {
  const state: FormFieldResponses = {}

  for (const section of sections) {
    for (const field of section.fields) {
      state[field.id] = { value: null, customAnswer: null, file: null }
    }
  }

  return state
}

function prepareErrors(sections: FormSectionType[]) {
  const state: FormFieldErrors = {}

  for (const section of sections) {
    for (const field of section.fields) {
      state[field.id] = null
    }
  }

  return state
}

function FormPage({ form }: Props) {
  const [activeSection, setActiveSection] = useState(0)
  const [responses, setResponses] = useState<FormFieldResponses>(() =>
    prepareResponses(form.sections)
  )
  const [errors, setErrors] = useState<FormFieldErrors>(() =>
    prepareErrors(form.sections)
  )
  const [submitted, setSubmitted] = useState(false)

  const requiredFieldsInSection = useMemo(
    () =>
      new Set(
        form.sections[activeSection].fields
          .filter((field) => field.required)
          .map((field) => field.id)
      ),
    [activeSection, form.sections]
  )

  const validate = useCallback(() => {
    let hasErrors = false
    const nextErrorState: FormFieldErrors = {}

    for (const [fieldId, response] of Object.entries(responses)) {
      if (requiredFieldsInSection.has(fieldId)) {
        if (
          response.value == null ||
          response.value.length === 0 ||
          (response.value === CUSTOM_ANSWER && !response.customAnswer)
        ) {
          nextErrorState[fieldId] = "This question is required."
          hasErrors = true
        } else {
          nextErrorState[fieldId] = null
        }
      }
    }

    setErrors(nextErrorState)

    return !hasErrors
  }, [responses, requiredFieldsInSection])

  function onNextClick() {
    if (!validate()) return

    setActiveSection((prev) => prev + 1)
  }

  function onPreviousClick() {
    setActiveSection((prev) => prev - 1)
  }

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (!validate()) return

    const result = await submitFormAction(form.id, form.sections)

    if (result.success) {
      setSubmitted(true)
    } else {
      toast.error("Failed to submit")
    }
  }

  useEffect(() => {
    const timeout = setTimeout(validate, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [validate])

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex flex-col gap-8 px-4 py-8 md:w-10/12 lg:w-3xl"
    >
      <Header title={form.name} description={form.description} isFormHeader />

      {!submitted && (
        <FormSection
          section={form.sections[activeSection]}
          responses={responses}
          setResponses={setResponses}
          errors={errors}
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
