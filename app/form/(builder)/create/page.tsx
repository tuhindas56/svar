"use client"

import { useState } from "react"

import type { FormBuilderMode } from "@/app/lib/definitions"
import Toolbar from "@/app/ui/form/builder/toolbar"
import Header from "@/app/ui/form/builder/header"
import FormBlock from "@/app/ui/form/builder/form-block"

function Create() {
  const [mode, setMode] = useState<FormBuilderMode>("create")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [formBlocks, setFormBlocks] = useState([{}])

  function onAddBlock(type: string) {
    switch (type) {
      default:
        setFormBlocks((prev) => [...prev, {}])
    }
  }

  function onBlockRemove(index: number) {
    setFormBlocks((prev) => prev.filter((_, idx) => idx !== index))
  }

  function onBlockUpdate(index: number, key: string, value: any) {
    setFormBlocks((prev) =>
      prev.map((block, idx) =>
        idx === index ? { ...block, [key]: value } : block
      )
    )
  }

  function onUndo() {}

  function onRedo() {}

  return (
    <form className="flex flex-col items-center gap-8">
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
      {formBlocks.map((block, index) => {
        return (
          <FormBlock
            key={index}
            block={block}
            onBlockUpdate={onBlockUpdate}
            onBlockRemove={onBlockRemove}
          />
        )
      })}
    </form>
  )
}

export default Create
