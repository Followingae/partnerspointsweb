import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: "blue" | "lime" | "multi"
}

export function GradientText({ 
  children, 
  className, 
  variant = "blue" 
}: GradientTextProps) {
  const gradientClasses = {
    blue: "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
    lime: "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent", 
    multi: "bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
  }

  return (
    <span className={cn(gradientClasses[variant], className)}>
      {children}
    </span>
  )
}