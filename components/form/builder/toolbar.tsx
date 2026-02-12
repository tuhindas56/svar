import type { MouseEventHandler } from "react"
import { Eye, FileText, Plane, Redo, Undo } from "lucide-react"

import { onFormPublish } from "@/lib/actions"
import { Button } from "@/components/ui/button"

interface ToolbarProps {
  totalQuestions: number
  onUndo: MouseEventHandler<HTMLButtonElement>
  onRedo: MouseEventHandler<HTMLButtonElement>
}

export default function Toolbar({
  totalQuestions,
  onUndo = () => {},
  onRedo = () => {}
}: ToolbarProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <div className="bg-primary h-fit rounded-md p-2">
          <FileText size={16} color="white" />
        </div>
        <div>
          <p className="text-sm font-medium">Svar</p>
          <p className="text-sm text-gray-500">
            {`${totalQuestions} question${totalQuestions > 1 ? "s" : ""}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Button title="Undo" onClick={onUndo} variant="ghost" size="icon-sm">
            <Undo />
          </Button>
          <Button title="Redo" onClick={onRedo} variant="ghost" size="icon-sm">
            <Redo />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye /> Preview
          </Button>
          <Button
            onClick={onFormPublish}
            size="sm"
            className="bg-primary text-sm"
          >
            <Plane /> Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
