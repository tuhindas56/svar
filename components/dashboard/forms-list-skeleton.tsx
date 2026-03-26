import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="rounded-xs p-6 shadow-none">
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
            {Array.from({ length: 3 }, (_, index) => {
              return (
                <TableRow key={index}>
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
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-xs" />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="p-0">
        <Skeleton />
      </CardFooter>
    </Card>
  )
}

export default FormsListSkeleton
