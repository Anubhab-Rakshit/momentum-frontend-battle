"use client"
import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Momentum Labs transformed our digital presence with an experience that's nothing short of magical. Every interaction feels intentional and delightful.",
    name: "Arjun Krishnamurthy",
    title: "CEO, TechVeda Solutions",
    avatar: "/images/testimonial-arjun.png",
    company: "TechVeda Solutions",
    direction: "left",
  },
  {
    quote:
      "Working with this team was like watching artists at work. They don't just build websites; they craft digital symphonies that resonate with users.",
    name: "Priya Sharma",
    title: "Creative Director, Indigo Studios",
    avatar: "/images/testimonial-priya.png",
    company: "Indigo Studios",
    direction: "right",
  },
  {
    quote:
      "The attention to detail is extraordinary. Every micro-interaction, every animation serves a purpose. This is what premium digital experiences should feel like.",
    name: "Vikram Patel",
    title: "Head of Digital, Zenith Enterprises",
    avatar: "/images/testimonial-vikram.png",
    company: "Zenith Enterprises",
    direction: "left",
  },
  {
    quote:
      "They didn't just meet our expectations; they redefined what we thought was possible. Our users are now spending 300% more time engaging with our platform.",
    name: "Kavya Nair",
    title: "Product Lead, NextGen Innovations",
    avatar: "/images/testimonial-kavya.png",
    company: "NextGen Innovations",
    direction: "right",
  },
]

export function ScrollTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(testimonials.length).fill(false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "-50px",
      },
    )

    const testimonialElements = sectionRef.current?.querySelectorAll(".testimonial-item")
    testimonialElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
            Voices of <span className="text-gradient-animated">Excellence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What industry leaders say about our transformative digital experiences
          </p>
        </div>

        {/* Testimonials */}
        <div className="space-y-32">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-index={index}
              className={`testimonial-item transition-all duration-1000 ${
                visibleItems[index]
                  ? "opacity-100 translate-x-0"
                  : testimonial.direction === "left"
                    ? "opacity-0 -translate-x-20"
                    : "opacity-0 translate-x-20"
              }`}
            >
              <div
                className={`grid lg:grid-cols-2 gap-12 items-center ${testimonial.direction === "right" ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Content */}
                <div className={`space-y-6 ${testimonial.direction === "right" ? "lg:col-start-2" : ""}`}>
                  <div className="flex justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-accent fill-accent" />
                    ))}
                  </div>

                  <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground/90">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center space-x-4 pt-6">
                    <div className="relative">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full border-2 border-primary/50 card-3d object-cover"
                      />
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-xl text-primary">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.title}</p>
                      <p className="text-accent text-sm font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>

                {/* Visual Element with Real Image */}
                <div className={`${testimonial.direction === "right" ? "lg:col-start-1" : ""}`}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl card-3d"></div>
                    <div className="absolute inset-4 bg-card/50 backdrop-blur-xl rounded-2xl card-3d flex items-center justify-center overflow-hidden">
                      {/* Profile Image Background */}
                      <div className="relative w-full h-full">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover opacity-30 scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="text-white font-bold text-3xl mb-2">{testimonial.name.split(" ")[0]}</div>
                          <div className="text-white/80 text-lg font-medium">{testimonial.company}</div>
                          <div className="text-white/60 text-sm mt-1">{testimonial.title}</div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 text-accent fill-accent" />
                        </div>
                      </div>
                    </div>
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-float card-3d"></div>
                    <div
                      className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/30 rounded-full animate-float card-3d"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
