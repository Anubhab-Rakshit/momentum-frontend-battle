"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { MicroCard, MicroButton, MicroInput } from "@/components/ui/micro-interactions"
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, ArrowRight } from "lucide-react"
import { playInteractionSound } from "@/components/effects/sound-manager"

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    playInteractionSound("click")

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitStatus("success")
    playInteractionSound("success")

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "",
        timeline: "",
      })
      setSubmitStatus("idle")
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Drop us a line anytime",
      value: "hello@momentumlabs.com",
      action: "Send Email",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm",
      value: "+1 (555) 123-4567",
      action: "Call Now",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Book a free consultation",
      value: "30-minute discovery call",
      action: "Book Now",
      color: "from-purple-500 to-violet-500",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
            Let's Create Something <span className="text-gradient-animated">Amazing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform your digital presence? We'd love to hear about your project and explore how we can bring
            your vision to life.
          </p>
        </div>

        {/* Contact Methods */}
        <div
          className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {contactMethods.map((method, index) => (
            <MicroCard
              key={index}
              className="text-center p-8 bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 group"
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${method.color} p-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <method.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{method.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
              <p className="font-semibold mb-4">{method.value}</p>
              <MicroButton className="text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-xl transition-all duration-300 group/btn">
                {method.action}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </MicroButton>
            </MicroCard>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <MicroCard
            className={`bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-border/50 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <MicroInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <MicroInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <MicroInput
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  >
                    <option value="">Select budget</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k-25k">$10k - $25k</option>
                    <option value="25k-50k">$25k - $50k</option>
                    <option value="50k+">$50k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-2months">1-2 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6months+">6+ months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <MicroButton
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  submitStatus === "success"
                    ? "bg-green-500 text-white"
                    : submitStatus === "error"
                      ? "bg-red-500 text-white"
                      : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : submitStatus === "success" ? (
                  "Message Sent Successfully!"
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </div>
                )}
              </MicroButton>
            </form>
          </MicroCard>

          {/* Info */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's discuss your project</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe every great project starts with a conversation. Whether you have a detailed brief or just an
                idea, we'd love to explore how we can help bring your vision to life.
              </p>
            </div>

            <MicroCard className="p-6 bg-card/30 backdrop-blur-xl rounded-2xl border border-border/30">
              <h4 className="font-semibold mb-3">What happens next?</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <p>We'll review your message and get back to you within 24 hours</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <p>Schedule a discovery call to discuss your project in detail</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <p>Receive a detailed proposal with timeline and investment</p>
                </div>
              </div>
            </MicroCard>

            <MicroCard className="p-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl border border-border/30">
              <div className="flex items-center space-x-3 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Visit our studio</h4>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                123 Innovation Street
                <br />
                San Francisco, CA 94105
              </p>
              <p className="text-xs text-muted-foreground">Open Monday to Friday, 9am - 6pm PST</p>
            </MicroCard>
          </div>
        </div>
      </div>
    </section>
  )
}
