"use server"

import { redirect } from "next/navigation"
import z from "zod"

import { createForm } from "@/lib/db/data"
import { FormSection } from "../definitions"

const createFormSchema = z
  .string()
  .trim()
  .nonempty("Please provide a valid name for the form")

export type CreateFormState = {
  errors?: string[]
  name?: string
}

export async function submitCreateForm(
  _: CreateFormState,
  formData: FormData
): Promise<CreateFormState> {
  const name = formData.get("name") as string

  const validated = createFormSchema.safeParse(name)

  if (!validated.success) {
    return {
      errors: z.treeifyError(validated.error).errors,
      name
    }
  }

  const newFormId = await createForm(validated.data)
  redirect(`/form/create/${newFormId}`)
}

export async function saveForm(id: string, form: FormSection[]) {
  console.log(form)
}

export async function publishForm(id: string, form: FormSection[]) {
  console.log(form)
}
