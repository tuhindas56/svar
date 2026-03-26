"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export async function loginWithGithub() {
  const { url, redirect: shouldRedirect } = await auth.api.signInSocial({
    body: { provider: "github" },
    headers: await headers()
  })

  if (shouldRedirect && url) {
    redirect(url)
  }
}

export async function loginWithGoogle() {
  const { url, redirect: shouldRedirect } = await auth.api.signInSocial({
    body: { provider: "google" },
    headers: await headers()
  })

  if (shouldRedirect && url) {
    redirect(url)
  }
}

export async function logout() {
  await auth.api.signOut({ headers: await headers() })
}

export async function deleteAccount() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session) {
    const result = await auth.api.deleteUser({
      body: {},
      headers: await headers()
    })

    if (result.success) {
      redirect("/")
    }
  }
}

export async function getSession() {
  return await auth.api.getSession({ headers: await headers() })
}
