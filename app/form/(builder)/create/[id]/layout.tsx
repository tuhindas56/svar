import { Suspense } from "react"
import type { ReactNode } from "react"
import type { Metadata } from "next"

import PageHeader from "@/components/page-header"
import PageHeaderSkeleton from "@/components/page-header-skeleton"
import { BuilderModeProvider } from "@/lib/contexts/builder-mode"

interface Props {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Create form"
}

function Layout({ children }: Props) {
  return (
    <>
      <BuilderModeProvider>
        <Suspense fallback={<PageHeaderSkeleton />}>
          <PageHeader />
        </Suspense>
        <div className="mx-auto flex w-full flex-col gap-6 px-4 py-8 md:w-10/12 lg:w-3xl">
          {children}
        </div>
      </BuilderModeProvider>
    </>
  )
}

export default Layout
