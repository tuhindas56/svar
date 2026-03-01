import z from "zod"

import { FIELD_TYPE } from "./constants"

const BaseFieldSchema = z.object({
  id: z.uuid(),
  question: z
    .string()
    .trim()
    .min(1, "Please supply a question")
    .max(300, "Question should not exceed 300 characters"),
  required: z.boolean().default(false)
})

const TextFieldSchema = BaseFieldSchema.extend({
  type: z.literal([
    FIELD_TYPE.SHORT,
    FIELD_TYPE.LONG,
    FIELD_TYPE.DATE,
    FIELD_TYPE.TIME
  ])
})

const CheckboxOrRadioFieldSchema = BaseFieldSchema.extend({
  type: z.literal([FIELD_TYPE.CHECKBOX, FIELD_TYPE.RADIO]),
  options: z
    .array(
      z.object({
        value: z.string("Please specify a label for this option").trim().min(1),
        toSection: z
          .uuid()
          .or(z.literal(["next", "submit"]))
          .optional()
      })
    )
    .min(1),
  allowCustomAnswer: z.boolean().default(false).optional()
})

const FileFieldSchema = BaseFieldSchema.extend({
  type: z.literal(FIELD_TYPE.FILE),
  maxAllowedFiles: z.number().min(1).max(5)
})

const FormFieldSchema = z.discriminatedUnion("type", [
  TextFieldSchema,
  CheckboxOrRadioFieldSchema,
  FileFieldSchema
])

const FormSectionSchema = z.object({
  id: z.uuid(),
  title: z
    .string()
    .min(1, "Please supply a title")
    .max(200, "Title cannot exceed 200 characters")
    .trim(),
  description: z.string().optional(),
  fields: z.array(FormFieldSchema).min(1)
})

export const FormSectionsSchema = z.array(FormSectionSchema)

export type FormSection = z.infer<typeof FormSectionSchema>
export type FormField = z.infer<typeof FormFieldSchema>
export type FieldType = (typeof FIELD_TYPE)[keyof typeof FIELD_TYPE]

export interface FormSchema {
  id: string
  name: string
  userId: string
  created: Date
  modified: Date
  sections: FormSection[]
  published: boolean
}
