"use server"

import { signIn, signOut, auth } from "@/auth"

export async function login() {
  await signIn("google")
}

export async function logout() {
  await signOut({ redirectTo: "/" })
}

export async function getSession() {
  return await auth()
}
