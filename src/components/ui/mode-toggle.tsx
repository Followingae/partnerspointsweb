"use client"

import { useMode } from "@/context/mode-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface ModeToggleProps {
  className?: string
  variant?: "default" | "pills" | "text"
}

export function ModeToggle({ className, variant = "pills" }: ModeToggleProps) {
  const { mode, setMode } = useMode()
  const activeIndicatorRef = useRef<HTMLDivElement>(null)
  const businessButtonRef = useRef<HTMLButtonElement>(null)
  const customerButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (variant !== "pills" || !activeIndicatorRef.current) return

    const indicator = activeIndicatorRef.current
    const businessButton = businessButtonRef.current
    const customerButton = customerButtonRef.current

    if (!businessButton || !customerButton) return

    const targetButton = mode === "businesses" ? businessButton : customerButton

    gsap.to(indicator, {
      x: targetButton.offsetLeft,
      width: targetButton.offsetWidth,
      duration: 0.4,
      ease: "power2.out"
    })
  }, [mode, variant])

  if (variant === "text") {
    return (
      <div className={cn("flex gap-4", className)}>
        <button
          onClick={() => setMode("businesses")}
          className={cn(
            "text-sm font-medium transition-colors",
            mode === "businesses" 
              ? "text-electric-blue border-b-2 border-electric-blue" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          For Businesses
        </button>
        <button
          onClick={() => setMode("customers")}
          className={cn(
            "text-sm font-medium transition-colors",
            mode === "customers" 
              ? "text-electric-blue border-b-2 border-electric-blue" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          For Customers
        </button>
      </div>
    )
  }

  if (variant === "default") {
    return (
      <div className={cn("flex gap-2", className)}>
        <Button
          onClick={() => setMode("businesses")}
          variant={mode === "businesses" ? "default" : "outline"}
          size="sm"
          className={mode === "businesses" ? "bg-electric-blue hover:bg-electric-blue/90" : ""}
        >
          For Businesses
        </Button>
        <Button
          onClick={() => setMode("customers")}
          variant={mode === "customers" ? "default" : "outline"}
          size="sm"
          className={mode === "customers" ? "bg-electric-blue hover:bg-electric-blue/90" : ""}
        >
          For Customers
        </Button>
      </div>
    )
  }

  // Pills variant (default) with GSAP animation
  return (
    <div className={cn(
      "inline-flex items-center p-1 bg-muted rounded-lg relative overflow-hidden",
      className
    )}>
      {/* Animated background indicator */}
      <div
        ref={activeIndicatorRef}
        className="absolute bg-white shadow-sm rounded-md h-[calc(100%-8px)] my-1 transition-none"
        style={{
          left: mode === "businesses" ? "4px" : "auto",
          width: "auto"
        }}
      />
      
      <button
        ref={businessButtonRef}
        onClick={() => setMode("businesses")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md relative z-10 transition-colors duration-200",
          mode === "businesses"
            ? "text-electric-blue"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        For Businesses
      </button>
      <button
        ref={customerButtonRef}
        onClick={() => setMode("customers")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md relative z-10 transition-colors duration-200",
          mode === "customers"
            ? "text-electric-blue"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        For Customers
      </button>
    </div>
  )
}