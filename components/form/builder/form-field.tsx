"use client"

import { Copy, Trash2 } from "lucide-react"

import { Field } from "@/lib/definitions"
import { Input } from "@/components/ui/input"
import ContentEditable from "@/components/ui/content-editable"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import FormBlockCard from "./form-field-card"
import QuestionTypeSelect from "./question-type-select"

interface FormBlockProps {
  field: Field
  onFieldUpdate: (key: string, value: any) => void
  onFieldRemove: () => void
}

function FormField({
  field,
  onFieldUpdate = () => {},
  onFieldRemove = () => {}
}: FormBlockProps) {
  return (
    <FormBlockCard>
      <div className="flex justify-between gap-2">
        <ContentEditable
          value={field.question}
          onChange={(value) => onFieldUpdate("question", value)}
          placeholder="Question"
          className="w-100"
        />

        <QuestionTypeSelect field={field} onFieldUpdate={onFieldUpdate} />
      </div>
      <div>
        {field.type === "short" && (
          <Input
            className="w-full rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
            disabled
          />
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        <div>
          <Button variant="ghost" size="icon-sm">
            <Copy />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onFieldRemove}>
            <Trash2 />
          </Button>
        </div>
        <div className="flex gap-2">
          <Switch id={field.id} />
          <Label htmlFor={field.id}>Required</Label>
        </div>
      </div>
    </FormBlockCard>
  )
}

export default FormField
