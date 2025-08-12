"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "primary"
  blur?: "sm" | "md" | "lg" | "xl"
  asChild?: boolean
}

const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  ({ className, variant = "light", blur = "xl", children, ...props }, ref) => {
    const variants = {
      light: "bg-white/10 border-white/20 text-white shadow-[0_8px_32px_rgba(255,255,255,0.1)]",
      dark: "bg-black/10 border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)]", 
      primary: "bg-blue-500/20 border-white/20 text-white shadow-[0_8px_32px_rgba(59,130,246,0.3)]"
    }
    
    const blurs = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md", 
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "border rounded-2xl transition-all duration-300",
          variants[variant],
          blurs[blur],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Glass.displayName = "Glass"

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "light" | "dark" | "primary"
  blur?: "sm" | "md" | "lg" | "xl"
  asChild?: boolean
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", blur = "xl", children, ...props }, ref) => {
    const variants = {
      light: "bg-white/10 border-white/20 text-black hover:bg-white/15 shadow-[0_4px_16px_rgba(255,255,255,0.1)]",
      dark: "bg-black/10 border-white/10 text-white hover:bg-black/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]", 
      primary: "bg-accent/90 border-accent/60 text-white hover:bg-accent shadow-[0_4px_16px_rgba(15,23,42,0.4)] backdrop-blur-sm"
    }
    
    const blurs = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md", 
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl"
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center border rounded-lg transition-all duration-200",
          "font-medium cursor-pointer",
          variants[variant],
          blurs[blur],
          "hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
GlassButton.displayName = "GlassButton"

export { Glass, GlassButton }