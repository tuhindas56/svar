"use client"

import { SubmitEvent, useState } from "react"

import { QUESTION_TYPE } from "@/lib/constants"
import type {
  FormBuilderMode,
  FormBlockObject,
  QuestionType
} from "@/lib/definitions"
import Toolbar from "@/components/form/builder/toolbar"
import Header from "@/components/form/builder/header"
import FormBlock from "@/components/form/builder/form-block"

function Create() {
  const [mode, setMode] = useState<FormBuilderMode>("create")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [formBlocks, setFormBlocks] = useState<FormBlockObject[]>([
    { id: crypto.randomUUID(), type: QUESTION_TYPE.SHORT_ANSWER, question: "" }
  ])

  function onAddBlock(type: QuestionType) {
    switch (type) {
      default:
        setFormBlocks((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type, question: "" }
        ])
    }
  }

  function onBlockRemove(id: string) {
    if (formBlocks.length === 1) return
    setFormBlocks((prev) => prev.filter((block) => block.id !== id))
  }

  function onBlockUpdate(id: string, key: string, value: any) {
    setFormBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, [key]: value } : block
      )
    )
  }

  function onUndo() {}

  function onRedo() {}

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(formBlocks)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Toolbar
        totalQuestions={formBlocks.length}
        onUndo={onUndo}
        onRedo={onRedo}
      />
      <Header
        title={title}
        onTitleChange={setTitle}
        description={description}
        onDescriptionChange={setDescription}
      />
      {formBlocks.map((block) => {
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
