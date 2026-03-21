"use client"

import { useId, useState } from "react"
import { CircleQuestionMark } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface ToggleProps {
  label: string
  description?: string
  onCheckedChange: (checked: boolean) => void
}

interface FormDetails {
  submissions: {
    id: string
    formId: string
    submitted: Date
    modified: Date
    respondantName: string | null
    respondantEmail: string | null
  }[]
  name: string
  created: Date
  modified: Date
  published: boolean
  allowAnonymousSubmissions: boolean
  receivingSubmissions: boolean
}

interface FormSettingsProps {
  formDetails: FormDetails
  isBuilderMode?: boolean
}

function Toggle({ label, description, onCheckedChange }: ToggleProps) {
  const id = useId()

  return (
    <div className="flex justify-between">
      <Label htmlFor={id} className="text-sm font-medium">
        <span>
          {label}
          {description && (
            <Tooltip>
              <TooltipTrigger className="ml-1" aria-label="Information about this option">
                <CircleQuestionMark size={14} className="text-foreground/50" />
              </TooltipTrigger>
              <TooltipContent>{description}</TooltipContent>
            </Tooltip>
          )}
        </span>
      </Label>
      <Switch id={id} onCheckedChange={onCheckedChange} />
    </div>
  )
}

function FormSettings({ formDetails, isBuilderMode }: FormSettingsProps) {
  /**
   * Limit to one response toggle
   * Response acceptance toggle
   * Custom closing message
   * Custom confirmation message
   * Expiration (later)
   * Response edit toggle (later)
   * Require authentication toggle (later)
   */
  const [settings, setSettings] = useState(null)

  function onOpenChange(open: boolean) {
    if (open) {
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form settings</DialogTitle>
          <DialogDescription>Configure your form</DialogDescription>
        </DialogHeader>
        <div className="border-border flex flex-col gap-4 rounded-sm border px-4 py-3">
          {!isBuilderMode && <Toggle label="Accepting responses" onCheckedChange={() => {}} />}

          <Toggle
            label="Limit to one response"
            description="Enabling this will make the form unable to receive anonymous submissions"
            onCheckedChange={() => {}}
          />

          <Toggle
            label="Allow anonymous submissions"
            description="Adds mandatory 'name' and 'email' fields to the form when disabled"
            onCheckedChange={() => {}}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FormSettings
