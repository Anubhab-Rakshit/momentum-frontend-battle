"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingDown } from "lucide-react"

export function Analytics() {
  const analyticsRef = useRef<HTMLElement>(null)

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

    if (analyticsRef.current) {
      observer.observe(analyticsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="analytics" ref={analyticsRef} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Real-time
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Analytics
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive dashboards and insights to track your sustainability progress
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Portfolio Performance Dashboard</h3>
              <p className="text-muted-foreground">
                Monitor your managed portfolio's environmental impact with detailed metrics on carbon footprint, energy
                intensity, and consumption patterns. Track progress against sustainability targets with year-over-year
                comparisons.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">Carbon Footprint</CardDescription>
                  <CardTitle className="text-2xl">45,048</CardTitle>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    16% from 2019
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">Energy Intensity</CardDescription>
                  <CardTitle className="text-2xl">123</CardTitle>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    22% from 2019
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">Energy Consumption</CardDescription>
                  <CardTitle className="text-lg">47.8M</CardTitle>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    27% from 2019
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stats-4Ufv7026KqbhZyVAfQdaj3C5FzxNlU.png"
              alt="Sustainability Analytics Dashboard"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/graph-Xaz5qZUrnze5fOEeHDsypF3uuT9DPu.png"
              alt="Embodied Carbon Emissions Chart"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Embodied Carbon Analysis</h3>
              <p className="text-muted-foreground">
                Deep dive into embodied carbon emissions with advanced filtering and visualization. Compare
                refurbishment vs new build projects and track progress against 2025 and 2030 targets.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div>
                  <div className="font-medium">2030 Target</div>
                  <div className="text-sm text-muted-foreground">500 kgCO₂e/m²</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600">On Track</div>
                  <div className="text-xs text-muted-foreground">-15% vs baseline</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div>
                  <div className="font-medium">2025 Target</div>
                  <div className="text-sm text-muted-foreground">600 kgCO₂e/m²</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600">Achieved</div>
                  <div className="text-xs text-muted-foreground">-8% vs target</div>
                </div>
              </div>
            </div>

            <Button className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to see your impact?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get started with our comprehensive analytics platform and begin tracking your sustainability journey
                today.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
