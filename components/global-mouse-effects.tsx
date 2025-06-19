"use client"
// For particle effects on mouse move / custom cursor
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function GlobalMouseEffects() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    gsap.set([dot, outline], { xPercent: -50, yPercent: -50 })

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { duration: 0.1, x: e.clientX, y: e.clientY })
      gsap.to(outline, { duration: 0.4, x: e.clientX, y: e.clientY, ease: "power2.out" })
    }

    const handleMouseEnterTarget = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".cursor-hover-target")) {
        gsap.to(dot, { scale: 1.5, opacity: 0.7, backgroundColor: "hsl(var(--accent))", duration: 0.2 })
        gsap.to(outline, { scale: 1.8, borderColor: "hsl(var(--accent))", opacity: 0.7, duration: 0.3 })
      }
    }

    const handleMouseLeaveTarget = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".cursor-hover-target")) {
        gsap.to(dot, { scale: 1, opacity: 1, backgroundColor: "hsl(var(--primary))", duration: 0.2 })
        gsap.to(outline, { scale: 1, borderColor: "hsl(var(--primary) / 0.5)", opacity: 1, duration: 0.3 })
      }
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseEnterTarget)
    document.addEventListener("mouseout", handleMouseLeaveTarget)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseEnterTarget)
      document.removeEventListener("mouseout", handleMouseLeaveTarget)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot"></div>
      <div ref={outlineRef} className="custom-cursor-outline"></div>
    </>
  )
}
