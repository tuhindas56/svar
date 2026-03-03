"use client"

import { useEffect, useReducer, useState } from "react"

import { publishFormAction, saveFormSectionsAction } from "@/lib/actions/form"
import { FIELD_TYPE } from "@/lib/constants"
import {
  FieldType,
  FormField,
  FormSchema,
  FormSection as FormSectionType
} from "@/lib/definitions"
import { addAt } from "@/lib/utils"
import Toolbar from "./toolbar"
import FormSection from "./form-section"
import { toast } from "sonner"
import { usePathname } from "next/navigation"

interface BuilderProps {
  form: FormSchema
}

type Action =
  | {
      type: "add_section"
      payload: {
        after: number
      }
    }
  | {
      type: "update_section"
      payload: {
        sectionID: string
        section: FormSectionType
      }
    }
  | {
      type: "duplicate_section"
      payload: {
        section: FormSectionType
        after: number
      }
    }
  | {
      type: "remove_section"
      payload: {
        sectionID: string
      }
    }
  | {
      type: "add_field"
      payload: {
        sectionID: string
        type: FieldType
        options?: string[]
      }
    }
  | {
      type: "update_field"
      payload: {
        sectionID: string
        field: FormField
      }
    }
  | {
      type: "duplicate_field"
      payload: {
        sectionID: string
        field: FormField
        after: number
      }
    }
  | {
      type: "remove_field"
      payload: {
        sectionID: string
        fieldID: string
      }
    }

function addSection(): FormSectionType {
  return {
    id: crypto.randomUUID(),
    title: "",
    fields: [],
    description: ""
  }
}

export function addField(type: FieldType): FormField {
  const base = {
    id: crypto.randomUUID(),
    question: "",
    required: false
  }

  if (type === FIELD_TYPE.FILE) {
    return {
      ...base,
      type,
      maxAllowedFiles: 1
    }
  }

  if (type === FIELD_TYPE.CHECKBOX || type === FIELD_TYPE.RADIO) {
    return {
      ...base,
      type,
      options: [{ value: "Option 1" }]
    }
  }

  return { ...base, type }
}

function formSectionsReducer(state: FormSectionType[], action: Action) {
  switch (action.type) {
    case "add_section":
      return action.payload.after !== undefined
        ? addAt(state, action.payload.after + 1, addSection())
        : [...state, addSection()]

    case "update_section":
      return state.map((section) => {
        return section.id === action.payload.sectionID
          ? {
              ...section,
              ...action.payload.section
            }
          : section
      })

    case "duplicate_section":
      return addAt(state, action.payload.after + 1, {
        ...action.payload.section,
        id: crypto.randomUUID(),
        title: `Copy of ${action.payload.section.title || "untitled section"}`
      })

    case "remove_section":
      return state.filter((section) => section.id !== action.payload.sectionID)

    case "add_field":
      return state.map((section) => {
        return section.id === action.payload.sectionID
          ? {
              ...section,
              fields: [...section.fields, addField(action.payload.type)]
            }
          : section
      })

    case "update_field":
      return state.map((section) => {
        return section.id === action.payload.sectionID
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === action.payload.field.id
                  ? action.payload.field
                  : field
              )
            }
          : section
      })

    case "duplicate_field":
      return state.map((section) => {
        return section.id === action.payload.sectionID
          ? {
              ...section,
              fields: addAt(section.fields, action.payload.after + 1, {
                ...action.payload.field,
                id: crypto.randomUUID(),
                question: `Copy of ${
                  action.payload.field.question ||
                  "question" + (action.payload.after + 1)
                }`
              })
            }
          : section
      })

    case "remove_field":
      return state.map((section) => {
        return section.id === action.payload.sectionID
          ? {
              ...section,
              fields: section.fields.filter(
                (field) => field.id !== action.payload.fieldID
              )
            }
          : section
      })

    default:
      return state
  }
}

function Builder({ form }: BuilderProps) {
  const [modified, setModified] = useState(false)
  const [formSections, dispatch] = useReducer(formSectionsReducer, null, () =>
    form.sections.length > 0
      ? form.sections
      : [
          {
            id: crypto.randomUUID(),
            title: form.name,
            fields: [addField(FIELD_TYPE.SHORT)],
            description: ""
          }
        ]
  )

  const pathname = usePathname()

  async function onSaveForm() {
    const { success, error } = await saveFormSectionsAction(
      form.id,
      formSections,
      pathname
    )

    if (success) {
      setModified(false)
      toast.success("Form saved")
    } else {
      toast.error(error)
    }
  }

  async function onPublishForm() {
    await publishFormAction(form.id, formSections)
    setModified(false)
  }

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (modified) {
        e.preventDefault()
      }
    }

    window.addEventListener("beforeunload", beforeUnload)

    return () => {
      window.removeEventListener("beforeunload", beforeUnload)
    }
  }, [modified])

  return (
    <>
      <Toolbar
        formName={form.name}
        onSaveForm={onSaveForm}
        onPublishForm={onPublishForm}
        isPublished={form.published}
      />

      <div className="mx-auto flex flex-col gap-8 px-4 py-8 md:w-10/12 lg:w-3xl">
        {formSections.map((section, index) => {
          return (
            <FormSection
              key={section.id}
              section={section}
              isFirstSection={index === 0}
              showDeleteSection={formSections.length > 1}
              onAddSection={() => {
                dispatch({
                  type: "add_section",
                  payload: { after: index }
                })
                setModified(true)
              }}
              onUpdateSection={(s: FormSectionType) => {
                dispatch({
                  type: "update_section",
                  payload: { sectionID: section.id, section: s }
                })
                setModified(true)
              }}
              onDuplicateSection={() => {
                dispatch({
                  type: "duplicate_section",
                  payload: { section, after: index }
                })
                setModified(true)
              }}
              onRemoveSection={() => {
                dispatch({
                  type: "remove_section",
                  payload: { sectionID: section.id }
                })
                setModified(true)
              }}
              onAddField={(type: FieldType) => {
                dispatch({
                  type: "add_field",
                  payload: { sectionID: section.id, type }
                })
                setModified(true)
              }}
              onUpdateField={(field: FormField) => {
                dispatch({
                  type: "update_field",
                  payload: { sectionID: section.id, field }
                })
                setModified(true)
              }}
              onDuplicateField={(field: FormField, after: number) => {
                dispatch({
                  type: "duplicate_field",
                  payload: { sectionID: section.id, field, after }
                })
                setModified(true)
              }}
              onRemoveField={(fieldID: string) => {
                dispatch({
                  type: "remove_field",
                  payload: { sectionID: section.id, fieldID }
                })
                setModified(true)
              }}
            />
          )
        })}
      </div>
    </>
  )
}

export default Builder
