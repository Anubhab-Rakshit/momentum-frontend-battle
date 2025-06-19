"use client"
import { useEffect, useState, useRef } from "react"

export function CustomLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Stage 0: Initial load
    const timer1 = setTimeout(() => setStage(1), 500)

    // Stage 1: Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setStage(2)
          setTimeout(() => {
            setStage(3)
            setTimeout(() => setIsLoading(false), 800)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => {
      clearTimeout(timer1)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      {/* Animated Logo */}
      <div className="relative mb-8">
        <div
          className={`w-20 h-20 relative transition-all duration-1000 ${stage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-spin"></div>
          {/* Inner Ring */}
          <div
            className="absolute inset-2 border-4 border-secondary/50 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "3s" }}
          ></div>
          {/* Center Dot */}
          <div className="absolute inset-6 bg-accent rounded-full animate-pulse"></div>

          {/* Particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${i * 45}deg) translateY(-40px)`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Brand Name with Typewriter */}
      <div
        className={`text-center transition-all duration-1000 ${stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient-animated">Momentum</span>
        </h1>
        <p className="text-muted-foreground text-sm tracking-wider">
          {stage >= 2 ? "Crafting Digital Excellence..." : "Loading..."}
        </p>
      </div>

      {/* Progress Bar */}
      <div
        className={`w-64 h-1 bg-muted rounded-full overflow-hidden mt-8 transition-all duration-500 ${stage >= 1 ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Completion Animation */}
      {stage >= 3 && <div className="absolute inset-0 bg-primary/10 animate-pulse" />}
    </div>
  )
}
