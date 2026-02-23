import { Eye } from "lucide-react"

import { FormSection } from "@/lib/definitions"
import { Button } from "@/components/ui/button"
// import SectionRelationshipsDrawer from "./section-relationships-drawer"

interface ToolbarProps {
  sections: FormSection[]
  onUpdateSection: (section: FormSection) => void
  onSaveForm: () => void
  onPublishForm: () => void
}

export default function Toolbar({
  sections = [],
  onUpdateSection = () => {},
  onSaveForm = () => {},
  onPublishForm = () => {}
}: ToolbarProps) {
  return (
    <div className="bg-background sticky top-0 z-50 flex w-full items-center justify-between gap-2 rounded-xs border px-2 py-2">
      <p className="font-lora w-max rounded px-2 text-xl font-medium">svar</p>

      <div className="flex items-center gap-5 md:gap-2">
        {/* <SectionRelationshipsDrawer
          sections={sections}
          onUpdateSection={onUpdateSection}
        /> */}

        <Button variant="ghost" size="sm">
          <Eye /> Preview
        </Button>

        <Button onClick={onSaveForm} size="sm" variant="outline">
          Save
        </Button>
        <Button onClick={onPublishForm} size="sm" variant="default">
          Publish
        </Button>
      </div>
    </div>
  )
}
