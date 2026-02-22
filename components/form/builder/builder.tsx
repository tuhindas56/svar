"use client"

import { useReducer } from "react"

import {
  FieldType,
  FormField,
  FormSection as FormSectionType
} from "@/lib/definitions"
import { addAt } from "@/lib/utils"
import Toolbar from "./toolbar"
import FormSection from "./form-section"
import { fieldType } from "@/lib/constants"

export type Action =
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
    description: "",
    nextSectionBasedOnAnswer: false
  }
}

function addField(type: FieldType = fieldType.short.value): FormField {
  return {
    id: crypto.randomUUID(),
    type,
    question: "",
    maxAllowedFiles: 1,
    options: ["Option 1"],
    required: false,
    allowCustomAnswer: false
  }
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
                id: crypto.randomUUID()
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

function Builder() {
  const [formSections, dispatch] = useReducer(formSectionsReducer, null, () => [
    {
      id: crypto.randomUUID(),
      title: "",
      fields: [addField(fieldType.short.value)],
      description: "",
      nextSectionBasedOnAnswer: false
    }
  ])

  return (
    <>
      <Toolbar
        sections={formSections}
        onUpdateSection={(section: FormSectionType) => {
          dispatch({
            type: "update_section",
            payload: { sectionID: section.id, section }
          })
        }}
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
              }}
              onUpdateSection={(s: FormSectionType) => {
                dispatch({
                  type: "update_section",
                  payload: { sectionID: section.id, section: s }
                })
              }}
              onRemoveSection={() => {
                dispatch({
                  type: "remove_section",
                  payload: { sectionID: section.id }
                })
              }}
              onAddField={(type: FieldType) => {
                dispatch({
                  type: "add_field",
                  payload: { sectionID: section.id, type }
                })
              }}
              onUpdateField={(field: FormField) => {
                dispatch({
                  type: "update_field",
                  payload: { sectionID: section.id, field }
                })
              }}
              onDuplicateField={(field: FormField, after: number) => {
                dispatch({
                  type: "duplicate_field",
                  payload: { sectionID: section.id, field, after }
                })
              }}
              onRemoveField={(fieldID: string) => {
                dispatch({
                  type: "remove_field",
                  payload: { sectionID: section.id, fieldID }
                })
              }}
            />
          )
        })}
      </div>
    </>
  )
}

export default Builder
