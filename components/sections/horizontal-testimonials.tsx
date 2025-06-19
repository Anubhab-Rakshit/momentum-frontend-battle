"use client"
import { useEffect, useRef } from "react"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Momentum Labs transformed our digital presence with an experience that's nothing short of magical. Every interaction feels intentional and delightful.",
    name: "Sarah Chen",
    title: "CEO, InnovateTech",
    avatar: "/placeholder.svg?width=80&height=80&text=SC",
    company: "InnovateTech",
  },
  {
    quote:
      "Working with this team was like watching artists at work. They don't just build websites; they craft digital symphonies that resonate with users.",
    name: "Marcus Rodriguez",
    title: "Creative Director, Flux Studios",
    avatar: "/placeholder.svg?width=80&height=80&text=MR",
    company: "Flux Studios",
  },
  {
    quote:
      "The attention to detail is extraordinary. Every micro-interaction, every animation serves a purpose. This is what premium digital experiences should feel like.",
    name: "Elena Vasquez",
    title: "Head of Digital, Zenith Corp",
    avatar: "/placeholder.svg?width=80&height=80&text=EV",
    company: "Zenith Corp",
  },
  {
    quote:
      "They didn't just meet our expectations; they redefined what we thought was possible. Our users are now spending 300% more time engaging with our platform.",
    name: "David Kim",
    title: "Product Lead, NextGen Solutions",
    avatar: "/placeholder.svg?width=80&height=80&text=DK",
    company: "NextGen Solutions",
  },
]

export function HorizontalTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const title = titleRef.current

    if (!section || !track || !title) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight

      // Title animation
      const titleProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))
      if (titleProgress > 0.1) {
        title.style.opacity = "1"
        title.style.transform = "translateY(0)"
      }

      // Horizontal scroll calculation
      const scrollStart = windowHeight * 0.2
      const scrollEnd = sectionHeight + windowHeight * 0.8
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top - scrollStart) / (scrollEnd - scrollStart)),
      )

      // Move track horizontally
      const maxScroll = track.scrollWidth - track.offsetWidth
      const scrollAmount = scrollProgress * maxScroll

      track.style.transform = `translateX(-${scrollAmount}px)`

      // Animate individual cards
      const cards = track.querySelectorAll(".testimonial-card")
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement
        const cardRect = cardElement.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const screenCenter = window.innerWidth / 2
        const distance = Math.abs(cardCenter - screenCenter)
        const maxDistance = window.innerWidth / 2

        // Scale and opacity based on distance from center
        const scale = Math.max(0.8, 1 - (distance / maxDistance) * 0.2)
        const opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4)

        cardElement.style.transform = `scale(${scale})`
        cardElement.style.opacity = opacity.toString()
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-muted/20 overflow-hidden" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        {/* Title */}
        <div
          ref={titleRef}
          className="container mx-auto px-4 mb-16 opacity-0 transform translate-y-8 transition-all duration-1000"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
              Voices of <span className="text-gradient-animated">Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What industry leaders say about our transformative digital experiences
            </p>
          </div>
        </div>

        {/* Scrolling Track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 px-4 transition-transform duration-100 ease-out"
            style={{ width: "max-content" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card flex-shrink-0 w-[90vw] sm:w-[500px] bg-card/90 backdrop-blur-xl p-8 rounded-2xl border border-border/50 shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>

                <blockquote className="text-lg leading-relaxed text-foreground/90 mb-8 min-h-[120px]">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-primary/50"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-primary">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.title}</p>
                    <p className="text-accent text-xs font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
