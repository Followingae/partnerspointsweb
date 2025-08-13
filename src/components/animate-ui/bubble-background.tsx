"use client"

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const colors = [
      "#6EE7F9", // Brand cyan
      "#A78BFA", // Brand purple
      "#8B5CF6", // Purple
      "#3B82F6", // Blue
    ]
    
    const bubbleConfigs = [
      { x: 75, y: 10, size: 1000, duration: 15, delay: 0 },    // Top right corner (moved inward)
      { x: -15, y: 80, size: 1100, duration: 12, delay: 3 },   // Bottom left corner  
      { x: 80, y: 85, size: 950, duration: 14, delay: 7 },     // Bottom right corner (moved inward)
    ]
    
    const newBubbles = bubbleConfigs.map((config, i) => ({
      id: i,
      x: config.x,
      y: config.y,
      size: config.size,
      duration: config.duration,
      delay: config.delay,
      color: colors[i]
    }))
    
    setBubbles(newBubbles)
  }, [mounted])


  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -10 }}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `radial-gradient(circle, ${bubble.color}80 0%, ${bubble.color}50 50%, transparent 100%)`,
            filter: 'blur(40px)',
            opacity: 0.6,
            animation: `lavaLamp-${bubble.id} ${bubble.duration}s ease-in-out infinite ${bubble.delay}s`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes lavaLamp-0 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(-120px, 80px) scale(1.3); }
          50% { transform: translate(-150px, 150px) scale(0.7); }
          75% { transform: translate(-80px, 120px) scale(1.15); }
        }
        
        @keyframes lavaLamp-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(140px, -100px) scale(0.8); }
          50% { transform: translate(100px, -160px) scale(1.4); }
          75% { transform: translate(160px, -60px) scale(0.9); }
        }
        
        @keyframes lavaLamp-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(-140px, -80px) scale(1.25); }
          50% { transform: translate(-100px, -140px) scale(0.75); }
          75% { transform: translate(-160px, -100px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}