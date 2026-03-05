"use client"

import { useBuilderMode } from "@/lib/contexts/builder-mode"
import { Button } from "@/components/ui/button"

function BuilderActions() {
  const { formName, actions, isPublished, isBuilderMode } = useBuilderMode()

  if (!isBuilderMode) {
    return null
  }

  return (
    <>
      <p className="bg-primary/10 text-primary ring-primary/20 inline-flex items-center rounded-xs px-2 py-1 text-xs font-semibold ring-1">
        You are editing:&nbsp; {formName}
      </p>

      <Button onClick={actions?.save} size="sm" variant="outline">
        Save
      </Button>
      <Button
        onClick={actions?.publish}
        size="sm"
        variant="default"
        disabled={isPublished}
      >
        {isPublished ? "Published" : "Publish"}
      </Button>
    </>
  )
}

export default BuilderActions
