import type { Dispatch, SetStateAction } from "react"

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
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 focus-within:border-blue-200 lg:w-3xl">
      <div className="flex flex-col gap-2 p-2">
        <input
          type="text"
          defaultValue={title}
          onBlur={(e) => onTitleChange(e.target.value)}
          className="text-xl font-medium text-gray-800 placeholder-gray-400 focus:outline-0"
          placeholder="Untitled Form"
          required
        />
        <input
          defaultValue={description}
          onBlur={(e) => onDescriptionChange(e.target.value)}
          className="text-sm text-gray-600 placeholder-gray-400 focus:outline-0"
          placeholder="Form description (optional)"
        />
      </div>
    </div>
  )
}

export default Header
