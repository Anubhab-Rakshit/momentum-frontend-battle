"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import Image from "next/image"

export function UnconventionalNavbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const navItems = [
    {
      id: "home",
      label: "Genesis",
      href: "#home",
      preview: {
        title: "The Beginning",
        description: "Where digital dreams take their first breath and transform into reality",
        image: "/images/nav-genesis.png",
      },
    },
    {
      id: "work",
      label: "Artifacts",
      href: "#work",
      preview: {
        title: "Digital Creations",
        description: "Masterpieces forged in the digital realm with cutting-edge technology",
        image: "/images/nav-artifacts.png",
      },
    },
    {
      id: "services",
      label: "Alchemy",
      href: "#services",
      preview: {
        title: "Transformation Magic",
        description: "Converting raw ideas into digital gold through innovative solutions",
        image: "/images/nav-alchemy.png",
      },
    },
    {
      id: "about",
      label: "Essence",
      href: "#about",
      preview: {
        title: "Our Core",
        description: "The passionate souls behind the digital magic and innovation",
        image: "/images/nav-essence.png",
      },
    },
    {
      id: "contact",
      label: "Nexus",
      href: "#contact",
      preview: {
        title: "Connection Point",
        description: "Where possibilities converge and new partnerships are born",
        image: "/images/nav-nexus.png",
      },
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.querySelector(item.href))
      const scrollPos = window.scrollY + 150

      sections.forEach((section, index) => {
        if (section) {
          const top = (section as HTMLElement).offsetTop
          const bottom = top + (section as HTMLElement).offsetHeight
          if (scrollPos >= top && scrollPos <= bottom) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current.children,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      )
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Fixed Navigation with proper spacing */}
      <nav ref={navRef} className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/30 backdrop-blur-2xl border border-white/20 rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full animate-ping opacity-20"></div>
              </div>
              <span className="text-white font-bold text-lg tracking-wider">MOMENTUM</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? "text-cyan-400 bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Theme Toggle - Fixed positioning */}
            

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 w-10 h-10 flex items-center justify-center"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Add top padding to body content to prevent navbar overlap */}
      <div className="h-20"></div>

      {/* Enhanced Mobile Slide-out Menu with Hover Previews */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div
            ref={menuRef}
            className="absolute right-0 top-0 h-full w-96 bg-black/95 backdrop-blur-2xl border-l border-white/10 p-8 overflow-y-auto"
          >
            <div className="mt-20 space-y-4">
              {navItems.map((item, index) => (
                <div key={item.id} className="relative">
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-cyan-400/50">
                      <div>
                        <span className="text-white text-lg font-medium">{item.label}</span>
                        <div className="text-xs text-gray-400 mt-1">{item.preview.title}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-cyan-400 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </Link>

                  {/* Enhanced Hover Preview */}
                  {hoveredItem === item.id && (
                    <div className="absolute left-full top-0 ml-6 w-96 bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 shadow-2xl z-50 animate-in fade-in-0 slide-in-from-left-4 duration-500">
                      <div className="relative h-40 mb-4 rounded-xl overflow-hidden group">
                        <Image
                          src={item.preview.image || "/placeholder.svg"}
                          alt={item.preview.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-white font-bold text-xl mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          {item.preview.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{item.preview.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center text-cyan-400 text-sm font-medium">
                            <span>Explore Section</span>
                            <ArrowRight className="w-4 h-4 ml-2 animate-bounce" />
                          </div>
                          <div className="text-xs text-gray-500">Click to navigate</div>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-60"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-white text-sm font-medium mb-1">Ready to start?</div>
                <div className="text-gray-400 text-xs">Let's create something amazing together</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
