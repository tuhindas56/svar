"use client"

import { useState } from "react"
import { Eye, Form } from "lucide-react"

import { convertDate } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import ViewSubmissionModal from "./view-submission"

interface SubmissionType {
  id: string
  formId: string
  submitted: Date
  modified: Date
  respondantName: string | null
  respondantEmail: string | null
}

interface Props {
  submissions: SubmissionType[]
  anonymousSubmissions: boolean
  published: boolean
}

export type SubmissionData = {
  id: string
  by: string | null
} | null

function SubmissionsList({ submissions = [], anonymousSubmissions, published }: Props) {
  const [viewSubmissionModalOpen, setViewSubmissionModalOpen] = useState(false)
  const [viewSubmissionData, setViewSubmissionData] = useState<SubmissionData | null>(null)

  return (
    <>
      <Card className="rounded-xs p-6 shadow-none">
        {!published && (
          <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
            <div className="text-muted-foreground mb-4 text-4xl">
              <Form size={40} strokeWidth={1} color="var(--primary)" />
            </div>
            <h3 className="text-foreground text-lg font-semibold">
              There are no submissions for this form
            </h3>
            <p className="text-muted-foreground mt-1 max-w-xs text-sm">
              Publish and share your form to receive submissions
            </p>
          </div>
        )}

        {published && !submissions.length && (
          <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
            <div className="text-muted-foreground mb-4 text-4xl">
              <Form size={40} strokeWidth={1} color="var(--primary)" />
            </div>
            <h3 className="text-foreground text-lg font-semibold">
              There are no submissions for this form
            </h3>
            <p className="text-muted-foreground mt-1 max-w-xs text-sm">
              Share your form via the link to encourage submissions
            </p>
          </div>
        )}

        {published && submissions.length > 0 && (
          <>
            <CardHeader className="p-0">
              <CardTitle>Responses</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table className="border">
                <TableHeader>
                  <TableRow className="bg-zinc-50">
                    {!anonymousSubmissions && (
                      <>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                      </>
                    )}
                    {anonymousSubmissions && <TableHead>Responder</TableHead>}
                    <TableHead className="font-semibold">Submitted on</TableHead>
                    <TableHead className="flex items-center justify-center font-semibold">
                      Options
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission, index) => {
                    return (
                      <TableRow key={index}>
                        {anonymousSubmissions && <TableCell>Anonymous</TableCell>}
                        {!anonymousSubmissions && (
                          <>
                            <TableCell>{submission.respondantName}</TableCell>
                            <TableCell>{submission.respondantEmail}</TableCell>
                          </>
                        )}
                        <TableCell>
                          {convertDate(submission.submitted, "DD MMM YYYY, hh:mm a")}
                        </TableCell>

                        <TableCell className="flex items-center justify-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                onClick={() => {
                                  setViewSubmissionData({
                                    id: submission.id,
                                    by: submission.respondantName
                                  })
                                  setViewSubmissionModalOpen(true)
                                }}
                              >
                                <Eye />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">View submission</TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="p-0">
              <Badge variant="outline">
                {submissions.length} response{submissions.length > 1 && "s"}
              </Badge>
            </CardFooter>
          </>
        )}
      </Card>

      <ViewSubmissionModal
        submissionData={viewSubmissionData}
        setViewSubmissionData={setViewSubmissionData}
        open={viewSubmissionModalOpen}
        setOpen={setViewSubmissionModalOpen}
      />
    </>
  )
}

export default SubmissionsList
