"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({ 
  value, 
  duration = 1000, 
  prefix = "", 
  suffix = "",
  className 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  return (
    <motion.span 
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  )
}