"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"

export function AdvancedPageTransitions() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsTransitioning(true)

    // Create sophisticated transition overlay
    const overlay = document.createElement("div")
    overlay.className = "fixed inset-0 z-[300] pointer-events-none"
    overlay.innerHTML = `
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-0"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-6xl font-bold text-white opacity-0 transform scale-0">
          <span class="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">M</span>
        </div>
      </div>
    `
    document.body.appendChild(overlay)

    // Sophisticated animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false)
        document.body.removeChild(overlay)
      },
    })

    tl.to(overlay.children[0], { opacity: 1, duration: 0.3, ease: "power2.out" })
      .to(
        overlay.children[1].children[0],
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.1",
      )
      .to(overlay.children[1].children[0], {
        scale: 0.8,
        duration: 0.2,
        ease: "power2.inOut",
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      })
  }, [pathname])

  return null
}
