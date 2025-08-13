"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

export function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const bubbleRefs = useRef<HTMLDivElement[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const colors = [
      "#6EE7F9", // Brand cyan
      "#A78BFA", // Brand purple
      "#10B981", // Emerald green
      "#F59E0B", // Amber orange - 4th complementary color
    ]
    
    const bubbleConfigs = [
      { x: 65, y: 65, size: 800 },   // Bottom right - big but well positioned
      { x: 35, y: 70, size: 700 },   // Bottom middle - large and centered
      { x: 15, y: 65, size: 750 },   // Bottom left - big but not too far left
      { x: 65, y: 15, size: 650 },   // Top right - large but contained
    ]
    
    const newBubbles = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: bubbleConfigs[i].x,
      y: bubbleConfigs[i].y,
      size: bubbleConfigs[i].size,
      duration: Math.random() * 20 + 15, // 15-35s slower for big bubbles
      delay: Math.random() * 10,
      color: colors[i] // Each bubble gets its own unique color
    }))
    
    setBubbles(newBubbles)
  }, [mounted])

  // GSAP ScrollTrigger Parallax Effect
  useEffect(() => {
    if (!mounted || bubbleRefs.current.length === 0) return

    const ctx = gsap.context(() => {
      bubbleRefs.current.forEach((bubble, index) => {
        if (bubble) {
          // Different parallax speeds for depth
          const speed = (index + 1) * 0.3 // 0.3, 0.6, 0.9, 1.2
          
          gsap.to(bubble, {
            y: -100 * speed,
            x: -50 * speed,
            rotation: 360 * speed,
            scale: 1 + (speed * 0.1),
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              ease: "none"
            }
          })

          // Floating animation
          gsap.to(bubble, {
            y: "+=20",
            duration: 3 + index,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          })

          // Breathing scale animation
          gsap.to(bubble, {
            scale: 1.05,
            duration: 4 + index * 0.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [mounted, bubbles])

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden" />
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {bubbles.map((bubble, index) => {
        // Safety check for window object
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        
        // Much simpler approach - direct mouse influence with limited range
        const mouseInfluenceX = (mousePos.x / screenWidth - 0.5) * 50 // Reduced for GSAP compatibility
        const mouseInfluenceY = (mousePos.y / screenHeight - 0.5) * 50 // Reduced for GSAP compatibility
        
        // Each bubble gets different strength
        const magnetStrength = (index + 1) * 0.2 // Reduced for smoother interaction
        
        // Simple movement calculation
        const clampedX = mouseInfluenceX * magnetStrength
        const clampedY = mouseInfluenceY * magnetStrength
        
        return (
          <div
            key={bubble.id}
            ref={(el) => {
              if (el) bubbleRefs.current[index] = el
            }}
            className="absolute rounded-full opacity-60 blur-lg will-change-transform"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background: `radial-gradient(circle, ${bubble.color} 0%, rgba(255,255,255,0) 70%)`,
              transform: `translate(${clampedX}px, ${clampedY}px)`,
            }}
          />
        )
      })}
    </div>
  )
}