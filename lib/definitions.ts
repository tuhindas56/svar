import { QUESTION_TYPE } from "./constants"

export type QuestionType =
  (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE]["value"]

type FieldValue = string | number | File | string[] | number[]

export interface Field {
  id: string
  type: QuestionType
  question: string
  value: FieldValue
}

export interface Section {
  id: string
  title: string
  fields: Field[]
  description?: string
  fromSection?: string
  toSection?: string
}
