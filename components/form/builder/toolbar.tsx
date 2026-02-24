import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import PageHeader from "@/components/ui/page-header"

interface ToolbarProps {
  onSaveForm: () => void
  onPublishForm: () => void
}

export default function Toolbar({
  onSaveForm = () => {},
  onPublishForm = () => {}
}: ToolbarProps) {
  return (
    <PageHeader>
      <Button variant="ghost" size="sm">
        <Eye /> Preview
      </Button>

      <Button onClick={onSaveForm} size="sm" variant="outline">
        Save
      </Button>
      <Button onClick={onPublishForm} size="sm" variant="default">
        Publish
      </Button>
    </PageHeader>
  )
}
