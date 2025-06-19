"use client"
import { useEffect } from "react"

export function FocusManagement() {
  useEffect(() => {
    // Enhanced focus indicators
    const style = document.createElement("style")
    style.textContent = `
      /* Enhanced focus styles */
      *:focus {
        outline: 2px solid hsl(var(--primary)) !important;
        outline-offset: 2px !important;
        border-radius: 4px !important;
      }
      
      /* Skip to content link */
      .skip-to-content {
        position: absolute;
        top: -40px;
        left: 6px;
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
      }
      
      .skip-to-content:focus {
        top: 6px;
      }
      
      /* High contrast mode support */
      @media (prefers-contrast: high) {
        * {
          border-color: ButtonText !important;
        }
        
        .text-muted-foreground {
          color: ButtonText !important;
        }
        
        .bg-muted {
          background: ButtonFace !important;
        }
      }
      
      /* Reduced transparency for better readability */
      @media (prefers-reduced-transparency: reduce) {
        .backdrop-blur-xl,
        .backdrop-blur-sm,
        .bg-card\/60,
        .bg-card\/30,
        .bg-background\/80 {
          backdrop-filter: none !important;
          background-color: hsl(var(--card)) !important;
        }
      }
    `
    document.head.appendChild(style)

    // Add skip to content link
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.textContent = "Skip to main content"
    skipLink.className = "skip-to-content"
    document.body.insertBefore(skipLink, document.body.firstChild)

    // Keyboard navigation enhancement
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to close modals/menus
      if (e.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement
        if (activeElement && activeElement.blur) {
          activeElement.blur()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink)
      }
    }
  }, [])

  return null
}
