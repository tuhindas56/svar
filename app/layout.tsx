import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google"

import { cn } from "@/app/lib/utils"
import "./globals.css"

interface RootLayoutProps {
  children: ReactNode
}

const noto = Noto_Sans({
  variable: "--font-noto-sans",
  preload: true,
  subsets: ["latin"]
})

const notoMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
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
    <html lang="en">
      <body
        className={cn(
          noto.variable,
          notoMono.variable,
          "flex flex-col items-center antialiased"
        )}
      >
        {children}
      </body>
    </html>
  )
}
