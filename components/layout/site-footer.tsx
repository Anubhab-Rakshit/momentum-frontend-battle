"use client"
import Link from "next/link"
import { Sparkles, Linkedin, Twitter, Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 col-span-1 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group">
              <Sparkles className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300 ease-out" />
              <span className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                Momentum
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Crafting unique digital experiences that resonate and inspire.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground/90">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#work" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/#approach" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/#insights" className="text-muted-foreground hover:text-primary transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground/90">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/strategy" className="text-muted-foreground hover:text-primary transition-colors">
                  Digital Strategy
                </Link>
              </li>
              <li>
                <Link href="/services/design" className="text-muted-foreground hover:text-primary transition-colors">
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services/development"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/animation" className="text-muted-foreground hover:text-primary transition-colors">
                  Motion Design
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground/90">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-primary transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border/30">
          &copy; {new Date().getFullYear()} Momentum Labs. All rights reserved.
          <Link href="/privacy" className="ml-4 hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="ml-4 hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
