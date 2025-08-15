"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"

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
  const motionValue = useMotionValue(fromNumber)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces))
  const [displayNumber, setDisplayNumber] = useState(fromNumber)

  useEffect(() => {
    const unsubscribe = rounded.onChange((latest) => {
      setDisplayNumber(latest)
    })
    return unsubscribe
  }, [rounded])

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, number, {
        duration: duration,
        ease: "easeOut"
      })
      return controls.stop
    }
  }, [isInView, number, duration, motionValue])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {`${prefix}${displayNumber.toFixed(decimalPlaces)}${suffix}`}
    </motion.span>
  )
}