"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import {
  createForm,
  deleteForm,
  publishForm,
  receiveSubmission,
  updateFormSections
} from "@/lib/db/data"
import { FormSection } from "../definitions"
import { auth } from "@/auth"

export type CreateFormState = {
  error?: string
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
  const trimmed = name.trim()

  if (!trimmed.length) {
    return {
      error: "Please provide a valid name for the form",
      name
    }
  }

  const result = await createForm({
    name: trimmed,
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
  sections: FormSection[],
  pathname: string
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

  if (result.success) {
    revalidatePath("/dashboard")
    revalidatePath(pathname)
  }

  return result
}

export async function publishFormAction(id: string, sections: FormSection[]) {
  const session = await auth()

  if (!session || !session.user) {
    redirect("/")
  }

  const saveResult = await updateFormSections({
    id,
    sections,
    userId: session.user.id as string
  })

  const publishResult = await publishForm({
    id,
    userId: session.user.id as string
  })

  if (saveResult.success && publishResult.success) {
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

export async function submitFormAction(id: string, sections: FormSection[]) {
  return await receiveSubmission({
    id,
    fields: sections.flatMap((section) => section.fields)
  })
}
