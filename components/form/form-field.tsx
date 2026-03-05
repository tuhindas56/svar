"use client"

import { CUSTOM_ANSWER, FIELD_TYPE } from "@/lib/constants"
import { FormField as FormFieldType } from "@/lib/definitions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import FormCard from "./form-card"
import { Badge } from "../ui/badge"

interface FormFieldProps {
  field: FormFieldType
  onUpdateField: ({
    fieldId,
    value,
    isCustomAnswer
  }: {
    fieldId: string
    value?: string | string[]
    isCustomAnswer?: boolean
    customAnswer?: string
  }) => void
}

function FormField({ field, onUpdateField = () => {} }: FormFieldProps) {
  return (
    <FormCard>
      <h2 className="text-sm font-medium">{field.question}</h2>

      <div>
        {(field.type === FIELD_TYPE.SHORT ||
          field.type === FIELD_TYPE.DATE ||
          field.type === FIELD_TYPE.TIME) && (
          <Input
            className="w-1/2 rounded-xs border p-1"
            type={field.type}
            required={field.required}
            defaultValue={field.value}
            aria-invalid={Boolean(field.error)}
            onBlur={(e) =>
              onUpdateField({ fieldId: field.id, value: e.target.value })
            }
          />
        )}

        {field.type === FIELD_TYPE.LONG && (
          <Textarea
            className="w-1/2 resize-none rounded-xs border p-1"
            required={field.required}
            defaultValue={field.value}
            onBlur={(e) =>
              onUpdateField({ fieldId: field.id, value: e.target.value })
            }
          />
        )}

        {(field.type === FIELD_TYPE.RADIO ||
          field.type === FIELD_TYPE.CHECKBOX) && (
          <>
            <RadioGroup
              required={field.required}
              defaultValue={field.value as string}
              onValueChange={(value) =>
                onUpdateField({ fieldId: field.id, value })
              }
            >
              {Array.isArray(field.options) &&
                field.options.map((option, index) => {
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      <Label className="text-sm">
                        {field.type === FIELD_TYPE.RADIO && (
                          <RadioGroupItem value={option.value} />
                        )}

                        {field.type === FIELD_TYPE.CHECKBOX && (
                          <Checkbox
                            defaultChecked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onUpdateField({
                                  fieldId: field.id,
                                  value: Array.isArray(field.value)
                                    ? [...field.value, option.value]
                                    : [option.value]
                                })
                              } else {
                                onUpdateField({
                                  fieldId: field.id,
                                  value: Array.isArray(field.value)
                                    ? field.value.filter(
                                        (a) => a !== option.value
                                      )
                                    : []
                                })
                              }
                            }}
                          />
                        )}

                        {option.value}
                      </Label>
                    </div>
                  )
                })}

              {field.allowCustomAnswer && (
                <div className="flex items-center gap-2">
                  <Label className="text-sm">
                    {field.type === FIELD_TYPE.RADIO && (
                      <RadioGroupItem value={CUSTOM_ANSWER} />
                    )}
                    {field.type === FIELD_TYPE.CHECKBOX && (
                      <Checkbox
                        defaultChecked={field.value?.includes(CUSTOM_ANSWER)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onUpdateField({
                              fieldId: field.id,
                              value: Array.isArray(field.value)
                                ? [...field.value, CUSTOM_ANSWER]
                                : [CUSTOM_ANSWER]
                            })
                          } else {
                            onUpdateField({
                              fieldId: field.id,
                              value: Array.isArray(field.value)
                                ? field.value.filter((a) => a !== CUSTOM_ANSWER)
                                : []
                            })
                          }
                        }}
                      />
                    )}
                    Other
                  </Label>
                </div>
              )}
            </RadioGroup>

            {field.allowCustomAnswer &&
              (field.value === CUSTOM_ANSWER ||
                field.value?.includes(CUSTOM_ANSWER)) && (
                <Input
                  defaultValue={field.customAnswer}
                  onBlur={(e) =>
                    onUpdateField({
                      fieldId: field.id,
                      customAnswer: e.target.value,
                      isCustomAnswer: true
                    })
                  }
                  className="mt-6"
                />
              )}
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

        {field?.error && (
          <p className="mt-2 text-sm text-red-400">{field.error}</p>
        )}
      </div>

      {field.required && (
        <div className="flex justify-end">
          <Badge variant="outline">Required</Badge>
        </div>
      )}
    </FormCard>
  )
}

export default FormField
