"use client"
// Replicating UI from 'graph.png'
// For a true interactive chart, a library like Recharts or Chart.js would be used.
// This is a simplified visual representation.
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmissionDataPoint {
  value: number
  label?: string // e.g., project name or year
  type: "refurbishment" | "new-build"
  status: "complete" | "estimate"
}

const allEmissionData: EmissionDataPoint[] = [
  { value: 549, type: "refurbishment", status: "complete" },
  { value: 278, type: "new-build", status: "estimate" },
  { value: 875, type: "new-build", status: "complete" },
  { value: 617, type: "refurbishment", status: "complete" },
  { value: 506, type: "new-build", status: "estimate" },
  { value: 36, type: "refurbishment", status: "complete" },
  { value: 185, type: "new-build", status: "complete" },
  { value: 191, type: "refurbishment", status: "estimate" },
  { value: 122, type: "new-build", status: "complete" },
  { value: 550, type: "refurbishment", status: "complete" },
  { value: 881, type: "new-build", status: "complete" },
  { value: 539, type: "refurbishment", status: "estimate" },
  { value: 289, type: "new-build", status: "complete" },
  { value: 29, type: "refurbishment", status: "complete" },
  { value: 82, type: "new-build", status: "estimate" },
  { value: 44, type: "refurbishment", status: "complete" },
  { value: 109, type: "new-build", status: "complete" },
  { value: 106, type: "refurbishment", status: "estimate" },
  { value: 607, type: "new-build", status: "complete" },
  { value: 528, type: "refurbishment", status: "complete" },
]

const TARGET_2030 = 500
const TARGET_2025 = 600
const MAX_CHART_VALUE = 1200

export function EmissionsGraphSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeType, setActiveType] = useState<"all" | "refurbishment" | "new-build">("all")
  const [activeStatus, setActiveStatus] = useState<"all" | "complete" | "estimate">("all")

  const chartBarsRef = useRef<(HTMLDivElement | null)[]>([])

  const filteredData = allEmissionData.filter(
    (d) => (activeType === "all" || d.type === activeType) && (activeStatus === "all" || d.status === activeStatus),
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelector(".section-title-group") as Element,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } },
      )

      chartBarsRef.current.forEach((bar, i) => {
        if (bar) {
          gsap.fromTo(
            bar,
            { height: "0%" },
            {
              height: bar.dataset.height,
              duration: 0.8,
              ease: "power2.out",
              delay: i * 0.05,
              scrollTrigger: { trigger: bar, start: "bottom bottom-=50px" },
            },
          )
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [filteredData]) // Re-run animations when data filters change

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/30 gsap-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 section-title-group">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground/90">
              Embodied Carbon <span className="text-accent">Emissions</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">Intensity measured by kgCO₂e/m²</p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="border-foreground/30 hover:border-foreground/70 hover:bg-foreground/5 self-start lg:self-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download the data
          </Button>
        </div>

        <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-xl border border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 gap-4">
            <div>
              <span className="text-sm font-medium mr-3 text-muted-foreground">Filter by Type:</span>
              {(["all", "refurbishment", "new-build"] as const).map((type) => (
                <Button
                  key={type}
                  variant={activeType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveType(type)}
                  className={cn(
                    "mr-2 capitalize",
                    activeType === type ? "bg-primary text-primary-foreground" : "border-foreground/20",
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div>
              <span className="text-sm font-medium mr-3 text-muted-foreground">Status:</span>
              {(["all", "complete", "estimate"] as const).map((status) => (
                <Button
                  key={status}
                  variant={activeStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveStatus(status)}
                  className={cn(
                    "mr-2 capitalize",
                    activeStatus === status ? "bg-secondary text-secondary-foreground" : "border-foreground/20",
                  )}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] w-full">
            {/* Y-axis labels */}
            {[0, 200, 400, 600, 800, 1000, 1200].map((val) => (
              <div
                key={val}
                className="absolute text-xs text-muted-foreground right-full pr-2"
                style={{ bottom: `${(val / MAX_CHART_VALUE) * 100}%`, transform: "translateY(50%)" }}
              >
                {val}
              </div>
            ))}
            {/* Target Lines */}
            <div
              className="absolute w-full border-t border-dashed border-accent/70"
              style={{ bottom: `${(TARGET_2030 / MAX_CHART_VALUE) * 100}%` }}
            >
              <span className="absolute -top-5 right-0 text-xs text-accent/90">
                {TARGET_2030} kgCO₂e/m² - Target 2030
              </span>
            </div>
            <div
              className="absolute w-full border-t border-dashed border-secondary/70"
              style={{ bottom: `${(TARGET_2025 / MAX_CHART_VALUE) * 100}%` }}
            >
              <span className="absolute -top-5 right-0 text-xs text-secondary/90">
                {TARGET_2025} kgCO₂e/m² - Target 2025
              </span>
            </div>

            {/* Chart Bars */}
            <div className="flex h-full items-end gap-1 sm:gap-2 px-1 border-l border-b border-border/30">
              {filteredData.map((data, i) => (
                <div
                  key={i}
                  ref={(el) => (chartBarsRef.current[i] = el)}
                  className={cn(
                    "relative flex-1 group rounded-t-sm",
                    data.type === "refurbishment"
                      ? "bg-secondary/70 hover:bg-secondary"
                      : "bg-primary/70 hover:bg-primary",
                  )}
                  data-height={`${(data.value / MAX_CHART_VALUE) * 100}%`}
                  style={{ height: "0%" }} // Initial height for animation
                >
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded shadow-lg">
                    {data.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">Embodied carbon intensity (kgCO₂e/m²)</p>
        </div>
      </div>
    </section>
  )
}
