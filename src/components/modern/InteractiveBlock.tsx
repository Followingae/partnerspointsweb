"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import InView from "./InView";

interface InteractiveBlockProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  delay?: number;
  variant?: "default" | "highlight" | "subtle";
  hoverable?: boolean;
  className?: string;
}

export default function InteractiveBlock({
  icon,
  title,
  description,
  children,
  delay = 0,
  variant = "default",
  hoverable = true,
  className = ""
}: InteractiveBlockProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    default: "border-border hover:border-primary/30 bg-card",
    highlight: "border-primary/30 hover:border-primary/50 bg-primary/5 hover:bg-primary/10",
    subtle: "bg-muted/50 hover:bg-muted border-border/50"
  };

  return (
    <InView 
      className="animate-slide-up" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <Card
        className={cn(
          "transition-all duration-500 will-change-transform group",
          variants[variant],
          hoverable ? "hover:-translate-y-2 hover:shadow-lg" : "",
          isHovered ? "scale-[1.02]" : "",
          className
        )}
        onMouseEnter={() => hoverable && setIsHovered(true)}
        onMouseLeave={() => hoverable && setIsHovered(false)}
      >
        <CardContent className="p-8">
          <div className="space-y-4">
            {icon && (
              <div className={cn(
                "inline-flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-500 group-hover:scale-110",
                variant === "highlight" 
                  ? "bg-primary/15 text-primary group-hover:bg-primary/25" 
                  : variant === "subtle" 
                  ? "bg-background text-primary group-hover:bg-background/80 border border-border"
                  : "bg-accent/10 text-accent group-hover:bg-accent/20"
              )}>
                {icon}
              </div>
            )}
            
            <div className="space-y-3">
              <h3 className={cn(
                "h3 transition-colors duration-300",
                variant === "highlight" && "group-hover:text-primary"
              )}>
                {title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                {description}
              </p>
            </div>
            
            {children && (
              <div className="pt-4 border-t transition-colors duration-300">
                {children}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </InView>
  );
}