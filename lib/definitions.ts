import { FIELD_TYPE } from "./constants"

export type FieldType = (typeof FIELD_TYPE)[keyof typeof FIELD_TYPE]

type BaseField = {
  id: string
  question: string
  required: boolean
}

type TextField = BaseField & {
  type: typeof FIELD_TYPE.SHORT | typeof FIELD_TYPE.LONG
}

type CheckboxOrRadioField = BaseField & {
  type: typeof FIELD_TYPE.CHECKBOX | typeof FIELD_TYPE.RADIO
  allowCustomAnswer: boolean
  options: {
    value: string
    toSection?: string
  }[]
}

export type FormField = TextField | CheckboxOrRadioField

export type FormSection = {
  id: string
  title: string
  description?: string
  fields: FormField[]
}

export type FormSchema = {
  id: string
  name: string
  description?: string
  userId: string
  created: Date
  modified: Date
  sections: FormSection[]
  published: boolean
  anonymousSubmissions: boolean
  receivingSubmissions: boolean
}

export type FormFieldResponses = {
  [key: string]: {
    question: string
    value: string | string[] | null
    customAnswer: string | null
    file: File | null
  }
}

export type FormFieldErrors = {
  [key: string]: string | null
}
