import { QUESTION_TYPE } from "./constants"

export type FormBuilderMode = "create" | "preview"

export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE]

export interface FormBlockObject {
  id: string
  type: QuestionType
  question: string
}
