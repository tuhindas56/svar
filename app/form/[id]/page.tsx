import { notFound } from "next/navigation"

import { getFormSchema } from "@/lib/db/data"
import { FormSchema } from "@/lib/definitions"
import FormPage from "@/components/form/form-page"
import NotReceivingSubmissions from "@/components/form/not-receiving-submissions"

interface FormProps {
  params: Promise<{ id: string }>
}

async function Form({ params }: FormProps) {
  const { id } = await params

  const { success, data, error } = await getFormSchema({
    id
  })

  if (!success || !data) {
    throw new Error(error)
  }

  const form = data.form

  if (!form.published) {
    notFound()
  }

  if (!form.receivingSubmissions) {
    return <NotReceivingSubmissions title={form.name} />
  }

  return <FormPage form={form as FormSchema} />
}

export default Form
