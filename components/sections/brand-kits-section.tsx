"use client"
// Replicating UI from 'cards.png'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { CheckSquare, Square, Settings2, Palette, Type, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface BrandKit {
  id: string
  name: string
  logoColor1: string // Tailwind color class e.g., bg-green-500
  logoColor2: string
  logoColor3: string
  isSelected: boolean
}

const brandKitsData: BrandKit[] = [
  {
    id: "ecorp",
    name: "ECorp",
    logoColor1: "bg-teal-500",
    logoColor2: "bg-teal-300",
    logoColor3: "bg-white",
    isSelected: false,
  },
  {
    id: "icorp",
    name: "ICorp",
    logoColor1: "bg-amber-500",
    logoColor2: "bg-amber-300",
    logoColor3: "bg-white",
    isSelected: false,
  },
  {
    id: "agency",
    name: "The Agency",
    logoColor1: "bg-red-500",
    logoColor2: "bg-red-300",
    logoColor3: "bg-white",
    isSelected: true,
  },
]

export function BrandKitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelector(".section-title") as Element,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } },
      )
      gsap.utils.toArray<HTMLElement>(".brand-kit-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2 + i * 0.15,
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background gsap-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold tracking-tight">
            Curated <span className="text-secondary">Brand Identities</span>
          </h2>
          <p
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto gsap-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Streamline your brand management with intuitive kits, ensuring consistency across all touchpoints.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-card p-6 sm:p-8 rounded-2xl shadow-2xl border border-border/50">
          <h3 className="text-2xl font-semibold mb-6 text-foreground/90">Brand Kits</h3>
          <div className="space-y-3">
            {brandKitsData.map((kit) => (
              <div
                key={kit.id}
                className={cn(
                  "brand-kit-card flex items-center justify-between p-4 rounded-lg border transition-all duration-300 cursor-pointer",
                  kit.isSelected
                    ? "bg-primary/10 border-primary shadow-md"
                    : "bg-muted/50 border-border hover:border-border/70 hover:bg-muted",
                )}
              >
                <div className="flex items-center space-x-4">
                  {kit.isSelected ? (
                    <CheckSquare className="w-5 h-5 text-primary" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div className="flex -space-x-2 items-center">
                    <div className={cn("w-6 h-6 rounded-full ring-2 ring-card", kit.logoColor1)}></div>
                    <div className={cn("w-6 h-6 rounded-full ring-2 ring-card", kit.logoColor2)}></div>
                    <div className={cn("w-6 h-6 rounded-full ring-2 ring-card", kit.logoColor3)}></div>
                  </div>
                  <span className={cn("font-medium", kit.isSelected ? "text-primary" : "text-foreground/80")}>
                    {kit.name}
                  </span>
                </div>
                <Settings2 className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Manage brand assets including:</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center space-x-1.5 bg-muted px-3 py-1.5 rounded-md">
                <Palette className="w-4 h-4 text-accent" />
                <span>Colors</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-muted px-3 py-1.5 rounded-md">
                <Type className="w-4 h-4 text-secondary" />
                <span>Typography</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-muted px-3 py-1.5 rounded-md">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span>Logos & Imagery</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
