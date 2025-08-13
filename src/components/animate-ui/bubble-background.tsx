"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

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

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {bubbles.map((bubble, index) => {
        // Safety check for window object
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        
        // Much simpler approach - direct mouse influence with limited range
        const mouseInfluenceX = (mousePos.x / screenWidth - 0.5) * 200 // -100 to +100
        const mouseInfluenceY = (mousePos.y / screenHeight - 0.5) * 200 // -100 to +100
        
        // Each bubble gets different strength
        const magnetStrength = (index + 1) * 0.3 // 0.3, 0.6, 0.9, 1.2
        
        // Simple movement calculation
        const clampedX = mouseInfluenceX * magnetStrength
        const clampedY = mouseInfluenceY * magnetStrength
        
        return (
          <div
            key={bubble.id}
            className="absolute rounded-full opacity-60 blur-lg cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-300"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background: `radial-gradient(circle, ${bubble.color} 0%, rgba(255,255,255,0) 70%)`,
              transform: `translate(${clampedX}px, ${clampedY}px)`,
              transition: 'transform 0.2s ease-out, scale 0.3s ease-out, opacity 0.3s ease-out'
            }}
          />
        )
      })}
    </div>
  )
}