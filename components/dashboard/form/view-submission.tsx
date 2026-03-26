import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { getSubmissionAction } from "@/lib/actions/submission"
import { CUSTOM_ANSWER } from "@/lib/constants"
import { Skeleton } from "@/components/ui/skeleton"
import type { SubmissionData } from "./submissions-list"

type Props = {
  submissionData: SubmissionData | null
  setViewSubmissionData: (data: SubmissionData | null) => void
  open: boolean
  setOpen: (open: boolean) => void
}

type ResponseData = {
  submitted: Date
  question: string | null
  value: unknown
  customAnswer: string | null
}

function ViewSubmissionModal({ submissionData, setViewSubmissionData, open, setOpen }: Props) {
  const [responses, setResponses] = useState<ResponseData[]>([])
  const [loading, setLoading] = useState(false)

  function onTransitionEnd() {
    if (!open) {
      setLoading(false)
      setResponses([])
      setViewSubmissionData(null)
    }
  }

  useEffect(() => {
    async function fetchSubmission() {
      if (!open || !submissionData) {
        return
      }

      setLoading(true)

      const result = await getSubmissionAction({ id: submissionData.id })

      if (result.success) {
        setResponses(result.data!.responses)
      }

      setLoading(false)
    }

    fetchSubmission()
  }, [submissionData, open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onTransitionEnd={onTransitionEnd} className="">
        <DialogHeader>
          <DialogTitle>Viewing submission</DialogTitle>
          <DialogDescription>by {submissionData?.by || "Anonymous"}</DialogDescription>
        </DialogHeader>

        <div className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto">
          {loading && (
            <>
              {Array.from({ length: 3 }, (_, index) => {
                return (
                  <div key={index} className="border-border rounded-sm border px-3 py-2">
                    <Skeleton className="h-3" />
                    <Skeleton className="mt-2 h-3 w-2/3" />
                  </div>
                )
              })}
            </>
          )}

          {!loading && responses.length === 0 && (
            <p>No questions were answered with this submission.</p>
          )}

          {!loading &&
            responses.length > 0 &&
            responses.map((response, index) => {
              return (
                <div key={index} className="border-border rounded-sm border px-3 py-2">
                  <h3 className="text-sm font-medium">{response.question}</h3>
                  <p className="mt-2 text-sm">
                    {response.value === CUSTOM_ANSWER && response.customAnswer
                      ? response.customAnswer
                      : response.value
                        ? String(response.value)
                        : "No answer"}
                  </p>
                </div>
              )
            })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewSubmissionModal
