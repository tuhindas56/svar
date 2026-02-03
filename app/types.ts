import { FIELD_TYPES } from "./lib/constants"

type FieldType = (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES]

export interface FormField {
  type: FieldType
  id: string
}
