"use client"

import { Copy, Plus, Trash2, X } from "lucide-react"

import { FormField as Field } from "@/lib/definitions"
import ContentEditable from "@/components/ui/content-editable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import FormCard from "./form-card"
import FieldTypeSelect from "./field-type-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { fieldType } from "@/lib/constants"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"

interface FormFieldProps {
  field: Field
  onFieldUpdate: (field: Field) => void
  onFieldRemove: () => void
}

function FormField({
  field,
  onFieldUpdate = () => {},
  onFieldRemove = () => {}
}: FormFieldProps) {
  function onChange<T>(key: string, value?: T) {
    const next: Field = { ...field, [key]: value }
    onFieldUpdate(next)
  }

  function onOptionAdd() {
    const next: Field = {
      ...field,
      options: Array.isArray(field.options)
        ? [...field.options, `Option ${field.options.length + 1}`]
        : ["Option 1"]
    }

    onFieldUpdate(next)
  }

  return (
    <>
      <FormCard>
        <div className="flex flex-wrap justify-between gap-5 md:flex-nowrap">
          <ContentEditable
            value={field.question}
            onChange={(value) => onChange("question", value)}
            placeholder="Question"
            className="w-full font-medium"
            placeholderClassName="font-medium"
            width="100%"
          />
          <FieldTypeSelect
            selectedType={field.type}
            onFieldUpdate={(selectedType) => onChange("type", selectedType)}
          />
        </div>
        <div>
          {field.type === fieldType.shortAnswer.value && (
            <Input
              className="w-2/3 rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
              disabled
            />
          )}
          {field.type === fieldType.longAnswer.value && (
            <Textarea
              className="w-2/3 resize-none rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
              disabled
            />
          )}
          {field.type === fieldType.multiChoice.value && (
            <>
              <RadioGroup>
                {Array.isArray(field.options) &&
                  field.options.map((option, index) => {
                    return (
                      <div className="flex items-center gap-2" key={index}>
                        <RadioGroupItem value={option} disabled />
                        <ContentEditable
                          value={option}
                          placeholder="Option"
                          className="text-sm"
                          placeholderClassName="text-sm"
                          width="160px"
                          onChange={(value) =>
                            onChange(
                              "options",
                              field.options?.map((opt, idx) =>
                                idx === index ? value.trim() : opt
                              )
                            )
                          }
                        />
                        {field.options!.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() =>
                              onChange(
                                "options",
                                field.options?.filter((_, idx) => idx !== index)
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
                onClick={onOptionAdd}
              >
                <Plus /> Add Option
              </Button>
            </>
          )}
          {field.type === fieldType.checkbox.value && (
            <>
              <div>
                {Array.isArray(field.options) &&
                  field.options.map((option, index) => {
                    return (
                      <div className="flex items-center gap-2" key={index}>
                        <Checkbox disabled />
                        <ContentEditable
                          value={option}
                          placeholder="Option"
                          className="text-sm"
                          placeholderClassName="text-sm"
                          width="160px"
                          onChange={(value) =>
                            onChange(
                              "options",
                              field.options!.map((opt, idx) =>
                                idx === index ? value.trim() : opt
                              )
                            )
                          }
                        />
                        {field.options!.length > 1 && (
                          <Button variant="ghost" size="icon-xs">
                            <X />
                          </Button>
                        )}
                      </div>
                    )
                  })}
              </div>
              <Button
                variant="ghost"
                className="mt-4"
                size="sm"
                onClick={onOptionAdd}
              >
                <Plus /> Add option
              </Button>
            </>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-6">
            {(field.type === fieldType.multiChoice.value ||
              field.type === fieldType.checkbox.value) && (
              <div className="flex items-center gap-2">
                <Switch
                  id={field.id}
                  onCheckedChange={(checked) => onChange("required", checked)}
                />
                <Label htmlFor={field.id}>Allow custom answer</Label>
              </div>
            )}

            <div className="flex gap-2">
              <Switch
                id={field.id}
                onCheckedChange={(checked) => onChange("required", checked)}
              />
              <Label htmlFor={field.id}>Required</Label>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-5 md:gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Duplicate field</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onFieldRemove} variant="ghost" size="icon-sm">
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove field</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </FormCard>
    </>
  )
}

export default FormField
