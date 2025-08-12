"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface UnifiedCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "subtle" | "highlight"
}

export function UnifiedCard({ 
  children, 
  className,
  variant = "default"
}: UnifiedCardProps) {
  const variants = {
    default: "border border-border bg-card hover:shadow-md transition-shadow duration-200",
    subtle: "border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors duration-200",
    highlight: "border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-200"
  }

  return (
    <Card className={cn(
      "p-6 rounded-xl",
      variants[variant],
      className
    )}>
      {children}
    </Card>
  )
}