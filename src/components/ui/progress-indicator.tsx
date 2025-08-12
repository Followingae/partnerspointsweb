"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ProgressIndicatorProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function ProgressIndicator({ steps, currentStep, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Progress */}
      <div className="hidden md:flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isComplete = index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep
          
          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-300",
                isComplete && "bg-electric-blue border-electric-blue text-white",
                isCurrent && "border-electric-blue text-electric-blue bg-electric-blue/10",
                isUpcoming && "border-muted-foreground/30 text-muted-foreground"
              )}>
                {isComplete ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Step Label */}
              <div className="ml-4 flex-1">
                <div className={cn(
                  "text-sm font-medium transition-colors",
                  isComplete && "text-electric-blue",
                  isCurrent && "text-electric-blue",
                  isUpcoming && "text-muted-foreground"
                )}>
                  {step}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={cn(
                    "h-0.5 transition-colors duration-300",
                    index < currentStep ? "bg-electric-blue" : "bg-muted-foreground/30"
                  )} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-electric-blue">
            Step {currentStep + 1} of {steps.length}
          </h3>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted-foreground/20 rounded-full h-2 mb-2">
          <div 
            className="bg-electric-blue h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        <p className="text-sm font-medium text-shadow-black">
          {steps[currentStep]}
        </p>
      </div>
    </div>
  )
}