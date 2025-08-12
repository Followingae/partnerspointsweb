"use client"

import { cn } from "@/lib/utils"

interface MobileOptimizedProps {
  children: React.ReactNode
  className?: string
  touchTarget?: boolean
  readableWidth?: boolean
}

export function MobileOptimized({ 
  children, 
  className,
  touchTarget = false,
  readableWidth = false 
}: MobileOptimizedProps) {
  return (
    <div className={cn(
      // Base mobile optimizations
      "text-base leading-relaxed",
      
      // Touch target optimization (44px minimum)
      touchTarget && "min-h-[44px] min-w-[44px] flex items-center justify-center",
      
      // Readable line length (45-75 characters)
      readableWidth && "max-w-[65ch]",
      
      className
    )}>
      {children}
    </div>
  )
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function MobileMenu({ isOpen, onClose, children }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="px-4 py-6 border-b">
            <button
              onClick={onClose}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className="sr-only">Close menu</span>
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function ResponsiveGrid({ 
  children, 
  className,
  cols = { default: 1, md: 2, lg: 3 }
}: ResponsiveGridProps) {
  const gridClasses = [
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`, 
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ].filter(Boolean).join(' ')

  return (
    <div className={cn("grid gap-4 sm:gap-6", gridClasses, className)}>
      {children}
    </div>
  )
}