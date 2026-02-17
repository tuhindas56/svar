"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { fieldTypes } from "@/lib/constants"
import { FieldType, FormField } from "@/lib/definitions"

interface FieldTypeSelectProps {
  field: FormField
  onFieldUpdate: (field: FormField) => void
}

function FieldTypeSelect({ field, onFieldUpdate }: FieldTypeSelectProps) {
  function onValueChange(type: FieldType) {
    const next = { ...field, type } satisfies FormField

    onFieldUpdate(next)
  }

  return (
    <Select onValueChange={onValueChange} value={field.type}>
      <SelectTrigger className="w-50">
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
