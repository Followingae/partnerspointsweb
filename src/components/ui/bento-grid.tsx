"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// BentoGrid container variants with enhanced responsive breakpoints
const bentoGridVariants = cva(
  "grid gap-4 w-full",
  {
    variants: {
      layout: {
        "2x2": "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2",
        "3x2": "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
        "4x2": "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4",
        "asymmetric": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        "masonry": "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      },
      spacing: {
        tight: "gap-1 sm:gap-2 md:gap-2 lg:gap-3",
        normal: "gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-5",
        loose: "gap-3 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-8",
        spacious: "gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
      }
    },
    defaultVariants: {
      layout: "3x2",
      spacing: "normal"
    }
  }
);

// BentoGridItem variants with enhanced responsive behavior
const bentoGridItemVariants = cva(
  "group relative transition-all duration-200 hover:scale-[1.02]",
  {
    variants: {
      size: {
        small: "col-span-1 row-span-1",
        medium: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
        large: "col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1",
        wide: "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3 row-span-1",
        tall: "col-span-1 row-span-1 sm:row-span-1 md:row-span-2 lg:row-span-2",
        featured: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1 sm:row-span-1 md:row-span-2 lg:row-span-2"
      },
      variant: {
        default: "",
        highlight: "ring-2 ring-primary/20 bg-primary/2",
        subtle: "bg-muted/30",
        gradient: "bg-gradient-to-br from-primary/5 via-transparent to-secondary/5",
        accent: "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20"
      }
    },
    defaultVariants: {
      size: "medium",
      variant: "default"
    }
  }
);

// BentoGrid Props
export interface BentoGridProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridVariants> {}

// BentoGridItem Props
export interface BentoGridItemProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridItemVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  asChild?: boolean;
}

// BentoGrid Component
const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, layout, spacing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(bentoGridVariants({ layout, spacing }), className)}
        {...props}
      />
    );
  }
);
BentoGrid.displayName = "BentoGrid";

// BentoGridItem Component
const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  ({ className, size, variant, title, description, icon, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : Card;
    
    if (asChild) {
      return (
        <div
          ref={ref}
          className={cn(bentoGridItemVariants({ size, variant }), className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(bentoGridItemVariants({ size, variant }), className)}
        {...props}
      >
        <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
          {(title || description || icon) && (
            <CardHeader className="pb-2">
              {icon && (
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  {icon}
                </div>
              )}
              {title && <CardTitle className="text-lg">{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          {children && (
            <CardContent className={cn(title || description || icon ? "pt-0" : "")}>
              {children}
            </CardContent>
          )}
        </Card>
      </div>
    );
  }
);
BentoGridItem.displayName = "BentoGridItem";

export { BentoGrid, BentoGridItem, bentoGridVariants, bentoGridItemVariants };