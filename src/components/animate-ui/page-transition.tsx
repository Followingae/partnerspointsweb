"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { gsap } from "gsap"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Only animate on actual route changes
    if (prevPathname.current !== pathname) {
      // Fade out current content
      gsap.fromTo(container, 
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            // Fade in new content
            gsap.fromTo(container,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
              }
            )
          }
        }
      )
    }

    prevPathname.current = pathname
  }, [pathname])

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  )
}

// Hook for programmatic page transitions
export function usePageTransition() {
  const router = useRouter()

  const transitionTo = (href: string) => {
    // Create overlay for smooth transition
    const overlay = document.createElement("div")
    overlay.className = "fixed inset-0 bg-white z-50 opacity-0"
    document.body.appendChild(overlay)

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        router.push(href)
        // Remove overlay after navigation
        setTimeout(() => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              document.body.removeChild(overlay)
            }
          })
        }, 100)
      }
    })
  }

  return { transitionTo }
}