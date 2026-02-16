import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return <div className="relative min-h-screen w-full">{children}</div>
}

export default Layout
