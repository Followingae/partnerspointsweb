"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedChartProps {
  children: React.ReactNode
  animationType?: "bars" | "lines" | "pie" | "counters"
  delay?: number
  duration?: number
  className?: string
}

export function AnimatedChart({ 
  children, 
  animationType = "bars",
  delay = 0,
  duration = 1.2,
  className = ""
}: AnimatedChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = chartRef.current

    // Different animations based on chart type
    const animations = {
      bars: () => {
        const bars = chart.querySelectorAll('[data-chart="bar"], .recharts-rectangle, .recharts-bar-rectangle')
        gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" })
        
        return gsap.to(bars, {
          scaleY: 1,
          duration: duration,
          ease: "elastic.out(1, 0.4)",
          stagger: 0.1,
          delay: delay
        })
      },
      
      lines: () => {
        const paths = chart.querySelectorAll('path, .recharts-line-curve, .recharts-area-curve')
        const dots = chart.querySelectorAll('circle, .recharts-dot')
        
        // Animate path drawing
        paths.forEach(path => {
          const pathElement = path as SVGPathElement
          if (pathElement.getTotalLength) {
            const length = pathElement.getTotalLength()
            gsap.set(pathElement, {
              strokeDasharray: length,
              strokeDashoffset: length
            })
          }
        })
        
        // Hide dots initially
        gsap.set(dots, { opacity: 0, scale: 0 })
        
        const tl = gsap.timeline({ delay })
        
        // Draw lines
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: duration,
          ease: "power2.inOut",
          stagger: 0.2
        })
        
        // Show dots with bounce
        tl.to(dots, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
          stagger: 0.05
        }, "-=0.3")
        
        return tl
      },
      
      pie: () => {
        const sectors = chart.querySelectorAll('[data-chart="sector"], .recharts-pie-sector, .recharts-sector')
        gsap.set(sectors, { rotation: -90, scale: 0, transformOrigin: "center" })
        
        return gsap.to(sectors, {
          rotation: 0,
          scale: 1,
          duration: duration,
          ease: "back.out(1.2)",
          stagger: 0.1,
          delay: delay
        })
      },
      
      counters: () => {
        const numbers = chart.querySelectorAll('[data-animate="counter"], .text-2xl, .text-3xl, .text-4xl')
        
        numbers.forEach(element => {
          const target = parseInt(element.textContent?.replace(/[^\d]/g, '') || '0')
          const obj = { value: 0 }
          
          gsap.to(obj, {
            value: target,
            duration: duration,
            ease: "power2.out",
            delay: delay,
            onUpdate: () => {
              element.textContent = Math.round(obj.value).toLocaleString()
            }
          })
        })
      }
    }

    // Create ScrollTrigger for chart animation
    const animation = ScrollTrigger.create({
      trigger: chart,
      start: "top 80%",
      end: "bottom 20%",
      once: true,
      onEnter: () => {
        // Add initial excitement
        gsap.fromTo(chart,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              // Run the specific chart animation
              animations[animationType]()
            }
          }
        )
      }
    })

    return () => {
      animation.kill()
    }
  }, [animationType, delay, duration])

  return (
    <div ref={chartRef} className={className}>
      {children}
    </div>
  )
}

// Hook for adding chart animations to existing components
export function useChartAnimation(
  chartRef: React.RefObject<HTMLElement>,
  animationType: "bars" | "lines" | "pie" | "counters" = "bars",
  options?: {
    delay?: number
    duration?: number
    trigger?: string
  }
) {
  const { delay = 0, duration = 1.2, trigger = "top 80%" } = options || {}

  useEffect(() => {
    if (!chartRef.current) return

    const chart = chartRef.current

    const animation = ScrollTrigger.create({
      trigger: chart,
      start: trigger,
      once: true,
      onEnter: () => {
        // Animate based on type
        if (animationType === "bars") {
          const bars = chart.querySelectorAll('[data-chart="bar"], .recharts-rectangle')
          gsap.fromTo(bars,
            { scaleY: 0, transformOrigin: "bottom" },
            {
              scaleY: 1,
              duration: duration,
              ease: "elastic.out(1, 0.4)",
              stagger: 0.1,
              delay: delay
            }
          )
        }
        // Add other types as needed
      }
    })

    return () => animation.kill()
  }, [chartRef, animationType, delay, duration, trigger])
}