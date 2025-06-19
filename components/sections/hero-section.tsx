"use client"
import { useEffect, useRef, useState } from "react"
import { ArrowDown, Play, Sparkles } from "lucide-react"
import { EnhancedWebGLBackground } from "@/components/effects/enhanced-webgl-background"
import { MicroButton } from "@/components/ui/micro-interactions"
import Image from "next/image"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [typewriterText, setTypewriterText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const fullText =
    "We craft digital experiences that captivate, inspire, and transform brands into unforgettable journeys."

  useEffect(() => {
    // Initial animation trigger
    setTimeout(() => setIsVisible(true), 1500)

    // Typewriter effect
    let index = 0
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => setShowCursor(false), 1000)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <EnhancedWebGLBackground />

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Title with Staggered Animation */}
            <div className="space-y-4">
              <h1
                ref={titleRef}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-none"
              >
                <div
                  className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <span className="inline-block">Crafting</span>
                </div>
                <div
                  className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <span className="text-gradient-animated">Digital</span>
                </div>
                <div
                  className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <span className="text-gradient-animated">Momentum</span>
                  <span className="text-accent">.</span>
                </div>
              </h1>
            </div>

            {/* Typewriter Subtitle */}
            <div
              className={`transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {typewriterText}
                {showCursor && <span className="animate-pulse text-primary">|</span>}
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-1200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <MicroButton className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl hover:shadow-primary/25 px-8 py-4 text-lg group card-3d rounded-xl">
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Explore Our Universe
              </MicroButton>

              <MicroButton className="border-2 border-foreground/20 hover:border-primary hover:text-primary hover:bg-primary/5 px-8 py-4 text-lg group backdrop-blur-sm card-3d rounded-xl">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Reel
              </MicroButton>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-6 pt-8 transition-all duration-1000 delay-1400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="text-center card-3d p-4 rounded-xl bg-card/20 backdrop-blur-sm">
                <div className="text-3xl font-bold text-primary animate-pulse">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center card-3d p-4 rounded-xl bg-card/20 backdrop-blur-sm">
                <div className="text-3xl font-bold text-secondary animate-pulse" style={{ animationDelay: "1s" }}>
                  15+
                </div>
                <div className="text-sm text-muted-foreground">Awards</div>
              </div>
              <div className="text-center card-3d p-4 rounded-xl bg-card/20 backdrop-blur-sm">
                <div className="text-3xl font-bold text-accent animate-pulse" style={{ animationDelay: "2s" }}>
                  100%
                </div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative transition-all duration-1500 delay-800 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl card-3d">
              <Image
                src="/images/hero-visual.png"
                alt="Digital Innovation"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20"></div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-primary/20 rounded-full backdrop-blur-sm animate-float card-3d"></div>
              <div
                className="absolute bottom-8 left-8 w-12 h-12 bg-secondary/20 rounded-full backdrop-blur-sm animate-float card-3d"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute top-1/2 left-4 w-8 h-8 bg-accent/20 rounded-full backdrop-blur-sm animate-float card-3d"
                style={{ animationDelay: "4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <ArrowDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  )
}
