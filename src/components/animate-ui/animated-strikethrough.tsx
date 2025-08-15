"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedStrikethroughProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  strikethroughDelay?: number
}

export function AnimatedStrikethrough({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  strikethroughDelay = 1
}: AnimatedStrikethroughProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const words = text.split(" ")

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 }
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative inline-block", className)}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={textVariants}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          {word}
        </motion.span>
      ))}
      
      {/* Animated strikethrough line */}
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-destructive origin-left"
        style={{ width: '100%', transform: 'translateY(-50%)' }}
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.8,
          delay: strikethroughDelay,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}