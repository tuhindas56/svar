"use client"

import { useState, useReducer, useEffect } from "react"

import { fieldType } from "@/lib/constants"
import { FormField, FieldType, FormSection as Section } from "@/lib/definitions"
import Header, { headerPurpose } from "@/components/form/builder/header"
import FormSection from "@/components/form/builder/form-section"
import Toolbar from "@/components/form/builder/toolbar"

type Action =
  | {
      type: "add_section"
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
        fieldID: string
        type: FieldType
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

function addSection() {
  return {
    id: crypto.randomUUID(),
    title: "",
    fields: []
  }
}

function addField(type: FieldType) {
  switch (type) {
    case fieldType.shortAnswer.value:
    default:
      return {
        id: crypto.randomUUID(),
        type: fieldType.shortAnswer.value,
        question: "",
        value: ""
      }
  }
}

function formSectionReducer(state: Section[], action: Action) {
  switch (action.type) {
    case "add_section":
      return [...state, addSection()]

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
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formSections, dispatch] = useReducer(formSectionReducer, [
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
    <div className="flex flex-col items-center gap-8">
      <Toolbar onUndo={onUndo} onRedo={onRedo} />

      <Header
        title={formTitle}
        onTitleChange={setFormTitle}
        description={formDescription}
        onDescriptionChange={setFormDescription}
        purpose={headerPurpose.form}
      />

      {formSections.map((section) => {
        return (
          <FormSection
            key={section.id}
            section={section}
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
  )
}

export default Create
