"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

interface StaggeredTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  trigger?: "load" | "scroll"
}

export function StaggeredText({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.8,
  trigger = "scroll"
}: StaggeredTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    
    // Split text into characters
    const split = new SplitText(element, { type: "chars" })
    const chars = split.chars

    // Initial state - all characters invisible
    gsap.set(chars, {
      opacity: 0,
      y: 50,
      rotationX: -90,
      transformOrigin: "0% 50% -50px"
    })

    const ctx = gsap.context(() => {
      if (trigger === "scroll") {
        // Animate on scroll
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: duration,
          ease: "back.out(1.2)",
          stagger: {
            amount: 0.4,
            from: "start"
          },
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          delay: delay
        })
      } else {
        // Animate immediately on load
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: duration,
          ease: "back.out(1.2)",
          stagger: {
            amount: 0.6,
            from: "start"
          },
          delay: delay
        })
      }
    }, element)

    return () => {
      ctx.revert()
      split.revert()
    }
  }, [children, delay, duration, trigger])

  return (
    <div 
      ref={textRef} 
      className={className}
      style={{ overflow: "visible" }}
    >
      {children}
    </div>
  )
}