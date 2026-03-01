import { auth } from "@/auth"
import Builder from "@/components/form/builder/builder"
import { getFormSchema } from "@/lib/db/data"
import { FormSchema } from "@/lib/definitions"
import { redirect } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

async function Create(props: Props) {
  const { id } = await props.params
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

  return <Builder form={data.form as FormSchema} />
}

export default Create
