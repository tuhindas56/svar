import type { Dispatch, SetStateAction } from "react"

interface FormBlockProps {
  block: object
  onBlockUpdate: Dispatch<SetStateAction<[]>>
  onBlockRemove: Dispatch<SetStateAction<[]>>
}

function FormBlock({ block, onBlockUpdate, onBlockRemove }: FormBlockProps) {
  return <div className="radius-lg border border-gray-200 bg-white p-4">a</div>
}

export default FormBlock
