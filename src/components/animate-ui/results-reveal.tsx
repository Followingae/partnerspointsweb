"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface ResultsRevealProps {
  children: React.ReactNode
  trigger?: "immediate" | "scroll"
  delay?: number
  stagger?: number
  className?: string
}

export function ResultsReveal({ 
  children, 
  trigger = "immediate",
  delay = 0,
  stagger = 0.1,
  className = ""
}: ResultsRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = container.children

    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y: 30,
      scale: 0.9
    })

    if (trigger === "immediate") {
      // Immediate reveal with satisfying animation
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.2)",
        stagger: stagger,
        delay: delay,
        onStart: () => {
          // Add a subtle bounce to the container
          gsap.fromTo(container,
            { scale: 1 },
            {
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
              yoyo: true,
              repeat: 1
            }
          )
        }
      })
    } else {
      // Scroll-triggered reveal
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(elements, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.6)",
                stagger: stagger,
                delay: delay
              })
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 }
      )

      observer.observe(container)

      return () => observer.disconnect()
    }
  }, [trigger, delay, stagger])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}