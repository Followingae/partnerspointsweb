"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import InView from "./InView";

interface StepBlockProps {
  step: number;
  title: string;
  description: string;
  delay?: number;
  isLast?: boolean;
}

export default function StepBlock({
  step,
  title,
  description,
  delay = 0,
  isLast = false
}: StepBlockProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <InView 
      className="animate-slide-up relative" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Connection line to next step */}
        {!isLast && (
          <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-border to-transparent opacity-60" />
        )}
        
        <div className="flex gap-6 items-start">
          {/* Step number */}
          <Badge 
            variant="secondary" 
            className={cn(
              "relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
              "font-bold text-primary-foreground transition-all duration-500 group-hover:scale-110 bg-primary hover:bg-primary/90",
              isHovered ? "shadow-lg" : ""
            )}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            
            {/* Step number */}
            <span className="relative z-10 text-sm">{step}</span>
          </Badge>
          
          {/* Content */}
          <div className="flex-1 space-y-3 pb-8">
            <h3 className="h3 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>
        
        {/* Hover background */}
        <div className="absolute inset-0 -mx-4 rounded-xl bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </InView>
  );
}