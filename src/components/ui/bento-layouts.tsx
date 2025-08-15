"use client";

import * as React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import { cn } from "@/lib/utils";

// Layout Presets for common use cases
export interface BentoLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

// Results Layout - Perfect for "Real Retail Results"
export const ResultsLayout = ({ className, children }: BentoLayoutProps) => (
  <BentoGrid layout="asymmetric" spacing="normal" className={cn("auto-rows-fr", className)}>
    {React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      // First item is featured
      if (index === 0) {
        return React.cloneElement(child as any, { 
          size: "featured",
          variant: "highlight"
        });
      }
      // Second and third items are medium
      if (index === 1 || index === 2) {
        return React.cloneElement(child as any, { 
          size: "medium"
        });
      }
      // Rest are small
      return React.cloneElement(child as any, { 
        size: "small"
      });
    })}
  </BentoGrid>
);

// Features Layout - For key features sections
export const FeaturesLayout = ({ className, children }: BentoLayoutProps) => (
  <BentoGrid layout="3x2" spacing="normal" className={cn("auto-rows-fr", className)}>
    {React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      // Every third item is large
      if (index % 3 === 0 && index > 0) {
        return React.cloneElement(child as any, { 
          size: "large",
          variant: "gradient"
        });
      }
      
      return React.cloneElement(child as any, { 
        size: "medium"
      });
    })}
  </BentoGrid>
);

// Stats Layout - For metrics and numbers
export const StatsLayout = ({ className, children }: BentoLayoutProps) => (
  <BentoGrid layout="4x2" spacing="tight" className={cn("auto-rows-fr", className)}>
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      
      return React.cloneElement(child as any, { 
        size: "small",
        variant: "subtle",
         
      });
    })}
  </BentoGrid>
);

// Hero Layout - For hero sections with mixed content
export const HeroLayout = ({ className, children }: BentoLayoutProps) => (
  <BentoGrid layout="asymmetric" spacing="loose" className={cn("auto-rows-fr min-h-[400px]", className)}>
    {React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      // First item takes up most space
      if (index === 0) {
        return React.cloneElement(child as any, { 
          size: "featured",
          variant: "highlight",
           
        });
      }
      // Side items are tall and narrow
      return React.cloneElement(child as any, { 
        size: "tall",
         
      });
    })}
  </BentoGrid>
);

// Masonry Layout - For varied content heights
export const MasonryLayout = ({ className, children }: BentoLayoutProps) => (
  <BentoGrid layout="masonry" spacing="normal" className={cn("auto-rows-min", className)}>
    {React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      // Random sizing for masonry effect
      const sizes = ["small", "medium", "large", "tall"] as const;
      const variants = ["default", "subtle", "gradient"] as const;
      
      return React.cloneElement(child as any, { 
        size: sizes[index % sizes.length],
        variant: variants[index % variants.length],
         
      });
    })}
  </BentoGrid>
);

// Business Types Layout - For different business categories
export const BusinessTypesLayout = ({ className, children }: BentoLayoutProps) => (
  <BentoGrid layout="2x2" spacing="normal" className={cn("auto-rows-fr", className)}>
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      
      return React.cloneElement(child as any, { 
        size: "large",
        variant: "default",
         
      });
    })}
  </BentoGrid>
);