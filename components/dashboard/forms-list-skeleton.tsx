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
              <TableHead className="w-60">Form</TableHead>
              <TableHead className="w-60">Created at</TableHead>
              <TableHead className="w-60">Modified at</TableHead>
              <TableHead className="w-30">Status</TableHead>
              <TableHead className="text-center">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }, (_, index) => {
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
        <Skeleton className="h-4 w-20 rounded-xs" />
      </CardFooter>
    </Card>
  )
}

export default FormsListSkeleton
