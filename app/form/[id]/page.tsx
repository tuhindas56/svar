import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { getFormSchema } from "@/lib/db/data"
import FormPage from "@/components/form/form-page"
import { FormSchema } from "@/lib/definitions"

interface FormProps {
  params: Promise<{ id: string }>
}

async function Form({ params }: FormProps) {
  const { id } = await params

  const session = await auth()

  if (!session || !session.user) {
    redirect("/")
  }

  const { success, data, error } = await getFormSchema({
    id,
    userId: session.user.id as string
  })

  if (!success || !data) {
    throw new Error(error)
  }

  const form = data.form

  return <FormPage form={form as FormSchema} />
}

export default Form
