"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { motion, useInView } from "framer-motion"

interface MetricData {
  id: string
  label: string
  value: number
  unit: string
  description: string
  color: string
  pattern: React.ReactNode
}

const metricsData: MetricData[] = [
  {
    id: "velocity",
    label: "Development Velocity",
    value: 340,
    unit: "%",
    description: "Faster project delivery through optimized workflows",
    color: "from-cyan-400 via-blue-500 to-indigo-600",
    pattern: (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-2 w-3 h-3 border border-white rounded-full animate-ping"></div>
        <div className="absolute top-6 right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-6 w-1 h-8 bg-white/50 rounded-full"></div>
        <div className="absolute bottom-2 right-2 w-4 h-1 bg-white/30 rounded-full"></div>
      </div>
    ),
  },
  {
    id: "satisfaction",
    label: "Client Satisfaction",
    value: 98.7,
    unit: "%",
    description: "Exceptional results that exceed expectations",
    color: "from-emerald-400 via-green-500 to-teal-600",
    pattern: (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-3 left-3 w-6 h-6 border-2 border-white rounded-full">
          <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-3 right-3 w-4 h-4 bg-white/60 rounded-full"></div>
        <div className="absolute top-1/2 right-2 w-1 h-6 bg-white/40 rounded-full transform rotate-12"></div>
      </div>
    ),
  },
  {
    id: "innovation",
    label: "Innovation Index",
    value: 847,
    unit: "pts",
    description: "Cutting-edge solutions that push boundaries",
    color: "from-purple-400 via-pink-500 to-rose-600",
    pattern: (
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-1/2 w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-2 w-3 h-3 border border-white rounded-sm transform rotate-45"></div>
        <div className="absolute bottom-2 right-3 w-5 h-1 bg-white/50 rounded-full"></div>
        <div className="absolute top-4 right-1 w-1 h-4 bg-white/30 rounded-full transform -rotate-12"></div>
      </div>
    ),
  },
]

function CountUp({
  end,
  duration = 2000,
  isVisible,
  decimals = 0,
}: {
  end: number
  duration?: number
  isVisible: boolean
  decimals?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(progress * end)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <span>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}</span>
}

export function RevolutionaryMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            Performance Metrics
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-white">
            Measurable{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Data-driven results that speak louder than words. Our commitment to excellence is reflected in every metric.
          </p>
        </motion.div>

        {/* Metrics Display */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.id}
              className={`group relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl transition-all duration-700 cursor-pointer ${
                hoveredMetric === metric.id ? "scale-105 shadow-3xl" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredMetric(metric.id)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              {/* Background Pattern */}
              {metric.pattern}

              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              {/* Content */}
              <div className="relative">
                {/* Value */}
                <div className="mb-4">
                  <div
                    className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}
                  >
                    <CountUp
                      end={metric.value}
                      isVisible={isInView}
                      decimals={metric.unit === "%" && metric.value % 1 !== 0 ? 1 : 0}
                    />
                    <span className="text-2xl ml-1">{metric.unit}</span>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {metric.description}
                </p>

                {/* Animated Progress Bar */}
                <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 1.5, delay: index * 0.3 + 0.5 }}
                  />
                </div>
              </div>

              {/* Hover Glow Effect */}
              {hoveredMetric === metric.id && (
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${metric.color} opacity-20 blur-xl -z-10 scale-110`}
                ></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-block bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Experience the Difference</h3>
            <p className="text-gray-300 mb-6">
              Join the ranks of satisfied clients who've experienced our commitment to excellence firsthand.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Start Your Project
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
