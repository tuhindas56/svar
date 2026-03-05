import { Skeleton } from "./ui/skeleton"

function PageHeaderSkeleton() {
  return (
    <div className="bg-background sticky top-0 z-50 flex w-full items-center justify-between gap-2 rounded-xs border px-2 py-2">
      <p className="font-lora w-max rounded px-2 text-xl font-medium">svar</p>

      <div className="flex items-center gap-5 md:gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

export default PageHeaderSkeleton
