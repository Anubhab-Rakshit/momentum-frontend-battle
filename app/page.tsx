"use client"
 
import { Suspense } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { WorkShowcaseSection } from "@/components/sections/work-showcase-section"
import { ServicesSection } from "@/components/sections/services-section"
import { RevolutionaryMetrics } from "@/components/sections/revolutionary-metrics"
import { PremiumAnalyticsSection } from "@/components/sections/premium-analytics-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ScrollTestimonials } from "@/components/sections/scroll-testimonials"
import { ContactSection } from "@/components/sections/contact-section"
import { SmoothScroll } from "@/components/effects/smooth-scroll"
import { AdvancedPageTransitions } from "@/components/effects/advanced-page-transitions"

export default function HomePage() {
  return (
    <div className="relative" id="main-content">
      <HeroSection />
      <WorkShowcaseSection />
      <ServicesSection />
      <RevolutionaryMetrics />
      <ModernChartSection />
      <AboutSection />
      <ScrollTestimonials />
      <InnovativeContact />
    </div>
  )
}
