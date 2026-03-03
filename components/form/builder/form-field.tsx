"use client"

import { useState } from "react"
import { Copy, Plus, Trash2, X } from "lucide-react"

import { FIELD_TYPE } from "@/lib/constants"
import { FormField as FormFieldType } from "@/lib/definitions"
import ContentEditable from "@/components/ui/content-editable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import FormCard from "../form-card"
import FieldTypeSelect from "./field-type-select"
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

interface FormFieldProps {
  field: FormFieldType
  onUpdateField: (field: FormFieldType) => void
  onDuplicateField: () => void
  onRemoveField: () => void
}

function FormField({
  field,
  onUpdateField = () => {},
  onDuplicateField = () => {},
  onRemoveField = () => {}
}: FormFieldProps) {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)

  function onChange<T>(key: string, value: T) {
    const next: FormFieldType = { ...field, [key]: value }

    if (next.type === FIELD_TYPE.CHECKBOX || next.type === FIELD_TYPE.RADIO) {
      if (!Array.isArray(next.options) || !next.options.length) {
        next.options = [{ toSection: "", value: "Option 1" }]
      }
    }

    onUpdateField(next)
  }

  function confirmDeleteSection() {
    setAlertDialogOpen(true)
  }

  function onCancel() {
    setAlertDialogOpen(false)
  }

  function onConfirmDeleteField() {
    onRemoveField()
  }

  return (
    <FormCard>
      <div className="grid grid-cols-[2fr_max-content] gap-5 md:flex-nowrap">
        <ContentEditable
          value={field.question}
          onChange={(value) => onChange("question", value)}
          placeholder="Question"
          className="font-medium"
          width="100%"
          disableNewLine
        />

        <FieldTypeSelect
          selectedType={field.type}
          onUpdateField={(selectedType) => onChange("type", selectedType)}
        />
      </div>

      <div>
        {(field.type === FIELD_TYPE.SHORT ||
          field.type === FIELD_TYPE.DATE ||
          field.type === FIELD_TYPE.TIME) && (
          <Input
            className="w-2/3 rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
            disabled
            type={field.type}
          />
        )}

        {field.type === FIELD_TYPE.LONG && (
          <Textarea
            className="w-2/3 resize-none rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
            disabled
          />
        )}

        {(field.type === FIELD_TYPE.RADIO ||
          field.type === FIELD_TYPE.CHECKBOX) && (
          <>
            <RadioGroup>
              {Array.isArray(field.options) &&
                field.options.map((option, index) => {
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      {field.type === FIELD_TYPE.RADIO && (
                        <RadioGroupItem value={option.value} disabled />
                      )}

                      {field.type === FIELD_TYPE.CHECKBOX && (
                        <Checkbox disabled />
                      )}

                      <ContentEditable
                        value={option.value}
                        placeholder="Option"
                        className="text-sm"
                        width="160px"
                        disableNewLine
                        onChange={(value) =>
                          onChange(
                            "options",
                            field.options.map((opt, idx) =>
                              idx === index ? { value: value.trim() } : opt
                            )
                          )
                        }
                      />

                      {field.options.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() =>
                            onChange(
                              "options",
                              field.options.filter((_, idx) => idx !== index)
                            )
                          }
                        >
                          <X />
                        </Button>
                      )}
                    </div>
                  )
                })}
            </RadioGroup>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4"
              onClick={() => {
                onChange("options", [
                  ...field.options,
                  { value: `Option ${field.options.length + 1}` }
                ])
              }}
            >
              <Plus /> Add option
            </Button>
          </>
        )}

        {field.type === FIELD_TYPE.FILE && (
          <>
            <div>
              <div
                className="border-border bg-muted/40 text-muted-foreground relative mt-5 flex h-40 cursor-not-allowed flex-col items-center justify-center rounded-xs border border-dashed opacity-70 grayscale transition-colors select-none"
                aria-disabled="true"
              >
                <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
                  <p className="text-muted-foreground/70 text-[10px] tracking-wider uppercase">
                    Size limit: 10 MB
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-6">
          {(field.type === FIELD_TYPE.RADIO ||
            field.type === FIELD_TYPE.CHECKBOX) && (
            <>
              <Switch
                onCheckedChange={(checked) => {
                  onChange("allowCustomAnswer", checked)
                }}
                checked={field.allowCustomAnswer}
                label="Allow custom answer"
              />

              {/* <Switch
                checked={field.allowCustomAnswer}
                label="Go to section based on answer"
              /> */}
            </>
          )}

          {field.type === FIELD_TYPE.FILE && (
            <div className="flex w-54 gap-4">
              <Label>Max no. of files: {field.maxAllowedFiles}</Label>
              <Slider
                min={1}
                max={5}
                step={1}
                className="w-20"
                onValueChange={([count]) => {
                  onChange("maxAllowedFiles", count)
                }}
              />
            </div>
          )}

          <div className="flex gap-2">
            <Switch
              onCheckedChange={(checked) => onChange("required", checked)}
              checked={field.required}
              label="Required"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-5 md:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onDuplicateField} variant="ghost" size="icon-sm">
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate field</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={confirmDeleteSection}
                variant="ghost"
                size="icon-sm"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove field</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <AlertDialog open={alertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this question?</AlertDialogTitle>
            <AlertDialogDescription>
              This question will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={onConfirmDeleteField}
            >
              Delete question
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FormCard>
  )
}

export default FormField
