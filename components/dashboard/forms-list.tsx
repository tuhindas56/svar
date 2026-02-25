import Link from "next/link"
import dayjs from "dayjs"

import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { getAllForms, deleteForm } from "@/lib/db/data"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { getSession } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

async function FormsList() {
  const session = await getSession()

  if (!session) redirect("/")

  const formsList = await getAllForms(session.user.id)

  return (
    <div className="mx-auto p-4 py-4 md:w-10/12 lg:w-3xl">
      <Card className="rounded-xs shadow-none">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Modified at</TableHead>
                <TableHead>Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formsList.map((form, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Link href={`/form/create/${form.id}`}>{form.name}</Link>
                    </TableCell>
                    <TableCell>
                      {dayjs(form.created).format("DD MMM YYYY, hh:mm a")}
                    </TableCell>
                    <TableCell>
                      {dayjs(form.modified).format("DD MMM YYYY, hh:mm a")}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={async () => {
                          "use server"
                          deleteForm(form.id, session.user.id)
                        }}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormsList
