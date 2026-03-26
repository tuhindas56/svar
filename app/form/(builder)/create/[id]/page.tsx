import { redirect } from "next/navigation"

import { getSession } from "@/lib/actions/auth"
import { getFormSchema } from "@/lib/db/data"
import { FormSchema } from "@/lib/definitions"
import Builder from "@/components/form/builder/builder"

type Props = {
  params: Promise<{ id: string }>
}

async function Create(props: Props) {
  const { id } = await props.params
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  const result = await getFormSchema({
    id,
    userId: session.user.id as string
  })

  if (!result.success) {
    throw new Error(result.error)
  }

  return <Builder form={result.data!.form as FormSchema} />
}

export default Create
