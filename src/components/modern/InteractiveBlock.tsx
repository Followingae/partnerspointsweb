"use client";
import { UnifiedCard } from "@/components/ui/unified-card";
import { cn } from "@/lib/utils";
import InView from "./InView";

interface InteractiveBlockProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  delay?: number;
  variant?: "default" | "highlight" | "subtle";
  className?: string;
}

export default function InteractiveBlock({
  icon,
  title,
  description,
  children,
  delay = 0,
  variant = "default",
  className = ""
}: InteractiveBlockProps) {
  return (
    <InView 
      className="animate-slide-up" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <UnifiedCard 
        variant={variant}
        className={cn("group hover:-translate-y-1 transition-transform duration-300", className)}
      >
        <div className="space-y-4">
          {icon && (
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors duration-300">
              {icon}
            </div>
          )}
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              {title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
          
          {children && (
            <div className="pt-4 border-t border-border/50">
              {children}
            </div>
          )}
        </div>
      </UnifiedCard>
    </InView>
  );
}