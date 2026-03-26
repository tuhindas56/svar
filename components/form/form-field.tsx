"use client"
import { Dispatch, SetStateAction, useMemo } from "react"

import { CUSTOM_ANSWER, FIELD_TYPE } from "@/lib/constants"
import type {
  FormFieldErrors,
  FormFieldResponses,
  FormField as FormFieldType
} from "@/lib/definitions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import FormCard from "./form-card"

type FormFieldProps = {
  field: FormFieldType
  responses: FormFieldResponses
  setResponses: Dispatch<SetStateAction<FormFieldResponses>>
  errors: FormFieldErrors
}

function FormField({ field, responses, setResponses, errors }: FormFieldProps) {
  const response = useMemo(() => responses[field.id], [responses, field])
  const error = useMemo(() => errors[field.id], [errors, field])

  return (
    <FormCard>
      <h2 className="text-sm font-medium">{field.question}</h2>

      <div>
        {field.type === FIELD_TYPE.SHORT && (
          // || field.type === FIELD_TYPE.DATE
          // || field.type === FIELD_TYPE.TIME
          <Input
            className="w-1/2 rounded-xs border p-1"
            type={field.type}
            aria-invalid={Boolean(error)}
            value={response.value ?? ""}
            onChange={(e) =>
              setResponses((prev) => ({
                ...prev,
                [field.id]: {
                  ...prev[field.id],
                  value: e.target.value || null
                }
              }))
            }
          />
        )}

        {field.type === FIELD_TYPE.LONG && (
          <Textarea
            className="w-1/2 resize-none rounded-xs border p-1"
            value={response.value ?? ""}
            aria-invalid={Boolean(error)}
            onChange={(e) =>
              setResponses((prev) => ({
                ...prev,
                [field.id]: {
                  ...prev[field.id],
                  value: e.target.value || null
                }
              }))
            }
          />
        )}

        {field.type === FIELD_TYPE.RADIO && (
          <>
            <RadioGroup
              value={typeof response.value == "string" ? response.value : ""}
              onValueChange={(value) =>
                setResponses((prev) => ({
                  ...prev,
                  [field.id]: {
                    ...prev[field.id],
                    value: value || null
                  }
                }))
              }
            >
              {Array.isArray(field.options) &&
                field.options.map((option, index) => {
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      <Label className="text-sm">
                        <RadioGroupItem
                          value={option.value}
                          aria-invalid={Boolean(error) && response.value !== CUSTOM_ANSWER}
                        />

                        {option.value}
                      </Label>
                    </div>
                  )
                })}

              {field.allowCustomAnswer && (
                <div className="flex items-center gap-2">
                  <Label className="text-sm">
                    <RadioGroupItem
                      value={CUSTOM_ANSWER}
                      aria-invalid={Boolean(error) && response.value !== CUSTOM_ANSWER}
                    />
                    Other
                  </Label>
                </div>
              )}
            </RadioGroup>
          </>
        )}

        {field.type === FIELD_TYPE.CHECKBOX && (
          <>
            <div className="space-y-3">
              {Array.isArray(field.options) &&
                field.options.map((option, index) => {
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      <Label className="text-sm">
                        <Checkbox
                          checked={response.value?.includes(option.value)}
                          aria-invalid={Boolean(error) && response.value !== CUSTOM_ANSWER}
                          onCheckedChange={(checked) => {
                            setResponses((prev) => {
                              const prevField = prev[field.id]
                              const next = Array.isArray(prevField.value)
                                ? prevField.value.filter((v) => v !== option.value)
                                : []

                              if (checked) {
                                next.push(option.value)
                              }

                              return {
                                ...prev,
                                [field.id]: { ...prevField, value: next }
                              }
                            })
                          }}
                        />

                        {option.value}
                      </Label>
                    </div>
                  )
                })}

              {field.allowCustomAnswer && (
                <div className="flex items-center gap-2">
                  <Label className="text-sm">
                    <Checkbox
                      checked={response.value?.includes(CUSTOM_ANSWER)}
                      aria-invalid={Boolean(error) && response.value !== CUSTOM_ANSWER}
                      onCheckedChange={(checked) => {
                        setResponses((prev) => {
                          const prevField = prev[field.id]
                          const next = Array.isArray(prevField.value)
                            ? prevField.value.filter((v) => v !== CUSTOM_ANSWER)
                            : []

                          if (checked) {
                            next.push(CUSTOM_ANSWER)
                          }

                          return {
                            ...prev,
                            [field.id]: { ...prevField, value: next }
                          }
                        })
                      }}
                    />
                    Other
                  </Label>
                </div>
              )}
            </div>
          </>
        )}

        {response.value?.includes(CUSTOM_ANSWER) && (
          <Input
            value={response.customAnswer ?? ""}
            aria-invalid={Boolean(error)}
            onChange={(e) =>
              setResponses((prev) => ({
                ...prev,
                [field.id]: {
                  ...prev[field.id],
                  customAnswer: e.target.value || null
                }
              }))
            }
            className="mt-6"
          />
        )}

        {/* {field.type === FIELD_TYPE.FILE && (
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
        )} */}

        {Boolean(error) && <p className="mt-4 text-sm text-red-400">{error}</p>}
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
