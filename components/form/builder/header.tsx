"use client"

import { useState } from "react"
import { Copy, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import ContentEditable from "@/components/ui/content-editable"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import FormBlockCard from "../form-card"

type HeaderProps = {
  title: string
  onTitleChange: (value: string) => void
  description?: string
  onDescriptionChange?: (value: string) => void
  childOfFirstSection: boolean
  onDuplicateSection: () => void
  onRemoveSection: () => void
  showDeleteSection: boolean
}

function Header({
  title = "",
  onTitleChange = () => {},
  description = "",
  onDescriptionChange = () => {},
  onDuplicateSection,
  onRemoveSection,
  childOfFirstSection,
  showDeleteSection
}: HeaderProps) {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  function confirmDeleteSection() {
    setAlertDialogOpen(true)
  }

  function onCancel() {
    setAlertDialogOpen(false)
  }

  function onConfirm() {
    onRemoveSection()
  }

  return (
    <FormBlockCard className="gap-1">
      <ContentEditable
        value={title}
        onChange={onTitleChange}
        placeholder={`Untitled ${childOfFirstSection ? "form" : "section"}`}
        className={cn("font-lora text-2xl font-bold", {
          "text-3xl": childOfFirstSection
        })}
        width="100%"
        disableNewLine
      />

      <ContentEditable
        value={description}
        onChange={onDescriptionChange}
        placeholder="Description (optional)"
        width="100%"
      />

      <div className="flex flex-wrap items-center justify-end gap-5 md:gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onDuplicateSection}>
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Duplicate section</TooltipContent>
        </Tooltip>

        {showDeleteSection && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={confirmDeleteSection}>
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete section</TooltipContent>
          </Tooltip>
        )}

        <AlertDialog open={alertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this section?</AlertDialogTitle>
              <AlertDialogDescription>
                This section and all its questions will be permanently deleted. This action can’t be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={onConfirm}>
                Delete section
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </FormBlockCard>
  )
}

export default Header
