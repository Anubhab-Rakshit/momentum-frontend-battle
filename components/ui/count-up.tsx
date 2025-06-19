"use client"
// A simple CountUp component using GSAP

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import type { ScrollTrigger } from "gsap/ScrollTrigger" // Only for type

interface CountUpProps {
  end: number
  duration?: number
  decimals?: number
  separator?: string
  className?: string
  scrollTrigger?: ScrollTrigger.Vars // Pass ScrollTrigger config
}

export function CountUp({ end, duration = 2, decimals = 0, separator = "", className, scrollTrigger }: CountUpProps) {
  const countRef = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(!scrollTrigger) // Start animation if no scrollTrigger

  useEffect(() => {
    if (!countRef.current) return

    let st: ScrollTrigger | undefined
    if (scrollTrigger && !isInView) {
      // Ensure ScrollTrigger is available
      if (gsap.plugins.ScrollTrigger) {
        st = gsap.plugins.ScrollTrigger.create({
          trigger: countRef.current,
          start: "top 90%", // Default start, can be overridden by props
          ...scrollTrigger,
          onEnter: () => setIsInView(true),
          // onEnterBack: () => setIsInView(true), // Optional: re-animate on scroll back
          // once: true, // Optional: animate only once
        })
      } else {
        console.warn("ScrollTrigger plugin is not registered with GSAP.")
        setIsInView(true) // Fallback to animate immediately if ScrollTrigger is missing
      }
    }

    return () => {
      st?.kill()
    }
  }, [scrollTrigger, isInView])

  useEffect(() => {
    if (!isInView || !countRef.current) return

    const target = { val: 0 }
    gsap.to(target, {
      val: end,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = target.val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
          // Manual separator for non-locale-aware scenarios or specific formatting
          if (separator && decimals === 0) {
            countRef.current.textContent = target.val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, separator)
          } else if (separator) {
            // This part might need more robust logic for decimals + custom separator
            countRef.current.textContent = target.val
              .toFixed(decimals)
              .replace(".", ",")
              .replace(/\B(?=(\d{3})+(?!\d))/g, separator) // Example for European style
          }
        }
      },
    })
  }, [end, duration, decimals, separator, isInView])

  return (
    <span ref={countRef} className={className}>
      {/* Initial value can be 0 or start value */}
      {Number(0).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  )
}
