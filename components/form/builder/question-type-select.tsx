"use client"

import { useMemo } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { questionTypes } from "@/lib/constants"
import { FormField } from "@/lib/definitions"

interface QuestionTypeSelectProps {
  block: FormField
  onBlockUpdate: (id: string, key: string, value: any) => void
}

function QuestionTypeSelect({ block, onBlockUpdate }: QuestionTypeSelectProps) {
  const selectedType = useMemo(
    () => questionTypes.find((type) => block.type === type.value)!.label,
    [block.type]
  )

  function onQuestionTypeChange(value: string | null) {
    onBlockUpdate(block.id, "type", value)
  }

  return (
    <Select onValueChange={onQuestionTypeChange} value={block.type}>
      <SelectTrigger className="outline-primary/40 flex h-fit min-w-40 items-center justify-between gap-2 rounded-lg border border-gray-200 p-2 text-sm focus:outline">
        <SelectValue>{selectedType}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {questionTypes.map((type) => {
            return (
              <SelectItem
                value={type.value}
                key={type.value}
                className="outline-primary/40 rounded-md p-2 text-sm hover:bg-gray-100"
              >
                {type.label}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default QuestionTypeSelect
