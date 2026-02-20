"use client"

import { Eye, Redo, Undo } from "lucide-react"

import { onFormPublish } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"

export default function Toolbar() {
  function onUndo() {}

  function onRedo() {}

  return (
    <div className="bg-background sticky top-0 z-50 flex w-full items-center justify-between gap-2 rounded-xs border px-2 py-2">
      <div className="flex items-center gap-1">
        <p className="font-lora w-max rounded px-2 text-xl font-medium">svar</p>
      </div>

      <div className="flex items-center gap-5 md:gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onUndo} variant="ghost" size="icon-sm">
              <Undo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={onRedo} variant="ghost" size="icon-sm">
              <Redo />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Preview</TooltipContent>
        </Tooltip>

        <Button onClick={onFormPublish} size="sm" variant="default">
          Publish
        </Button>
      </div>
    </div>
  )
}
