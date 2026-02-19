import { fieldType } from "@/lib/constants"
import { FieldType, FormField, FormSection } from "@/lib/definitions"

export function addSection(): FormSection {
  return {
    id: crypto.randomUUID(),
    title: "",
    fields: []
  }
}

export function addField(type: FieldType): FormField {
  return {
    id: crypto.randomUUID(),
    type: type || fieldType.shortAnswer.value,
    question: "",
    required: false,
    options:
      type === fieldType.checkbox.value || type === fieldType.multiChoice.value
        ? ["Option 1"]
        : []
  }
}
