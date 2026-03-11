import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/lib/db/schema"
import { deleteUserData } from "@/lib/db/data"
import * as schema from "@/auth-schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema
  }),
  plugins: [nextCookies()],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  }
})

export async function loginWithGithub() {
  "use server"
  const { url, redirect: shouldRedirect } = await auth.api.signInSocial({
    body: { provider: "github" }
  })

  if (shouldRedirect && url) {
    redirect(url)
  }
}

export async function loginWithGoogle() {
  "use server"
  const { url, redirect: shouldRedirect } = await auth.api.signInSocial({
    body: { provider: "google" }
  })

  if (shouldRedirect && url) {
    redirect(url)
  }
}

export async function logout() {
  "use server"
  await auth.api.signOut({ headers: await headers() })
}

export async function deleteAccount() {
  "use server"
  const session = await auth.api.getSession()
  await deleteUserData({ id: session?.user?.id as string })
}

export async function getSession() {
  "use server"
  return await auth.api.getSession({ headers: await headers() })
}
