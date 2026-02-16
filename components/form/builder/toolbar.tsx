import type { MouseEventHandler } from "react"
import { Eye, Plane, Redo, Undo } from "lucide-react"

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
    <div className="bg-background sticky top-0 z-50 flex w-full items-center justify-between gap-2 border p-3">
      <div className="flex items-center gap-2">
        <div>
          <p className="font-lora font-medium">Svar</p>
          <p className="text-sm text-zinc-500">
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
            className="text-sm"
            variant="default"
          >
            <Plane /> Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
