"use client"
import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`

      requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && target instanceof HTMLElement && target.matches('button, a, [role="button"]')) {
        cursor.classList.add("scale-150", "bg-primary/30")
        cursorDot.classList.add("scale-0")
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && target instanceof HTMLElement && target.matches('button, a, [role="button"]')) {
        cursor.classList.remove("scale-150", "bg-primary/30")
        cursorDot.classList.remove("scale-0")
      }
    }

    document.addEventListener("mouseover", handleMouseEnter, true)
    document.addEventListener("mouseout", handleMouseLeave, true)

    updateCursor()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseEnter, true)
      document.removeEventListener("mouseout", handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 bg-primary/20 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-[9999] transition-all duration-150"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}
