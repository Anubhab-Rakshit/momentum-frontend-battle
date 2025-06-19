"use client"
 
import { Suspense } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { WorkShowcaseSection } from "@/components/sections/work-showcase-section"
import { ServicesSection } from "@/components/sections/services-section"
import { RevolutionaryMetrics } from "@/components/sections/revolutionary-metrics"
import { PremiumAnalyticsSection } from "@/components/sections/premium-analytics-section"
import { AboutSection } from "@/components/sections/about-section"
import { ScrollTestimonials } from "@/components/sections/scroll-testimonials"
import { ContactSection } from "@/components/sections/contact-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

     
      <div className="h-20"></div>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <HeroSection />
        <WorkShowcaseSection />
        <ServicesSection />
        <PremiumAnalyticsSection />
        <RevolutionaryMetrics />
        <AboutSection />
        <ScrollTestimonials />
        <ContactSection />
      </Suspense>
    </div>
  )
}
