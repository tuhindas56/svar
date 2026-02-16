"use client"

import { Fragment, SubmitEvent, useMemo, useState } from "react"

import { QUESTION_TYPE } from "@/lib/constants"
import { Section } from "@/lib/definitions"
import Toolbar from "@/components/form/builder/toolbar"
import Header, { headerPurpose } from "@/components/form/builder/header"
import FormField from "@/components/form/builder/form-field"

function Create() {
  // const [mode, setMode] = useState<"create" | "preview">("create")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [formSections, setFormSections] = useState<Section[]>([
    {
      id: crypto.randomUUID(),
      title: "",
      fields: [
        {
          id: crypto.randomUUID(),
          type: QUESTION_TYPE.SHORT_ANSWER.value,
          question: "",
          value: ""
        }
      ]
    }
  ])

  const totalQuestions = useMemo(
    () =>
      formSections.reduce((total, section) => section.fields.length + total, 0),
    [formSections]
  )

  function onAddSection() {
    setFormSections((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        fields: []
      }
    ])
  }

  function onAddField(sectionID: string) {
    setFormSections((prev) =>
      prev.map((section) =>
        section.id === sectionID
          ? {
              ...section,
              title: "",
              fields: [
                ...section.fields,
                {
                  id: crypto.randomUUID(),
                  type: QUESTION_TYPE.SHORT_ANSWER.value,
                  question: "",
                  value: ""
                }
              ]
            }
          : section
      )
    )
  }

  function onFieldDuplicate(sectionID: string, fieldID: string) {
    setFormSections((prev) =>
      prev.map((section) =>
        section.id === sectionID
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id !== fieldID)
            }
          : section
      )
    )
  }

  function onFieldRemove(sectionID: string, fieldID: string) {
    setFormSections((prev) =>
      prev.map((section) =>
        section.id === sectionID
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id !== fieldID)
            }
          : section
      )
    )
  }

  function onFieldUpdate(
    sectionID: string,
    fieldID: string,
    key: string,
    value: any
  ) {
    // setFormFields((prev) =>
    //   prev.map((block) =>
    //     block.id === id ? { ...block, [key]: value } : block
    //   )
    // )

    setFormSections((prev) =>
      prev.map((section) => {
        return section.id === sectionID
          ? {
              ...section,
              fields: section.fields.map((field) => {
                return field.id === fieldID
                  ? {
                      ...field,
                      [key]: value
                    }
                  : field
              })
            }
          : section
      })
    )
  }

  function onUndo() {}

  function onRedo() {}

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Toolbar
        totalQuestions={totalQuestions}
        onUndo={onUndo}
        onRedo={onRedo}
      />
      <Header
        title={title}
        onTitleChange={setTitle}
        description={description}
        onDescriptionChange={setDescription}
        purpose={headerPurpose.form}
      />
      <div className="custom-pattern h-5 w-3xl"></div>
      {formSections.map((section, index) => {
        return (
          <Fragment key={section.id}>
            {/*{index > 0 && <Separator className="my-4 lg:w-3xl!" />}*/}
            {index > 0 && <div className="custom-pattern h-5 w-3xl"></div>}

            <Header
              title={title}
              onTitleChange={setTitle}
              description={description}
              onDescriptionChange={setDescription}
              purpose={headerPurpose.section}
            />
            {section.fields.map((field) => {
              return (
                <FormField
                  key={field.id}
                  field={field}
                  onFieldUpdate={(key, value) =>
                    onFieldUpdate(section.id, field.id, key, value)
                  }
                  onFieldRemove={() => onFieldRemove(section.id, field.id)}
                />
              )
            })}
          </Fragment>
        )
      })}
    </div>
  )
}

export default Create
