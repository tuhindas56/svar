import { redirect } from "next/navigation"

import { getSession } from "@/lib/actions/auth"
import { getFormSchema } from "@/lib/db/data"
import { FormSchema } from "@/lib/definitions"
import Builder from "@/components/form/builder/builder"

interface Props {
  params: Promise<{ id: string }>
}

async function Create(props: Props) {
  const { id } = await props.params
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  const { success, data, error } = await getFormSchema({
    id,
    userId: session.user.id as string
  })

  if (!success || !data) {
    throw new Error(error)
  }

  return <Builder form={data.form as FormSchema} />
}

export default Create
