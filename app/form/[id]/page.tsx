interface FormProps {
  params: Promise<{ id: string }>
}

async function Form({ params }: FormProps) {
  const { id } = await params

  return <div>Form: {id}</div>
}

export default Form
