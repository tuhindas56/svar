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
import { getSession } from "./auth"
import { FormFieldResponses, FormSection } from "../definitions"

export type CreateFormState = {
  error?: string
  name?: string
}

export async function submitCreateFormAction(
  _: CreateFormState,
  formData: FormData
): Promise<CreateFormState> {
  const session = await getSession()

  if (!session?.user) {
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

export async function saveFormSectionsAction({
  id,
  sections
}: {
  id: string
  sections: FormSection[]
}) {
  const session = await getSession()

  if (!session?.user) {
    redirect("/")
  }

  const result = await updateFormSections({
    id,
    sections,
    userId: session.user.id as string
  })

  if (result.success) {
    revalidatePath("/dashboard")
  }

  return result
}

export async function publishFormAction({
  id,
  sections
}: {
  id: string
  sections: FormSection[]
}) {
  const session = await getSession()

  if (!session?.user) {
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
  const session = await getSession()

  if (!session?.user) {
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

export async function submitFormAction({
  id,
  responses,
  respondantName,
  respondantEmail
}: {
  id: string
  responses: FormFieldResponses
  respondantName: string | null
  respondantEmail: string | null
}) {
  return await receiveSubmission({
    id,
    responses,
    respondantName,
    respondantEmail
  })
}
