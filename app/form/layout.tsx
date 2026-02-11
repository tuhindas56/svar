import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return <div className="min-h-screen w-full p-8 lg:w-3xl">{children}</div>
}

export default Layout
