import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

interface ToolbarProps {
  formName: string
  isPublished: boolean
  onSaveForm: () => void
  onPublishForm: () => void
}

export default function Toolbar({
  formName,
  isPublished,
  onSaveForm = () => {},
  onPublishForm = () => {}
}: ToolbarProps) {
  return (
    <PageHeader>
      <p className="bg-primary/10 text-primary ring-primary/20 inline-flex items-center rounded-xs px-3 py-1 text-xs font-semibold ring-1">
        You are editing:&nbsp; {formName}
      </p>

      <Button onClick={onSaveForm} size="sm" variant="outline">
        Save
      </Button>
      <Button
        onClick={onPublishForm}
        size="sm"
        variant="default"
        disabled={isPublished}
      >
        {isPublished ? "Published" : "Publish"}
      </Button>
    </PageHeader>
  )
}
