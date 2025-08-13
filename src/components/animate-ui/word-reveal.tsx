"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface WordRevealProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
}

export function WordReveal({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.6,
  stagger = 0.15
}: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const words = children.split(' ')
    
    // Clear container and create word spans
    container.innerHTML = ''
    const wordElements: HTMLSpanElement[] = []

    words.forEach((word, index) => {
      const wordSpan = document.createElement('span')
      wordSpan.textContent = word
      wordSpan.style.display = 'inline-block'
      wordSpan.style.marginRight = index < words.length - 1 ? '1ch' : '0' // Use character width for normal spacing
      
      // Set initial state for animation
      gsap.set(wordSpan, {
        y: 60,
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 100%"
      })
      
      container.appendChild(wordSpan)
      wordElements.push(wordSpan)
    })

    // Animate words in sequence
    gsap.to(wordElements, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: duration,
      ease: "back.out(1.2)",
      stagger: stagger,
      delay: delay
    })

    // Cleanup function
    return () => {
      gsap.killTweensOf(wordElements)
    }
  }, [children, delay, duration, stagger])

  return (
    <div ref={containerRef} className={className}>
      {/* Fallback content for SSR */}
      {children}
    </div>
  )
}