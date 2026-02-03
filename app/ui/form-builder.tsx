"use client"

import { useMemo, useState } from "react"
import type {
  Dispatch,
  SetStateAction,
  FocusEventHandler,
  KeyboardEvent,
  KeyboardEventHandler
} from "react"

import type { FormField } from "@/app/types"
import Menu from "@/app/ui/menu"

interface FormBuilderProps {
  formFields: FormField[]
  setFormFields: Dispatch<SetStateAction<FormField[]>>
}

interface BlockProps {
  defaultValue: string
  onBlur: FocusEventHandler<HTMLDivElement>
  onKeyDown: KeyboardEventHandler<HTMLDivElement>
}

function Block({ defaultValue, onBlur, onKeyDown }: BlockProps) {
  return (
    <div
      contentEditable
      defaultValue={defaultValue}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className="border"
    />
  )
}

function FormBuilder({ formFields, setFormFields }: FormBuilderProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const options = useMemo(
    () => [
      {
        label: "Checkbox",
        onClick: () => {}
      },
      {
        label: "Radio",
        onClick: () => {}
      }
    ],
    []
  )

  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "/":
        if (!open) setOpen(true)
        break
    }
  }

  return (
    <div>
      <Block
        defaultValue={value}
        onBlur={(e) => setValue(e.target.textContent)}
        onKeyDown={onKeyDown}
      />
      <Menu options={options} open={open} setOpen={setOpen} />
    </div>
  )
}

export default FormBuilder
