"use client"
import { useEffect, useRef, useState } from "react"
import { MicroCard, MicroButton } from "@/components/ui/micro-interactions"
import { Palette, Code, Smartphone, Globe, Zap, Users, ArrowRight, Sparkles } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Crafting unique visual identities that resonate with your audience and stand the test of time.",
    features: ["Logo Design", "Brand Guidelines", "Visual Systems", "Typography"],
    color: "from-pink-500 to-rose-500",
    delay: 0,
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Building lightning-fast, scalable web applications with cutting-edge technologies.",
    features: ["React/Next.js", "Node.js", "TypeScript", "Performance Optimization"],
    color: "from-blue-500 to-cyan-500",
    delay: 0.2,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Creating intuitive mobile experiences that users love and businesses depend on.",
    features: ["iOS Development", "Android Development", "Cross-platform", "UI/UX Design"],
    color: "from-green-500 to-emerald-500",
    delay: 0.4,
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    description: "Comprehensive digital transformation strategies that drive growth and innovation.",
    features: ["Market Analysis", "User Research", "Growth Strategy", "Analytics"],
    color: "from-purple-500 to-violet-500",
    delay: 0.6,
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing every aspect of your digital presence for maximum speed and efficiency.",
    features: ["Speed Optimization", "SEO", "Core Web Vitals", "Monitoring"],
    color: "from-yellow-500 to-orange-500",
    delay: 0.8,
  },
  {
    icon: Users,
    title: "Consulting",
    description: "Expert guidance to navigate complex technical challenges and strategic decisions.",
    features: ["Technical Audit", "Architecture Review", "Team Training", "Best Practices"],
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
            Our Services
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
            Crafting Digital <span className="text-gradient-animated">Excellence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we provide comprehensive digital solutions that transform ideas into extraordinary
            experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <MicroCard
              key={index}
              data-index={index}
              className={`service-card group relative bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-xl transition-all duration-700 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              {/* Icon */}
              <div
                className={`relative mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-full h-full text-white" />
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
                  Learn More
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
            <h3 className="text-2xl font-bold mb-4">Ready to start your project?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Let's discuss how we can bring your vision to life with our expertise.
            </p>
            <MicroButton className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your Journey
            </MicroButton>
          </MicroCard>
        </div>
      </div>
    </section>
  )
}
