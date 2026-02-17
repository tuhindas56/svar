"use client"

import { Copy, Trash2 } from "lucide-react"

import { FormField as Field } from "@/lib/definitions"
import { Input } from "@/components/ui/input"
import ContentEditable from "@/components/ui/content-editable"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import FormBlockCard from "./form-field-card"
import FieldType from "./field-type"

interface FormBlockProps {
  field: Field
  onFieldUpdate: (field: Field) => void
  onFieldRemove: () => void
}

function FormField({
  field,
  onFieldUpdate = () => {},
  onFieldRemove = () => {}
}: FormBlockProps) {
  return (
    <FormBlockCard className="gap-5">
      <div className="flex justify-between gap-2">
        <ContentEditable
          value={field.question}
          onChange={(value) => {}}
          placeholder="Question"
          className="w-100"
        />

        <FieldType field={field} onFieldUpdate={onFieldUpdate} />
      </div>
      <div>
        {field.type === "short" && (
          <Input
            className="w-full rounded-lg border-2 border-dotted border-gray-200 bg-gray-50 p-1"
            disabled
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Switch id={field.id} />
          <Label htmlFor={field.id}>Required</Label>
        </div>
        <div>
          <Button variant="ghost" size="icon-sm">
            <Copy />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onFieldRemove}>
            <Trash2 />
          </Button>
        </div>
      </div>
    </FormBlockCard>
  )
}

export default FormField
