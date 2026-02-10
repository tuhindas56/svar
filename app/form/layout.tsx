import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return <div className="h-screen bg-blue-50 p-8">{children}</div>
}

export default Layout
