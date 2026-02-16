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
}

const ContentEditable = ({
  onChange,
  value,
  className,
  placeholder,
  placeholderClassName
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
    <div className="relative">
      <div
        className={cn("text-md min-w-24 text-wrap focus:outline-0", className)}
        onBlur={onBlur}
        onFocus={() => setIsFocused(true)}
        ref={ref}
        contentEditable
        suppressContentEditableWarning
      />
      {!value && !isFocused && (
        <span
          className={cn(
            "text-foreground/30 bg-background pointer-events-none absolute top-0 left-0 z-10 min-w-24",
            placeholderClassName
          )}
        >
          {placeholder}
        </span>
      )}
    </div>
  )
}

export default ContentEditable
