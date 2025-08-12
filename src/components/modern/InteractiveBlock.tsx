"use client";
import { useState } from "react";
import InView from "./InView";

interface InteractiveBlockProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  delay?: number;
  variant?: "default" | "highlight" | "subtle";
  hoverable?: boolean;
}

export default function InteractiveBlock({
  icon,
  title,
  description,
  children,
  delay = 0,
  variant = "default",
  hoverable = true
}: InteractiveBlockProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    default: "bg-surfacePrimary border-borderSoft hover:border-inkMuted/20",
    highlight: "bg-surfacePrimary border-blueAccent/20 hover:border-blueAccent/40 hover:shadow-lg",
    subtle: "bg-surfaceSecondary border-borderSoft hover:bg-surfacePrimary"
  };

  return (
    <InView 
      className="animate-slide-up" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`
          relative p-8 rounded-2xl border-2 transition-all duration-500 will-change-transform group
          ${variants[variant]}
          ${hoverable ? "hover:-translate-y-2 hover:shadow-brand" : ""}
          ${isHovered ? "scale-[1.02]" : ""}
        `}
        onMouseEnter={() => hoverable && setIsHovered(true)}
        onMouseLeave={() => hoverable && setIsHovered(false)}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-inkMuted/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative space-y-4">
          {icon && (
            <div className={`
              inline-flex items-center justify-center w-12 h-12 rounded-xl 
              transition-all duration-500 group-hover:scale-110
              ${variant === "highlight" 
                ? "bg-blueAccent/10 text-blueAccent group-hover:bg-blueAccent/20" 
                : "bg-inkPrimary/5 text-inkPrimary group-hover:bg-inkPrimary/10"
              }
            `}>
              {icon}
            </div>
          )}
          
          <div className="space-y-3">
            <h3 className={`
              text-xl font-semibold transition-colors duration-300
              ${variant === "highlight" 
                ? "text-inkPrimary group-hover:text-blueAccent" 
                : "text-inkPrimary"
              }
            `}>
              {title}
            </h3>
            
            <p className="text-inkMuted leading-relaxed group-hover:text-inkPrimary/80 transition-colors duration-300">
              {description}
            </p>
          </div>
          
          {children && (
            <div className="pt-4 border-t border-borderSoft group-hover:border-inkMuted/20 transition-colors duration-300">
              {children}
            </div>
          )}
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-transparent via-inkMuted/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </InView>
  );
}