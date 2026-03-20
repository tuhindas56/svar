"use server"

import { redirect } from "next/navigation"

import { getSession } from "@/auth"
import { getSubmission } from "../db/data"

export async function getSubmissionAction({ id }: { id: string }) {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  const result = await getSubmission({
    id
  })

  return result
}
