"use client"

import { SubmitEvent, useState } from "react"

import { QUESTION_TYPE } from "@/lib/constants"
import type { QuestionType, FormField } from "@/lib/definitions"
import Toolbar from "@/components/form/builder/toolbar"
import Header from "@/components/form/builder/header"
import FormBlock from "@/components/form/builder/form-block"

function Create() {
  const [mode, setMode] = useState<"create" | "preview">("create")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: crypto.randomUUID(),
      type: QUESTION_TYPE.SHORT_ANSWER.value,
      question: ""
    }
  ])

  function onAddBlock(type: QuestionType) {
    switch (type) {
      default:
        setFormFields((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type, question: "" }
        ])
    }
  }

  function onBlockRemove(id: string) {
    if (formFields.length === 1) return
    setFormFields((prev) => prev.filter((block) => block.id !== id))
  }

  function onBlockUpdate(id: string, key: string, value: any) {
    setFormFields((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, [key]: value } : block
      )
    )
  }

  function onUndo() {}

  function onRedo() {}

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(formFields)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Toolbar
        totalQuestions={formFields.length}
        onUndo={onUndo}
        onRedo={onRedo}
      />
      <Header
        title={title}
        onTitleChange={setTitle}
        description={description}
        onDescriptionChange={setDescription}
      />
      {formFields.map((block) => {
        return (
          <FormBlock
            key={block.id}
            block={block}
            onBlockUpdate={onBlockUpdate}
            onBlockRemove={onBlockRemove}
          />
        )
      })}
    </div>
  )
}

export default Create
