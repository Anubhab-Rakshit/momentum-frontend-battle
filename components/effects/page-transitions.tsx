"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransitions() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 800)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!isTransitioning) return null

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {/* Sliding panels */}
      <div className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-primary transform translate-y-full animate-slide-up"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "0.8s",
              animationFillMode: "forwards",
            }}
          />
        ))}
      </div>

      {/* Logo animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl font-bold text-white animate-pulse">Momentum</div>
      </div>
    </div>
  )
}
