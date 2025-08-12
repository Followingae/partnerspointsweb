"use client";
import { useState } from "react";
import InView from "./InView";

interface InteractiveStatsProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
  variant?: "default" | "highlight" | "success" | "warning";
}

export default function InteractiveStats({
  icon,
  label,
  value,
  description,
  prefix = "",
  suffix = "",
  delay = 0,
  variant = "default"
}: InteractiveStatsProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    default: "bg-card border-border hover:border-muted/30",
    highlight: "bg-card border-blueAccent/20 hover:border-blueAccent/50",
    success: "bg-card border-green-200 hover:border-green-300",
    warning: "bg-card border-orange-200 hover:border-orange-300"
  };

  const valueColors = {
    default: "text-card-foreground",
    highlight: "text-blueAccent",
    success: "text-green-600",
    warning: "text-orange-600"
  };

  return (
    <InView 
      className="animate-slide-up" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`
          relative p-6 rounded-2xl border-2 transition-all duration-500 will-change-transform group cursor-pointer
          hover:-translate-y-1 hover:shadow-brand
          ${variants[variant]}
          ${isHovered ? "scale-[1.02]" : ""}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-muted/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative space-y-3">
          {icon && (
            <div className={`
              inline-flex items-center justify-center w-10 h-10 rounded-lg 
              transition-all duration-500 group-hover:scale-110
              ${variant === "highlight" 
                ? "bg-primary/10 text-primary group-hover:bg-primary/20" 
                : variant === "success"
                ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                : variant === "warning"
                ? "bg-orange-100 text-orange-600 group-hover:bg-orange-200"
                : "bg-muted text-muted-foreground group-hover:bg-muted/80"
              }
            `}>
              {icon}
            </div>
          )}
          
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground group-hover:text-card-foreground transition-colors duration-300">
              {label}
            </div>
            
            <div className={`
              text-3xl font-bold transition-all duration-300 group-hover:scale-105
              ${valueColors[variant]}
            `}>
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </div>
            
            {description && (
              <div className="text-sm text-muted-foreground group-hover:text-card-foreground/70 transition-colors duration-300">
                {description}
              </div>
            )}
          </div>
        </div>
        
        {/* Subtle border glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-transparent via-muted/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </InView>
  );
}