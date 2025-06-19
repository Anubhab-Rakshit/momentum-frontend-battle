"use client"
import { useEffect, useRef, useState } from "react"
import { TrendingUp, BarChart3, Download } from "lucide-react"

interface ChartData {
  month: string
  revenue: number
  projects: number
  clients: number
  growth: number
}

const chartData: ChartData[] = [
  { month: "Jan", revenue: 45000, projects: 8, clients: 12, growth: 15 },
  { month: "Feb", revenue: 52000, projects: 10, clients: 15, growth: 18 },
  { month: "Mar", revenue: 48000, projects: 9, clients: 14, growth: 12 },
  { month: "Apr", revenue: 61000, projects: 12, clients: 18, growth: 25 },
  { month: "May", revenue: 55000, projects: 11, clients: 16, growth: 20 },
  { month: "Jun", revenue: 67000, projects: 14, clients: 21, growth: 28 },
  { month: "Jul", revenue: 72000, projects: 15, clients: 23, growth: 32 },
  { month: "Aug", revenue: 69000, projects: 13, clients: 20, growth: 30 },
  { month: "Sep", revenue: 78000, projects: 16, clients: 25, growth: 35 },
  { month: "Oct", revenue: 82000, projects: 17, clients: 27, growth: 38 },
  { month: "Nov", revenue: 89000, projects: 19, clients: 30, growth: 42 },
  { month: "Dec", revenue: 95000, projects: 21, clients: 32, growth: 45 },
]

export function ModernChartSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const [activeMetric, setActiveMetric] = useState<keyof ChartData>("revenue")
  const [isVisible, setIsVisible] = useState(false)
  const [animatedBars, setAnimatedBars] = useState<boolean[]>(new Array(chartData.length).fill(false))

  const metrics = [
    {
      key: "revenue" as keyof ChartData,
      label: "Revenue",
      color: "bg-gradient-to-t from-blue-500 to-cyan-400",
      icon: TrendingUp,
    },
    {
      key: "projects" as keyof ChartData,
      label: "Projects",
      color: "bg-gradient-to-t from-purple-500 to-pink-400",
      icon: BarChart3,
    },
    {
      key: "clients" as keyof ChartData,
      label: "Clients",
      color: "bg-gradient-to-t from-green-500 to-emerald-400",
      icon: TrendingUp,
    },
    {
      key: "growth" as keyof ChartData,
      label: "Growth %",
      color: "bg-gradient-to-t from-orange-500 to-yellow-400",
      icon: TrendingUp,
    },
  ]

  const maxValue = Math.max(...chartData.map((d) => Number(d[activeMetric])))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate bars with stagger
          chartData.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedBars((prev) => {
                const newBars = [...prev]
                newBars[index] = true
                return newBars
              })
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
  }, [])

  // Reset animation when metric changes
  useEffect(() => {
    setAnimatedBars(new Array(chartData.length).fill(false))
    setTimeout(() => {
      chartData.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedBars((prev) => {
            const newBars = [...prev]
            newBars[index] = true
            return newBars
          })
        }, index * 50)
      })
    }, 100)
  }, [activeMetric])

  const formatValue = (value: number, metric: keyof ChartData) => {
    if (metric === "revenue") return `$${(value / 1000).toFixed(0)}K`
    if (metric === "growth") return `${value}%`
    return value.toString()
  }

  const currentMetric = metrics.find((m) => m.key === activeMetric)!

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Growth{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
              Analytics
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time insights into our digital transformation journey
          </p>
        </div>

        {/* Metric Selector */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeMetric === metric.key
                  ? "bg-white/20 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-400/25"
                  : "bg-white/10 text-gray-300 border-2 border-transparent hover:bg-white/20 hover:text-white"
              }`}
            >
              <metric.icon className="w-5 h-5" />
              <span>{metric.label}</span>
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div
          className={`bg-black/20 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center">
                <currentMetric.icon className="w-6 h-6 mr-2 text-cyan-400" />
                {currentMetric.label} Trends
              </h3>
              <p className="text-gray-400">Interactive data visualization</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          {/* Chart */}
          <div ref={chartRef} className="relative h-80 bg-white/5 rounded-xl p-6">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 py-4">
              {[maxValue, Math.floor(maxValue * 0.75), Math.floor(maxValue * 0.5), Math.floor(maxValue * 0.25), 0].map(
                (val) => (
                  <span key={val} className="font-mono">
                    {formatValue(val, activeMetric)}
                  </span>
                ),
              )}
            </div>

            {/* Chart Bars */}
            <div className="absolute left-12 right-4 bottom-12 top-8 flex items-end justify-between gap-2">
              {chartData.map((data, index) => {
                const height = (Number(data[activeMetric]) / maxValue) * 100
                const isAnimated = animatedBars[index]

                return (
                  <div key={index} className="relative flex-1 group cursor-pointer">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ease-out ${currentMetric.color} hover:scale-105 hover:shadow-lg relative overflow-hidden`}
                      style={{
                        height: isAnimated ? `${height}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                      <div className="text-white font-semibold">
                        {formatValue(Number(data[activeMetric]), activeMetric)}
                      </div>
                      <div className="text-gray-300 text-xs">{data.month} 2024</div>
                    </div>

                    {/* Value label on hover */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {formatValue(Number(data[activeMetric]), activeMetric)}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* X-axis labels */}
            <div className="absolute left-12 right-4 bottom-0 flex justify-between text-xs text-gray-400">
              {chartData.map((data) => (
                <span key={data.month} className="font-mono">
                  {data.month}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-2xl font-bold text-green-400">+127%</span>
              </div>
              <p className="text-sm text-gray-400">Year over year growth</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-blue-400">{chartData.length}</span>
              </div>
              <p className="text-sm text-gray-400">Months tracked</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-purple-400">
                  {formatValue(Math.max(...chartData.map((d) => Number(d[activeMetric]))), activeMetric)}
                </span>
              </div>
              <p className="text-sm text-gray-400">Peak {currentMetric.label.toLowerCase()}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-cyan-400">
                  {formatValue(
                    chartData.reduce((acc, d) => acc + Number(d[activeMetric]), 0) / chartData.length,
                    activeMetric,
                  )}
                </span>
              </div>
              <p className="text-sm text-gray-400">Average {currentMetric.label.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
