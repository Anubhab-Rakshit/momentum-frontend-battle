"use client"
import { useEffect, useRef, useState } from "react"
import { MicroCard } from "@/components/ui/micro-interactions"
import { Award, Users, Coffee, Heart, Target, Zap } from "lucide-react"
import Image from "next/image"

const stats = [
  { icon: Award, value: 50, suffix: "+", label: "Awards Won", color: "text-yellow-500" },
  { icon: Users, value: 200, suffix: "+", label: "Happy Clients", color: "text-blue-500" },
  { icon: Coffee, value: 1000, suffix: "+", label: "Cups of Coffee", color: "text-amber-500" },
  { icon: Heart, value: 99, suffix: "%", label: "Client Satisfaction", color: "text-red-500" },
]

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every pixel, every interaction, every detail crafted with meticulous attention to perfection.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge technologies and creative solutions that inspire.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Driven by genuine love for design and development, creating experiences that truly matter.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<number[]>(new Array(stats.length).fill(0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate stats
          stats.forEach((stat, index) => {
            let current = 0
            const increment = stat.value / 60 // 60 frames for smooth animation
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.value) {
                current = stat.value
                clearInterval(timer)
              }
              setAnimatedStats((prev) => {
                const newStats = [...prev]
                newStats[index] = Math.floor(current)
                return newStats
              })
            }, 16) // ~60fps
          })
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            About Us
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
            Passionate <span className="text-gradient-animated">Creators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're a team of designers, developers, and strategists united by our passion for creating digital
            experiences that make a difference.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Our Story</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2018, Momentum Labs emerged from a simple belief: that exceptional digital experiences have
                  the power to transform businesses and touch lives. What started as a small team of passionate creators
                  has grown into a full-service digital agency.
                </p>
                <p>
                  We've had the privilege of working with startups disrupting industries, established brands reimagining
                  their digital presence, and visionary leaders building the future. Each project teaches us something
                  new and fuels our passion for innovation.
                </p>
                <p>
                  Today, we continue to push boundaries, embrace new technologies, and create digital experiences that
                  not only meet business objectives but inspire and delight users.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold">Our Values</h4>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <MicroCard
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-card/30 rounded-xl border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">{value.title}</h5>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </MicroCard>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <MicroCard className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
              <Image
                src="/images/team-photo.png"
                alt="Our Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-float">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div
                className="absolute bottom-6 left-6 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-float"
                style={{ animationDelay: "1s" }}
              >
                <Zap className="w-8 h-8 text-white" />
              </div>
            </MicroCard>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <MicroCard
                key={index}
                className="text-center p-6 bg-card/30 backdrop-blur-xl rounded-2xl border border-border/30"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-2">
                  {animatedStats[index]}
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </MicroCard>
            ))}
          </div>
        </div>

        {/* Team CTA */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <MicroCard className="inline-block bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-3xl border border-border/30">
            <h3 className="text-2xl font-bold mb-4">Want to join our team?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              We're always looking for talented individuals who share our passion for creating exceptional digital
              experiences.
            </p>
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              View Open Positions
            </button>
          </MicroCard>
        </div>
      </div>
    </section>
  )
}
