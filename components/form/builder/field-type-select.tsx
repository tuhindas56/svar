"use client"

import { fieldTypes } from "@/lib/constants"
import { FieldType } from "@/lib/definitions"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

interface FieldTypeSelectProps {
  selectedType: FieldType
  onFieldUpdate: (selectedType: FieldType) => void
}

function FieldTypeSelect({
  selectedType,
  onFieldUpdate
}: FieldTypeSelectProps) {
  return (
    <Select onValueChange={onFieldUpdate} value={selectedType}>
      <SelectTrigger className="min-w-50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {fieldTypes.map((type) => {
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

export default FieldTypeSelect
