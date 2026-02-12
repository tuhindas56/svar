"use client"

import { useMemo } from "react"
import { Select } from "@base-ui/react"
import { ChevronDown } from "lucide-react"

import { QUESTION_TYPE } from "@/lib/constants"
import { FormBlockObject } from "@/lib/definitions"

interface QuestionTypeSelectProps {
  block: FormBlockObject
  onBlockUpdate: (id: string, key: string, value: any) => void
}

const questionTypes = Object.values(QUESTION_TYPE).map((val) => ({
  label: val[0].toUpperCase() + val.slice(1),
  value: val
}))

function QuestionTypeSelect({ block, onBlockUpdate }: QuestionTypeSelectProps) {
  const selectedType = useMemo(
    () => questionTypes.find((type) => block.type === type.value)!.label,
    [block.type]
  )

  function onQuestionTypeChange(value: string | null) {
    onBlockUpdate(block.id, "type", value)
  }

  return (
    <Select.Root
      onValueChange={onQuestionTypeChange}
      defaultValue={QUESTION_TYPE.SHORT_ANSWER}
    >
      <Select.Trigger className="outline-primary/40 flex h-fit min-w-40 items-center justify-between gap-2 rounded-lg border border-gray-200 p-2 text-sm focus:outline">
        <Select.Value>{selectedType}</Select.Value>
        <Select.Icon>
          <ChevronDown size={16} className="text-gray-500" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup className="transition [data-ended]:scale-95 [data-open]:duration-75">
            <Select.List className="min-w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {questionTypes.map((type) => {
                return (
                  <Select.Item
                    value={type.value}
                    key={type.value}
                    className="outline-primary/40 rounded-md p-2 text-sm hover:bg-gray-100"
                  >
                    <Select.ItemText>{type.label}</Select.ItemText>
                  </Select.Item>
                )
              })}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

export default QuestionTypeSelect
