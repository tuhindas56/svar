import type { Metadata } from "next"
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google"

import { cn } from "@/app/utils"
import "./globals.css"

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
  title: "Svar",
  description: "Form builder"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(noto.variable, notoMono.variable, "antialiased")}>
        {children}
      </body>
    </html>
  )
}
