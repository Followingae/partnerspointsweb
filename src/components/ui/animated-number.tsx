"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface AnimatedNumberProps {
  value: number
  duration?: number
  ease?: string
  formatFunction?: (value: number) => string
  className?: string
}

export function AnimatedNumber({ 
  value, 
  duration = 0.8,
  ease = "power2.out",
  formatFunction = (val) => val.toLocaleString(),
  className = ""
}: AnimatedNumberProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const currentValue = useRef(0)

  useEffect(() => {
    if (!numberRef.current) return

    const element = numberRef.current

    gsap.to(currentValue, {
      current: value,
      duration: duration,
      ease: ease,
      onUpdate: () => {
        if (element) {
          element.textContent = formatFunction(Math.round(currentValue.current))
        }
      }
    })
  }, [value, duration, ease, formatFunction])

  return (
    <span ref={numberRef} className={className}>
      {formatFunction(0)}
    </span>
  )
}