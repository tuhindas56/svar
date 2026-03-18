import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

interface Props {
  id: string | null
  setId: (id: string | null) => void
  open: boolean
  setOpen: (open: boolean) => void
}

function ViewSubmissionModal({ id, setId, open, setOpen }: Props) {
  const [submission, setSubmission] = useState(null)

  function onOpenChange(open: boolean) {
    if (!open) {
      setId(null)
      setOpen(false)
    }
  }

  if (!id) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Viewing submission</DialogTitle>
          <DialogDescription>by {id}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ViewSubmissionModal
