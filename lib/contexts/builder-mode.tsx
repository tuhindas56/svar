"use client"

import { createContext, use, useMemo, useState } from "react"
import type { Dispatch, ReactNode, SetStateAction } from "react"

interface Props {
  children: ReactNode
}

type Actions = {
  save: () => Promise<void>
  publish: () => Promise<void>
} | null

interface ContextValue {
  isBuilderMode: boolean
  setIsBuilderMode: Dispatch<SetStateAction<boolean>>
  isPublished: boolean
  setIsPublished: Dispatch<SetStateAction<boolean>>
  formName: string | null
  setFormName: Dispatch<SetStateAction<string | null>>
  actions: Actions
  setActions: Dispatch<SetStateAction<Actions>>
  saving: boolean
  setSaving: Dispatch<SetStateAction<boolean>>
  publishing: boolean
  setPublishing: Dispatch<SetStateAction<boolean>>
}

const BuilderModeContext = createContext<ContextValue>({
  isBuilderMode: false,
  setIsBuilderMode: () => {},
  isPublished: false,
  setIsPublished: () => {},
  formName: null,
  setFormName: () => {},
  actions: null,
  setActions: () => {},
  saving: false,
  setSaving: () => {},
  publishing: false,
  setPublishing: () => {}
})

export function useBuilderMode() {
  return use(BuilderModeContext)
}

export function BuilderModeProvider({ children }: Props) {
  const [isBuilderMode, setIsBuilderMode] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [actions, setActions] = useState<Actions>(null)
  const [formName, setFormName] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const value = useMemo(
    () => ({
      actions,
      setActions,
      formName,
      setFormName,
      isBuilderMode,
      setIsBuilderMode,
      isPublished,
      setIsPublished,
      saving,
      setSaving,
      publishing,
      setPublishing
    }),
    [actions, formName, isBuilderMode, isPublished, saving, publishing]
  )

  return (
    <BuilderModeContext.Provider value={value}>
      {children}
    </BuilderModeContext.Provider>
  )
}
