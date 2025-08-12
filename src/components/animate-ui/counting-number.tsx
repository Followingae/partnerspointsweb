"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface CountingNumberProps {
  number: number
  decimalPlaces?: number
  fromNumber?: number
  duration?: number
  className?: string
  inViewOnce?: boolean
  prefix?: string
  suffix?: string
}

export function CountingNumber({
  number,
  decimalPlaces = 0,
  fromNumber = 0,
  duration = 2,
  className = "",
  inViewOnce = true,
  prefix = "",
  suffix = ""
}: CountingNumberProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: inViewOnce })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({
        number: number,
        transition: {
          duration: duration,
          ease: "easeOut"
        }
      })
    }
  }, [isInView, number, duration, controls])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ number: fromNumber }}
      animate={controls}
    >
      {({ number: animatedNumber }: { number: number }) => 
        `${prefix}${animatedNumber.toFixed(decimalPlaces)}${suffix}`
      }
    </motion.span>
  )
}