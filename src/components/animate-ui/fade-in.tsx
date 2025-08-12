"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  className = ""
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0
            }
          : {
              opacity: 0,
              ...directions[direction]
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      {children}
    </motion.div>
  )
}