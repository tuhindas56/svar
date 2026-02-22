import { cn } from "@/lib/utils"
import ContentEditable from "@/components/ui/content-editable"
import FormBlockCard from "./form-card"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"

interface HeaderProps {
  title: string
  onTitleChange: (value: string) => void
  description?: string
  onDescriptionChange?: (value: string) => void
  childOfFirstSection: boolean
  onRemoveSection: () => void
  showDeleteSection: boolean
}

function Header({
  title = "",
  onTitleChange = () => {},
  description = "",
  onDescriptionChange = () => {},
  childOfFirstSection,
  showDeleteSection = false,
  onRemoveSection
}: HeaderProps) {
  return (
    <FormBlockCard className="gap-1">
      <ContentEditable
        value={title}
        onChange={onTitleChange}
        placeholder={`Untitled ${childOfFirstSection ? "form" : "section"}`}
        className={cn("font-lora text-2xl font-bold", {
          "text-3xl": childOfFirstSection
        })}
        width="100%"
        disableNewLine
      />
      <ContentEditable
        value={description}
        onChange={onDescriptionChange}
        placeholder="Description (optional)"
        width="100%"
      />
      {showDeleteSection && (
        <div className="flex justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onRemoveSection}>
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete section</TooltipContent>
          </Tooltip>
        </div>
      )}
    </FormBlockCard>
  )
}

export default Header
