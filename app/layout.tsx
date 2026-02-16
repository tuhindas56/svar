import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"

import { cn } from "@/lib/utils"
import "./globals.css"

interface RootLayoutProps {
  children: ReactNode
}

const lora = Lora({
  variable: "--font-lora",
  preload: true,
  subsets: ["latin"]
})

const inter = Inter({
  variable: "--font-inter",
  preload: true,
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    template: "%s - Svar",
    default: "Svar"
  },
  description: "Form builder"
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          lora.variable,
          inter.variable,
          "flex flex-col items-center font-sans antialiased"
        )}
      >
        {children}
      </body>
    </html>
  )
}
