"use client"

import { motion } from "framer-motion"

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
  stagger = 0.02,
  variant = "fade"
}: AnimatedTextProps) {
  const words = text.split(" ")

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={variants[variant]}
          transition={{
            duration: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}