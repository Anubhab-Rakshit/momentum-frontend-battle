"use client"
// Replicating the effect from 'ripple-effect.mp4'
import React, { useRef, useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button" // Use existing Button as base
import { cn } from "@/lib/utils"

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

export const RippleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, onClick, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([])
    const buttonRef = useRef<HTMLButtonElement>(null) // Internal ref for ripple calculation

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const localButtonRef = buttonRef.current
      if (!localButtonRef) return

      const rect = localButtonRef.getBoundingClientRect()
      const rippleSize = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - rippleSize / 2
      const y = event.clientY - rect.top - rippleSize / 2

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
        size: rippleSize,
      }

      setRipples((prevRipples) => [...prevRipples, newRipple])
    }

    const handleAnimationEnd = (id: number) => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id))
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e)
      if (onClick) {
        onClick(e)
      }
    }

    return (
      <Button
        ref={ref || buttonRef} // Use forwarded ref or internal ref
        className={cn("relative overflow-hidden", className)}
        variant={variant}
        size={size}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-current opacity-25 rounded-full animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
            onAnimationEnd={() => handleAnimationEnd(ripple.id)}
          />
        ))}
      </Button>
    )
  },
)
RippleButton.displayName = "RippleButton"

// Add animation to tailwind.config.ts or globals.css
// In globals.css:
/*
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
.animate-ripple {
  animation: ripple 0.6s linear;
}
*/
