"use client"

import { useState } from "react"
import Link from "next/link"
import { Form, Share, Trash2 } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { deleteFormAction } from "@/lib/actions/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { convertDate } from "@/lib/utils"

interface FormType {
  id: string
  name: string
  created: Date
  modified: Date
  published: boolean
}

interface Props {
  forms: FormType[]
  total: number
}

function FormsList({ forms = [], total = 0 }: Props) {
  const [deleting, setDeleting] = useState(false)

  return (
    <>
      <Card className="rounded-xs p-6 shadow-none">
        {!forms.length && (
          <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
            <div className="text-muted-foreground mb-4 text-4xl">
              <Form size={40} strokeWidth={1} color="var(--primary)" />
            </div>
            <h3 className="text-foreground text-lg font-semibold">
              You don&rsquo;t have any forms yet
            </h3>
            <p className="text-muted-foreground mt-1 max-w-xs text-sm">
              Start creating some forms to see them here!
            </p>
          </div>
        )}

        {forms.length > 0 && (
          <>
            <CardHeader className="p-0">
              <CardTitle>Your Forms</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table className="border">
                <TableHeader>
                  <TableRow className="bg-zinc-50">
                    <TableHead className="font-semibold">Form</TableHead>
                    <TableHead className="font-semibold">Created at</TableHead>
                    <TableHead className="font-semibold">Modified at</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="flex items-center justify-center font-semibold">
                      Options
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forms.map((form, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Link href={`dashboard/form/${form.id}`}>{form.name}</Link>
                        </TableCell>
                        <TableCell>{convertDate(form.created, "DD MMM YYYY, hh:mm a")}</TableCell>
                        <TableCell>{convertDate(form.modified, "DD MMM YYYY, hh:mm a")}</TableCell>
                        <TableCell>
                          <Badge variant={form.published ? "default" : "outline"}>
                            {form.published ? "Published" : "Not published"}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex items-center justify-center">
                          {form.published && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon-sm"
                                  variant="ghost"
                                  onClick={async () => {
                                    await navigator.share({
                                      title: form.name,
                                      text: `${form.name} | svar`,
                                      url: `${window.location.origin}/form/${form.id}`
                                    })
                                  }}
                                >
                                  <Share />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="left">Share form link</TooltipContent>
                            </Tooltip>
                          )}

                          <AlertDialog>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                  <Button size="icon-sm" variant="ghost" disabled={deleting}>
                                    <Trash2 />
                                  </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent side="right">Delete form</TooltipContent>
                            </Tooltip>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete this form?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This form and all associated submissions will be permanently
                                  deleted. This action can’t be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  variant="destructive"
                                  onClick={async () => {
                                    setDeleting(true)
                                    await deleteFormAction(form.id)
                                    setDeleting(false)
                                  }}
                                >
                                  Delete form
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="p-0">
              <Badge variant="outline">{total} forms</Badge>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  )
}

export default FormsList
