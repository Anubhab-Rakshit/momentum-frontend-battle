"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown } from "lucide-react"

interface DataPoint {
  year: number
  value: number
  type: "refurbishment" | "new-build"
  status: "complete" | "estimate"
}

const graphData: DataPoint[] = [
  { year: 2020, value: 549, type: "refurbishment", status: "complete" },
  { year: 2020, value: 278, type: "new-build", status: "estimate" },
  { year: 2021, value: 875, type: "new-build", status: "complete" },
  { year: 2021, value: 617, type: "refurbishment", status: "complete" },
  { year: 2022, value: 506, type: "new-build", status: "estimate" },
  { year: 2022, value: 336, type: "refurbishment", status: "complete" },
  { year: 2023, value: 185, type: "new-build", status: "complete" },
  { year: 2023, value: 191, type: "refurbishment", status: "estimate" },
  { year: 2024, value: 122, type: "new-build", status: "complete" },
  { year: 2024, value: 550, type: "refurbishment", status: "complete" },
]

export function InteractiveGraphSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<"all" | "refurbishment" | "new-build">("all")
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const filteredData = graphData.filter((d) => activeFilter === "all" || d.type === activeFilter)
  const maxValue = Math.max(...filteredData.map((d) => d.value))

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
            Embodied Carbon <span className="text-gradient-animated">Analytics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Interactive visualization of carbon emissions intensity across project types
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {(["all", "refurbishment", "new-build"] as const).map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`capitalize transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-primary/10 hover:border-primary"
                }`}
              >
                {filter.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div
          className={`bg-card/50 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-2xl transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground/90">Carbon Intensity (kgCO₂e/m²)</h3>
              <p className="text-muted-foreground">Hover over bars for detailed information</p>
            </div>
            <Button variant="outline" className="hover:bg-primary/10">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          {/* Chart */}
          <div ref={chartRef} className="relative h-80 bg-muted/20 rounded-xl p-6">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
              {[1000, 800, 600, 400, 200, 0].map((val) => (
                <span key={val}>{val}</span>
              ))}
            </div>

            {/* Target lines */}
            <div className="absolute left-8 right-4 top-1/5 border-t-2 border-dashed border-accent/70">
              <span className="absolute -top-6 right-0 text-xs text-accent">Target 2030: 500 kgCO₂e/m²</span>
            </div>
            <div className="absolute left-8 right-4 top-1/3 border-t-2 border-dashed border-secondary/70">
              <span className="absolute -top-6 right-0 text-xs text-secondary">Target 2025: 600 kgCO₂e/m²</span>
            </div>

            {/* Bars */}
            <div className="absolute left-8 right-4 bottom-8 top-8 flex items-end justify-between gap-1">
              {filteredData.map((data, index) => {
                const height = (data.value / maxValue) * 100
                const isHovered = hoveredBar === index

                return (
                  <div
                    key={index}
                    className="relative flex-1 group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        data.type === "refurbishment"
                          ? "bg-gradient-to-t from-secondary/70 to-secondary"
                          : "bg-gradient-to-t from-primary/70 to-primary"
                      } ${isHovered ? "scale-105 shadow-lg" : ""}`}
                      style={{
                        height: `${height}%`,
                        animationDelay: `${index * 100}ms`,
                      }}
                    />

                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl z-10 whitespace-nowrap">
                        <div className="text-sm font-semibold">{data.value} kgCO₂e/m²</div>
                        <div className="text-xs text-muted-foreground capitalize">{data.type.replace("-", " ")}</div>
                        <div className="text-xs text-muted-foreground">
                          {data.year} • {data.status}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* X-axis labels */}
            <div className="absolute left-8 right-4 bottom-0 flex justify-between text-xs text-muted-foreground">
              {Array.from(new Set(filteredData.map((d) => d.year))).map((year) => (
                <span key={year}>{year}</span>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center justify-center mb-2">
                <TrendingDown className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-green-500">-23%</span>
              </div>
              <p className="text-sm text-muted-foreground">Average reduction since 2020</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">{filteredData.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Projects analyzed</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-accent">78%</span>
              </div>
              <p className="text-sm text-muted-foreground">On track for 2030 targets</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
