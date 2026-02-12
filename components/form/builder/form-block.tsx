"use client"

import type { ChangeEvent, FocusEvent } from "react"

import { FormBlockObject } from "@/lib/definitions"
import { Input } from "@/components/ui/input"
import FormBlockCard from "./form-block-card"
import QuestionTypeSelect from "./question-type-select"
import { cn } from "@/lib/utils"

interface FormBlockProps {
  block: FormBlockObject
  onBlockUpdate: (id: string, key: string, value: any) => void
  onBlockRemove: (id: string) => void
}

function FormBlock({
  block,
  onBlockUpdate = () => {},
  onBlockRemove = () => {}
}: FormBlockProps) {
  function onQuestionChange(e: FocusEvent<HTMLDivElement>) {
    onBlockUpdate(block.id, "question", e.target.textContent)
  }

  console.log(block)

  return (
    <FormBlockCard>
      <div className="flex justify-between gap-2">
        <div
          className={cn(
            block.question.length === 0 && "text-gray-500",
            "w-100 text-wrap focus:outline-0"
          )}
          onBlur={onQuestionChange}
          contentEditable
        />

        <QuestionTypeSelect block={block} onBlockUpdate={onBlockUpdate} />
      </div>
      <div>
        {block.type === "short" && (
          <Input
            className="w-80 rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
            disabled
          />
        )}
      </div>
    </FormBlockCard>
  )
}

export default FormBlock
