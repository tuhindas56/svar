import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Lora, Instrument_Sans } from "next/font/google"

import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

interface RootLayoutProps {
  children: ReactNode
}

const lora = Lora({
  variable: "--font-lora",
  preload: true,
  subsets: ["latin"]
})

const inter = Instrument_Sans({
  variable: "--font-instrument-sans",
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
      <body className={cn(lora.variable, inter.variable, "custom-pattern font-sans antialiased")}>
        <TooltipProvider>
          <div className="mx-auto w-full">{children}</div>
        </TooltipProvider>
        <Toaster
          position="top-right"
          offset={{
            top: 60,
            right: 8
          }}
          richColors
          theme="light"
          visibleToasts={1}
        />
      </body>
    </html>
  )
}
