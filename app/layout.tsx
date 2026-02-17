import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"

import { cn } from "@/lib/utils"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"

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
    template: "%s - svar",
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
          "custom-pattern flex w-full flex-col items-center font-sans antialiased"
        )}
      >
        <TooltipProvider>
          <div className="md:max-w-6xl">{children}</div>
        </TooltipProvider>
      </body>
    </html>
  )
}
