"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"

const testimonialsData = [
  {
    quote:
      "Working with Momentum Labs was a revelation. They didn't just build a website; they crafted an experience that perfectly captured our brand's essence.",
    name: "Sarah Jennings",
    title: "CEO, Innovate Inc.",
    avatar: "/placeholder.svg?width=80&height=80",
  },
  {
    quote:
      "The level of detail and creativity is unparalleled. Our user engagement has skyrocketed since launch. Truly a team of masters at their craft.",
    name: "Michael Chen",
    title: "Head of Product, FutureScape",
    avatar: "/placeholder.svg?width=80&height=80",
  },
  {
    quote:
      "From concept to deployment, the process was seamless. They listened, they challenged, and they delivered beyond our wildest expectations.",
    name: "Elena Rodriguez",
    title: "Marketing Director, QuantumLeap",
    avatar: "/placeholder.svg?width=80&height=80",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in")
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("visible")
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  const { quote, name, title, avatar } = testimonialsData[currentIndex]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight fade-in">
            Trusted by <span className="text-gradient">Innovators</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto fade-in fade-in-delay-1">
            Our partners' success stories are the true measure of our momentum.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="min-h-[280px] fade-in fade-in-delay-2">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-accent fill-accent" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed md:leading-relaxed text-foreground/90 transition-all duration-500">
              "{quote}"
            </blockquote>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <Image
                src={avatar || "/placeholder.svg"}
                alt={name}
                width={60}
                height={60}
                className="rounded-full shadow-lg border-2 border-primary/50"
              />
              <div>
                <p className="font-semibold text-lg text-primary">{name}</p>
                <p className="text-muted-foreground text-sm">{title}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full h-12 w-12 hover:bg-primary/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full h-12 w-12 hover:bg-primary/10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex justify-center space-x-2 mt-4">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-6 bg-primary" : "w-2 bg-muted-foreground/50 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
