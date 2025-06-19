"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialsRef = useRef<HTMLElement>(null)

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Sustainability Director",
      company: "TechCorp Global",
      content:
        "EcoMetrics transformed how we approach sustainability. Their analytics platform gave us the insights we needed to reduce our carbon footprint by 40% in just two years.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Rodriguez",
      role: "CEO",
      company: "GreenBuild Industries",
      content:
        "The team at EcoMetrics doesn't just provide data - they provide actionable strategies. We achieved carbon neutrality 3 years ahead of schedule thanks to their guidance.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emma Thompson",
      role: "Operations Manager",
      company: "Sustainable Solutions Ltd",
      content:
        "Working with EcoMetrics has been a game-changer. Their real-time monitoring helped us identify inefficiencies we never knew existed. Highly recommended!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={testimonialsRef} className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            What our
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              clients say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading organizations worldwide to drive their sustainability initiatives
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center space-y-6">
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-lg">{testimonials[currentIndex].name}</div>
                      <div className="text-muted-foreground">{testimonials[currentIndex].role}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[currentIndex].company}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-green-600" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <video autoPlay muted loop playsInline className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/testimonials-dLxUUrcoE2ZNQ6svigDm0MhvTvX6hv.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  )
}
