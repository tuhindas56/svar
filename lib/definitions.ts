import { fieldType } from "./constants"

export type FieldType = (typeof fieldType)[keyof typeof fieldType]["value"]

export type FieldValue = string | number | File | string[] | number[]

export interface FormField {
  id: string
  type: FieldType
  question: string
  required?: boolean
  options?: string[]
}

export interface FormSection {
  id: string
  title: string
  fields: FormField[]
  description?: string
  fromSection?: string
  toSection?: string
}
