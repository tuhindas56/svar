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

function SubmissionsListSkeleton() {
  return (
    <>
      <Card className="rounded-xs p-6 shadow-none">
        <>
          <CardHeader className="p-0">
            <CardTitle>Responses</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="border">
              <TableHeader>
                <TableRow className="bg-zinc-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-60">Submitted on</TableHead>
                  <TableHead className="flex items-center justify-center">Options</TableHead>
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
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="p-0">
            <Skeleton className="h-4 w-20 rounded-xs" />
          </CardFooter>
        </>
      </Card>
    </>
  )
}

export default SubmissionsListSkeleton
