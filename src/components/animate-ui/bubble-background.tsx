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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
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
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {bubbles.map((bubble, index) => {
        // Safety check for window object
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
        
        // Gentle mouse influence - smooth and subtle
        const mouseInfluenceX = (mousePos.x / screenWidth - 0.5) * 120 // -60 to +60
        const mouseInfluenceY = (mousePos.y / screenHeight - 0.5) * 120 // -60 to +60
        
        // Gentle follow strength for smooth effect
        const followStrength = (index + 1) * 0.4 // 0.4, 0.8, 1.2, 1.6
        
        // Smooth following offset
        const followX = mouseInfluenceX * followStrength
        const followY = mouseInfluenceY * followStrength
        
        return (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full opacity-60 blur-lg cursor-pointer"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background: `radial-gradient(circle, ${bubble.color} 0%, rgba(255,255,255,0) 70%)`,
              transform: `translate(${followX}px, ${followY}px)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            whileHover={{
              scale: 1.8,
              opacity: 0.9,
              rotate: 20,
              transition: { duration: 0.3 }
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}