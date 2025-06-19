"use client"
import { useEffect, useRef, useState } from "react"
import { MicroCard, MicroButton } from "@/components/ui/micro-interactions"
import { ArrowRight, Sparkles } from "lucide-react"

const services = [
  {
    customIcon: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-600 rounded-lg"></div>
        <div className="absolute inset-2 bg-white/20 rounded-md backdrop-blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/70 rounded-full mt-1 ml-1"></div>
        </div>
        <div className="absolute bottom-2 right-2 w-1 h-1 bg-white/50 rounded-full"></div>
      </div>
    ),
    title: "Visual Identity",
    description:
      "Crafting distinctive brand experiences that captivate audiences and create lasting impressions through strategic design thinking.",
    features: ["Brand Architecture", "Visual Language", "Identity Systems", "Creative Direction"],
    color: "from-pink-500 to-rose-500",
    delay: 0,
  },
  {
    customIcon: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg"></div>
        <div className="absolute top-2 left-2 right-2 h-1 bg-white/30 rounded-full"></div>
        <div className="absolute top-4 left-2 right-4 h-1 bg-white/50 rounded-full"></div>
        <div className="absolute top-6 left-2 right-3 h-1 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-2 right-2">
          <div className="w-2 h-2 bg-white rounded-sm"></div>
        </div>
      </div>
    ),
    title: "Digital Platforms",
    description:
      "Engineering robust, scalable digital solutions that transform complex business challenges into elegant user experiences.",
    features: ["Full-Stack Development", "Cloud Architecture", "API Integration", "Performance Engineering"],
    color: "from-blue-500 to-cyan-500",
    delay: 0.2,
  },
  {
    customIcon: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-6 bg-white/20 rounded-sm"></div>
          <div className="absolute inset-1 bg-white/40 rounded-sm"></div>
          <div className="absolute top-1 left-1 right-1 h-0.5 bg-white rounded-full"></div>
        </div>
      </div>
    ),
    title: "Mobile Experiences",
    description:
      "Creating intuitive, high-performance mobile applications that users love and businesses depend on for growth.",
    features: ["Native Development", "Cross-Platform Solutions", "User Experience Design", "App Store Optimization"],
    color: "from-green-500 to-emerald-500",
    delay: 0.4,
  },
  {
    customIcon: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-violet-600 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-white/60 rounded-full"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-white/80 rounded-full"></div>
        </div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/40 rounded-full"></div>
      </div>
    ),
    title: "Growth Strategy",
    description:
      "Comprehensive digital transformation strategies that accelerate business growth through data-driven insights and innovation.",
    features: ["Market Intelligence", "User Research", "Growth Hacking", "Analytics & Insights"],
    color: "from-purple-500 to-violet-500",
    delay: 0.6,
  },
  {
    customIcon: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-1 h-4 bg-white/60 rounded-full transform rotate-45"></div>
          <div className="absolute top-0 left-0 w-1 h-4 bg-white/60 rounded-full transform -rotate-45"></div>
        </div>
        <div className="absolute top-1 left-1 w-1 h-1 bg-white/50 rounded-full"></div>
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/50 rounded-full"></div>
      </div>
    ),
    title: "Optimization",
    description:
      "Maximizing digital performance through advanced optimization techniques that deliver measurable results and competitive advantages.",
    features: ["Speed Enhancement", "Search Optimization", "Conversion Rate Optimization", "Performance Monitoring"],
    color: "from-yellow-500 to-orange-500",
    delay: 0.8,
  },
  {
    customIcon: (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white/60 rounded-full"></div>
          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-1 right-1 w-0.5 h-2 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-2 h-0.5 bg-white/40 rounded-full"></div>
      </div>
    ),
    title: "Strategic Guidance",
    description:
      "Expert consultation and technical leadership to navigate complex challenges and achieve ambitious digital transformation goals.",
    features: ["Technical Architecture", "Team Leadership", "Process Optimization", "Innovation Strategy"],
    color: "from-indigo-500 to-blue-500",
    delay: 1.0,
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false))
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, services[index].delay * 1000)
          }
        })
      },
      { threshold: 0.2 },
    )

    const serviceElements = sectionRef.current?.querySelectorAll(".service-card")
    serviceElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
            Crafting Digital <span className="text-gradient-animated">Mastery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to execution, we deliver comprehensive digital solutions that transform ambitious visions into
            extraordinary realities.
          </p>
        </div>

        {/* Services Grid with Hover Effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {services.map((service, index) => (
            <MicroCard
              key={index}
              data-index={index}
              className={`service-card group relative bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-xl transition-all duration-700 transform-gpu ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              } ${
                hoveredCard === index
                  ? "scale-110 z-20 shadow-2xl -translate-y-4"
                  : hoveredCard !== null && Math.abs(hoveredCard - index) === 1
                    ? "scale-95 translate-x-4"
                    : hoveredCard !== null && Math.abs(hoveredCard - index) === 2
                      ? "scale-90 translate-x-2"
                      : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transformOrigin: "center center",
                zIndex: hoveredCard === index ? 20 : 1,
              }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              {/* Custom Icon */}
              <div className="relative mb-6 w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                {service.customIcon}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center text-sm text-muted-foreground"
                      style={{
                        animationDelay: `${index * 0.2 + featureIndex * 0.1}s`,
                        opacity: visibleCards[index] ? 1 : 0,
                        transform: visibleCards[index] ? "translateX(0)" : "translateX(-20px)",
                        transition: "all 0.5s ease-out",
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3`}></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <MicroButton className="group/btn flex items-center text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-xl transition-all duration-300">
                  Explore More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </MicroButton>
              </div>

              {/* Hover Effect */}
              {hoveredCard === index && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
              )}
            </MicroCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <MicroCard className="inline-block bg-card/30 backdrop-blur-xl p-8 rounded-3xl border border-border/50">
            <h3 className="text-2xl font-bold mb-4">Ready to transform your vision?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Let's collaborate to bring your most ambitious digital projects to life.
            </p>
            <MicroButton className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl">
              <Sparkles className="w-4 h-4 mr-2" />
              Begin Your Journey
            </MicroButton>
          </MicroCard>
        </div>
      </div>
    </section>
  )
}
