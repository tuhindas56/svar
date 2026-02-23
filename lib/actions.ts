"use server"

import { signIn, signOut, auth } from "@/auth"
import { FormSection } from "./definitions"

export async function login() {
  await signIn("google")
}

export async function logout() {
  await signOut({ redirectTo: "/login" })
}

export async function getSession() {
  return await auth()
}

export async function saveForm(form: FormSection[]) {
  console.log(form)
}

export async function publishForm(form: FormSection[]) {
  console.log(form)
}
