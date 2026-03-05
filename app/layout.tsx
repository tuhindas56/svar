import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Lora, Instrument_Sans } from "next/font/google"

import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { SessionProvider } from "next-auth/react"

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
      <body
        className={cn(
          lora.variable,
          inter.variable,
          "custom-pattern font-sans antialiased"
        )}
      >
        <SessionProvider>
          <TooltipProvider>
            <div className="mx-auto w-full">{children}</div>
          </TooltipProvider>
        </SessionProvider>
        <Toaster
          position="top-right"
          richColors
          theme="light"
          visibleToasts={1}
        />
      </body>
    </html>
  )
}
