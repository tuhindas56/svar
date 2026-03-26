import { useEffect, useState } from "react"
import { unparse } from "papaparse"

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
import { convertDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

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

function exportCSV(data: ResponseData[]) {
  if (!Array.isArray(data)) return

  const csv = unparse(
    data.map((v) => ({
      question: v.question,
      value: v.value === CUSTOM_ANSWER ? v.customAnswer : v.value,
      submitted_on: convertDate(v.submitted)
    }))
  )
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "submissions.csv"
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
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

        <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
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

        <Button
          size="sm"
          variant="outline"
          className="mt-4 w-max"
          onClick={() => exportCSV(responses)}
        >
          <Download /> Export as CSV
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ViewSubmissionModal
