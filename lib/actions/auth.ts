"use server"

import { signIn, signOut, auth } from "@/auth"
import { deleteUserData } from "../db/data"

export async function loginWithGithub() {
  await signIn("github")
}

export async function loginWithGoogle() {
  await signIn("google")
}

export async function logout() {
  await signOut({ redirectTo: "/" })
}

export async function deleteAccount() {
  const session = await auth()
  await deleteUserData({ id: session?.user?.id as string })
}

export async function getSession() {
  return await auth()
}
