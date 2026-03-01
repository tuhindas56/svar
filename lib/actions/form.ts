"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import z from "zod"

import {
  createForm,
  deleteForm,
  publishForm,
  updateFormSections
} from "@/lib/db/data"
import { FormSection } from "../definitions"
import { auth } from "@/auth"

const createFormSchema = z
  .string()
  .trim()
  .nonempty("Please provide a valid name for the form")

export type CreateFormState = {
  errors?: string[]
  name?: string
}

export async function submitCreateFormAction(
  _: CreateFormState,
  formData: FormData
): Promise<CreateFormState> {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/")
  }

  const name = formData.get("name") as string

  const validated = createFormSchema.safeParse(name)

  if (!validated.success) {
    return {
      errors: z.treeifyError(validated.error).errors,
      name
    }
  }

  const result = await createForm({
    name: validated.data,
    userId: session.user.id as string
  })

  if (result.success && result.data) {
    revalidatePath("/dashboard")
    redirect(`/form/create/${result.data.id}`)
  } else {
    throw new Error(result.error)
  }
}

export async function saveFormSectionsAction(
  id: string,
  sections: FormSection[]
) {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/")
  }

  const result = await updateFormSections({
    id,
    sections,
    userId: session.user.id as string
  })

  return result
}

export async function publishFormAction(id: string) {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/")
  }

  const { success } = await publishForm({
    id,
    userId: session.user.id as string
  })

  if (success) {
    revalidatePath("/dashboard")
    redirect("/dashboard")
  }
}

export async function deleteFormAction(id: string) {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/")
  }

  const { success, error } = await deleteForm({
    id,
    userId: session.user.id as string
  })

  if (success) {
    revalidatePath("/dashboard")
  } else {
    throw new Error(error)
  }
}
