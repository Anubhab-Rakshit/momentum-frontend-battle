"use client"
import { useEffect, useRef, useState } from "react"
import { MicroCard } from "@/components/ui/micro-interactions"
import { Target, Zap, Lightbulb, Rocket } from "lucide-react"
import Image from "next/image"

const stats = [
  {
    value: 127,
    suffix: "+",
    label: "Projects Delivered",
    color: "text-emerald-400",
    bgColor: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
  },
  {
    value: 89,
    suffix: "+",
    label: "Global Partners",
    color: "text-blue-400",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    value: 2.4,
    suffix: "M+",
    label: "Lines of Code",
    color: "text-purple-400",
    bgColor: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    value: 98.7,
    suffix: "%",
    label: "Success Rate",
    color: "text-orange-400",
    bgColor: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30",
  },
]

const values = [
  {
    icon: Target,
    title: "Precision Engineering",
    description:
      "Every pixel, every interaction, every detail crafted with meticulous attention to perfection and user experience.",
  },
  {
    icon: Zap,
    title: "Lightning Innovation",
    description:
      "Pushing boundaries with cutting-edge technologies and creative solutions that inspire and transform industries.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description:
      "Driven by genuine love for design and development, creating experiences that truly matter and drive results.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<number[]>(new Array(stats.length).fill(0))
  const [typewriterText, setTypewriterText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const fullText = "Passionate Innovators"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          // Typewriter effect
          let index = 0
          const typeInterval = setInterval(() => {
            if (index < fullText.length) {
              setTypewriterText(fullText.slice(0, index + 1))
              index++
            } else {
              clearInterval(typeInterval)
              setTimeout(() => setShowCursor(false), 1000)
            }
          }, 100)

          // Animate stats
          setTimeout(() => {
            stats.forEach((stat, statIndex) => {
              let current = 0
              const increment = stat.value / 60
              const timer = setInterval(() => {
                current += increment
                if (current >= stat.value) {
                  current = stat.value
                  clearInterval(timer)
                }
                setAnimatedStats((prev) => {
                  const newStats = [...prev]
                  newStats[statIndex] = Math.floor(current * 10) / 10
                  return newStats
                })
              }, 16)
            })
          }, 800)
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
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-200/30 dark:via-blue-500/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-200/30 dark:via-purple-500/20 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-200/30 dark:via-indigo-500/20 to-transparent"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-200/30 dark:border-blue-500/30">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Our Story
          </div>
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text">
              {typewriterText}
            </span>
            {showCursor && <span className="animate-pulse text-blue-500">|</span>}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We're a collective of digital architects, creative engineers, and strategic visionaries united by our
            mission to transform ideas into extraordinary digital experiences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Our Genesis</h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Born from the intersection of technology and creativity, Momentum Labs emerged in 2019 with a radical
                  vision: to bridge the gap between what's possible and what's profitable in the digital realm.
                </p>
                <p>
                  Our journey began with three engineers in a garage, armed with nothing but laptops, limitless
                  ambition, and an unwavering belief that exceptional digital experiences could reshape entire
                  industries.
                </p>
                <p>
                  Today, we've evolved into a full-spectrum digital laboratory where breakthrough innovations are not
                  just conceived but meticulously crafted into market-ready solutions that drive measurable business
                  impact.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white">Core Principles</h4>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <MicroCard
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 border border-blue-200/30 dark:border-blue-500/30">
                      <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2 text-slate-900 dark:text-white">{value.title}</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{value.description}</p>
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
            <MicroCard className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 border border-blue-200/30 dark:border-blue-500/30">
              <Image
                src="/images/team-photo.png"
                alt="Our Innovation Lab"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float border border-white/30">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div
                className="absolute bottom-6 left-6 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float border border-white/30"
                style={{ animationDelay: "1s" }}
              >
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
            </MicroCard>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div
          className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <MicroCard
                key={index}
                className={`text-center p-8 bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl rounded-3xl border ${stat.borderColor} hover:scale-105 transition-all duration-300`}
              >
                <div className="text-4xl font-bold mb-2">
                  <span className={stat.color}>
                    {animatedStats[index]}
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">{stat.label}</div>

                {/* Progress indicator */}
                <div className="mt-4 w-full bg-white/20 rounded-full h-1">
                  <div
                    className={`h-1 bg-gradient-to-r ${stat.color.replace("text-", "from-")} to-transparent rounded-full transition-all duration-1000`}
                    style={{ width: `${(animatedStats[index] / stat.value) * 100}%` }}
                  ></div>
                </div>
              </MicroCard>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <MicroCard className="inline-block bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 p-10 rounded-3xl border border-blue-200/30 dark:border-blue-500/30 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Ready to Build the Future?</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
              Join our mission to create digital experiences that don't just meet expectations—they redefine entire
              industries.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Your Journey
            </button>
          </MicroCard>
        </div>
      </div>
    </section>
  )
}
