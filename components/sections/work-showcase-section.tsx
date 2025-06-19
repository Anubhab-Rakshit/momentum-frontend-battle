"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Eye } from "lucide-react"
import { RippleButton } from "../ui/ripple-button"

const workItems = [
  {
    id: 1,
    title: "Project Nova",
    category: "Web Experience",
    imageUrl: "/images/project-nova.png",
    description: "A groundbreaking immersive web platform for a leading tech innovator.",
  },
  {
    id: 2,
    title: "Aura Branding",
    category: "Brand Identity",
    imageUrl: "/images/project-aura.png",
    description: "Crafting a vibrant and dynamic brand identity for a disruptive startup.",
  },
  {
    id: 3,
    title: "Kinetic Mobile",
    category: "Mobile Application",
    imageUrl: "/images/project-kinetic.png",
    description: "Designing an intuitive and engaging mobile app for a global fitness brand.",
  },
  {
    id: 4,
    title: "EcoVerse",
    category: "Interactive Installation",
    imageUrl: "/images/project-ecoverse.png",
    description: "An awe-inspiring interactive installation merging art and technology.",
  },
]

export function WorkShowcaseSection() {
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

  return (
    <section ref={sectionRef} id="work" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight fade-in">
            Our <span className="text-gradient">Creations</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto fade-in fade-in-delay-1">
            A glimpse into the digital experiences we've meticulously crafted, pushing boundaries and delivering impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {workItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-xl border border-border/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 fade-in"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Eye className="w-8 h-8 text-white/80 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-sm font-medium text-primary mb-1">{item.category}</p>
                <h3 className="text-2xl font-serif font-bold mb-3 text-foreground/90 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed min-h-[3em]">{item.description}</p>
                <Link
                  href={`/work/${item.id}`}
                  className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                >
                  View Project <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 md:mt-20 fade-in fade-in-delay-3">
          <RippleButton
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-300 px-10 py-4 text-lg"
          >
            View All Projects
          </RippleButton>
        </div>
      </div>
    </section>
  )
}
