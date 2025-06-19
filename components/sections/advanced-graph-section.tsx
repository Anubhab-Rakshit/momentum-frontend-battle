"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, BarChart3, Filter } from "lucide-react"

interface DataPoint {
  id: string
  year: number
  month: string
  value: number
  type: "refurbishment" | "new-build"
  status: "complete" | "estimate"
  project: string
}

const graphData: DataPoint[] = [
  { id: "1", year: 2020, month: "Jan", value: 549, type: "refurbishment", status: "complete", project: "Green Tower" },
  { id: "2", year: 2020, month: "Mar", value: 278, type: "new-build", status: "estimate", project: "Eco Plaza" },
  { id: "3", year: 2021, month: "Jun", value: 875, type: "new-build", status: "complete", project: "Solar Complex" },
  { id: "4", year: 2021, month: "Sep", value: 617, type: "refurbishment", status: "complete", project: "Wind Center" },
  { id: "5", year: 2022, month: "Feb", value: 506, type: "new-build", status: "estimate", project: "Hydro Hub" },
  { id: "6", year: 2022, month: "May", value: 336, type: "refurbishment", status: "complete", project: "Bio Building" },
  { id: "7", year: 2023, month: "Aug", value: 185, type: "new-build", status: "complete", project: "Smart Office" },
  { id: "8", year: 2023, month: "Nov", value: 191, type: "refurbishment", status: "estimate", project: "Green Mall" },
  { id: "9", year: 2024, month: "Jan", value: 122, type: "new-build", status: "complete", project: "Eco Residence" },
  {
    id: "10",
    year: 2024,
    month: "Apr",
    value: 550,
    type: "refurbishment",
    status: "complete",
    project: "Sustainable Tower",
  },
]

export function AdvancedGraphSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<"all" | "refurbishment" | "new-build">("all")
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)
  const [selectedBar, setSelectedBar] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedBars, setAnimatedBars] = useState<string[]>([])

  const filteredData = graphData.filter((d) => activeFilter === "all" || d.type === activeFilter)
  const maxValue = Math.max(...filteredData.map((d) => d.value))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate bars one by one
          filteredData.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedBars((prev) => [...prev, filteredData[index].id])
            }, index * 100)
          })
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [filteredData])

  const playSound = (type: "hover" | "click") => {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === "hover") {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    } else {
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    }

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--secondary)) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
            Interactive Carbon <span className="text-gradient-animated">Analytics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our comprehensive carbon emissions data with advanced filtering and real-time insights
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {(["all", "refurbishment", "new-build"] as const).map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => {
                  setActiveFilter(filter)
                  playSound("click")
                  setAnimatedBars([])
                  // Re-animate bars
                  setTimeout(() => {
                    const newFilteredData = graphData.filter((d) => filter === "all" || d.type === filter)
                    newFilteredData.forEach((_, index) => {
                      setTimeout(() => {
                        setAnimatedBars((prev) => [...prev, newFilteredData[index].id])
                      }, index * 100)
                    })
                  }, 100)
                }}
                className={`capitalize transition-all duration-300 card-3d ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-primary/10 hover:border-primary"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {filter.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div
          className={`bg-card/50 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-2xl card-3d transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground/90 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-primary" />
                Carbon Intensity (kgCO₂e/m²)
              </h3>
              <p className="text-muted-foreground">Click and hover for detailed insights</p>
            </div>
            <Button variant="outline" className="hover:bg-primary/10 card-3d">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          {/* Chart */}
          <div ref={chartRef} className="relative h-96 bg-muted/20 rounded-xl p-6 card-3d">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-4">
              {[1000, 800, 600, 400, 200, 0].map((val) => (
                <span key={val} className="font-mono">
                  {val}
                </span>
              ))}
            </div>

            {/* Target lines */}
            <div className="absolute left-12 right-4 top-1/5 border-t-2 border-dashed border-accent/70">
              <span className="absolute -top-6 right-0 text-xs text-accent font-semibold bg-background/80 px-2 py-1 rounded">
                Target 2030: 500 kgCO₂e/m²
              </span>
            </div>
            <div className="absolute left-12 right-4 top-1/3 border-t-2 border-dashed border-secondary/70">
              <span className="absolute -top-6 right-0 text-xs text-secondary font-semibold bg-background/80 px-2 py-1 rounded">
                Target 2025: 600 kgCO₂e/m²
              </span>
            </div>

            {/* Bars */}
            <div className="absolute left-12 right-4 bottom-12 top-8 flex items-end justify-between gap-2">
              {filteredData.map((data) => {
                const height = (data.value / maxValue) * 100
                const isHovered = hoveredBar === data.id
                const isSelected = selectedBar === data.id
                const isAnimated = animatedBars.includes(data.id)

                return (
                  <div
                    key={data.id}
                    className="relative flex-1 group cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredBar(data.id)
                      playSound("hover")
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => {
                      setSelectedBar(selectedBar === data.id ? null : data.id)
                      playSound("click")
                    }}
                  >
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ease-out card-3d ${
                        data.type === "refurbishment"
                          ? "bg-gradient-to-t from-secondary/70 to-secondary"
                          : "bg-gradient-to-t from-primary/70 to-primary"
                      } ${isHovered || isSelected ? "scale-105 shadow-lg brightness-110" : ""} ${
                        isSelected ? "ring-2 ring-accent" : ""
                      }`}
                      style={{
                        height: isAnimated ? `${height}%` : "0%",
                        transitionDelay: isAnimated ? "0ms" : "0ms",
                      }}
                    />

                    {/* Enhanced Tooltip */}
                    {(isHovered || isSelected) && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-2xl z-20 whitespace-nowrap card-3d">
                        <div className="text-lg font-bold text-primary">{data.value} kgCO₂e/m²</div>
                        <div className="text-sm text-muted-foreground capitalize">{data.type.replace("-", " ")}</div>
                        <div className="text-sm font-medium">{data.project}</div>
                        <div className="text-xs text-muted-foreground">
                          {data.month} {data.year} • {data.status}
                        </div>
                        <div className="mt-2 flex items-center text-xs">
                          {data.value < 500 ? (
                            <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
                          ) : (
                            <TrendingUp className="w-3 h-3 text-red-500 mr-1" />
                          )}
                          {data.value < 500 ? "Below 2030 target" : "Above 2030 target"}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* X-axis labels */}
            <div className="absolute left-12 right-4 bottom-0 flex justify-between text-xs text-muted-foreground">
              {filteredData.map((data) => (
                <span key={data.id} className="font-mono">
                  {data.month}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center p-6 bg-muted/30 rounded-xl card-3d">
              <div className="flex items-center justify-center mb-3">
                <TrendingDown className="w-6 h-6 text-green-500 mr-2" />
                <span className="text-3xl font-bold text-green-500">-23%</span>
              </div>
              <p className="text-sm text-muted-foreground">Average reduction</p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-xl card-3d">
              <div className="flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-primary mr-2" />
                <span className="text-3xl font-bold text-primary">{filteredData.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Projects analyzed</p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-xl card-3d">
              <div className="flex items-center justify-center mb-3">
                <span className="text-3xl font-bold text-accent">78%</span>
              </div>
              <p className="text-sm text-muted-foreground">On track for targets</p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-xl card-3d">
              <div className="flex items-center justify-center mb-3">
                <span className="text-3xl font-bold text-secondary">
                  {Math.round(filteredData.reduce((acc, d) => acc + d.value, 0) / filteredData.length)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Average intensity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
