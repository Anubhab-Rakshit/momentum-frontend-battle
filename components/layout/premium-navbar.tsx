"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface NavItem {
  name: string
  href: string
  preview?: {
    title: string
    description: string
    image: string
  }
}

const navItems: NavItem[] = [
  {
    name: "Work",
    href: "/#work",
    preview: {
      title: "Our Portfolio",
      description: "Explore our award-winning digital experiences",
      image: "/placeholder.svg?width=300&height=200&text=Portfolio",
    },
  },
  {
    name: "Services",
    href: "/#services",
    preview: {
      title: "What We Do",
      description: "Full-stack digital solutions and creative development",
      image: "/placeholder.svg?width=300&height=200&text=Services",
    },
  },
  {
    name: "About",
    href: "/#about",
    preview: {
      title: "Our Story",
      description: "Meet the team behind the magic",
      image: "/placeholder.svg?width=300&height=200&text=About",
    },
  },
  {
    name: "Contact",
    href: "/#contact",
    preview: {
      title: "Let's Talk",
      description: "Ready to start your next project?",
      image: "/placeholder.svg?width=300&height=200&text=Contact",
    },
  },
]

export function PremiumNavbar() {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const navRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleNavItemHover = (item: NavItem | null) => {
    setHoveredItem(item)
  }

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-background/80 backdrop-blur-xl shadow-2xl border-b border-border/50" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary group-hover:scale-110 transition-all duration-300 animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                Momentum
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleNavItemHover(item)}
                  onMouseLeave={() => handleNavItemHover(null)}
                >
                  <Button
                    variant="ghost"
                    asChild
                    className="text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 magnetic-button liquid-hover"
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                </div>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
             

              <Button
                size="sm"
                className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 magnetic-button liquid-hover"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary/10 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className="justify-start text-base hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Navigation Preview */}
      {hoveredItem && (
        <div
          ref={previewRef}
          className="fixed z-40 pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y + 20,
          }}
        >
          <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-2xl max-w-sm animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
              <Image
                src={hoveredItem.preview?.image || "/placeholder.svg"}
                alt={hoveredItem.preview?.title || ""}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{hoveredItem.preview?.title}</h3>
            <p className="text-sm text-muted-foreground">{hoveredItem.preview?.description}</p>
          </div>
        </div>
      )}
    </>
  )
}
