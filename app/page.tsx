"use client"
import { HeroSection } from "@/components/sections/hero-section"
import { ScrollTestimonials } from "@/components/sections/scroll-testimonials"
import { WorkShowcaseSection } from "@/components/sections/work-showcase-section"
import { EnhancedStatsSection } from "@/components/sections/enhanced-stats-section"
import { ModernChartSection } from "@/components/sections/modern-chart-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { InnovativeContact } from "@/components/sections/innovative-contact"

export default function HomePage() {
  return (
    <div className="relative" id="main-content">
      <HeroSection />
      <WorkShowcaseSection />
      <ServicesSection />
      <EnhancedStatsSection />
      <ModernChartSection />
      <AboutSection />
      <ScrollTestimonials />
      <InnovativeContact />
    </div>
  )
}
