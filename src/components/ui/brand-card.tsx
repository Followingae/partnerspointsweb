import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BrandCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "glass" | "elevated" | "gradient"
  size?: "sm" | "md" | "lg"
}

export function BrandCard({
  title,
  description,
  children,
  className,
  variant = "default",
  size = "md"
}: BrandCardProps) {
  const sizeClasses = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  }

  const variantClasses = {
    default: "bg-white border border-gray-200",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20",
    elevated: "bg-white shadow-brand border-0",
    gradient: "bg-gradient-to-br from-electric-blue/5 via-azure-breeze/5 to-vivid-violet/5 border border-electric-blue/10"
  }

  return (
    <Card className={cn(
      variantClasses[variant],
      "transition-all duration-300 hover:shadow-lg",
      className
    )}>
      {(title || description) && (
        <CardHeader className={cn(
          sizeClasses[size],
          "pb-4"
        )}>
          {title && <CardTitle className="text-shadow-black">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(
        sizeClasses[size],
        (title || description) ? "pt-0" : ""
      )}>
        {children}
      </CardContent>
    </Card>
  )
}