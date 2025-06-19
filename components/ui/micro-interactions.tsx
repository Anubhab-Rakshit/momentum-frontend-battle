"use client"
import { useEffect, useRef } from "react"
import { playInteractionSound } from "@/components/effects/sound-manager"

// Enhanced Button with micro-interactions
export function MicroButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  ...props
}: any) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseEnter = () => {
      button.style.transform = "translateY(-2px) scale(1.02)"
      button.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)"
      playInteractionSound("hover")
    }

    const handleMouseLeave = () => {
      button.style.transform = "translateY(0) scale(1)"
      button.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"
    }

    const handleMouseDown = () => {
      button.style.transform = "translateY(1px) scale(0.98)"
      playInteractionSound("click")
    }

    const handleMouseUp = () => {
      button.style.transform = "translateY(-2px) scale(1.02)"
    }

    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("mousedown", handleMouseDown)
    button.addEventListener("mouseup", handleMouseUp)

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("mousedown", handleMouseDown)
      button.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      className={`transition-all duration-200 ease-out ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Enhanced Input with micro-interactions
export function MicroInput({ className = "", ...props }: any) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    const handleFocus = () => {
      input.style.transform = "scale(1.02)"
      input.style.boxShadow = "0 0 0 3px rgba(96, 165, 250, 0.1)"
      playInteractionSound("hover")
    }

    const handleBlur = () => {
      input.style.transform = "scale(1)"
      input.style.boxShadow = "none"
    }

    input.addEventListener("focus", handleFocus)
    input.addEventListener("blur", handleBlur)

    return () => {
      input.removeEventListener("focus", handleFocus)
      input.removeEventListener("blur", handleBlur)
    }
  }, [])

  return <input ref={inputRef} className={`transition-all duration-200 ease-out ${className}`} {...props} />
}

// Enhanced Card with micro-interactions
export function MicroCard({ children, className = "", ...props }: any) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      card.style.transform = "translateY(-8px) rotateX(5deg) rotateY(5deg)"
      card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"
    }

    const handleMouseLeave = () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0)"
      card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className={`transition-all duration-300 ease-out transform-gpu ${className}`} {...props}>
      {children}
    </div>
  )
}
