import { QUESTION_TYPE } from "./constants"

export type QuestionType =
  (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE]["value"]

export interface FormField {
  id: string
  type: QuestionType
  question: string
  value?: string | number | File | string[] | number[]
}
