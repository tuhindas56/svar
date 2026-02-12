"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export async function login() {
  const { url, redirect: shouldRedirect } = await auth.api.signInSocial({
    body: {
      provider: "google"
    },
    headers: await headers()
  })

  if (shouldRedirect && url) {
    redirect(url)
  }
}

export async function logout() {
  const { success } = await auth.api.signOut({
    headers: await headers()
  })

  if (success) {
    redirect("/login")
  }
}

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers()
  })
}

export async function onFormPublish() {}
