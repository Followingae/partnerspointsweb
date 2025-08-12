"use client"

import { useMode } from "@/context/mode-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ModeToggleProps {
  className?: string
  variant?: "default" | "pills" | "text"
}

export function ModeToggle({ className, variant = "pills" }: ModeToggleProps) {
  const { mode, setMode } = useMode()

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

  // Pills variant (default)
  return (
    <div className={cn(
      "inline-flex items-center gap-1 p-1 bg-muted rounded-lg",
      className
    )}>
      <button
        onClick={() => setMode("businesses")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
          mode === "businesses"
            ? "bg-white text-electric-blue shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-white/50"
        )}
      >
        For Businesses
      </button>
      <button
        onClick={() => setMode("customers")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
          mode === "customers"
            ? "bg-white text-electric-blue shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-white/50"
        )}
      >
        For Customers
      </button>
    </div>
  )
}