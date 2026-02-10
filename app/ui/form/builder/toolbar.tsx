import { FileText } from "lucide-react"
import type { FormBuilderMode } from "@/app/lib/definitions"

interface ToolbarProps {
  mode: FormBuilderMode
}

export default function Toolbar({ mode }: ToolbarProps) {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 lg:w-3xl">
      <div className="h-fit rounded-md bg-blue-500 p-2">
        <FileText size={16} color="white" />
      </div>
      <div>
        <p className="text-sm font-medium">Svar</p>
        <p className="text-sm text-gray-500">
          {mode === "create" ? "Create form" : "Form preview"}
        </p>
      </div>
    </div>
  )
}
