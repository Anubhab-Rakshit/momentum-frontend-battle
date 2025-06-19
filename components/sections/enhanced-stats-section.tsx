"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { ArrowUp, ArrowDown, TrendingUp, BarChart3, Target } from "lucide-react"

interface StatCard {
  title: string
  value: number
  unit: string
  change: number
  changeType: "up" | "down"
  icon: React.ReactNode
  color: "primary" | "secondary" | "accent"
  description: string
}

const statsData: StatCard[] = [
  {
    title: "Carbon Footprint Reduced",
    value: 45048,
    unit: "tCO₂e",
    change: 16,
    changeType: "down",
    icon: <Target className="w-6 h-6" />,
    color: "primary",
    description: "Total emissions prevented this year",
  },
  {
    title: "Energy Efficiency Improved",
    value: 123,
    unit: "kWh/m²",
    change: 22,
    changeType: "down",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "secondary",
    description: "Average energy intensity reduction",
  },
  {
    title: "Projects Completed",
    value: 47,
    unit: "sites",
    change: 27,
    changeType: "up",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "accent",
    description: "Sustainable developments delivered",
  },
]

function CountUp({ end, duration = 2000, isVisible }: { end: number; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <span>{count.toLocaleString()}</span>
}

export function EnhancedStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
            Impact <span className="text-gradient-animated">Visualized</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics showcasing our commitment to sustainable innovation and measurable results
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${
                  stat.color === "primary"
                    ? "from-primary to-primary/50"
                    : stat.color === "secondary"
                      ? "from-secondary to-secondary/50"
                      : "from-accent to-accent/50"
                }`}
              ></div>

              {/* Icon */}
              <div
                className={`relative mb-6 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  stat.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : stat.color === "secondary"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-accent/10 text-accent"
                }`}
              >
                {stat.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground/90 mb-2">{stat.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{stat.description}</p>

              {/* Value */}
              <div className="mb-4">
                <div
                  className={`text-4xl font-bold mb-1 ${
                    stat.color === "primary"
                      ? "text-primary"
                      : stat.color === "secondary"
                        ? "text-secondary"
                        : "text-accent"
                  }`}
                >
                  <CountUp end={stat.value} isVisible={isVisible} />
                  <span className="text-lg ml-1">{stat.unit}</span>
                </div>

                {/* Change Indicator */}
                <div
                  className={`flex items-center text-sm font-medium ${
                    stat.changeType === "down" ? "text-green-500" : "text-blue-500"
                  }`}
                >
                  {stat.changeType === "down" ? (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}% from last year
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    stat.color === "primary"
                      ? "bg-gradient-to-r from-primary/70 to-primary"
                      : stat.color === "secondary"
                        ? "bg-gradient-to-r from-secondary/70 to-secondary"
                        : "bg-gradient-to-r from-accent/70 to-accent"
                  }`}
                  style={{
                    width: isVisible
                      ? `${Math.min(100, (stat.value / Math.max(...statsData.map((s) => s.value))) * 100)}%`
                      : "0%",
                    transitionDelay: `${index * 200 + 500}ms`,
                  }}
                />
              </div>

              {/* Hover Effect */}
              {hoveredCard === index && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-card/30 backdrop-blur-xl p-8 rounded-3xl border border-border/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to see your impact?</h3>
            <p className="text-muted-foreground mb-6">Join the movement towards sustainable digital transformation</p>
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
