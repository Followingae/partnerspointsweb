"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  variant?: "fade" | "slide" | "scale"
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
  variant = "slide"
}: AnimatedTextProps) {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const words = text.split(" ")

  useEffect(() => {
    setMounted(true)
  }, [])

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slide: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
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

  return (
    <motion.div
      ref={ref}
      className={cn("", className)}
      variants={container}
      initial={mounted ? "hidden" : "visible"}
      animate={mounted && isInView ? "visible" : mounted ? "hidden" : "visible"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-3"
          variants={mounted ? variants[variant] : { hidden: { opacity: 1 }, visible: { opacity: 1 } }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
            type: "spring",
            damping: 12,
            stiffness: 100,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}