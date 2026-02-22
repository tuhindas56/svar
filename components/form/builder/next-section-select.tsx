import { fieldTypes } from "@/lib/constants"
import { FieldType, FormSection } from "@/lib/definitions"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

interface NextSectionSelectProps {
  sections: FormSection[]
  selectedSection: string
  onSelect: (selectedSection: string) => void
}

function NextSectionSelect({
  sections = [],
  selectedSection = "next",
  onSelect
}: NextSectionSelectProps) {
  return (
    <Select onValueChange={onSelect} value={selectedSection}>
      <SelectTrigger className="min-w-50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" align="start">
        <SelectGroup>
          <SelectItem value="next">Continue to next section</SelectItem>
          {sections.map((section, index) => {
            return (
              <SelectItem value={section.id} key={section.id}>
                Go to section {index + 1} ({section.title || "Untitled section"}
                )
              </SelectItem>
            )
          })}
          <SelectItem value="submit">Submit Form</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default NextSectionSelect
