"use client"
import { useEffect, useRef, useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StatData {
  title: string
  unit: string
  currentValue: number
  changePercentage: number
  changeDirection: "up" | "down"
  changeReference: string
  historicalData: { year: number; value: number; displayValue?: string }[]
  maxValue?: number
}

const stats: StatData[] = [
  {
    title: "Managed portfolio carbon footprint",
    unit: "tCO₂e",
    currentValue: 45048,
    changePercentage: 16,
    changeDirection: "up",
    changeReference: "from 2019",
    historicalData: [
      { year: 2022, value: 45048 },
      { year: 2021, value: 14111 },
      { year: 2020, value: 32813 },
      { year: 2019, value: 38673 },
    ],
    maxValue: 50000,
  },
  {
    title: "Managed portfolio energy intensity",
    unit: "kWh/m²",
    currentValue: 123,
    changePercentage: 22,
    changeDirection: "down",
    changeReference: "from 2019",
    historicalData: [
      { year: 2022, value: 123 },
      { year: 2021, value: 128 },
      { year: 2020, value: 135 },
      { year: 2019, value: 157 },
    ],
    maxValue: 160,
  },
  {
    title: "Managed portfolio energy consumption",
    unit: "kWh",
    currentValue: 47790662,
    changePercentage: 27,
    changeDirection: "down",
    changeReference: "from 2019",
    historicalData: [
      { year: 2022, value: 47790662, displayValue: "47,790,662" },
      { year: 2021, value: 49324077, displayValue: "49,324,077" },
      { year: 2020, value: 48784205, displayValue: "48,784,205" },
      { year: 2019, value: 65198706, displayValue: "65,198,706" },
    ],
    maxValue: 70000000,
  },
]

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

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

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export function StatsSection() {
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight fade-in">
            Impact <span className="text-primary">Visualized</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto fade-in fade-in-delay-1">
            Transparent metrics showcasing our commitment to sustainable progress and tangible results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 fade-in"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold text-foreground/90 mb-1">{stat.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{stat.unit}</p>

              <div className="flex items-baseline justify-between mb-4">
                <div className="text-4xl font-bold text-primary">
                  <CountUp end={stat.currentValue} />
                </div>
                <div
                  className={`flex items-center text-sm font-medium ${
                    stat.changeDirection === "down" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.changeDirection === "down" ? (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  )}
                  {stat.changePercentage}%
                  <span className="text-xs text-muted-foreground ml-1 whitespace-nowrap">{stat.changeReference}</span>
                </div>
              </div>

              <div className="space-y-3">
                {stat.historicalData.map((data) => (
                  <div key={data.year} className="text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground">{data.year}</span>
                      <span className="font-medium text-foreground/80">
                        {data.displayValue || data.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-secondary to-primary opacity-70 transition-all duration-1000 ease-out"
                        style={{
                          width: `${(data.value / (stat.maxValue || Math.max(...stat.historicalData.map((d) => d.value)) * 1.1)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
