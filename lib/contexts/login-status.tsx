"use client"

import { createContext, use, useState } from "react"
import type { Dispatch, ReactNode, SetStateAction } from "react"

type Props = {
  children: ReactNode
}

type Status = {
  provider: "google" | "github" | null
  loading: boolean
}

type ContextValue = [Status, Dispatch<SetStateAction<Status>>]

const LoginStatusContext = createContext<ContextValue>([
  { provider: null, loading: false },
  () => {}
])

export function useLoginStatus() {
  return use(LoginStatusContext)
}

export function LoginStatusProvider({ children }: Props) {
  const value = useState<Status>({ provider: null, loading: false })

  return <LoginStatusContext.Provider value={value}>{children}</LoginStatusContext.Provider>
}
