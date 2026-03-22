"use client"

import { useBuilderMode } from "@/lib/contexts/builder-mode"
import { Button } from "@/components/ui/button"

function BuilderActions() {
  const { formName, actions, isPublished, isBuilderMode, saving, publishing } = useBuilderMode()

  if (!isBuilderMode) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-4">
      <p className="bg-primary/10 text-primary ring-primary/20 inline-flex rounded-xs px-2 py-2 text-xs font-semibold text-nowrap ring-1">
        You are editing:&nbsp; {formName}
      </p>

      <div className="flex gap-4">
        <Button onClick={actions?.save} size="sm" variant="outline" disabled={saving || publishing}>
          {saving ? "Saving.." : "Save"}
        </Button>
        <Button
          onClick={actions?.publish}
          size="sm"
          variant="default"
          disabled={isPublished || saving || publishing}
        >
          {isPublished ? "Published" : publishing ? "Publishing.." : "Publish"}
        </Button>
      </div>
    </div>
  )
}

export default BuilderActions
