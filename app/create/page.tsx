"use client"
import { useState } from "react"
import type { FormField } from "@/app/types"
import FormBuilder from "@/app//ui/form-builder"

function Create() {
  const [formFields, setFormFields] = useState<FormField[]>([])

  return (
    <>
      <div className="mx-auto mt-16 h-dvh md:w-6/12">
        <main>
          <FormBuilder formFields={formFields} setFormFields={setFormFields} />
        </main>
      </div>
    </>
  )
}

export default Create
