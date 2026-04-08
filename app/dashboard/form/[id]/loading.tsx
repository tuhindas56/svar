import { Cog, ExternalLink, Pickaxe, Trash2 } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SubmissionsListSkeleton from "@/components/dashboard/form/submissions-list-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

async function Loading() {
  return (
    <>
      <Card className="rounded-xs shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">
            <Skeleton className="h-4 w-1/3 rounded-xs" />
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="ml-auto flex flex-wrap gap-4">
            <Button variant="outline" size="sm" disabled>
              <Pickaxe /> Open in builder
            </Button>

            <Button variant="outline" size="sm" disabled>
              <ExternalLink /> Open form
            </Button>

            <Button variant="outline" size="sm" disabled>
              <Cog /> Form Settings
            </Button>

            <Button size="icon-sm" variant="outline" disabled>
              <Trash2 />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-[repeat(auto-fill,200px)] gap-4">
        <Card className="w-50 gap-0 rounded-xs p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Skeleton className="h-4 w-full rounded-xs" />
          </CardContent>
        </Card>

        <Card className="w-50 gap-0 rounded-xs p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-sm">Submissions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Skeleton className="h-4 w-full rounded-xs" />
          </CardContent>
        </Card>

        <Card className="w-50 gap-0 rounded-xs p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-sm">Created</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Skeleton className="h-4 w-full rounded-xs" />
          </CardContent>
        </Card>

        <Card className="w-50 gap-0 rounded-xs p-4 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-sm">Last modified</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Skeleton className="h-4 w-full rounded-xs" />
          </CardContent>
        </Card>
      </div>

      <SubmissionsListSkeleton />
    </>
  )
}

export default Loading
