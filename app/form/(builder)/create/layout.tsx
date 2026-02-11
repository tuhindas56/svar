import type { Metadata } from "next"
import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Form Builder"
}

function Layout({ children }: LayoutProps) {
  return children
}

export default Layout
