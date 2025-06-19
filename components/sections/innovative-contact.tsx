"use client"
import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Zap, MessageCircle, ArrowRight, CheckCircle } from "lucide-react"

export function InnovativeContact() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const steps = [
    { id: "intro", title: "Let's Connect", icon: MessageCircle },
    { id: "project", title: "Your Vision", icon: Sparkles },
    { id: "details", title: "The Details", icon: Zap },
    { id: "launch", title: "Launch", icon: ArrowRight },
  ]

  const projectTypes = [
    { id: "web", label: "Web Experience", emoji: "🌐", color: "from-blue-500 to-cyan-500" },
    { id: "brand", label: "Brand Identity", emoji: "🎨", color: "from-purple-500 to-pink-500" },
    { id: "mobile", label: "Mobile App", emoji: "📱", color: "from-green-500 to-emerald-500" },
    { id: "ecommerce", label: "E-commerce", emoji: "🛒", color: "from-orange-500 to-red-500" },
  ]

  const budgetRanges = [
    { id: "startup", label: "$5K - $15K", desc: "Perfect for startups", color: "from-green-400 to-blue-500" },
    { id: "growth", label: "$15K - $50K", desc: "Growing businesses", color: "from-purple-400 to-pink-500" },
    { id: "enterprise", label: "$50K+", desc: "Enterprise solutions", color: "from-yellow-400 to-red-500" },
  ]

  // Animated background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: ["#60A5FA", "#A78BFA", "#F472B6", "#34D399"][Math.floor(Math.random() * 4)],
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  if (isComplete) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
        <div className="text-center space-y-8 z-10">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold">Mission Received! 🚀</h2>
          <p className="text-xl text-gray-300 max-w-md">
            Your message has been transmitted to our digital realm. We'll respond within 24 hours!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-1 mx-4 transition-all duration-500 ${
                      index < currentStep ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-gray-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 0 && (
            <div className="text-center space-y-8">
              <h1 className="text-6xl font-bold">
                <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
                  Ready to Create
                </span>
                <br />
                Something Amazing?
              </h1>
              <p className="text-xl text-gray-300">
                Let's embark on a digital journey together. Tell us about your vision.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">What's Your Vision?</h2>
                <p className="text-gray-300">Choose the type of project you have in mind</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, projectType: type.id })}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      formData.projectType === type.id
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <div className="text-4xl mb-2">{type.emoji}</div>
                    <div className="font-semibold">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Investment Range</h2>
                <p className="text-gray-300">What's your budget for this project?</p>
              </div>
              <div className="space-y-4">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setFormData({ ...formData, budget: budget.id })}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.budget === budget.id
                        ? "border-purple-400 bg-purple-400/10"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-xl">{budget.label}</div>
                        <div className="text-gray-400">{budget.desc}</div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full ${formData.budget === budget.id ? "bg-purple-400" : "bg-gray-600"}`}
                      />
                    </div>
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Tell us more about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300 resize-none"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-bold">Ready for Liftoff? 🚀</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="space-y-4 text-left">
                  <div>
                    <strong>Name:</strong> {formData.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {formData.email}
                  </div>
                  <div>
                    <strong>Project:</strong> {projectTypes.find((p) => p.id === formData.projectType)?.label}
                  </div>
                  <div>
                    <strong>Budget:</strong> {budgetRanges.find((b) => b.id === formData.budget)?.label}
                  </div>
                  {formData.message && (
                    <div>
                      <strong>Message:</strong> {formData.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-300"
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={
                (currentStep === 0 && (!formData.name || !formData.email)) ||
                (currentStep === 1 && !formData.projectType) ||
                (currentStep === 2 && !formData.budget) ||
                isSubmitting
              }
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  <Send className="w-5 h-5" />
                  <span>Launch Project</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
