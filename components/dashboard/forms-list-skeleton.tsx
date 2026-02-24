import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

function FormsListSkeleton() {
  return (
    <div className="mx-auto flex flex-col gap-8 px-4 py-8 md:w-10/12 lg:w-3xl">
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
              {Array.from({ length: 3 }, (_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-xs" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-xs" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-xs" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-xs" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormsListSkeleton
