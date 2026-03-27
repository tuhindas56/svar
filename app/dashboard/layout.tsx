import { Suspense } from "react"
import type { ReactNode } from "react"

import PageHeader from "@/components/page-header"
import PageHeaderSkeleton from "@/components/page-header-skeleton"

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <Suspense fallback={<PageHeaderSkeleton />}>
        <PageHeader />
      </Suspense>
      <div className="mx-auto flex w-full flex-col gap-6 px-4 py-8 xl:w-3/4">
        {children}
      </div>
    </>
  )
}
export default Layout
