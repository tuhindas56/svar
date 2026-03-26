import { notFound } from "next/navigation"

import { getFormSchema } from "@/lib/db/data"
import { FormSchema } from "@/lib/definitions"
import FormPage from "@/components/form/form-page"
import NotReceivingSubmissions from "@/components/form/not-receiving-submissions"

type FormProps = {
  params: Promise<{ id: string }>
}

async function Form({ params }: FormProps) {
  const { id } = await params

  const result = await getFormSchema({
    id
  })

  if (!result.success) {
    throw new Error(result.error)
  }

  const { form } = result.data!

  if (!form.published) {
    notFound()
  }

  if (!form.receivingSubmissions) {
    return <NotReceivingSubmissions title={form.name} />
  }

  return <FormPage form={form as FormSchema} />
}

export default Form
