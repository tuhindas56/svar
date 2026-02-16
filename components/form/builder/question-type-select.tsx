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
import { Field } from "@/lib/definitions"

interface QuestionTypeSelectProps {
  field: Field
  onFieldUpdate: (id: string, key: string, value: any) => void
}

function QuestionTypeSelect({ field, onFieldUpdate }: QuestionTypeSelectProps) {
  const selectedType = useMemo(
    () => questionTypes.find((type) => field.type === type.value)!.label,
    [field.type]
  )

  function onQuestionTypeChange(value: string | null) {
    onFieldUpdate(field.id, "type", value)
  }

  return (
    <Select onValueChange={onQuestionTypeChange} value={field.type}>
      <SelectTrigger className="w-50">
        <SelectValue>{selectedType}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {questionTypes.map((type) => {
            return (
              <SelectItem value={type.value} key={type.value}>
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
