import Builder from "@/components/form/builder/builder"
import { getFormName } from "@/lib/db/data"

interface Props {
  params: Promise<{ id: string }>
}

async function Create(props: Props) {
  const { id } = await props.params
  const name = await getFormName(id)

  return <Builder id={id} formName={name} />
}

export default Create
