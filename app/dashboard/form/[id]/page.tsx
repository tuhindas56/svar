import { redirect } from "next/navigation"
import { Trash2 } from "lucide-react"

import { getSession } from "@/lib/actions/auth"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getFormDetails } from "@/lib/db/data"
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
} from "@/components/ui/alert-dialog"
import { deleteFormAction } from "@/lib/actions/form"
import { convertDate } from "@/lib/utils"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

async function ViewForm(props: Props) {
  const { id } = await props.params

  const session = await getSession()

  if (!session?.user) {
    redirect("/")
  }

  const { success, data } = await getFormDetails({
    id,
    userId: session.user.id as string
  })

  if (!success || !data) {
    return null
  }

  return (
    <>
      <Card className="rounded-xs shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">{data.name}</CardTitle>
        </CardHeader>
        <CardFooter className="gap-4">
          <Link href={`/form/create/${id}`} className="ml-auto">
            <Button variant="outline" size="sm">
              Open in builder
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon-sm" variant="outline">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
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
                    "use server"
                    await deleteFormAction(id)
                  }}
                >
                  Delete form
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-[repeat(auto-fill,200px)] gap-4">
        <Card className="w-50 gap-0 rounded-xs p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {data.published ? "Published" : "Not published"}
          </CardContent>
        </Card>

        <Card className="w-50 gap-0 rounded-xs p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-sm">Submissions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">{data.submissions.length}</CardContent>
        </Card>

        <Card className="w-50 gap-0 rounded-xs p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-sm">Created</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {convertDate(data.created, "DD MMM YY, hh:mm a")}
          </CardContent>
        </Card>

        <Card className="w-50 gap-0 rounded-xs p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-sm">Last modified</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {convertDate(data.modified, "DD MMM YY, hh:mm a")}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ViewForm
