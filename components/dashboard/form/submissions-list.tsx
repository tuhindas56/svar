"use client"

import { Eye, Form } from "lucide-react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"
import { convertDate } from "@/lib/utils"

interface SubmissionType {
  id: string
  submitted: Date
}

interface Props {
  submissions: SubmissionType[]
  total: number
}

function SubmissionsList({ submissions = [] }: Props) {

  return (
    <>
      <Card className="rounded-xs p-6 shadow-none">
        {!submissions.length && (
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

        {submissions.length > 0 && (
          <>
            <CardHeader className="p-0">
              <CardTitle>Responses</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table className="border">
                <TableHeader>
                  <TableRow className="bg-zinc-100">
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
                        
                        <TableCell>
                          {convertDate(submission.submitted, "DD MMM YYYY, hh:mm a")}
                        </TableCell>
                       
                       
                        <TableCell className="flex items-center justify-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon-sm"
                                  variant="ghost"
                                >
                                  <Eye />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                View submission
                              </TooltipContent>
                            </Tooltip>

                          
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="p-0">
              <Badge variant="outline">{submissions.length} response{submissions.length > 1 && "s"}</Badge>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  )
}

export default SubmissionsList
