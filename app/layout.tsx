import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UnconventionalNavbar } from "@/components/layout/unconventional-navbar"
import { CreativeFooter } from "@/components/layout/creative-footer"
import { CustomLoader } from "@/components/custom-loader"
import { MouseParticles } from "@/components/effects/mouse-particles"
import { CustomCursor } from "@/components/effects/custom-cursor"
import { PageTransitions } from "@/components/effects/page-transitions"
import { SoundManager } from "@/components/effects/sound-manager"
import { AccessibilityProvider } from "@/components/accessibility/motion-preferences"
import { FocusManagement } from "@/components/accessibility/focus-management"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Momentum Labs - Shaping Tomorrow's Experiences",
  description: "Premium digital experiences that captivate and inspire",
    generator: 'Anubhab Rakshit'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AccessibilityProvider>
            <CustomLoader />
            <PageTransitions />
            <SoundManager />
            <FocusManagement />
            <CustomCursor />
            <MouseParticles />
            <UnconventionalNavbar />
            <main>{children}</main>
            <CreativeFooter />
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
