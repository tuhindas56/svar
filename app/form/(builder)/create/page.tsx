"use client"

import { useReducer, useEffect } from "react"

import { fieldType } from "@/lib/constants"
import { addAt } from "@/lib/utils"
import { addField, addSection } from "@/lib/form/builder/utils"
import { FormField, FieldType, FormSection as Section } from "@/lib/definitions"
import FormSection from "@/components/form/builder/form-section"
import Toolbar from "@/components/form/builder/toolbar"

type Action =
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
      type: "remove_field"
      payload: {
        sectionID: string
        fieldID: string
      }
    }

function formSectionsReducer(state: Section[], action: Action) {
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

function Create() {
  const [formSections, dispatch] = useReducer(formSectionsReducer, [
    {
      id: crypto.randomUUID(),
      title: "",
      fields: [addField(fieldType.shortAnswer.value)]
    }
  ])

  function onUndo() {}

  function onRedo() {}

  useEffect(() => console.log(formSections), [formSections])

  return (
    <>
      <Toolbar onUndo={onUndo} onRedo={onRedo} />

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
              onSectionAdd={() => {
                dispatch({
                  type: "add_section",
                  payload: {
                    at: index + 1
                  }
                })
              }}
              onFieldAdd={(type: FieldType) => {
                dispatch({
                  type: "add_field",
                  payload: {
                    sectionID: section.id,
                    type
                  }
                })
              }}
              onFieldUpdate={(field) => {
                dispatch({
                  type: "update_field",
                  payload: { sectionID: section.id, field }
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

export default Create
