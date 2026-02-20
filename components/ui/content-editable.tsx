"use client"

import type { FocusEvent } from "react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface ContentEditableProps {
  onChange: (value: string) => void
  value: string
  className?: string
  placeholder?: string
  placeholderClassName?: string
  width?: string
}

const ContentEditable = ({
  onChange,
  value,
  className,
  placeholder,
  placeholderClassName,
  width = "100px"
}: ContentEditableProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const ref = useRef<null | HTMLDivElement>(null)

  function onBlur(e: FocusEvent<HTMLDivElement>) {
    if (e.target.textContent !== value) {
      onChange(e.target.textContent.trim())
    }
    setIsFocused(false)
  }

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value
    }
  }, [value])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          ref.current?.blur()
          break

        case "Enter":
          e.preventDefault()
          break
      }
    }

    ref.current?.addEventListener("keydown", onKeyDown)

    return () => {
      ref.current?.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return (
    <div
      className={cn(
        "bg-background border-border/0 hover:border-border focus-within:border-border relative h-fit overflow-hidden rounded-xs border p-2 duration-100 ease-out"
      )}
      style={{ width }}
    >
      <div
        className={cn("text-md w-full text-pretty focus:outline-0", className)}
        onBlur={onBlur}
        onFocus={() => setIsFocused(true)}
        ref={ref}
        contentEditable
        suppressContentEditableWarning
      />
      {!(value || isFocused) && (
        <div
          className={cn(
            "text-foreground/30 bg-background text-md pointer-events-none absolute top-2 left-2 z-10 h-full w-full",
            placeholderClassName
          )}
        >
          {placeholder}
        </div>
      )}
    </div>
  )
}

export default ContentEditable
