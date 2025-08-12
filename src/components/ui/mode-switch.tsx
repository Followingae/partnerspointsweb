"use client";

import { cn } from "@/lib/utils";

interface ModeSwitchProps {
  value: "businesses" | "customers";
  onValueChange: (value: "businesses" | "customers") => void;
  className?: string;
}

export function ModeSwitch({ value, onValueChange, className }: ModeSwitchProps) {
  return (
    <div className={cn("relative inline-flex h-9 w-44 items-center rounded-full bg-muted p-1", className)}>
      {/* Background slider */}
      <div
        className={cn(
          "absolute h-7 w-20 rounded-full bg-primary transition-transform duration-200 ease-in-out",
          value === "customers" ? "translate-x-20" : "translate-x-0"
        )}
      />
      
      {/* Businesses option */}
      <button
        onClick={() => onValueChange("businesses")}
        className={cn(
          "relative z-10 flex h-7 w-20 items-center justify-center rounded-full text-xs font-medium transition-colors duration-200 px-2",
          value === "businesses" 
            ? "text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Businesses
      </button>
      
      {/* Customers option */}
      <button
        onClick={() => onValueChange("customers")}
        className={cn(
          "relative z-10 flex h-7 w-20 items-center justify-center rounded-full text-xs font-medium transition-colors duration-200 px-2",
          value === "customers" 
            ? "text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Customers
      </button>
    </div>
  );
}