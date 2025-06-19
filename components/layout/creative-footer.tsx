"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Zap, Heart, Code, Palette } from "lucide-react"

export function CreativeFooter() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const services = [
    { icon: Code, name: "Web Sorcery", color: "text-cyan-400" },
    { icon: Palette, name: "Brand Alchemy", color: "text-purple-400" },
    { icon: Zap, name: "Digital Magic", color: "text-yellow-400" },
    { icon: Heart, name: "UX Wizardry", color: "text-pink-400" },
  ]

  return (
    <footer className="relative bg-black text-white overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full animate-ping opacity-20"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-wider">MOMENTUM</h3>
                  <p className="text-cyan-400 text-sm">Digital Architects</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                We don't just build websites. We craft digital universes where brands come alive and users fall in love.
              </p>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-cyan-400">{time.toLocaleTimeString()}</div>
                <div className="text-xs text-gray-400">Current Time</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-xs text-gray-400">Always Creating</div>
              </div>
            </div>
          </div>

          {/* Services Constellation */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
              Our Craft
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                >
                  <service.icon
                    className={`w-8 h-8 ${service.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <div className="text-sm font-medium">{service.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Portal */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Connect
            </h4>
            <div className="space-y-4">
              <a href="mailto:hello@momentum.dev" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  coder.anubhab26@gmail.com
                </span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  +91 99999 99999
                </span>
              </a>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400/20 to-yellow-500/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-pink-400" />
                </div>
                <span className="text-gray-300">Kolkata, West Bengal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <div className="flex space-x-6 mb-4 md:mb-0">
            {[
              { icon: Github, href: "#", color: "hover:text-gray-300" },
              { icon: Twitter, href: "#", color: "hover:text-cyan-400" },
              { icon: Linkedin, href: "#", color: "hover:text-blue-400" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`w-12 h-12 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:border-white/30`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2025 Momentum Labs. Crafted with <Heart className="inline w-4 h-4 text-red-400 animate-pulse" /> in the
              digital realm.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
