"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
  distance?: number
  axis?: "x" | "y" | "both"
}

export function FloatingElement({ 
  children, 
  className,
  duration = 6,
  delay = 0,
  distance = 20,
  axis = "y"
}: FloatingElementProps) {
  const getAnimation = () => {
    switch (axis) {
      case "x":
        return {
          x: [-distance, distance, -distance],
        }
      case "y":
        return {
          y: [-distance, distance, -distance],
        }
      case "both":
        return {
          x: [-distance/2, distance/2, -distance/2],
          y: [-distance, distance, -distance],
        }
    }
  }

  return (
    <motion.div
      animate={getAnimation()}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}

interface PulseElementProps {
  children: React.ReactNode
  className?: string
  scale?: number
  duration?: number
  delay?: number
}

export function PulseElement({ 
  children, 
  className,
  scale = 1.05,
  duration = 2,
  delay = 0
}: PulseElementProps) {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}