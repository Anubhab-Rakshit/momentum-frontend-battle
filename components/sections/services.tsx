"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Leaf, Target, Users } from "lucide-react"

export function Services() {
  const servicesRef = useRef<HTMLElement>(null)

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

    if (servicesRef.current) {
      observer.observe(servicesRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: BarChart3,
      title: "Carbon Footprint Analysis",
      description:
        "Comprehensive measurement and tracking of your organization's carbon emissions across all operations.",
      features: ["Real-time monitoring", "Detailed reporting", "Trend analysis", "Benchmarking"],
    },
    {
      icon: Target,
      title: "Sustainability Strategy",
      description: "Custom roadmaps to achieve your environmental goals with actionable steps and measurable outcomes.",
      features: ["Goal setting", "Action planning", "Progress tracking", "ROI analysis"],
    },
    {
      icon: Leaf,
      title: "Green Certification",
      description: "Support for achieving recognized environmental certifications and compliance standards.",
      features: ["ISO 14001", "LEED certification", "Carbon neutral", "B-Corp assessment"],
    },
    {
      icon: Users,
      title: "Team Training",
      description:
        "Comprehensive training programs to build sustainability awareness and capabilities within your team.",
      features: ["Workshops", "Online courses", "Best practices", "Change management"],
    },
  ]

  return (
    <section id="services" ref={servicesRef} className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Our
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions to help your business achieve its sustainability goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <video autoPlay muted loop playsInline className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/features-services-pQ776SaEuw7tkTuZtsOhOl21udku1X.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  )
}
