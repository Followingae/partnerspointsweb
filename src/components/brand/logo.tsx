import { cn } from "@/lib/utils"
import Image from "next/image"

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

  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/partnerspointslogo.png"
        alt="Partners Points"
        width={size === "sm" ? 120 : size === "md" ? 140 : size === "lg" ? 160 : 180}
        height={size === "sm" ? 24 : size === "md" ? 32 : size === "lg" ? 40 : 48}
        className={cn(sizeClasses[size], "object-contain")}
        priority
      />
    </div>
  )
}