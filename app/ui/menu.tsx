"use client"
import { useEffect, useRef, useState } from "react"
import type { MouseEventHandler, Dispatch, SetStateAction } from "react"

import { cn } from "@/app/utils"

export interface Option {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

interface MenuProps {
  options: Option[]
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function Menu({ options = [], open = false, setOpen = () => {} }: MenuProps) {
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
    null
  )
  const menuRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          if (open) {
            setOpen(false)
            setActiveOptionIndex(null)
          }

          break

        case "ArrowDown":
          if (open && options.length > 0) {
            setActiveOptionIndex((prev) => {
              if (prev !== null) {
                const nextIndex = prev + 1

                if (nextIndex !== options.length) {
                  return nextIndex
                }
              }

              return 0
            })
          }

          break

        case "ArrowUp":
          if (open && options.length > 0) {
            setActiveOptionIndex((prev) => {
              if (prev !== null) {
                const nextIndex = prev - 1

                if (nextIndex < 0) {
                  return options.length - 1
                }
              }

              return 0
            })
          }

          break
      }
    }

    function onClickAway(e: MouseEvent) {
      if (menuRef.current && e.target !== menuRef.current) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("click", onClickAway)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, setOpen])

  return (
    <div className="relative w-2xs">
      <ul
        ref={menuRef}
        className={cn(
          "absolute top-0 left-0 min-w-40 origin-bottom-left translate-y-1 rounded-md border border-gray-100 p-1 shadow-md",
          {
            hidden: !open,
            block: open
          }
        )}
      >
        {options.map(
          (option: Option, index) =>
            !option.disabled && (
              <li key={index}>
                <button
                  onClick={option.onClick}
                  className={cn(
                    "w-full rounded-sm px-2 py-1 text-left text-sm hover:bg-gray-100 focus:outline-none",
                    {
                      "bg-gray-100": index === activeOptionIndex
                    }
                  )}
                >
                  {option.label}
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

export default Menu
