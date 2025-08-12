import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "horizontal" | "stacked" | "mark-only"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  color?: "default" | "white" | "blue" | "black"
}

export function Logo({ 
  variant = "horizontal", 
  size = "md", 
  className,
  color = "default" 
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8", 
    lg: "h-10",
    xl: "h-12"
  }

  const colorClasses = {
    default: "text-shadow-black",
    white: "text-white",
    blue: "text-electric-blue", 
    black: "text-shadow-black"
  }

  if (variant === "mark-only") {
    return (
      <div className={cn("flex items-center", className)}>
        <div className={cn(
          "rounded-lg flex items-center justify-center bg-electric-blue",
          sizeClasses[size],
          size === "sm" ? "w-6" : size === "md" ? "w-8" : size === "lg" ? "w-10" : "w-12"
        )}>
          <div className="w-1/2 h-1/2 bg-white rounded-full relative">
            <div className="absolute inset-0 bg-white transform rotate-45"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logomark */}
      <div className={cn(
        "rounded-lg flex items-center justify-center bg-electric-blue flex-shrink-0",
        sizeClasses[size],
        size === "sm" ? "w-6" : size === "md" ? "w-8" : size === "lg" ? "w-10" : "w-12"
      )}>
        <div className="w-1/2 h-1/2 relative">
          {/* Four-pointed star shape */}
          <div className="absolute inset-0 bg-white transform rotate-45"></div>
          <div className="absolute inset-0 bg-white"></div>
        </div>
      </div>
      
      {/* Wordmark */}
      <div className={cn(
        "font-sans font-medium tracking-tight",
        colorClasses[color],
        size === "sm" ? "text-sm" : size === "md" ? "text-base" : size === "lg" ? "text-lg" : "text-xl"
      )}>
        {variant === "stacked" ? (
          <div className="flex flex-col leading-none">
            <span>partners</span>
            <span>points</span>
          </div>
        ) : (
          <span>partners points</span>
        )}
      </div>
    </div>
  )
}