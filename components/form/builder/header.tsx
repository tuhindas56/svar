import type { Dispatch, SetStateAction } from "react"
import FormBlockCard from "./form-block-card"

interface HeaderProps {
  title: string
  onTitleChange: Dispatch<SetStateAction<string>>
  description: string
  onDescriptionChange: Dispatch<SetStateAction<string>>
}

function Header({
  title = "",
  onTitleChange = () => {},
  description = "",
  onDescriptionChange = () => {}
}: HeaderProps) {
  return (
    <FormBlockCard>
      <div
        defaultValue={title}
        onBlur={(e) => onTitleChange(e.target.textContent)}
        className="text-2xl font-medium text-gray-800 placeholder-gray-400 focus:outline-0"
        // placeholder="Untitled Form"
        contentEditable
        suppressContentEditableWarning
      />
      <div
        defaultValue={description}
        onBlur={(e) => onDescriptionChange(e.target.textContent)}
        className="text-md text-gray-600 placeholder-gray-400 focus:outline-0"
        // placeholder="Form description (optional)"
        contentEditable
        suppressContentEditableWarning
      />
    </FormBlockCard>
  )
}

export default Header
