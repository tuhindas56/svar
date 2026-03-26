"use client"

import { useId, useState } from "react"
import { CircleQuestionMark, Cog } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

type ToggleProps = {
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

type FormDetails = {
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
  anonymousSubmissions: boolean
  receivingSubmissions: boolean
  limitResponses: boolean
}

type FormSettingsProps = {
  formDetails: FormDetails
  isBuilderMode?: boolean
}

type FormSettings = {
  anonymousSubmissions: boolean
  receivingSubmissions: boolean
  limitResponses: boolean
}

function Toggle({ label, description, checked, onCheckedChange, disabled }: ToggleProps) {
  const id = useId()

  return (
    <div className="flex justify-between">
      <Label htmlFor={id} className="text-sm font-medium">
        <span>
          {label}
          {description && (
            <Tooltip>
              <TooltipTrigger className="ml-2" aria-label={description}>
                <CircleQuestionMark size={14} className="text-foreground/50" />
              </TooltipTrigger>
              <TooltipContent>{description}</TooltipContent>
            </Tooltip>
          )}
        </span>
      </Label>
      {!disabled && <Switch id={id} onCheckedChange={onCheckedChange} checked={checked} />}

      {disabled && (
        <Tooltip>
          <TooltipTrigger className="ml-2" aria-label={description}>
            <Switch disabled={disabled} />
          </TooltipTrigger>
          <TooltipContent>
            Cannot limit responses when accepting anonoymous responses
          </TooltipContent>
        </Tooltip>
      )}
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
  const [settings, setSettings] = useState<FormSettings | null>(null)

  function onOpenChange(open: boolean) {
    if (open) {
      setSettings({
        receivingSubmissions: formDetails.receivingSubmissions,
        anonymousSubmissions: formDetails.anonymousSubmissions,
        limitResponses: formDetails.limitResponses
      })
    } else {
      setSettings(null)
    }
  }

  //   function onSave() {
  //     "use server"
  //   }

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Cog /> Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form settings</DialogTitle>
          <DialogDescription>Configure your form</DialogDescription>
        </DialogHeader>
        <div className="border-border flex flex-col gap-6 rounded-xs border px-3 py-3">
          {!isBuilderMode && (
            <Toggle
              label="Accepting responses"
              onCheckedChange={() => {}}
              checked={formDetails.receivingSubmissions}
            />
          )}

          <Toggle
            label="Allow anonymous submissions"
            description="Adds mandatory 'name' and 'email' fields to the form when disabled"
            onCheckedChange={() => {}}
            checked={!!settings?.anonymousSubmissions}
          />

          <Toggle
            label="Limit to one response"
            description="Enabling this will make the form unable to receive anonymous submissions"
            onCheckedChange={() => {}}
            checked={!!settings?.limitResponses}
            disabled={!!settings?.anonymousSubmissions}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FormSettings
