"use client"
// Inspired by 'parallax-animation.mp4'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

export function ParallaxDemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgLayerRef = useRef<HTMLDivElement>(null)
  const midLayerRef = useRef<HTMLDivElement>(null)
  const fgLayerRef = useRef<HTMLDivElement>(null) // Text content

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgLayerRef.current, {
        yPercent: -20, // Moves less, appears further
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      })
      gsap.to(midLayerRef.current, {
        yPercent: -50, // Moves more, appears closer
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[120vh] overflow-hidden gsap-section">
      {/* Background Layer */}
      <div ref={bgLayerRef} className="absolute inset-0 h-[150%] top-[-25%]">
        <Image
          src="/placeholder.svg?width=1920&height=1280"
          alt="Parallax Background"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
      </div>

      {/* Middle Layer */}
      <div ref={midLayerRef} className="absolute inset-0 h-[140%] top-[-20%] flex items-center justify-center">
        <Image
          src="/placeholder.svg?width=800&height=600"
          alt="Parallax Midground"
          width={600}
          height={450}
          className="opacity-80 rounded-lg shadow-2xl"
        />
      </div>

      {/* Foreground Content Layer */}
      <div ref={fgLayerRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
        <div className="bg-background/70 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary gsap-fade-in-up">Layers of Innovation</h2>
          <p className="text-lg md:text-xl text-foreground/90 gsap-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Experience visual depth that tells a story. Our designs go beyond the surface, creating immersive and
            engaging digital landscapes.
          </p>
        </div>
      </div>
    </section>
  )
}
