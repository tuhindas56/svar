"use client"

import { useId, useState } from "react"
import { CircleQuestionMark, Cog } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { saveFormSettingsAction } from "@/lib/actions/form"

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
  id: string
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
          <TooltipTrigger className="ml-2" aria-label={description} asChild>
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

function FormSettings({ id, formDetails, isBuilderMode }: FormSettingsProps) {
  /**
   * Anon submissions toggle
   * Limit to one response toggle if not anon
   * Response acceptance toggle
   * Custom closing message (later)
   * Custom confirmation message (later)
   * Expiration (later)
   * Response edit toggle (later)
   * Require authentication toggle (later)
   */

  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<FormSettings>({
    receivingSubmissions: false,
    anonymousSubmissions: false,
    limitResponses: false
  })
  const [saving, setSaving] = useState(false)

  function onOpenChange(open: boolean) {
    if (!open) {
      setOpen(false)
      return
    }

    setOpen(true)
    setSettings({
      receivingSubmissions: formDetails.receivingSubmissions,
      anonymousSubmissions: formDetails.anonymousSubmissions,
      limitResponses: formDetails.limitResponses
    })
  }

  async function onSave() {
    setSaving(true)

    const result = await saveFormSettingsAction({
      id,
      ...settings,
      limitResponses: !settings.anonymousSubmissions && settings.limitResponses
    })

    setSaving(false)

    if (result.success) {
      setOpen(false)
      toast.success("Form settings saved")
    } else {
      toast.error("Failed to save form settings")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, receivingSubmissions: checked }))
              }
              checked={settings.receivingSubmissions}
            />
          )}

          <Toggle
            label="Allow anonymous submissions"
            description="Adds mandatory 'name' and 'email' fields to the form when disabled"
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, anonymousSubmissions: checked }))
            }
            checked={settings.anonymousSubmissions}
          />

          {!settings.anonymousSubmissions && (
            <Toggle
              label="Limit to one response"
              description="Enabling this will make the form unable to receive anonymous submissions"
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, limitResponses: checked }))
              }
              checked={settings.limitResponses}
            />
          )}
        </div>

        <DialogFooter className="gap-4">
          <Button variant="outline" size="sm" disabled={saving} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" disabled={saving} onClick={onSave}>
            {saving ? "Saving.." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FormSettings
