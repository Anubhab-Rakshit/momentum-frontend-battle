"use client"
import { useState, useRef, useEffect } from "react"

const chartData = [
  { month: "Jan", revenue: 45, projects: 8, clients: 12, growth: 15 },
  { month: "Feb", revenue: 52, projects: 10, clients: 15, growth: 18 },
  { month: "Mar", revenue: 48, projects: 9, clients: 14, growth: 12 },
  { month: "Apr", revenue: 61, projects: 12, clients: 18, growth: 25 },
  { month: "May", revenue: 55, projects: 11, clients: 16, growth: 20 },
  { month: "Jun", revenue: 67, projects: 14, clients: 21, growth: 28 },
  { month: "Jul", revenue: 72, projects: 15, clients: 23, growth: 32 },
  { month: "Aug", revenue: 69, projects: 13, clients: 20, growth: 30 },
  { month: "Sep", revenue: 78, projects: 16, clients: 25, growth: 35 },
  { month: "Oct", revenue: 82, projects: 17, clients: 27, growth: 38 },
  { month: "Nov", revenue: 89, projects: 19, clients: 30, growth: 42 },
  { month: "Dec", revenue: 95, projects: 21, clients: 32, growth: 45 },
]

const metrics = [
  { key: "revenue", label: "Revenue", color: "from-blue-500 to-cyan-500", unit: "K" },
  { key: "projects", label: "Projects", color: "from-purple-500 to-pink-500", unit: "" },
  { key: "clients", label: "Clients", color: "from-green-500 to-emerald-500", unit: "" },
  { key: "growth", label: "Growth", color: "from-orange-500 to-yellow-500", unit: "%" },
]

export function PremiumAnalyticsSection() {
  const [activeMetric, setActiveMetric] = useState("revenue")
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const currentMetric = metrics.find((m) => m.key === activeMetric)!
  const maxValue = Math.max(...chartData.map((d) => d[activeMetric as keyof typeof d] as number))

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <div className="w-8 h-8 flex flex-col justify-center space-y-1">
                <div className="h-1 bg-white rounded-full w-6"></div>
                <div className="h-1 bg-white rounded-full w-4"></div>
                <div className="h-1 bg-white rounded-full w-8"></div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Revenue Analytics</h2>
              <p className="text-slate-300 text-lg">Hover over bars for detailed insights</p>
            </div>
          </div>
          <button className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl text-white font-semibold transition-all duration-300 transform hover:scale-105">
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="h-0.5 bg-white rounded-full w-3"></div>
              <div className="h-0.5 bg-white rounded-full w-5"></div>
              <div className="h-0.5 bg-white rounded-full w-4"></div>
            </div>
            <span>Export Data</span>
          </button>
        </div>

        {/* Metric Selector */}
        <div
          className={`flex flex-wrap gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeMetric === metric.key
                  ? `bg-gradient-to-r ${metric.color} text-white shadow-lg`
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
              }`}
            >
              <div className="w-4 h-4 inline mr-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-current rounded-full"></div>
              </div>
              {metric.label}
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div
          className={`bg-slate-800/30 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Chart */}
          <div className="relative h-96 mb-8">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-slate-400 text-sm">
              {[100, 75, 50, 25, 0].map((value) => (
                <div key={value} className="flex items-center">
                  <span className="w-12 text-right">
                    {activeMetric === "revenue" ? `$${value}K` : `${value}${currentMetric.unit}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Grid lines */}
            <div className="absolute left-16 top-0 right-0 h-full">
              {[0, 25, 50, 75, 100].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full border-t border-slate-700/30"
                  style={{ top: `${index * 25}%` }}
                />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute left-16 bottom-0 right-0 h-full flex items-end justify-between px-4">
              {chartData.map((data, index) => {
                const value = data[activeMetric as keyof typeof data] as number
                const height = (value / maxValue) * 100
                const isHovered = hoveredBar === index

                return (
                  <div
                    key={data.month}
                    className="relative flex flex-col items-center group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full mb-4 bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-700 min-w-48 z-10 animate-in fade-in-0 zoom-in-95">
                        <h4 className="font-semibold text-white mb-2">{data.month} 2024</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-300">Revenue:</span>
                            <span className="font-semibold text-blue-400">${data.revenue}K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Projects:</span>
                            <span className="font-semibold text-purple-400">{data.projects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Clients:</span>
                            <span className="font-semibold text-green-400">{data.clients}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Growth:</span>
                            <span className="font-semibold text-orange-400">{data.growth}%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      className={`w-8 bg-gradient-to-t ${currentMetric.color} rounded-t-lg transition-all duration-300 transform ${
                        isHovered ? "scale-110 shadow-lg" : "hover:scale-105"
                      }`}
                      style={{
                        height: `${height}%`,
                        minHeight: "4px",
                        animationDelay: `${index * 100}ms`,
                      }}
                    />

                    {/* Month label */}
                    <span className="text-slate-400 text-sm mt-2 font-medium">{data.month}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
              <div className="text-2xl font-bold text-green-400 mb-1">+127%</div>
              <p className="text-slate-300 text-sm">Year over year growth</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
              <div className="text-2xl font-bold text-blue-400 mb-1">12</div>
              <p className="text-slate-300 text-sm">Months tracked</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                ${Math.max(...chartData.map((d) => d.revenue))}K
              </div>
              <p className="text-slate-300 text-sm">Peak revenue</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/30">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                ${Math.round(chartData.reduce((acc, d) => acc + d.revenue, 0) / chartData.length)}K
              </div>
              <p className="text-slate-300 text-sm">Average revenue</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
