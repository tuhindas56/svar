import { FIELD_TYPE } from "./constants"

interface BaseField {
  id: string
  question: string
  required: boolean
  error?: string | null
  value?: string | string[]
}

interface TextField extends BaseField {
  type:
    | typeof FIELD_TYPE.SHORT
    | typeof FIELD_TYPE.LONG
    | typeof FIELD_TYPE.DATE
    | typeof FIELD_TYPE.TIME
}

interface CheckboxOrRadioField extends BaseField {
  type: typeof FIELD_TYPE.CHECKBOX | typeof FIELD_TYPE.RADIO
  allowCustomAnswer: boolean
  customAnswer?: string
  options: {
    value: string
    toSection?: string
  }[]
}

interface FileField extends BaseField {
  type: typeof FIELD_TYPE.FILE
  maxAllowedFiles: number
}

export type FormField = TextField | CheckboxOrRadioField | FileField

export interface FormSection {
  id: string
  title: string
  description?: string
  fields: FormField[]
}

export interface FormSchema {
  id: string
  name: string
  description?: string
  userId: string
  created: Date
  modified: Date
  sections: FormSection[]
  published: boolean
}

export type FieldType = (typeof FIELD_TYPE)[keyof typeof FIELD_TYPE]
