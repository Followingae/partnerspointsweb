"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface HeroTitleAnimationProps {
  className?: string
}

export function HeroTitleAnimation({ className }: HeroTitleAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [shouldTransform, setShouldTransform] = useState(false)
  
  const builtInToText = "built-in to"
  const characters = builtInToText.split("")

  // Trigger transformation after the text appears
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShouldTransform(true)
      }, 1500) // 1.5 seconds after appearing
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Much slower stagger between title lines
        delayChildren: 0, // No delay for initial animation
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  const characterVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn("", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* First line - Loyalty */}
      <motion.div variants={titleVariants}>
        <span className="font-semibold">Loyalty</span>
      </motion.div>

      {/* Second line - built-in to with character animation */}
      <motion.div variants={titleVariants}>
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={characterVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="inline-block transition-all duration-700 ease-out"
            style={{
              fontWeight: shouldTransform ? 900 : 600,
              fontStyle: shouldTransform ? "italic" : "normal",
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.4, 0.25, 1],
              delay: index * 0.05, // Stagger character appearance
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Third line - payments */}
      <motion.div variants={titleVariants}>
        <span className="font-semibold">payments</span>
      </motion.div>
    </motion.div>
  )
}