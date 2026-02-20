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
      payload?: {
        at: number
      }
    }
  | {
      type: "remove_section"
      payload: {
        sectionID: string
      }
    }
  | {
      type: "update_section_title" | "update_section_description"
      payload: {
        sectionID: string
        value: string
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
    fromSection: "",
    toSection: ""
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
      return action?.payload?.at !== undefined
        ? addAt(state, action.payload.at, addSection())
        : [...state, addSection()]

    case "remove_section":
      return state.filter((section) => section.id !== action.payload.sectionID)

    case "update_section_title":
      return state.map((section) => {
        return section.id === action.payload.sectionID
          ? {
              ...section,
              title: action.payload.value
            }
          : section
      })

    case "update_section_description":
      return state.map((section) => {
        return section.id === action.payload.sectionID
          ? {
              ...section,
              description: action.payload.value
            }
          : section
      })

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
  const [formSections, dispatch] = useReducer(formSectionsReducer, [
    {
      id: crypto.randomUUID(),
      title: "",
      fields: [addField(fieldType.short.value)],
      description: "",
      fromSection: "",
      toSection: ""
    }
  ])

  return (
    <>
      <Toolbar />

      <div className="mx-auto flex flex-col gap-8 px-4 py-8 md:w-10/12 lg:w-3xl">
        {formSections.map((section, index) => {
          return (
            <FormSection
              key={section.id}
              section={section}
              isFirstSection={index === 0}
              onTitleChange={(value: string) => {
                dispatch({
                  type: "update_section_title",
                  payload: { sectionID: section.id, value }
                })
              }}
              onDescriptionChange={(value: string) => {
                dispatch({
                  type: "update_section_description",
                  payload: { sectionID: section.id, value }
                })
              }}
              onAddSection={() => {
                dispatch({
                  type: "add_section",
                  payload: { at: index + 1 }
                })
              }}
              onAddField={(type: FieldType) => {
                dispatch({
                  type: "add_field",
                  payload: { sectionID: section.id, type }
                })
              }}
              onFieldUpdate={(field) => {
                dispatch({
                  type: "update_field",
                  payload: { sectionID: section.id, field }
                })
              }}
              onFieldDuplicate={(field: FormField, at: number) => {
                dispatch({
                  type: "duplicate_field",
                  payload: { sectionID: section.id, field, after: at }
                })
              }}
              onFieldRemove={(fieldID: string) => {
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
