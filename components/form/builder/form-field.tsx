import { Copy, Plus, Trash2, X } from "lucide-react"

import { fieldType } from "@/lib/constants"
import { FormField as Field } from "@/lib/definitions"
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
import FormCard from "./form-card"
import FieldTypeSelect from "./field-type-select"

interface FormFieldProps {
  field: Field
  onUpdateField: (field: Field) => void
  onDuplicateField: () => void
  onRemoveField: () => void
}

function FormField({
  field,
  onUpdateField = () => {},
  onDuplicateField = () => {},
  onRemoveField = () => {}
}: FormFieldProps) {
  function onChange<T>(key: string, value?: T) {
    const next: Field = { ...field, [key]: value }
    onUpdateField(next)
  }

  function onOptionAdd() {
    const next: Field = {
      ...field,
      options: [...field.options, `Option ${field.options.length + 1}`]
    }

    onUpdateField(next)
  }

  return (
    <FormCard>
      <div className="flex flex-wrap justify-between gap-5 md:flex-nowrap">
        <ContentEditable
          value={field.question}
          onChange={(value) => onChange("question", value)}
          placeholder="Question"
          className="w-full font-medium"
          width="100%"
          disableNewLine
        />
        <FieldTypeSelect
          selectedType={field.type}
          onUpdateField={(selectedType) => onChange("type", selectedType)}
        />
      </div>

      <div>
        {(field.type === fieldType.short.value ||
          field.type === fieldType.date.value ||
          field.type === fieldType.time.value) && (
          <Input
            className="w-2/3 rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
            disabled
            type={field.type}
          />
        )}

        {field.type === fieldType.long.value && (
          <Textarea
            className="w-2/3 resize-none rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
            disabled
          />
        )}

        {(field.type === fieldType.radio.value ||
          field.type === fieldType.checkbox.value) && (
          <>
            <RadioGroup>
              {Array.isArray(field.options) &&
                field.options.map((option, index) => {
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      {field.type === fieldType.radio.value && (
                        <RadioGroupItem value={option} disabled />
                      )}
                      {field.type === fieldType.checkbox.value && (
                        <Checkbox disabled />
                      )}

                      <ContentEditable
                        value={option}
                        placeholder="Option"
                        className="text-sm"
                        width="160px"
                        onChange={(value) =>
                          onChange(
                            "options",
                            field.options.map((opt, idx) =>
                              idx === index ? value.trim() : opt
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
              onClick={onOptionAdd}
            >
              <Plus /> Add option
            </Button>
          </>
        )}

        {field.type === fieldType.file.value && (
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
          {(field.type === fieldType.radio.value ||
            field.type === fieldType.checkbox.value) && (
            <>
              <Switch
                onCheckedChange={(checked) => {
                  onChange("allowCustomAnswer", checked)
                }}
                checked={field.allowCustomAnswer}
                label="Allow custom answer"
              />

              <Switch
                // checked={field.allowCustomAnswer}
                label="Go to section based on answer"
              />
            </>
          )}

          {field.type === fieldType.file.value && (
            <div className="flex w-54 gap-4">
              <Label>Max no. of files: {field.maxAllowedFiles}</Label>
              <Slider
                min={1}
                max={5}
                step={1}
                className="w-20"
                onValueChange={(count) => onChange("maxAllowedFiles", count)}
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
              <Button onClick={onRemoveField} variant="ghost" size="icon-sm">
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove field</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </FormCard>
  )
}

export default FormField
