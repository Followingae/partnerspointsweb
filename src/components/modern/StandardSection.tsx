"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InView from "./InView";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface StandardSectionProps {
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
  heading: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  seeAlsoLinks?: Array<{
    text: string;
    href: string;
    description?: string;
  }>;
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export default function StandardSection({
  badge,
  badgeVariant = "outline",
  heading,
  description,
  ctaText,
  ctaHref,
  seeAlsoLinks,
  children,
  reverse = false,
  className
}: StandardSectionProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto",
          reverse && "lg:grid-flow-col-reverse"
        )}>
          
          {/* Text Content - Following Stripe's exact hierarchy */}
          <InView className="animate-slide-up">
            <div className="space-y-8">
              {/* Badge - Small brand indicator like Stripe's "Payments" */}
              {badge && (
                <Badge 
                  variant={badgeVariant} 
                  className="text-xs font-medium px-3 py-1 w-fit"
                >
                  {badge}
                </Badge>
              )}
              
              {/* Main Heading - Large, bold like Stripe */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  {heading}
                </h2>
                
                {/* Description - Body text with proper line height */}
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {description}
                </p>
              </div>
              
              {/* CTA Button - If provided */}
              {ctaText && ctaHref && (
                <div>
                  <Button size="lg" asChild className="px-6 py-3">
                    <Link href={ctaHref} className="flex items-center gap-2">
                      {ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
              
              {/* See Also Links - Like Stripe's additional links */}
              {seeAlsoLinks && seeAlsoLinks.length > 0 && (
                <div className="space-y-3 pt-4">
                  <div className="text-sm font-medium text-foreground">
                    See also
                  </div>
                  <div className="space-y-2">
                    {seeAlsoLinks.map((link, index) => (
                      <div key={index}>
                        <Link 
                          href={link.href}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          {link.text}
                        </Link>
                        {link.description && (
                          <span className="text-sm text-muted-foreground ml-2">
                            {link.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </InView>
          
          {/* Visual Content */}
          <InView className={cn(
            "animate-slide-left",
            reverse && "animate-slide-right"
          )}>
            {children}
          </InView>
        </div>
      </div>
    </section>
  );
}