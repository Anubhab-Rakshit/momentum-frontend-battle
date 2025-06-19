"use client"
import { useEffect, useState } from "react"
import type React from "react"

export function MotionPreferences() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    // Apply reduced motion styles
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty("--animation-duration", "0.01ms")
      document.documentElement.style.setProperty("--transition-duration", "0.01ms")

      // Disable complex animations
      const style = document.createElement("style")
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        .animate-pulse,
        .animate-spin,
        .animate-bounce,
        .animate-float {
          animation: none !important;
        }
        
        .text-gradient-animated {
          background: linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary))) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          animation: none !important;
        }
      `
      document.head.appendChild(style)
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return null
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MotionPreferences />
      {children}
    </>
  )
}
