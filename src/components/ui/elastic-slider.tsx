"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

const ElasticSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const thumbRef = React.useRef<HTMLSpanElement>(null)
  const trackRef = React.useRef<HTMLSpanElement>(null)

  const handleValueChange = (value: number[]) => {
    // Elastic feedback on value change
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        scale: 1.2,
        duration: 0.15,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
    }

    // Track pulse effect
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        scaleY: 1.3,
        duration: 0.2,
        ease: "elastic.out(1, 0.3)",
        yoyo: true,
        repeat: 1
      })
    }

    if (props.onValueChange) {
      props.onValueChange(value)
    }
  }

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
      onValueChange={handleValueChange}
    >
      <SliderPrimitive.Track
        ref={trackRef}
        className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
      >
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        ref={thumbRef}
        className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 hover:shadow-lg"
      />
    </SliderPrimitive.Root>
  )
})
ElasticSlider.displayName = SliderPrimitive.Root.displayName

export { ElasticSlider }