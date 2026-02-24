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
import { getAllForms } from "@/lib/db/data"
import { wait } from "@/lib/utils"

async function FormsList() {
  await wait()
  const formsList = await getAllForms()

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
              {formsList.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Link href={`/form/create/${item.id}`}>{item.name}</Link>
                    </TableCell>
                    <TableCell>
                      {dayjs(item.created).format("DD MMM YYYY, hh:mm a")}
                    </TableCell>
                    <TableCell>
                      {dayjs(item.modified).format("DD MMM YYYY, hh:mm a")}
                    </TableCell>
                    <TableCell>-</TableCell>
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
