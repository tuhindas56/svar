"use client"

import type { FocusEvent } from "react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type ContentEditableProps = {
  onChange: (value: string) => void
  value: string
  className?: string
  placeholder?: string
  width?: string
  disableNewLine?: boolean
}

const ContentEditable = ({
  onChange,
  value,
  className,
  placeholder,
  width = "100px",
  disableNewLine = false
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
    const element = ref.current

    if (element && element.textContent !== value) {
      element.textContent = value
    }
  }, [value])

  useEffect(() => {
    const element = ref.current

    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          ref.current?.blur()
          break

        case "Enter":
          if (disableNewLine) {
            e.preventDefault()
          }
          break
      }
    }

    if (element) {
      element.addEventListener("keydown", onKeyDown)

      return () => {
        element.removeEventListener("keydown", onKeyDown)
      }
    }
  }, [disableNewLine])

  return (
    <div className={cn("bg-background relative h-fit overflow-hidden")} style={{ width }}>
      <div
        className={cn(
          "text-md border-border/0 hover:border-border/50 focus:border-border w-full rounded-xs border p-2 text-pretty duration-100 ease-out focus:outline-0",
          className
        )}
        onBlur={onBlur}
        onFocus={() => setIsFocused(true)}
        ref={ref}
        contentEditable="plaintext-only"
        suppressContentEditableWarning
      />
      {!(value || isFocused) && (
        <div
          className={cn(
            "text-foreground/30 text-md pointer-events-none absolute top-2 left-2 z-10 w-full border-0! outline-0!",
            className
          )}
        >
          {placeholder}
        </div>
      )}
    </div>
  )
}

export default ContentEditable
